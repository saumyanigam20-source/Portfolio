import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { OdoApp } from "@/prototype/odo/OdoApp";
import "@/app/prototype/vehicle-recorder/prototype.css";
import {
  odoAudience,
  odoDecisions,
  odoFeatures,
  odoGoal,
  odoInterviewNote,
  odoLead,
  odoLearned,
  odoMeasure,
  odoMeta,
  odoProblem,
  odoPrototypeBullets,
  odoPrototypeHref,
  odoPrototypeNote,
  odoSnapshot,
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
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">The goal</h2>
            <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{odoGoal.intro}</p>
            <BulletList items={odoGoal.bullets} />
            <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{odoGoal.close}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">The problem</h2>
            <div className="mt-4 max-w-3xl space-y-4 text-[0.98rem] leading-relaxed text-muted">
              {odoProblem.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">Who it is for</h2>
            <BulletList items={odoAudience} />
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">How I approached it</h2>
            <ol className="mt-6 max-w-3xl list-decimal space-y-8 pl-5 marker:text-accent">
              <li>
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink">Start with myself.</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
                  I am the user who tracks nothing today. So I asked what would make me log at all, and what would make me quit. I would log right at the pump or the workshop. I would quit if logging takes too many taps, if reminders get annoying, or if the app gives me nothing useful back.
                </p>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">Those three answers became my design rules:</p>
                <BulletList
                  items={[
                    "Logging is faster than forgetting. A target of under 15 seconds per entry.",
                    "Reminders respect you. One a week during the last month before a due date, not a flood.",
                    "The app gives back. It answers questions for you instead of storing data.",
                  ]}
                />
              </li>
              <li>
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink">Talk to real owners.</h3>
                <div className="mt-3">
                  <ToAdd>{odoInterviewNote}</ToAdd>
                </div>
              </li>
              <li>
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink">Define the product.</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
                  I wrote a full product requirements document (PRD): users, goals, scope, data model, flows, requirements, business model and risks. It keeps the product honest about what is in and what is out.
                </p>
              </li>
              <li>
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink">Prototype fast.</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
                  I built a working prototype in one week to test the core loop: add a vehicle, log fuel, log a part, see what you have spent.
                </p>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">Key decisions</h2>
            <div className="mt-6 max-w-3xl space-y-8">
              {odoDecisions.map((decision) => (
                <div key={decision.title}>
                  <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{decision.title}</h3>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{decision.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">Every feature, briefly</h2>
            <FeatureTable />
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">The prototype</h2>
            <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">
              The prototype is a working web version that runs on sample data for a car and a scooter. You can:
            </p>
            <BulletList items={odoPrototypeBullets} />
            <div className="mt-6">
              <ToAdd>{odoPrototypeNote}</ToAdd>
            </div>
            <div id="odo-prototype" className="odo-embed mx-auto mt-10 w-full scroll-mt-28">
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap"
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
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">Goals I will measure</h2>
            <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{odoMeasure.intro}</p>
            <BulletList items={odoMeasure.bullets} />
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

function ToAdd({ children }: { children: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-accent/40 bg-accent-soft px-4 py-4">
      <p className="text-sm leading-relaxed text-ink">{children}</p>
    </div>
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

function FeatureTable() {
  return (
    <div
      tabIndex={0}
      aria-label="Every feature, briefly. Feature and what it does."
      className={`mt-8 max-w-full overflow-x-auto overscroll-x-contain ${focusRing}`}
    >
      <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
        <caption className="caption-top mb-3 text-left text-sm leading-relaxed text-muted">
          Feature and what it does
        </caption>
        <thead>
          <tr>
            <th className="border-b border-line px-3 py-3 font-semibold text-ink" scope="col">
              Feature
            </th>
            <th className="border-b border-line px-3 py-3 font-semibold text-ink" scope="col">
              What it does
            </th>
          </tr>
        </thead>
        <tbody>
          {odoFeatures.map(([feature, detail]) => (
            <tr key={feature}>
              <th className="border-b border-line px-3 py-3 align-top font-medium text-ink" scope="row">
                {feature}
              </th>
              <td className="border-b border-line px-3 py-3 align-top text-muted">{detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
