import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ContextJournal.css";

export default function ContextJournal() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Introducing Context-first Computing — Clear Studio Journal";
    return () => { document.title = previous; };
  }, []);

  return <article className="context-journal">
    <header className="cfj-hero">
      <div className="cfj-topline"><Link to="/journal">← Journal</Link><span>An idea & a book</span></div>
      <div className="cfj-hero-grid">
        <div><p className="cfj-label">Introducing Context-first Computing</p><h1>Picking up<br/>the thread<span>.</span></h1><p className="cfj-deck">We have become very good at saving the work. Finding our way back into it still asks a great deal of us. This is where the book begins.</p><div className="cfj-byline"><span>Clear Studio</span><time dateTime="2026-11-11">11 November 2026</time><span>4 min read</span></div></div>
        <figure className="cfj-cover"><img src="/assets/context-first-computing/book-cover.jpg" width="1600" height="2560" alt="Introducing Context-first Computing by Francisco G. Olmedo, with interwoven coral and teal forms on an ivory cover."/><figcaption>A proposal for a new way of designing software<br/>Francisco G. Olmedo</figcaption></figure>
      </div>
    </header>

    <div className="cfj-opening"><span className="cfj-label">The familiar interruption</span><div className="cfj-prose">
      <p className="cfj-lead">You return to a project after two weeks away. The files are there. The task says what to do next. Before you can begin, you need to remember why.</p>
      <p>A meeting established the plan. A technical review exposed a constraint. An email changed the decision. Each piece has been preserved, but the relationship between them still needs to be recovered. You open a few tabs, search for a phrase and start putting the story together.</p>
      <p>This small act of reconstruction happens so often that it can feel inseparable from working with software. It is the starting point of <cite>Introducing Context-first Computing</cite>: a short book by Francisco G. Olmedo about what changes when the situation a person needs to understand becomes a starting point for design.</p>
    </div></div>

    <section className="cfj-section"><h2>The work<br/>between the files</h2><div className="cfj-prose">
      <p>Files, folders, records and applications give information a place to live. They let us preserve an enormous amount of material and retrieve it with remarkable precision. The structure is useful. Much of the meaning, however, lies in relationships that extend beyond it.</p>
      <p>A decision matters because of the alternatives that were considered. A task changes because a conversation introduced a new constraint. A note becomes useful months later because another idea brings it back into focus. Those connections are part of the work, even when they are never recorded as connections.</p>
      <p>We compensate by naming things carefully, maintaining project spaces, adding tags and keeping the history in our heads. Some of that organisation expresses intention. Some is the effort required to make our tools hold a situation they were never designed to represent.</p>
    </div></section>

    <aside className="cfj-pull"><span className="cfj-label">The question behind the book</span><p>What situation is this person trying to understand?</p></aside>

    <section className="cfj-section"><h2>A different<br/>first question</h2><div className="cfj-prose">
      <p>Context-first Computing proposes beginning with that question. Once it is asked, the interface has a different responsibility: to bring the relevant history, evidence and relationships into view so a person can continue with understanding.</p>
      <p>Consider a launch that has become a smaller pilot. Finding the latest task is only the beginning. A useful view would also explain why the launch became a smaller pilot, what has already been agreed and which question remains open. The sources would stay accessible, so the person could inspect the basis of that account.</p>
      <p>This is a design proposal. Its value has to be judged in the situations where it is used. The question is whether the software helps someone recover enough of the thread to make their own next decision.</p>
    </div></section>

    <figure className="cfj-sketch">
      <div className="cfj-sketch-heading"><span className="cfj-label">A design sketch · Fictional scenario</span><h2>Returning to the pilot.</h2><p>The same project, seen through its relationships.</p></div>
      <div className="cfj-evidence"><div><span>Meeting note</span><p>A wider launch was planned.</p></div><div><span>Technical review</span><p>Capacity testing is incomplete.</p></div><div><span>Later email</span><p>Begin with five customers.</p></div></div>
      <div className="cfj-situation"><span className="cfj-label">The situation you need to recover</span><p>The team agreed on a five-customer pilot because wider capacity testing is still incomplete.</p><div><span>Still open</span><p>Agree how to judge the pilot’s success before invitations go out.</p></div></div>
      <figcaption>A possible way to surface the thread. The underlying notes, review and email remain evidence to inspect.</figcaption>
    </figure>

    <section className="cfj-section"><h2>Interpretation<br/>needs a trail</h2><div className="cfj-prose">
      <p>The possibility becomes more interesting as software can infer relationships across material whose connections have not been explicitly described. It also introduces a responsibility. An inferred relationship can be wrong, incomplete or out of date.</p>
      <p>The book treats inspection and correction as part of the proposal. A confident account of a situation is useful only if there is a way to understand where it came from. The interface needs room for uncertainty, conflicting evidence and the person who knows that something important has been missed.</p>
      <p>Human understanding remains the centre of the work. The aim is to reduce the effort spent recovering a situation while preserving the judgement needed to act within it.</p>
    </div></section>

    <section className="cfj-section"><h2>Why put it<br/>in a book?</h2><div className="cfj-prose">
      <p>A product makes an idea concrete, but it also settles many questions at once. Writing gave this proposal space to develop before those choices became fixed: what context means for design, what an interface should reveal and how a person can return to work that has continued to change.</p>
      <p>Across five parts and twenty chapters, the book moves from the cost of fragmentation to the design principles behind Context-first Computing. It then explores a notebook as one possible expression: a place where thoughts and their relationships can develop over time. That notebook remains an exploratory concept.</p>
      <p>Publishing the book gives the idea a form others can examine. Designers, engineers and people who spend their days reconnecting fragments can read the argument, question its assumptions and try their own expressions of it.</p>
      <p>The useful test is an ordinary one. When you return to something that matters, does the software help you understand where you are, what changed and what needs your attention now?</p>
    </div></section>

    <section className="cfj-book"><div><span className="cfj-label">The idea, in print and pixels</span><h2>Introducing<br/>Context-first Computing</h2><p>A proposal for a new way of designing software.<br/>By Francisco G. Olmedo.</p><p className="cfj-edition-note">The EPUB and Kindle editions are available now.</p></div><Link to="/projects/context-first-computing">Explore the idea & the book <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 19 19 5M5 5h14v14"/></svg></Link></section>
    <nav className="cfj-related" aria-label="Related Journal articles"><span className="cfj-label">More from the studio</span><Link to="/journal/daylight-making-room-for-the-unfinished"><span>Daylight</span>Making room for the unfinished</Link><Link to="/journal/prisma-the-balance-is-only-the-beginning"><span>PRISMA</span>The balance is only the beginning</Link><Link className="cfj-all" to="/journal">All Journal entries</Link></nav>
  </article>;
}
