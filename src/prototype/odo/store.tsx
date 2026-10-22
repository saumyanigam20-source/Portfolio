"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { mileageUnit } from "./format";
import { createSample } from "./sample-data";
import { averageForVehicles, segmentForFill } from "./stats";
import { applyAppearance, clearAppearance, loadData, loadTheme, saveData, saveTheme, uid } from "./storage";
import type { ExpenseInput, FuelInput, RecordItem, Screen, ThemeMode, Vehicle, VehicleInput } from "./types";

type OdoStore = {
  ready: boolean;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  vehicles: Vehicle[];
  records: RecordItem[];
  screen: Screen;
  go: (screen: Screen) => void;
  selectedId: string | "all";
  setSelectedId: (id: string | "all") => void;
  plusOpen: boolean;
  setPlusOpen: (open: boolean) => void;
  toast: string | null;
  startSample: () => void;
  resetDemo: () => void;
  addVehicle: (input: VehicleInput) => void;
  addFuel: (input: FuelInput) => void;
  addExpense: (input: ExpenseInput) => void;
};

const OdoContext = createContext<OdoStore | null>(null);

export function useOdo(): OdoStore {
  const value = useContext(OdoContext);
  if (!value) throw new Error("useOdo must be used inside the prototype");
  return value;
}

export function OdoProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [theme, setThemeState] = useState<ThemeMode>("system");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [started, setStarted] = useState(false);
  const [screen, setScreen] = useState<Screen>({ name: "welcome" });
  const [selectedId, setSelectedId] = useState<string | "all">("all");
  const [plusOpen, setPlusOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useLayoutEffect(() => {
    const savedTheme = loadTheme();
    setThemeState(savedTheme);
    applyAppearance(savedTheme);
    const saved = loadData();
    if (saved?.started && saved.vehicles.length > 0) {
      setStarted(true);
      setVehicles(saved.vehicles);
      setRecords(saved.records);
      setSelectedId(saved.vehicles[0]?.id ?? "all");
      setScreen({ name: "home" });
    }
    setReady(true);
    return () => clearAppearance();
  }, []);

  useEffect(() => {
    if (theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyAppearance("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const persist = (nextVehicles: Vehicle[], nextRecords: RecordItem[], nextStarted = true) => {
    saveData({ started: nextStarted, vehicles: nextVehicles, records: nextRecords });
  };

  const value = useMemo<OdoStore>(() => {
    const setTheme = (next: ThemeMode) => {
      setThemeState(next);
      saveTheme(next);
      applyAppearance(next);
    };

    const go = (next: Screen) => {
      setPlusOpen(false);
      setScreen(next);
    };

    const loadSample = () => {
      const sample = createSample();
      setVehicles(sample.vehicles);
      setRecords(sample.records);
      setStarted(true);
      setSelectedId(sample.vehicles[0]?.id ?? "all");
      setPlusOpen(false);
      setToast(null);
      setScreen({ name: "home" });
      persist(sample.vehicles, sample.records);
    };

    return {
      ready,
      theme,
      setTheme,
      vehicles,
      records,
      screen,
      go,
      selectedId,
      setSelectedId,
      plusOpen,
      setPlusOpen,
      toast,
      startSample: loadSample,
      resetDemo: loadSample,
      addVehicle: (input) => {
        const vehicle: Vehicle = { id: uid("vehicle"), ...input };
        const nextVehicles = [...vehicles, vehicle];
        setVehicles(nextVehicles);
        setStarted(true);
        setSelectedId(vehicle.id);
        setScreen({ name: "home" });
        persist(nextVehicles, records, true);
      },
      addFuel: (input) => {
        const fuelId = uid("fuel");
        const nextRecords: RecordItem[] = [
          {
            id: fuelId,
            kind: "fuel",
            ...input,
          },
          ...records,
        ];
        const nextVehicles = vehicles.map((vehicle) =>
          vehicle.id === input.vehicleId && input.odometer != null && input.odometer > vehicle.odometer
            ? { ...vehicle, odometer: input.odometer }
            : vehicle,
        );
        setRecords(nextRecords);
        setVehicles(nextVehicles);
        persist(nextVehicles, nextRecords, started);
        const scoped = nextVehicles.filter((vehicle) => vehicle.id === input.vehicleId);
        go({
          name: "fuel-saved",
          segment: segmentForFill(nextRecords, input.vehicleId, fuelId),
          average: averageForVehicles(scoped, nextRecords),
          unit: mileageUnit(input.fuelType),
        });
      },
      addExpense: (input) => {
        const nextRecords: RecordItem[] = [
          {
            id: uid(input.recordKind),
            vehicleId: input.vehicleId,
            kind: input.recordKind,
            date: input.date,
            name: input.name,
            brand: input.brand,
            amount: input.amount,
            warrantyMonths: input.warrantyMonths,
            dueDate: input.dueDate,
          },
          ...records,
        ];
        setRecords(nextRecords);
        persist(vehicles, nextRecords, started);
        setToast(input.recordKind === "part" ? "Part saved" : "Service saved");
        go({ name: "home" });
      },
    };
  }, [plusOpen, ready, records, screen, selectedId, started, theme, toast, vehicles]);

  return <OdoContext.Provider value={value}>{children}</OdoContext.Provider>;
}
