import { Link } from "react-router-dom";
import "./StudioCollections.css";

export const studioApps = [
  {slug:"daylight",name:"Daylight",purpose:"A little room for your day.",detail:"Calendar, tasks and handwritten notes, together on iPad.",status:"Coming soon",icon:"/assets/daylight/app-icon.png"},
  {slug:"prisma",name:"PRISMA",purpose:"Your money, in perspective.",detail:"Plan your year, understand your spending and make room for what matters.",status:"Coming soon",icon:"/projects/prisma/assets/prisma-icon.webp"},
  {slug:"clear-projects",name:"Clear Projects",purpose:"Keep the whole project in view.",detail:"Tasks, milestones and a shared sense of what comes next. In development for iPad and Mac.",status:"In development",icon:null},
];

export function AppMark({ app }: {app:typeof studioApps[number]}) {
  return app.icon ? <img className="sc-app-icon" src={app.icon} width="64" height="64" alt="" loading="lazy"/> : <span className="sc-projects-mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><rect x="5" y="7" width="6" height="18" rx="2" fill="currentColor" opacity=".5"/><rect x="13" y="7" width="6" height="12" rx="2" fill="currentColor" opacity=".75"/><rect x="21" y="7" width="6" height="8" rx="2" fill="currentColor"/></svg></span>;
}

export function AppsCollection() {
  return <div className="sc-apps">
    <div className="sc-apps-intro"><p className="sc-label">Software / Clear Studio</p><h3>Thoughtful tools.<br/><em>Everyday clarity.</em></h3><p>A little more space to think, plan and move forward.</p><Link className="sc-text-link" to="/apps">Explore the apps <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 19 19 5M5 5h14v14"/></svg></Link></div>
    <div className="sc-app-entries">{studioApps.map((app,i)=><Link className={`sc-app-entry sc-app-entry--${app.slug}`} key={app.slug} to={`/projects/${app.slug}${app.slug==="prisma"?"/":""}`} reloadDocument={app.slug==="prisma"}><span className="sc-app-number">0{i+1}</span><AppMark app={app}/><span className="sc-app-entry-copy"><strong>{app.name}</strong><span>{app.purpose}</span></span><span className="sc-app-status">{app.status}</span><span className="sc-entry-arrow"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 19 19 5M5 5h14v14"/></svg></span></Link>)}</div>
  </div>;
}
