import { useEffect, useRef, type PointerEvent } from "react";
import { useOdo } from "../store";

export function PlusSheet({ phase }: { phase: "in" | "out" }) {
  const { setPlusOpen, go, vehicles } = useOdo();
  const first = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);
  const drag = useRef(0);

  useEffect(() => {
    first.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPlusOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setPlusOpen]);

  const choose = (action: "fuel" | "part" | "service") => {
    if (vehicles.length === 0) {
      go({ name: "add-vehicle", returnTo: "home" });
      return;
    }
    if (action === "fuel") go({ name: "add-fuel" });
    else go({ name: "add-record", recordKind: action });
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    startY.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (startY.current == null || !sheet.current) return;
    const next = Math.max(0, event.clientY - startY.current);
    drag.current = next;
    sheet.current.style.transform = `translateY(${next}px)`;
  };

  const onPointerUp = () => {
    if (drag.current > 48) setPlusOpen(false);
    else if (sheet.current) sheet.current.style.transform = "";
    drag.current = 0;
    startY.current = null;
  };

  return (
    <div className={phase === "out" ? "odo-sheet-backdrop is-out" : "odo-sheet-backdrop"} onClick={() => setPlusOpen(false)}>
      <div
        ref={sheet}
        className="odo-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Add a record"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="odo-sheet-grab"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <span className="odo-sheet-handle" />
        </div>
        <button ref={first} type="button" className="odo-sheet-btn" onClick={() => choose("fuel")}>
          Fuel
        </button>
        <button type="button" className="odo-sheet-btn" onClick={() => choose("part")}>
          Part
        </button>
        <button type="button" className="odo-sheet-btn" onClick={() => choose("service")}>
          Service
        </button>
        <button type="button" className="odo-sheet-btn odo-sheet-quiet" onClick={() => setPlusOpen(false)}>
          Close
        </button>
      </div>
    </div>
  );
}
