import type { FuelType } from "./types";

export type CatalogVariant = { name: string; fuels: FuelType[] };
export type CatalogModel = { name: string; popular?: boolean; variants: CatalogVariant[] };
export type CatalogMake = { name: string; popular?: boolean; models: CatalogModel[] };

const petrol = (name: string): CatalogVariant => ({ name, fuels: ["petrol"] });
const diesel = (name: string): CatalogVariant => ({ name, fuels: ["diesel"] });
const cng = (name: string): CatalogVariant => ({ name, fuels: ["petrol", "cng"] });
const electric = (name: string): CatalogVariant => ({ name, fuels: ["electric"] });

/** Commonly owned Indian cars, bikes and scooters. Add a make, model or variant in this file. */
export const catalog: Record<"car" | "bike" | "scooter", CatalogMake[]> = {
  car: [
    {
      name: "Maruti",
      popular: true,
      models: [
        { name: "Wagon R", popular: true, variants: [petrol("LXI"), cng("VXI CNG"), petrol("ZXI")] },
        { name: "Swift", popular: true, variants: [petrol("LXI"), petrol("ZXI")] },
        { name: "Dzire", popular: true, variants: [petrol("VXI"), cng("VXI CNG")] },
        { name: "Alto", variants: [petrol("LXI")] },
        { name: "Brezza", variants: [petrol("ZXI")] },
        { name: "Ertiga", variants: [petrol("VXI"), cng("ZXI CNG")] },
      ],
    },
    {
      name: "Hyundai",
      popular: true,
      models: [
        { name: "i20", popular: true, variants: [petrol("Sportz"), petrol("Asta")] },
        { name: "Creta", popular: true, variants: [petrol("SX"), diesel("SX Diesel")] },
        { name: "Venue", variants: [petrol("S")] },
      ],
    },
    {
      name: "Tata",
      popular: true,
      models: [
        { name: "Nexon", popular: true, variants: [petrol("Smart"), diesel("Creative")] },
        { name: "Punch", variants: [petrol("Adventure")] },
        { name: "Tiago", variants: [petrol("XT"), cng("XZ CNG")] },
      ],
    },
    { name: "Honda", models: [{ name: "City", variants: [petrol("VX")] }, { name: "Amaze", variants: [petrol("VX"), cng("VX CNG")] }] },
    { name: "Toyota", models: [{ name: "Innova Crysta", variants: [diesel("GX")] }, { name: "Glanza", variants: [petrol("S")] }] },
    { name: "Mahindra", models: [{ name: "XUV700", variants: [diesel("AX7")] }, { name: "Scorpio N", variants: [diesel("Z8")] }] },
    { name: "Kia", models: [{ name: "Seltos", variants: [petrol("HTX")] }] },
  ],
  bike: [
    { name: "Hero", popular: true, models: [{ name: "Splendor Plus", popular: true, variants: [petrol("Drum")] }, { name: "HF Deluxe", variants: [petrol("Drum")] }] },
    { name: "Honda", popular: true, models: [{ name: "Shine", popular: true, variants: [petrol("Drum")] }, { name: "SP 125", variants: [petrol("Disc")] }] },
    { name: "Bajaj", popular: true, models: [{ name: "Pulsar 150", popular: true, variants: [petrol("Twin disc")] }, { name: "Platina", variants: [petrol("Drum")] }] },
    { name: "TVS", models: [{ name: "Apache RTR 160", variants: [petrol("Disc")] }, { name: "Raider", variants: [petrol("Disc")] }] },
    { name: "Royal Enfield", models: [{ name: "Classic 350", variants: [petrol("Halcyon")] }, { name: "Hunter 350", variants: [petrol("Retro")] }] },
    { name: "Yamaha", models: [{ name: "FZ-S", variants: [petrol("Fi")] }, { name: "R15", variants: [petrol("M")] }] },
  ],
  scooter: [
    { name: "Honda", popular: true, models: [{ name: "Activa", popular: true, variants: [petrol("6G")] }, { name: "Dio", popular: true, variants: [petrol("STD")] }] },
    { name: "TVS", popular: true, models: [{ name: "Jupiter", popular: true, variants: [petrol("ZX")] }, { name: "Ntorq", variants: [petrol("XT")] }] },
    { name: "Suzuki", models: [{ name: "Access", variants: [petrol("125")] }, { name: "Burgman", variants: [petrol("Street")] }] },
    { name: "Hero", models: [{ name: "Pleasure Plus", variants: [petrol("VX")] }, { name: "Destini", variants: [petrol("125")] }] },
    { name: "Bajaj", models: [{ name: "Chetak", variants: [electric("Premium")] }] },
  ],
};

export function makesFor(kind: "car" | "bike" | "scooter" | "cab"): CatalogMake[] {
  return catalog[kind === "cab" ? "car" : kind];
}

export function sortNamed<T extends { name: string; popular?: boolean }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => Number(Boolean(b.popular)) - Number(Boolean(a.popular)) || a.name.localeCompare(b.name));
}
