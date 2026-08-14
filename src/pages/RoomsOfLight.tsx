import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./RoomsOfLight.css";

const base = "/assets/rooms-of-light/";
const roomPath = "/projects/digital-art-gallery/rooms-of-light";
const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));
const smooth = (t: number) => t * t * (3 - 2 * t);

function hex(value: string) {
  const clean = value.replace("#", "");
  const normalized = clean.length === 3 ? clean.split("").map((character) => character + character).join("") : clean;
  const number = Number.parseInt(normalized, 16);
  return { r: (number >> 16) & 255, g: (number >> 8) & 255, b: number & 255 };
}

function mix(a: ReturnType<typeof hex>, b: ReturnType<typeof hex>, t: number) {
  return { r: Math.round(a.r + (b.r - a.r) * t), g: Math.round(a.g + (b.g - a.g) * t), b: Math.round(a.b + (b.b - a.b) * t) };
}

const rgb = (color: ReturnType<typeof hex>) => `rgb(${color.r} ${color.g} ${color.b})`;
type SequenceInfo = { active: boolean; work: string; portal: boolean; release: number; color: string };

function renderSequence(sequence: HTMLElement, viewportHeight: number): SequenceInfo {
  const stage = sequence.querySelector<HTMLElement>(".sequence-stage");
  const scenes = [...sequence.querySelectorAll<HTMLElement>(".scene")];
  if (!stage || scenes.length === 0) return { active: false, work: "", portal: false, release: 0, color: "#f0ece3" };

  const rect = sequence.getBoundingClientRect();
  const progress = clamp(-rect.top / Math.max(1, rect.height - viewportHeight));
  const travel = progress * scenes.length;
  let index = Math.floor(travel);
  if (index >= scenes.length) index = scenes.length - 1;
  const local = index === scenes.length - 1 ? 0 : travel - index;
  const transition = index === scenes.length - 1 ? 0 : smooth(clamp((local - 0.32) / (0.92 - 0.32)));
  const releaseScene = sequence.querySelector<HTMLElement>(".release-scene");
  const release = releaseScene ? smooth(clamp((progress - 0.84) / 0.14)) : 0;

  scenes.forEach((scene, sceneIndex) => {
    let opacity = 0;
    let y = 5;
    let scale = 0.998;
    const isPortal = scene.dataset.kind === "portal";

    if (sceneIndex === index) {
      if (isPortal) {
        opacity = 1; y = 0; scale = 1;
        const early = smooth(clamp(transition / 0.72));
        const late = smooth(clamp((transition - 0.08) / 0.92));
        const kicker = scene.querySelector<HTMLElement>(".portal-kicker");
        const title = scene.querySelector<HTMLElement>(".portal-title");
        const copy = scene.querySelector<HTMLElement>(".portal-copy");
        if (kicker) { kicker.style.opacity = (1 - early).toFixed(4); kicker.style.transform = `translateY(${(-4 * early).toFixed(2)}px)`; }
        if (copy) { copy.style.opacity = (1 - early).toFixed(4); copy.style.transform = `translateY(${(-5 * early).toFixed(2)}px)`; }
        if (title) { title.style.opacity = (1 - late).toFixed(4); title.style.transform = `translateY(${(-6 * late).toFixed(2)}px)`; }
      } else {
        opacity = 1 - transition; y = -3 * transition; scale = 1 + 0.0015 * transition;
      }
    } else if (sceneIndex === index + 1) {
      opacity = transition; y = 5 * (1 - transition); scale = 0.998 + 0.002 * transition;
    }

    if (isPortal && sceneIndex !== index) {
      [".portal-kicker", ".portal-title", ".portal-copy"].forEach((selector) => {
        const element = scene.querySelector<HTMLElement>(selector);
        if (element) { element.style.opacity = "1"; element.style.transform = "none"; }
      });
    }
    if (releaseScene && sceneIndex === scenes.length - 1) { opacity *= 1 - release; y -= 10 * release; scale += 0.006 * release; }
    scene.style.opacity = opacity.toFixed(4);
    scene.style.transform = `translateY(${y.toFixed(2)}px) scale(${scale.toFixed(4)})`;
    scene.classList.toggle("is-visible", opacity > 0.55);
  });

  if (releaseScene) { releaseScene.style.opacity = release.toFixed(4); releaseScene.style.transform = `translateY(${(18 * (1 - release)).toFixed(2)}px)`; }
  const from = hex(scenes[index].dataset.bg ?? "#f0ece3");
  const to = hex((scenes[index + 1] ?? scenes[index]).dataset.bg ?? "#f0ece3");
  let stageColor = mix(from, to, transition);
  if (releaseScene && release > 0) stageColor = mix(stageColor, hex(sequence.dataset.releaseBg ?? "#e3e8e5"), release);
  const color = rgb(stageColor);
  stage.style.backgroundColor = color;

  const visibleIndex = transition > 0.5 && index < scenes.length - 1 ? index + 1 : index;
  const visibleScene = scenes[visibleIndex];
  return { active: rect.top <= viewportHeight * 0.5 && rect.bottom >= viewportHeight * 0.5, work: visibleScene.dataset.work ?? "", portal: visibleScene.dataset.kind === "portal", release, color };
}

