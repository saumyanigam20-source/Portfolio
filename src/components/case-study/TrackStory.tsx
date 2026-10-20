import { trackAndTraceContent } from "@/content/track-and-trace";

const c = trackAndTraceContent;

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const overviewTiles = [
  { title: "Active Shipments", delta: "+12% vs last month", value: "147" },
  { title: "Waiting to Depart", delta: "+2.1% vs last month", value: "19" },
  { title: "Containers In Transit", delta: "+5% vs last month", value: "86" },
  { title: "Drayage Pending", delta: "-8% vs last month", value: "11", down: true },
  { title: "On-time Arrivals", delta: "+3% vs last month", value: "92%" },
  { title: "LFD in 48 hours", delta: "Action needed", value: "12", down: true },
  { title: "At POL", delta: "+1.4% vs last month", value: "24" },
  { title: "Docs pending", delta: "-2% vs last month", value: "7", down: true },
] as const;

export function TrackStory() {
  return (
    <div className="space-y-16">
      <Goals />
      <Problem />
      <Audience />
      <Scope />
      <Home />
      <Rule />
      <Deeper />
      <Forward />
    </div>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">{children}</p>
  );
}

function Goals() {
  return (
    <section>
      <Eyebrow>Goals</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        What this is built to improve
      </h2>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{c.goals.intro}</p>
      <ul className="mt-6 max-w-3xl space-y-3">
        {c.goals.bullets.map((item) => (
          <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Problem() {
  return (
    <section>
      <Eyebrow>Problem</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        The problem, simply
      </h2>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{c.problem.lead}</p>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{c.problem.stakes}</p>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted italic">
        {c.problem.aside}
      </p>
      <PathDiagram />
      <blockquote className="mt-8 max-w-3xl border-l border-accent/50 pl-4 font-display text-xl leading-snug font-semibold tracking-[-0.03em] text-ink sm:text-2xl">
        {c.problem.pull}
      </blockquote>
    </section>
  );
}

function PathDiagram() {
  return (
    <figure className="mt-8 max-w-full min-w-0">
      <div
        tabIndex={0}
        aria-label="Before, checking a status takes five steps: on the move, find a laptop, log in, search, see status. With the app: on the move, open and see it."
        className={`max-w-full overflow-x-auto overscroll-x-contain rounded-[1.6rem] border border-line bg-canvas-elevated p-4 sm:p-5 ${focusRing}`}
      >
        <div className="w-max min-w-full space-y-5">
          <Path id="path-before" label="Before" steps={c.problem.before} />
          <Path id="path-after" label="With the app" steps={c.problem.after} chosen />
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

function Audience() {
  return (
    <section>
      <Eyebrow>People</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        Who it’s for
      </h2>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{c.audience.body}</p>
      <ul aria-label="Brokers, truckers, and operations" className="mt-6 flex flex-wrap gap-2">
        {c.audience.labels.map((name) => (
          <li key={name}>
            <span className="inline-flex rounded-full border border-line bg-canvas px-3 py-1.5 text-sm leading-snug whitespace-nowrap text-ink">
              {name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Scope() {
  return (
    <section>
      <Eyebrow>Scope</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        Deciding what earns a place on a small screen
      </h2>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{c.scope.body}</p>
      <figure className="mt-8 max-w-full min-w-0">
        <div
          tabIndex={0}
          aria-label="Three steps. Interview. List what each persona needs. Keep only what earns space."
          className={`max-w-full overflow-x-auto overscroll-x-contain rounded-[1.6rem] border border-line bg-canvas-elevated p-4 sm:p-5 ${focusRing}`}
        >
          <ol className="flex w-max min-w-full items-center gap-2">
            {c.scope.steps.map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-line bg-canvas px-3 py-1.5 text-sm leading-snug whitespace-nowrap text-ink">
                  {step}
                </span>
                {index < c.scope.steps.length - 1 ? (
                  <span aria-hidden className="text-faint">
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </figure>
    </section>
  );
}

function Home() {
  return (
    <section>
      <Eyebrow>Home</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        The home screen
      </h2>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{c.home.body}</p>
      <div className="mt-8 grid items-start gap-8 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        <HomeScreen />
        <ul className="min-w-0 space-y-3">
          {c.home.notes.map((note) => (
            <li key={note} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {note}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HomeScreen() {
  return (
    <figure className="min-w-0 max-w-full">
      <div
        role="img"
        aria-label="Visibility Overview on the home screen. Tiles show Active Shipments 147, Waiting to Depart 19, Containers In Transit 86, Drayage Pending 11, On-time Arrivals 92 percent, LFD in 48 hours 12 marked Action needed, At POL 24, and Docs pending 7. A trend sits under each label."
        className="overflow-hidden rounded-[1.4rem] border border-line bg-[#f4f6f8] px-4 pt-4 pb-4 text-[#1c2a32]"
      >
        <p className="flex items-center gap-2 text-[13px] font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2aa3a8]" aria-hidden />
          Visibility Overview
          <span className="ml-auto text-[10px] text-[#9aa3b0]" aria-hidden>
            ⌃
          </span>
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {overviewTiles.map((tile) => (
            <OverviewTile key={tile.title} {...tile} />
          ))}
        </div>
      </div>
    </figure>
  );
}

function OverviewTile({
  title,
  delta,
  value,
  down,
}: {
  title: string;
  delta: string;
  value: string;
  down?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-white p-3 shadow-[0_0_0_1px_rgba(28,42,50,0.05)]">
      <p className="text-[11px] leading-snug font-medium">{title}</p>
      <p className={`mt-1 truncate text-[10px] ${down ? "text-[#d14b4b]" : "text-[#2f9a55]"}`}>
        {delta}
      </p>
      <p className="mt-2 text-[18px] font-semibold tracking-[-0.03em]">{value}</p>
    </div>
  );
}

function Rule() {
  return (
    <section>
      <Eyebrow>Rule</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        One simple rule
      </h2>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{c.rule.body}</p>
      <TileToList />
    </section>
  );
}

function TileToList() {
  const rows = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <figure className="mt-8 max-w-full min-w-0">
      <div
        tabIndex={0}
        aria-label="The LFD in 48 hours tile shows 12 and Action needed. It leads to a list of 12 shipments. The rows are not live shipment data."
        className={`max-w-full overflow-x-auto overscroll-x-contain rounded-[1.6rem] border border-line bg-canvas-elevated p-4 sm:p-5 ${focusRing}`}
      >
        <div className="flex w-max min-w-full items-center gap-3 sm:gap-4">
          <div className="w-44 shrink-0">
            <p className="text-[10px] font-medium tracking-[0.16em] text-faint uppercase">Tile</p>
            <div className="mt-3 rounded-2xl border border-line bg-canvas p-3">
              <p className="text-[11px] leading-snug font-medium text-ink">LFD in 48 hours</p>
              <p className="mt-1 text-[10px] text-[#d14b4b]">Action needed</p>
              <p className="mt-2 font-display text-[18px] font-semibold tracking-[-0.03em] text-ink">
                12
              </p>
            </div>
          </div>
          <span aria-hidden className="shrink-0 text-faint">
            →
          </span>
          <div className="w-64 shrink-0 sm:w-72">
            <p className="text-[10px] font-medium tracking-[0.16em] text-accent uppercase">
              12 shipments
            </p>
            <ol
              aria-label="Twelve placeholder rows, not live shipment data"
              className="mt-3 space-y-1.5 rounded-2xl border border-dashed border-accent/40 bg-canvas p-3"
            >
              {rows.map((row) => (
                <li
                  key={row}
                  className="flex items-center justify-between rounded-xl border border-line bg-canvas-elevated px-3 py-1.5 text-sm"
                >
                  <span className="text-muted">Shipment</span>
                  <span className="tabular-nums text-faint">{row}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        These rows stand in for shipments. They are not live data.
      </figcaption>
    </figure>
  );
}

function Deeper() {
  return (
    <section>
      <Eyebrow>Detail</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        One level deeper
      </h2>
      <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{c.deeper.body}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="min-w-0 rounded-[1.6rem] border border-line bg-canvas-elevated p-5">
          <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">Journey</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{c.deeper.journey}</p>
          <JourneyScreen />
        </article>
        <article className="min-w-0 rounded-[1.6rem] border border-line bg-canvas-elevated p-5">
          <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">Documents</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{c.deeper.documents}</p>
          <DocumentsScreen />
        </article>
      </div>
    </section>
  );
}

function JourneyScreen() {
  return (
    <div
      role="img"
      aria-label="Shipment KX-A7J4-73, status At POL. Company Schlumberger Argentina. Port of lading Charleston, estimated departure August 22, 2025. Port of unlading Hamburg, estimated arrival September 22, 2025. Mode of transport ocean. Country United States."
      className="mt-4 overflow-hidden rounded-2xl border border-line bg-[#f4f6f8] p-3 text-[#1c2a32]"
    >
      <div className="flex items-center gap-2">
        <p className="min-w-0 flex-1 text-[13px] font-semibold">Shipment: KX-A7J4-73</p>
        <span className="inline-flex shrink-0 rounded-full border border-[#9ed4b0] bg-[#f1faf4] px-2.5 py-1 text-[10px] font-medium text-[#217a45]">
          At POL
        </span>
      </div>
      <div className="mt-3 overflow-hidden rounded-2xl bg-white shadow-[0_0_0_1px_rgba(28,42,50,0.05)]">
        <div className="bg-[#e8eef2] px-3 py-2 text-[12px] font-semibold">Basic Information</div>
        <div className="space-y-3 px-3 py-3">
          <Field label="Company" value="Schlumberger Argentina S.A." />
          <Field label="Port of Lading" value={"Charleston (USCHS)\nAug 22, 2025 ETD"} />
          <Field label="Port of Unlading" value={"Hamburg (DEHAM)\nSep 22, 2025 ETA"} />
          <Field label="MOT" value="Ocean" />
          <Field label="Country" value="United States" />
        </div>
      </div>
    </div>
  );
}

function DocumentsScreen() {
  return (
    <div
      role="img"
      aria-label="Document preview. Commercial Invoice, ingested September 19, 2025. Previous and next controls sit under the page."
      className="mt-4 overflow-hidden rounded-2xl border border-line bg-[#f4f6f8] text-[#1c2a32]"
    >
      <div className="px-3 pt-3">
        <p className="text-[14px] font-semibold">Commercial Invoice</p>
        <p className="text-[10px] text-[#7b8494]">Ingested Date: Sep 19, 2025</p>
      </div>
      <div className="mt-3 flex items-center justify-between bg-[#3b4046] px-4 py-2 text-[12px] text-white">
        <span>+ &nbsp; 33% &nbsp; −</span>
        <span aria-hidden>↗</span>
      </div>
      <div className="h-28 bg-[#eef1f4]" />
      <div className="grid grid-cols-2 gap-2 px-3 py-3">
        <span className="rounded-xl border border-[#c9d4e3] bg-white py-2.5 text-center text-[12px] font-medium text-[#3d4d63]">
          ‹ Previous
        </span>
        <span className="rounded-xl border border-[#2f5f68] bg-white py-2.5 text-center text-[12px] font-semibold text-[#2f5f68]">
          Next ›
        </span>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-[#7b8494]">{label}</p>
      <p className="text-[12px] font-medium whitespace-pre-line">{value}</p>
    </div>
  );
}

function Forward() {
  return (
    <section>
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
