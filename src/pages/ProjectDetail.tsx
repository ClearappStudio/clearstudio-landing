import { Link, Navigate, useParams } from "react-router-dom";
import { projects } from "@/data/content";

export default function ProjectDetail() {
  const { projectSlug } = useParams();
  const project = projects.find((item) => item.slug === projectSlug);
  if (!project) return <Navigate to="/projects" replace />;
  return (
    <article>
      <header className={`project-hero project-card--${project.tone}`}>
        <div className="project-meta">
          <span>{project.type}</span>
          <span>{project.status}</span>
        </div>
        <div>
          <p className="eyebrow">Clear Studio project</p>
          <h1>{project.title}</h1>
        </div>
      </header>
      <section className="section project-placeholder">
        <p className="statement">{project.description}</p>
        <p className="body-copy muted-copy">
          This project page is taking shape. More details will be published here
          soon.
        </p>
        <Link className="inline-link" to="/projects">
          ← Back to all projects
        </Link>
      </section>
    </article>
  );
}
