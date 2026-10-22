import { plateTone } from "../plate";
import type { VehicleKind } from "../types";

export function PlatePreview({ display, kind, compact = false }: { display: string; kind: VehicleKind; compact?: boolean }) {
  const tone = plateTone(kind);
  return (
    <p className={compact ? `odo-plate odo-plate-${tone} odo-plate-sm` : `odo-plate odo-plate-${tone}`} aria-hidden="true">
      {display || "XX 00 XX 0000"}
    </p>
  );
}
