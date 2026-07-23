import Image from "next/image";
import type { Project } from "@/types";

interface ProjectCardProps { project: Project; className?: string; }

export default function ProjectCard({ project, className = "" }: ProjectCardProps) {
  return (
    <article id={project.id} className={`project-dossier ${className}`}>
      <div className="project-media">
        <Image
          src={project.image}
          alt={`${project.title} interface`}
          fill
          className="project-image"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 480px"
        />
      </div>
      <div className="project-copy">
        <p className="scene-kicker"><span /> DEPLOYED / {project.year}</p>
        <h3>{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <dl>
          <div><dt>ROLE</dt><dd>{project.role}</dd></div>
          <div><dt>YEAR</dt><dd>{project.year}</dd></div>
        </dl>
        <div className="project-actions">
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">LAUNCH ↗</a>}
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">SOURCE ↗</a>}
        </div>
      </div>
    </article>
  );
}
