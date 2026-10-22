"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

export function GuideTip({
  label,
  title,
  children,
  active = false,
}: {
  label: string;
  title?: string;
  children: ReactNode;
  active?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [place, setPlace] = useState({ top: 0, left: 0, above: false });
  const rootRef = useRef<HTMLSpanElement>(null);
  const tipId = useId();

  useEffect(() => {
    if (!open) return;

    function placeTip() {
      const node = rootRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const width = 280;
      const left = Math.min(
        Math.max(12, rect.left),
        window.innerWidth - width - 12,
      );
      const above = rect.bottom + 160 > window.innerHeight && rect.top > 180;
      setPlace({
        top: above ? rect.top - 8 : rect.bottom + 8,
        left,
        above,
      });
      setReady(true);
    }

    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    placeTip();
    window.addEventListener("resize", placeTip);
    window.addEventListener("scroll", placeTip, true);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", placeTip);
      window.removeEventListener("scroll", placeTip, true);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <span ref={rootRef} className="relative inline-flex">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={tipId}
        onClick={() => {
          setReady(false);
          setOpen((value) => !value);
        }}
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-left text-xs transition ${
          open || active
            ? "border-accent bg-accent text-canvas"
            : "border-dashed border-accent/45 text-ink hover:border-accent hover:bg-accent-soft"
        }`}
      >
        <span>{label}</span>
        <span
          aria-hidden
          className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
            open || active ? "bg-canvas/20" : "bg-accent-soft text-accent"
          }`}
        >
          ?
        </span>
      </button>
      {open && ready ? (
        <span
          id={tipId}
          role="tooltip"
          style={{
            top: place.above ? undefined : place.top,
            bottom: place.above ? window.innerHeight - place.top : undefined,
            left: place.left,
          }}
          className="fixed z-50 w-[280px] rounded-2xl border border-line bg-canvas-elevated px-4 py-3 text-left shadow-[0_16px_40px_rgba(28,36,28,0.12)]"
        >
          <span className="block text-[10px] font-medium tracking-[0.16em] text-accent uppercase">
            {title ?? "In plain words"}
          </span>
          <span className="mt-1.5 block text-sm leading-relaxed text-muted">
            {children}
          </span>
        </span>
      ) : null}
    </span>
  );
}
