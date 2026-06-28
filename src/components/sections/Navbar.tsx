"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { navLinks } from "@/lib/data";
import ThemeToggle from "@/components/ui/ThemeToggle";

type NavMode = "scroll" | "click" | "drag";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [navMode, setNavMode] = useState<NavMode>("scroll");
  const [pillStyle, setPillStyle] = useState({ left: 0, top: 0, width: 0, height: 0 });

  // Drag state
  const [dragging, setDragging] = useState(false);
  const [dragLeft, setDragLeft] = useState<number | null>(null);
  const dragRef = useRef({ startX: 0, startLeft: 0, moved: false });

  const navRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const navigatingRef = useRef(false);

  // Measure and move pill to a link
  const updatePill = useCallback((index: number) => {
    const link = linkRefs.current[index];
    const nav = navRef.current;
    if (!link || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    setPillStyle({
      left: linkRect.left - navRect.left,
      top: linkRect.top - navRect.top,
      width: linkRect.width,
      height: linkRect.height,
    });
  }, []);

  // Navigate to a tab (click or drag-release)
  const activeIndexRef = useRef(activeIndex);
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const goToTab = useCallback((index: number, mode: NavMode) => {
    setPrevIndex(activeIndexRef.current);
    setNavMode(mode);
    setIsTransitioning(true);
    setActiveIndex(index);

    // Lock the observer briefly so the pill travels straight to target
    navigatingRef.current = true;
    window.setTimeout(() => {
      navigatingRef.current = false;
    }, 800);

    const id = navLinks[index].href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Observe scroll position to highlight active section
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        if (navigatingRef.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id);
            if (idx !== -1) {
              setActiveIndex((prev) => {
                if (prev !== idx) {
                  setPrevIndex(prev);
                  setNavMode("scroll");
                  setIsTransitioning(true);
                }
                return idx;
              });
            }
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Reposition pill on active change; clear transition flag
  useEffect(() => {
    if (!dragging) updatePill(activeIndex);
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 360);
      return () => clearTimeout(timer);
    }
  }, [activeIndex, updatePill, isTransitioning, dragging]);

  useEffect(() => {
    function handleResize() {
      if (!dragging) updatePill(activeIndex);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex, updatePill, dragging]);

  useEffect(() => {
    const timer = setTimeout(() => updatePill(activeIndex), 100);
    return () => clearTimeout(timer);
  }, [activeIndex, updatePill]);

  // ===== Drag handlers =====
  function handlePointerDown(e: React.PointerEvent<HTMLLIElement>) {
    e.preventDefault();
    setDragging(true);
    dragRef.current = { startX: e.clientX, startLeft: pillStyle.left, moved: false };
    setDragLeft(pillStyle.left);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLLIElement>) {
    if (!dragging) return;
    const nav = navRef.current;
    if (!nav) return;
    const delta = e.clientX - dragRef.current.startX;
    if (Math.abs(delta) > 3) dragRef.current.moved = true;
    let newLeft = dragRef.current.startLeft + delta;
    const maxLeft = nav.clientWidth - pillStyle.width;
    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    setDragLeft(newLeft);
  }

  function handlePointerUp(e: React.PointerEvent<HTMLLIElement>) {
    if (!dragging) return;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    const nav = navRef.current;
    if (!nav || dragLeft === null) {
      setDragLeft(null);
      return;
    }
    const navRect = nav.getBoundingClientRect();
    const pillCenter = dragLeft + pillStyle.width / 2;

    let nearest = activeIndex;
    let best = Infinity;
    linkRefs.current.forEach((link, i) => {
      if (!link) return;
      const r = link.getBoundingClientRect();
      const center = r.left - navRect.left + r.width / 2;
      const d = Math.abs(center - pillCenter);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });

    setDragLeft(null);
    goToTab(nearest, "drag");
  }

  // Squeeze (skip while dragging)
  const distance = Math.abs(activeIndex - prevIndex);
  const squeezeY = isTransitioning && !dragging ? 1 - Math.min(distance * 0.06, 0.2) : 1;
  const squeezeX = isTransitioning && !dragging ? 1 + Math.min(distance * 0.1, 0.35) : 1;

  const pillTransition = dragging
    ? "transform 0.15s ease"
    : navMode === "click"
    ? "left 0.26s cubic-bezier(0.22, 1, 0.36, 1), top 0.26s ease, width 0.26s cubic-bezier(0.22, 1, 0.36, 1), height 0.26s ease, transform 0.26s ease"
    : navMode === "drag"
    ? "left 0.32s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.3s ease, width 0.3s ease, height 0.3s ease, transform 0.3s ease"
    : "left 0.38s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.3s ease, width 0.34s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.3s ease, transform 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6)";

  const pillLeft = (dragLeft ?? pillStyle.left) - 16;

  // Shared geometry for the visible pill and the transparent drag overlay
  const pillTransform = dragging
    ? "scaleX(1.06) scaleY(0.78)"
    : `scaleX(${squeezeX}) scaleY(${squeezeY})`;

  const pillBox: React.CSSProperties = {
    left: `${pillLeft}px`,
    top: `${pillStyle.top - 8}px`,
    width: `${pillStyle.width + 32}px`,
    height: `${pillStyle.height + 16}px`,
    transform: pillTransform,
    transformOrigin: "center",
    transition: pillTransition,
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className="glass flex items-center justify-between px-6 md:px-[60px] py-3 mx-3 md:mx-6 mt-3 rounded-full"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          className="font-display text-[28px] leading-[1.5] tracking-[-0.32px] text-text-primary transition-transform duration-300 hover:scale-105"
        >
          KAEL
        </a>

        {/* Desktop navigation with draggable animated pill */}
        <ul ref={navRef} className="hidden md:flex items-center gap-8 relative">
          {/* Visible glass pill (non-interactive; drawn behind text) */}
          <li
            aria-hidden="true"
            className="absolute z-20 rounded-full pointer-events-none"
            style={{
              ...pillBox,
              background: "var(--glass-bg)",
              backdropFilter: "blur(12px) saturate(140%)",
              WebkitBackdropFilter: "blur(12px) saturate(140%)",
              border: "1px solid var(--glass-border)",
              boxShadow: dragging
                ? "inset 0 1px 0 0 var(--glass-highlight), 0 12px 30px -6px var(--glass-shadow)"
                : "inset 0 1px 0 0 var(--glass-highlight), 0 4px 16px -4px var(--glass-shadow)",
            }}
          />
          {navLinks.map((link, i) => (
            <li key={link.href} className="relative z-30">
              <a
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  goToTab(i, "click");
                }}
                className={`font-nav font-medium text-base leading-6 tracking-[-0.48px] transition-all duration-300 inline-block select-none ${
                  i === activeIndex
                    ? "text-accent scale-105"
                    : "text-text-primary hover:text-accent hover:-translate-y-0.5"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}

          {/* Transparent drag handle covering the whole pill (on top) */}
          <li
            role="slider"
            aria-label="Active section indicator (drag to change)"
            aria-valuenow={activeIndex}
            aria-valuemin={0}
            aria-valuemax={navLinks.length - 1}
            tabIndex={0}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`absolute z-40 rounded-full ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
            style={{
              ...pillBox,
              touchAction: "none",
              background: "transparent",
            }}
          />
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-10 h-10 text-text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden glass mx-3 mt-2 rounded-2xl animate-rise">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-nav font-medium text-base leading-6 tracking-[-0.48px] text-text-primary transition-colors hover:text-accent block py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
