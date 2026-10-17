import { FormEvent, useEffect, useRef, useState } from "react";

export interface Contribution {
  id: string; parentId: string | null; name: string; body: string;
  isAuthor: number; createdAt: string; status?: "pending" | "approved";
}
const api = "/api/context-discussion";
export const contributionDate = (value: string) => new Intl.DateTimeFormat("en-GB", {
  day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
}).format(new Date(value));

export default function ContextDiscussion() {
  const [comments, setComments] = useState<Contribution[]>([]);
  const [availability, setAvailability] = useState<"loading" | "ready" | "unconfigured" | "error">("loading");
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [consent, setConsent] = useState(false);
  const [replyTo, setReplyTo] = useState<Contribution | null>(null);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  const requestId = useRef<string>();
  const textarea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    setAvailability("loading");
    fetch(api, { signal: controller.signal, headers: { Accept: "application/json" } })
      .then(async response => {
        const result = await response.json();
        if (!response.ok) { setAvailability(result.available === false ? "unconfigured" : "error"); return; }
        if (result.available !== true || !Array.isArray(result.comments)) throw new Error();
        setComments(result.comments); setAvailability("ready");
      }).catch(() => { if (!controller.signal.aborted) setAvailability("error"); });
    return () => controller.abort();
  }, [reload]);

  function chooseReply(comment: Contribution | null) {
    setReplyTo(comment); setNotice(""); setError(""); requestId.current = undefined;
    textarea.current?.focus();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || availability !== "ready") return;
    const form = event.currentTarget;
    setSending(true); setError(""); setNotice("");
    try {
      requestId.current ||= crypto.randomUUID();
      const response = await fetch(api, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: requestId.current, name, body, consent,
          parentId: replyTo?.id || null, website: new FormData(form).get("website") }),
      });
      const result = await response.json();
      if (!response.ok || result.received !== true) throw new Error(result.error || "Your contribution could not be sent. Please try again.");
      setBody(""); setConsent(false); setReplyTo(null); requestId.current = undefined;
      setNotice("Thank you. Your contribution has been received and will appear here after review.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Your contribution could not be sent. Please try again.");
    } finally { setSending(false); }
  }

  const roots = comments.filter(c => !c.parentId).reverse();
  return (
    <section className="cfc-section cfc-discussion" id="discussion" aria-labelledby="discussion-heading">
      <div className="cfc-discussion-intro">
        <p className="cfc-kicker">06 / A conversation worth continuing</p>
        <h2 id="discussion-heading">Discuss<br /><em>the idea.</em></h2>
        <p>Where do your tools make you lose the context?</p>
        <p>Share a situation, question an assumption, or suggest a different approach. You do not need to have read the book to contribute.</p>
        <p className="cfc-discussion-note">Contributions and replies are reviewed before they appear. Thoughtful disagreement is welcome.</p>
        <a className="cfc-text-link" href="mailto:hello@clearstudio.app?subject=Context-first%20Computing">Prefer a private conversation? Email us <span aria-hidden="true">↗</span></a>
      </div>
      <div className="cfc-discussion-main">
        <div aria-live="polite">
          {availability === "loading" && <p>Loading the conversation…</p>}
          {availability === "unconfigured" && <p className="cfc-discussion-message">The discussion is not accepting contributions yet. You can still share your thoughts privately by email.</p>}
          {availability === "error" && <p className="cfc-discussion-message">The conversation could not be loaded. <button className="cfc-inline-button" onClick={() => setReload(v => v + 1)}>Try again</button>.</p>}
        </div>
        {availability === "ready" && <>
          <div className="cfc-conversations">
            {roots.length === 0 ? <p className="cfc-discussion-empty">The conversation starts here. What would you like to add?</p> : <>
              <p className="cfc-kicker">Recent conversations</p>
              {roots.map(root => <article className="cfc-contribution" key={root.id}>
                <ContributionText comment={root} />
                <button type="button" className="cfc-text-link cfc-inline-button" onClick={() => chooseReply(root)}>Reply <span aria-hidden="true">↗</span></button>
                {comments.filter(c => c.parentId === root.id).map(reply => <div className="cfc-contribution-reply" key={reply.id}><ContributionText comment={reply} /></div>)}
              </article>)}
            </>}
          </div>
        </>}
        <form className="cfc-discussion-form" onSubmit={submit} aria-label="Share a contribution">
          <fieldset disabled={availability !== "ready" || sending}>
            <legend>{replyTo ? `Reply to ${replyTo.name}` : "Add your perspective"}</legend>
            {replyTo && <div className="cfc-reply-context"><p>{replyTo.body}</p><button type="button" className="cfc-inline-button" onClick={() => chooseReply(null)}>Cancel reply</button></div>}
            <label htmlFor="discussion-name">Your name</label>
            <input id="discussion-name" name="name" autoComplete="name" required maxLength={60} value={name} onChange={e => { setName(e.target.value); requestId.current = undefined; }} />
            <label htmlFor="discussion-body">{replyTo ? "Your reply" : "Your contribution"}</label>
            <textarea ref={textarea} id="discussion-body" name="body" required minLength={10} maxLength={3000} rows={6} value={body} onChange={e => { setBody(e.target.value); requestId.current = undefined; }} aria-describedby="discussion-privacy" />
            <div className="cfc-honeypot" aria-hidden="true"><label htmlFor="discussion-website">Leave this field empty</label><input id="discussion-website" name="website" tabIndex={-1} autoComplete="off" /></div>
            <p id="discussion-privacy" className="cfc-discussion-note">Your name and contribution will be public after review. No email or account is required. Please leave out private or confidential information. To request removal, email hello@clearstudio.app.</p>
            <label className="cfc-discussion-consent"><input type="checkbox" checked={consent} required onChange={e => setConsent(e.target.checked)} /><span>I agree to have my name and contribution displayed publicly after review.</span></label>
            <button className="cfc-button" type="submit">{sending ? "Sending…" : replyTo ? "Submit reply for review" : "Submit for review"}<span aria-hidden="true">↗</span></button>
          </fieldset>
          {notice && <p className="cfc-discussion-message" role="status">{notice}</p>}
          {error && <p className="cfc-discussion-message" role="alert">{error}</p>}
        </form>
      </div>
    </section>
  );
}

export function ContributionText({ comment }: { comment: Contribution }) {
  return <>
    <div className="cfc-contribution-heading"><span>{comment.name}{Boolean(comment.isAuthor) && <span className="cfc-author-badge">Author</span>}</span><time dateTime={comment.createdAt}>{contributionDate(comment.createdAt)}</time></div>
    <p className="cfc-contribution-body">{comment.body}</p>
  </>;
}
