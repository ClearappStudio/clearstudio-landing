// Shared by the two Cloudflare Pages Functions. No visitor email or raw IP is stored.
interface Statement {
  bind(...values: unknown[]): Statement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
  run(): Promise<unknown>;
}
export interface DiscussionEnv {
  DISCUSSION_DB?: { prepare(sql: string): Statement; batch(statements: Statement[]): Promise<unknown> };
  DISCUSSION_MODERATION_KEY?: string;
}
export interface DiscussionContext { request: Request; env: DiscussionEnv }

const authorName = "Francisco G. Olmedo";
const schema = [
  `CREATE TABLE IF NOT EXISTS discussion_comments (
    id TEXT PRIMARY KEY, parent_id TEXT REFERENCES discussion_comments(id),
    name TEXT NOT NULL, body TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('pending','approved','rejected')),
    is_author INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS discussion_status ON discussion_comments(status, created_at)`,
  `CREATE INDEX IF NOT EXISTS discussion_parent ON discussion_comments(parent_id)`,
  `CREATE TABLE IF NOT EXISTS discussion_rate (bucket TEXT PRIMARY KEY, hits INTEGER NOT NULL, expires_at INTEGER NOT NULL)`,
];

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: {
    "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  } });
}
function ready(env: DiscussionEnv) {
  return Boolean(env.DISCUSSION_DB && env.DISCUSSION_MODERATION_KEY?.length >= 32);
}
async function initialise(env: DiscussionEnv) {
  await env.DISCUSSION_DB!.batch(schema.map(sql => env.DISCUSSION_DB!.prepare(sql)));
}
function sameOrigin(request: Request) {
  return request.headers.get("Origin") === new URL(request.url).origin;
}
async function digest(value: string) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
}
async function authorised(request: Request, env: DiscussionEnv) {
  const supplied = request.headers.get("Authorization")?.replace(/^Bearer /, "") || "";
  if (!supplied || supplied.length > 512) return false;
  const [a, b] = await Promise.all([digest(supplied), digest(env.DISCUSSION_MODERATION_KEY!)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}
async function readBody(request: Request): Promise<Record<string, unknown>> {
  if (!request.headers.get("Content-Type")?.startsWith("application/json")) throw new Error("json");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("body");
  let size = 0;
  const parts: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16000) { await reader.cancel(); throw new Error("size"); }
    parts.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const part of parts) { bytes.set(part, offset); offset += part.length; }
  const input = JSON.parse(new TextDecoder().decode(bytes));
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("object");
  return input;
}
const clean = (value: unknown) => typeof value === "string" ? value.trim() : "";
const validId = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

export async function publicDiscussion({ request, env }: DiscussionContext): Promise<Response> {
  if (!["GET", "POST"].includes(request.method)) return json({ error: "Method not allowed." }, 405);
  if (request.method === "POST" && !sameOrigin(request)) return json({ error: "Please submit from this website." }, 403);
  if (!ready(env)) return json({ available: false, error: "The discussion is not accepting contributions yet." }, 503);
  try {
    await initialise(env);
    const db = env.DISCUSSION_DB!;
    if (request.method === "GET") {
      // Return complete threads for the latest 100 conversations. Pending and rejected
      // contributions never enter the public response, including their counts.
      const { results } = await db.prepare(`WITH roots AS (
        SELECT id FROM discussion_comments WHERE status = 'approved' AND parent_id IS NULL
        ORDER BY created_at DESC, id DESC LIMIT 100
      ) SELECT id, parent_id AS parentId, name, body, is_author AS isAuthor, created_at AS createdAt
        FROM discussion_comments WHERE status = 'approved'
        AND (id IN (SELECT id FROM roots) OR parent_id IN (SELECT id FROM roots))
        ORDER BY created_at ASC, id ASC`).all();
      return json({ available: true, comments: results });
    }
    let input;
    try { input = await readBody(request); } catch { return json({ error: "Please send a shorter, valid contribution." }, 400); }
    if (clean(input.website)) return json({ received: true }, 202); // Honeypot.
    const name = clean(input.name), body = clean(input.body), id = clean(input.id);
    const parentId = clean(input.parentId) || null;
    if (!name || name.length > 60 || body.length < 10 || body.length > 3000 || !validId(id)
      || input.consent !== true || (parentId && !validId(parentId))) {
      return json({ error: "Add your name, a contribution of 10–3,000 characters and consent to public display after review." }, 400);
    }
    if (name.toLowerCase().replace(/[^a-z]/g, "") === authorName.toLowerCase().replace(/[^a-z]/g, "")) {
      return json({ error: "Please use your own name. Author replies are published separately." }, 400);
    }
    if (parentId && !await db.prepare("SELECT id FROM discussion_comments WHERE id = ? AND status = 'approved' AND parent_id IS NULL").bind(parentId).first()) {
      return json({ error: "This conversation is no longer available. Refresh the page before replying." }, 400);
    }
    // A repeated request (for example after a lost response) does not create a duplicate.
    if (await db.prepare("SELECT id FROM discussion_comments WHERE id = ?").bind(id).first()) return json({ received: true }, 202);
    const ip = request.headers.get("CF-Connecting-IP");
    if (!ip) return json({ error: "We could not verify this connection. Please try again later." }, 503);
    const now = Date.now();
    const hour = Math.floor(now / 3600000);
    const hashed = await digest(`${env.DISCUSSION_MODERATION_KEY}:${hour}:${ip}`);
    const bucket = Array.from(hashed, v => v.toString(16).padStart(2, "0")).join("");
    await db.prepare("DELETE FROM discussion_rate WHERE expires_at < ?").bind(now).run();
    const limit = await db.prepare(`INSERT INTO discussion_rate(bucket, hits, expires_at) VALUES (?, 1, ?)
      ON CONFLICT(bucket) DO UPDATE SET hits = hits + 1 RETURNING hits`).bind(bucket, (hour + 2) * 3600000).first<{ hits: number }>();
    if (!limit || limit.hits > 5) return json({ error: "You've sent several contributions. Please try again in an hour." }, 429);
    await db.prepare(`INSERT OR IGNORE INTO discussion_comments(id, parent_id, name, body, status, is_author, created_at)
      VALUES (?, ?, ?, ?, 'pending', 0, ?)`).bind(id, parentId, name, body, new Date(now).toISOString()).run();
    return json({ received: true }, 202);
  } catch {
    return json({ error: "The discussion is temporarily unavailable. Please try again later." }, 503);
  }
}

