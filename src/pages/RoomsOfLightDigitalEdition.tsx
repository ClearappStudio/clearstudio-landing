import { Link } from "react-router-dom";
import "./RoomsOfLightDigitalEdition.css";

const ROOM_PATH = "/projects/digital-art-gallery/rooms-of-light";
const ASSET_PATH = "/assets/rooms-of-light/";

const works = [
  { number: "01", slug: "arrival", title: "Arrival", image: "arrival.png" },
  { number: "02", slug: "open-sky", title: "Open Sky", image: "open-sky.png" },
  { number: "03", slug: "signals", title: "Signals", image: "signals.png" },
  { number: "04", slug: "between-shapes", title: "Between Shapes", image: "between-shapes.png" },
  { number: "05", slug: "bloom", title: "Bloom", image: "bloom.png" },
  { number: "06", slug: "blue-hour", title: "Blue Hour", image: "blue-hour.png" },
  { number: "07", slug: "still-water", title: "Still Water", image: "still-water.png" },
  { number: "08", slug: "north", title: "North", image: "north.png" },
];

function DeviceSet({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "de8-single-devices" : "de8-devices"} aria-label="Arrival adapted for Mac, iPad and iPhone">
      <figure className="de8-device de8-mac">
        <div className="de8-frame">
          <img src={`${ASSET_PATH}arrival-mac.webp`} alt="Arrival for Mac" />
        </div>
        <figcaption>Mac</figcaption>
      </figure>
      <figure className="de8-device de8-ipad">
        <div className="de8-frame">
          <img src={`${ASSET_PATH}arrival-ipad.webp`} alt="Arrival for iPad" />
        </div>
        <figcaption>iPad</figcaption>
      </figure>
      <figure className="de8-device de8-phone">
        <div className="de8-frame">
          <img src={`${ASSET_PATH}arrival-iphone.webp`} alt="Arrival for iPhone" />
        </div>
        <figcaption>iPhone</figcaption>
      </figure>
    </div>
  );
}

export default function RoomsOfLightDigitalEdition() {
  return (
    <article className="rol-de-v8">
      <section className="de8-hero">
        <div className="de8-top">
          <Link to={ROOM_PATH}>Rooms of Light</Link>
          <span>Digital Edition · 2026</span>
        </div>
        <p className="de8-eyebrow">Exhibition 01 · Digital Edition</p>
        <h1><span>Digital</span><span>Edition</span></h1>
        <div className="de8-hero-bottom">
          <p className="de8-hero-lead">The exhibition does not have to end at the edge of the browser.</p>
          <p className="de8-hero-copy">Each work in <em>Rooms of Light</em> has been adapted for the screens where ideas happen — preserving its balance, light and sense of space across different proportions.</p>
          <a className="de8-down" href="#adapted">Continue</a>
        </div>
      </section>

      <section id="adapted" className="de8-adapted">
        <div className="de8-adapted-head">
          <p className="de8-eyebrow">One work · Different proportions</p>
          <h2>Adapted,<br />not simply cropped.</h2>
          <p>Every edition is composed again for desktop, tablet and phone. The work remains the same. Its relationship with the screen changes.</p>
        </div>
        <DeviceSet />
      </section>

      <section className="de8-choose">
        <div className="de8-choose-head">
          <p className="de8-eyebrow">Two ways to keep the exhibition</p>
          <h2>The whole sequence.<br />Or one room.</h2>
          <p>Every work arrives in three screen-ready versions. Choose the complete exhibition, or the work you want to live with.</p>
        </div>

        <div className="de8-options">
          <article className="de8-option de8-complete">
            <div className="de8-option-top">
              <p className="de8-option-kicker">Complete Digital Edition · 01–08</p>
              <span className="de8-price">€50</span>
            </div>
            <h3>Keep the whole sequence.</h3>
            <p className="de8-option-copy">All eight works in <em>Rooms of Light</em>, each individually adapted for Mac, iPad and iPhone.</p>
            <div className="de8-value">
              <span>8 works</span><span>24 screen-ready images</span><span>Mac · iPad · iPhone</span>
            </div>
            <div className="de8-complete-strip" aria-label="All eight works in Rooms of Light">
              {works.map((work) => <img key={work.slug} src={`${ASSET_PATH}${work.image}`} alt={work.title} loading="lazy" decoding="async" />)}
            </div>
            <div className="de8-option-bottom">
              <div>
                <p>Eight individual editions would be €80.</p>
                <p className="de8-saving">Complete edition · €50</p>
              </div>
              <button className="de8-action" type="button" disabled>Choose complete edition →</button>
            </div>
          </article>

          <article className="de8-option de8-single">
            <div className="de8-option-top">
              <p className="de8-option-kicker">Individual Digital Edition</p>
              <span className="de8-price">€10</span>
            </div>
            <h3>Stay with one room.</h3>
            <p className="de8-option-copy">Choose any one of the eight works. You receive three separate images, each composed for its screen.</p>
            <div className="de8-value">
              <span>1 work</span><span>3 screen-ready images</span><span>Mac · iPad · iPhone</span>
            </div>
            <DeviceSet compact />
            <div className="de8-option-bottom">
              <p>Same artwork. Three compositions made for the screens you use.</p>
              <a className="de8-action" href="#works">Choose a work ↓</a>
            </div>
          </article>
        </div>
      </section>

      <section id="works" className="de8-works">
        <div className="de8-works-head">
          <p className="de8-eyebrow">Individual Digital Editions · €10 each</p>
          <h2>Choose a room.</h2>
          <p>Each selection includes three screen-ready images: one for Mac, one for iPad and one for iPhone.</p>
        </div>
        <div className="de8-grid">
          {works.map((work) => (
            <article className="de8-work" key={work.slug}>
              <Link className="de8-work-art" to={`${ROOM_PATH}/${work.slug}`} aria-label={`View ${work.title}`}>
                <img src={`${ASSET_PATH}${work.image}`} alt={work.title} loading="lazy" decoding="async" />
              </Link>
              <div className="de8-work-head">
                <h3>{work.title}</h3>
                <span className="de8-num">{work.number}</span>
              </div>
              <div className="de8-work-meta">
                <span>Mac · iPad · iPhone</span>
                <strong>€10</strong>
              </div>
              <button className="de8-action" type="button" disabled>Choose {work.title} →</button>
            </article>
          ))}
        </div>
      </section>

      <section className="de8-license">
        <div className="de8-license-title">
          <p className="de8-eyebrow">Personal Digital License</p>
          <h2>One person.<br />All your screens.</h2>
        </div>
        <div className="de8-license-copy">
          <p>Made to stay with you across the devices you use.</p>
          <div className="de8-license-row"><span>Use</span><span>Personal screens, including a work-provided device used by you.</span></div>
          <div className="de8-license-row"><span>Adapt</span><span>Crop, scale and reposition as needed to fit your screen.</span></div>
          <div className="de8-license-row"><span>Share</span><span>Photos and screenshots of your setup are welcome.</span></div>
          <div className="de8-license-row"><span>Not included</span><span>Redistribution, resale, commercial use, derivative works or AI training.</span></div>
        </div>
      </section>

      <section className="de8-end">
        <div>
          <p className="de8-eyebrow">Rooms of Light · Exhibition 01</p>
          <h2>The room changes scale.<br />It does not disappear.</h2>
          <Link className="de8-action" to={ROOM_PATH}>Return to the exhibition →</Link>
        </div>
      </section>
    </article>
  );
}
