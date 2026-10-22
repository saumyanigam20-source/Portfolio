import Link from "next/link";
import { record } from "@/content/work";

export function AboutBand() {
  return (
    <section id="about" className="weave">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <hr className="stitch mb-16" />
        <p className="text-[11px] tracking-[0.22em] text-faint lowercase">about</p>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.05] font-medium tracking-[-0.03em]">
          The record, <em className="font-normal text-accent">plainly</em>.
        </h2>

        <ul className="mt-12 divide-y divide-line border-y border-line">
          {record.map((item) => (
            <li
              key={item.place}
              className="grid gap-1 py-5 sm:grid-cols-[8rem_1fr_auto] sm:items-baseline sm:gap-8"
            >
              <span className="text-[11px] tracking-[0.18em] text-faint uppercase">{item.when}</span>
              <span className="font-display text-2xl font-medium tracking-[-0.03em]">{item.title}</span>
              <span className="text-sm text-muted">{item.place}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted">
          Textile design at NIFT is the foundation: colour, repeat, and systems, used on product.
        </p>
        <Link
          href="/about"
          className="mt-6 inline-flex text-sm text-accent transition hover:text-ink"
        >
          More on the practice →
        </Link>
      </div>
    </section>
  );
}
