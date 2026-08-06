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

function SoftSignalStudy() {
  const impacts = [
    ["✦", "Guiding", "Draws attention with ease."],
    ["◉", "Warm", "Creates comfort and trust."],
    ["◌", "Human", "Feels natural, not mechanical."],
    ["≈", "Balanced", "Works well with neutrals and darks."],
  ];
  const uses = [
    ["◎", "Wayfinding", "Indicates where to go without overwhelming the content."],
    ["→", "Actions", "Supports primary actions in calm interfaces."],
    ["●", "Notifications", "Signals something new without creating stress."],
    ["▬", "Progress", "Shows advancement in a stable and optimistic way."],
    ["◇", "Labels", "Organises categories with warmth."],
  ];
  const pairings = [
    ["Warm Paper", "#F2EFE7"], ["Burnt Umber", "#4F2814"], ["Deep Navy", "#173044"],
    ["Quiet Blue", "#6D8FB8"], ["Sage", "#92AD80"],
  ];

  return (
    <article className="ss-study">
      <section className="ss-hero">
        <div className="ss-container">
          <div className="ss-hero-top"><Link to="/studies">← All studies</Link><span>No. 002</span></div>
          <div className="ss-hero-main"><div><p className="ss-label">Colour study</p><h1>Soft Signal</h1></div><p>A study of a colour that attracts attention with softness and creates clarity without pressure.</p></div>
        </div>
        <dl className="ss-meta"><div><dt>Status</dt><dd>Early study</dd></div><div><dt>Field</dt><dd>Signals / wayfinding</dd></div><div><dt>Started</dt><dd>August 2026</dd></div><div><dt>Primary value</dt><dd>#E98552</dd></div></dl>
      </section>

      <section className="ss-section"><div className="ss-container ss-grid"><p className="ss-index">01 · The impact</p><div><h2>Soft Signal is calm<br />without disappearing.</h2><p className="ss-lede">It has enough energy to be noticed, but not so much that it competes. It brings warmth to digital spaces and makes actions feel human and approachable.</p><div className="ss-impact-grid">{impacts.map(([icon, title, copy]) => <div className="ss-impact" key={title}><span>{icon}</span><div><strong>{title}</strong><p>{copy}</p></div></div>)}</div></div></div></section>

      <section className="ss-section"><div className="ss-container ss-grid"><p className="ss-index">02 · The colour</p><div className="ss-colour-data"><div className="ss-data-card"><span className="ss-label">Primary</span><strong>#E98552</strong><p>R 233 · G 133 · B 82</p><p>H 18° · S 80% · L 62%</p></div><div><span className="ss-label">Tints</span><div className="ss-tints">{[["#F7D7C5","#F7D7C5"],["#F3B89C","#F3B89C"],["#E98552","#E98552"],["#D45F3D","#D45F3D"],["#B7572A","#B7572A"]].map(([name, colour], index) => <div style={{backgroundColor: colour, color: index > 2 ? "white" : undefined}} key={name}>{name}</div>)}</div></div></div></div></section>

      <section className="ss-section"><div className="ss-container ss-grid"><p className="ss-index">03 · In context</p><div className="ss-context"><div><h3>The same interface,<br />only the signal changes.</h3><p className="ss-lede">The feeling shifts. The hierarchy stays.</p></div><div className="ss-ui-grid">{[["neutral","Neutral grey","Feels distant"],["soft","Soft Signal","Feels warm and clear"],["urgent","Strong red","Feels urgent"]].map(([tone, name, note]) => <div key={tone}><div className="ss-ui-card"><h4>Inbox</h4><p>Today</p><p className={`ss-ui-row ss-ui-row--${tone}`}>Updates</p><p>Messages</p><p>Settings</p></div><small>{name}<br />{note}</small></div>)}</div></div></div></section>

      <section className="ss-section"><div className="ss-container"><p className="ss-index ss-index--spaced">04 · Where it works</p><div className="ss-uses">{uses.map(([symbol, title, copy]) => <div key={title}><span>{symbol}</span><strong>{title}</strong><p>{copy}</p></div>)}</div></div></section>

      <section className="ss-form"><div className="ss-container ss-form-grid"><div><p className="ss-index">Form / 01</p><p>Not a colour chip, but an atmosphere: tested at scale, beside type, and in tension with light and dark.</p></div><div className="ss-composition"><i /><i /><i /><i /></div></div></section>

      <section className="ss-section"><div className="ss-container ss-grid"><p className="ss-index">05 · Palette</p><div><h2>A small working family.</h2><div className="ss-palette">{[["Soft Signal","#E98552"],["Burnt Umber","#4F2814"],["Apricot Air","#F4C8AC"],["Warm Paper","#F2EFE7"]].map(([name, colour], index) => <div style={{backgroundColor: colour, color: index === 1 ? "white" : undefined}} key={name}><span>{name}</span><strong>{colour}</strong></div>)}</div></div></div></section>

      <section className="ss-section"><div className="ss-container ss-grid"><p className="ss-index">06 · Pairings</p><div><p className="ss-lede ss-lede--small">Soft Signal works best with colours that give it space to breathe.</p><div className="ss-pairings">{pairings.map(([name, colour]) => <div key={name}><div><i /><i style={{backgroundColor: colour}} /></div><strong>{name}</strong><small>{colour}</small></div>)}</div></div></div></section>

      <section className="ss-section"><div className="ss-container ss-balance-grid"><div><p className="ss-index">07 · The balance</p><p className="ss-lede ss-lede--small">One possible balance: warmth for energy, neutrals for space, dark for anchor.</p></div><div><div className="ss-balance"><span>40%</span><span>45%</span><span>15%</span></div><div className="ss-balance-notes"><p><strong>Soft Signal</strong><br />For energy and guidance</p><p><strong>Neutrals</strong><br />For space and clarity</p><p><strong>Dark</strong><br />For contrast</p></div></div></div></section>
    </article>
  );
}

