import { projects } from "@/data/content";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid() {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
