import Image from "next/image";
import { klearassistContent } from "@/content/klearassist";

const c = klearassistContent;

export function AssistStory() {
  return (
    <div className="space-y-24">
      <Overview />
      <Problem />
      <Research />
      <Personas />
      <Concepts />
      <Process />
      <Patterns />
      <FigmaFlow />
      <Maps />
      <Principles />
      <Impact />
    </div>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
      {children}
    </p>
  );
}

function Overview() {
  return (
    <section>
      <Eyebrow>{c.overview.eyebrow}</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        {c.overview.title}
      </h2>
      <div className="mt-6 max-w-3xl space-y-4 text-[0.98rem] leading-relaxed text-muted">
        {c.overview.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <ModuleMap />
    </section>
  );
}

function ModuleMap() {
  const modules = [
    {
      name: "Admin",
      plain: "Who can sign in, and what they are allowed to do.",
      ask: "Show me all users",
    },
    {
      name: "Entity",
      plain: "The companies on an account, including smaller customers under a parent.",
      ask: "Add a sub-customer",
    },
    {
      name: "Finance",
      plain: "Bills, what is late, and the dates on a contract.",
      ask: "Which invoices are overdue?",
    },
    {
      name: "Master data",
      plain: "The standing lists everything else looks up — names, codes, addresses.",
      ask: "What’s on file for this customer?",
    },
    {
      name: "Transactions",
      plain: "The paperwork for one move: the file you open for a single shipment.",
      ask: "Open this shipment’s file",
    },
    {
      name: "Payments",
      plain: "Sending the money, once you can see what is owed.",
      ask: "Pay this invoice",
    },
    {
      name: "KlearHub",
      plain: "Where the goods are right now — coming in, running late, or still moving.",
      ask: "What’s arriving this week?",
    },
  ];

  return (
    <figure className="@container relative mt-10 overflow-hidden rounded-[1.8rem] border border-line bg-canvas-elevated p-4 sm:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-[radial-gradient(ellipse_at_center,rgba(47,107,62,0.1),transparent_68%)]"
      />
      <div className="relative flex items-baseline justify-between gap-4">
        <p className="text-[11px] font-medium tracking-[0.2em] text-faint uppercase">Seven doors</p>
        <p className="text-[11px] text-faint">One question each</p>
      </div>
      <ul className="relative mt-4 grid gap-2.5 @min-[40rem]:grid-cols-2">
        {modules.map((module, index) => {
          const last = index === modules.length - 1;
          return (
            <li
              key={module.name}
              className={`flex flex-col rounded-2xl border border-line bg-canvas-tint px-4 py-3.5 ${
                last ? "@min-[40rem]:col-span-2 @min-[40rem]:flex-row @min-[40rem]:items-end @min-[40rem]:justify-between @min-[40rem]:gap-8" : ""
              }`}
            >
              <div className={last ? "@min-[40rem]:max-w-md" : ""}>
                <p className="font-display text-[11px] tracking-[0.14em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-1.5 font-display text-[1.05rem] font-semibold tracking-[-0.03em] text-ink">
                  {module.name}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{module.plain}</p>
              </div>
              <p
                className={`mt-auto border-l border-accent/45 pt-3 pl-2.5 text-[12px] leading-snug text-accent ${
                  last ? "@min-[40rem]:mt-0 @min-[40rem]:max-w-[16rem] @min-[40rem]:shrink-0 @min-[40rem]:pt-0" : ""
                }`}
              >
                “{module.ask}”
              </p>
            </li>
          );
        })}
      </ul>
      <svg viewBox="0 0 600 52" className="relative mt-1 h-12 w-full" aria-hidden>
        {[70, 150, 230, 300, 370, 450, 530].map((x) => (
          <path
            key={x}
            d={`M${x} 2 C ${x} 26, 300 26, 300 48`}
            stroke="rgba(47,107,62,0.45)"
            strokeWidth="1.25"
            fill="none"
          />
        ))}
        <circle cx="300" cy="48" r="3.5" fill="var(--accent)" />
      </svg>
      <div className="relative mx-auto max-w-lg rounded-2xl border border-accent/35 bg-accent-soft px-5 py-4 text-center shadow-[0_0_40px_rgba(47,107,62,0.08)]">
        <p className="font-display text-lg font-semibold tracking-[-0.03em] text-ink">One sentence in</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          You ask in ordinary words. Assist opens the matching door — you never have to know its name.
        </p>
      </div>
      <figcaption className="relative mt-4 text-center text-xs leading-relaxed text-faint">
        Seven parts of the product. The line on each card is a question a new person could actually ask.
      </figcaption>
    </figure>
  );
}

function Problem() {
  return (
    <section>
      <Eyebrow>{c.problem.eyebrow}</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        {c.problem.title}
      </h2>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">
        {c.problem.body}
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {c.problem.points.map((point, i) => (
          <article
            key={point.title}
            className="rounded-3xl border border-line bg-canvas-elevated p-5"
          >
            <span className="font-display text-2xl text-accent/80">0{i + 1}</span>
            <h3 className="mt-3 font-display text-lg font-semibold tracking-[-0.02em]">
              {point.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{point.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Research() {
  return (
    <section>
      <Eyebrow>{c.research.eyebrow}</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        {c.research.title}
      </h2>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">
        {c.research.intro}
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {c.research.methods.map((method) => (
          <article key={method.title} className="rounded-3xl border border-line p-5">
            <MethodMark title={method.title} />
            <h3 className="mt-4 font-display text-lg font-semibold tracking-[-0.02em]">
              {method.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{method.body}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {c.research.findings.map((item) => (
          <blockquote
            key={item.who}
            className="rounded-3xl bg-accent-soft px-5 py-6"
          >
            <p className="font-display text-lg leading-snug tracking-[-0.02em] text-ink">
              “{item.quote}”
            </p>
            <footer className="mt-4 text-xs tracking-[0.14em] text-faint uppercase">
              {item.who}
            </footer>
          </blockquote>
        ))}
      </div>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {c.research.insights.map((insight) => (
          <li
            key={insight}
            className="flex gap-3 rounded-2xl border border-line px-4 py-3 text-sm leading-relaxed text-muted"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {insight}
          </li>
        ))}
      </ul>
    </section>
  );
}

function MethodMark({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden>
      {title === "Interviews" ? (
        <>
          <circle cx="20" cy="18" r="8" fill="var(--accent)" fillOpacity="0.35" />
          <circle cx="40" cy="18" r="8" fill="var(--accent)" fillOpacity="0.7" />
          <rect x="8" y="28" width="48" height="6" rx="3" fill="var(--accent)" fillOpacity="0.25" />
        </>
      ) : title === "Support and training" ? (
        <>
          <rect x="10" y="8" width="28" height="24" rx="4" fill="var(--accent)" fillOpacity="0.25" />
          <rect x="24" y="12" width="28" height="24" rx="4" fill="var(--accent)" fillOpacity="0.55" />
        </>
      ) : (
        <>
          <circle cx="16" cy="20" r="5" fill="var(--accent)" />
          <circle cx="32" cy="20" r="5" fill="var(--accent)" fillOpacity="0.6" />
          <circle cx="48" cy="20" r="5" fill="var(--accent)" fillOpacity="0.3" />
          <path d="M21 20h6M37 20h6" stroke="var(--accent)" strokeWidth="1.5" />
        </>
      )}
    </svg>
  );
}

function Personas() {
  return (
    <section>
      <Eyebrow>Personas</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        Three people, three jobs, one assistant
      </h2>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">
        These are composite portraits from interviews and product use — not a
        generic “enterprise user.” Brooke is the person the Figma screens greet.
      </p>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {c.personas.map((persona) => (
          <article
            key={persona.id}
            className="flex flex-col rounded-[1.7rem] border border-line bg-canvas-elevated p-5"
          >
            <PersonaPortrait id={persona.id} />
            <p className="mt-4 text-xs tracking-[0.16em] text-accent uppercase">
              {persona.role}
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em]">
              {persona.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{persona.context}</p>
            <p className="mt-4 text-sm font-medium leading-relaxed text-ink">
              Goal · {persona.goal}
            </p>
            <p className="mt-3 font-display text-[0.95rem] leading-snug text-accent">
              “{persona.says}”
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs leading-relaxed">
              <div>
                <p className="tracking-[0.14em] text-faint uppercase">Needs</p>
                <ul className="mt-2 space-y-1 text-muted">
                  {persona.needs.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="tracking-[0.14em] text-faint uppercase">Not this</p>
                <ul className="mt-2 space-y-1 text-muted">
                  {persona.not.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PersonaPortrait({ id }: { id: string }) {
  const fills =
    id === "brooke"
      ? ["#2f4a45", "#a8c4a0"]
      : id === "jordan"
        ? ["#3d3228", "#d4b48a"]
        : ["#243038", "#8fb4c4"];
  return (
    <svg viewBox="0 0 280 120" className="h-auto w-full" aria-hidden>
      <rect width="280" height="120" rx="20" fill={fills[0]} />
      <circle cx="210" cy="86" r="54" fill={fills[1]} fillOpacity="0.25" />
      <circle cx="58" cy="58" r="28" fill={fills[1]} fillOpacity="0.85" />
      <path
        d="M28 120 C28 88 88 88 88 120"
        fill={fills[1]}
        fillOpacity="0.7"
      />
      <rect x="108" y="36" width="140" height="8" rx="4" fill={fills[1]} fillOpacity="0.4" />
      <rect x="108" y="54" width="96" height="6" rx="3" fill={fills[1]} fillOpacity="0.25" />
    </svg>
  );
}

function Concepts() {
  return (
    <section>
      <Eyebrow>Initial concepts</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        Three homes for the assistant. One kept the dashboard.
      </h2>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">
        Before Figma screens, we argued about where AI should live. The winner is
        the one that does not ask Brooke to leave her morning view.
      </p>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {c.concepts.map((concept) => (
          <article
            key={concept.id}
            className={`rounded-[1.7rem] border p-5 ${
              concept.id === "dock"
                ? "border-accent/40 bg-accent-soft"
                : "border-line bg-canvas-elevated"
            }`}
          >
            <ConceptSketch id={concept.id} />
            <p className="mt-4 text-xs tracking-[0.16em] text-faint uppercase">
              {concept.verdict}
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold tracking-[-0.02em]">
              {concept.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{concept.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ConceptSketch({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 260 110" className="h-auto w-full" aria-hidden>
      <rect width="260" height="110" rx="16" fill="var(--canvas)" />
      {id === "palette" ? (
        <>
          <rect x="40" y="38" width="180" height="34" rx="10" fill="var(--canvas-elevated)" stroke="var(--accent)" />
          <text x="130" y="59" textAnchor="middle" fill="var(--muted)" fontSize="10">
            ⌘K  Ask…
          </text>
        </>
      ) : id === "takeover" ? (
        <>
          <rect x="30" y="16" width="200" height="78" rx="12" fill="var(--canvas-elevated)" />
          <rect x="48" y="28" width="120" height="10" rx="4" fill="var(--accent)" fillOpacity="0.35" />
          <rect x="88" y="48" width="124" height="10" rx="4" fill="var(--ink)" fillOpacity="0.12" />
          <rect x="48" y="68" width="164" height="14" rx="7" fill="var(--accent)" fillOpacity="0.16" />
        </>
      ) : (
        <>
          <rect x="16" y="16" width="140" height="78" rx="10" fill="var(--canvas-elevated)" />
          <rect x="24" y="24" width="50" height="8" rx="3" fill="var(--accent)" fillOpacity="0.35" />
          <rect x="24" y="40" width="124" height="44" rx="6" fill="var(--accent)" fillOpacity="0.08" />
          <rect x="168" y="28" width="76" height="66" rx="10" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" />
        </>
      )}
    </svg>
  );
}

function Process() {
  return (
    <section>
      <Eyebrow>Process</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        How the work actually moved
      </h2>
      <ol className="mt-8 space-y-0">
        {c.process.map((item, i) => (
          <li key={item.step} className="grid gap-4 border-l border-line py-5 pl-6 sm:grid-cols-[5.5rem_1fr]">
            <p className="font-display text-sm tracking-[0.18em] text-accent">
              {item.step}
            </p>
            <div>
              <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{item.body}</p>
            </div>
            {i < c.process.length - 1 ? null : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

function Patterns() {
  return (
    <section>
      <Eyebrow>Response system</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        The answer should look like the data
      </h2>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">
        A chatbot that only speaks paragraphs cannot run an enterprise system.
        This table is the design system for replies.
      </p>
      <div className="mt-8 overflow-hidden rounded-3xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-canvas-elevated text-xs tracking-[0.14em] text-faint uppercase">
            <tr>
              <th className="px-5 py-3 font-medium">If the data is</th>
              <th className="px-5 py-3 font-medium">Show</th>
              <th className="px-5 py-3 font-medium">Example</th>
            </tr>
          </thead>
          <tbody className="text-muted">
            {c.patterns.map((row) => (
              <tr key={row.data} className="border-t border-line">
                <td className="px-5 py-3 text-ink">{row.data}</td>
                <td className="px-5 py-3">{row.ui}</td>
                <td className="px-5 py-3">{row.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function FigmaFlow() {
  return (
    <section>
      <Eyebrow>Design flow · Figma</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        From a launcher on home, to a table, to a workspace
      </h2>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">
        These are the KlearAssist screens from the file — desktop KlearNow, not
        the Track & Trace phone. Read them in order. Each step is a decision
        Brooke can see.
      </p>
      <div className="mt-10 space-y-16">
        {c.figmaFlow.map((frame) => (
          <figure key={frame.src} className="space-y-4">
            <div className="overflow-hidden rounded-[1.4rem] border border-line bg-canvas-elevated">
              <Image
                src={frame.src}
                alt={frame.title}
                width={1440}
                height={1005}
                unoptimized
                className="h-auto w-full"
              />
            </div>
            <figcaption className="max-w-3xl">
              <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">
                {frame.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                {frame.body}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Maps() {
  return (
    <section className="grid gap-10 lg:grid-cols-2">
      <figure>
        <div className="overflow-hidden rounded-[1.4rem] border border-line">
          <Image
            src="/images/case-studies/klearassist/ia.png"
            alt="Information architecture mapping modules to intents"
            width={1600}
            height={1000}
            unoptimized
            className="h-auto w-full"
          />
        </div>
        <figcaption className="mt-3 text-sm leading-relaxed text-muted">
          {c.iaCaption}
        </figcaption>
      </figure>
      <figure>
        <div className="overflow-hidden rounded-[1.4rem] border border-line">
          <Image
            src="/images/case-studies/klearassist/conversation.png"
            alt="Conversation mapping for KlearAssist"
            width={1600}
            height={1000}
            unoptimized
            className="h-auto w-full"
          />
        </div>
        <figcaption className="mt-3 text-sm leading-relaxed text-muted">
          {c.conversationCaption}
        </figcaption>
      </figure>
    </section>
  );
}

function Principles() {
  return (
    <section>
      <Eyebrow>Principles</Eyebrow>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {c.principles.map((item) => (
          <article key={item.title} className="rounded-3xl border border-line p-5">
            <h3 className="font-display text-lg font-semibold tracking-[-0.02em]">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Impact() {
  return (
    <section>
      <Eyebrow>What changed</Eyebrow>
      <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        Less map. More answer.
      </h2>
      <ul className="mt-6 space-y-3">
        {c.impact.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-[0.95rem] leading-relaxed text-muted"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
