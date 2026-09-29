import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExperimentCover } from "@/components/experiments/ExperimentCover";
import { Footer } from "@/components/Footer";
import { experiments, getExperiment } from "@/content/experiments";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return experiments.map((experiment) => ({ slug: experiment.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const experiment = getExperiment(slug);
  if (!experiment) return { title: "Experiment · Saumya Nigam" };
  return {
    title: `${experiment.title} · Saumya Nigam`,
    description: experiment.summary,
  };
}

export default async function ExperimentPage({ params }: PageProps) {
  const { slug } = await params;
  const experiment = getExperiment(slug);
  if (!experiment) notFound();

  const index = experiments.findIndex((item) => item.slug === experiment.slug);
  const next = experiments[(index + 1) % experiments.length];

  return (
    <main className="pt-28">
      <article className="mx-auto max-w-3xl px-6 pb-20 sm:px-10">
        <Link
          href="/#experiments"
          className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
        >
          ← Experiments
        </Link>

        <header className="mt-8">
          <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
            {experiment.kicker}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.04em]">
            {experiment.title}
          </h1>
        </header>

        <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-line">
          <ExperimentCover kind={experiment.cover} />
        </div>

        <dl className="mt-8 grid gap-6 border-y border-line py-6 sm:grid-cols-3">
          <div>
            <dt className="text-[11px] tracking-[0.16em] text-faint uppercase">Status</dt>
            <dd className="mt-2 text-sm text-ink">{experiment.status}</dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.16em] text-faint uppercase">Role</dt>
            <dd className="mt-2 text-sm text-ink">{experiment.role}</dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.16em] text-faint uppercase">Tools</dt>
            <dd className="mt-2 text-sm text-ink">{experiment.tools.join(" · ")}</dd>
          </div>
        </dl>

        <div className="mt-4">
          {experiment.sections.map((section) => (
            <section key={section.title} className="border-b border-line py-10 last:border-b-0">
              <p className="text-[11px] tracking-[0.16em] text-faint uppercase">{section.eyebrow}</p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] text-ink">
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-[1.02rem] leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
              {section.points ? (
                <ul className="mt-5 space-y-2">
                  {section.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {next && next.slug !== experiment.slug ? (
          <Link
            href={`/experiments/${next.slug}`}
            className="mt-4 inline-flex text-sm text-muted transition hover:text-accent"
          >
            Next → {next.title}
          </Link>
        ) : null}
      </article>
      <Footer />
    </main>
  );
}