function NewLeafStudy() {
  const pairings = [
    ["Warm Paper", "#F3EFE7"],
    ["Forest Tone", "#173820"],
    ["Clay", "#D77A5D"],
    ["Mist Blue", "#BFD7E4"],
    ["Soft Lavender", "#C7C3D6"],
  ];

  return (
    <article className="nl-study">
      <section className="nl-hero">
        <div className="nl-container">
          <div className="nl-hero-top"><Link to="/studies">← All studies</Link><span>No. 003</span></div>
          <div className="nl-hero-main"><div><p className="nl-label">Colour study</p><h1>New Leaf</h1></div><p>A useful green with a little optimism.</p></div>
        </div>
        <dl className="nl-meta"><div><dt>Status</dt><dd>Early study</dd></div><div><dt>Field</dt><dd>Software / calm states</dd></div><div><dt>Started</dt><dd>August 2026</dd></div><div><dt>Primary value</dt><dd>#91AE83</dd></div></dl>
      </section>

      <section className="nl-section"><div className="nl-container nl-essence"><div><p className="nl-index">01 · Essence</p><h2>Not loud.<br />Not passive.<br /><em>Alive.</em></h2><p className="nl-lede">New Leaf sits between nature and interface. It brings freshness without brightness, growth without urgency. It is the colour of quiet progress and clear intentions.</p></div><div className="nl-art" aria-hidden="true"><i /><i /><i /><i /></div></div></section>

      <section className="nl-atmosphere"><div className="nl-photo" aria-hidden="true" /><div className="nl-panel"><p className="nl-index">02 · Atmosphere</p><h3>Feels like:</h3>{["Morning light", "Fresh air", "New starts", "Steady growth", "Clear mind"].map((feeling) => <p key={feeling}>{feeling}</p>)}</div><div className="nl-panel nl-depth"><p className="nl-index">03 · Depth</p><div className="nl-scale">{["#CAD9C2", "#A6BD98", "#7D9A6F", "#4D6E4D", "#173820"].map((colour) => <i style={{ backgroundColor: colour }} key={colour} />)}</div><p className="nl-lede">It changes character with depth. Lighter tints feel airy and open. Darker tones bring stability and focus.</p></div></section>

      <section className="nl-section"><div className="nl-container nl-interface"><div><p className="nl-index">04 · In interface</p><h2>Supports,<br />never competes.</h2><p className="nl-lede">New Leaf works beautifully for states of success, confirmation, calm progress and gentle encouragement.</p></div><div className="nl-cards">{[["Subtle background", "#ECE9E2"], ["Reassuring highlight", "#D7E4D1"], ["Positive action", "#91AE83"]].map(([title, colour]) => <article key={title}><h3>{title}</h3><p>Everything good.</p><span style={{ backgroundColor: colour }}>Continue</span></article>)}</div></div></section>

      <section className="nl-section"><div className="nl-container"><p className="nl-index nl-index--spaced">05 · Colour pairings</p><div className="nl-pairings">{pairings.map(([name, colour]) => <div key={name}><div><i /><i style={{ backgroundColor: colour }} /></div><strong>{name}</strong></div>)}</div></div></section>

      <section className="nl-section"><div className="nl-container nl-proportion"><div><p className="nl-index">06 · Proportion</p><h2>Let green lead,<br />with room to breathe.</h2></div><div className="nl-bar"><span>60%</span><span>25%</span><span>10%</span><span>5%</span></div></div></section>
    </article>
  );
}

export default function StudyDetail() {
  const { studySlug } = useParams();
  const study = colourStudies.find((item) => item.slug === studySlug);
  if (!study) return <Navigate to="/studies" replace />;
  if (study.slug === "quiet-blue") return <QuietBlueStudy />;
  if (study.slug === "soft-signal") return <SoftSignalStudy />;
  if (study.slug === "new-leaf") return <NewLeafStudy />;

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
