import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ConversationThread } from "@/components/case-study/ConversationThread";
import { PhonePrototype } from "@/components/case-study/PhonePrototype";
import { ProblemReveals } from "@/components/case-study/ProblemReveals";
import { trackAndTraceContent } from "@/content/track-and-trace";

export const metadata: Metadata = {
  title: `${trackAndTraceContent.meta.title} · Saumya Nigam`,
  description: trackAndTraceContent.meta.summary,
};

export default function TrackAndTracePage() {
  const { meta, problemDialogue, problemReveals, solutionDialogue, process, impact } =
    trackAndTraceContent;

  return (
    <main className="pt-24">
      <article className="mx-auto max-w-3xl px-6 pb-20 sm:px-10">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
        >
          ← Selected work
        </Link>

        <header className="mt-8">
          <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
            {meta.company} · {meta.role}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-semibold tracking-[-0.04em]">
            {meta.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {meta.summary}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line px-3 py-1 text-xs tracking-wide text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-y border-line py-4 text-xs tracking-[0.14em] text-faint uppercase">
            <span>Mobile</span>
            <span>KlearNow.AI</span>
            <span>UX · end to end</span>
          </div>
        </header>

        <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl border border-line">
          <Image
            src={meta.cover}
            alt=""
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="mt-14 space-y-16">
          <ConversationThread
            title="A conversation about the problem"
            messages={problemDialogue}
            continueLabel="Continue the conversation"
          />

          <ProblemReveals items={problemReveals} />

          <ConversationThread
            title="Turning that into a solution"
            messages={solutionDialogue}
            continueLabel="Continue"
          />

          <PhonePrototype />

          <section>
            <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
              Process
            </p>
            <ol className="mt-6 space-y-5">
              {process.map((step, index) => (
                <li key={step.title} className="border-t border-line pt-5">
                  <p className="text-xs tracking-[0.16em] text-accent uppercase">
                    0{index + 1}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
              Impact
            </p>
            <ul className="mt-6 space-y-3">
              {impact.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[0.95rem] leading-relaxed text-muted"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
      <Footer />
    </main>
  );
}
