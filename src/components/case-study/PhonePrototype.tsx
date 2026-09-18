"use client";

import { useState, type ReactNode } from "react";

const IMG = "/images/case-studies/track-and-trace";

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
    body: "Your Figma home — critical alerts, then visibility. Tap Request Drayage, the delayed card, or KlearHub.",
  },
  overview: {
    title: "KlearHub Overview",
    body: "KlearView metrics and the Overview / Visibility control, as designed.",
  },
  visibility: {
    title: "Visibility",
    body: "Shipment cards with route, IDs, and status. Open a file or filter without leaving this list.",
  },
  filtered: {
    title: "Filtered list",
    body: "Applied filters sit as chips above the same card pattern.",
  },
  shipment: {
    title: "Shipment detail",
    body: "Basic information accordion for KX-A7J4-73. Back returns to the list.",
  },
  drayage: {
    title: "Request Drayage",
    body: "The original upgrade / request screen from the alert CTA.",
  },
  preview: {
    title: "Document preview",
    body: "Toolbar, zoom, and previous / next — tap share to open the email sheet.",
  },
  filters: {
    title: "Filters",
    body: "Quick filters and entity fields, same sheet as Figma.",
  },
  "docs-menu": {
    title: "Document actions",
    body: "Print, email, download — one more-options pop.",
  },
  email: {
    title: "Email document",
    body: "Send from the shipment context. Apply closes the loop.",
  },
};

