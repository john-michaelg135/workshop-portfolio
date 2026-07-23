"use client";

import { useEffect, useState } from "react";

interface ParticleData {
  id: number;
  driftX: string;
  driftY: string;
  duration: string;
  delay: string;
  left: string;
  top: string;
}

export default function Particles() {
  const [particles, setParticles] = useState<ParticleData[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Generate particles client-side to avoid hydration mismatch
    const count = window.innerWidth < 768 ? 8 : 18;
    const generated: ParticleData[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      driftX: `${(Math.random() - 0.5) * 200}px`,
      driftY: `${-100 - Math.random() * 300}px`,
      duration: `${6 + Math.random() * 8}s`,
      delay: `${Math.random() * 6}s`,
      left: `${Math.random() * 100}%`,
      top: `${20 + Math.random() * 70}%`,
    }));
    setParticles(generated);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            "--drift-x": p.driftX,
            "--drift-y": p.driftY,
            "--particle-duration": p.duration,
            "--particle-delay": p.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
