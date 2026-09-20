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
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-4 text-[0.98rem] leading-relaxed text-muted">
          {c.overview.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <ModuleMap />
      </div>
    </section>
  );
}

function ModuleMap() {
  const modules = [
    "Admin",
    "Entity",
    "Finance",
    "Master data",
    "Transactions",
    "Payments",
    "KlearHub",
  ];
  return (
    <figure className="rounded-[1.6rem] border border-line bg-canvas-elevated p-5">
      <svg viewBox="0 0 420 280" className="h-auto w-full" aria-hidden>
        {modules.map((name, i) => {
          const x = 18 + (i % 4) * 100;
          const y = 18 + Math.floor(i / 4) * 70;
          return (
            <g key={name}>
              <rect
                x={x}
                y={y}
                width="88"
                height="52"
                rx="12"
                fill="#1c2420"
                stroke="rgba(168,196,160,0.28)"
              />
              <text
                x={x + 44}
                y={y + 31}
                textAnchor="middle"
                fill="#9aa19a"
                fontSize="11"
                fontFamily="system-ui, sans-serif"
              >
                {name}
              </text>
            </g>
          );
        })}
        <path
          d="M210 155 C210 175 210 185 210 198"
          stroke="#a8c4a0"
          strokeWidth="1.5"
          fill="none"
        />
        <rect x="118" y="198" width="184" height="58" rx="16" fill="#a8c4a0" fillOpacity="0.16" stroke="#a8c4a0" />
        <text
          x="210"
          y="232"
          textAnchor="middle"
          fill="#eceae4"
          fontSize="13"
          fontFamily="system-ui, sans-serif"
        >
          One sentence in
        </text>
      </svg>
      <figcaption className="mt-3 text-xs leading-relaxed text-faint">
        Seven product doors. Assist is the sentence that opens the right one.
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
          <circle cx="20" cy="18" r="8" fill="#a8c4a0" fillOpacity="0.35" />
          <circle cx="40" cy="18" r="8" fill="#a8c4a0" fillOpacity="0.7" />
          <rect x="8" y="28" width="48" height="6" rx="3" fill="#a8c4a0" fillOpacity="0.25" />
        </>
      ) : title === "Support and training" ? (
        <>
          <rect x="10" y="8" width="28" height="24" rx="4" fill="#a8c4a0" fillOpacity="0.25" />
          <rect x="24" y="12" width="28" height="24" rx="4" fill="#a8c4a0" fillOpacity="0.55" />
        </>
      ) : (
        <>
          <circle cx="16" cy="20" r="5" fill="#a8c4a0" />
          <circle cx="32" cy="20" r="5" fill="#a8c4a0" fillOpacity="0.6" />
          <circle cx="48" cy="20" r="5" fill="#a8c4a0" fillOpacity="0.3" />
          <path d="M21 20h6M37 20h6" stroke="#a8c4a0" strokeWidth="1.5" />
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
      <rect width="260" height="110" rx="16" fill="#121614" />
      {id === "palette" ? (
        <>
          <rect x="40" y="38" width="180" height="34" rx="10" fill="#1c2420" stroke="#a8c4a0" />
          <text x="130" y="59" textAnchor="middle" fill="#9aa19a" fontSize="10">
            ⌘K  Ask…
          </text>
        </>
      ) : id === "takeover" ? (
        <>
          <rect x="30" y="16" width="200" height="78" rx="12" fill="#1c2420" />
          <rect x="48" y="28" width="120" height="10" rx="4" fill="#a8c4a0" fillOpacity="0.35" />
          <rect x="88" y="48" width="124" height="10" rx="4" fill="#eceae4" fillOpacity="0.12" />
          <rect x="48" y="68" width="164" height="14" rx="7" fill="#a8c4a0" fillOpacity="0.2" />
        </>
      ) : (
        <>
          <rect x="16" y="16" width="140" height="78" rx="10" fill="#1c2420" />
          <rect x="24" y="24" width="50" height="8" rx="3" fill="#a8c4a0" fillOpacity="0.3" />
          <rect x="24" y="40" width="124" height="44" rx="6" fill="#a8c4a0" fillOpacity="0.08" />
          <rect x="168" y="28" width="76" height="66" rx="10" fill="#a8c4a0" fillOpacity="0.2" stroke="#a8c4a0" />
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
            <div className="overflow-hidden rounded-[1.4rem] border border-line bg-[#0a0c0b]">
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
