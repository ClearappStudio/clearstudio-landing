import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./NorthRoom.css";

const EXHIBITION_PATH = "/projects/digital-art-gallery/rooms-of-light";

const NorthRoom = () => {
  const experienceRef = useRef<HTMLElement>(null);
  const [moment, setMoment] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const experience = experienceRef.current;
    if (!experience) return;

    let frame = 0;
    const clamp = (value: number) => Math.min(1, Math.max(0, value));

    const update = () => {
      const rect = experience.getBoundingClientRect();
      const span = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / span);
      experience.style.setProperty("--north-progress", progress.toFixed(4));
      setMoment(progress >= 0.14 && progress < 0.43 ? 1 : progress >= 0.47 && progress < 0.84 ? 2 : 0);
      frame = 0;
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="north-v4">
      <div className="north-ui">
        <Link className="north-back" to={EXHIBITION_PATH} aria-label="Back to Rooms of Light">
          <i aria-hidden="true" />
          <span>Rooms of Light</span>
        </Link>
        <div className="north-counter" aria-label="Work 8 of 8">
          <span>08</span><b aria-hidden="true" /><span>08</span>
        </div>
      </div>

      <section className="north-hero-wrap" ref={experienceRef}>
        <div className="north-hero">
          <div className="north-art">
            <picture>
              <source media="(max-width:620px)" srcSet="/assets/rooms-of-light/north-iphone.png" />
              <source media="(max-width:1024px)" srcSet="/assets/rooms-of-light/north-ipad.png" />
              <img src="/assets/rooms-of-light/north.png" alt="North" />
            </picture>
          </div>

          <div className={`north-message north-m1${moment === 1 ? " is-on" : ""}`}>
            <p className="north-eyebrow">08 · North</p>
            <h1>North</h1>
            <p>The exhibition arrives at its final room without closing down. The space opens, clears and begins to look forward.</p>
          </div>

          <div className={`north-message north-m2${moment === 2 ? " is-on" : ""}`}>
            <p className="north-eyebrow">An open ending</p>
            <h2>Every journey deserves an open ending.</h2>
            <p>The final room looks forward, leaving possibility in place of completion.</p>
          </div>

          <p className="north-cue north-eyebrow">Forward, not finished</p>
        </div>
      </section>

      <section className="north-about">
        <p className="north-eyebrow">Movement III · Work 08</p>
        <h2><span>An ending that</span><span>stays open.</span></h2>
        <div className="north-copy">
          <p>North concludes Rooms of Light without leaning on closure. The composition grows calmer and more spacious, but it does not resolve into a final answer. Instead, it opens the room outward.</p>
          <p>The work is built from restraint: pale air, broad reflection and a concentration of light that never hardens into a fixed destination.</p>
          <p>As the last room in the exhibition, North offers confidence without insistence. The journey ends, but the sense of movement remains.</p>
        </div>
        <div className="north-num" aria-hidden="true">08</div>
      </section>

      <section className="north-open">
        <p className="north-eyebrow">Final movement</p>
        <h2><span>Possibility instead</span><span>of completion.</span></h2>
        <p>North is the point where the exhibition becomes less about arrival than orientation. The room is clearer, more open and more generous with silence — a final gesture that invites continuation rather than conclusion.</p>
      </section>

      <section className="north-edition">
        <div className="north-ed-head">
          <p className="north-eyebrow">Digital edition</p>
          <h2>Made to keep the horizon open.</h2>
          <p>North has been adapted for Mac, iPad and iPhone, preserving its broad horizon, reflected light and quiet sense of direction across different proportions.</p>
        </div>

        <div className="north-devices">
          <figure className="north-device north-mac">
            <div className="north-shell"><div className="north-screen"><img src="/assets/rooms-of-light/north-mac.png" alt="North for Mac" /></div></div>
            <figcaption>Mac</figcaption>
          </figure>
          <figure className="north-device north-ipad">
            <div className="north-shell"><div className="north-screen"><img src="/assets/rooms-of-light/north-ipad.png" alt="North for iPad" /></div></div>
            <figcaption>iPad</figcaption>
          </figure>
          <figure className="north-device north-phone">
            <div className="north-shell"><div className="north-screen" role="img" aria-label="North for iPhone" /></div>
            <figcaption>iPhone</figcaption>
          </figure>
        </div>

        <div className="north-ed-action">
          <p className="north-eyebrow">Master · Mac · iPad · iPhone</p>
          <Link to={`${EXHIBITION_PATH}/north/digital-edition`}>View North Digital Edition →</Link>
        </div>
      </section>

      <section className="north-ending">
        <div className="north-end-bg" aria-hidden="true"><img src="/assets/rooms-of-light/north.png" alt="" /></div>
        <div className="north-end-card">
          <p className="north-eyebrow">Exhibition complete</p>
          <h2>The journey stays open.</h2>
          <p>Rooms of Light ends with a direction rather than an answer. From here, the exhibition can be revisited as a sequence of spaces still in conversation.</p>
          <Link to={EXHIBITION_PATH}>Return to Rooms of Light →</Link>
        </div>
      </section>
    </div>
  );
};

export default NorthRoom;
