import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./ArrivalRoom.css";

const EXHIBITION_PATH = "/projects/digital-art-gallery/rooms-of-light";
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smooth = (value: number) => value * value * (3 - 2 * value);
const range = (progress: number, start: number, end: number) =>
  smooth(clamp((progress - start) / (end - start)));

export default function ArrivalRoom() {
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
      experience.style.setProperty("--p", progress.toFixed(4));
      experience.style.setProperty("--quote", range(progress, 0.16, 0.39).toFixed(4));
      experience.style.setProperty("--context", range(progress, 0.44, 0.68).toFixed(4));
      experience.style.setProperty("--exit", range(progress, 0.81, 0.96).toFixed(4));
      const onImage = rect.top <= 0 && rect.bottom >= viewportHeight;
      museumUi.style.color = onImage && progress > 0.12 && progress < 0.78 ? "#f4efe3" : "#171713";
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
    <article className="arrival-v6">
      <div ref={museumUiRef} className="arrival-museum-ui">
        <Link className="arrival-ui-back" to={EXHIBITION_PATH}><i aria-hidden="true" /><span>Rooms of Light</span></Link>
        <div className="arrival-ui-count arrival-eyebrow" aria-label="Work 1 of 8"><span>01</span><span className="line"><i /></span><span>08</span></div>
      </div>

      <section ref={experienceRef} className="arrival-experience">
        <div className="arrival-stage">
          <div className="arrival-ambient" />
          <div className="arrival-work-wrap">
            <img src="/assets/rooms-of-light/arrival.png" alt="Arrival" />
            <p className="arrival-work-index arrival-eyebrow">01 · Arrival</p>
            <blockquote className="arrival-quote">Every beginning contains more possibility than certainty.</blockquote>
            <div className="arrival-context">
              <p className="arrival-eyebrow">The first room</p>
              <p>Arrival begins with a space that can still be understood — walls, openings, direction, light. But certainty is already starting to loosen.</p>
            </div>
          </div>
          <p className="arrival-stage-cue arrival-eyebrow">Scroll to enter the work</p>
          <p className="arrival-release-word arrival-eyebrow">Continue</p>
        </div>
      </section>

      <section className="arrival-about">
        <p className="arrival-eyebrow">About the work</p>
        <h1>Before a journey has direction, it has possibility.</h1>
        <div className="arrival-about-copy">
          <p>Arrival opens <em>Rooms of Light</em> with its most recognisable room: a place defined by surfaces, thresholds and a clear source of light.</p>
          <p>Nothing has dissolved yet. Architecture still holds. But the light is already doing more than illuminating the room — it is pulling the eye forward, turning an interior into the suggestion of somewhere beyond it.</p>
          <p>The work is less about reaching a destination than noticing the moment immediately before one becomes inevitable.</p>
        </div>
        <div className="arrival-about-number" aria-hidden="true">01</div>
      </section>

      <section className="arrival-edition">
        <div className="arrival-edition-head">
          <p className="arrival-eyebrow">Digital edition</p>
          <h2>Made to live behind the work.</h2>
          <p>Arrival has been adapted for the screens where ideas happen, preserving its light, balance and sense of depth across different proportions.</p>
        </div>
        <div className="arrival-devices">
          <figure className="arrival-device arrival-mac"><div className="arrival-device-shell"><div className="arrival-device-screen"><img src="/assets/rooms-of-light/arrival-mac.webp" alt="Arrival for Mac" /></div></div><figcaption>Mac</figcaption></figure>
          <figure className="arrival-device arrival-ipad"><div className="arrival-device-shell"><div className="arrival-device-screen"><img src="/assets/rooms-of-light/arrival-ipad.webp" alt="Arrival for iPad" /></div></div><figcaption>iPad</figcaption></figure>
          <figure className="arrival-device arrival-phone"><div className="arrival-device-shell"><div className="arrival-device-screen"><img src="/assets/rooms-of-light/arrival-iphone.webp" alt="Arrival for iPhone" /></div></div><figcaption>iPhone</figcaption></figure>
        </div>
        <div className="arrival-edition-action">
          <p className="arrival-eyebrow">Master · Mac · iPad · iPhone</p>
          <Link to={`${EXHIBITION_PATH}/arrival/digital-edition`}>View Arrival Digital Edition →</Link>
        </div>
      </section>

      <section className="arrival-next">
        <div className="arrival-next-bg" aria-hidden="true"><img src="/assets/rooms-of-light/open-sky.png" alt="" /></div>
        <div className="arrival-next-copy">
          <p className="arrival-eyebrow">Next room · 02</p>
          <h2>Open Sky</h2>
          <Link to={`${EXHIBITION_PATH}/open-sky`}>Continue the exhibition →</Link>
        </div>
      </section>
    </article>
  );
}
