export function ExperimentCover({
  kind,
}: {
  kind: "cursor" | "orders";
}) {
  if (kind === "orders") return <OrdersCover />;
  return <CursorCover />;
}

function CursorCover() {
  const rows = [
    { label: "Hero", done: true },
    { label: "Selected work", done: true },
    { label: "About", done: true },
    { label: "Experiments", done: false },
  ];

  return (
    <div className="flex h-full w-full bg-canvas-tint p-4 sm:p-5">
      <div className="flex w-full flex-col justify-between rounded-xl border border-line bg-canvas-elevated p-4">
        <div>
          <p className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
            spec
          </p>
          <ul className="mt-3 space-y-1.5 font-mono text-[11px] leading-relaxed text-muted">
            <li>
              canvas &nbsp;<span className="dark:hidden">#f4f6f1</span>
              <span className="hidden dark:inline">#0e100f</span>
            </li>
            <li>
              accent &nbsp;<span className="dark:hidden">#2f6b3e</span>
              <span className="hidden dark:inline">#a8c4a0</span>
            </li>
            <li>type &nbsp;&nbsp;&nbsp;Syne / DM Sans</li>
          </ul>
        </div>
        <ul className="mt-4 space-y-2 border-t border-line pt-3">
          {rows.map((row) => (
            <li key={row.label} className="flex items-center gap-2 text-xs text-ink">
              <span
                className={`grid h-3.5 w-3.5 place-items-center rounded-[3px] border text-[9px] ${
                  row.done
                    ? "border-accent bg-accent text-canvas"
                    : "border-line text-transparent"
                }`}
                aria-hidden
              >
                ✓
              </span>
              {row.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function OrdersCover() {
  const gates = [
    { label: "Customs", open: true },
    { label: "Freight", open: false },
    { label: "Terminal", open: true },
  ];

  return (
    <div className="flex h-full w-full flex-col justify-between bg-[#e7ebe4] p-4 text-[#1c241c] sm:p-5">
      <div>
        <p className="text-[10px] tracking-[0.16em] text-[#5c675c] uppercase">
          Delivery order · draft
        </p>
        <p className="mt-1 font-display text-sm font-semibold tracking-[-0.03em]">
          MSCU4451290
        </p>
      </div>
      <ul className="mt-4 grid grid-cols-3 gap-2">
        {gates.map((gate) => (
          <li
            key={gate.label}
            className={`rounded-lg px-2 py-2 text-center text-[10px] font-medium tracking-wide uppercase ${
              gate.open ? "bg-[#d7ead4] text-[#1d5c32]" : "bg-[#f6e4c8] text-[#8a5a10]"
            }`}
          >
            {gate.label}
            <span className="mt-1 block text-[9px] tracking-normal normal-case">
              {gate.open ? "Open" : "Waiting"}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[11px] leading-relaxed text-[#3d4a3d]">
        Cannot issue until freight is released. Last free day stays on the order.
      </p>
    </div>
  );
}