export async function moderateDiscussion({ request, env }: DiscussionContext): Promise<Response> {
  if (!["GET", "PATCH", "POST"].includes(request.method)) return json({ error: "Method not allowed." }, 405);
  if (request.method !== "GET" && !sameOrigin(request)) return json({ error: "Invalid origin." }, 403);
  if (!ready(env)) return json({ error: "Discussion storage and moderation must be configured in Cloudflare." }, 503);
  if (!await authorised(request, env)) return json({ error: "The moderation key is not valid." }, 401);
  try {
    await initialise(env);
    const db = env.DISCUSSION_DB!;
    if (request.method === "GET") {
      const { results } = await db.prepare(`SELECT id, parent_id AS parentId, name, body, status,
        is_author AS isAuthor, created_at AS createdAt FROM discussion_comments
        WHERE status != 'rejected' ORDER BY created_at DESC, id DESC LIMIT 500`).all();
      return json({ comments: results });
    }
    let input;
    try { input = await readBody(request); } catch { return json({ error: "Invalid request." }, 400); }
    const id = clean(input.id);
    if (!validId(id)) return json({ error: "Invalid contribution." }, 400);
    if (request.method === "PATCH") {
      if (!["approved", "rejected"].includes(String(input.status))) return json({ error: "Invalid review decision." }, 400);
      const existing = await db.prepare("SELECT parent_id AS parentId FROM discussion_comments WHERE id = ?").bind(id).first<{ parentId: string | null }>();
      if (!existing) return json({ error: "Contribution not found." }, 404);
      if (input.status === "approved" && existing.parentId && !await db.prepare("SELECT id FROM discussion_comments WHERE id = ? AND status = 'approved' AND parent_id IS NULL").bind(existing.parentId).first()) return json({ error: "Approve the parent conversation first." }, 400);
      // Hiding a thread also hides its replies. Updates are atomic.
      await db.batch([
        db.prepare("UPDATE discussion_comments SET status = ? WHERE id = ?").bind(input.status, id),
        ...(input.status === "rejected" ? [db.prepare("UPDATE discussion_comments SET status = 'rejected' WHERE parent_id = ?").bind(id)] : []),
      ]);
      return json({ updated: true });
    }
    const body = clean(input.body), parentId = clean(input.parentId) || null;
    if (body.length < 10 || body.length > 3000 || (parentId && !validId(parentId))) return json({ error: "Write 10–3,000 characters." }, 400);
    if (parentId && !await db.prepare("SELECT id FROM discussion_comments WHERE id = ? AND status = 'approved' AND parent_id IS NULL").bind(parentId).first()) return json({ error: "Reply to an approved conversation." }, 400);
    await db.prepare(`INSERT OR IGNORE INTO discussion_comments(id, parent_id, name, body, status, is_author, created_at)
      VALUES (?, ?, ?, ?, 'approved', 1, ?)`).bind(id, parentId, authorName, body, new Date().toISOString()).run();
    return json({ published: true }, 201);
  } catch {
    return json({ error: "Could not complete the moderation request. Please try again." }, 503);
  }
}
