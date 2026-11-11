import { projects } from "@/data/content";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid() {
  return (
    <div className="project-grid">
      {projects.filter((project) => ["prisma", "daylight", "context-first-computing", "digital-art-gallery"].includes(project.slug)).map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
