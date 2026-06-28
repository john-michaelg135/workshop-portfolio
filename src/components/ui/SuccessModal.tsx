"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const CONFETTI_COLORS = ["#C3B1FF", "#8B5CF6", "#EC4899", "#06B6D4", "#3B82F6", "#FBBF24"];

export default function SuccessModal({
  open,
  onClose,
  title = "Message Sent!",
  message = "Thanks for reaching out — I'll get back to you as soon as I can.",
}: SuccessModalProps) {
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Mount / unmount with exit animation
  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
    } else if (mounted) {
      setClosing(true);
      const timer = setTimeout(() => setMounted(false), 320);
      return () => clearTimeout(timer);
    }
  }, [open, mounted]);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Esc to close + focus management + lock scroll
  useEffect(() => {
    if (!mounted) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [mounted, onClose]);

  // Confetti pieces (generated once per open)
  const confetti = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 18 + Math.random() * 0.4;
      const dist = 90 + Math.random() * 70;
      return {
        id: i,
        dx: `${Math.cos(angle) * dist}px`,
        dy: `${Math.sin(angle) * dist}px`,
        rot: `${Math.random() * 720 - 360}deg`,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: `${Math.random() * 0.1}s`,
        size: `${6 + Math.random() * 6}px`,
      };
    });
    // Regenerate whenever it (re)opens
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!mounted) return null;

  return (
    <div
      className={`success-backdrop ${closing ? "is-closing" : ""}`}
      onClick={onClose}
      aria-hidden={false}
    >
      <div
        className={`success-card glass ${closing ? "is-closing" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
        aria-describedby="success-desc"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Confetti burst */}
        {!reduceMotion && !closing && (
          <div className="confetti" aria-hidden="true">
            {confetti.map((c) => (
              <span
                key={c.id}
                style={
                  {
                    "--dx": c.dx,
                    "--dy": c.dy,
                    "--rot": c.rot,
                    background: c.color,
                    width: c.size,
                    height: c.size,
                    animationDelay: c.delay,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        )}

        {/* Animated checkmark with ripple rings */}
        <div className="success-check" aria-hidden="true">
          {!reduceMotion && (
            <>
              <span className="ring" />
              <span className="ring ring-2" />
            </>
          )}
          <svg viewBox="0 0 52 52" className="check-svg">
            <circle className="check-circle" cx="26" cy="26" r="24" fill="none" />
            <path className="check-mark" fill="none" d="M14 27.5l7.5 7.5L38 18.5" />
          </svg>
        </div>

        <h3
          id="success-title"
          className="font-display text-[40px] leading-none gradient-text text-center"
        >
          {title}
        </h3>
        <p
          id="success-desc"
          className="font-body text-base leading-[1.5] text-text-secondary text-center max-w-[320px]"
        >
          {message}
        </p>

        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center bg-accent text-text-on-accent font-body font-bold text-base leading-none uppercase rounded-full px-10 py-4 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          Done
        </button>
      </div>
    </div>
  );
}
