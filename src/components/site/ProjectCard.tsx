import { Link } from "react-router-dom";
import type { Project } from "@/data/content";
import { MailMark } from "@/components/site/MailMark";
import { GalleryArtwork } from "@/components/site/GalleryArtwork";

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
      {project.tone === "notebook" && (
        <div className="project-visual project-notebook-visual" aria-hidden="true">
          <div className="project-notebook-lines"><i /><i /><i /></div>
          <div className="project-notebook-context"><i /><span>Today<br />in context</span></div>
        </div>
      )}
      {project.tone === "mail" && (
        <div className="project-visual project-mail-visual" aria-hidden="true">
          <div className="project-mail-bar"><MailMark className="project-mail-mark" /><span>Clear Mail</span></div>
          <div className="project-mail-row project-mail-row--active"><i /> <b>Decide</b><span>Now</span></div>
          <div className="project-mail-row"><i /> <b>Defer</b><span>4</span></div>
          <div className="project-mail-row"><i /> <b>Archive</b><span>12</span></div>
          <div className="project-mail-row"><i /> <b>Waiting</b><span>3</span></div>
        </div>
      )}
      {project.tone === "context" && (
        <div className="project-visual project-context-cover" aria-hidden="true">
          <small>Clear Studio Editions</small>
          <strong>Context<br />comes first.</strong>
        </div>
      )}
      {project.tone === "gallery" && <GalleryArtwork className="project-gallery-art" />}
      <div className="project-copy">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <span className="project-card-arrow" aria-hidden="true">↗</span>
    </Link>
  );
}
