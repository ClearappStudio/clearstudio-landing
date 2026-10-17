import { useEffect } from "react";
import { Link } from "react-router-dom";
import { bookParts, introductionExcerpt } from "@/data/contextBook";
import "./ContextFirstComputing.css";

const cover = "/assets/context-first-computing/book-cover.jpg";

export default function ContextFirstComputing() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Context-first Computing — The idea & the book | Clear Studio";
    return () => { document.title = previous; };
  }, []);

  return (
    <article className="cfc-page">
      <header className="cfc-hero">
        <div className="cfc-hero-copy">
          <p className="cfc-kicker">Context-first Computing / An idea & a book</p>
          <h1>Software that<br />begins with<br /><em>context.</em></h1>
          <p className="cfc-lede">What if software began with the situation you need to understand, rather than the information you need to organise?</p>
          <div className="cfc-actions">
            <a className="cfc-button" href="#the-book">Discover the book <span aria-hidden="true">↗</span></a>
            <a className="cfc-text-link" href="#the-idea">Explore the idea <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <figure className="cfc-hero-book">
          <div className="cfc-book-object"><img src={cover} width="1600" height="2560" alt="Introducing Context-first Computing, by Francisco G. Olmedo. Ivory cover with interwoven coral and teal forms." fetchPriority="high" /></div>
          <figcaption><span>A proposal by Francisco G. Olmedo</span><span>Forthcoming · November 2026</span></figcaption>
        </figure>
      </header>

      <nav className="cfc-local-nav" aria-label="On this page"><span>A different starting point</span><div><a href="#the-idea">The idea</a><a href="#the-book">The book</a><a href="#read">Read an excerpt</a></div></nav>

      <section className="cfc-section cfc-intro" id="the-idea" aria-labelledby="idea-heading">
        <div><p className="cfc-kicker">01 / The starting point</p><h2 id="idea-heading">We kept the pieces.<br />We still have to<br /><em>recover the story.</em></h2></div>
        <div className="cfc-prose"><p>A decision lives in a meeting note. Its explanation is buried in an email. A later conversation changes the plan. The task remains where it was.</p><p>Everything has been saved. Understanding how it fits together is still our responsibility.</p><p>Context-first Computing proposes a different organising principle: begin with what a person is trying to understand, and bring the relevant relationships, history and evidence into view.</p></div>
      </section>

      <section className="cfc-question" aria-labelledby="question-heading"><p className="cfc-kicker">The first question changes the design.</p><h2 id="question-heading">“What situation is this person trying to understand?”</h2><p>From that question follow different choices about what software preserves, what an interface reveals and how a person finds their way back into the work.</p></section>

      <section className="cfc-section cfc-example" aria-labelledby="continuity-heading">
        <div className="cfc-example-copy"><p className="cfc-kicker">02 / Continuity, made visible</p><h2 id="continuity-heading">A changed decision.<br /><em>Not just another document.</em></h2><p>A customer announcement becomes a smaller pilot. A useful system would help you recover why the plan changed, what has been confirmed and what still needs a decision.</p><p>The sources stay available. The interpretation can be inspected and corrected. You decide what happens next.</p><span className="cfc-example-caption">An illustrative situation explored in the book.</span></div>
        <div className="cfc-thread" aria-label="Example: the history behind a changed release plan">
          <div className="cfc-thread-heading"><span>The release plan</span><span>In context</span></div>
          <div className="cfc-thread-item"><span className="cfc-thread-index">01</span><div><small>The original agreement</small><h3>A broad customer release</h3><p>The meeting note records the initial plan.</p></div></div>
          <div className="cfc-thread-item"><span className="cfc-thread-index">02</span><div><small>What changed</small><h3>A technical constraint</h3><p>The review explains why the scope needs to change.</p></div></div>
          <div className="cfc-thread-item cfc-thread-item--current"><span className="cfc-thread-index">03</span><div><small>The current direction</small><h3>A smaller pilot</h3><p>The revised decision remains connected to its reasoning.</p></div></div>
          <p className="cfc-thread-note">A task can tell you what to do. Context helps you understand why.</p>
        </div>
      </section>

      <section className="cfc-book-section" id="the-book" aria-labelledby="book-heading">
        <div className="cfc-book-intro"><p className="cfc-kicker">03 / Introducing the book</p><h2 id="book-heading">Introducing<br /><em>Context-first Computing</em></h2><p className="cfc-book-subtitle">A proposal for a new way of designing software</p></div>
        <div className="cfc-book-grid"><div className="cfc-book-description"><p>A short book about what becomes possible when context becomes part of the material we design with.</p><p>Across twenty chapters, the argument moves from fragmented information to a new starting point for software, then explores its design principles and a notebook as one possible expression.</p><p>For designers, engineers, product thinkers and anyone interested in how our tools shape the way we work and think.</p><a href="#read" className="cfc-text-link">Read the opening pages <span aria-hidden="true">↗</span></a></div><dl className="cfc-book-facts"><div><dt>Author</dt><dd>Francisco G. Olmedo</dd></div><div><dt>Inside</dt><dd>5 parts · 20 chapters</dd></div><div><dt>Language</dt><dd>English</dd></div><div><dt>Planned publication</dt><dd>16 November 2026</dd></div></dl></div>
        <div className="cfc-contents"><p className="cfc-kicker">Inside the book</p>{bookParts.map(part => <details key={part.number}><summary><span>{part.number}</span><h3>{part.title}</h3><span className="cfc-expand" aria-hidden="true">+</span></summary><p>{part.description}</p><ol start={part.start}>{part.chapters.map(chapter => <li key={chapter}>{chapter}</li>)}</ol></details>)}</div>
      </section>

      <section className="cfc-section cfc-excerpt" id="read" aria-labelledby="excerpt-heading"><div className="cfc-excerpt-label"><p className="cfc-kicker">04 / An invitation to read</p><h2 id="excerpt-heading">Begin here.</h2><p>From the introduction to<br /><cite>Introducing Context-first Computing</cite>.</p></div><div className="cfc-excerpt-copy"><p className="cfc-excerpt-opening">{introductionExcerpt[0]}</p>{introductionExcerpt.slice(1,4).map(p=><p key={p}>{p}</p>)}<details className="cfc-read-more"><summary>Continue reading the introduction <span aria-hidden="true">↓</span></summary>{introductionExcerpt.slice(4).map(p=><p key={p}>{p}</p>)}</details><p className="cfc-excerpt-credit">© 2026 Francisco G. Olmedo</p></div></section>

      <section className="cfc-editions" aria-labelledby="editions-heading"><div className="cfc-editions-heading"><p className="cfc-kicker">05 / Choose how you read</p><h2 id="editions-heading">A small book.<br /><em>An open possibility.</em></h2><p>Planned for 16 November 2026. Purchase links will be added when the editions are available.</p></div><div className="cfc-formats"><article><div className="cfc-format-title"><h3>Digital edition</h3><span>€4.99</span></div><p>EPUB for compatible reading apps and devices. A reflowable edition with adjustable text.</p><span className="cfc-availability">Coming to this website</span></article><article><div className="cfc-format-title"><h3>Paperback</h3><span>€10.39</span></div><p>90 pages. A compact 5 × 8-inch edition, printed in black on cream paper.</p><span className="cfc-availability">Coming to Amazon</span></article><article><div className="cfc-format-title"><h3>Kindle</h3><span>€4.99</span></div><p>For Kindle readers and the Kindle app. The same book, ready for your reading library.</p><span className="cfc-availability">Coming to Amazon</span></article></div><p className="cfc-price-note">Planned prices for Spain, including VAT. Amazon prices may vary by marketplace.</p></section>

      <section className="cfc-closing"><p className="cfc-kicker">The idea continues beyond the book.</p><h2>A starting point<br /><em>for what comes next.</em></h2><p>The notebook is an exploratory proposal, not a validated product. Its purpose is to make the questions concrete—and invite others to develop their own answers.</p><div className="cfc-actions"><Link className="cfc-text-link" to="/projects/notebook">Explore the notebook concept <span aria-hidden="true">↗</span></Link><a className="cfc-text-link" href="mailto:hello@clearstudio.app?subject=Context-first%20Computing">Join the conversation <span aria-hidden="true">↗</span></a></div></section>
    </article>
  );
}
