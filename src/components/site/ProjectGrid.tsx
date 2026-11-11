import { projects } from "@/data/content";
import { ProjectCard } from "./ProjectCard";
import { AppsCollection } from "./AppsCollection";

export function ProjectGrid() {
  return <div className="studio-featured"><AppsCollection/><div className="studio-secondary">{["digital-art-gallery","context-first-computing"].map(slug=><ProjectCard key={slug} project={projects.find(p=>p.slug===slug)!}/>)}</div></div>;
}
