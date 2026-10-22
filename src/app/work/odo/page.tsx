import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { OdoApp } from "@/prototype/odo/OdoApp";
import "@/app/prototype/vehicle-recorder/prototype.css";
import {
  odoAudience,
  odoDecisions,
  odoFuelCaption,
  odoFuelSteps,
  odoGoal,
  odoHeard,
  odoInside,
  odoLead,
  odoLearned,
  odoMeta,
  odoProblem,
  odoPrototypeBullets,
  odoPrototypeHref,
  odoPrototypeIntro,
  odoScatter,
  odoSnapshot,
  odoTargets,
} from "@/content/odo";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export const metadata: Metadata = {
  title: `${odoMeta.title} · Saumya Nigam`,
  description: odoMeta.summary,
};

export default function OdoPage() {
  return (
    <main className="pt-24">
      <article className="mx-auto max-w-3xl min-w-0 px-6 pb-20 sm:px-10">
        <Link
          href="/#work"
          className={`inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent ${focusRing}`}
        >
          ← Selected work
        </Link>

        <header className="mt-8">
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-semibold tracking-[-0.04em]">
            {odoMeta.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{odoLead}</p>
          <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 border-t border-line pt-5 sm:grid-cols-2">
            {odoSnapshot.map((item) => (
              <div key={item.label}>
                <dt className="text-[10px] tracking-[0.16em] text-faint uppercase">{item.label}</dt>
                <dd className="mt-1 text-sm leading-snug text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="mt-14 space-y-16">
          <section>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              What it&apos;s designed to do
            </h2>
            <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{odoGoal.intro}</p>
            <ul className="mt-4 max-w-3xl space-y-3">
              {odoGoal.bullets.map((item) => (
                <li key={item.lead} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>
                    <span className="font-medium text-ink">{item.lead}</span> {item.detail}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{odoGoal.close}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              The problem, simply
            </h2>
            <div className="mt-4 max-w-3xl space-y-4 text-[0.98rem] leading-relaxed text-muted">
              <p>{odoProblem.open}</p>
              <p>{odoProblem.scatter}</p>
            </div>
            <RecordGap />
            <p className="mt-6 max-w-3xl text-[0.98rem] leading-relaxed text-muted italic">
              {odoProblem.aside}
            </p>
            <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{odoProblem.close}</p>
            <blockquote className="mt-8 max-w-3xl border-l border-accent/50 pl-4 font-display text-xl leading-snug font-semibold tracking-[-0.03em] text-ink sm:text-2xl">
              {odoProblem.quote}
            </blockquote>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">Who it&apos;s for</h2>
            <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{odoAudience}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">What I heard</h2>
            <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{odoHeard.intro}</p>
            <div className="mt-6 max-w-3xl space-y-4 text-[0.98rem] leading-relaxed text-muted">
              {odoHeard.findings.map((finding) => (
                <p key={finding.lead}>
                  <span className="font-medium text-ink">{finding.lead}</span> {finding.detail}
                </p>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{odoHeard.rulesIntro}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {odoHeard.rules.map((rule) => (
                <li key={rule.title} className="min-w-0 rounded-[1.6rem] border border-line bg-canvas-elevated p-5">
                  <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-ink">{rule.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{rule.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">Key decisions</h2>
            <div className="mt-6 max-w-3xl space-y-8">
              {odoDecisions.map((decision) => (
                <div key={decision.title}>
                  <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{decision.title}</h3>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{decision.body}</p>
                  {"fuel" in decision ? <FuelFlow /> : null}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">What&apos;s inside</h2>
            <div className="mt-6 max-w-3xl divide-y divide-line border-y border-line">
              {odoInside.map(([name, detail]) => (
                <div key={name} className="grid gap-1 py-4 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6">
                  <h3 className="text-sm font-semibold text-ink">{name}</h3>
                  <p className="min-w-0 text-sm leading-relaxed text-muted">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">The prototype</h2>
            <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{odoPrototypeIntro}</p>
            <BulletList items={odoPrototypeBullets} />
            <div id="odo-prototype" className="odo-embed mx-auto mt-10 w-full scroll-mt-28">
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `(function(){try{var t=localStorage.getItem("odo-theme");var dark=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.dataset.odoAppearance=dark?"dark":"light";}catch(e){}})();`,
                }}
              />
              <div className="odo-root">
                <OdoApp />
              </div>
            </div>
            <p className="mt-8">
              <PrototypeLink />
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Targets for the first 90 days
            </h2>
            <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{odoTargets.intro}</p>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {odoTargets.cards.map((card) => (
                <li key={card.value} className="min-w-0 rounded-[1.6rem] border border-line bg-canvas-elevated p-5">
                  <p className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink">{card.value}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{card.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">What I learned</h2>
            <BulletList items={odoLearned} />
          </section>
        </div>
      </article>
      <Footer />
    </main>
  );
}

function RecordGap() {
  return (
    <figure className="mt-6 max-w-3xl">
      <div
        role="img"
        aria-label="Petrol at the pump, service at the workshop, insurance renewed online, and a battery bought on a Saturday. None of them has a single record."
        className="grid grid-cols-2 gap-2"
      >
        {odoScatter.map((item) => (
          <p
            key={item.title}
            aria-hidden
            className="min-w-0 rounded-2xl border border-line bg-canvas-elevated px-3 py-3 text-sm leading-snug"
          >
            <span className="font-medium text-ink">{item.title}</span>
            <span className="text-muted">, {item.detail}</span>
          </p>
        ))}
        <p
          aria-hidden
          className="col-span-2 rounded-2xl border border-accent bg-accent-soft px-4 py-3 text-center text-sm font-medium text-ink"
        >
          Where&apos;s the record?
        </p>
      </div>
    </figure>
  );
}

function FuelFlow() {
  return (
    <figure className="mt-6">
      <ol
        role="img"
        aria-label="Mileage runs from a full tank, through a part-fill, through another part-fill, to the next full tank."
        className="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center"
      >
        {odoFuelSteps.map((step, index) => (
          <li key={`${step}-${index}`} aria-hidden className="flex min-w-0 items-center gap-2">
            {index > 0 ? (
              <span className="text-sm text-faint">
                <span className="sm:hidden">↓</span>
                <span className="hidden sm:inline">→</span>
              </span>
            ) : null}
            <span className="rounded-2xl border border-line bg-canvas-elevated px-3 py-2 text-sm font-medium text-ink">
              {step}
            </span>
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{odoFuelCaption}</figcaption>
    </figure>
  );
}

function PrototypeLink() {
  return (
    <a
      href={odoPrototypeHref}
      className={`inline-flex rounded-full border border-line px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-accent ${focusRing}`}
    >
      Try the prototype
    </a>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 max-w-3xl space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}
