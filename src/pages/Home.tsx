import { Link } from "react-router-dom";
import { JournalList } from "@/components/site/JournalList";
import { ProjectGrid } from "@/components/site/ProjectGrid";

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div>
          <p className="eyebrow">Independent digital studio</p>
          <h1 id="hero-title">
            Reducing unnecessary complexity in digital life.
          </h1>
        </div>
        <p className="hero-copy">
          Sometimes through software. Sometimes through design.{" "}
          <span>
            Sometimes simply through an idea that changes how we think.
          </span>
        </p>
      </section>
      <section className="section" aria-labelledby="projects-heading">
        <div className="section-heading">
          <h2 id="projects-heading">Selected projects</h2>
          <Link className="section-link" to="/projects">
            View all projects <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <ProjectGrid />
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
