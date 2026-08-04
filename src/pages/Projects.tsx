import { ProjectGrid } from "@/components/site/ProjectGrid";

export default function Projects() {
  return (
    <>
      <header className="page-intro">
        <p className="eyebrow">Our work</p>
        <h1>Projects</h1>
        <p>
          Software, systems, design and ideas created to make digital life
          clearer.
        </p>
      </header>
      <section className="section page-section" aria-label="All projects">
        <ProjectGrid />
      </section>
    </>
  );
}
