import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./SignalsRoom.css";

const EXHIBITION_PATH = "/projects/digital-art-gallery/rooms-of-light";
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smooth = (value: number) => value * value * (3 - 2 * value);
const range = (progress: number, start: number, end: number) => smooth(clamp((progress - start) / (end - start)));
const pulse = (progress: number, start: number, peak: number, end: number) =>
  Math.min(range(progress, start, peak), 1 - range(progress, peak, end));

export default function SignalsRoom() {
  const experienceRef = useRef<HTMLElement>(null);
  const museumUiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const experience = experienceRef.current;
      const museumUi = museumUiRef.current;
      if (!experience || !museumUi) return;

      const viewportHeight = window.innerHeight;
      const rect = experience.getBoundingClientRect();
      const progress = clamp(-rect.top / Math.max(1, rect.height - viewportHeight));
      const connect = range(progress, 0.06, 0.48);
      const quote = range(progress, 0.52, 0.72);
      const exit = range(progress, 0.87, 0.98);

      experience.style.setProperty("--p", progress.toFixed(4));
      experience.style.setProperty("--connect", connect.toFixed(4));
      experience.style.setProperty("--quote", quote.toFixed(4));
      experience.style.setProperty("--exit", exit.toFixed(4));
      experience.style.setProperty("--pulse-a", pulse(progress, 0.12, 0.22, 0.36).toFixed(4));
      experience.style.setProperty("--pulse-b", pulse(progress, 0.22, 0.34, 0.48).toFixed(4));
      experience.style.setProperty("--pulse-c", pulse(progress, 0.34, 0.46, 0.60).toFixed(4));

      const onWork = rect.top <= 0 && rect.bottom >= viewportHeight;
      museumUi.style.color = onWork && quote > 0.35 ? "#f5f1ea" : "#171713";
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
    <article className="signals-v1">
      <div ref={museumUiRef} className="signals-museum-ui">
        <Link className="signals-ui-back" to={EXHIBITION_PATH}><i aria-hidden="true" /><span>Rooms of Light</span></Link>
        <div className="signals-ui-count signals-eyebrow" aria-label="Work 3 of 8"><span>03</span><span className="line"><i /></span><span>08</span></div>
      </div>

      <section ref={experienceRef} className="signals-experience">
        <div className="signals-stage">
          <div className="signals-work-shell">
            <img src="/assets/rooms-of-light/signals.png" width="1535" height="1024" alt="Signals" />
            <p className="signals-work-index signals-eyebrow">03 · Signals</p>
            <i className="signals-trace signals-trace-a" aria-hidden="true" />
            <i className="signals-trace signals-trace-b" aria-hidden="true" />
            <i className="signals-trace signals-trace-c" aria-hidden="true" />
            <blockquote className="signals-statement"><small>Signals</small>Ideas rarely appear fully formed. They emerge as fragments before becoming connections.</blockquote>
          </div>
          <p className="signals-stage-cue signals-eyebrow">Scroll to follow the signal</p>
          <p className="signals-connection-mark signals-eyebrow">Connection</p>
        </div>
      </section>

      <section className="signals-about">
        <p className="signals-eyebrow">About the work</p>
        <h1><span>Structure</span><span>becomes rhythm.</span></h1>
        <div className="signals-about-motif" aria-hidden="true"><i /><i /><i /></div>
        <div className="signals-about-copy"><p>Signals explores the moment when fragments begin to behave like a system. Repeated lines and interrupted planes turn separate gestures into rhythm; clarity arrives gradually, as connections become visible.</p></div>
        <div className="signals-about-number" aria-hidden="true">03</div>
      </section>

      <section className="signals-edition">
        <div className="signals-edition-head">
          <p className="signals-eyebrow">Digital edition</p>
          <h2>Different frames. One continuous signal.</h2>
          <p>Signals has been adapted for Mac, iPad and iPhone so that its spacing, direction and visual rhythm remain intentional at every scale.</p>
        </div>
        <div className="signals-devices">
          <figure className="signals-device signals-mac"><div className="signals-device-shell"><div className="signals-screen"><img src="/assets/rooms-of-light/signals-mac.png" alt="Signals for Mac" /></div></div><figcaption>Mac</figcaption></figure>
          <figure className="signals-device signals-ipad"><div className="signals-device-shell"><div className="signals-screen"><img src="/assets/rooms-of-light/signals-ipad.png" alt="Signals for iPad" /></div></div><figcaption>iPad</figcaption></figure>
          <figure className="signals-device signals-phone"><div className="signals-device-shell"><div className="signals-screen"><img src="/assets/rooms-of-light/signals-iphone.png" alt="Signals for iPhone" /></div></div><figcaption>iPhone</figcaption></figure>
        </div>
        <div className="signals-edition-action">
          <p className="signals-eyebrow">Master · Mac · iPad · iPhone</p>
          <Link to={`${EXHIBITION_PATH}/signals/digital-edition`}>View Signals Digital Edition →</Link>
        </div>
      </section>

      <section className="signals-next">
        <div className="signals-next-bg" aria-hidden="true"><img src="/assets/rooms-of-light/between-shapes.png" alt="" /></div>
        <div className="signals-next-copy">
          <p className="signals-eyebrow">Next room · 04</p><h2>Between Shapes</h2>
          <Link to={`${EXHIBITION_PATH}/between-shapes`}>Continue the exhibition →</Link>
        </div>
      </section>
    </article>
  );
}
