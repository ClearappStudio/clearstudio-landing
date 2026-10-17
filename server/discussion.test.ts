import { DatabaseSync } from "node:sqlite";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { DiscussionEnv, moderateDiscussion, publicDiscussion } from "./discussion";

const site = "https://preview.example.test";
const key = "test-only-moderation-key-at-least-32-characters";
let sqlite: DatabaseSync;
let env: DiscussionEnv;
function statement(sql: string, values: unknown[] = []) {
  return {
    bind: (...bound: unknown[]) => statement(sql, bound),
    async first<T>() { return (sqlite.prepare(sql).get(...values as never[]) || null) as T | null; },
    async all<T>() { return { results: sqlite.prepare(sql).all(...values as never[]) as T[] }; },
    async run() { return sqlite.prepare(sql).run(...values as never[]); },
  };
}
function context(method = "GET", body?: unknown, admin = false, overrides: Record<string, string> = {}) {
  return { env, request: new Request(`${site}/api/context-discussion${admin ? "/moderate" : ""}`, {
    method, headers: { Origin: site, "Content-Type": "application/json", "CF-Connecting-IP": "192.0.2.1",
      ...(admin ? { Authorization: `Bearer ${key}` } : {}), ...overrides },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  }) };
}
function contribution(overrides: Record<string, unknown> = {}) {
  return { id: crypto.randomUUID(), name: "A reader", body: "My meeting notes lose their context when a project changes.", consent: true, ...overrides };
}
async function publicComments() { return (await (await publicDiscussion(context())).json()).comments; }
beforeEach(() => {
  sqlite = new DatabaseSync(":memory:");
  env = { DISCUSSION_MODERATION_KEY: key, DISCUSSION_DB: {
    prepare: statement,
    async batch(statements) {
      sqlite.exec("BEGIN");
      try { for (const sql of statements) await sql.run(); sqlite.exec("COMMIT"); }
      catch (error) { sqlite.exec("ROLLBACK"); throw error; }
    },
  } };
});
afterEach(() => sqlite.close());

describe("moderated discussion with real SQLite storage", () => {
  it("keeps submissions private until approved and supports reader and author replies", async () => {
    const root = contribution();
    expect((await publicDiscussion(context("POST", root))).status).toBe(202);
    expect(await publicComments()).toEqual([]);
    const queue = await (await moderateDiscussion(context("GET", undefined, true))).json();
    expect(queue.comments[0].status).toBe("pending");
    expect((await moderateDiscussion(context("PATCH", { id: root.id, status: "approved" }, true))).status).toBe(200);
    expect((await publicComments())[0]).toMatchObject({ id: root.id, body: root.body, isAuthor: 0 });

    const reply = contribution({ parentId: root.id, body: "I see this most often when I come back after a holiday." });
    await publicDiscussion(context("POST", reply));
    expect(await publicComments()).toHaveLength(1);
    await moderateDiscussion(context("PATCH", { id: reply.id, status: "approved" }, true));
    const authorReply = { id: crypto.randomUUID(), parentId: root.id, body: "Thank you. Returning to work is a useful example." };
    expect((await moderateDiscussion(context("POST", authorReply, true))).status).toBe(201);
    const visible = await publicComments();
    expect(visible).toHaveLength(3);
    expect(visible.find(c => c.id === authorReply.id)).toMatchObject({ name: "Francisco G. Olmedo", isAuthor: 1 });
    expect(JSON.stringify(visible)).not.toMatch(/status|bucket|192\.0\.2\.1/);

    await moderateDiscussion(context("PATCH", { id: root.id, status: "rejected" }, true));
    expect(await publicComments()).toEqual([]);
  });

  it("requires a secret for all moderation, including author publication", async () => {
    for (const method of ["GET", "PATCH", "POST"]) {
      const result = await moderateDiscussion(context(method, method === "GET" ? undefined : { id: crypto.randomUUID() }, true, { Authorization: "Bearer wrong" }));
      expect(result.status).toBe(401);
    }
    expect(await publicComments()).toEqual([]);
  });

  it("fails closed without storage or a strong moderation key", async () => {
    env.DISCUSSION_DB = undefined;
    expect((await publicDiscussion(context())).status).toBe(503);
    expect((await publicDiscussion(context("POST", contribution()))).status).toBe(503);
    expect((await moderateDiscussion(context("GET", undefined, true))).status).toBe(503);
  });

  it("rejects cross-origin posts, missing consent, invalid bodies and unapproved reply parents", async () => {
    expect((await publicDiscussion(context("POST", contribution(), false, { Origin: "https://other.example" }))).status).toBe(403);
    for (const input of [contribution({ consent: false }), contribution({ body: "short" }), contribution({ body: "x".repeat(3001) }), contribution({ name: "" }), contribution({ name: "Francisco G. Olmedo" }), contribution({ parentId: crypto.randomUUID() })]) {
      expect((await publicDiscussion(context("POST", input))).status).toBe(400);
    }
    const pending = contribution(); await publicDiscussion(context("POST", pending));
    expect((await publicDiscussion(context("POST", contribution({ parentId: pending.id })))).status).toBe(400);
  });

  it("stores plain text, uses bound SQL and ignores forged author/status fields", async () => {
    const root = contribution({ body: "<script>alert('x')</script>'); DROP TABLE discussion_comments; --", isAuthor: 1, status: "approved" });
    await publicDiscussion(context("POST", root));
    expect(await publicComments()).toEqual([]);
    await moderateDiscussion(context("PATCH", { id: root.id, status: "approved" }, true));
    expect((await publicComments())[0]).toMatchObject({ body: root.body, isAuthor: 0 });
  });

  it("deduplicates retried submissions, filters the honeypot and enforces the hourly limit", async () => {
    const root = contribution();
    await publicDiscussion(context("POST", root)); await publicDiscussion(context("POST", root));
    await publicDiscussion(context("POST", contribution({ website: "spam.example" })));
    expect((await (await moderateDiscussion(context("GET", undefined, true))).json()).comments).toHaveLength(1);
    for (let i = 0; i < 4; i++) expect((await publicDiscussion(context("POST", contribution()))).status).toBe(202);
    expect((await publicDiscussion(context("POST", contribution()))).status).toBe(429);
    const buckets = sqlite.prepare("SELECT * FROM discussion_rate").all();
    expect(JSON.stringify(buckets)).not.toContain("192.0.2.1");
    expect(buckets[0].bucket).toMatch(/^[a-f0-9]{64}$/);
  });

  it("rejects oversized payloads and unavailable connections without accepting comments", async () => {
    expect((await publicDiscussion(context("POST", contribution({ body: "x".repeat(20000) })))).status).toBe(400);
    expect((await publicDiscussion(context("POST", contribution(), false, { "CF-Connecting-IP": "" }))).status).toBe(503);
    expect(await publicComments()).toEqual([]);
  });
});
