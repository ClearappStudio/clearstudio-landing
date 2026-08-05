import { Link } from "react-router-dom";
import { colourStudies } from "@/data/content";

export default function Studies() {
  return (
    <>
      <header className="page-intro studies-intro">
        <p className="eyebrow">Studio studies / Colour</p>
        <h1>Colour is not decoration.<br /><span>It changes how things feel.</span></h1>
        <div className="intro-note"><span>An open archive</span><p>Small, numbered investigations into the colours that shape our interfaces, objects and everyday digital spaces.</p></div>
      </header>
      <section className="studies-archive" aria-label="Colour studies">
        {colourStudies.map((study) => (
          <Link className={`study-archive-row study-archive-row--${study.className}`} to={`/studies/${study.slug}`} key={study.slug}>
            <div className="study-archive-meta"><span>{study.number}</span><span>{study.value}</span></div>
            <div><h2>{study.name}</h2><p>{study.note}</p></div>
            <span className="study-archive-arrow">↗</span>
          </Link>
        ))}
      </section>
    </>
  );
}
