"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { navLinks } from "@/lib/data";

const sections = [
  { id: "home", nav: "#home", label: "IDENTITY", accent: "#00E5C8", bright: "#5DFFE9", rgb: "0, 229, 200" },
  { id: "skills", nav: "#skills", label: "SKILL MATRIX", accent: "#4FC3F7", bright: "#9DDEFC", rgb: "79, 195, 247" },
  { id: "projects", nav: "#projects", label: "PROJECT NODE", accent: "#FF4F9A", bright: "#FF91C2", rgb: "255, 79, 154" },
  { id: "certificates", nav: "#certificates", label: "ACHIEVEMENTS", accent: "#D4A058", bright: "#F0C786", rgb: "212, 160, 88" },
  { id: "about", nav: "#about", label: "MEMORY ARCHIVE", accent: "#9C5FE0", bright: "#C29AF0", rgb: "156, 95, 224" },
  { id: "contact", nav: "#contact", label: "COMM LINK", accent: "#FF3D3D", bright: "#FF8585", rgb: "255, 61, 61" },
];
const glyphs = ["01", "02", "03", "04", "05", "06"];

export default function Navbar() {
  const [active, setActive] = useState(sections[0]);
  const rafRef = useRef(0);

  const detectActive = useCallback(() => {
    const feed = document.querySelector(".content-feed");
    if (!feed) return;

    // Use the feed's scroll position to determine which section is "in view"
    const feedRect = feed.getBoundingClientRect();
    const threshold = feedRect.top + feedRect.height * 0.35; // 35% from top of feed

    let current = sections[0];
    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= threshold) {
        current = section;
      }
    }
    setActive((prev) => (prev.id === current.id ? prev : current));
  }, []);

  useEffect(() => {
    const feed = document.querySelector(".content-feed");
    if (!feed) return;

    function onScroll() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(detectActive);
    }

    feed.addEventListener("scroll", onScroll, { passive: true });
    // Also listen to window scroll for mobile where feed might not be the scroller
    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial detection
    detectActive();

    return () => {
      feed.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [detectActive]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", active.accent);
    root.style.setProperty("--accent-bright", active.bright);
    root.style.setProperty("--accent-rgb", active.rgb);
  }, [active]);

  function navigate(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <header className="system-bar">
        <a className="system-brand" href="#home" onClick={(e) => navigate(e, "#home")}>K<span>/</span>G</a>
        <div className="system-route"><span>NODE</span><strong>{active.label}</strong></div>
        <div className="system-ticker" aria-hidden="true"><span>● LIVE</span><span>120 BPM</span><span>2026.07.23</span></div>
      </header>
      <nav className="nav-rail" aria-label="Primary navigation">
        <a className="rail-monogram" href="#home" onClick={(e) => navigate(e, "#home")} aria-label="Home">KG</a>
        <div className="rail-menu">
          {navLinks.map((link, index) => {
            const isActive = active.nav === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => navigate(e, link.href)}
                className={`rail-link ${isActive ? "is-active" : ""}`}
                aria-current={isActive ? "location" : undefined}
              >
                <span className="rail-glyph">{glyphs[index]}</span>
                <span className="rail-name">{link.label}</span>
              </a>
            );
          })}
        </div>
        <div className="rail-status" aria-hidden="true"><span /><small>ONLINE</small></div>
      </nav>
    </>
  );
}
