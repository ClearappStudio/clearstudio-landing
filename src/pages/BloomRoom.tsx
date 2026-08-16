import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./BloomRoom.css";

const EXHIBITION_PATH = "/projects/digital-art-gallery/rooms-of-light";
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export default function BloomRoom() {
  const experienceRef = useRef<HTMLElement>(null);
  const [activeMoment, setActiveMoment] = useState<"title" | "phrase" | null>(null);
  const [onHero, setOnHero] = useState(true);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const experience = experienceRef.current;
      if (!experience) return;
      const rect = experience.getBoundingClientRect();
      const span = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / span);
      const moment = progress >= 0.16 && progress < 0.49
        ? "title"
        : progress >= 0.52 && progress < 0.82
          ? "phrase"
          : null;
      setActiveMoment((current) => current === moment ? current : moment);
      const heroVisible = rect.bottom > 42;
      setOnHero((current) => current === heroVisible ? current : heroVisible);
    };
    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => { frame = 0; update(); });
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
    <article className="bloom-v1">
      <div className={`bloom-museum-ui${onHero ? " on-hero" : ""}`}>
        <Link className="bloom-ui-back" to={EXHIBITION_PATH}><i aria-hidden="true" /><span>Rooms of Light</span></Link>
        <div className="bloom-ui-count" aria-label="Work 5 of 8"><span>05</span><span className="line"><i /></span><span>08</span></div>
      </div>

      <section ref={experienceRef} className="bloom-experience">
        <div className="bloom-stage">
          <div className="bloom-art">
            <picture>
              <source media="(max-width:620px)" srcSet="/assets/rooms-of-light/bloom-iphone.png" />
              <source media="(max-width:1024px)" srcSet="/assets/rooms-of-light/bloom-ipad.png" />
              <img src="/assets/rooms-of-light/bloom.png" width="1448" height="1086" alt="Bloom" />
            </picture>
          </div>
          <div className={`bloom-title${activeMoment === "title" ? " is-active" : ""}`}>
            <p className="bloom-eyebrow">05 · Bloom</p><h1>Bloom</h1><p>Colour enters the room.</p>
          </div>
          <div className={`bloom-phrase${activeMoment === "phrase" ? " is-active" : ""}`}>
            <small>Inside the work</small><p>The room is no longer defined by its edges.</p>
          </div>
          <p className="bloom-rest bloom-eyebrow">Scroll to enter the work</p>
        </div>
      </section>

      <section className="bloom-about">
        <p className="bloom-eyebrow">Movement II · Transforming space</p>
        <h2><span>Colour becomes</span><span>structure.</span></h2>
        <div className="bloom-about-copy">
          <p>Bloom sits at the emotional centre of Rooms of Light. Here, the architecture has almost disappeared. What remains is a field of colour, reflected light and movement.</p>
          <p>The composition is still spatial, but the room is no longer something to understand through walls or openings. It is felt through warmth, saturation and the way one colour changes the weight of another.</p>
          <p>Bloom is the point where the exhibition stops asking what a room looks like and begins asking what a room can feel like.</p>
        </div>
        <div className="bloom-about-number" aria-hidden="true">05</div>
      </section>

      <section className="bloom-colour-field">
        <p className="bloom-eyebrow">A change of temperature</p>
        <h2><span>Light gives shape.</span><span>Colour gives mood.</span></h2>
        <p className="bloom-colour-note">Nothing here needs to be identified before it can be understood. The work operates first as atmosphere: a room made from warmth, contrast and the quiet pull between colours.</p>
      </section>

      <section className="bloom-edition">
        <div className="bloom-edition-head"><p className="bloom-eyebrow">Digital edition</p><h2>Made to live behind the work.</h2><p>Bloom has been carefully adapted for Mac, iPad and iPhone, preserving its colour relationships, sense of depth and luminous centre across different proportions.</p></div>
        <div className="bloom-devices">
          <figure className="bloom-device bloom-mac"><div className="bloom-device-shell"><div className="bloom-device-screen"><img src="/assets/rooms-of-light/bloom-mac.png" alt="Bloom for Mac" /></div></div><figcaption>Mac</figcaption></figure>
          <figure className="bloom-device bloom-ipad"><div className="bloom-device-shell"><div className="bloom-device-screen"><img src="/assets/rooms-of-light/bloom-ipad.png" alt="Bloom for iPad" /></div></div><figcaption>iPad</figcaption></figure>
          <figure className="bloom-device bloom-phone"><div className="bloom-device-shell"><div className="bloom-device-screen"><img src="/assets/rooms-of-light/bloom-iphone.png" alt="Bloom for iPhone" /></div></div><figcaption>iPhone</figcaption></figure>
        </div>
        <div className="bloom-edition-action"><p className="bloom-eyebrow">Master · Mac · iPad · iPhone</p><Link to={`${EXHIBITION_PATH}/bloom/digital-edition`}>View Bloom Digital Edition →</Link></div>
      </section>

      <section className="bloom-next">
        <div className="bloom-next-bg" aria-hidden="true"><img src="/assets/rooms-of-light/blue-hour.png" alt="" /></div>
        <div className="bloom-next-copy"><p className="bloom-eyebrow">Next room · 06</p><h2>Blue Hour</h2><Link to={`${EXHIBITION_PATH}/blue-hour`}>Continue the exhibition →</Link></div>
      </section>
    </article>
  );
}
