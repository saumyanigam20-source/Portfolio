"use client";

import Link from "next/link";
import { asideChapters, asideProjects, asideSteps } from "@/content/aside";

function Draw({
  d,
  delay = 0,
  width = 1.6,
  accent = false,
}: {
  d: string;
  delay?: number;
  width?: number;
  accent?: boolean;
}) {
  return (
    <path
      d={d}
      pathLength={1}
      className={`aside-stroke ${accent ? "text-accent" : "text-ink"}`}
      stroke="currentColor"
      strokeWidth={width}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

export function MeSketch({ active }: { active: number }) {
  return (
    <svg viewBox="0 0 280 88" className="block w-full" style={{ aspectRatio: "280 / 88" }} fill="none" aria-hidden>
      <circle
        cx="64"
        cy="30"
        r="16"
        pathLength={1}
        className="aside-stroke text-ink"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
      />
      <Draw d="M52 26c4-7 20-7 24 0" delay={180} accent width={1.6} />
      <Draw d="M42 74c6-16 14-22 22-22s16 6 22 22" delay={260} width={1.8} />
      <Draw d="M124 52h132" delay={340} accent width={1.4} />
      {[0, 1, 2].map((index) => (
        <circle
          key={index}
          cx={140 + index * 52}
          cy={52}
          r={active === index ? 6 : 3.5}
          className="aside-node"
          fill={active === index ? "var(--accent)" : "currentColor"}
        />
      ))}
    </svg>
  );
}

export function ChapterRail({
  active,
  onPick,
}: {
  active: number;
  onPick: (index: number) => void;
}) {
  const chapter = asideChapters[active];

  return (
    <div className="space-y-2">
      <div className="flex gap-1.5">
        {asideChapters.map((item, index) => (
          <button
            key={item.era}
            type="button"
            onClick={() => onPick(index)}
            className={`rounded-full px-2.5 py-1 text-[11px] transition ${
              active === index
                ? "bg-accent text-[#0e100f]"
                : "bg-white/5 text-muted hover:text-ink"
            }`}
          >
            {item.era}
          </button>
        ))}
      </div>
      <p key={chapter.era} className="aside-rise text-[12px] leading-relaxed text-muted">
        <span className="text-ink">{chapter.title}. </span>
        {chapter.body}
      </p>
    </div>
  );
}

export function WorkSketch({ id }: { id: (typeof asideProjects)[number]["id"] }) {
  if (id === "assist") {
    return (
      <svg viewBox="0 0 64 48" className="h-10 w-14" fill="none" aria-hidden>
        <Draw d="M8 10h34a8 8 0 0 1 8 8v12a8 8 0 0 1-8 8H24L12 44V38H8a6 6 0 0 1-6-6V16a6 6 0 0 1 6-6Z" width={1.7} />
        <circle cx="22" cy="24" r="1.6" fill="currentColor" className="aside-pop text-accent" style={{ animationDelay: "280ms" }} />
        <circle cx="30" cy="24" r="1.6" fill="currentColor" className="aside-pop text-accent" style={{ animationDelay: "400ms" }} />
        <circle cx="38" cy="24" r="1.6" fill="currentColor" className="aside-pop text-accent" style={{ animationDelay: "520ms" }} />
      </svg>
    );
  }
  if (id === "redesign") {
    return (
      <svg viewBox="0 0 64 48" className="h-10 w-14" fill="none" aria-hidden>
        <Draw d="M10 8h44v32H10Z" width={1.7} />
        <Draw d="M10 16h44" delay={160} width={1.4} />
        <Draw d="M18 26h16" delay={260} accent width={1.6} />
        <Draw d="M18 32h10" delay={340} width={1.4} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 48" className="h-10 w-14" fill="none" aria-hidden>
      <Draw d="M22 6h20a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4Z" width={1.7} />
      <Draw d="M26 14h12" delay={180} accent width={1.5} />
      <Draw d="M26 20h12" delay={260} width={1.4} />
      <Draw d="M26 26h8" delay={340} width={1.4} />
    </svg>
  );
}

export function ProjectCards({ highlight }: { highlight: string | null }) {
  return (
    <ul className="space-y-2">
      {asideProjects.map((project, index) => {
        const hot = highlight === project.id;
        return (
          <li key={project.id} className="aside-rise" style={{ animationDelay: `${index * 70}ms` }}>
            <Link
              href={project.href}
              className={`flex items-center gap-3 rounded-xl border px-2.5 py-2 transition hover:-translate-y-0.5 ${
                hot
                  ? "border-accent bg-accent-soft"
                  : "border-line bg-white/[0.03] hover:border-accent/50"
              }`}
            >
              <WorkSketch id={project.id} />
              <span className="min-w-0">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="font-display text-[13px] font-semibold tracking-[-0.02em]">
                    {project.title}
                  </span>
                  <span className="text-[10px] tracking-[0.14em] text-faint uppercase">
                    {project.meta}
                  </span>
                </span>
                <span className="mt-0.5 block text-[11px] leading-snug text-muted">
                  {project.body}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function ThinkSketch({ active }: { active: number }) {
  const x = 28 + active * 56;

  return (
    <div className="relative">
    <svg viewBox="0 0 280 56" className="block w-full" style={{ aspectRatio: "280 / 56" }} fill="none" aria-hidden>
      <Draw d="M28 28h224" accent width={1.4} />
      {asideSteps.map((_, index) => (
        <circle
          key={index}
          cx={28 + index * 56}
          cy={28}
          r={index === active ? 6 : 3.5}
          className="aside-node text-ink"
          fill={index === active ? "var(--accent)" : "currentColor"}
          style={{ animationDelay: `${240 + index * 80}ms` }}
        />
      ))}
    </svg>
    <span
      aria-hidden
      className="aside-travel"
      style={{ left: `${(x / 280) * 100}%` }}
    />
    </div>
  );
}

export function StepRail({
  active,
  onPick,
}: {
  active: number;
  onPick: (index: number) => void;
}) {
  const step = asideSteps[active];

  return (
    <div className="space-y-2">
      <ThinkSketch active={active} />
      <div className="flex flex-wrap gap-1">
        {asideSteps.map((item, index) => (
          <button
            key={item.step}
            type="button"
            onClick={() => onPick(index)}
            className={`rounded-full px-2 py-1 text-[10px] tracking-wide transition ${
              active === index ? "bg-accent text-[#0e100f]" : "bg-white/5 text-muted hover:text-ink"
            }`}
          >
            {item.step}
          </button>
        ))}
      </div>
      <p key={step.step} className="aside-rise text-[12px] leading-relaxed text-muted">
        <span className="text-ink">{step.title}. </span>
        {step.body}
      </p>
    </div>
  );
}

export function AsideDoodle({ id }: { id: string }) {
  if (id === "paragraph") {
    return (
      <svg viewBox="0 0 120 72" className="h-16 w-full" fill="none" aria-hidden>
        <Draw d="M18 16h62a10 10 0 0 1 10 10v18a10 10 0 0 1-10 10H40L24 64V54H18a8 8 0 0 1-8-8V24a8 8 0 0 1 8-8Z" width={1.7} />
        <Draw d="M78 28l16 16M94 28 78 44" delay={420} accent width={1.8} />
      </svg>
    );
  }
  if (id === "kindness") {
    return (
      <svg viewBox="0 0 120 72" className="h-16 w-full" fill="none" aria-hidden>
        <Draw d="M22 18h22v22H22Z" width={1.6} />
        <Draw d="M49 18h22v22H49Z" delay={140} width={1.6} />
        <Draw d="M76 18h22v22H76Z" delay={280} accent width={1.6} />
      </svg>
    );
  }
  if (id === "desk") {
    return (
      <svg viewBox="0 0 120 72" className="h-16 w-full" fill="none" aria-hidden>
        <Draw d="M60 14c8 10 8 16 0 26-8-10-8-16 0-26Z" accent width={1.7} />
        <Draw d="M60 40v14" delay={200} width={1.6} />
        <Draw d="M36 62h48" delay={300} width={1.5} />
      </svg>
    );
  }
  if (id === "exception") {
    return (
      <svg viewBox="0 0 120 72" className="h-16 w-full" fill="none" aria-hidden>
        <Draw d="M18 50c20-4 28-28 46-30 16-2 28 10 36 8" width={1.7} />
        <Draw d="M88 18l14 12-16 2" delay={360} accent width={1.7} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 72" className="h-16 w-full" fill="none" aria-hidden>
      <Draw d="M28 16h64v40H28Z" width={1.6} />
      <Draw d="M28 28h64M28 40h64M28 52h64" delay={120} width={1.2} />
      <Draw d="M44 16v40M60 16v40M76 16v40M92 16v40" delay={220} accent width={1.2} />
    </svg>
  );
}
