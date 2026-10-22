"use client";

import { useState } from "react";
import type { VehicleKind } from "../types";

const art: Record<"car" | "bike" | "scooter", string> = {
  car: "/icons/vehicles/car.png",
  bike: "/icons/vehicles/bike.png",
  scooter: "/icons/vehicles/scooter.png",
};

export function VehicleIcon({
  type,
  size,
  label,
}: {
  type: VehicleKind;
  size: 20 | 32 | 48;
  label?: string;
}) {
  const kind = type === "cab" ? "car" : type;
  const [failed, setFailed] = useState(false);
  const name = label ?? (type === "cab" ? "Cab" : type === "bike" ? "Bike" : type === "scooter" ? "Scooter" : "Car");

  return (
    <span className={`odo-vehicle-icon odo-vehicle-icon-${size} odo-vehicle-icon-${kind}`} role="img" aria-label={name}>
      {failed ? (
        <span className="odo-vehicle-fallback" aria-hidden="true">
          {name.slice(0, 1)}
        </span>
      ) : (
        <img src={art[kind]} alt="" onError={() => setFailed(true)} />
      )}
      {type === "cab" && <span className="odo-cab-badge">cab</span>}
    </span>
  );
}
