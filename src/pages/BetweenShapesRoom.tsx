import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./BetweenShapesRoom.css";

const EXHIBITION_PATH = "/projects/digital-art-gallery/rooms-of-light";
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export default function BetweenShapesRoom() {
  const experienceRef = useRef<HTMLElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const orbitARef = useRef<HTMLDivElement>(null);
  const orbitBRef = useRef<HTMLDivElement>(null);
  const [activeState, setActiveState] = useState(-1);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const experience = experienceRef.current;
      const art = artRef.current;
      const orbitA = orbitARef.current;
      const orbitB = orbitBRef.current;
      if (!experience || !art || !orbitA || !orbitB) return;

      const rect = experience.getBoundingClientRect();
      const span = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / span);
      let state = -1;
      if (progress >= 0.12 && progress < 0.36) state = 0;
      else if (progress >= 0.36 && progress < 0.60) state = 1;
      else if (progress >= 0.60 && progress < 0.90) state = 2;
      setActiveState((current) => current === state ? current : state);

      let x = 0; let y = 0; let scale = 1;
      let ax = 0; let ay = 0; let bx = 0; let by = 0;
      if (state === 0) { x = -74; scale = 1.01; ax = 22; ay = -10; bx = -12; by = 8; }
      if (state === 1) { x = 74; scale = 1.01; ax = -20; ay = 8; bx = 18; by = -10; }
      if (state === 2) { y = -8; scale = 1.03; ax = 8; ay = -8; bx = -8; by = 8; }
      art.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
      orbitA.style.transform = `translate(${ax}px, ${ay}px)`;
      orbitB.style.transform = `translate(${bx}px, ${by}px)`;
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
    <article className="between-shapes-v8">
      <div className="between-museum-ui">
        <Link className="between-ui-back" to={EXHIBITION_PATH}><i aria-hidden="true" /><span>Rooms of Light</span></Link>
        <div className="between-ui-count between-eyebrow" aria-label="Work 4 of 8"><span>04</span><span className="line"><i /></span><span>08</span></div>
      </div>

      <section ref={experienceRef} className="between-experience">
        <div className="between-stage">
          <div className="between-layout">
            <div className="between-axis" />
            <div ref={orbitARef} className="between-orbit" />
            <div ref={orbitBRef} className="between-orbit between-orbit-two" />
            <div ref={artRef} className="between-artwrap">
              <div className="between-art">
                <img src="/assets/rooms-of-light/between-shapes.png" width="1535" height="1024" alt="Between Shapes" />
                <p className="between-work-index between-eyebrow">04 · Between Shapes</p>
                <div className={`between-copy between-order${activeState === 0 ? " is-active" : ""}`}><small>01 · Order</small><h3>Order</h3><p>One shape arrives first and seems to define the room.</p></div>
                <div className={`between-copy between-intuition${activeState === 1 ? " is-active" : ""}`}><small>02 · Intuition</small><h3>Intuition</h3><p>Another enters sideways and refuses to obey the first.</p></div>
                <div className={`between-copy between-balance${activeState === 2 ? " is-active" : ""}`}><small>03 · Balance</small><h3>Balance is rarely symmetrical.</h3><p>Every force finds an answer — not because anything matches, but because the whole still holds.</p></div>
              </div>
              <p className="between-chip between-eyebrow">Scroll to rebalance the room</p>
            </div>
            <div className="between-dots" aria-hidden="true">{[0, 1, 2].map((state) => <span key={state} className={activeState === state ? "active" : ""} />)}</div>
          </div>
        </div>
      </section>

      <section className="between-about">
        <p className="between-eyebrow">Movement II · Transforming space</p>
        <h2><span>The room stops being</span><span>a setting.</span></h2>
        <div className="between-about-copy">
          <p>Between Shapes begins the exhibition’s second movement. Architecture no longer provides the main structure; instead, the work is held together by relationships between forms.</p>
          <p>Large curves lean into one another, overlap and interrupt without ever resolving into symmetry. The composition remains balanced because every gesture is answered by another — not with equality, but with tension.</p>
          <p>Order and intuition are no longer opposites here. They are the two forces keeping the room alive.</p>
        </div>
        <div className="between-about-number" aria-hidden="true">04</div>
      </section>

      <section className="between-edition">
        <div className="between-edition-head"><p className="between-eyebrow">Digital edition</p><h2>Different frames. The same tension.</h2><p>Between Shapes has been adapted for Mac, iPad and iPhone so that the crossings, counterweights and quiet points of light remain balanced across every proportion.</p></div>
        <div className="between-devices">
          <figure className="between-device between-mac"><div className="between-device-shell"><div className="between-device-screen"><img src="/assets/rooms-of-light/between-shapes-mac.png" alt="Between Shapes for Mac" /></div></div><figcaption>Mac</figcaption></figure>
          <figure className="between-device between-ipad"><div className="between-device-shell"><div className="between-device-screen"><img src="/assets/rooms-of-light/between-shapes-ipad.png" alt="Between Shapes for iPad" /></div></div><figcaption>iPad</figcaption></figure>
          <figure className="between-device between-phone"><div className="between-device-shell"><div className="between-device-screen"><img src="/assets/rooms-of-light/between-shapes-iphone.png" alt="Between Shapes for iPhone" /></div></div><figcaption>iPhone</figcaption></figure>
        </div>
        <div className="between-edition-action"><p className="between-eyebrow">Master · Mac · iPad · iPhone</p><Link to={`${EXHIBITION_PATH}/between-shapes/digital-edition`}>View Between Shapes Digital Edition →</Link></div>
      </section>

      <section className="between-next">
        <div className="between-next-bg" aria-hidden="true"><img src="/assets/rooms-of-light/bloom.png" alt="" /></div>
        <div className="between-next-copy"><p className="between-eyebrow">Next room · 05</p><h2>Bloom</h2><Link to={`${EXHIBITION_PATH}/bloom`}>Continue the exhibition →</Link></div>
      </section>
    </article>
  );
}
