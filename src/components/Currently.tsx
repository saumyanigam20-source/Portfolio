import Link from "next/link";
import { profile } from "@/lib/profile";

export function Currently() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
        Currently
      </p>
      <p className="mt-6 font-display text-[clamp(1.45rem,3.2vw,2.15rem)] leading-[1.35] font-medium tracking-[-0.02em] text-pretty">
        {profile.currently.split("KlearNow").map((part, i, arr) =>
          i < arr.length - 1 ? (
            <span key={i}>
              {part}
              <span className="rounded-md bg-accent-soft px-1.5 py-0.5 text-accent">
                KlearNow
              </span>
            </span>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </p>
      <p className="mt-8 text-sm tracking-wide text-muted">
        {profile.role} · {profile.location}
      </p>
      <Link
        href="/about"
        className="mt-8 inline-flex items-center gap-2 text-sm text-ink transition hover:text-accent"
      >
        The story, process, and how I design
        <span aria-hidden>→</span>
      </Link>
    </section>
  );
}
