import type { VehicleKind } from "../types";

export function WheelFace() {
  return <img className="odo-wheel" src="/odo/odo-icon.svg" alt="" />;
}

export function VehicleArt({ kind }: { kind: VehicleKind }) {
  if (kind === "scooter") return <Scooter />;
  if (kind === "bike") return <Bike />;
  return <Hatchback />;
}

function Hatchback() {
  return (
    <svg className="odo-art" viewBox="0 0 320 140" aria-hidden="true">
      <path
        fill="#F4F7FB"
        d="M26 86C22 98 34 110 52 112H262C284 112 300 100 298 84C296 64 278 46 250 38C214 28 168 26 136 36C120 30 104 34 90 46C70 40 50 48 38 62C28 72 24 78 26 86Z"
      />
      <path
        fill="#1A2038"
        d="M130 46C146 36 168 34 190 36H216C232 38 238 48 234 60H142C126 60 116 52 130 46Z"
      />
      <circle cx="96" cy="112" r="20" fill="#141820" />
      <circle cx="96" cy="112" r="8" fill="#F5B400" />
      <circle cx="210" cy="112" r="20" fill="#141820" />
      <circle cx="210" cy="112" r="8" fill="#F5B400" />
    </svg>
  );
}

function Scooter() {
  return (
    <svg className="odo-art" viewBox="0 0 280 120" aria-hidden="true">
      <circle cx="72" cy="92" r="20" fill="#0A1240" />
      <circle cx="72" cy="92" r="8" fill="#FFC21A" />
      <circle cx="214" cy="92" r="20" fill="#0A1240" />
      <circle cx="214" cy="92" r="8" fill="#FFC21A" />
      <path fill="currentColor" d="M88 94h70l16-26h34c16 0 26 8 32 20l6 6h-22c-2-8-10-14-22-14h-18l-16 14H88Z" />
      <path fill="#0A1240" d="M176 46h18l10 22h-24l-4-22Z" />
      <path fill="currentColor" d="M168 68h34l-6 16h-20l-8-16Z" />
    </svg>
  );
}

function Bike() {
  return (
    <svg className="odo-art" viewBox="0 0 280 120" aria-hidden="true">
      <circle cx="70" cy="86" r="24" fill="none" stroke="#0A1240" strokeWidth="8" />
      <circle cx="210" cy="86" r="24" fill="none" stroke="#0A1240" strokeWidth="8" />
      <circle cx="70" cy="86" r="6" fill="#FFC21A" />
      <circle cx="210" cy="86" r="6" fill="#FFC21A" />
      <path d="M70 86h48l28-36h36" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M118 86 146 50" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M176 42h28l16 10" fill="none" stroke="#0A1240" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M150 50h22" fill="none" stroke="#0A1240" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}
