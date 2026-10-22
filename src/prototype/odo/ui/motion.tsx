"use client";

import { useEffect, useLayoutEffect, useState } from "react";

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);
  return reduced;
}

let mileageFlash = false;

export function markMileageFlash() {
  mileageFlash = true;
}

export function takeMileageFlash() {
  const value = mileageFlash;
  mileageFlash = false;
  return value;
}

export function CountUp({
  value,
  format,
  className,
}: {
  value: number;
  format: (value: number) => string;
  className?: string;
}) {
  const finalText = format(value);
  const [display, setDisplay] = useState(() => format(0));

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !Number.isFinite(value)) {
      setDisplay(finalText);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 320);
      const eased = 1 - (1 - t) ** 3;
      const shown = Number.isInteger(value) ? Math.round(value * eased) : value * eased;
      setDisplay(t >= 1 ? finalText : format(shown));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    setDisplay(format(0));
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [finalText, format, value]);

  return (
    <span className={className} style={{ display: "inline-block", minWidth: `${finalText.length}ch` }} aria-label={finalText}>
      {display}
    </span>
  );
}
