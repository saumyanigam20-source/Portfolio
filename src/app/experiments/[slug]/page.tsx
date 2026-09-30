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
  if (!experiment) return { title: "Case study · Saumya Nigam" };
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
    <main className="pt-24">
      <article className="mx-auto max-w-5xl px-6 pb-24 sm:px-10">
        <Link
          href="/#experiments"
          className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
        >
          ← Experiments
        </Link>

        <header className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
          <div>
            <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
              Gen AI experiment · {experiment.kicker}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.04] font-semibold tracking-[-0.045em]">
              {experiment.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{experiment.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {experiment.tools.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border border-line px-3 py-1 text-xs tracking-wide text-muted"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
          <dl className="grid grid-cols-1 gap-5 border-t border-line pt-5 sm:grid-cols-3 lg:grid-cols-1 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            <div>
              <dt className="text-[10px] tracking-[0.16em] text-faint uppercase">Status</dt>
              <dd className="mt-1 text-sm leading-snug text-ink">{experiment.status}</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.16em] text-faint uppercase">Role</dt>
              <dd className="mt-1 text-sm leading-snug text-ink">{experiment.role}</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.16em] text-faint uppercase">Tools</dt>
              <dd className="mt-1 text-sm leading-snug text-ink">{experiment.tools.join(" · ")}</dd>
            </div>
          </dl>
        </header>

        <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-[1.8rem] border border-line">
          <ExperimentCover kind={experiment.cover} />
        </div>

        <div className="mt-16 max-w-3xl space-y-16">
          {experiment.sections.map((section, sectionIndex) => (
            <section key={section.title}>
              <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
                {String(sectionIndex + 1).padStart(2, "0")} · {section.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">
                {section.title}
              </h2>
              <div className="mt-5 space-y-4 text-[1.02rem] leading-relaxed text-muted">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.points ? (
                <ul className="mt-6 space-y-3">
                  {section.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 rounded-2xl border border-line bg-canvas-elevated px-4 py-3 text-sm leading-relaxed text-ink"
                    >
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {experiment.slug === "delivery-orders" ? <DeliveryPrototype /> : <PortfolioEvidence />}

        {next && next.slug !== experiment.slug ? (
          <Link
            href={`/experiments/${next.slug}`}
            className="mt-16 flex items-center justify-between gap-6 rounded-2xl border border-line bg-canvas-elevated px-6 py-5 transition hover:border-[rgba(47,107,62,0.35)]"
          >
            <span>
              <span className="block text-[11px] tracking-[0.16em] text-faint uppercase">Next case study</span>
              <span className="mt-2 block font-display text-xl font-semibold tracking-[-0.03em] text-ink">
                {next.title}
              </span>
            </span>
            <span aria-hidden className="text-accent">
              →
            </span>
          </Link>
        ) : null}
      </article>
      <Footer />
    </main>
  );
}

function PortfolioEvidence() {
  const links = [
    { href: "/#home", label: "Home", note: "The system, as it shipped." },
    { href: "/#work", label: "Selected work", note: "Case studies kept as content, not a prompt." },
    { href: "/about", label: "About", note: "The writing that had to stay in my voice." },
  ];

  return (
    <section className="mt-20">
      <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">The artifact</p>
      <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        This website is the case study
      </h2>
      <p className="mt-4 max-w-3xl text-[1.02rem] leading-relaxed text-muted">
        The pages below are what the direction produced. Open them the way a reviewer would: type,
        density, and whether the work is still the point.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-3">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block h-full rounded-2xl border border-line bg-canvas-elevated p-5 transition hover:border-[rgba(47,107,62,0.35)]"
            >
              <span className="font-display text-lg font-semibold tracking-[-0.03em] text-ink">
                {item.label}
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-muted">{item.note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function DeliveryPrototype() {
  return (
    <section className="mt-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">The artifact</p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            Click through the order
          </h2>
        </div>
        <a
          href="/prototypes/delivery-orders/index.html"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted transition hover:text-accent"
        >
          Open the prototype →
        </a>
      </div>
      <p className="mt-4 max-w-3xl text-[1.02rem] leading-relaxed text-muted">
        A desktop queue for a coordinator. Customs, freight, and the terminal have to be open before
        an order can be issued. The carrier page keeps one current version.
      </p>
      <div className="mt-6 overflow-hidden rounded-[1.8rem] border border-line bg-canvas-elevated">
        <iframe
          title="Delivery order prototype"
          src="/prototypes/delivery-orders/index.html"
          className="h-[min(78vh,760px)] w-full bg-white"
        />
      </div>
    </section>
  );
}
