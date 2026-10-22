"use client";

import { useEffect, useMemo, useState } from "react";
import { makesFor, sortNamed, type CatalogMake, type CatalogModel, type CatalogVariant } from "../catalog";
import { fuelLabel } from "../format";
import { formatPlate, type PlateResult } from "../plate";
import { useOdo } from "../store";
import type { FuelSetup, FuelType, VehicleKind } from "../types";
import { Field } from "../ui/Field";
import { PlatePreview } from "../ui/PlatePreview";
import { ScreenHeader } from "../ui/ScreenHeader";
import { VehicleIcon } from "../ui/VehicleIcon";
import { prefersReducedMotion } from "../ui/motion";

const kinds: { id: VehicleKind; label: string }[] = [
  { id: "car", label: "Car" },
  { id: "bike", label: "Bike" },
  { id: "scooter", label: "Scooter" },
  { id: "cab", label: "Cab" },
];

const setups: { id: FuelSetup; label: string; note: string }[] = [
  { id: "single", label: "Single fuel", note: "One fuel, as the vehicle came" },
  { id: "petrol-cng", label: "Petrol + CNG", note: "Bi-fuel, factory or a fitted kit" },
  { id: "petrol-lpg", label: "Petrol + LPG", note: "Bi-fuel, factory or a fitted kit" },
];

const fuelChoices: FuelType[] = ["petrol", "diesel", "cng", "lpg", "electric"];
const steps = ["type", "make", "fuel", "plate", "details"] as const;
type Step = (typeof steps)[number] | "done";

function matches(name: string, query: string): boolean {
  const q = query.trim().toLowerCase();
  return !q || name.toLowerCase().includes(q);
}

function setupFor(fuels: FuelType[]): FuelSetup {
  if (fuels.includes("petrol") && fuels.includes("cng")) return "petrol-cng";
  if (fuels.includes("petrol") && fuels.includes("lpg")) return "petrol-lpg";
  return "single";
}

