import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section
      id="projects"
      className="px-6 md:px-12 lg:px-[108px] py-20 border-t border-border"
    >
      {/* Section heading */}
      <ScrollReveal variant="up">
        <h2 className="font-display text-[48px] md:text-[60px] lg:text-[76px] leading-[1] gradient-text mb-12 lg:mb-16">
          FEATURED PROJECTS
        </h2>
      </ScrollReveal>

      {/* Project cards — full width */}
      <div className="flex flex-col gap-16 lg:gap-20">
        {projects.map((project, i) => (
          <ScrollReveal key={project.id} variant="scale" delay={i * 120}>
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
