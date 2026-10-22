"use client";

import Image from "next/image";
import { useState } from "react";

export type FrameSpot = {
  x: number;
  y: number;
  title: string;
  body: string;
};

export function AnnotatedFrame({
  src,
  title,
  body,
  spots,
}: {
  src: string;
  title: string;
  body: string;
  spots: readonly FrameSpot[];
}) {
  const [index, setIndex] = useState(0);
  const spot = spots[index];

  function move(direction: -1 | 1) {
    setIndex((current) => {
      const next = current + direction;
      if (next < 0) return spots.length - 1;
      if (next >= spots.length) return 0;
      return next;
    });
  }

  return (
    <figure className="space-y-4">
      <div
        className="relative"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
        }}
      >
        <div className="overflow-hidden rounded-[1.4rem] border border-line bg-canvas-elevated">
          <Image
            src={src}
            alt={title}
            width={1440}
            height={1005}
            unoptimized
            className="h-auto w-full"
          />
        </div>
        {spots.map((item, spotIndex) => {
          const on = spotIndex === index;
          return (
            <button
              key={item.title}
              type="button"
              aria-label={`${item.title}. ${item.body}`}
              aria-pressed={on}
              onClick={() => setIndex(spotIndex)}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              className={`guide-pin absolute z-10 flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold text-canvas shadow-[0_6px_16px_rgba(28,36,28,0.18)] ${
                on ? "guide-pin-on bg-accent" : "bg-accent/90 hover:bg-accent"
              } ${index === 0 && spotIndex === 0 ? "guide-pin-hint" : ""}`}
            >
              {spotIndex + 1}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-accent/30 bg-accent-soft px-4 py-3.5 sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[10px] font-medium tracking-[0.16em] text-accent uppercase">
            Mark {index + 1} of {spots.length}
          </p>
          <div className="flex shrink-0 gap-1.5">
            <button
              type="button"
              onClick={() => move(-1)}
              className="rounded-full border border-line bg-canvas-elevated px-2.5 py-1 text-[11px] text-muted transition hover:text-ink"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              className="rounded-full bg-accent px-2.5 py-1 text-[11px] text-canvas"
            >
              Next mark
            </button>
          </div>
        </div>
        <p className="mt-1.5 font-display text-base font-semibold tracking-[-0.02em] text-ink">
          {spot.title}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{spot.body}</p>
      </div>

      <figcaption className="max-w-3xl">
        <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">
          {title}
        </h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{body}</p>
      </figcaption>
    </figure>
  );
}
