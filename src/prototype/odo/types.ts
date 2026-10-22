export type FuelType = "petrol" | "diesel" | "cng" | "lpg" | "electric";

export type VehicleKind = "car" | "bike" | "scooter" | "cab";

export type FuelSetup = "single" | "petrol-cng" | "petrol-lpg";

export type Vehicle = {
  id: string;
  kind: VehicleKind;
  nickname: string;
  make: string;
  model: string;
  variant?: string;
  fuelType: FuelType;
  fuels?: FuelType[];
  fuelSetup?: FuelSetup;
  plate?: string;
  plateDisplay?: string;
  purchaseYear?: number | null;
  odometer: number;
};

export type FuelRecord = {
  id: string;
  vehicleId: string;
  kind: "fuel";
  date: string;
  fuelType: FuelType;
  quantity: number;
  pricePerUnit: number;
  amount: number;
  odometer: number | null;
  fullTank: boolean;
};

export type PartRecord = {
  id: string;
  vehicleId: string;
  kind: "part";
  date: string;
  name: string;
  brand: string;
  amount: number;
  warrantyMonths: number;
  dueDate: string;
};

export type ServiceRecord = {
  id: string;
  vehicleId: string;
  kind: "service";
  date: string;
  name: string;
  brand: string;
  amount: number;
  warrantyMonths: number;
  dueDate: string;
};

export type InsuranceRecord = {
  id: string;
  vehicleId: string;
  kind: "insurance";
  date: string;
  name: string;
  brand: string;
  amount: number;
};

export type RecordItem = FuelRecord | PartRecord | ServiceRecord | InsuranceRecord;

export type ThemeMode = "light" | "dark" | "system";

export type Screen =
  | { name: "welcome" }
  | { name: "add-vehicle"; returnTo: "welcome" | "profile" | "home" }
  | { name: "home" }
  | { name: "timeline" }
  | { name: "report" }
  | { name: "profile" }
  | { name: "add-fuel" }
  | { name: "add-record"; recordKind: "part" | "service" }
  | { name: "fuel-saved"; segment: number | null; average: number | null; unit: string };

export type VehicleInput = {
  kind: VehicleKind;
  nickname: string;
  make: string;
  model: string;
  variant: string;
  fuelType: FuelType;
  fuels: FuelType[];
  fuelSetup: FuelSetup;
  plate: string;
  plateDisplay: string;
  purchaseYear: number | null;
  odometer: number;
};

export type FuelInput = {
  vehicleId: string;
  date: string;
  fuelType: FuelType;
  quantity: number;
  pricePerUnit: number;
  amount: number;
  odometer: number | null;
  fullTank: boolean;
};

export type ExpenseInput = {
  vehicleId: string;
  recordKind: "part" | "service";
  date: string;
  name: string;
  brand: string;
  amount: number;
  warrantyMonths: number;
  dueDate: string;
};
