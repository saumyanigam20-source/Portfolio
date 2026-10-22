import type { VehicleKind } from "./types";

const STANDARD = /^[A-Z]{2}\d{1,2}[A-Z]{1,3}\d{4}$/;
const BH = /^\d{2}BH\d{4}[A-Z]{2}$/;

export type PlateSeries = "standard" | "bh";

export type PlateResult = {
  normalised: string;
  display: string;
  valid: boolean;
  series: PlateSeries | null;
  error: string;
};

const INVALID = "Enter a standard plate (HR 26 DK 1234) or a BH plate (22 BH 1234 AA).";

export function formatPlate(input: string): PlateResult {
  const compact = input.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
  if (!compact) return { normalised: "", display: "", valid: false, series: null, error: "" };

  const mode: PlateSeries = /^\d/.test(compact) ? "bh" : "standard";
  const grouped = mode === "bh" ? group(compact, [/\d/, /[A-Z]/, /\d/, /[A-Z]/], [2, 2, 4, 2]) : group(compact, [/[A-Z]/, /\d/, /[A-Z]/, /\d/], [2, 2, 3, 4]);
  const body = grouped.parts.join("");
  const valid = grouped.rest === "" && (mode === "bh" ? BH.test(body) : STANDARD.test(body));
  const display = [...grouped.parts, grouped.rest].filter(Boolean).join(" ");
  return {
    normalised: body,
    display,
    valid,
    series: valid ? mode : null,
    error: grouped.rest !== "" || stalled(mode, grouped.parts, valid) ? INVALID : "",
  };
}

export function plateTone(kind: VehicleKind): "cab" | "private" {
  return kind === "cab" ? "cab" : "private";
}

function stalled(mode: PlateSeries, parts: string[], valid: boolean): boolean {
  if (valid) return false;
  if (mode === "bh") {
    const code = parts[1] ?? "";
    const letters = parts[3] ?? "";
    if (code.length === 2 && code !== "BH") return true;
    return letters.length === 2;
  }
  const number = parts[3] ?? "";
  return number.length === 4;
}

function group(source: string, patterns: RegExp[], limits: number[]): { parts: string[]; rest: string } {
  const parts: string[] = [];
  let index = 0;
  for (let slot = 0; slot < patterns.length; slot += 1) {
    let out = "";
    const pattern = patterns[slot] ?? /\d/;
    const max = limits[slot] ?? 0;
    while (index < source.length && out.length < max && pattern.test(source[index] ?? "")) {
      out += source[index];
      index += 1;
    }
    parts.push(out);
  }
  return { parts, rest: source.slice(index) };
}
