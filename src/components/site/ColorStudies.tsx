import { Link } from "react-router-dom";
import { colourStudies } from "@/data/content";

export function ColorStudies() {
  return (
    <div className="colour-studies">
      {colourStudies.map((study) => (
        <Link className={`colour-study colour-study--${study.className}`} to={`/studies/${study.slug}`} key={study.name}>
          <div className="colour-study__meta"><span>{study.number}</span><span>{study.value}</span></div>
          <div><h3>{study.name}</h3><p>{study.note}</p><span className="colour-study__link">Open study ↗</span></div>
        </Link>
      ))}
    </div>
  );
}
