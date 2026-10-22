"use client";

import type { CSSProperties } from "react";
import { useReducedMotion } from "./motion";

const wheels = [
  { chars: ["8", "9", "0", "d", "o"], narrow: false },
  { chars: ["0", "1", "o", "a", "d"], narrow: false },
  { chars: ["5", "6", "7", "8", "o"], narrow: false },
  { chars: ["0", "1"], narrow: true },
];

export function OdometerLogo({ play = false, size = "lg" }: { play?: boolean; size?: "lg" | "sm" }) {
  const reduced = useReducedMotion();
  const animate = play && !reduced;

  return (
    <div className={`odo-logo-word odo-logo-word-${size}${animate ? " is-play" : ""}`} role="img" aria-label="odo">
      {wheels.map((wheel) => {
        const stops = wheel.chars.length - 1;
        return (
          <span key={wheel.chars.join("")} className={wheel.narrow ? "odo-drum odo-drum-narrow" : "odo-drum"}>
            <span
              className="odo-drum-strip"
              style={
                animate
                  ? ({ "--odo-stops": String(stops) } as CSSProperties)
                  : { transform: `translateY(calc(var(--odo-cell) * ${stops} * -1))` }
              }
            >
              {wheel.chars.map((char, index) => (
                <span key={`${char}-${index}`} className="odo-drum-cell">
                  {char}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </div>
  );
}
