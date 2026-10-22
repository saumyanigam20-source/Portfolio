import type { FuelType, RecordItem, ThemeMode, Vehicle, VehicleKind } from "./types";

const DATA_KEY = "odo-vehicle-recorder";
const THEME_KEY = "odo-theme";
const SESSION_KEY = "odo-session";

const fuelTypes = new Set<FuelType>(["petrol", "diesel", "cng", "lpg", "electric"]);
const kinds = new Set<VehicleKind>(["car", "bike", "scooter", "cab"]);

export type Session = { signedIn: boolean; phone: string; name: string };

const emptySession: Session = { signedIn: false, phone: "", name: "" };

export type SavedData = {
  started: boolean;
  vehicles: Vehicle[];
  records: RecordItem[];
  selectedId?: string;
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
  const named = typeof vehicle.nickname === "string" || typeof vehicle.make === "string";
  return typeof vehicle.id === "string" && named && typeof vehicle.odometer === "number";
}

function normaliseVehicle(vehicle: Vehicle): Vehicle {
  const fuelType = fuelTypes.has(vehicle.fuelType) ? vehicle.fuelType : "petrol";
  const listed = Array.isArray(vehicle.fuels) ? vehicle.fuels.filter((fuel) => fuelTypes.has(fuel)) : [];
  const fuels = listed.length > 0 ? listed : [fuelType];
  const kind = kinds.has(vehicle.kind) ? vehicle.kind : "car";
  return {
    ...vehicle,
    kind,
    fuelType: fuels[0] ?? fuelType,
    fuels,
    nickname: vehicle.nickname || `${vehicle.make} ${vehicle.model}`.trim() || "Vehicle",
  };
}

export function loadSession(): Session {
  if (typeof localStorage === "undefined") return emptySession;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return emptySession;
    const parsed = JSON.parse(raw) as Partial<Session>;
    return {
      signedIn: Boolean(parsed.signedIn),
      phone: typeof parsed.phone === "string" ? parsed.phone : "",
      name: typeof parsed.name === "string" ? parsed.name : "",
    };
  } catch {
    return emptySession;
  }
}

export function saveSession(session: Session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
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
      vehicles: parsed.vehicles.filter(isVehicle).map(normaliseVehicle),
      records: parsed.records.filter(isRecordItem),
      selectedId: typeof parsed.selectedId === "string" ? parsed.selectedId : undefined,
    };
  } catch {
    return null;
  }
}

export function saveData(data: SavedData) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}
