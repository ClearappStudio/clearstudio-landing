import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./OpenSkyRoom.css";

const EXHIBITION_PATH = "/projects/digital-art-gallery/rooms-of-light";
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smooth = (value: number) => value * value * (3 - 2 * value);
const range = (progress: number, start: number, end: number) =>
  smooth(clamp((progress - start) / (end - start)));

export default function OpenSkyRoom() {
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
      const open = range(progress, 0.06, 0.47);
      const quote = range(progress, 0.58, 0.76);
      const exit = range(progress, 0.88, 0.98);

      experience.style.setProperty("--p", progress.toFixed(4));
      experience.style.setProperty("--open", open.toFixed(4));
      experience.style.setProperty("--quote", quote.toFixed(4));
      experience.style.setProperty("--exit", exit.toFixed(4));

      const onWork = rect.top <= 0 && rect.bottom >= viewportHeight;
      museumUi.style.color = onWork && open > 0.55 && quote < 0.85 ? "#1c2528" : "#171713";
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
    <article className="open-sky-v1">
      <div ref={museumUiRef} className="open-sky-museum-ui">
        <Link className="open-sky-ui-back" to={EXHIBITION_PATH}><i aria-hidden="true" /><span>Rooms of Light</span></Link>
        <div className="open-sky-ui-count open-sky-eyebrow" aria-label="Work 2 of 8"><span>02</span><span className="line"><i /></span><span>08</span></div>
      </div>

      <section ref={experienceRef} className="open-sky-experience">
        <div className="open-sky-stage">
          <div className="open-sky-work-shell">
            <img src="/assets/rooms-of-light/open-sky.png" alt="Open Sky" />
            <p className="open-sky-work-index open-sky-eyebrow">02 · Open Sky</p>
            <blockquote className="open-sky-statement"><small>Open Sky</small>Space is sometimes the most generous form of design.</blockquote>
          </div>
          <p className="open-sky-stage-cue open-sky-eyebrow">Scroll to open the room</p>
          <p className="open-sky-breath-mark open-sky-eyebrow">Breathe</p>
        </div>
      </section>

      <section className="open-sky-about">
        <p className="open-sky-eyebrow">About the work</p>
        <h1><span>Nothing was added.</span><span>The space simply opened.</span></h1>
        <div className="open-sky-about-copy">
          <p>Open Sky remains recognisably architectural, but the room has already begun to lose its authority. A single wall defines the left edge while everything else gives way to distance.</p>
          <p>The horizon carries more weight than the structure. Light is no longer entering the room so much as inviting the room to disappear into something larger.</p>
          <p>Space becomes generous not through addition, but through restraint — by allowing the eye somewhere further to go.</p>
        </div>
        <div className="open-sky-about-number" aria-hidden="true">02</div>
      </section>

      <section className="open-sky-edition">
        <div className="open-sky-edition-head">
          <p className="open-sky-eyebrow">Digital edition</p>
          <h2>The same openness, in different proportions.</h2>
          <p>Open Sky has been adapted for Mac, iPad and iPhone so that the horizon, light and sense of distance survive every frame.</p>
        </div>
        <div className="open-sky-devices">
          <figure className="open-sky-device open-sky-mac"><div className="open-sky-device-shell"><div className="open-sky-device-screen"><img src="/assets/rooms-of-light/open-sky-mac.png" alt="Open Sky for Mac" /></div></div><figcaption>Mac</figcaption></figure>
          <figure className="open-sky-device open-sky-ipad"><div className="open-sky-device-shell"><div className="open-sky-device-screen"><img src="/assets/rooms-of-light/open-sky-ipad.png" alt="Open Sky for iPad" /></div></div><figcaption>iPad</figcaption></figure>
          <figure className="open-sky-device open-sky-phone"><div className="open-sky-device-shell"><div className="open-sky-device-screen"><img src="/assets/rooms-of-light/open-sky-iphone.png" alt="Open Sky for iPhone" /></div></div><figcaption>iPhone</figcaption></figure>
        </div>
        <div className="open-sky-edition-action">
          <p className="open-sky-eyebrow">Master · Mac · iPad · iPhone</p>
          <Link to={`${EXHIBITION_PATH}/open-sky/digital-edition`}>View Open Sky Digital Edition →</Link>
        </div>
      </section>

      <section className="open-sky-next">
        <div className="open-sky-next-bg" aria-hidden="true"><img src="/assets/rooms-of-light/signals.png" alt="" /></div>
        <div className="open-sky-next-copy">
          <p className="open-sky-eyebrow">Next room · 03</p>
          <h2>Signals</h2>
          <Link to={`${EXHIBITION_PATH}/signals`}>Continue the exhibition →</Link>
        </div>
      </section>
    </article>
  );
}
