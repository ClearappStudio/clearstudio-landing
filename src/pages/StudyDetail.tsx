import { Link, Navigate, useParams } from "react-router-dom";
import { colourStudies } from "@/data/content";

export default function StudyDetail() {
  const { studySlug } = useParams();
  const study = colourStudies.find((item) => item.slug === studySlug);
  if (!study) return <Navigate to="/studies" replace />;

  return (
    <article className={`study-page study-page--${study.className}`}>
      <header className="study-hero">
        <div className="study-hero-top"><Link to="/studies">← All studies</Link><span>{study.number}</span></div>
        <div><p>Colour study</p><h1>{study.name}</h1></div>
        <p className="study-hero-note">{study.note}</p>
      </header>
      <dl className="study-facts">
        <div><dt>Status</dt><dd>{study.status}</dd></div>
        <div><dt>Field</dt><dd>{study.field}</dd></div>
        <div><dt>Started</dt><dd>{study.started}</dd></div>
        <div><dt>Primary value</dt><dd>{study.value}</dd></div>
      </dl>
      <section className="study-observation">
        <p className="eyebrow">Observation 01</p>
        <p className="study-statement">{study.name} is calm without disappearing. It can hold a large surface, support concentrated work and still give an interface a recognisable point of view.</p>
      </section>
      <section className="study-palette" aria-labelledby="palette-heading">
        <div className="study-section-heading"><p className="eyebrow">Palette / 01</p><h2 id="palette-heading">A small working family.</h2></div>
        <div className="palette-grid">{study.palette.map((colour) => <div className="palette-swatch" style={{ backgroundColor: colour.value }} key={colour.value}><span>{colour.name}</span><span>{colour.value}</span></div>)}</div>
      </section>
      <section className="study-proportions">
        <div><span style={{ backgroundColor: study.palette[0].value }}>60%</span><span style={{ backgroundColor: study.palette[2].value }}>25%</span><span style={{ backgroundColor: study.palette[1].value }}>10%</span><span style={{ backgroundColor: study.palette[3].value }}>5%</span></div>
        <p>One possible balance: let the colour establish the atmosphere, then use its lighter and darker companions to create hierarchy rather than noise.</p>
      </section>
    </article>
  );
}
