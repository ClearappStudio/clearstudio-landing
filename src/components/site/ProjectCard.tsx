import { Link } from "react-router-dom";
import type { Project } from "@/data/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      className={`project-card project-card--${project.tone} project-card--${project.size}`}
      to={`/projects/${project.slug}`}
    >
      <div className="project-meta">
        <span>{project.type}</span>
        <span>{project.status}</span>
      </div>
      <div className="project-copy">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </Link>
  );
}
