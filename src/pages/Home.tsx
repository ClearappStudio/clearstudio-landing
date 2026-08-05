import { Link } from "react-router-dom";
import { JournalList } from "@/components/site/JournalList";
import { ProjectGrid } from "@/components/site/ProjectGrid";
import { ColorStudies } from "@/components/site/ColorStudies";

export default function Home() {
  return (
    <>
      <section className="hero editorial-hero" aria-labelledby="hero-title">
        <div>
          <p className="eyebrow">Clear Studio / Madrid / 2026</p>
          <h1 id="hero-title">
            Ideas for a clearer<br />digital life.
          </h1>
        </div>
        <p className="hero-copy">
          We make software, systems, designs and ideas.{" "}
          <span>
            Different forms, held together by the same intention: less friction, more meaning.
          </span>
        </p>
      </section>
      <section className="section" aria-labelledby="projects-heading">
        <div className="section-heading">
          <h2 id="projects-heading">Featured</h2>
          <Link className="section-link" to="/projects">
            View all projects <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <ProjectGrid />
      </section>
      <section className="colour-section" aria-labelledby="colour-heading">
        <ColorStudies />
      </section>
      <section className="section" aria-labelledby="why-heading">
        <div className="statement-layout">
          <h2 id="why-heading">Why we exist</h2>
          <div>
            <p className="statement">
              Digital life becomes more capable every year.{" "}
              <span>
                It also becomes more fragmented, demanding and complicated than
                it needs to be.
              </span>
            </p>
            <Link className="inline-link" to="/about">
              About Clear Studio <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="journal-heading">
        <div className="section-heading">
          <h2 id="journal-heading">From the Journal</h2>
          <Link className="section-link" to="/journal">
            Visit the Journal <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <JournalList limit={3} />
      </section>
    </>
  );
}
