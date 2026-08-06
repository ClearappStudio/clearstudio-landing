import { Link } from "react-router-dom";

const practices = [
  {
    number: "01",
    name: "Software",
    className: "software",
    description: "Tools that remove friction and make digital work feel more natural.",
  },
  {
    number: "02",
    name: "Systems",
    className: "systems",
    description: "Ways of organising work and information so that the whole becomes easier to understand.",
  },
  {
    number: "03",
    name: "Designs",
    className: "designs",
    description: "Objects made to bring usefulness, character and a little delight to a digital environment.",
  },
  {
    number: "04",
    name: "Ideas",
    className: "ideas",
    description: "Thoughts that may become projects—or simply change how we see something familiar.",
  },
];

export default function About() {
  return (
    <>
      <header className="page-intro about-intro">
        <p className="eyebrow">Independent by design</p>
        <h1>Small studio.<br /><span>Wide curiosity.</span></h1>
        <div className="intro-note">
          <p>Clear Studio is a place for building thoughtful things without forcing every idea into the same shape.</p>
        </div>
      </header>

      <section className="section about-opening" aria-labelledby="about-studio-heading">
        <p className="eyebrow" id="about-studio-heading">The studio</p>
        <div>
          <p className="about-lead">A small independent studio for digital work.</p>
          <div className="about-copy-columns">
            <p>Clear Studio makes software, systems, objects and ideas that help digital work feel more understandable, thoughtful and human.</p>
            <p>Some projects begin with a practical frustration. Others begin with a question, an observation or a different way of looking at something familiar. They do not always result in the same kind of object—and they are not supposed to.</p>
          </div>
        </div>
      </section>

      <section className="section about-practices" aria-labelledby="forms-heading">
        <div className="about-section-heading">
          <p className="eyebrow">What we make</p>
          <h2 id="forms-heading">Different problems need <span>different forms.</span></h2>
        </div>
        <div className="practice-list">
          {practices.map((practice) => (
            <article className={`practice-row practice-row--${practice.className}`} key={practice.name}>
              <span className="practice-number">{practice.number}</span>
              <h3><i aria-hidden="true" />{practice.name}</h3>
              <p>{practice.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section about-character" aria-labelledby="character-heading">
        <p className="eyebrow">How we work</p>
        <div>
          <h2 id="character-heading">Deliberately small.<br /><span>Never solitary.</span></h2>
          <div className="about-copy-columns">
            <p>Clear Studio is not built around a single product, discipline or business model. It is a place where ideas can be explored carefully, allowed to change shape and released when they have something worthwhile to offer.</p>
            <p>Projects are shaped through collaboration, bringing together different perspectives and capabilities whenever the work calls for them. Some will remain experiments. Some will become useful products. Others may exist simply to articulate an idea clearly.</p>
          </div>
        </div>
      </section>

      <section className="section about-origin" aria-labelledby="origin-heading">
        <p className="eyebrow">The beginning</p>
        <div>
          <h2 id="origin-heading">Founded by<br />Francisco Olmedo.</h2>
          <div className="about-origin-copy">
            <p>Clear Studio was founded in Madrid by Francisco Olmedo, a software and technology consultant with more than fifteen years of experience designing digital systems for organisations.</p>
            <p>The studio grew from a desire to explore a different kind of work: smaller in scale, broader in form and guided by clarity rather than convention. Its identity, however, belongs to the work—and to the collaborations that make that work possible.</p>
          </div>
        </div>
      </section>

      <section className="section about-closing" aria-labelledby="progress-heading">
        <p className="eyebrow">Still evolving</p>
        <div>
          <h2 id="progress-heading">Clear Studio is<br /><span>a work in progress.</span></h2>
          <p>See what we are making, or follow the questions and decisions behind the work.</p>
          <nav aria-label="Explore Clear Studio">
            <Link to="/projects">View all projects <span aria-hidden="true">↗</span></Link>
            <Link to="/journal">Visit the Journal <span aria-hidden="true">↗</span></Link>
          </nav>
        </div>
      </section>
    </>
  );
}
