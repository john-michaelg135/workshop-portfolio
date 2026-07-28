"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { navLinks, socialLinks } from "@/lib/data";

const sectionIds = ["home", "skills", "projects", "certificates", "about", "contact"];

export default function ContextPanel() {
  const [activeHref, setActiveHref] = useState("#home");
  const rafRef = useRef(0);

  const detectActive = useCallback(() => {
    const feed = document.querySelector(".content-feed");
    if (!feed) return;

    const feedRect = feed.getBoundingClientRect();
    const threshold = feedRect.top + feedRect.height * 0.35;

    let current = "#home";
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= threshold) {
        current = `#${id}`;
      }
    }
    setActiveHref((prev) => (prev === current ? prev : current));
  }, []);

  useEffect(() => {
    const feed = document.querySelector(".content-feed");
    if (!feed) return;

    function onScroll() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(detectActive);
    }

    feed.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    detectActive();

    return () => {
      feed.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [detectActive]);

  return (
    <aside className="context-panel" aria-label="Profile context">
      <section className="context-block">
        <div className="context-label"><span className="status-dot" />SIGNAL ONLINE</div>
        <p className="context-value">JM_GARCIA</p>
        <p className="context-copy">Data Services Specialist</p>
      </section>
      <section className="context-block">
        <div className="context-label">SYSTEM LOAD</div>
        <div className="metric-row"><span>Analytical Thinking</span><b>78%</b></div>
        <div className="signal-meter"><span style={{ width: "78%" }} /></div>
        <div className="metric-row"><span>Attention to Detail</span><b>85%</b></div>
        <div className="signal-meter"><span style={{ width: "85%" }} /></div>
        <div className="metric-row"><span>Critical Thinking</span><b>70%</b></div>
        <div className="signal-meter"><span style={{ width: "70%" }} /></div>
        <div className="metric-row"><span>Communication</span><b>64%</b></div>
        <div className="signal-meter"><span style={{ width: "64%" }} /></div>
        <div className="metric-row"><span>Curiosity</span><b>56%</b></div>
        <div className="signal-meter"><span style={{ width: "56%" }} /></div>
        <div className="metric-row"><span>Adaptability</span><b>80%</b></div>
        <div className="signal-meter"><span style={{ width: "80%" }} /></div>
        <div className="metric-row"><span>Creativity</span><b>35%</b></div>
        <div className="signal-meter"><span style={{ width: "35%" }} /></div>
      </section>
      <section className="context-block">
        <div className="context-label">ACTIVE MODULES</div>
        <div className="module-cloud">
          {navLinks.map((link) => (
            <span
              key={link.href}
              className={link.href === activeHref ? "module-active" : "module-idle"}
            >
              {link.label}
            </span>
          ))}
        </div>
      </section>
      <section className="context-block context-block--bottom">
        <div className="context-label">EXTERNAL NODES</div>
        {socialLinks.map((link) => <a key={link.id} href={link.url} target="_blank" rel="noreferrer">{link.platform.toUpperCase()} ↗</a>)}
      </section>
    </aside>
  );
}
