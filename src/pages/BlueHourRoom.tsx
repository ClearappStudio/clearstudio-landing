import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./BlueHourRoom.css";

const EXHIBITION_PATH = "/projects/digital-art-gallery/rooms-of-light";
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export default function BlueHourRoom() {
  const experienceRef = useRef<HTMLElement>(null);
  const [activeMoment, setActiveMoment] = useState<"one" | "two" | null>(null);
  const [deep, setDeep] = useState(false);
  const [onPaper, setOnPaper] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const experience = experienceRef.current;
      if (!experience) return;
      const rect = experience.getBoundingClientRect();
      const span = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / span);
      const moment = progress >= 0.18 && progress < 0.48
        ? "one"
        : progress >= 0.52 && progress < 0.82
          ? "two"
          : null;
      setActiveMoment((current) => current === moment ? current : moment);
      const nextDeep = progress >= 0.5;
      setDeep((current) => current === nextDeep ? current : nextDeep);
      const nextOnPaper = rect.bottom <= window.innerHeight * 0.22;
      setOnPaper((current) => current === nextOnPaper ? current : nextOnPaper);
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
    <article className="blue-hour-v1">
      <div className={`blue-hour-museum-ui${onPaper ? " on-paper" : ""}`}>
        <Link className="blue-hour-ui-back" to={EXHIBITION_PATH}><i aria-hidden="true" /><span>Rooms of Light</span></Link>
        <div className="blue-hour-ui-count" aria-label="Work 6 of 8"><span>06</span><span className="line"><i /></span><span>08</span></div>
      </div>

      <section ref={experienceRef} className="blue-hour-experience">
        <div className={`blue-hour-stage${deep ? " deep" : ""}`}>
          <div className="blue-hour-art">
            <picture>
              <source media="(max-width:620px)" srcSet="/assets/rooms-of-light/blue-hour-iphone.png" />
              <source media="(max-width:1024px)" srcSet="/assets/rooms-of-light/blue-hour-ipad.png" />
              <img src="/assets/rooms-of-light/blue-hour.png" width="1448" height="1086" alt="Blue Hour" />
            </picture>
          </div>
          <p className="blue-hour-label blue-hour-eyebrow">06 · Blue Hour</p>
          <div className={`blue-hour-message one${activeMoment === "one" ? " is-active" : ""}`}><small>Movement II · Transforming space</small><p>The volume lowers.</p></div>
          <div className={`blue-hour-message two${activeMoment === "two" ? " is-active" : ""}`}><small>Inside the work</small><p>Silence also has a colour.</p></div>
          <p className="blue-hour-rest blue-hour-eyebrow">Scroll into the quiet</p>
        </div>
      </section>

      <section className="blue-hour-about">
        <p className="blue-hour-eyebrow">Movement II · Work 06</p>
        <h2><span>The room becomes</span><span>atmosphere.</span></h2>
        <div className="blue-hour-about-copy">
          <p>Blue Hour follows Bloom by doing almost the opposite. Colour remains, but its intensity drops. The room is quieter, slower and less certain.</p>
          <p>Large forms recede into one another. Depth is no longer described by walls or openings, but by layers of blue, violet and the faint warmth held at the centre.</p>
          <p>The work marks the end of the exhibition’s second movement: structure has softened until what remains is closer to atmosphere than architecture.</p>
        </div>
        <div className="blue-hour-about-number" aria-hidden="true">06</div>
      </section>

      <section className="blue-hour-quiet">
        <p className="blue-hour-eyebrow">Between colour and silence</p>
        <h2><span>Nothing disappears.</span><span>It simply becomes quieter.</span></h2>
        <p className="blue-hour-quiet-note">Blue Hour is not empty. It is restrained. The forms are still present, but they ask for less attention — allowing the space between them to become part of the work.</p>
      </section>

      <section className="blue-hour-edition">
        <div className="blue-hour-edition-head"><p className="blue-hour-eyebrow">Digital edition</p><h2>Quiet enough to live behind the work.</h2><p>Blue Hour has been adapted for Mac, iPad and iPhone, preserving the soft transitions, deep blues and luminous centre across different proportions.</p></div>
        <div className="blue-hour-devices">
          <figure className="blue-hour-device blue-hour-mac"><div className="blue-hour-device-shell"><div className="blue-hour-device-screen"><img src="/assets/rooms-of-light/blue-hour-mac.png" alt="Blue Hour for Mac" /></div></div><figcaption>Mac</figcaption></figure>
          <figure className="blue-hour-device blue-hour-ipad"><div className="blue-hour-device-shell"><div className="blue-hour-device-screen"><img src="/assets/rooms-of-light/blue-hour-ipad.png" alt="Blue Hour for iPad" /></div></div><figcaption>iPad</figcaption></figure>
          <figure className="blue-hour-device blue-hour-phone"><div className="blue-hour-device-shell"><div className="blue-hour-device-screen"><img src="/assets/rooms-of-light/blue-hour-iphone.png" alt="Blue Hour for iPhone" /></div></div><figcaption>iPhone</figcaption></figure>
        </div>
        <div className="blue-hour-edition-action"><p className="blue-hour-eyebrow">Master · Mac · iPad · iPhone</p><Link to={`${EXHIBITION_PATH}/blue-hour/digital-edition`}>View Blue Hour Digital Edition →</Link></div>
      </section>

      <section className="blue-hour-next">
        <div className="blue-hour-next-bg" aria-hidden="true"><img src="/assets/rooms-of-light/still-water.png" alt="" /></div>
        <div className="blue-hour-next-copy"><p className="blue-hour-eyebrow">Next room · 07</p><h2>Still Water</h2><Link to={`${EXHIBITION_PATH}/still-water`}>Continue the exhibition →</Link></div>
      </section>
    </article>
  );
}
