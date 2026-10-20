import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PhonePrototype } from "@/components/case-study/PhonePrototype";
import { TrackStory } from "@/components/case-study/TrackStory";
import { trackAndTraceContent } from "@/content/track-and-trace";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export const metadata: Metadata = {
  title: `${trackAndTraceContent.meta.title} · Saumya Nigam`,
  description: trackAndTraceContent.meta.summary,
};

export default function TrackAndTracePage() {
  const { meta, snapshot } = trackAndTraceContent;

  return (
    <main className="pt-24">
      <article className="mx-auto max-w-3xl min-w-0 px-6 pb-20 sm:px-10">
        <Link
          href="/#work"
          className={`inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent ${focusRing}`}
        >
          ← Selected work
        </Link>

        <header className="mt-8">
          <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
            {meta.company}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-semibold tracking-[-0.04em]">
            {meta.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{meta.summary}</p>
          <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 border-t border-line pt-5 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1.1fr)]">
            {snapshot.map((item) => (
              <div key={item.label}>
                <dt className="text-[10px] tracking-[0.16em] text-faint uppercase">{item.label}</dt>
                <dd className="mt-1 text-sm leading-snug text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="mt-14 space-y-16">
          <TrackStory />
          <PhonePrototype />
        </div>
      </article>
      <Footer />
    </main>
  );
}
