import Image from "next/image";
import Link from "next/link";
import type { CaseStudyMeta } from "@/lib/case-studies";

export function SelectedWork({ projects }: { projects: CaseStudyMeta[] }) {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
            Selected work
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Enterprise product, end to end
          </h2>
        </div>
        <p className="hidden max-w-xs text-right text-sm leading-relaxed text-muted sm:block">
          Selected work from KlearNow — mobile Track &amp; Trace, AI, identity, and logistics tooling.
        </p>
      </div>

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/work/${project.slug}`}
              className="group block overflow-hidden rounded-2xl border border-line bg-canvas-elevated transition duration-500 hover:-translate-y-1 hover:border-[rgba(168,196,160,0.35)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.cover}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  unoptimized={project.cover.endsWith(".svg")}
                />
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg leading-snug font-semibold tracking-[-0.02em]">
                    {project.title}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-1 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  >
                    ↗
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted">{project.summary}</p>
                <p className="text-xs tracking-[0.14em] text-faint uppercase">
                  {project.company} · {project.tags.slice(0, 2).join(" · ")}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
