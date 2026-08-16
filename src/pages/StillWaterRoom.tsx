import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./StillWaterRoom.css";

const EXHIBITION_PATH = "/projects/digital-art-gallery/rooms-of-light";
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export default function StillWaterRoom() {
  const experienceRef = useRef<HTMLElement>(null);
  const [activeMoment, setActiveMoment] = useState<"one" | "two" | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const experience = experienceRef.current;
      if (!experience) return;
      const rect = experience.getBoundingClientRect();
      const span = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / span);
      const moment = progress >= 0.18 && progress < 0.5
        ? "one"
        : progress >= 0.56 && progress < 0.88
          ? "two"
          : null;
      setActiveMoment((current) => current === moment ? current : moment);
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
    <article className="still-water-v2">
      <div className="still-water-museum-ui">
        <Link className="still-water-ui-back" to={EXHIBITION_PATH}><i aria-hidden="true" /><span>Rooms of Light</span></Link>
        <div className="still-water-ui-count" aria-label="Work 7 of 8"><span>07</span><span className="line"><i /></span><span>08</span></div>
      </div>

      <section ref={experienceRef} className="still-water-experience">
        <div className="still-water-stage">
          <div className="still-water-shell">
            <div className="still-water-image">
              <picture>
                <source media="(max-width:620px)" srcSet="/assets/rooms-of-light/still-water-iphone.png" />
                <source media="(max-width:1024px)" srcSet="/assets/rooms-of-light/still-water-ipad.png" />
                <img src="/assets/rooms-of-light/still-water.png" width="1448" height="1086" alt="Still Water" />
              </picture>
            </div>
            <div className="still-water-surface-line" aria-hidden="true" />
            <p className="still-water-hero-label still-water-eyebrow">07 · Still Water</p>
            <div className={`still-water-hero-message one${activeMoment === "one" ? " is-active" : ""}`}><small>Movement III · Release</small><h1>Reflection requires stillness.</h1><p>The room is nearly empty now. What remains is light, surface and the patience to let them settle.</p></div>
            <div className={`still-water-hero-message two${activeMoment === "two" ? " is-active" : ""}`}><small>Inside the work</small><h2>Nothing moves. Everything reflects.</h2><p>Still Water does not ask to be read quickly. It asks for a pause — long enough for the image to become a thought.</p></div>
            <p className="still-water-hero-rest still-water-eyebrow">Scroll into the reflection</p>
          </div>
        </div>
      </section>

      <section className="still-water-about">
        <p className="still-water-eyebrow">Movement III · Work 07</p>
        <h2><span>The room becomes</span><span>a surface for thought.</span></h2>
        <div className="still-water-about-copy">
          <p>Still Water is the quietest room in the exhibition. Most of the earlier structure has disappeared. The composition rests on a single angled plane, a horizon-like seam, and the faint traces of light extending across the right side.</p>
          <p>The result is neither empty nor decorative. It is reflective in the literal sense, but also in the emotional one. The work opens a calm interior space where attention can slow down.</p>
          <p>Placed after Blue Hour, this room marks the deepest point of the exhibition’s descent into stillness, just before the final openness of North.</p>
        </div>
        <div className="still-water-about-number" aria-hidden="true">07</div>
      </section>

      <section className="still-water-reflect">
        <p className="still-water-eyebrow">A room with almost no room</p>
        <h2><span>The less it shows,</span><span>the more it holds.</span></h2>
        <p className="still-water-reflect-note">The strength of Still Water lies in restraint. There is almost nothing to grasp, so the mind begins to notice proportion, softness, balance and the very small distance between presence and absence.</p>
      </section>

      <section className="still-water-edition">
        <div className="still-water-edition-head"><p className="still-water-eyebrow">Digital edition</p><h2>Made to live quietly behind the work.</h2><p>Still Water has been adapted for Mac, iPad and iPhone, preserving the near-monochrome palette, mirrored horizon and soft light traces across different proportions.</p></div>
        <div className="still-water-devices">
          <figure className="still-water-device still-water-mac"><div className="still-water-device-shell"><div className="still-water-device-screen"><img src="/assets/rooms-of-light/still-water-mac.png" alt="Still Water for Mac" /></div></div><figcaption>Mac</figcaption></figure>
          <figure className="still-water-device still-water-ipad"><div className="still-water-device-shell"><div className="still-water-device-screen"><img src="/assets/rooms-of-light/still-water-ipad.png" alt="Still Water for iPad" /></div></div><figcaption>iPad</figcaption></figure>
          <figure className="still-water-device still-water-phone"><div className="still-water-device-shell"><div className="still-water-device-screen"><img src="/assets/rooms-of-light/still-water-iphone.png" alt="Still Water for iPhone" /></div></div><figcaption>iPhone</figcaption></figure>
        </div>
        <div className="still-water-edition-action"><p className="still-water-eyebrow">Master · Mac · iPad · iPhone</p><Link to={`${EXHIBITION_PATH}/still-water/digital-edition`}>View Still Water Digital Edition →</Link></div>
      </section>

      <section className="still-water-next">
        <div className="still-water-next-bg" aria-hidden="true"><img src="/assets/rooms-of-light/north.png" alt="" /></div>
        <div className="still-water-next-copy"><p className="still-water-eyebrow">Next room · 08</p><h2>North</h2><Link to={`${EXHIBITION_PATH}/north`}>Continue the exhibition →</Link></div>
      </section>
    </article>
  );
}
