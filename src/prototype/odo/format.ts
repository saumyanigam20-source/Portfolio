import type { FuelType, RecordItem, Vehicle } from "./types";

export function rupees(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
}

export function km(value: number): string {
  return `${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value)} km`;
}

export function oneDecimal(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) return iso;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function todayISO(now = new Date()): string {
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function addMonths(iso: string, months: number): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) return iso;
  const date = new Date(Number(match[1]), Number(match[2]) - 1 + months, Number(match[3]));
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function fuelLabel(fuel: FuelType): string {
  if (fuel === "cng") return "CNG";
  if (fuel === "lpg") return "LPG";
  if (fuel === "electric") return "Electric";
  if (fuel === "diesel") return "Diesel";
  return "Petrol";
}

export function quantityUnit(fuel: FuelType): "litres" | "kg" | "kWh" {
  if (fuel === "cng") return "kg";
  if (fuel === "electric") return "kWh";
  return "litres";
}

export function mileageUnit(fuel: FuelType): string {
  if (fuel === "cng") return "km/kg";
  if (fuel === "electric") return "km/kWh";
  return "km/l";
}

export function mileagePhrase(fuel: FuelType): string {
  if (fuel === "cng") return "km per kg";
  if (fuel === "electric") return "km per kWh";
  return "km per litre";
}

export function vehicleFuels(vehicle: Vehicle): FuelType[] {
  return vehicle.fuels?.length ? vehicle.fuels : [vehicle.fuelType];
}

export function vehicleTitle(vehicle: Vehicle): string {
  return [vehicle.make, vehicle.model, vehicle.variant].filter(Boolean).join(" ");
}

export function greeting(name: string, hour: number): string {
  const hello = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const trimmed = name.trim();
  return trimmed ? `${hello}, ${trimmed}` : hello;
}

export function deriveFuel(
  field: "quantity" | "price" | "amount",
  draft: { quantity: string; price: string; amount: string },
): { quantity: string; price: string; amount: string } {
  const quantity = parseNumber(draft.quantity);
  const price = parseNumber(draft.price);
  const amount = parseNumber(draft.amount);
  if (field === "quantity" && quantity != null && price != null) return { ...draft, amount: String(round2(quantity * price)) };
  if (field === "quantity" && quantity != null && quantity > 0 && amount != null) return { ...draft, price: String(round2(amount / quantity)) };
  if (field === "price" && price != null && quantity != null) return { ...draft, amount: String(round2(quantity * price)) };
  if (field === "price" && price != null && price > 0 && amount != null) return { ...draft, quantity: String(round2(amount / price)) };
  if (field === "amount" && amount != null && quantity != null && quantity > 0) return { ...draft, price: String(round2(amount / quantity)) };
  if (field === "amount" && amount != null && price != null && price > 0) return { ...draft, quantity: String(round2(amount / price)) };
  return draft;
}

export function averageTitle(fuels: FuelType[]): string {
  const unique = [...new Set(fuels)];
  if (unique.length !== 1) return "Mileage average";
  const fuel = unique[0];
  if (fuel === "diesel") return "Diesel average";
  if (fuel === "cng") return "CNG average";
  if (fuel === "lpg") return "LPG average";
  if (fuel === "electric") return "Electric average";
  return "Petrol average";
}

export function parseNumber(value: string): number | null {
  const cleaned = value.replace(/,/g, "").trim();
  if (!cleaned) return null;
  const number = Number(cleaned);
  return Number.isFinite(number) ? number : null;
}

export function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export function recordTitle(record: RecordItem): string {
  if (record.kind === "fuel") {
    return `${fuelLabel(record.fuelType)} · ${record.quantity} ${quantityUnit(record.fuelType)}`;
  }
  return record.name;
}

export function recordDetail(record: RecordItem, vehicle: Vehicle | undefined): string {
  const who = vehicle ? vehicleTitle(vehicle) : "Vehicle";
  if (record.kind === "fuel") {
    const tank = record.fullTank ? "Full tank" : "Part fill";
    const odo = record.odometer == null ? "No odometer" : km(record.odometer);
    return `${who} · ${tank} · ${odo}`;
  }
  if (record.kind === "insurance") return `${who} · ${record.brand}`;
  return `${who} · ${record.brand} · ${record.warrantyMonths} month warranty`;
}

export function toCsv(rows: string[][]): string {
  const body = rows
    .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(","))
    .join("\r\n");
  return `\uFEFF${body}`;
}

export function downloadText(filename: string, contents: string, mime = "text/csv;charset=utf-8") {
  const blob = new Blob([contents], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
