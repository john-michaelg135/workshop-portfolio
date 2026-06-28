"use client";

import { useEffect, useRef } from "react";

interface OrbState {
  // smooth drift target
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  range: number;
  ease: number;
  // independent sine wobble for liveliness
  phase: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  scalePhase: number;
  scaleSpeed: number;
  scaleAmp: number;
}

export default function FloatingOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const orbs = Array.from(container.querySelectorAll<HTMLDivElement>(".orb"));
    if (!orbs.length) return;

    const states: OrbState[] = orbs.map((_, i) => ({
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      range: 110 + i * 18,
      ease: 0.012 + i * 0.002,
      phase: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.4 + Math.random() * 0.5,
      wobbleAmp: 18 + Math.random() * 22,
      scalePhase: Math.random() * Math.PI * 2,
      scaleSpeed: 0.3 + Math.random() * 0.4,
      scaleAmp: 0.08 + Math.random() * 0.07,
    }));

    function pickTarget(s: OrbState) {
      s.targetX = (Math.random() - 0.5) * s.range;
      s.targetY = (Math.random() - 0.5) * s.range;
    }
    states.forEach(pickTarget);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    let animationId = 0;
    let last = performance.now();

    function animate(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = now / 1000;

      for (let i = 0; i < orbs.length; i++) {
        const s = states[i];

        // Spring-like ease toward drifting target
        s.x += (s.targetX - s.x) * s.ease * (dt * 60);
        s.y += (s.targetY - s.y) * s.ease * (dt * 60);

        const dist = Math.hypot(s.targetX - s.x, s.targetY - s.y);
        if (dist < 6) pickTarget(s);

        // Sine wobble layered on top for a lively, bouncy feel
        const wx = Math.sin(t * s.wobbleSpeed + s.phase) * s.wobbleAmp;
        const wy = Math.cos(t * s.wobbleSpeed * 0.85 + s.phase) * s.wobbleAmp;
        const scale = 1 + Math.sin(t * s.scaleSpeed + s.scalePhase) * s.scaleAmp;

        orbs[i].style.transform = `translate3d(${s.x + wx}px, ${s.y + wy}px, 0) scale(${scale})`;
      }

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />
      <div className="orb orb-5" />
      <div className="orb orb-6" />
    </div>
  );
}