export function PhonePrototype() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [overlay, setOverlay] = useState<Overlay>(null);

  const go = (next: Screen) => {
    setOverlay(null);
    setScreen(next);
  };

  const reset = () => {
    setOverlay(null);
    setScreen("dashboard");
  };

  const caption = captions[overlay ?? screen];

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
          Original Figma frames, with short motion on tap. The UI is unchanged — only
          transitions, press feedback, and a light enterprise wash around the device.
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
              <div className="relative aspect-[428/926] overflow-hidden rounded-[1.45rem] bg-[#f7f8fa]">
                <ScreenArt key={screen} name={screen} />

                {screen === "dashboard" ? (
                  <>
                    <Hotspot
                      label="Request drayage"
                      className="left-[8%] top-[36%] h-[7%] w-[36%]"
                      onClick={() => go("drayage")}
                    />
                    <Hotspot
                      label="View delayed shipments"
                      className="left-[52%] top-[28%] h-[22%] w-[42%]"
                      onClick={() => go("visibility")}
                    />
                    <Hotspot
                      label="KlearHub"
                      className="left-[25%] top-[87.5%] h-[9%] w-[24%]"
                      onClick={() => go("overview")}
                    />
                  </>
                ) : null}

                {screen === "overview" ? (
                  <>
                    <Hotspot
                      label="Open filters"
                      className="left-[80%] top-[12%] h-[6%] w-[14%]"
                      onClick={() => setOverlay("filters")}
                    />
                    <Hotspot
                      label="Visibility"
                      className="left-[50%] top-[79%] h-[5.5%] w-[24%]"
                      onClick={() => go("visibility")}
                    />
                    <Hotspot
                      label="Dashboard"
                      className="left-[1%] top-[87.5%] h-[9%] w-[24%]"
                      onClick={() => go("dashboard")}
                    />
                  </>
                ) : null}

                {screen === "visibility" || screen === "filtered" ? (
                  <>
                    <Hotspot
                      label="Open filters"
                      className="left-[80%] top-[10%] h-[6%] w-[14%]"
                      onClick={() => setOverlay("filters")}
                    />
                    <Hotspot
                      label="Open shipment KX-A7J4-73"
                      className="left-[5%] top-[22%] h-[28%] w-[90%]"
                      onClick={() => go("shipment")}
                    />
                    <Hotspot
                      label="Overview"
                      className="left-[28%] top-[79%] h-[5.5%] w-[22%]"
                      onClick={() => go("overview")}
                    />
                    <Hotspot
                      label="Dashboard"
                      className="left-[1%] top-[87.5%] h-[9%] w-[24%]"
                      onClick={() => go("dashboard")}
                    />
                  </>
                ) : null}

                {screen === "shipment" ? (
                  <>
                    <Hotspot
                      label="Back"
                      className="left-[3%] top-[8%] h-[6%] w-[12%]"
                      onClick={() => go("visibility")}
                    />
                    <Hotspot
                      label="Open documents"
                      className="left-[6%] top-[72%] h-[12%] w-[88%]"
                      onClick={() => go("preview")}
                    />
                  </>
                ) : null}

                {screen === "drayage" ? (
                  <>
                    <Hotspot
                      label="Back"
                      className="left-[3%] top-[8%] h-[6%] w-[12%]"
                      onClick={() => go("dashboard")}
                    />
                    <Hotspot
                      label="Primary action"
                      className="left-[6%] top-[78%] h-[8%] w-[88%]"
                      onClick={() => go("dashboard")}
                    />
                  </>
                ) : null}

                {screen === "preview" ? (
                  <>
                    <Hotspot
                      label="Close preview"
                      className="left-[2%] top-[7%] h-[6%] w-[12%]"
                      onClick={() => go("shipment")}
                    />
                    <Hotspot
                      label="Share document"
                      className="left-[72%] top-[14%] h-[6%] w-[24%]"
                      onClick={() => setOverlay("docs-menu")}
                    />
                  </>
                ) : null}

                {overlay === "filters" ? (
                  <OverlayPane
                    src={`${IMG}/filters.png`}
                    alt="Filters"
                    onDismiss={() => setOverlay(null)}
                  >
                    <Hotspot
                      label="Cancel filters"
                      className="left-[6%] top-[88%] h-[8%] w-[42%]"
                      onClick={() => setOverlay(null)}
                    />
                    <Hotspot
                      label="Apply filters"
                      className="left-[52%] top-[88%] h-[8%] w-[42%]"
                      onClick={() => {
                        setOverlay(null);
                        setScreen("filtered");
                      }}
                    />
                  </OverlayPane>
                ) : null}

                {overlay === "docs-menu" ? (
                  <OverlayPane
                    src={`${IMG}/docs-menu.png`}
                    alt="Document actions"
                    compact
                    onDismiss={() => setOverlay(null)}
                  >
                    <Hotspot
                      label="Email document"
                      className="left-[8%] top-[38%] h-[22%] w-[84%]"
                      onClick={() => setOverlay("email")}
                    />
                    <Hotspot
                      label="Dismiss"
                      className="left-[8%] top-[78%] h-[16%] w-[84%]"
                      onClick={() => setOverlay(null)}
                    />
                  </OverlayPane>
                ) : null}

                {overlay === "email" ? (
                  <OverlayPane
                    src={`${IMG}/email.png`}
                    alt="Email document"
                    onDismiss={() => setOverlay(null)}
                  >
                    <Hotspot
                      label="Cancel"
                      className="left-[6%] top-[88%] h-[8%] w-[42%]"
                      onClick={() => setOverlay(null)}
                    />
                    <Hotspot
                      label="Send email"
                      className="left-[52%] top-[88%] h-[8%] w-[42%]"
                      onClick={() => {
                        setOverlay(null);
                        go("preview");
                      }}
                    />
                  </OverlayPane>
                ) : null}
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

function ScreenArt({ name }: { name: Screen }) {
  const file =
    name === "filtered"
      ? "filtered.png"
      : name === "dashboard"
        ? "dashboard.png"
        : `${name}.png`;

  return (
    <img
      src={`${IMG}/${file}`}
      alt=""
      className="proto-screen absolute inset-0 h-full w-full object-cover object-top"
    />
  );
}

function Hotspot({
  label,
  className,
  onClick,
}: {
  label: string;
  className: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`proto-hotspot absolute z-10 ${className}`}
    />
  );
}

function OverlayPane({
  src,
  alt,
  compact,
  onDismiss,
  children,
}: {
  src: string;
  alt: string;
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
      <div className={`proto-sheet relative ${compact ? "h-[38%]" : "h-[78%]"}`}>
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover object-top" />
        {children}
      </div>
    </div>
  );
}
