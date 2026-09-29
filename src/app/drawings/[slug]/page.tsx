import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { drawings, getDrawing } from "@/content/drawings";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return drawings.map((drawing) => ({ slug: drawing.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const drawing = getDrawing(slug);
  if (!drawing) return { title: "Visual design · Saumya Nigam" };
  return {
    title: `${drawing.title} · Saumya Nigam`,
    description: drawing.summary,
  };
}

export default async function DrawingPage({ params }: PageProps) {
  const { slug } = await params;
  const drawing = getDrawing(slug);
  if (!drawing) notFound();

  const index = drawings.findIndex((item) => item.slug === drawing.slug);
  const next = drawings[(index + 1) % drawings.length];

  return (
    <main className="pt-24">
      <article className="mx-auto max-w-5xl px-6 pb-24 sm:px-10">
        <Link
          href="/#drawings"
          className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
        >
          ← Visual design
        </Link>

        <header className="mt-8">
          <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
            {drawing.company}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.04] font-semibold tracking-[-0.045em]">
            {drawing.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{drawing.summary}</p>
        </header>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[1.8rem] border border-line bg-canvas-tint">
          <Image
            src={drawing.cover}
            alt={drawing.alt}
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 960px"
            className="object-cover"
          />
        </div>

        <div className="mt-16 space-y-16">
          {drawing.sections.map((section, sectionIndex) => (
            <section key={section.title}>
              <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
                {String(sectionIndex + 1).padStart(2, "0")} · {section.eyebrow}
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">
                {section.title}
              </h2>
              {section.paragraphs.length > 0 ? (
                <div className="mt-5 max-w-3xl space-y-4 text-[1.02rem] leading-relaxed text-muted">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ) : null}
              {section.images ? (
                <ul
                  className={`mt-6 grid gap-4 ${
                    section.images.length > 1 ? "sm:grid-cols-2" : "max-w-3xl"
                  }`}
                >
                  {section.images.map((image) => (
                    <li
                      key={image.src}
                      className="overflow-hidden rounded-2xl border border-line bg-canvas-elevated"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={1200}
                        height={900}
                        unoptimized
                        className="h-auto w-full"
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <Link
          href={`/drawings/${next.slug}`}
          className="mt-16 flex items-center justify-between gap-6 rounded-2xl border border-line bg-canvas-elevated px-6 py-5 transition hover:border-[rgba(47,107,62,0.35)]"
        >
          <span>
            <span className="block text-[11px] tracking-[0.16em] text-faint uppercase">Next</span>
            <span className="mt-2 block font-display text-xl font-semibold tracking-[-0.03em] text-ink">
              {next.title}
            </span>
          </span>
          <span aria-hidden className="text-accent">
            →
          </span>
        </Link>
      </article>
      <Footer />
    </main>
  );
}
