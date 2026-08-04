export default function About() {
  return (
    <>
      <header className="page-intro about-intro">
        <p className="eyebrow">Clear Studio · Madrid</p>
        <h1>Small studio.<br /><span>Wide curiosity.</span></h1>
        <div className="intro-note">
          <span>Independent by design</span>
          <p>Clear Studio is a place for building thoughtful things without forcing every idea into the same shape.</p>
        </div>
      </header>
      <section className="section about-layout">
        <h2>Why we exist</h2>
        <div>
          <p className="statement">
            Clear Studio exists to reduce unnecessary complexity in digital
            work.
          </p>
          <p className="body-copy">
            Sometimes through software. Sometimes through design. Sometimes
            simply through an idea that changes how we think.
          </p>
          <p className="body-copy muted-copy">
            We make considered tools, systems and objects for a digital world
            that is more capable every year—and more fragmented than it needs to
            be.
          </p>
        </div>
      </section>
      <section className="section principles-layout" aria-labelledby="principles-heading">
        <h2 id="principles-heading">How we work</h2>
        <ol>
          <li><span>01</span><p>Start with the real problem, not the expected format.</p></li>
          <li><span>02</span><p>Remove until what remains feels inevitable.</p></li>
          <li><span>03</span><p>Give every project the identity it needs.</p></li>
        </ol>
      </section>
    </>
  );
}
