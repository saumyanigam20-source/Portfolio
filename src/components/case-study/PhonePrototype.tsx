"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Screen =
  | "dashboard"
  | "overview"
  | "visibility"
  | "filtered"
  | "shipment"
  | "drayage"
  | "preview";

type Overlay = "filters" | "docs-menu" | "email" | null;

const captions: Record<string, { title: string; body: string }> = {
  dashboard: {
    title: "Dashboard",
    body: "Scroll the home list the way the Figma frame was built — alerts first, then KPIs below the fold. Tap Request Drayage, the delayed card, or KlearHub.",
  },
  overview: {
    title: "KlearHub Overview",
    body: "KlearView metrics continue under the segment control. Scroll to the rest of Ocean and POL, then switch to Visibility.",
  },
  visibility: {
    title: "Visibility",
    body: "Shipment cards with route, IDs, and status. Scroll the list, or open a file / filter without leaving it.",
  },
  filtered: {
    title: "Filtered list",
    body: "Applied filters sit as chips above the same card pattern. The list still scrolls.",
  },
  shipment: {
    title: "Shipment detail",
    body: "Accordions stack past the first screen. Back returns to the list; Documents opens the preview.",
  },
  drayage: {
    title: "Request Drayage",
    body: "The original upgrade / request screen — scroll to the rest of the benefits and the primary action.",
  },
  preview: {
    title: "Document preview",
    body: "Toolbar, zoom, and previous / next — tap share to open the email sheet.",
  },
  filters: {
    title: "Filters",
    body: "Quick filters and entity fields. The sheet scrolls so Apply is not trapped off-screen.",
  },
  "docs-menu": {
    title: "Document actions",
    body: "Print, email, download — one more-options pop.",
  },
  email: {
    title: "Email document",
    body: "Send from the shipment context. Scroll to the pages, then apply.",
  },
};

