import Image from "next/image";
import Link from "next/link";
import { drawings } from "@/content/drawings";

export function Craft() {
  return (
    <section id="craft" className="weave border-t border-transparent">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <hr className="stitch mb-16" />
        <p className="text-[11px] tracking-[0.22em] text-faint lowercase">visual systems</p>
        <h2 className="mt-4 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.05] font-medium tracking-[-0.03em]">
          Craft, <em className="font-normal text-accent">beside</em> the product work.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          Icons, illustration, and brand graphics. Shown as images, not as case studies.
        </p>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2">
          {drawings.map((piece) => (
            <li key={piece.slug}>
              <Link href={`/drawings/${piece.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-canvas-tint">
                  <Image
                    src={piece.cover}
                    alt={piece.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    unoptimized
                  />
                </div>
                <p className="mt-4 font-display text-xl font-medium tracking-[-0.02em] text-ink">
                  {piece.title}
                </p>
                <p className="mt-1 text-sm text-muted">{piece.company}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
