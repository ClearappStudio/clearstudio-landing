import { Link } from "react-router-dom";
import "./RoomsOfLightDigitalEdition.css";
import "./RoomsOfLightDigitalEditionDevices.css";

const ROOM_PATH = "/projects/digital-art-gallery/rooms-of-light";
const ASSET_PATH = "/assets/rooms-of-light/";

const editions = [
  { number: "01", slug: "arrival", title: "Arrival", note: "A room appears.", image: "arrival.png", tone: "#f0ece3" },
  { number: "02", slug: "open-sky", title: "Open Sky", note: "The distance opens.", image: "open-sky.png", tone: "#efe5d6" },
  { number: "03", slug: "signals", title: "Signals", note: "Structure becomes rhythm.", image: "signals.png", tone: "#e5e4de" },
  { number: "04", slug: "between-shapes", title: "Between Shapes", note: "Balance becomes uncertain.", image: "between-shapes.png", tone: "#d8d5cf" },
  { number: "05", slug: "bloom", title: "Bloom", note: "Colour enters the room.", image: "bloom.png", tone: "#e1d8cf" },
  { number: "06", slug: "blue-hour", title: "Blue Hour", note: "The volume lowers.", image: "blue-hour.png", tone: "#d6dbd8" },
  { number: "07", slug: "still-water", title: "Still Water", note: "Almost nothing needs to remain.", image: "still-water.png", tone: "#dbe2df" },
  { number: "08", slug: "north", title: "North", note: "The final room does not close.", image: "north.png", tone: "#dde6e2" },
];

export default function RoomsOfLightDigitalEdition() {
  return (
    <article className="rol-de">
      <section className="de-hero">
        <div className="de-ui">
          <Link to={ROOM_PATH}>Rooms of Light</Link>
          <span>Digital Edition · 2026</span>
        </div>

        <p className="de-eyebrow de-hero-kicker">Exhibition 01 · Digital Edition</p>
        <h1><span>Digital</span><span>Edition</span></h1>

        <div className="de-hero-bottom">
          <p className="de-hero-lead">The exhibition does not have to end at the edge of the browser.</p>
          <p className="de-copy">Each work in <em>Rooms of Light</em> has been adapted for the screens where ideas happen — preserving its balance, light and sense of space across different proportions.</p>
          <a className="de-down" href="#adapted">Continue</a>
        </div>
      </section>

      <section id="adapted" className="de-adapted">
        <div className="de-adapted-copy">
          <p className="de-eyebrow">One work · Different proportions</p>
          <h2>Adapted,<br />not simply cropped.</h2>
          <p>Every edition is composed again for desktop, tablet and phone. The work remains the same. Its relationship with the screen changes.</p>
        </div>

        <div className="de-device-study" aria-label="Arrival adapted for Mac, iPad and iPhone">
          <figure className="de-device de-device-mac">
            <div><img src={`${ASSET_PATH}arrival-mac.webp`} alt="Arrival for Mac" /></div>
            <figcaption>Mac</figcaption>
          </figure>
          <figure className="de-device de-device-ipad">
            <div><img src={`${ASSET_PATH}arrival-ipad.webp`} alt="Arrival for iPad" /></div>
            <figcaption>iPad</figcaption>
          </figure>
          <figure className="de-device de-device-phone">
            <div><img src={`${ASSET_PATH}arrival-iphone.webp`} alt="Arrival for iPhone" /></div>
            <figcaption>iPhone</figcaption>
          </figure>
        </div>
      </section>

      <section className="de-complete">
        <div className="de-complete-head">
          <div>
            <p className="de-eyebrow">Complete Digital Edition · 01–08</p>
            <h2>Keep the<br />whole sequence.</h2>
          </div>
          <div className="de-complete-meta">
            <p>Eight works, from <em>Arrival</em> to <em>North</em>, with every screen adaptation included.</p>
            <span className="de-price">€50</span>
          </div>
        </div>

        <div className="de-complete-mosaic">
          {editions.map((edition) => (
            <figure key={edition.slug}>
              <img src={`${ASSET_PATH}${edition.image}`} alt={edition.title} loading="lazy" decoding="async" />
              <figcaption><span>{edition.number}</span><span>{edition.title}</span></figcaption>
            </figure>
          ))}
        </div>

        <div className="de-complete-action">
          <p className="de-eyebrow">Master · Mac · iPad · iPhone</p>
          <button type="button" disabled>Choose complete edition <span>€50</span></button>
        </div>
      </section>

      <section id="individual-editions" className="de-individual-intro">
        <p className="de-eyebrow">Individual Digital Editions</p>
        <h2>Or stay with<br />one room.</h2>
        <p>Each work is also available on its own, with the same care across every screen format.</p>
      </section>

      <section className="de-editions" aria-label="Individual editions">
        {editions.map((edition, index) => (
          <article key={edition.slug} id={edition.slug} className={`de-edition${index % 2 ? " is-reversed" : ""}`} style={{ backgroundColor: edition.tone }}>
            <Link className="de-edition-art" to={`${ROOM_PATH}/${edition.slug}`} aria-label={`View ${edition.title}`}>
              <img src={`${ASSET_PATH}${edition.image}`} alt={edition.title} loading="lazy" decoding="async" />
            </Link>
            <div className="de-edition-info">
              <p className="de-eyebrow">{edition.number} · Digital Edition</p>
              <h3>{edition.title}</h3>
              <p className="de-edition-note">{edition.note}</p>
              <div className="de-edition-price"><span>Individual edition</span><strong>€10</strong></div>
              <div className="de-edition-actions">
                <Link to={`${ROOM_PATH}/${edition.slug}`}>View the work ↗</Link>
                <button type="button" disabled>Choose {edition.title} edition →</button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section id="license" className="de-license">
        <div className="de-license-title">
          <p className="de-eyebrow">Personal Digital License</p>
          <h2>One person.<br />All your screens.</h2>
        </div>
        <div className="de-license-copy">
          <p>Your edition is licensed to you personally, worldwide, for the duration of the applicable copyright protection. Use it across every screen you personally use, now and in the future.</p>
          <dl>
            <div><dt>Use</dt><dd>Personal screens, including a work-provided device used by you.</dd></div>
            <div><dt>Adapt</dt><dd>Crop, scale and reposition as needed to fit your screen.</dd></div>
            <div><dt>Share</dt><dd>Photos or screenshots of your setup are welcome.</dd></div>
            <div><dt>Not included</dt><dd>Redistribution, resale, commercial use, derivative works or AI training.</dd></div>
          </dl>
          <p className="de-license-owner">Copyright remains with Francisco Gregorio Olmedo Ariza.</p>
          <p className="de-license-line">Yours to live with, not to redistribute.</p>
          <a href="mailto:hello@clearstudio.app">Licensing questions ↗</a>
        </div>
      </section>

      <section className="de-ending">
        <p className="de-eyebrow">Rooms of Light · Exhibition 01</p>
        <h2>The room changes scale.<br />It does not disappear.</h2>
        <Link to={ROOM_PATH}>Return to the exhibition →</Link>
      </section>
    </article>
  );
}
