import { Link } from "react-router-dom";
import { colourStudies } from "@/data/content";

export function ColorStudies() {
  const study = colourStudies[0];

  return (
    <Link
      className={`colour-study-focus colour-study--${study.className}`}
      to={`/studies/${study.slug}`}
    >
      <div className="colour-study__meta">
        <span>{study.number}</span>
        <span>{study.value}</span>
      </div>
      <div className="colour-study-focus__body">
        <div>
          <p className="eyebrow">Study in focus</p>
          <h3>{study.name}</h3>
        </div>
        <div>
          <p>{study.note}</p>
          <span className="colour-study__link">Open study ↗</span>
        </div>
      </div>
    </Link>
  );
}
