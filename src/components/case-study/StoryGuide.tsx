"use client";

import { useEffect, useRef, useState } from "react";
import { klearassistContent } from "@/content/klearassist";

const stops = klearassistContent.guide;

export function StoryGuide() {
  const [active, setActive] = useState(stops[0].id);
  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  const current = stops.find((stop) => stop.id === active) ?? stops[0];

  useEffect(() => {
    function update() {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-guide]"));
      const line = (triggerRef.current?.getBoundingClientRect().bottom ?? 140) + 48;
      let currentNode = nodes[0];
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= line) currentNode = node;
      }
      const id = currentNode?.dataset.guide;
      if (id && stops.some((stop) => stop.id === id)) setActive(id);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!expanded) return;
    function onPointer(event: PointerEvent) {
      const root = rootRef.current;
      if (root && !root.contains(event.target as Node)) setExpanded(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setExpanded(false);
    }
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  function openMenu() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setExpanded(true);
  }

  function scheduleClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setExpanded(false), 180);
  }

  function go(id: string) {
    setActive(id);
    setExpanded(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelector<HTMLElement>(`[data-guide="${id}"]`)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <div ref={rootRef} className="sticky top-20 z-30 mt-12 mb-8" data-reading-guide>
      <div className="relative inline-flex" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={expanded}
          aria-controls="story-guide-list"
          aria-haspopup="true"
          onFocus={(event) => {
            if (event.currentTarget.matches(":focus-visible")) openMenu();
          }}
          className={`inline-flex max-w-[min(100%,20rem)] items-center gap-2 rounded-full bg-canvas-elevated/75 px-4 py-2 text-sm font-medium tracking-[-0.01em] text-ink shadow-[0_10px_28px_rgba(28,36,28,0.08)] backdrop-blur-md transition duration-300 ease-out hover:bg-accent-soft/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none ${
            expanded ? "bg-accent-soft/90" : ""
          }`}
        >
          <span className="truncate">{current.title}</span>
          <Chevron open={expanded} />
        </button>
        <div
          className={`absolute top-full left-0 z-40 pt-2 ${
            expanded ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <ul
            id="story-guide-list"
            aria-label="Sections"
            inert={expanded ? undefined : true}
            aria-hidden={expanded ? undefined : true}
            className={`flex w-max max-w-[min(20rem,calc(100vw-3rem))] flex-col gap-1.5 transition duration-300 ease-out motion-reduce:transition-none ${
              expanded
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-1 opacity-0"
            }`}
          >
            {stops.map((stop) => {
              const on = stop.id === current.id;
              return (
                <li key={stop.id}>
                  <button
                    type="button"
                    onClick={() => go(stop.id)}
                    aria-current={on ? "true" : undefined}
                    className={`w-full rounded-full px-3.5 py-1.5 text-left text-sm shadow-[0_8px_20px_rgba(28,36,28,0.06)] backdrop-blur-md transition duration-300 ease-out hover:bg-accent-soft hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none ${
                      on ? "bg-accent-soft text-ink" : "bg-canvas-elevated/90 text-muted"
                    }`}
                  >
                    {stop.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className={`shrink-0 transition duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
    >
      <path d="M3.5 5.25 7 8.75l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
