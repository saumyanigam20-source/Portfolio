import { fuelLabel, mileageUnit, vehicleFuels } from "./format";
import { averageLatestMileage, mileageReadings } from "./mileage";
import type { FuelRecord, FuelType, RecordItem, ServiceRecord, Vehicle } from "./types";

export function insightSentence(thisYear: number, lastYear: number): string | null {
  if (lastYear <= 0) return null;
  const pct = Math.round(((thisYear - lastYear) / lastYear) * 100);
  if (pct === 0) return "You've spent the same as last year";
  const direction = pct > 0 ? "more" : "less";
  return `You've spent ${Math.abs(pct)}% ${direction} than last year`;
}

export function scopedVehicles(vehicles: Vehicle[], selectedId: string | "all"): Vehicle[] {
  if (selectedId === "all") return vehicles;
  const match = vehicles.filter((vehicle) => vehicle.id === selectedId);
  return match.length > 0 ? match : vehicles;
}

export function spendInYear(records: readonly RecordItem[], ids: readonly string[], year: number): number {
  return records.reduce((sum, record) => {
    if (!ids.includes(record.vehicleId)) return sum;
    if (!record.date.startsWith(String(year))) return sum;
    return sum + record.amount;
  }, 0);
}

function fuelsFor(records: readonly RecordItem[], vehicleId: string): FuelRecord[] {
  return records.filter((record): record is FuelRecord => record.kind === "fuel" && record.vehicleId === vehicleId);
}

export function averageForFuel(records: readonly RecordItem[], vehicleId: string, fuel: FuelType): number | null {
  const fills = fuelsFor(records, vehicleId).filter((record) => record.fuelType === fuel);
  const fulls = fills.filter((record) => record.fullTank && record.odometer != null).length;
  if (fulls < 2) return null;
  return averageLatestMileage(mileageReadings(fills));
}

export function averageForVehicles(vehicles: readonly Vehicle[], records: readonly RecordItem[]): number | null {
  const fuels = [...new Set(vehicles.flatMap((vehicle) => vehicleFuels(vehicle)))];
  if (fuels.length !== 1) return null;
  const fuel = fuels[0];
  if (!fuel) return null;
  const averages: number[] = [];
  for (const vehicle of vehicles) {
    const average = averageForFuel(records, vehicle.id, fuel);
    if (average != null) averages.push(average);
  }
  if (averages.length === 0) return null;
  return averages.reduce((sum, value) => sum + value, 0) / averages.length;
}

function latestOf<T extends RecordItem>(records: readonly RecordItem[], kind: T["kind"], ids: readonly string[]): T | null {
  const matches = records.filter((record): record is T => record.kind === kind && ids.includes(record.vehicleId));
  matches.sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  return matches[0] ?? null;
}

export function lastFuel(records: readonly RecordItem[], vehicleId: string): FuelRecord | null {
  return latestOf<FuelRecord>(records, "fuel", [vehicleId]);
}

export type FuelStat = {
  fuel: FuelType;
  label: string;
  average: number | null;
  unit: string;
  spend: number;
};

export type HomeSnapshot = {
  ids: string[];
  spend: number;
  lastYearSpend: number;
  insight: string | null;
  ratio: number | null;
  lastFill: FuelRecord | null;
  lastService: ServiceRecord | null;
  fuels: FuelStat[];
  costPerKm: number | null;
};

export function homeSnapshot(
  vehicles: readonly Vehicle[],
  records: readonly RecordItem[],
  selectedId: string | "all",
  year: number,
): HomeSnapshot {
  const scoped = scopedVehicles([...vehicles], selectedId);
  const ids = scoped.map((vehicle) => vehicle.id);
  const spend = spendInYear(records, ids, year);
  const lastYearSpend = spendInYear(records, ids, year - 1);
  const active = scoped.length === 1 ? scoped[0] : null;
  return {
    ids,
    spend,
    lastYearSpend,
    insight: insightSentence(spend, lastYearSpend),
    ratio: lastYearSpend > 0 ? spend / lastYearSpend : null,
    lastFill: latestOf<FuelRecord>(records, "fuel", ids),
    lastService: latestOf<ServiceRecord>(records, "service", ids),
    fuels: active ? fuelStats(active, records, year) : [],
    costPerKm: costPerKm(records, ids, year),
  };
}

export function fuelStats(vehicle: Vehicle, records: readonly RecordItem[], year: number): FuelStat[] {
  return vehicleFuels(vehicle).map((fuel) => {
    const fills = fuelsFor(records, vehicle.id).filter((record) => record.fuelType === fuel);
    const spend = fills.reduce((sum, record) => (record.date.startsWith(String(year)) ? sum + record.amount : sum), 0);
    return {
      fuel,
      label: fuelLabel(fuel),
      average: averageForFuel(records, vehicle.id, fuel),
      unit: mileageUnit(fuel),
      spend,
    };
  });
}

export function costPerKm(records: readonly RecordItem[], ids: readonly string[], year: number): number | null {
  const fills = records.filter(
    (record): record is FuelRecord => record.kind === "fuel" && ids.includes(record.vehicleId) && record.date.startsWith(String(year)),
  );
  const odos = fills.flatMap((record) => (record.odometer == null ? [] : [record.odometer]));
  if (odos.length < 2) return null;
  const distance = Math.max(...odos) - Math.min(...odos);
  if (distance <= 0) return null;
  const spend = fills.reduce((sum, record) => sum + record.amount, 0);
  return spend / distance;
}

export function fuelSpend(records: readonly RecordItem[], year: number, vehicleId?: string): { fuel: FuelType; amount: number }[] {
  const totals = new Map<FuelType, number>();
  for (const record of records) {
    if (record.kind !== "fuel" || !record.date.startsWith(String(year))) continue;
    if (vehicleId && vehicleId !== "all" && record.vehicleId !== vehicleId) continue;
    totals.set(record.fuelType, (totals.get(record.fuelType) ?? 0) + record.amount);
  }
  return [...totals.entries()].map(([fuel, amount]) => ({ fuel, amount }));
}

export function categoryTotals(records: readonly RecordItem[], year: number) {
  const totals = { fuel: 0, part: 0, service: 0, insurance: 0 };
  for (const record of records) {
    if (!record.date.startsWith(String(year))) continue;
    totals[record.kind] += record.amount;
  }
  return totals;
}

export function yearsIn(records: readonly RecordItem[], todayYear: number): number[] {
  const years = new Set<number>([todayYear]);
  for (const record of records) {
    const year = Number(record.date.slice(0, 4));
    if (Number.isFinite(year) && year > 1990) years.add(year);
  }
  return [...years].sort((a, b) => b - a);
}

export function segmentForFill(records: readonly RecordItem[], vehicleId: string, fillId: string): number | null {
  const fill = records.find((record) => record.id === fillId);
  const fuel = fill && fill.kind === "fuel" ? fill.fuelType : null;
  const fills = fuelsFor(records, vehicleId).filter((record) => fuel == null || record.fuelType === fuel);
  return mileageReadings(fills).find((reading) => reading.fillId === fillId)?.kmPerUnit ?? null;
}
