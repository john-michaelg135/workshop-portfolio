"use client";

import { useState, useCallback } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((index: number, dir: "left" | "right") => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setDirection(null);
      setIsAnimating(false);
    }, 350);
  }, [isAnimating]);

  const prev = () => {
    const index = current === 0 ? projects.length - 1 : current - 1;
    goTo(index, "left");
  };

  const next = () => {
    const index = current === projects.length - 1 ? 0 : current + 1;
    goTo(index, "right");
  };

  return (
    <section id="projects" className="scene projects-scene">
      <header className="scene-heading">
        <span>NODE / 03</span>
        <h2>PROJECT SPACE</h2>
        <p>Selected systems built at the intersection of utility, intelligence, and visual clarity.</p>
      </header>
      <div className="project-carousel">
        <button
          className="carousel-arrow carousel-arrow--left"
          onClick={prev}
          aria-label="Previous project"
        >
          <svg className="arrow-pixel" width="24" height="40" viewBox="0 0 24 40" fill="currentColor" aria-hidden="true">
            <rect x="16" y="0" width="8" height="4" />
            <rect x="12" y="4" width="8" height="4" />
            <rect x="8" y="8" width="8" height="4" />
            <rect x="4" y="12" width="8" height="4" />
            <rect x="0" y="16" width="8" height="8" />
            <rect x="4" y="24" width="8" height="4" />
            <rect x="8" y="28" width="8" height="4" />
            <rect x="12" y="32" width="8" height="4" />
            <rect x="16" y="36" width="8" height="4" />
          </svg>
        </button>

        <div className="carousel-viewport">
          <div
            className={`carousel-slide ${direction === "right" ? "slide-exit-left" : ""} ${direction === "left" ? "slide-exit-right" : ""}`}
            key={current}
          >
            <ProjectCard project={projects[current]} />
          </div>
        </div>

        <button
          className="carousel-arrow carousel-arrow--right"
          onClick={next}
          aria-label="Next project"
        >
          <svg className="arrow-pixel" width="24" height="40" viewBox="0 0 24 40" fill="currentColor" aria-hidden="true">
            <rect x="0" y="0" width="8" height="4" />
            <rect x="4" y="4" width="8" height="4" />
            <rect x="8" y="8" width="8" height="4" />
            <rect x="12" y="12" width="8" height="4" />
            <rect x="16" y="16" width="8" height="8" />
            <rect x="12" y="24" width="8" height="4" />
            <rect x="8" y="28" width="8" height="4" />
            <rect x="4" y="32" width="8" height="4" />
            <rect x="0" y="36" width="8" height="4" />
          </svg>
        </button>
      </div>
      <div className="carousel-indicators">
        <span className="carousel-counter">
          {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
        <div className="carousel-dots">
          {projects.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === current ? "active" : ""}`}
              onClick={() => goTo(i, i > current ? "right" : "left")}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
