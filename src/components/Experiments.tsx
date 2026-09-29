import Link from "next/link";
import { ExperimentCover } from "@/components/experiments/ExperimentCover";
import { experiments } from "@/content/experiments";

export function Experiments() {
  return (
    <section id="experiments" className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
          Experiments
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          Gen AI experiments
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
          Specifications, prototypes, and this site — directed with AI, then checked by hand.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-line bg-canvas-tint">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-80 [background-image:linear-gradient(rgba(47,107,62,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(47,107,62,0.08)_1px,transparent_1px)] [background-size:28px_28px]"
        />
        <ul
          aria-label="Gen AI experiments"
          className="relative flex gap-4 overflow-x-auto px-4 py-6 sm:gap-5 sm:px-6 sm:py-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {experiments.map((experiment) => (
            <li key={experiment.slug} className="w-[min(400px,82vw)] shrink-0">
              <Link
                href={`/experiments/${experiment.slug}`}
                className="group flex h-full flex-col rounded-[20px] border border-line bg-canvas-elevated p-4 shadow-[0_16px_40px_rgba(28,36,28,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(47,107,62,0.35)] sm:p-5"
              >
                <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-line">
                  <ExperimentCover kind={experiment.cover} />
                  <span className="absolute top-3 right-3 rounded-full bg-ink px-2.5 py-1 text-[10px] font-medium tracking-wide text-canvas uppercase">
                    Case study
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl leading-tight font-semibold tracking-[-0.03em] text-ink">
                  {experiment.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{experiment.summary}</p>
                <span className="mt-4 text-sm text-accent">Read more →</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
