"use client";

import { useEffect, useRef, useState } from "react";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SuccessModal({ open, onClose }: SuccessModalProps) {
  const [mounted, setMounted] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) setMounted(true);
    else {
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

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

  if (!mounted) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="modal-header">
          <span>SYS_LOG://MSG_SENT.confirm</span>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors"
            aria-label="Close dialog"
          >
            [×]
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-accent alive" />
            <h3
              id="success-title"
              className="font-display font-semibold text-xl tracking-[0.02em] text-accent text-glow"
            >
              TRANSMISSION COMPLETE
            </h3>
          </div>

          <p className="font-body text-sm text-text-secondary leading-[1.6]">
            Your message has been delivered successfully.
            I&apos;ll respond as soon as possible.
          </p>

          <div className="border-t border-bg-border pt-4 mt-2">
            <span className="font-mono text-[10px] text-text-disabled tracking-wider block mb-4">
              STATUS: DELIVERED // QUEUE_POS: 1
            </span>
            <button
              type="button"
              onClick={onClose}
              className="btn-primary"
            >
              ACKNOWLEDGE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
