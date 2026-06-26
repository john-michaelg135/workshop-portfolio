import Image from "next/image";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export default function ProjectCard({ project, className = "" }: ProjectCardProps) {
  return (
    <article
      className={`flex flex-col lg:flex-row gap-8 lg:gap-12 ${className}`}
    >
      {/* Image */}
      <div className="w-full lg:flex-1 lg:min-w-0">
        <div className="relative w-full aspect-square bg-bg-secondary rounded-md overflow-hidden">
          {project.image && !project.image.includes("placeholder") ? (
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              className="object-cover p-6 rounded-[30px]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-4 bg-bg-tertiary rounded-lg" />
          )}
          {project.tags[0] && (
            <span className="absolute top-6 left-6 bg-bg-primary rounded-full px-4 py-2 font-body font-medium text-sm leading-[1.5] text-text-primary z-10">
              {project.tags[0]}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="w-full lg:flex-1 lg:min-w-0 flex flex-col justify-center gap-6">
        <h3 className="font-body font-medium text-[32px] leading-[1.4] gradient-text animate-float-title">
          {project.title}
        </h3>
        <p className="font-body text-lg leading-[1.5] text-text-secondary">
          {project.description}
        </p>

        {/* Project info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between border-t border-border pt-3">
            <span className="font-body font-medium text-base text-text-secondary">
              Year
            </span>
            <span className="font-body text-base text-text-primary">
              {project.year}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-3">
            <span className="font-body font-medium text-base text-text-secondary">
              Role
            </span>
            <span className="font-body text-base text-text-primary">
              {project.role}
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-6">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body font-bold text-base leading-[1.5] uppercase text-accent underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body font-bold text-base leading-[1.5] uppercase text-accent underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              See on Github
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
