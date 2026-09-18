import Link from "next/link";
import { profile } from "@/lib/profile";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-16 pt-28 sm:px-10 sm:pb-20 lg:px-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,var(--hero-glow),transparent_55%),radial-gradient(ellipse_at_15%_85%,rgba(168,196,160,0.08),transparent_45%),linear-gradient(180deg,#141916_0%,var(--canvas)_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(236,234,228,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(236,234,228,0.35)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <p className="animate-rise font-display text-[clamp(2rem,6vw,3.5rem)] font-semibold tracking-[-0.04em] text-accent">
          Saumya
        </p>
        <h1 className="animate-rise delay-1 mt-3 max-w-4xl font-display text-[clamp(2.2rem,6.5vw,4.4rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-balance">
          {profile.headline}
        </h1>
        <p className="animate-rise delay-2 mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          {profile.supporting}
        </p>
        <div className="animate-rise delay-3 mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/#work"
            className="inline-flex items-center rounded-full bg-[#eceae4] px-6 py-3 text-sm font-medium tracking-wide text-[#0e100f] transition hover:bg-accent"
          >
            View selected work
          </Link>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm font-medium tracking-wide text-muted transition hover:border-accent hover:text-ink"
          >
            Say hello
          </a>
        </div>
      </div>

      <div className="relative mx-auto mt-16 flex w-full max-w-6xl justify-center sm:mt-20">
        <span className="animate-fade delay-3 flex items-center gap-2 text-xs tracking-[0.2em] text-faint uppercase">
          Scroll
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M6 1v8M2.5 6.5 6 10l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </section>
  );
}
