import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Contribution, ContributionText } from "@/components/ContextDiscussion";
import "./ContextFirstComputing.css";

const endpoint = "/api/context-discussion/moderate";

export default function ContextDiscussionModeration() {
  const [key, setKey] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [comments, setComments] = useState<Contribution[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [body, setBody] = useState("");
  const [replyId, setReplyId] = useState<string>();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Discussion moderation | Clear Studio";
    const meta = document.createElement("meta"); meta.name = "robots"; meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => { document.title = previousTitle; meta.remove(); };
  }, []);

  async function call(method = "GET", input?: Record<string, unknown>) {
    const response = await fetch(endpoint, { method, headers: {
      Authorization: `Bearer ${key}`, ...(input ? { "Content-Type": "application/json" } : {}),
    }, ...(input ? { body: JSON.stringify(input) } : {}) });
    const result = await response.json();
    if (!response.ok) {
      if (response.status === 401) setUnlocked(false);
      throw new Error(result.error || "Could not load the moderation queue.");
    }
    return result;
  }

  async function load(event?: FormEvent) {
    event?.preventDefault(); setBusy(true); setError("");
    try { const result = await call(); setComments(result.comments); setUnlocked(true); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Could not load contributions."); }
    finally { setBusy(false); }
  }

  async function review(id: string, status: "approved" | "rejected") {
    setBusy(true); setError(""); setNotice("");
    try {
      await call("PATCH", { id, status });
      setNotice(status === "approved" ? "Contribution approved." : "Contribution hidden.");
      const result = await call(); setComments(result.comments);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Could not save the review."); }
    finally { setBusy(false); }
  }

  async function publish(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(""); setNotice("");
    const id = replyId || crypto.randomUUID(); setReplyId(id);
    try {
      await call("POST", { id, parentId: replyTo || null, body });
      setNotice("Your author contribution is now public."); setBody(""); setReplyTo(""); setReplyId(undefined);
      const result = await call(); setComments(result.comments);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Could not publish the reply."); }
    finally { setBusy(false); }
  }

  const pending = comments.filter(c => c.status === "pending");
  const roots = comments.filter(c => c.status === "approved" && !c.parentId);
  return <article className="cfc-page cfc-moderation">
    <header className="cfc-closing"><p className="cfc-kicker">Context-first Computing / Author access</p><h1>Review the conversation.</h1><p>Approve contributions before they become public, or respond as Francisco G. Olmedo.</p><Link className="cfc-text-link" to="/projects/context-first-computing#discussion">Back to the discussion ↗</Link></header>
    {!unlocked ? <form className="cfc-discussion-form" onSubmit={load}>
      <label htmlFor="moderation-key">Moderation key</label><input id="moderation-key" type="password" autoComplete="off" required value={key} onChange={e => setKey(e.target.value)} />
      <p className="cfc-discussion-note">The key stays in this tab's memory. It is not saved in your browser.</p>
      <button className="cfc-button" disabled={busy}>{busy ? "Checking…" : "Open moderation"}</button>
    </form> : <>
      <div className="cfc-actions"><button className="cfc-text-link cfc-inline-button" disabled={busy} onClick={() => load()}>Refresh contributions</button><button className="cfc-text-link cfc-inline-button" onClick={() => { setUnlocked(false); setKey(""); setComments([]); setBody(""); }}>Lock moderation</button></div>
      <section className="cfc-section"><h2>Awaiting review</h2><p>{pending.length === 0 ? "No contributions are waiting for review." : `${pending.length} contribution${pending.length === 1 ? "" : "s"} awaiting review.`}</p>
        {pending.map(comment => <article className="cfc-contribution" key={comment.id}>
          {comment.parentId && <p className="cfc-discussion-note">Reply to: {comments.find(c => c.id === comment.parentId)?.body || "An earlier conversation"}</p>}
          <ContributionText comment={comment} />
          <div className="cfc-actions"><button disabled={busy} className="cfc-button" onClick={() => review(comment.id, "approved")}>Approve</button><button disabled={busy} className="cfc-text-link cfc-inline-button" onClick={() => review(comment.id, "rejected")}>Hide contribution</button></div>
        </article>)}
      </section>
      <section className="cfc-section cfc-discussion"><div><h2>Reply as<br /><em>the author.</em></h2><p>Your author contributions are published immediately.</p></div><form className="cfc-discussion-form" onSubmit={publish}>
        <fieldset disabled={busy}><label htmlFor="author-thread">Conversation</label><select id="author-thread" value={replyTo} onChange={e => { setReplyTo(e.target.value); setReplyId(undefined); }}><option value="">Start a new conversation</option>{roots.map(root => <option key={root.id} value={root.id}>{root.name}: {root.body.slice(0, 90)}</option>)}</select>
          <label htmlFor="author-reply">Your contribution</label><textarea id="author-reply" rows={6} minLength={10} maxLength={3000} required value={body} onChange={e => { setBody(e.target.value); setReplyId(undefined); }} />
          <button className="cfc-button" type="submit">{busy ? "Publishing…" : "Publish as author"} ↗</button>
        </fieldset>
      </form></section>
      <section className="cfc-section"><h2>Published contributions</h2>{comments.filter(c => c.status === "approved").map(comment => <article className="cfc-contribution" key={comment.id}><ContributionText comment={comment} /><button disabled={busy} className="cfc-text-link cfc-inline-button" onClick={() => review(comment.id, "rejected")}>Hide {comment.parentId ? "reply" : "conversation and replies"}</button></article>)}</section>
    </>}
    {error && <p className="cfc-discussion-message" role="alert">{error}</p>}
    {notice && <p className="cfc-discussion-message" role="status">{notice}</p>}
  </article>;
}
