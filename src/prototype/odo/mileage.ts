export type MileageFill = {
  id: string;
  date: string;
  quantity: number;
  odometer: number | null;
  fullTank: boolean;
};

export type MileageReading = {
  fillId: string;
  date: string;
  distance: number;
  fuel: number;
  kmPerUnit: number;
};

function byTrip(a: MileageFill, b: MileageFill) {
  const byDate = a.date.localeCompare(b.date);
  if (byDate !== 0) return byDate;
  const aOdo = a.odometer ?? Number.POSITIVE_INFINITY;
  const bOdo = b.odometer ?? Number.POSITIVE_INFINITY;
  return aOdo - bOdo;
}

/** Mileage between full tanks. Fuel is every fill after the previous full tank, including this one. */
export function mileageReadings(fills: readonly MileageFill[]): MileageReading[] {
  const sorted = [...fills].sort(byTrip);
  const readings: MileageReading[] = [];
  let previousFull = -1;

  for (let index = 0; index < sorted.length; index += 1) {
    const fill = sorted[index];
    if (!fill.fullTank || fill.odometer == null) continue;

    if (previousFull === -1) {
      previousFull = index;
      continue;
    }

    const priorOdometer = sorted[previousFull]?.odometer;
    if (priorOdometer == null) {
      previousFull = index;
      continue;
    }

    const distance = fill.odometer - priorOdometer;
    let fuel = 0;
    for (let cursor = previousFull + 1; cursor <= index; cursor += 1) {
      fuel += sorted[cursor]?.quantity ?? 0;
    }

    if (distance > 0 && fuel > 0) {
      readings.push({
        fillId: fill.id,
        date: fill.date,
        distance,
        fuel,
        kmPerUnit: distance / fuel,
      });
    }

    previousFull = index;
  }

  return readings;
}

export function mileageForFuel<T extends MileageFill & { fuelType: string }>(fills: readonly T[], fuelType: string): MileageReading[] {
  return mileageReadings(fills.filter((fill) => fill.fuelType === fuelType));
}

export function averageLatestMileage(readings: readonly MileageReading[], count = 3): number | null {
  if (readings.length === 0) return null;
  const latest = readings.slice(-count);
  const total = latest.reduce((sum, reading) => sum + reading.kmPerUnit, 0);
  return total / latest.length;
}
