"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { WorkPreview } from "@/content/work";

type Props = WorkPreview & {
  index: string;
  company: string;
  cover: string;
};

export function CaseStudyCard({
  index,
  title,
  slug,
  discipline,
  company,
  role,
  outcome,
  stat,
  statLabel,
  cover,
}: Props) {
  const [hover, setHover] = useState(false);
  const [pinned, setPinned] = useState(false);
  const open = hover || pinned;

  return (
    <article
      className="border-b border-line"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHover(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setHover(false);
      }}
      onFocus={() => setHover(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHover(false);
      }}
    >
      <div className="grid items-center gap-6 py-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12">
        <div>
          <p className="font-body text-[11px] tracking-[0.22em] text-faint uppercase">
            {index} · {discipline}
          </p>
          <h3 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.03em] text-ink">
            <Link href={`/work/${slug}`} className="transition-colors hover:text-accent">
              {title}
            </Link>
          </h3>
          <p className="mt-2 text-sm text-muted">{company}</p>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setPinned((value) => !value)}
              className="text-xs tracking-[0.16em] text-madder uppercase transition hover:text-ink"
            >
              {open ? "Hide preview" : "Preview"}
            </button>
            <Link
              href={`/work/${slug}`}
              className="text-xs tracking-[0.16em] text-accent uppercase"
            >
              Read the case study
            </Link>
          </div>

          <div className={`preview-panel ${open ? "is-open" : ""}`} aria-hidden={!open}>
            <div className="pt-6">
              <p className="text-[11px] tracking-[0.18em] text-faint uppercase">{role}</p>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-ink">{outcome}</p>
              <p className="mt-5 font-display text-2xl font-medium tracking-[-0.03em] text-accent">
                {stat}
              </p>
              <p className="mt-1 text-xs tracking-[0.14em] text-faint uppercase">{statLabel}</p>
            </div>
          </div>
        </div>

        <Link
          href={`/work/${slug}`}
          className="relative block aspect-[4/3] overflow-hidden bg-canvas-tint lg:aspect-[5/4]"
          tabIndex={-1}
          aria-hidden
        >
          <Image
            src={cover}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 220px"
            className="object-cover"
            unoptimized={cover.endsWith(".svg")}
          />
        </Link>
      </div>
    </article>
  );
}
