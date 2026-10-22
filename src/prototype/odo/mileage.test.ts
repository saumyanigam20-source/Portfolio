import { describe, expect, it } from "vitest";
import { averageLatestMileage, mileageForFuel, mileageReadings } from "./mileage";
import { createSample } from "./sample-data";
import { costPerKm, insightSentence } from "./stats";
import type { FuelRecord } from "./types";

describe("mileageReadings", () => {
  it("returns 25 km/l when a 5 L fill sits between full tanks at 10,000 km and 10,300 km", () => {
    const readings = mileageReadings([
      { id: "a", date: "2026-01-01", quantity: 40, odometer: 10000, fullTank: true },
      { id: "b", date: "2026-01-05", quantity: 5, odometer: 10150, fullTank: false },
      { id: "c", date: "2026-01-10", quantity: 7, odometer: 10300, fullTank: true },
    ]);

    expect(readings).toHaveLength(1);
    expect(readings[0]).toMatchObject({ fillId: "c", distance: 300, fuel: 12, kmPerUnit: 25 });
    expect(averageLatestMileage(readings)).toBe(25);
  });

  it("still counts a fill that has no odometer", () => {
    const readings = mileageReadings([
      { id: "a", date: "2026-01-01", quantity: 40, odometer: 10000, fullTank: true },
      { id: "b", date: "2026-01-05", quantity: 5, odometer: null, fullTank: false },
      { id: "c", date: "2026-01-10", quantity: 7, odometer: 10300, fullTank: true },
    ]);

    expect(readings[0]?.kmPerUnit).toBe(25);
  });

  it("skips a full tank that has no odometer and keeps the earlier baseline", () => {
    const readings = mileageReadings([
      { id: "a", date: "2026-01-01", quantity: 10, odometer: 1000, fullTank: true },
      { id: "b", date: "2026-01-02", quantity: 4, odometer: null, fullTank: true },
      { id: "c", date: "2026-01-03", quantity: 6, odometer: 1300, fullTank: true },
    ]);

    expect(readings).toHaveLength(1);
    expect(readings[0]).toMatchObject({ distance: 300, fuel: 10, kmPerUnit: 30 });
  });

  it("sorts by date before measuring", () => {
    const readings = mileageReadings([
      { id: "c", date: "2026-01-10", quantity: 7, odometer: 10300, fullTank: true },
      { id: "a", date: "2026-01-01", quantity: 40, odometer: 10000, fullTank: true },
      { id: "b", date: "2026-01-05", quantity: 5, odometer: 10150, fullTank: false },
    ]);

    expect(readings[0]?.kmPerUnit).toBe(25);
  });

  it("does not invent a reading for the first full tank", () => {
    const readings = mileageReadings([
      { id: "a", date: "2026-01-01", quantity: 30, odometer: 10000, fullTank: true },
    ]);
    expect(readings).toEqual([]);
    expect(averageLatestMileage(readings)).toBeNull();
  });

  it("averages only the latest three readings", () => {
    const average = averageLatestMileage([
      { fillId: "1", date: "2026-01-01", distance: 10, fuel: 1, kmPerUnit: 10 },
      { fillId: "2", date: "2026-02-01", distance: 20, fuel: 1, kmPerUnit: 20 },
      { fillId: "3", date: "2026-03-01", distance: 30, fuel: 1, kmPerUnit: 30 },
      { fillId: "4", date: "2026-04-01", distance: 40, fuel: 1, kmPerUnit: 40 },
    ]);
    expect(average).toBe(30);
  });
});

