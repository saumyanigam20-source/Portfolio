import type { FuelRecord, InsuranceRecord, PartRecord, RecordItem, ServiceRecord, Vehicle } from "./types";

const carId = "mint";
const scooterId = "zip";

function fuel(
  id: string,
  vehicleId: string,
  date: string,
  quantity: number,
  pricePerUnit: number,
  amount: number,
  odometer: number,
  fullTank: boolean,
): FuelRecord {
  return {
    id,
    vehicleId,
    kind: "fuel",
    date,
    fuelType: "petrol",
    quantity,
    pricePerUnit,
    amount,
    odometer,
    fullTank,
  };
}

function part(
  id: string,
  vehicleId: string,
  date: string,
  name: string,
  brand: string,
  amount: number,
  warrantyMonths: number,
  dueDate: string,
): PartRecord {
  return { id, vehicleId, kind: "part", date, name, brand, amount, warrantyMonths, dueDate };
}

function service(
  id: string,
  vehicleId: string,
  date: string,
  name: string,
  brand: string,
  amount: number,
  warrantyMonths: number,
  dueDate: string,
): ServiceRecord {
  return { id, vehicleId, kind: "service", date, name, brand, amount, warrantyMonths, dueDate };
}

function insurance(
  id: string,
  vehicleId: string,
  date: string,
  name: string,
  brand: string,
  amount: number,
): InsuranceRecord {
  return { id, vehicleId, kind: "insurance", date, name, brand, amount };
}

const vehicles: Vehicle[] = [
  {
    id: carId,
    kind: "car",
    nickname: "Mint",
    make: "Maruti",
    model: "Wagon R",
    fuelType: "petrol",
    odometer: 23980,
  },
  {
    id: scooterId,
    kind: "scooter",
    nickname: "Zip",
    make: "Honda",
    model: "Dio",
    fuelType: "petrol",
    odometer: 9120,
  },
];

const records: RecordItem[] = [
  fuel("f-m-01", carId, "2025-08-14", 32, 103, 3296, 18000, true),
  fuel("f-m-02", carId, "2025-09-02", 5, 100, 500, 18220, false),
  fuel("f-m-03", carId, "2025-09-22", 30, 103, 3090, 18542, true),
  fuel("f-m-04", carId, "2025-10-12", 10, 100, 1000, 18800, false),
  service("s-m-01", carId, "2025-10-05", "Oil and filter", "Bosch", 2400, 6, "2026-04-05"),
  fuel("f-m-05", carId, "2025-11-02", 31, 103, 3193, 19142, true),
  part("p-m-01", carId, "2025-11-12", "Battery", "Exide", 5400, 24, "2027-11-12"),
  fuel("f-m-06", carId, "2025-11-20", 5, 100, 500, 19320, false),
  fuel("f-m-07", carId, "2025-12-14", 29, 103, 2987, 19672, true),
  fuel("f-m-08", carId, "2026-01-08", 10, 100, 1000, 19900, false),
  insurance("i-m-01", carId, "2026-01-15", "Insurance renewal", "National", 9200),
  fuel("f-m-09", carId, "2026-01-30", 33, 103, 3399, 20342, true),
  fuel("f-m-10", carId, "2026-02-18", 5, 100, 500, 20540, false),
  part("p-m-02", carId, "2026-03-02", "Rear tyre", "MRF", 3200, 18, "2027-09-02"),
  fuel("f-m-11", carId, "2026-03-12", 30, 103, 3090, 20902, true),
  fuel("f-m-12", carId, "2026-04-04", 10, 100, 1000, 21140, false),
  service("s-m-02", carId, "2026-04-10", "Periodic service", "Maruti", 3800, 6, "2026-10-10"),
  fuel("f-m-13", carId, "2026-04-28", 32, 103, 3296, 21522, true),
  fuel("f-m-14", carId, "2026-05-16", 5, 100, 500, 21700, false),
  fuel("f-m-15", carId, "2026-06-08", 28, 103, 2884, 22034, true),
  fuel("f-m-16", carId, "2026-07-01", 10, 100, 1000, 22280, false),
  fuel("f-m-17", carId, "2026-07-26", 30, 103, 3090, 22654, true),
  fuel("f-m-18", carId, "2026-08-14", 5, 100, 500, 22820, false),
  fuel("f-m-19", carId, "2026-09-06", 31, 103, 3193, 23212, true),
  fuel("f-m-20", carId, "2026-09-22", 10, 100, 1000, 23440, false),
  fuel("f-m-21", carId, "2026-10-08", 29, 103, 2987, 23832, true),
  fuel("f-m-22", carId, "2026-10-18", 5, 100, 500, 23980, false),

  fuel("f-z-01", scooterId, "2025-08-20", 5, 103, 515, 6400, true),
  fuel("f-z-02", scooterId, "2025-09-15", 5, 100, 500, 6550, false),
  fuel("f-z-03", scooterId, "2025-10-10", 5, 103, 515, 6820, true),
  fuel("f-z-04", scooterId, "2025-11-12", 10, 100, 1000, 7000, false),
  fuel("f-z-05", scooterId, "2025-12-20", 5.5, 103, 567, 7471, true),
  fuel("f-z-06", scooterId, "2026-02-02", 5, 100, 500, 7620, false),
  fuel("f-z-07", scooterId, "2026-03-01", 5, 103, 515, 7891, true),
  fuel("f-z-08", scooterId, "2026-04-18", 5, 100, 500, 8040, false),
  part("p-z-01", scooterId, "2026-05-02", "Drive belt", "Honda", 1800, 12, "2027-05-02"),
  fuel("f-z-09", scooterId, "2026-05-20", 5, 103, 515, 8311, true),
  service("s-z-01", scooterId, "2026-06-12", "General service", "Honda", 1600, 4, "2026-10-12"),
  fuel("f-z-10", scooterId, "2026-07-08", 10, 100, 1000, 8520, false),
  fuel("f-z-11", scooterId, "2026-08-16", 5.2, 103, 536, 8965, true),
  fuel("f-z-12", scooterId, "2026-10-02", 5, 100, 500, 9120, false),
];

export function createSample(): { vehicles: Vehicle[]; records: RecordItem[] } {
  return {
    vehicles: vehicles.map((vehicle) => ({ ...vehicle })),
    records: records.map((record) => ({ ...record })),
  };
}
