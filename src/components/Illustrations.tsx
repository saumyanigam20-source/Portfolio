import Image from "next/image";
import Link from "next/link";
import { drawings } from "@/content/drawings";

export function Illustrations() {
  return (
    <section id="drawings" className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
      <div className="mb-10">
        <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">Visual design</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          Illustrations
        </h2>
      </div>

      <ul className="grid gap-5 md:grid-cols-2">
        {drawings.map((piece) => (
          <li key={piece.slug}>
            <Link
              href={`/drawings/${piece.slug}`}
              className="group block overflow-hidden rounded-2xl border border-line bg-canvas-elevated transition duration-500 hover:-translate-y-1 hover:border-[rgba(47,107,62,0.35)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-canvas-tint">
                <Image
                  src={piece.cover}
                  alt={piece.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  unoptimized
                />
              </div>
              <div className="space-y-2 p-5">
                <h3 className="font-display text-lg font-semibold tracking-[-0.03em] text-ink">
                  {piece.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{piece.summary}</p>
                <p className="text-xs tracking-[0.14em] text-faint uppercase">{piece.company}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