export default function RoomsOfLight() {
  const rootRef = useRef<HTMLElement>(null);
  const thresholdRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const threshold = thresholdRef.current;
    if (!root || !threshold) return;
    const sequences = [...root.querySelectorAll<HTMLElement>(".sequence")];
    const current = root.querySelector<HTMLElement>(".ui-counter .current");
    const documentRoot = document.documentElement;
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const originalRootBackground = documentRoot.style.backgroundColor;
    const originalBodyBackground = document.body.style.backgroundColor;
    const originalThemeColor = themeColor?.content;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const viewportHeight = window.innerHeight;
      root.classList.toggle("entered", y > threshold.offsetHeight * 0.48);
      let activeInfo: SequenceInfo | null = null;
      for (const sequence of sequences) {
        const info = renderSequence(sequence, viewportHeight);
        if (info.active) activeInfo = info;
      }
      root.classList.toggle("in-sequence", Boolean(activeInfo));
      root.classList.toggle("in-portal", Boolean(activeInfo?.portal));
      root.classList.toggle("in-release", Boolean(activeInfo && activeInfo.release > 0.15));
      if (activeInfo?.work && current) current.textContent = activeInfo.work;
      if (activeInfo) {
        documentRoot.style.backgroundColor = activeInfo.color;
        document.body.style.backgroundColor = activeInfo.color;
        if (themeColor) themeColor.content = activeInfo.color;
      } else {
        documentRoot.style.backgroundColor = originalRootBackground;
        document.body.style.backgroundColor = originalBodyBackground;
        if (themeColor && originalThemeColor) themeColor.content = originalThemeColor;
      }
      root.style.setProperty("--global", clamp(y / Math.max(1, document.documentElement.scrollHeight - viewportHeight)).toFixed(4));
      ticking = false;
    };
    const requestUpdate = () => { if (!ticking) { ticking = true; window.requestAnimationFrame(update); } };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      documentRoot.style.backgroundColor = originalRootBackground;
      document.body.style.backgroundColor = originalBodyBackground;
      if (themeColor && originalThemeColor) themeColor.content = originalThemeColor;
    };
  }, []);

  return <article ref={rootRef} className="rol-v11">
    <div className="museum-ui" aria-hidden="true"><div className="ui-title">Rooms of Light</div><div className="ui-counter eyebrow"><span className="current">01</span><span className="line"><i /></span><span>08</span></div></div>
    <section ref={thresholdRef} className="threshold"><p className="eyebrow"><Link className="threshold-gallery-link" to="/projects/digital-art-gallery">Digital Art Gallery</Link> · Exhibition 01 · 2026</p><h1><span>Rooms</span><span>of Light</span></h1><div className="threshold-bottom"><p className="threshold-lead">Eight studies on light, space and the quiet transformations between them.</p><p className="threshold-copy">Across eight works, imagined rooms gradually move away from architecture and towards something less certain — spaces somewhere between memory, abstraction and possibility.</p><span className="enter-cue">Scroll to enter</span></div></section>

    <section className="sequence four first" data-movement="Movement I · Discovering space"><div className="sequence-stage">
      <article className="scene scene-portal portal-one" data-kind="portal" data-bg="#f0ece3"><div className="scene-inner"><p className="portal-kicker eyebrow">Movement I · 01–03</p><h2 className="portal-title"><span>Discovering</span><span>space</span></h2><p className="portal-copy">A room appears. Walls, openings, distances and directions remain readable. Light enters spaces that still feel possible to understand.</p></div></article>
      <article className="scene" data-work="01" data-bg="#f0ece3"><div className="scene-inner"><div className="scene-layout note-right"><Link className="art-shell" to={`${roomPath}/arrival`}><img src={`${base}arrival.png`} alt="Arrival" /></Link><div className="work-note right"><small>01 · Arrival</small><p>A room appears.</p><Link className="work-link" to={`${roomPath}/arrival`}>View work ↗</Link></div></div></div></article>
      <article className="scene" data-work="02" data-bg="#efe5d6"><div className="scene-inner"><div className="scene-layout note-left"><div className="work-note"><small>02 · Open Sky</small><p>The distance opens.</p><Link className="work-link" to={`${roomPath}/open-sky`}>View work ↗</Link></div><Link className="art-shell" to={`${roomPath}/open-sky`}><img src={`${base}open-sky.png`} alt="Open Sky" /></Link></div></div></article>
      <article className="scene" data-work="03" data-bg="#e5e4de"><div className="scene-inner"><div className="scene-layout note-left"><div className="work-note"><small>03 · Signals</small><p>Structure becomes rhythm.</p><Link className="work-link" to={`${roomPath}/signals`}>View work ↗</Link></div><Link className="art-shell" to={`${roomPath}/signals`}><img src={`${base}signals.png`} alt="Signals" /></Link></div></div></article>
    </div></section>
    <section className="breath"><p><span>The room is still there.</span><span className="soft">It simply stops obeying.</span></p></section>

    <section className="sequence four" data-movement="Movement II · Transforming space"><div className="sequence-stage">
      <article className="scene scene-portal portal-two" data-kind="portal" data-bg="#d9d5cf"><div className="scene-inner"><p className="portal-kicker eyebrow">Movement II · 04–06</p><h2 className="portal-title"><span>Transforming</span><span>space</span></h2><p className="portal-copy">Architecture gives way to relationships between surfaces, forms, colour and light. The room becomes a material rather than a setting.</p></div></article>
      <article className="scene" data-work="04" data-bg="#d8d5cf"><div className="scene-inner"><div className="scene-layout note-right"><Link className="art-shell" to={`${roomPath}/between-shapes`}><img src={`${base}between-shapes.png`} alt="Between Shapes" /></Link><div className="work-note right"><small>04 · Between Shapes</small><p>Balance becomes uncertain.</p><Link className="work-link" to={`${roomPath}/between-shapes`}>View work ↗</Link></div></div></div></article>
      <article className="scene scene-large scene-bloom" data-work="05" data-bg="#e1d8cf"><div className="scene-inner"><div className="art-shell"><img src={`${base}bloom.png`} alt="Bloom" /><div className="inside-note"><small>05 · Bloom</small><p>Colour enters the room.</p><Link className="work-link" to={`${roomPath}/bloom`}>View work ↗</Link></div></div></div></article>
      <article className="scene" data-work="06" data-bg="#d6dbd8"><div className="scene-inner"><div className="scene-layout note-left"><div className="work-note"><small>06 · Blue Hour</small><p>The volume lowers.</p><Link className="work-link" to={`${roomPath}/blue-hour`}>View work ↗</Link></div><Link className="art-shell" to={`${roomPath}/blue-hour`}><img src={`${base}blue-hour.png`} alt="Blue Hour" /></Link></div></div></article>
    </div></section>

    <section className="sequence three release-sequence" data-movement="Movement III · Leaving space" data-release-bg="#e3e8e5"><div className="sequence-stage">
      <article className="scene scene-portal portal-three" data-kind="portal" data-bg="#d6dbd8"><div className="scene-inner"><p className="portal-kicker eyebrow">Movement III · 07–08</p><h2 className="portal-title"><span>Leaving</span><span>space</span></h2><p className="portal-copy">Edges soften. Objects recede. The distinction between room, surface and atmosphere becomes increasingly uncertain.</p></div></article>
      <article className="scene" data-work="07" data-bg="#dbe2df"><div className="scene-inner"><div className="scene-layout note-left"><div className="work-note"><small>07 · Still Water</small><p>Almost nothing needs to remain.</p><Link className="work-link" to={`${roomPath}/still-water`}>View work ↗</Link></div><Link className="art-shell" to={`${roomPath}/still-water`}><img src={`${base}still-water.png`} alt="Still Water" /></Link></div></div></article>
      <article className="scene scene-large scene-north" data-work="08" data-bg="#dde6e2"><div className="scene-inner"><div className="art-shell"><img src={`${base}north.png`} alt="North" /><div className="inside-note"><small>08 · North</small><p>The final room does not close.</p><Link className="work-link" to={`${roomPath}/north`}>View work ↗</Link></div></div></div></article>
      <div className="release-scene" aria-hidden="true"><p className="eyebrow">An open ending</p><p className="release-title">It opens.</p></div>
    </div></section>

    <section className="coda"><p className="eyebrow">Rooms of Light · Exhibition 01</p><p>The first work enters a space. The last one looks beyond it. Everything between them is an attempt to understand what light can change.</p></section>
    <section id="digital-edition" className="edition"><h2>The exhibition does not have to end here.</h2><div><p>Each work has also been carefully adapted for the screens where ideas happen.</p><a href="#digital-edition">View the Digital Edition <span aria-hidden="true">→</span></a></div></section>
  </article>;
}
