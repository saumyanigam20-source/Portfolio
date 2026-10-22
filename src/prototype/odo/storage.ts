import type { RecordItem, ThemeMode, Vehicle } from "./types";

const DATA_KEY = "odo-vehicle-recorder";
const THEME_KEY = "odo-theme";

export type SavedData = {
  started: boolean;
  vehicles: Vehicle[];
  records: RecordItem[];
};

export function uid(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function loadTheme(): ThemeMode {
  if (typeof localStorage === "undefined") return "system";
  const value = localStorage.getItem(THEME_KEY);
  if (value === "light" || value === "dark" || value === "system") return value;
  return "system";
}

export function saveTheme(theme: ThemeMode) {
  localStorage.setItem(THEME_KEY, theme);
}

export function applyAppearance(theme: ThemeMode) {
  if (typeof document === "undefined") return;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = theme === "dark" || (theme === "system" && systemDark);
  document.documentElement.dataset.odoAppearance = dark ? "dark" : "light";
}

export function clearAppearance() {
  if (typeof document === "undefined") return;
  delete document.documentElement.dataset.odoAppearance;
}

function isVehicle(value: unknown): value is Vehicle {
  if (!value || typeof value !== "object") return false;
  const vehicle = value as Vehicle;
  return typeof vehicle.id === "string" && typeof vehicle.nickname === "string" && typeof vehicle.odometer === "number";
}

function isRecordItem(value: unknown): value is RecordItem {
  if (!value || typeof value !== "object") return false;
  const record = value as RecordItem;
  return (
    (record.kind === "fuel" || record.kind === "part" || record.kind === "service" || record.kind === "insurance") &&
    typeof record.id === "string" &&
    typeof record.date === "string" &&
    typeof record.amount === "number"
  );
}

export function loadData(): SavedData | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(DATA_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SavedData>;
    if (!parsed || !Array.isArray(parsed.vehicles) || !Array.isArray(parsed.records)) return null;
    return {
      started: Boolean(parsed.started),
      vehicles: parsed.vehicles.filter(isVehicle),
      records: parsed.records.filter(isRecordItem),
    };
  } catch {
    return null;
  }
}

export function saveData(data: SavedData) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}
