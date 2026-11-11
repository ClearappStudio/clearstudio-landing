import { Link } from "react-router-dom";
import type { Project } from "@/data/content";
import { MailMark } from "@/components/site/MailMark";
import { GalleryArtwork } from "@/components/site/GalleryArtwork";

export function ProjectCard({ project }: { project: Project }) {
  if (project.tone === "prisma") {
    return (
      <Link className="project-card project-card--prisma project-card--wide" to="/prisma/" reloadDocument>
        <div className="project-meta"><span>{project.type}</span><span>{project.status}</span></div>
        <svg className="prisma-refraction" viewBox="0 0 720 360" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="prisma-light" x1="0" y1="180" x2="720" y2="180" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c5bbf2" stopOpacity="0"/><stop offset=".46" stopColor="#f9f6ff"/><stop offset="1" stopColor="#9172ee"/>
            </linearGradient>
            <linearGradient id="prisma-glass" x1="295" y1="60" x2="440" y2="260" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff" stopOpacity=".65"/><stop offset="1" stopColor="#8870d3" stopOpacity=".06"/>
            </linearGradient>
          </defs>
          <path d="M-40 180H342" stroke="url(#prisma-light)" strokeWidth="2"/>
          <g className="prisma-spectrum">
            <path d="M360 180 760 23V90L360 180Z" fill="#8f6bdf" opacity=".72"/>
            <path d="M360 180 760 90V150L360 180Z" fill="#aa91ef" opacity=".72"/>
            <path d="M360 180 760 150V209L360 180Z" fill="#bec2f8" opacity=".8"/>
            <path d="M360 180 760 209V270L360 180Z" fill="#8fc9da" opacity=".75"/>
            <path d="M360 180 760 270V337L360 180Z" fill="#72b9b3" opacity=".65"/>
          </g>
          <path d="m360 62 94 163H266L360 62Z" fill="url(#prisma-glass)" stroke="#fcfaff" strokeWidth="1.2"/>
          <path d="m360 62 2 118-96 45m96-45 92 45" stroke="#fff" strokeOpacity=".52" strokeWidth=".8"/>
          <circle cx="361" cy="180" r="3" fill="white"/>
        </svg>
        <div className="prisma-poster-copy">
          <h3>PRISMA</h3>
          <p>Your money.<br/>In a new light.</p>
        </div>
        <span className="project-card-arrow" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 19 19 5M5 5h14v14"/></svg></span>
      </Link>
    );
  }
  return (
    <Link
      className={`project-card project-card--${project.tone} project-card--${project.size}`}
      to={project.slug === "prisma" ? "/prisma/" : `/projects/${project.slug}`}
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
