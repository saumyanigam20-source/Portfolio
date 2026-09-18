import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/case-studies";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const study = await getCaseStudy(slug);
    return {
      title: `${study.title} · Saumya Nigam`,
      description: study.summary,
    };
  } catch {
    return { title: "Case study · Saumya Nigam" };
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  let study;

  try {
    study = await getCaseStudy(slug);
  } catch {
    notFound();
  }

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
            {study.company}
            {study.role ? ` · ${study.role}` : ""}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-semibold tracking-[-0.04em]">
            {study.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {study.summary}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line px-3 py-1 text-xs tracking-wide text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </header>

        <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl border border-line">
          <Image
            src={study.cover}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div
          className="prose-case mt-12"
          dangerouslySetInnerHTML={{ __html: study.contentHtml }}
        />
      </article>
      <Footer />
    </main>
  );
}
