import { averageTitle, mileagePhrase, mileageUnit } from "./format";
import { averageLatestMileage, mileageReadings } from "./mileage";
import type { FuelRecord, FuelType, RecordItem, ServiceRecord, Vehicle, VehicleKind } from "./types";

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

export function averageForVehicles(vehicles: readonly Vehicle[], records: readonly RecordItem[]): number | null {
  const averages: number[] = [];
  for (const vehicle of vehicles) {
    const readings = mileageReadings(fuelsFor(records, vehicle.id));
    const average = averageLatestMileage(readings);
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

export type HomeSnapshot = {
  ids: string[];
  title: string;
  phrase: string;
  unit: string;
  average: number | null;
  spend: number;
  lastYearSpend: number;
  insight: string | null;
  ratio: number | null;
  lastFill: FuelRecord | null;
  lastService: ServiceRecord | null;
  art: VehicleKind | "both";
};

export function homeSnapshot(
  vehicles: readonly Vehicle[],
  records: readonly RecordItem[],
  selectedId: string | "all",
  year: number,
): HomeSnapshot {
  const scoped = scopedVehicles([...vehicles], selectedId);
  const ids = scoped.map((vehicle) => vehicle.id);
  const fuels = [...new Set(scoped.map((vehicle) => vehicle.fuelType))] as FuelType[];
  const representative = fuels.length === 1 ? fuels[0] : "petrol";
  const spend = spendInYear(records, ids, year);
  const lastYearSpend = spendInYear(records, ids, year - 1);
  return {
    ids,
    title: averageTitle(fuels),
    phrase: fuels.length === 1 ? mileagePhrase(representative) : "km per unit",
    unit: fuels.length === 1 ? mileageUnit(representative) : "km/unit",
    average: averageForVehicles(scoped, records),
    spend,
    lastYearSpend,
    insight: insightSentence(spend, lastYearSpend),
    ratio: lastYearSpend > 0 ? spend / lastYearSpend : null,
    lastFill: latestOf<FuelRecord>(records, "fuel", ids),
    lastService: latestOf<ServiceRecord>(records, "service", ids),
    art: scoped.length === 1 ? scoped[0].kind : "both",
  };
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
  const readings = mileageReadings(fuelsFor(records, vehicleId));
  return readings.find((reading) => reading.fillId === fillId)?.kmPerUnit ?? null;
}
