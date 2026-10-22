import { useEffect, useRef } from "react";
import { useOdo } from "../store";

export function PlusSheet() {
  const { setPlusOpen, go, vehicles } = useOdo();
  const first = useRef<HTMLButtonElement>(null);

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

  return (
    <div className="odo-sheet-backdrop" onClick={() => setPlusOpen(false)}>
      <div
        className="odo-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Add a record"
        onClick={(event) => event.stopPropagation()}
      >
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
