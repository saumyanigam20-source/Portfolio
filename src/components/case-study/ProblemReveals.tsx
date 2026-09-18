"use client";

import { useState } from "react";
import type { ProblemReveal } from "@/content/track-and-trace";

export function ProblemReveals({ items }: { items: ProblemReveal[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="space-y-4">
      <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
        Know more
      </p>
      <p className="text-sm text-muted">
        Tap a thread to open it. One at a time — keep the conversation light.
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isOpen = openId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                isOpen
                  ? "bg-accent text-canvas"
                  : "border border-line text-muted hover:border-accent hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) =>
        openId === item.id ? (
          <div
            key={`${item.id}-panel`}
            className="animate-rise rounded-2xl border border-line bg-canvas-elevated px-5 py-4"
          >
            <p className="text-sm font-medium text-accent">{item.label}</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
              {item.detail}
            </p>
          </div>
        ) : null,
      )}
    </section>
  );
}
