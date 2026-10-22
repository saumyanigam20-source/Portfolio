import { useRef, useState } from "react";
import { deriveFuel, fuelLabel, parseNumber, quantityUnit, round2, todayISO, vehicleFuels, vehicleTitle } from "../format";
import { lastFuel } from "../stats";
import { useOdo } from "../store";
import type { FuelType } from "../types";
import { Field } from "../ui/Field";
import { CheckIcon } from "../ui/Icons";
import { VehicleIcon } from "../ui/VehicleIcon";
import { prefersReducedMotion } from "../ui/motion";
import { ScreenHeader } from "../ui/ScreenHeader";
import { Toggle } from "../ui/Toggle";

type Draft = {
  date: string;
  fuelType: FuelType;
  quantity: string;
  price: string;
  amount: string;
  odometer: string;
  fullTank: boolean;
};

function draftFrom(fuels: FuelType[], previous: ReturnType<typeof lastFuel>): Draft {
  const fuelType = previous && fuels.includes(previous.fuelType) ? previous.fuelType : fuels[0] ?? "petrol";
  return { date: todayISO(), fuelType, quantity: "", price: "", amount: "", odometer: "", fullTank: false };
}

export function AddFuelScreen() {
  const { vehicles, records, selectedId, go, addFuel } = useOdo();
  const initialId =
    selectedId !== "all" && vehicles.some((vehicle) => vehicle.id === selectedId) ? selectedId : vehicles[0]?.id ?? "";
  const [vehicleId, setVehicleId] = useState(initialId);
  const vehicle = vehicles.find((item) => item.id === vehicleId) ?? vehicles[0];
  const [form, setForm] = useState<Draft>(() => draftFrom(vehicle ? vehicleFuels(vehicle) : ["petrol"], lastFuel(records, initialId)));
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);
  const saving = useRef(false);

  if (!vehicle) {
    return (
      <div className="odo-form-screen">
        <ScreenHeader title="Add fuel" onBack={() => go({ name: "home" })} />
        <p className="odo-empty">Add a vehicle first.</p>
      </div>
    );
  }

  const chooseVehicle = (id: string) => {
    const next = vehicles.find((item) => item.id === id);
    setVehicleId(id);
    setForm(draftFrom(next ? vehicleFuels(next) : ["petrol"], lastFuel(records, id)));
  };

  const applyLast = () => {
    const previous = lastFuel(records, vehicle.id);
    if (!previous) return;
    const fuels = vehicleFuels(vehicle);
    const fuelType = fuels.includes(previous.fuelType) ? previous.fuelType : fuels[0] ?? "petrol";
    const price = String(previous.pricePerUnit);
    const amount = String(previous.amount);
    const derived = deriveFuel("amount", { quantity: "", price, amount });
    setForm({ ...form, fuelType, price, amount, quantity: derived.quantity || String(previous.quantity), fullTank: false });
  };

  const setQuantity = (quantity: string) => {
    setForm({ ...form, ...deriveFuel("quantity", { ...form, quantity }) });
  };

  const setPrice = (price: string) => {
    setForm({ ...form, ...deriveFuel("price", { ...form, price }) });
  };

  const setAmount = (amount: string) => {
    setForm({ ...form, ...deriveFuel("amount", { ...form, amount }) });
  };

  const save = () => {
    const quantity = parseNumber(form.quantity);
    const price = parseNumber(form.price);
    const amount = parseNumber(form.amount);
    const odometer = parseNumber(form.odometer);
    if (!form.date || quantity == null || quantity <= 0 || price == null || price <= 0) {
      setError("Add a date, quantity and price per unit.");
      return;
    }
    if (saving.current) return;
    saving.current = true;
    setChecked(true);
    const payload = {
      vehicleId: vehicle.id,
      date: form.date,
      fuelType: form.fuelType,
      quantity,
      pricePerUnit: price,
      amount: amount ?? round2(quantity * price),
      odometer,
      fullTank: form.fullTank,
    };
    window.setTimeout(() => addFuel(payload), prefersReducedMotion() ? 0 : 200);
  };

  const previous = lastFuel(records, vehicle.id);
  const fuels = vehicleFuels(vehicle);
  const unit = quantityUnit(form.fuelType);

  return (
    <form
      className="odo-form-screen"
      onSubmit={(event) => {
        event.preventDefault();
        save();
      }}
    >
      <ScreenHeader title="Add fuel" onBack={() => go({ name: "home" })} />
      <div className="odo-scroll odo-form">
        {vehicles.length > 1 && (
          <div className="odo-chips" role="group" aria-label="Vehicle">
            {vehicles.map((item) => (
              <button key={item.id} type="button" className="odo-chip odo-chip-ink" aria-pressed={item.id === vehicle.id} onClick={() => chooseVehicle(item.id)}>
                <VehicleIcon type={item.kind} size={20} label={vehicleTitle(item)} />
                {item.model}
              </button>
            ))}
          </div>
        )}
        <button type="button" className="odo-text-btn" onClick={applyLast} disabled={!previous}>
          Same as last fill
        </button>
        <Field label="Date">
          <input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} required />
        </Field>
        {fuels.length > 1 && (
          <div className="odo-field">
            <span>Fuel</span>
            <div className="odo-pills" role="group" aria-label="Fuel">
              {fuels.map((item) => (
                <button key={item} type="button" className="odo-pill" aria-pressed={form.fuelType === item} onClick={() => setForm({ ...form, fuelType: item })}>
                  {fuelLabel(item)}
                </button>
              ))}
            </div>
          </div>
        )}
        <Field label={`Quantity (${unit})`}>
          <input inputMode="decimal" value={form.quantity} onChange={(event) => setQuantity(event.target.value)} />
        </Field>
        <Field label={`Price per ${unit === "kWh" ? "kWh" : unit === "kg" ? "kg" : "litre"} (₹)`}>
          <input inputMode="decimal" value={form.price} onChange={(event) => setPrice(event.target.value)} />
        </Field>
        <Field label="Amount (₹)">
          <input inputMode="decimal" value={form.amount} onChange={(event) => setAmount(event.target.value)} />
        </Field>
        <Field label="Odometer (km)">
          <input inputMode="decimal" value={form.odometer} onChange={(event) => setForm({ ...form, odometer: event.target.value })} />
        </Field>
        <Toggle label="Full tank" checked={form.fullTank} onChange={(fullTank) => setForm({ ...form, fullTank })} />
        <p className="odo-hint">Leave this off for a part fill. A gas fill is often a fixed rupee amount, and that is not a full tank.</p>
        {error && (
          <p className="odo-error" role="alert">
            {error}
          </p>
        )}
      </div>
      <div className="odo-savebar">
        <button type="submit" className="odo-btn">
          {checked ? <CheckIcon /> : "Save fill"}
        </button>
      </div>
    </form>
  );
}