describe("sample data", () => {
  const sample = createSample();

  it("has one petrol hatchback and one petrol scooter across 2025 and 2026", () => {
    expect(sample.vehicles.map((vehicle) => vehicle.kind).sort()).toEqual(["car", "scooter"]);
    expect(sample.vehicles.every((vehicle) => vehicle.fuelType === "petrol")).toBe(true);
    expect(sample.vehicles.find((vehicle) => vehicle.id === "mint")?.fuels).toEqual(["petrol", "cng"]);

    const dates = sample.records.map((record) => record.date).sort();
    expect(dates[0]?.startsWith("2025-08")).toBe(true);
    expect(dates.at(-1)?.startsWith("2026-10")).toBe(true);
  });

  it("mixes full tanks with 500 and 1000 rupee part fills, plus parts, services and insurance", () => {
    const fuels = sample.records.filter((record): record is FuelRecord => record.kind === "fuel");
    const partials = fuels.filter((record) => !record.fullTank);
    expect(fuels.some((record) => record.fullTank)).toBe(true);
    expect(partials.length).toBeGreaterThan(0);
    expect(partials.every((record) => record.amount === 500 || record.amount === 1000)).toBe(true);
    expect(sample.records.filter((record) => record.kind === "part")).toHaveLength(3);
    expect(sample.records.filter((record) => record.kind === "service").length).toBeGreaterThanOrEqual(2);
    expect(sample.records.filter((record) => record.kind === "service").length).toBeLessThanOrEqual(3);
    expect(sample.records.filter((record) => record.kind === "insurance")).toHaveLength(1);
  });

  it("keeps each vehicle's odometer moving forward and produces a mileage", () => {
    for (const vehicle of sample.vehicles) {
      const fills = sample.records
        .filter(
          (record): record is FuelRecord =>
            record.kind === "fuel" && record.vehicleId === vehicle.id && record.odometer != null,
        )
        .sort((a, b) => a.date.localeCompare(b.date));
      for (let index = 1; index < fills.length; index += 1) {
        expect(fills[index]?.odometer ?? 0).toBeGreaterThan(fills[index - 1]?.odometer ?? 0);
      }
      const fuelTypes = vehicle.fuels ?? [vehicle.fuelType];
      for (const fuelType of fuelTypes) {
        const readings = mileageForFuel(fills, fuelType);
        const average = averageLatestMileage(readings);
        expect(average).not.toBeNull();
        expect(average ?? 0).toBeGreaterThan(10);
        expect(average ?? 0).toBeLessThan(60);
      }
    }
  });
});

function fill(id: string, date: string, fuelType: FuelRecord["fuelType"], quantity: number, amount: number, odometer: number | null, fullTank: boolean): FuelRecord {
  return { id, vehicleId: "v", kind: "fuel", date, fuelType, quantity, pricePerUnit: 100, amount, odometer, fullTank };
}

describe("mileage by fuel", () => {
  const fills = [
    fill("p1", "2026-01-01", "petrol", 10, 1000, 10000, true),
    fill("c1", "2026-01-02", "cng", 5, 450, 10050, true),
    fill("p2", "2026-01-04", "petrol", 2, 200, 10100, false),
    fill("c2", "2026-01-05", "cng", 1, 90, 10120, false),
    fill("p3", "2026-01-08", "petrol", 8, 800, 10300, true),
    fill("c3", "2026-01-10", "cng", 4, 360, 10400, true),
  ];

  it("keeps a single fuel on its own tank", () => {
    const readings = mileageForFuel(fills.filter((item) => item.fuelType === "petrol"), "petrol");
    expect(readings).toHaveLength(1);
    expect(readings[0]).toMatchObject({ distance: 300, fuel: 10, kmPerUnit: 30 });
  });

  it("does not mix interleaved fills of the other fuel", () => {
    const petrol = mileageForFuel(fills, "petrol");
    const cng = mileageForFuel(fills, "cng");
    expect(petrol[0]).toMatchObject({ fuel: 10, kmPerUnit: 30 });
    expect(cng[0]).toMatchObject({ distance: 350, fuel: 5, kmPerUnit: 70 });
    expect(petrol[0]?.fuel).not.toBe(cng[0]?.fuel);
  });

  it("adds part fills that sit between two full fills of the same fuel", () => {
    expect(mileageForFuel(fills, "petrol")[0]?.fuel).toBe(2 + 8);
    expect(mileageForFuel(fills, "cng")[0]?.fuel).toBe(1 + 4);
  });

  it("returns no mileage from a single full fill", () => {
    expect(mileageForFuel([fill("only", "2026-02-01", "lpg", 6, 500, 5000, true)], "lpg")).toEqual([]);
  });

  it("returns no mileage when a fuel has no fills", () => {
    expect(mileageForFuel(fills, "diesel")).toEqual([]);
    expect(mileageForFuel([], "petrol")).toEqual([]);
  });

  it("divides every fuel's spend by the kilometres in the period", () => {
    expect(costPerKm(fills, ["v"], 2026)).toBeCloseTo(2900 / 400);
    expect(costPerKm([fill("one", "2026-03-01", "petrol", 10, 1000, 1000, true)], ["v"], 2026)).toBeNull();
    expect(costPerKm([], ["v"], 2026)).toBeNull();
  });
});

describe("insightSentence", () => {
  it("says more, less, or nothing when last year was zero", () => {
    expect(insightSentence(110, 100)).toBe("You've spent 10% more than last year");
    expect(insightSentence(90, 100)).toBe("You've spent 10% less than last year");
    expect(insightSentence(50, 0)).toBeNull();
  });
});