export function PhonePrototype() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [overlay, setOverlay] = useState<Overlay>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const go = (next: Screen) => {
    setOverlay(null);
    setScreen(next);
  };

  const reset = () => {
    setOverlay(null);
    setScreen("dashboard");
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [screen, overlay]);

  const caption = captions[overlay ?? screen];
  const showTabs = overlay === null && screen !== "preview";
  const showSeg =
    overlay === null &&
    (screen === "overview" || screen === "visibility" || screen === "filtered");

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
          Prototype
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          Walk the KlearHub screens
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          Same KlearHub flow, with short motion on tap. Scroll inside the phone to
          reach content below the fold — lists, KPIs, and documents are not clipped
          to the first viewport.
        </p>
      </div>

      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-14">
        <div className="proto-device relative w-[min(100%,340px)]">
          <div
            className="rounded-[2.1rem] p-[1px]"
            style={{
              background:
                "linear-gradient(145deg, rgba(61,92,86,0.85), rgba(26,36,34,0.95) 48%, #0a0c0b)",
            }}
          >
            <div className="overflow-hidden rounded-[2.05rem] bg-[#0a0c0b] p-2.5">
              <div className="relative aspect-[428/926] overflow-hidden rounded-[1.45rem] bg-[#f4f6f8] text-[#1c2a32]">
                <div className="absolute inset-0 flex flex-col">
                <div
                  ref={scrollRef}
                  className="proto-scroll min-h-0 flex-1"
                  key={`${screen}-${overlay ?? "none"}`}
                  onWheel={(event) => event.stopPropagation()}
                >
                  <div className="sticky top-0 z-10 bg-[#f4f6f8]">
                    <StatusBar />
                  </div>
                  <div className="proto-screen">
                    {overlay ? (
                      <div className="min-h-full" />
                    ) : (
                      <ScreenBody screen={screen} go={go} setOverlay={setOverlay} />
                    )}
                  </div>
                </div>
                {showSeg ? (
                  <div className="pointer-events-none shrink-0 bg-gradient-to-t from-[#f4f6f8] from-35% to-transparent px-4 pb-2 pt-5">
                    <div className="pointer-events-auto">
                      <SegControl
                        active={screen === "overview" ? "overview" : "visibility"}
                        onOverview={() => go("overview")}
                        onVisibility={() =>
                          go(screen === "filtered" ? "filtered" : "visibility")
                        }
                      />
                    </div>
                  </div>
                ) : null}
                {showTabs ? (
                  <TabBar
                    active={
                      screen === "dashboard"
                        ? "dashboard"
                        : "klearhub"
                    }
                    onDashboard={() => go("dashboard")}
                    onKlearHub={() =>
                      go(screen === "dashboard" ? "overview" : screen === "overview" ? "overview" : "visibility")
                    }
                  />
                ) : null}

                {overlay === "filters" ? (
                  <Sheet onDismiss={() => setOverlay(null)}>
                    <FiltersSheet
                      onCancel={() => setOverlay(null)}
                      onApply={() => {
                        setOverlay(null);
                        setScreen("filtered");
                      }}
                    />
                  </Sheet>
                ) : null}

                {overlay === "docs-menu" ? (
                  <Sheet compact onDismiss={() => setOverlay(null)}>
                    <DocsMenuSheet
                      onEmail={() => setOverlay("email")}
                      onDismiss={() => setOverlay(null)}
                    />
                  </Sheet>
                ) : null}

                {overlay === "email" ? (
                  <Sheet onDismiss={() => setOverlay(null)}>
                    <EmailSheet
                      onCancel={() => setOverlay(null)}
                      onSend={() => {
                        setOverlay(null);
                        go("preview");
                      }}
                    />
                  </Sheet>
                ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm space-y-4 pt-2">
          <p className="text-xs tracking-[0.18em] text-faint uppercase">This screen</p>
          <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">
            {caption.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted">{caption.body}</p>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-line px-4 py-2 text-sm text-muted transition duration-150 hover:border-accent hover:text-accent"
          >
            Restart flow
          </button>
          <ol className="space-y-2 pt-1 text-xs leading-relaxed text-faint">
            <li>1. Dashboard → KlearHub or Request Drayage.</li>
            <li>2. Visibility → a shipment card → documents.</li>
            <li>3. Filter, then apply to see chips on the list.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}

function ScreenBody({
  screen,
  go,
  setOverlay,
}: {
  screen: Screen;
  go: (next: Screen) => void;
  setOverlay: (overlay: Overlay) => void;
}) {
  if (screen === "dashboard") {
    return <Dashboard go={go} />;
  }
  if (screen === "overview") {
    return <Overview go={go} setOverlay={setOverlay} />;
  }
  if (screen === "visibility" || screen === "filtered") {
    return (
      <Visibility
        filtered={screen === "filtered"}
        go={go}
        setOverlay={setOverlay}
      />
    );
  }
  if (screen === "shipment") {
    return <Shipment go={go} />;
  }
  if (screen === "drayage") {
    return <Drayage go={go} />;
  }
  return <Preview go={go} setOverlay={setOverlay} />;
}

function Dashboard({ go }: { go: (next: Screen) => void }) {
  return (
    <div className="px-4 pb-5 pt-2">
      <p className="text-center text-[17px] font-semibold tracking-[-0.02em] text-[#1a2744]">
        Hi Brooke, Good Afternoon!
      </p>
      <p className="mt-1 text-center text-[11px] text-[#7b8494]">
        Here is an overview of your system today.
      </p>

      <SectionLabel color="#e24b4b">Critical Alerts & Action Center</SectionLabel>
      <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => go("drayage")}
          className="min-w-[72%] rounded-2xl border border-[#f3c4c8] p-3 text-left"
          style={{
            background:
              "linear-gradient(165deg, #fff8f9 0%, #fde8ec 52%, #f6d2d9 100%)",
          }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#e24b4b] shadow-sm">
            🚛
          </span>
          <p className="mt-3 text-[14px] font-semibold">Demurrage Risk</p>
          <p className="mt-1 text-[11px] leading-relaxed text-[#5c6573]">
            12 containers are approaching their last free day. Take action now to
            avoid demurrage fees.
          </p>
          <span className="proto-btn mt-3 inline-flex rounded-full border border-[#c9d4e3] bg-white px-3 py-1.5 text-[11px] font-medium text-[#3d4d63]">
            Request Drayage
          </span>
        </button>
        <button
          type="button"
          onClick={() => go("visibility")}
          className="min-w-[72%] rounded-2xl border border-[#f0e0c4] p-3 text-left"
          style={{
            background:
              "linear-gradient(165deg, #fffaf3 0%, #f8ecd8 52%, #f3dfc0 100%)",
          }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#d28a2a] shadow-sm">
            📦
          </span>
          <p className="mt-3 text-[14px] font-semibold">Shipment Delays</p>
          <p className="mt-1 text-[11px] leading-relaxed text-[#5c6573]">
            8 shipments have been delayed. The next estimated arrival is Apr 15,
            2024.
          </p>
          <span className="proto-btn mt-3 inline-flex rounded-full border border-[#c9d4e3] bg-white px-3 py-1.5 text-[11px] font-medium text-[#3d4d63]">
            View Delayed
          </span>
        </button>
      </div>

      <SectionLabel color="#2aa3a8">Visibility Overview</SectionLabel>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <Kpi title="Active Shipments" delta="+12% vs last month" value="147" />
        <Kpi title="Waiting to Depart" delta="+2.1% vs last month" value="19" />
        <Kpi title="Containers In Transit" delta="+5% vs last month" value="86" />
        <Kpi title="Drayage Pending" delta="-8% vs last month" value="11" down />
        <Kpi title="On-time Arrivals" delta="+3% vs last month" value="92%" />
        <Kpi title="LFD in 48 hours" delta="Action needed" value="12" down />
        <Kpi title="At POL" delta="+1.4% vs last month" value="24" />
        <Kpi title="Docs pending" delta="-2% vs last month" value="7" down />
      </div>
    </div>
  );
}

function Overview({
  setOverlay,
}: {
  go: (next: Screen) => void;
  setOverlay: (overlay: Overlay) => void;
}) {
  return (
    <div className="px-4 pb-5 pt-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[20px] font-semibold tracking-[-0.03em]">KlearHub Overview</h3>
        <button
          type="button"
          aria-label="Open filters"
          onClick={() => setOverlay("filters")}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#d8dee8] bg-white text-[15px]"
        >
          ☰
        </button>
      </div>
      <div className="mt-3 flex gap-2">
        <span className="flex-1 rounded-lg bg-[#2f5f68] py-2 text-center text-[11px] font-semibold tracking-wide text-white">
          KLEARVIEW
        </span>
        <span className="proto-btn flex-1 rounded-lg border border-[#d8dee8] bg-white py-2 text-center text-[11px] font-semibold tracking-wide text-[#6b7380]">
          CONTAINER
        </span>
      </div>
      <div className="mt-3 space-y-2">
        <RowKpi title="Active Shipments" delta="+12% vs last month" value="147" />
        <RowKpi title="Waiting to Depart" delta="+5% vs last month" value="19" />
      </div>
      <p className="mt-4 text-[13px] font-semibold">Ocean Shipments</p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <Kpi title="Active MBLs" delta="+12% vs last month" value="1099" />
        <Kpi title="Completed" delta="+2.1% vs last month" value="2033" />
        <Kpi title="On hold" delta="-1.1% vs last month" value="14" down />
        <Kpi title="Exceptions" delta="+4 this week" value="6" down />
      </div>
      <p className="mt-4 text-[13px] font-semibold text-[#e26a2d]">Port of Lading</p>
      <div className="mt-2 space-y-2">
        <LinkRow label="Waiting to Depart POL" value="0 MBLs" />
        <LinkRow label="At POL — ready" value="24 MBLs" />
        <LinkRow label="Departed this week" value="18 MBLs" />
      </div>
      <p className="mt-4 text-[13px] font-semibold text-[#2aa3a8]">Port of Unlading</p>
      <div className="mt-2 space-y-2">
        <LinkRow label="Arriving this week" value="9 MBLs" />
        <LinkRow label="At destination" value="31 MBLs" />
      </div>
    </div>
  );
}

function Visibility({
  filtered,
  go,
  setOverlay,
}: {
  filtered: boolean;
  go: (next: Screen) => void;
  setOverlay: (overlay: Overlay) => void;
}) {
  return (
    <div className="px-4 pb-5 pt-2">
      <h3 className="text-[20px] font-semibold tracking-[-0.03em]">
        {filtered ? "KlearHub Shipments" : "Visibility"}
      </h3>
      <div className="mt-3 flex gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-[#d8dee8] bg-white px-3 py-2 text-[11px] text-[#9aa3b0]">
          Search by Shipment ID, container nu...
        </div>
        <button
          type="button"
          aria-label="Open filters"
          onClick={() => setOverlay("filters")}
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#d8dee8] bg-white"
        >
          ⚙
          {filtered ? (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#e24b4b] text-[9px] text-white">
              1
            </span>
          ) : null}
        </button>
      </div>
      {filtered ? (
        <div className="mt-3 flex flex-col gap-2">
          <Chip>Ocean Port of Unlading ETA &gt; Apr 26, 2025</Chip>
          <Chip>Destination ETA &gt; Apr 26, 2025</Chip>
        </div>
      ) : null}
      <div className="mt-3 space-y-3">
        <ShipmentCard
          company="Schlumberger Argentina..."
          knId="KX-A7J4-73"
          origin="Charleston (USC)"
          originDate="Aug 21, 2025 ETD"
          dest="Hamburg (DEHAM)"
          destDate="Sep 22, 2025 ETA"
          container="HLBU8168248"
          po="HLBU8168248"
          mbol="HLCUOS1250801516"
          onClick={() => go("shipment")}
        />
        <ShipmentCard
          company="MI-Overseas"
          knId="KX-U1C6-8389"
          origin="Houston, USA (USHOU)"
          originDate="Aug 21, 2025 ETD"
          dest="Genove, Italy (ITGOA)"
          destDate="Oct 10, 2025 ETA"
          container="—"
          po="4514710485"
          mbol="HLCUGOA2508AQEJ2"
          onClick={() => go("shipment")}
        />
        <ShipmentCard
          company="Global Trade Inc."
          knId="KX-UIC8-900"
          origin="Los Angeles (USLAX)"
          originDate="Aug 25, 2025 ETD"
          dest="Rotterdam (NLRTM)"
          destDate="Sep 28, 2025 ETA"
          container="MSKU1234567"
          po="789654123"
          mbol="MAEUX123456789"
          onClick={() => go("shipment")}
        />
      </div>
    </div>
  );
}

function Shipment({ go }: { go: (next: Screen) => void }) {
  return (
    <div className="px-4 pb-5 pt-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Back"
          onClick={() => go("visibility")}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[16px] shadow-sm"
        >
          ←
        </button>
        <p className="flex-1 text-[15px] font-semibold">Shipment: KX-A7J4-73</p>
        <span className="rounded-full border border-[#8fd4a4] px-2 py-0.5 text-[10px] font-medium text-[#2f9a55]">
          At POL
        </span>
      </div>

      <Accordion title="Basic Information" icon="👤">
        <Field icon="💼" label="Company" value="Schlumberger Argentina S.A." />
        <Field
          icon="🗺️"
          label="Port of Lading"
          value={"Charleston (USCHS)\nAug 22, 2025 ETD"}
        />
        <Field
          icon="📍"
          label="Port of Unlading"
          value={"Hamburg (DEHAM)\nSep 22, 2025 ETA"}
        />
        <Field icon="⛵" label="MOT" value="Ocean" />
        <Field icon="🌐" label="Country" value="United States" />
      </Accordion>

      <Accordion title="Shipment Information" icon="⛵">
        <p className="text-[11px] text-[#7b8494]">Entry Number</p>
        <p className="text-[13px] font-medium">SF: SIF-43910946877</p>
        <p className="mt-3 text-[11px] text-[#7b8494]">House bill</p>
        <p className="text-[13px] font-medium">HLCUOS1250801516</p>
        <p className="mt-3 text-[11px] text-[#7b8494]">PO</p>
        <p className="text-[13px] font-medium">HLBU8168248</p>
      </Accordion>

      <Accordion title="Containers" icon="📦">
        <p className="text-[13px] font-medium">HLBU8168248</p>
        <p className="mt-1 text-[11px] text-[#7b8494]">40&apos; HC · seal 883920</p>
      </Accordion>

      <button
        type="button"
        onClick={() => go("preview")}
        className="mt-2 w-full rounded-2xl border border-[#d8dee8] bg-white p-3 text-left"
      >
        <p className="text-[13px] font-semibold">Documents</p>
        <p className="mt-1 text-[11px] text-[#7b8494]">
          Commercial Invoice · ingested Sep 19, 2025
        </p>
        <p className="mt-2 text-[11px] font-medium text-[#2f5f68]">Open preview →</p>
      </button>
    </div>
  );
}

function Drayage({ go }: { go: (next: Screen) => void }) {
  return (
    <div className="px-4 pb-6 pt-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Back"
          onClick={() => go("dashboard")}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[16px] shadow-sm"
        >
          ←
        </button>
        <p className="text-[16px] font-semibold">Request Drayage</p>
      </div>
      <div className="mt-4 rounded-xl bg-[#e8f3fb] px-3 py-2.5 text-center text-[12px] font-medium text-[#2f6f9a]">
        🚚 Drayage Service Not Active
      </div>
      <h3 className="mt-8 text-[22px] font-semibold leading-tight tracking-[-0.03em] text-[#2f4d57]">
        Upgrade to Digital Drayage: Maximize Visibility.
      </h3>
      <p className="mt-3 text-[12px] leading-relaxed text-[#5c6573]">
        Secure and transparent final-mile delivery, integrated with our customs
        platform. Leverage our AI for real-time tracking, seamless compliance,
        and dynamic, predictable rates.
      </p>
      <Benefit
        title="Continuous Digital Visibility"
        body="Real-time tracking from port to destination"
      />
      <Benefit
        title="Predictable rates"
        body="Quotes stay tied to the shipment, not a side email."
      />
      <Benefit
        title="Fewer last-free-day misses"
        body="Request pickup before demurrage starts accruing."
      />
      <button
        type="button"
        onClick={() => go("dashboard")}
        className="mt-5 w-full rounded-xl bg-[#2f5f68] py-3 text-[13px] font-semibold text-white"
      >
        Request Digital Drayage
      </button>
    </div>
  );
}

function Preview({
  go,
  setOverlay,
}: {
  go: (next: Screen) => void;
  setOverlay: (overlay: Overlay) => void;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex items-center gap-2 px-4 py-2">
        <button
          type="button"
          aria-label="Close preview"
          onClick={() => go("shipment")}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[14px] shadow-sm"
        >
          ×
        </button>
        <div className="flex-1">
          <p className="text-[14px] font-semibold">Commercial Invoice</p>
          <p className="text-[10px] text-[#7b8494]">Ingested Date: Sep 19, 2025</p>
        </div>
      </div>
      <div className="flex items-center justify-between bg-[#3b4046] px-4 py-2 text-white">
        <span className="text-[12px]">+ &nbsp; 33% &nbsp; −</span>
        <button
          type="button"
          aria-label="Share document"
          onClick={() => setOverlay("docs-menu")}
          className="text-[13px]"
        >
          ↗
        </button>
      </div>
      <div className="min-h-[420px] flex-1 bg-[#eef1f4]" />
      <div className="grid grid-cols-2 gap-3 px-4 py-4">
        <span className="proto-btn rounded-xl border border-[#c9d4e3] py-3 text-center text-[13px]">
          ‹ Previous
        </span>
        <span className="proto-btn rounded-xl border border-[#c9d4e3] py-3 text-center text-[13px]">
          Next ›
        </span>
      </div>
    </div>
  );
}

function FiltersSheet({
  onCancel,
  onApply,
}: {
  onCancel: () => void;
  onApply: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="proto-scroll min-h-0 flex-1 px-4 pt-4">
        <p className="text-[18px] font-semibold">Filters</p>
        <p className="mt-1 text-[11px] text-[#6b7380]">
          Filter users by entity, key dates, references, and status.
        </p>
        <div className="mt-4 rounded-2xl bg-[#eef4fb] p-3">
          <p className="text-[12px] font-semibold">Quick Filters</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              "Urgent Today",
              "Delayed",
              "Arriving This Week",
              "In Transit",
              "At Destination",
              "LFD Overdue",
              "LRD Overdue",
              "HOT Pending",
            ].map((label) => (
              <span
                key={label}
                className="proto-btn rounded-full border border-[#d5deea] bg-white px-2.5 py-1 text-[10px] text-[#3d4d63]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-4 text-[13px] font-semibold">Entities</p>
        <label className="mt-2 block text-[12px] text-[#3d4d63]">Sub-customer</label>
        <div className="mt-1 rounded-xl border border-[#d8dee8] px-3 py-2.5 text-[12px] text-[#9aa3b0]">
          Select
        </div>
        <label className="mt-3 block text-[12px] text-[#3d4d63]">Companies</label>
        <div className="mt-1 rounded-xl border border-[#d8dee8] px-3 py-2.5 text-[12px] text-[#9aa3b0]">
          Select
        </div>
        <label className="mt-3 block text-[12px] text-[#3d4d63]">Status</label>
        <div className="mt-1 rounded-xl border border-[#d8dee8] px-3 py-2.5 text-[12px] text-[#9aa3b0]">
          Any status
        </div>
        <button type="button" className="mt-3 text-[12px] text-[#7aa0b8] underline">
          Clear Filters
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 px-4 py-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl bg-[#5c6b80] py-3 text-[13px] font-semibold text-white"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onApply}
          className="rounded-xl bg-[#6f8b96] py-3 text-[13px] font-semibold text-white"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}

function DocsMenuSheet({
  onEmail,
  onDismiss,
}: {
  onEmail: () => void;
  onDismiss: () => void;
}) {
  return (
    <div className="bg-white">
      <div className="bg-[#e8eef2] px-4 py-3">
        <p className="text-[15px] font-semibold text-[#3d5c66]">Documents</p>
        <p className="text-[11px] text-[#6b7380]">Shipment: KX-A7J4-73</p>
      </div>
      <button type="button" onClick={onDismiss} className="block w-full px-4 py-4 text-left text-[13px]">
        Download All Documents
      </button>
      <button type="button" onClick={onEmail} className="block w-full px-4 py-4 text-left text-[13px]">
        Email All Documents
      </button>
      <button type="button" onClick={onDismiss} className="block w-full px-4 py-4 text-left text-[13px]">
        Print All Documents
      </button>
    </div>
  );
}

function EmailSheet({
  onCancel,
  onSend,
}: {
  onCancel: () => void;
  onSend: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="proto-scroll min-h-0 flex-1 px-4 pt-4">
        <p className="text-[16px] font-semibold">Email Document(s)</p>
        <p className="text-[11px] text-[#6b7380]">Shipment: KX-A7J4-73</p>
        <p className="mt-4 text-[12px] font-medium">
          Send To <span className="text-[#d14b4b]">*</span>
        </p>
        <div className="mt-1 rounded-xl border border-[#d8dee8] px-3 py-2 text-[12px]">
          james@oecgroup.com
        </div>
        <p className="mt-3 text-[12px] font-medium">CC</p>
        <div className="mt-1 h-10 rounded-xl border border-[#d8dee8]" />
        <p className="mt-3 text-[12px] font-medium">Subject</p>
        <div className="mt-1 rounded-xl border border-[#d8dee8] px-3 py-2 text-[12px]">
          Documents for shipment KX-A7J4-73
        </div>
        <p className="mt-4 text-[12px]">☑ Select All</p>
        <div className="mt-2 rounded-xl border border-[#d8dee8] px-3 py-2 text-[12px]">EMAIL DOC</div>
        <p className="mt-2 px-1 text-[12px]">☑ Page 1</p>
        <p className="mt-2 px-1 text-[12px]">☑ Page 2</p>
        <p className="mt-2 px-1 text-[12px]">☑ Page 3</p>
        <p className="mt-2 px-1 text-[12px]">☑ Page 4</p>
      </div>
      <div className="grid grid-cols-2 gap-2 px-4 py-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl bg-[#5c6b80] py-3 text-[13px] font-semibold text-white"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSend}
          className="rounded-xl bg-[#2f5f68] py-3 text-[13px] font-semibold text-white"
        >
          Email Documents
        </button>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="z-10 flex shrink-0 items-center justify-between bg-[#f4f6f8] px-6 pb-1 pt-2.5 text-[11px] font-medium text-[#1c2a32]">
      <span>9:41</span>
      <span className="tracking-widest">●●●● ☀</span>
    </div>
  );
}

function TabBar({
  active,
  onDashboard,
  onKlearHub,
}: {
  active: "dashboard" | "klearhub";
  onDashboard: () => void;
  onKlearHub: () => void;
}) {
  return (
    <div className="grid shrink-0 grid-cols-4 bg-[#3a6a72] pb-3 pt-2 text-[9px] text-white/70">
      <button
        type="button"
        onClick={onDashboard}
        className={`flex flex-col items-center gap-0.5 ${active === "dashboard" ? "text-white" : ""}`}
      >
        <img
          src="/images/prototype/dashboard-tab.png"
          alt=""
          width={14}
          height={14}
          className="h-3.5 w-3.5 brightness-0 invert"
        />
        Dashboard
      </button>
      <button
        type="button"
        onClick={onKlearHub}
        className={`flex flex-col items-center gap-0.5 ${active === "klearhub" ? "bg-[#2f5a61] text-white" : ""}`}
      >
        <img
          src="/images/prototype/klearhub-tab.png"
          alt=""
          width={14}
          height={14}
          className="h-3.5 w-3.5 brightness-0 invert"
        />
        KlearHub
      </button>
      <span className="flex flex-col items-center gap-0.5">
        <img
          src="/images/prototype/notifications-tab.png"
          alt=""
          width={14}
          height={14}
          className="h-3.5 w-3.5 brightness-0 invert"
        />
        Notifications
      </span>
      <span className="flex flex-col items-center gap-0.5">
        <span className="text-[14px]">☰</span>
        More
      </span>
    </div>
  );
}

function Sheet({
  compact,
  onDismiss,
  children,
}: {
  compact?: boolean;
  onDismiss: () => void;
  children: ReactNode;
}) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Dismiss"
        className="absolute inset-0 bg-[#1a2422]/35 proto-dim"
        onClick={onDismiss}
      />
      <div
        className={`proto-sheet relative z-10 overflow-hidden rounded-t-[1.2rem] ${compact ? "h-[42%]" : "h-[82%]"}`}
      >
        {children}
      </div>
    </div>
  );
}

function SectionLabel({ color, children }: { color: string; children: ReactNode }) {
  return (
    <p className="mt-5 flex items-center gap-2 text-[13px] font-semibold">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {children}
      <span className="ml-auto text-[10px] text-[#9aa3b0]">⌃</span>
    </p>
  );
}

function Kpi({
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
    <div className="proto-kpi rounded-2xl bg-white p-3 shadow-[0_0_0_1px_rgba(28,42,50,0.05)]">
      <p className="text-[11px] font-medium leading-snug">{title}</p>
      <p className={`mt-1 text-[10px] ${down ? "text-[#d14b4b]" : "text-[#2f9a55]"}`}>
        {delta}
      </p>
      <p className="mt-2 text-[18px] font-semibold tracking-[-0.03em]">{value}</p>
    </div>
  );
}

function RowKpi({
  title,
  delta,
  value,
}: {
  title: string;
  delta: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white px-3 py-3 shadow-[0_0_0_1px_rgba(28,42,50,0.05)]">
      <div>
        <p className="text-[13px] font-medium">{title}</p>
        <p className="text-[10px] text-[#2f9a55]">{delta}</p>
      </div>
      <p className="text-[20px] font-semibold">{value}</p>
    </div>
  );
}

function LinkRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="proto-row flex items-center justify-between rounded-2xl bg-white px-3 py-3 text-[12px] shadow-[0_0_0_1px_rgba(28,42,50,0.05)]">
      <span>{label}</span>
      <span className="proto-row-meta font-medium text-[#2f5f68]">{value} ›</span>
    </div>
  );
}

function SegControl({
  active,
  onOverview,
  onVisibility,
}: {
  active: "overview" | "visibility";
  onOverview: () => void;
  onVisibility: () => void;
}) {
  return (
    <div className="mx-auto flex w-max items-center rounded-full bg-white p-1 text-[11px] shadow-[0_8px_20px_rgba(28,42,50,0.12)]">
      <button
        type="button"
        onClick={onOverview}
        className={`rounded-full px-3 py-1.5 ${active === "overview" ? "bg-[#eef1f4] font-medium" : "text-[#7b8494]"}`}
      >
        Overview
      </button>
      <button
        type="button"
        onClick={onVisibility}
        className={`rounded-full px-3 py-1.5 ${active === "visibility" ? "bg-[#eef1f4] font-medium" : "text-[#7b8494]"}`}
      >
        Visibility
      </button>
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="w-fit rounded-full bg-[#dfe5ec] px-3 py-1 text-[10px] text-[#3d4d63]">
      {children} ×
    </span>
  );
}

function ShipmentCard({
  company,
  knId,
  origin,
  originDate,
  dest,
  destDate,
  container,
  po,
  mbol,
  onClick,
}: {
  company: string;
  knId: string;
  origin: string;
  originDate: string;
  dest: string;
  destDate: string;
  container: string;
  po: string;
  mbol: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full overflow-hidden rounded-2xl bg-white text-left shadow-[0_0_0_1px_rgba(28,42,50,0.06)]"
    >
      <div className="flex items-start justify-between px-3 pt-3">
        <div>
          <p className="text-[13px] font-semibold">{company}</p>
          <p className="text-[10px] text-[#7b8494]">
            {knId} | Import
          </p>
        </div>
        <span className="rounded-full border border-[#8fd4a4] px-2 py-0.5 text-[10px] text-[#2f9a55]">
          At POL
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 px-3 text-[11px]">
        <div>
          <p className="font-medium">{origin}</p>
          <p className="text-[10px] text-[#7b8494]">{originDate}</p>
        </div>
        <div>
          <p className="font-medium">{dest}</p>
          <p className="text-[10px] text-[#7b8494]">{destDate}</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1 border-t border-[#eef1f4] px-3 py-2 text-[9px] text-[#7b8494]">
        <span>
          Container
          <br />
          <span className="text-[10px] text-[#1c2a32]">{container}</span>
        </span>
        <span>
          PO
          <br />
          <span className="text-[10px] text-[#1c2a32]">{po}</span>
        </span>
        <span>
          MBOL
          <br />
          <span className="text-[10px] text-[#1c2a32]">{mbol}</span>
        </span>
      </div>
      <div className="h-1 bg-gradient-to-r from-[#3dba6e] via-[#3dba6e] to-transparent" />
    </button>
  );
}

function Accordion({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-3 overflow-hidden rounded-2xl bg-white shadow-[0_0_0_1px_rgba(28,42,50,0.05)]">
      <div className="flex items-center gap-2 bg-[#e8eef2] px-3 py-2 text-[12px] font-semibold">
        <span>{icon}</span>
        {title}
        <span className="ml-auto text-[10px] text-[#7b8494]">⌃</span>
      </div>
      <div className="space-y-3 px-3 py-3">{children}</div>
    </div>
  );
}

function Field({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-2">
      <span className="mt-0.5 text-[12px]">{icon}</span>
      <div>
        <p className="text-[11px] text-[#7b8494]">{label}</p>
        <p className="whitespace-pre-line text-[12px] font-medium">{value}</p>
      </div>
    </div>
  );
}

function Benefit({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-3 flex gap-2 rounded-xl bg-[#e8f3fb] p-3">
      <span className="text-[16px]">⏱</span>
      <div>
        <p className="text-[12px] font-semibold">{title}</p>
        <p className="mt-0.5 text-[11px] text-[#5c6573]">{body}</p>
      </div>
    </div>
  );
}
