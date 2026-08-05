import { Link } from "react-router-dom";
import { colourStudies } from "@/data/content";

export function ColorStudies() {
  const study = colourStudies[0];

  return (
    <div className={`home-study home-study--${study.className}`}>
      <div className="home-study__topline">
        <span>Studio study / {study.number.replace("No. ", "")}</span>
        <span>Chromatic research / {study.value}</span>
      </div>
      <div className="home-study__body">
        <div className="home-study__content">
          <p className="eyebrow">A colour, under study</p>
          <h2 id="colour-heading">Quiet<br />Blue.</h2>
          <p className="home-study__note">{study.note}</p>
          <Link className="home-study__link" to={`/studies/${study.slug}`}>
            Enter the study <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="home-study__composition" aria-hidden="true">
          <span className="home-study__plane home-study__plane--deep" />
          <span className="home-study__plane home-study__plane--light" />
          <span className="home-study__circle" />
          <span className="home-study__line" />
          <span className="home-study__caption">Field 01 / Stillness</span>
        </div>
      </div>
      <Link className="home-study__archive" to="/studies">
        All colour studies <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
