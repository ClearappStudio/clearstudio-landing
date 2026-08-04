import { ProjectGrid } from "@/components/site/ProjectGrid";

export default function Projects() {
  return (
    <>
      <header className="page-intro projects-intro">
        <p className="eyebrow">Projects · 01—04</p>
        <h1>Different forms.<br /><span>One intention.</span></h1>
        <div className="intro-note">
          <span>Software</span><span>Systems</span><span>Design</span><span>Ideas</span>
          <p>Each project starts in a different place, but they all ask the same question: can digital life feel clearer than this?</p>
        </div>
      </header>
      <section className="section page-section" aria-label="All projects">
        <ProjectGrid />
      </section>
    </>
  );
}
