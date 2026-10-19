import Image from "next/image";
import { ChatPrototype } from "@/components/case-study/ChatPrototype";
import { StoryGuide } from "@/components/case-study/StoryGuide";
import { klearassistContent, klearassistPrototypeUrl } from "@/content/klearassist";

const c = klearassistContent;

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function AssistStory() {
  return (
    <div>
      <StoryGuide />
      <div className="mt-6 space-y-24">
        <Problem />
        <HowItStarted />
        <FirstIdea />
        <Modules />
        <Solution />
        <Customers />
        <Forward />
        <TryPrototype />
        <WhatChanged />
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">{children}</p>
  );
}

function WhatChanged() {
  return (
    <section data-guide="impact" className="scroll-mt-36">
      <Eyebrow>Impact</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        What changed
      </h2>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{c.impact.body}</p>
      <ul className="mt-6 max-w-3xl space-y-3">
        {c.impact.bullets.map((item) => (
          <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{c.impact.note}</p>
    </section>
  );
}

function Problem() {
  return (
    <section data-guide="problem" className="scroll-mt-36">
      <Eyebrow>Problem</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        The problem, simply
      </h2>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{c.problem.body}</p>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted italic">
        {c.problem.aside}
      </p>
      <PathDiagram />
    </section>
  );
}

function PathDiagram() {
  return (
    <figure className="mt-8 max-w-full">
      <div
        tabIndex={0}
        aria-label="Before, finding an ETA takes five steps. With KlearAssist, you ask and get it."
        className={`max-w-full overflow-x-auto rounded-[1.6rem] border border-line bg-canvas-elevated p-4 sm:p-5 ${focusRing}`}
      >
        <div className="w-max min-w-full space-y-5">
          <Path id="path-before" label="Before" steps={c.problem.before} />
          <Path id="path-after" label="With KlearAssist" steps={c.problem.after} chosen />
        </div>
      </div>
      <figcaption className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        {c.problem.caption}
      </figcaption>
    </figure>
  );
}

function Path({
  id,
  label,
  steps,
  chosen = false,
}: {
  id: string;
  label: string;
  steps: readonly string[];
  chosen?: boolean;
}) {
  return (
    <div>
      <p
        id={id}
        className={`text-[10px] font-medium tracking-[0.16em] uppercase ${
          chosen ? "text-accent" : "text-faint"
        }`}
      >
        {label}
      </p>
      <ol aria-labelledby={id} className="mt-3 flex items-center gap-2">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-2">
            <span
              className={`rounded-full px-3 py-1.5 text-sm leading-snug whitespace-nowrap ${
                chosen
                  ? "border border-accent bg-accent-soft text-ink"
                  : "border border-line bg-canvas text-ink"
              }`}
            >
              {step}
            </span>
            {index < steps.length - 1 ? (
              <span aria-hidden className="text-faint">
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

function HowItStarted() {
  return (
    <section data-guide="started" className="scroll-mt-36">
      <Eyebrow>Start</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        How it started
      </h2>
      <div className="mt-4 max-w-3xl space-y-3 text-[0.98rem] leading-relaxed text-muted">
        {c.started.paragraphs.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <blockquote className="mt-8 max-w-3xl border-l border-accent/50 pl-4 font-display text-xl leading-snug font-semibold tracking-[-0.03em] text-ink sm:text-2xl">
        {c.started.pull}
      </blockquote>
    </section>
  );
}

function FirstIdea() {
  return (
    <section data-guide="idea" className="scroll-mt-36">
      <Eyebrow>Idea</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        The first idea didn’t hold
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {c.firstIdea.cards.map((card, index) => {
          const chosen = index === c.firstIdea.cards.length - 1;
          return (
            <article
              key={card.label}
              className={`rounded-[1.6rem] border p-5 ${
                chosen ? "border-accent bg-accent-soft" : "border-line bg-canvas-elevated"
              }`}
            >
              <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{card.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{card.body}</p>
            </article>
          );
        })}
      </div>
      <p className="mt-6 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{c.firstIdea.close}</p>
    </section>
  );
}

function Modules() {
  return (
    <section data-guide="modules" className="scroll-mt-36">
      <Eyebrow>Modules</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        The hard part: many modules
      </h2>
      <div className="mt-4 max-w-3xl space-y-3 text-[0.98rem] leading-relaxed text-muted">
        {c.modules.paragraphs.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <figure className="mt-8 max-w-full">
        <div className="max-w-full rounded-[1.6rem] border border-line bg-canvas-elevated p-4 sm:p-5">
          <ul
            aria-label="KlearNow modules. KlearHub is the current one."
            className="flex flex-wrap gap-2"
          >
            {c.modules.names.map((name) => {
              const on = name === c.modules.active;
              return (
                <li key={name}>
                  <span
                    className={`inline-flex rounded-full px-3 py-1.5 text-sm leading-snug whitespace-nowrap ${
                      on ? "bg-accent text-canvas" : "border border-line bg-canvas text-muted"
                    }`}
                    aria-current={on ? "true" : undefined}
                  >
                    {name}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 max-w-md rounded-2xl border border-line bg-canvas px-4 py-4">
            <p className="text-sm leading-relaxed font-medium text-ink">{c.modules.panel}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {c.modules.chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full bg-accent-soft px-3 py-1.5 text-sm leading-snug text-ink"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <figcaption className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
          {c.modules.caption}
        </figcaption>
      </figure>
    </section>
  );
}

function Solution() {
  return (
    <section data-guide="solution" className="scroll-mt-36">
      <Eyebrow>Solution</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        The solution
      </h2>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{c.solution.body}</p>
      <div className="mt-8 space-y-12">
        {c.solution.screens.map((screen) => (
          <figure key={screen.src} className="max-w-full">
            <div className="overflow-hidden rounded-[1.4rem] border border-line bg-canvas-elevated">
              <Image
                src={screen.src}
                alt={screen.alt}
                width={1440}
                height={1005}
                unoptimized
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
              {screen.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Customers() {
  return (
    <section data-guide="customers" className="scroll-mt-36">
      <Eyebrow>Customers</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        What customers said
      </h2>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{c.customers.body}</p>
      <figure className="mt-8 max-w-3xl">
        <blockquote className="border-l border-accent/50 pl-4 font-display text-xl leading-snug font-semibold tracking-[-0.03em] text-ink sm:text-2xl">
          {c.customers.pull}
        </blockquote>
        <figcaption className="mt-3 text-sm leading-relaxed text-muted">{c.customers.caption}</figcaption>
      </figure>
    </section>
  );
}

function Forward() {
  return (
    <section data-guide="forward" className="scroll-mt-36">
      <Eyebrow>Forward</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        What I’d take forward
      </h2>
      <ul className="mt-6 max-w-3xl space-y-3">
        {c.forward.map((item) => (
          <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function TryPrototype() {
  const url = klearassistPrototypeUrl.trim();
  const src = url ? toEmbedUrl(url) : "";

  return (
    <section data-guide="try" className="scroll-mt-36">
      <Eyebrow>Prototype</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        Try the prototype
      </h2>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{c.prototypeIntro}</p>
      <div className="mt-8 max-w-full">
        <ChatPrototype embedded />
      </div>
      {url ? (
        <>
          <p className="mt-10">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className={`text-sm text-muted underline-offset-4 transition hover:text-accent hover:underline ${focusRing}`}
            >
              Open prototype in a new tab
            </a>
          </p>
          <div className="mt-6 max-w-full overflow-hidden rounded-[1.8rem] border border-line bg-canvas-elevated">
            <iframe
              title="KlearAssist prototype"
              src={src}
              loading="lazy"
              allowFullScreen
              className="block aspect-[4/3] w-full max-w-full border-0 bg-white sm:aspect-[16/10]"
            />
          </div>
        </>
      ) : null}
    </section>
  );
}

function toEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host !== "figma.com" && !host.endsWith(".figma.com")) return url;
    if (parsed.pathname.startsWith("/embed")) return url;
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
  } catch {
    return url;
  }
}
