import { Link } from "react-router-dom";
import { colourStudies } from "@/data/content";

export function ColorStudies() {
  const study = colourStudies[0];

  return (
    <div className={`home-study home-study--${study.className}`}>
      <div className="home-study__title">
        <span>Quiet</span>
        <span>Blue</span>
      </div>

      <div className="home-study__composition" aria-hidden="true">
        <span className="home-study__disc" />
        <span className="home-study__bar" />
        <span className="home-study__square" />
        <span className="home-study__dot" />
      </div>

      <Link className="home-study__link" to={`/studies/${study.slug}`}>
        Study No. 001 <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
