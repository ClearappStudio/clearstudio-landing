import { Link } from "react-router-dom";
import { Archive, BookOpen, Check, Clock3 } from "lucide-react";
import { MailMark } from "@/components/site/MailMark";

const states = [
  { title: "Action Items", description: "Messages that need something from you.", icon: Check },
  { title: "Read Later", description: "Messages worth your time, but not your immediate attention.", icon: BookOpen },
  { title: "Waiting On", description: "Conversations where the next move belongs to someone else.", icon: Clock3 },
  { title: "Vault", description: "Important information you may want to find again.", icon: Archive },
];

const steps = [
  "Make one simple decision about every new message.",
  "If it needs your attention, move it to the right place.",
  "If it does not, archive it.",
  "When it is resolved, remove it from your working space.",
];

export default function ClearMail() {
  return (
    <article className="clear-mail-page">
      <header className="clear-mail-hero">
        <div className="clear-mail-topline"><span>Clear Studio / System 01</span><span>Private beta</span></div>
        <div className="clear-mail-title">
          <div className="clear-mail-wordmark"><MailMark className="clear-mail-wordmark-symbol" /><h1>Clear Mail</h1></div>
          <h2>Email should end<br />in a <em>decision.</em></h2>
        </div>
        <div className="mail-console" aria-label="An illustration of the Clear Mail system">
          <div className="mail-console-bar"><span>Clear Mail</span><i /><i /><i /></div>
          <div className="mail-console-body">
            <nav><b>Inbox</b><span>Action items</span><span>Read later</span><span>Waiting on</span><span>Vault</span></nav>
            <div className="mail-console-list"><p><span>Today</span><span>Decision</span></p><i /><i /><i /><i /></div>
          </div>
        </div>
        <p className="clear-mail-lede">A simple system that turns your inbox into clear decisions—and gives your attention somewhere better to go.</p>
      </header>

      <dl className="mail-facts">
        <div><dt>System status</dt><dd>Private beta</dd></div>
        <div><dt>Method</dt><dd>Decide / Defer / Archive</dd></div>
        <div><dt>Format</dt><dd>Guide and practice</dd></div>
      </dl>

      <section className="mail-section mail-problem">
        <p className="mail-kicker">01 / The problem</p>
        <div><h2>Email does not just take your time.<br /><span>It occupies your attention.</span></h2><p>Important messages sit beside noise. Unfinished tasks remain visible. Things you meant to return to quietly stay open in your head.</p><strong>The problem is not too much email. It is too many unresolved decisions.</strong></div>
      </section>

      <section className="mail-manifesto">
        <p>One simple idea</p>
        <h2>An email should remain visible only while it needs your attention.</h2>
        <span>No longer than necessary.</span>
      </section>

      <section className="mail-section mail-system">
        <p className="mail-kicker">02 / The system</p>
        <div><h2>Four places.<br />No limbo.</h2><p className="mail-system-intro">Every new message belongs in one of these places—or goes straight to the archive.</p><div className="mail-state-grid">{states.map(({ title, description, icon: Icon }, index) => <article key={title}><div className="mail-state-top"><span>0{index + 1}</span><Icon size={22} strokeWidth={1.5} /></div><h3>{title}</h3><p>{description}</p></article>)}</div></div>
      </section>

      <section className="mail-flow">
        <p className="mail-kicker">03 / How it works</p>
        <h2>Clarity appears when everything has an ending.</h2>
        <ol>{steps.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}</ol>
      </section>

      <section className="mail-section mail-privacy">
        <p className="mail-kicker">04 / Privacy</p>
        <div><h2>Your email remains yours.</h2><p>We do not store the full content of your messages. We do not read attachments. We do not sell data. Clear Mail remembers decisions—not your life.</p></div>
      </section>

      <section className="mail-cta" id="clear-mail-beta">
        <p>Private beta</p>
        <h2>Your inbox should not live in your head.</h2>
        <p>We are testing Clear Mail with a small group. If this way of working speaks to you, we would like to hear from you.</p>
        <a href="mailto:hello@clearstudio.app?subject=Clear%20Mail%20private%20beta">I want to try Clear Mail <span>↗</span></a>
      </section>
      <Link className="project-back" to="/projects">← All projects</Link>
    </article>
  );
}
