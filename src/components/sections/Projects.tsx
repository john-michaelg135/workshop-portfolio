import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="scene projects-scene">
      <header className="scene-heading">
        <span>NODE / 02</span>
        <h2>PROJECT SPACE</h2>
        <p>Selected systems built at the intersection of utility, intelligence, and visual clarity.</p>
      </header>
      <div className="project-stage">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
