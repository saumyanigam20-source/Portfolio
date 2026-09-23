import Link from "next/link";
import { HeroBloom } from "@/components/HeroBloom";
import { aboutContent } from "@/content/about";
import {
  ApproachIllustration,
  BrandIllustration,
  CraftIllustration,
  OpsIllustration,
  ProcessMark,
} from "@/components/about/AboutIllustrations";

const chapterArt = [CraftIllustration, BrandIllustration, OpsIllustration];

export function AboutStory() {
  const { chapters, process, approach, education, tools, skills } = aboutContent;

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 sm:px-10 lg:px-16">
      <header className="grid items-center gap-8 pt-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div>
          <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
            {aboutContent.kicker}
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.1rem,5.4vw,3.8rem)] leading-[1.05] font-semibold tracking-[-0.045em] text-balance">
            {aboutContent.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{aboutContent.lede}</p>
          <p className="mt-6 text-sm tracking-wide text-faint">
            {aboutContent.role} · {aboutContent.location}
          </p>
        </div>
        <div className="mx-auto flex w-full max-w-md justify-center lg:max-w-none lg:justify-end">
          <HeroBloom className="about-portrait" />
        </div>
      </header>

      <section className="mt-16 space-y-6" aria-label="Journey">
        <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">The path</p>
        <ul className="space-y-5">
          {chapters.map((chapter, i) => {
            const Art = chapterArt[i];
            const reverse = i % 2 === 1;
            return (
              <li
                key={chapter.era}
                className={`overflow-hidden rounded-[1.6rem] border border-line bg-canvas-elevated md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] ${
                  reverse ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="flex aspect-[16/11] items-center justify-center p-4 md:aspect-auto md:min-h-[300px] md:p-6">
                  <Art />
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <p className="text-[11px] tracking-[0.18em] text-accent uppercase">
                    {chapter.era} · {chapter.period}
                  </p>
                  <h2 className="mt-3 font-display text-[1.65rem] leading-[1.15] font-semibold tracking-[-0.035em] sm:text-[1.85rem]">
                    {chapter.title}
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">{chapter.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-24" aria-label="Design process">
        <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">Design process</p>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.7rem,3.4vw,2.4rem)] leading-[1.15] font-semibold tracking-[-0.035em]">
          From the operation to a screen people can argue with
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {aboutContent.processIntro}
        </p>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {process.map((item, i) => (
            <li
              key={item.step}
              className="rounded-2xl border border-line bg-canvas-elevated p-5 sm:p-6"
            >
              <ProcessMark index={i} />
              <p className="mt-5 text-[11px] tracking-[0.18em] text-faint">{item.step}</p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.03em]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-24 overflow-hidden rounded-[1.8rem] border border-line bg-canvas-elevated lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="p-7 sm:p-10 lg:p-12">
          <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
            How I approach a design
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.7rem,3vw,2.3rem)] leading-[1.15] font-semibold tracking-[-0.035em]">
            {aboutContent.approachTitle}
          </h2>
          <ul className="mt-8 space-y-7">
            {approach.map((item) => (
              <li key={item.title}>
                <h3 className="font-display text-lg font-semibold tracking-[-0.03em] text-accent">
                  {item.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex min-h-[280px] items-center justify-center p-6 sm:p-8">
          <ApproachIllustration />
        </div>
      </section>

      <section className="mt-20 grid gap-10 border-t border-line pt-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
            Background
          </p>
          <dl className="mt-6 space-y-5">
            {education.map((item) => (
              <div key={item.label}>
                <dt className="text-[11px] tracking-[0.16em] text-faint uppercase">{item.label}</dt>
                <dd className="mt-1 text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
            How I work
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-line px-3 py-1.5 text-xs tracking-wide text-muted"
              >
                {skill}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[11px] tracking-[0.16em] text-faint uppercase">Tools</p>
          <p className="mt-3 text-sm text-muted">{tools.join(" · ")}</p>
        </div>
      </section>

      <p className="mt-16 text-sm text-muted">
        See how this shows up in product —{" "}
        <Link href="/#work" className="text-ink underline decoration-line underline-offset-4 transition hover:text-accent">
          selected work
        </Link>
        .
      </p>
    </div>
  );
}
