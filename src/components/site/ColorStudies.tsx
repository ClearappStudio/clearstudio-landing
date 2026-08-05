import { Link } from "react-router-dom";
import { colourStudies } from "@/data/content";

export function ColorStudies() {
  const study = colourStudies[0];

  return (
    <div className={`home-study home-study--${study.className}`}>
      <div className="home-study__composition">
        <span className="home-study__plane home-study__plane--deep" aria-hidden="true" />
        <span className="home-study__plane home-study__plane--light" aria-hidden="true" />
        <span className="home-study__circle" aria-hidden="true" />
        <span className="home-study__line" aria-hidden="true" />
        <span className="home-study__caption">Field 01 / Stillness</span>
        <Link className="home-study__link" to={`/studies/${study.slug}`}>
          Quiet Blue / Enter the study <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}
