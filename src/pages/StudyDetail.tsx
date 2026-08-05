import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { colourStudies } from "@/data/content";

function hslToHex(h: number, s: number, l: number) {
  const saturation = s / 100;
  const lightness = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = saturation * Math.min(lightness, 1 - lightness);
  const f = (n: number) => lightness - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return `#${[f(0), f(8), f(4)].map((value) => Math.round(255 * value).toString(16).padStart(2, "0")).join("").toUpperCase()}`;
}

function QuietBlueStudy() {
  const [hue, setHue] = useState(205);
  const [saturation, setSaturation] = useState(35);
  const [lightness, setLightness] = useState(70);
  const mixedColour = `hsl(${hue} ${saturation}% ${lightness}%)`;

  const swatches = [
    ["Air", "#F4F8FB", "almost white"],
    ["Mist", "#EAF2F7", "quiet surface"],
    ["Paper Blue", "#DAE7EF", "soft structure"],
    ["Still Water", "#C3D7E4", "gentle presence"],
    ["Distance", "#91B1C8", "visible, not loud"],
    ["Deep Quiet", "#587F9A", "calm emphasis"],
  ];

  return (
    <article className="qb-study">
      <section className="qb-hero">
        <div className="qb-hero-nav"><Link to="/studies">← All studies</Link><span>Studio Study No. 001</span></div>
        <div className="qb-hero-inner"><h1>Quiet<br />Blue</h1><p>A visual study of colour, attention and the spaces an interface leaves behind.</p></div>
        <span className="qb-scroll">Begin</span>
      </section>

      <section className="qb-quote"><p>Colour can be present without asking to be noticed.</p></section>

      <section className="qb-swatches" aria-label="Quiet Blue colour family">
        {swatches.map(([name, value, note], index) => (
          <div className="qb-swatch" style={{ backgroundColor: value }} key={value}>
            <p><strong>{name}</strong>{value} · {note}</p><span>0{index + 1}</span>
          </div>
        ))}
      </section>

      <section className="qb-lab">
        <div className="qb-section-intro"><p className="qb-eyebrow">The same interface, three temperatures</p><h2>Nothing changed.<br />Only the blue did.</h2><p>Small shifts in saturation and depth alter how an interface feels: distant, reassuring, or authoritative.</p></div>
        <div className="qb-lab-grid">
          {[
            ["Low presence", "Almost neutral. The blue behaves like atmosphere rather than instruction."],
            ["Balanced presence", "Visible enough to guide the eye, soft enough to preserve the surrounding content."],
            ["High presence", "The same colour family becomes decisive when contrast and depth increase."],
          ].map(([label, copy], index) => (
            <article className={`qb-mock qb-mock--${index + 1}`} key={label}><div className="qb-mock-top"><i /><i /><i /></div><div className="qb-mock-body"><span>{label}</span><h3>Continue your work.</h3><p>{copy}</p><div>Open notebook</div></div></article>
          ))}
        </div>
      </section>

      <section className="qb-statement"><h2>Blue doesn’t always need attention.</h2></section>
      <section className="qb-split"><div className="qb-split-image" /><div className="qb-split-copy"><p className="qb-eyebrow">Atmosphere before interface</p><h2>We read colour before we read words.</h2><p>A colour field establishes distance, temperature and emotional pace before the first sentence is understood. Quiet Blue uses that first impression to lower urgency, not to remove clarity.</p></div></section>

      <section className="qb-mixer">
        <div className="qb-colour-stage" style={{ backgroundColor: mixedColour }} />
        <div className="qb-controls"><p className="qb-eyebrow">Build your quiet blue</p><output>{hslToHex(hue, saturation, lightness)}</output>
          <label>Hue<input type="range" min="190" max="220" value={hue} onChange={(event) => setHue(Number(event.target.value))} /></label>
          <label>Saturation<input type="range" min="12" max="55" value={saturation} onChange={(event) => setSaturation(Number(event.target.value))} /></label>
          <label>Lightness<input type="range" min="45" max="92" value={lightness} onChange={(event) => setLightness(Number(event.target.value))} /></label>
        </div>
      </section>

      <section className="qb-applications"><div className="qb-section-intro"><p className="qb-eyebrow">Use</p><h2>A supporting colour,<br />not a decoration.</h2></div><div className="qb-app-grid"><article><small>For space and continuity</small><h3>Background</h3><div>Today<br /><strong>Continue where you left off</strong></div></article><article><small>For focus and hierarchy</small><h3>Emphasis</h3><div>One task needs your attention.<br /><strong>Review the foundation note →</strong></div></article></div></section>
      <section className="qb-note"><h2>Designer’s note</h2><div><p>Quiet colour leaves room for everything else.</p><p>This study began with a simple question: can blue create structure without creating urgency? The answer appears to depend less on hue than on proportion, contrast and restraint. The quietest blue is often the one used least.</p></div></section>
      <section className="qb-ending"><div><h2>Still<br />exploring.</h2><p>Studio Study No. 001</p><Link to="/studies">Return to all studies →</Link></div></section>
    </article>
  );
}

export default function StudyDetail() {
  const { studySlug } = useParams();
  const study = colourStudies.find((item) => item.slug === studySlug);
  if (!study) return <Navigate to="/studies" replace />;
  if (study.slug === "quiet-blue") return <QuietBlueStudy />;

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
      <section className="study-composition" aria-label={`${study.name} visual composition`}>
        <div className="study-composition__index"><span>Form / 01</span><span>{study.value}</span></div>
        <div className="study-composition__field" aria-hidden="true">
          <i /><i /><i /><i />
        </div>
        <p>Not a colour chip, but an atmosphere: tested at scale, beside type, and in tension with light and dark.</p>
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
