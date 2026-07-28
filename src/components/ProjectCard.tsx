"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/types";

interface ProjectCardProps { project: Project; className?: string; }

export default function ProjectCard({ project, className = "" }: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const hasImage = !!project.image;

  useEffect(() => { setMounted(true); }, []);

  // Preload image on mount so popup opens instantly
  useEffect(() => {
    if (hasImage) {
      const img = new Image();
      img.src = project.image;
    }
  }, [hasImage, project.image]);

  // Close on Escape
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModalOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  const popup = modalOpen && hasImage ? (
    <div className="img-popup-backdrop" onClick={() => setModalOpen(false)}>
      <div className="img-popup" onClick={(e) => e.stopPropagation()}>
        <div className="img-popup-header">
          <span className="img-popup-title">FILE_VIEWER://IMG_{project.id.replace("project-", "")}.sys</span>
          <button
            className="img-popup-close"
            onClick={() => setModalOpen(false)}
            aria-label="Close image preview"
          >
            ×
          </button>
        </div>
        <div className="img-popup-body">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
          />
        </div>
        <div className="img-popup-corners" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <article id={project.id} className={`project-dossier ${className}`}>
        <div
          className={`project-media ${hasImage ? "project-media--clickable" : ""}`}
          onClick={hasImage ? () => setModalOpen(true) : undefined}
          role={hasImage ? "button" : undefined}
          tabIndex={hasImage ? 0 : undefined}
          aria-label={hasImage ? `View ${project.title} screenshot` : undefined}
          onKeyDown={hasImage ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setModalOpen(true); } } : undefined}
        >
          <div className="project-placeholder" aria-label={`${project.title} placeholder`}>
            <div className="placeholder-grid" />
            <div className="placeholder-glow" />
            <div className="placeholder-corners" aria-hidden="true">
              <span /><span /><span /><span />
            </div>
            <div className="placeholder-logo" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="8" width="40" height="32" rx="2" stroke="currentColor" strokeWidth="2" />
                <circle cx="16" cy="18" r="4" stroke="currentColor" strokeWidth="2" />
                <polyline points="4,36 16,26 24,32 34,22 44,30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="placeholder-label">
              <span className="placeholder-id">{project.id.replace("project-", "PRJ_0")}</span>
              <span className="placeholder-tag">{project.type}</span>
              <span className="placeholder-status">{project.status}</span>
            </div>
            <div className="placeholder-data" aria-hidden="true">
              <span>SYS.INIT</span>
              <span>NODE_ACTIVE</span>
              <span>BUILD://READY</span>
            </div>
            <div className="placeholder-scan" />
            <div className="placeholder-scanlines" />
          </div>
        </div>
        <div className="project-copy">
          <p className="scene-kicker"><span /> {project.type} / {project.year}</p>
          <h3>{project.title}</h3>
          <p className="project-desc">{project.description}</p>
          <div className="project-tags">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <dl>
            <div><dt>ROLE</dt><dd>{project.role}</dd></div>
            <div><dt>YEAR</dt><dd>{project.year}</dd></div>
            <div><dt>STATUS</dt><dd>{project.status}</dd></div>
          </dl>
          <div className="project-actions">
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">LAUNCH ↗</a>
            ) : (
              <span className="project-action-disabled">LAUNCH ↗</span>
            )}
            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">SOURCE ↗</a>}
          </div>
        </div>
      </article>

      {mounted && popup && createPortal(popup, document.body)}
    </>
  );
}
