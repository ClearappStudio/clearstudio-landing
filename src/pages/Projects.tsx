import { ProjectGrid } from "@/components/site/ProjectGrid";
import { ProjectIndex } from "@/components/site/ProjectIndex";

export default function Projects() {
  return (
    <>
      <header className="page-intro projects-intro">
        <p className="eyebrow">Projects</p>
        <h1>Different forms.<br /><span>One intention.</span></h1>
        <div className="intro-note">
          <span>Software</span><span>Systems</span><span>Designs</span><span>Ideas</span>
          <p>Each project starts in a different place, but they all ask the same question: can digital life feel clearer than this?</p>
        </div>
      </header>
      <section className="section page-section" aria-labelledby="featured-projects-heading">
        <div className="section-heading">
          <h2 id="featured-projects-heading">Featured</h2>
        </div>
        <ProjectGrid />
      </section>
      <section className="section projects-index-section" aria-labelledby="all-projects-heading">
        <ProjectIndex />
      </section>
    </>
  );
}
