import { Link } from "react-router-dom";
import type { Project } from "@/data/content";
import { MailMark } from "@/components/site/MailMark";
import { GalleryArtwork } from "@/components/site/GalleryArtwork";

export function ProjectCard({ project }: { project: Project }) {
  if (project.tone === "prisma") {
    return (
      <Link className="project-card project-card--prisma project-card--wide" to="/projects/prisma/" reloadDocument aria-label="Explore PRISMA — personal finance for iPad, coming soon">
        <div className="prisma-gateway-light" aria-hidden="true"><i/><i/><i/></div>
        <span className="prisma-gateway-status"><i/> Coming soon for iPad</span>
        <div className="prisma-gateway-center">
          <img src="/projects/prisma/assets/prisma-icon.webp" width="52" height="52" alt="" loading="lazy"/>
          <h3>PRISMA</h3>
          <p>See your money in a new light.</p>
        </div>
        <div className="prisma-gateway-footer">
          <span>Plan <i/> Understand <i/> Save</span>
          <span className="prisma-gateway-enter">Explore<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span>
        </div>
      </Link>
    );
  }
  return (
    <Link
      className={`project-card project-card--${project.tone} project-card--${project.size}`}
      to={project.slug === "prisma" ? "/projects/prisma/" : `/projects/${project.slug}`}
      reloadDocument={project.slug === "prisma"}
    >
      <div className="project-meta">
        <span>{project.type}</span>
        <span>{project.status}</span>
      </div>
      {project.tone === "daylight" && (
        <div className="project-visual project-daylight-visual" aria-hidden="true">
          <img src="/assets/daylight/app-icon.png" alt="" width="1024" height="1024" loading="lazy" />
        </div>
      )}
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
        <div className="project-visual project-context-cover" style={{ padding: 0, background: "transparent", height: "auto", aspectRatio: "5 / 8" }} aria-hidden="true">
          <img src="/assets/context-first-computing/book-cover.jpg" alt="" width="1600" height="2560" loading="lazy" style={{display:"block",width:"100%",height:"100%",objectFit:"contain"}} />
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