export function AddVehicleScreen() {
  const { go, addVehicle, vehicles, screen } = useOdo();
  const backTo = screen.name === "add-vehicle" ? screen.returnTo : "home";
  const [step, setStep] = useState<Step>("type");
  const [kind, setKind] = useState<VehicleKind>("car");
  const [query, setQuery] = useState("");
  const [make, setMake] = useState<CatalogMake | null>(null);
  const [model, setModel] = useState<CatalogModel | null>(null);
  const [variant, setVariant] = useState<CatalogVariant | null>(null);
  const [custom, setCustom] = useState(false);
  const [customMake, setCustomMake] = useState("");
  const [customModel, setCustomModel] = useState("");
  const [customFuel, setCustomFuel] = useState<FuelType>("petrol");
  const [setup, setSetup] = useState<FuelSetup>("single");
  const [plate, setPlate] = useState<PlateResult>(() => formatPlate(""));
  const [odo, setOdo] = useState("");
  const [year, setYear] = useState("");
  const [savedTitle, setSavedTitle] = useState("");

  const makes = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sortNamed(makesFor(kind)).filter((item) => {
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.models.some((entry) => entry.name.toLowerCase().includes(q) || entry.variants.some((option) => option.name.toLowerCase().includes(q)))
      );
    });
  }, [kind, query]);

  const yearNumber = year.trim() ? Number(year) : null;
  const yearBad = yearNumber != null && (!Number.isInteger(yearNumber) || yearNumber < 1980 || yearNumber > new Date().getFullYear() + 1);
  const odoNumber = odo.trim() ? Number(odo) : null;
  const odoBad = odoNumber != null && (!Number.isFinite(odoNumber) || odoNumber < 0);
  const stepIndex = steps.indexOf(step === "done" ? "details" : step);

  useEffect(() => {
    if (step !== "done") return;
    const timer = window.setTimeout(() => go({ name: "home" }), prefersReducedMotion() ? 400 : 1200);
    return () => window.clearTimeout(timer);
  }, [go, step]);

  const leave = () => {
    if (vehicles.length === 0 && backTo !== "profile") return;
    go({ name: backTo === "welcome" ? "home" : backTo });
  };

  const back = () => {
    if (step === "done") {
      go({ name: "home" });
      return;
    }
    if (step === "make") {
      if (custom) {
        setCustom(false);
        return;
      }
      if (variant) {
        setVariant(null);
        return;
      }
      if (model) {
        setModel(null);
        return;
      }
      if (make) {
        setMake(null);
        setQuery("");
        return;
      }
      setStep("type");
      return;
    }
    const index = steps.indexOf(step);
    if (index <= 0) leave();
    else setStep(steps[index - 1] ?? "type");
  };

  const primaryFuel = variant?.fuels[0] ?? customFuel;
  const fuels: FuelType[] = setup === "petrol-cng" ? ["petrol", "cng"] : setup === "petrol-lpg" ? ["petrol", "lpg"] : [primaryFuel];
  const titleMake = custom ? customMake.trim() : make?.name ?? "";
  const titleModel = custom ? customModel.trim() : model?.name ?? "";
  const titleVariant = custom ? "" : variant?.name ?? "";
  const canMake = custom ? Boolean(customMake.trim() && customModel.trim()) : Boolean(variant);

  const save = () => {
    if (!plate.valid || yearBad || odoBad || !titleMake || !titleModel) return;
    const title = [titleMake, titleModel, titleVariant].filter(Boolean).join(" ");
    addVehicle({
      kind,
      nickname: `${titleMake} ${titleModel}`,
      make: titleMake,
      model: titleModel,
      variant: titleVariant,
      fuelType: fuels[0] ?? "petrol",
      fuels,
      fuelSetup: setup,
      plate: plate.normalised,
      plateDisplay: plate.display,
      purchaseYear: yearNumber,
      odometer: odoNumber ?? 0,
    });
    setSavedTitle(title);
    setStep("done");
  };

  const next = () => {
    if (step === "type") setStep("make");
    else if (step === "make" && canMake) setStep("fuel");
    else if (step === "fuel") setStep("plate");
    else if (step === "plate" && plate.valid) setStep("details");
    else if (step === "details") save();
  };

  const primaryDisabled =
    (step === "make" && !canMake) || (step === "plate" && !plate.valid) || (step === "details" && (yearBad || odoBad));

  if (step === "done") {
    return (
      <div className="odo-form-screen">
        <div className="odo-scroll odo-success">
          <VehicleIcon type={kind} size={48} label={savedTitle} />
          <h1>Vehicle added</h1>
          <p className="odo-strong">{savedTitle}</p>
          <PlatePreview display={plate.display} kind={kind} />
        </div>
        <div className="odo-savebar">
          <button type="button" className="odo-btn" onClick={() => go({ name: "home" })}>
            Go to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="odo-form-screen"
      onSubmit={(event) => {
        event.preventDefault();
        next();
      }}
    >
      <ScreenHeader title="Add vehicle" onBack={back} />
      <div className="odo-scroll odo-form">
        <ol className="odo-steps" aria-label={`Step ${stepIndex + 1} of ${steps.length}`}>
          {steps.map((item, index) => (
            <li key={item} className={index <= stepIndex ? "is-on" : undefined} />
          ))}
        </ol>
        <p className="odo-muted">
          Step {stepIndex + 1} of {steps.length}
        </p>
        {step === "type" && (
          <div className="odo-type-grid">
            {kinds.map((item) => (
              <button
                key={item.id}
                type="button"
                className="odo-type-card"
                aria-pressed={kind === item.id}
                onClick={() => {
                  setKind(item.id);
                  setMake(null);
                  setModel(null);
                  setVariant(null);
                  setQuery("");
                }}
              >
                <VehicleIcon type={item.id} size={48} label={item.label} />
                <span>{item.label}</span>
                {item.id === "cab" && <span className="odo-muted">Commercial</span>}
              </button>
            ))}
          </div>
        )}
        {step === "make" && !custom && (
          <>
            <label className="odo-field">
              <span className="odo-sr">Search</span>
              <input
                type="search"
                value={query}
                placeholder={make ? "Search models" : "Search makes"}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") event.preventDefault();
                }}
              />
            </label>
            {make && (
              <p className="odo-muted">
                {make.name}
                {model ? ` · ${model.name}` : ""}
              </p>
            )}
            {!make && <PickList popular={makes.filter((item) => item.popular)} rest={makes.filter((item) => !item.popular)} onPick={(item) => { setMake(item); setQuery(""); }} />}
            {make && !model && (
              <PickList
                popular={sortNamed(make.models).filter((item) => item.popular && matches(item.name, query))}
                rest={sortNamed(make.models).filter((item) => !item.popular && matches(item.name, query))}
                onPick={(item) => {
                  setModel(item);
                  setQuery("");
                }}
              />
            )}
            {model && (
              <ul className="odo-pick">
                {model.variants
                  .filter((item) => !query.trim() || item.name.toLowerCase().includes(query.trim().toLowerCase()))
                  .map((item) => (
                    <li key={item.name}>
                      <button
                        type="button"
                        aria-pressed={variant?.name === item.name}
                        onClick={() => {
                          setVariant(item);
                          setSetup(setupFor(item.fuels));
                        }}
                      >
                        <span>{item.name}</span>
                        <span className="odo-muted">{item.fuels.map((fuel) => fuelLabel(fuel)).join(" · ")}</span>
                      </button>
                    </li>
                  ))}
              </ul>
            )}
            <button
              type="button"
              className="odo-text-btn"
              onClick={() => {
                setCustom(true);
                setVariant(null);
                setSetup("single");
              }}
            >
              My vehicle isn&apos;t listed
            </button>
          </>
        )}
        {step === "make" && custom && (
          <>
            <Field label="Make">
              <input value={customMake} onChange={(event) => setCustomMake(event.target.value)} maxLength={32} />
            </Field>
            <Field label="Model">
              <input value={customModel} onChange={(event) => setCustomModel(event.target.value)} maxLength={32} />
            </Field>
            <div className="odo-field">
              <span>Fuel type</span>
              <div className="odo-pills" role="group" aria-label="Fuel type">
                {fuelChoices.map((item) => (
                  <button key={item} type="button" className="odo-pill" aria-pressed={customFuel === item} onClick={() => setCustomFuel(item)}>
                    {fuelLabel(item)}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
        {step === "fuel" && (
          <div className="odo-choice-list" role="radiogroup" aria-label="Fuel setup">
            {setups.map((item) => (
              <button key={item.id} type="button" className="odo-choice" role="radio" aria-checked={setup === item.id} onClick={() => setSetup(item.id)}>
                <span>{item.label}</span>
                <span className="odo-muted">{item.note}</span>
              </button>
            ))}
            <p className="odo-hint">A gas kit can also be added later in vehicle settings. Many owners retrofit one.</p>
          </div>
        )}
        {step === "plate" && (
          <>
            <Field label="Number plate">
              <input
                value={plate.display}
                placeholder="XX 00 XX 0000"
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck={false}
                aria-invalid={Boolean(plate.error)}
                onChange={(event) => setPlate(formatPlate(event.target.value))}
              />
            </Field>
            {plate.error && (
              <p className="odo-error" role="alert">
                {plate.error}
              </p>
            )}
            <PlatePreview display={plate.display} kind={kind} />
            <p className="odo-hint">Your plate is stored on this device only.</p>
          </>
        )}
        {step === "details" && (
          <>
            <p className="odo-muted">Both are optional. Skip them if you don&apos;t have them handy.</p>
            <Field label="Odometer (km)">
              <input inputMode="decimal" value={odo} onChange={(event) => setOdo(event.target.value.replace(/[^\d.]/g, ""))} />
            </Field>
            <Field label="Purchase year">
              <input inputMode="numeric" value={year} maxLength={4} onChange={(event) => setYear(event.target.value.replace(/\D/g, "").slice(0, 4))} />
            </Field>
            {odoBad && (
              <p className="odo-error" role="alert">
                Enter a reading of zero or more.
              </p>
            )}
            {yearBad && (
              <p className="odo-error" role="alert">
                Enter a year from 1980 onwards, or leave it blank.
              </p>
            )}
          </>
        )}
      </div>
      <div className="odo-savebar">
        <button type="submit" className="odo-btn" disabled={primaryDisabled}>
          {step === "details" ? "Save vehicle" : "Continue"}
        </button>
      </div>
    </form>
  );
}

function PickList<T extends { name: string }>({ popular, rest, onPick }: { popular: T[]; rest: T[]; onPick: (item: T) => void }) {
  return (
    <>
      {popular.length > 0 && (
        <>
          <p className="odo-kicker">Popular</p>
          <ul className="odo-pick">
            {popular.map((item) => (
              <li key={item.name}>
                <button type="button" onClick={() => onPick(item)}>
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      {rest.length > 0 && (
        <>
          <p className="odo-kicker">A to Z</p>
          <ul className="odo-pick">
            {rest.map((item) => (
              <li key={item.name}>
                <button type="button" onClick={() => onPick(item)}>
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
