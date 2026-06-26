"use client";

import { useEffect, useRef } from "react";

export default function FloatingOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const orbs = container.querySelectorAll<HTMLDivElement>(".orb");
    const speeds = [0.3, 0.25, 0.35, 0.2, 0.28, 0.4];
    const positions = orbs.length
      ? Array.from(orbs).map(() => ({ x: 0, y: 0, targetX: 0, targetY: 0 }))
      : [];

    function randomTarget(index: number) {
      const range = 80 + index * 10;
      positions[index].targetX = (Math.random() - 0.5) * range;
      positions[index].targetY = (Math.random() - 0.5) * range;
    }

    // Set initial random targets
    positions.forEach((_, i) => randomTarget(i));

    let animationId: number;
    function animate() {
      orbs.forEach((orb, i) => {
        const pos = positions[i];
        const speed = speeds[i] * 0.02;

        pos.x += (pos.targetX - pos.x) * speed;
        pos.y += (pos.targetY - pos.y) * speed;

        // When close to target, pick a new one
        const dist = Math.abs(pos.targetX - pos.x) + Math.abs(pos.targetY - pos.y);
        if (dist < 1) {
          randomTarget(i);
        }

        orb.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      });

      animationId = requestAnimationFrame(animate);
    }

    // Respect reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!motionQuery.matches) {
      animationId = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Large purple orb - top left */}
      <div className="orb orb-1" />
      {/* Medium blue orb - top right */}
      <div className="orb orb-2" />
      {/* Small pink orb - mid left */}
      <div className="orb orb-3" />
      {/* Large teal orb - bottom right */}
      <div className="orb orb-4" />
      {/* Medium purple orb - bottom left */}
      <div className="orb orb-5" />
      {/* Small accent orb - center */}
      <div className="orb orb-6" />
    </div>
  );
}
