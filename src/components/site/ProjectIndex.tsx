import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/content";

const filters = ["All", "Software", "Systems", "Designs", "Ideas"] as const;
type Filter = (typeof filters)[number];

const filterForType: Record<string, Filter> = {
  Software: "Software",
  System: "Systems",
  Design: "Designs",
  Idea: "Ideas",
};

export function ProjectIndex() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const visibleProjects = projects.filter(
    (project) =>
      activeFilter === "All" || filterForType[project.type] === activeFilter,
  );

  return (
    <div className="projects-index">
      <div className="projects-index-heading">
        <div>
          <p className="eyebrow">The collection</p>
          <h2 id="all-projects-heading">All projects</h2>
        </div>
        <div className="project-filters" aria-label="Filter projects">
          {filters.map((filter) => (
            <button
              className={`project-filter project-filter--${filter.toLowerCase()}${activeFilter === filter ? " active" : ""}`}
              key={filter}
              type="button"
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter !== "All" && <i aria-hidden="true" />}
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="project-index-list" aria-live="polite">
        {visibleProjects.map((project) => (
          <Link
            className={`project-index-row project-index-row--${project.type.toLowerCase()}`}
            key={project.slug}
            to={`/projects/${project.slug}`}
          >
            <span className="project-index-title">{project.title}</span>
            <span className="project-index-type">
              <i aria-hidden="true" />
              {project.type}
            </span>
            <span className="project-index-status">{project.status}</span>
            <span className="project-index-arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
