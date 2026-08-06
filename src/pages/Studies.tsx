import { type CSSProperties, useState } from "react";
import { Link } from "react-router-dom";
import { colourStudies } from "@/data/content";

const studyCopy: Record<string, string> = {
  "quiet-blue": "A study of calm, distance and the space an interface leaves behind.",
  "soft-signal": "A study of guidance without urgency, and warmth without noise.",
  "new-leaf": "A study of optimism, renewal and useful green in digital spaces.",
};

const studyMood: Record<string, { background: string; accent: string; ink: string }> = {
  "quiet-blue": { background: "#dce6ef", accent: "#6d8fb8", ink: "#10243b" },
  "soft-signal": { background: "#f5dfd2", accent: "#e98552", ink: "#3a1d11" },
  "new-leaf": { background: "#e4ecdf", accent: "#91ae83", ink: "#17311c" },
};

export default function Studies() {
  const [activeStudy, setActiveStudy] = useState<string | null>(null);
  const mood = activeStudy ? studyMood[activeStudy] : null;
  const pageStyle = {
    "--studies-wash": mood?.background ?? "#f4f1eb",
    "--studies-accent": mood?.accent ?? "#6d8fb8",
  } as CSSProperties;

  return (
    <div className="studies-page" style={pageStyle}>
      <section className="studies-hero">
        <div>
          <p className="studies-eyebrow">Studio Studies</p>
          <h1>Ideas before<br />they become <span>things.</span></h1>
        </div>
        <div className="studies-hero-copy">
          <small>An open archive</small>
          <p>Small, numbered investigations into colour, interfaces, materials and the systems behind digital work.</p>
        </div>
      </section>

      <section className="studies-index" aria-label="Studies archive">
        <div className="studies-category">
          <div className="studies-category-label">
            <small>Category 01</small>
            <strong>Colour</strong>
          </div>
          <div className="studies-list">
            {colourStudies.map((study) => {
              const colours = studyMood[study.slug];
              const rowStyle = {
                "--study-colour": colours.accent,
                "--study-ink": colours.ink,
              } as CSSProperties;

              return (
                <Link
                  className="studies-row"
                  to={`/studies/${study.slug}`}
                  key={study.slug}
                  style={rowStyle}
                  onMouseEnter={() => setActiveStudy(study.slug)}
                  onMouseLeave={() => setActiveStudy(null)}
                  onFocus={() => setActiveStudy(study.slug)}
                  onBlur={() => setActiveStudy(null)}
                >
                  <span className="studies-number">{study.number}</span>
                  <h2>{study.name}</h2>
                  <p>{studyCopy[study.slug]}</p>
                  <span className="studies-arrow" aria-hidden="true">↗</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="studies-coming">
          <div className="studies-coming-title">Next categories</div>
          <div className="studies-coming-body">
            <div><span>Interfaces</span><span>In development</span></div>
            <div><span>Materials</span><span>Coming later</span></div>
            <div><span>Context</span><span>Coming later</span></div>
          </div>
        </div>
      </section>
    </div>
  );
}
