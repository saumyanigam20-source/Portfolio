import { useState } from "react";
import { fuelLabel, parseNumber, quantityUnit, round2, todayISO } from "../format";
import { lastFuel } from "../stats";
import { useOdo } from "../store";
import type { FuelType } from "../types";
import { Field } from "../ui/Field";
import { ScreenHeader } from "../ui/ScreenHeader";
import { Toggle } from "../ui/Toggle";

const fuels: FuelType[] = ["petrol", "diesel", "cng", "electric"];

type Draft = {
  date: string;
  fuelType: FuelType;
  quantity: string;
  price: string;
  amount: string;
  odometer: string;
  fullTank: boolean;
};

function draftFrom(vehicleFuel: FuelType, previous: ReturnType<typeof lastFuel>): Draft {
  return {
    date: todayISO(),
    fuelType: previous?.fuelType ?? vehicleFuel,
    quantity: previous ? String(previous.quantity) : "",
    price: previous ? String(previous.pricePerUnit) : "",
    amount: previous ? String(previous.amount) : "",
    odometer: "",
    fullTank: previous?.fullTank ?? true,
  };
}

export function AddFuelScreen() {
  const { vehicles, records, selectedId, go, addFuel } = useOdo();
  const initialId =
    selectedId !== "all" && vehicles.some((vehicle) => vehicle.id === selectedId) ? selectedId : vehicles[0]?.id ?? "";
  const [vehicleId, setVehicleId] = useState(initialId);
  const vehicle = vehicles.find((item) => item.id === vehicleId) ?? vehicles[0];
  const [form, setForm] = useState<Draft>(() => draftFrom(vehicle?.fuelType ?? "petrol", lastFuel(records, initialId)));
  const [error, setError] = useState("");

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
    setForm(draftFrom(next?.fuelType ?? "petrol", lastFuel(records, id)));
  };

  const applyLast = () => {
    const previous = lastFuel(records, vehicle.id);
    if (!previous) return;
    setForm(draftFrom(vehicle.fuelType, previous));
  };

  const setQuantity = (quantity: string) => {
    const price = parseNumber(form.price);
    const qty = parseNumber(quantity);
    setForm({
      ...form,
      quantity,
      amount: price != null && qty != null ? String(round2(price * qty)) : form.amount,
    });
  };

  const setPrice = (price: string) => {
    const qty = parseNumber(form.quantity);
    const rate = parseNumber(price);
    setForm({
      ...form,
      price,
      amount: rate != null && qty != null ? String(round2(rate * qty)) : form.amount,
    });
  };

  const setAmount = (amount: string) => {
    const rate = parseNumber(form.price);
    const total = parseNumber(amount);
    setForm({
      ...form,
      amount,
      quantity: rate != null && rate > 0 && total != null ? String(round2(total / rate)) : form.quantity,
    });
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
    addFuel({
      vehicleId: vehicle.id,
      date: form.date,
      fuelType: form.fuelType,
      quantity,
      pricePerUnit: price,
      amount: amount ?? round2(quantity * price),
      odometer,
      fullTank: form.fullTank,
    });
  };

  const previous = lastFuel(records, vehicle.id);

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
                {item.nickname}
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
        <div className="odo-field">
          <span>Fuel type</span>
          <div className="odo-pills" role="group" aria-label="Fuel type">
            {fuels.map((item) => (
              <button key={item} type="button" className="odo-pill" aria-pressed={form.fuelType === item} onClick={() => setForm({ ...form, fuelType: item })}>
                {fuelLabel(item)}
              </button>
            ))}
          </div>
        </div>
        <Field label={`Quantity (${quantityUnit(form.fuelType)})`}>
          <input inputMode="decimal" value={form.quantity} onChange={(event) => setQuantity(event.target.value)} />
        </Field>
        <Field label="Price per unit (₹)">
          <input inputMode="decimal" value={form.price} onChange={(event) => setPrice(event.target.value)} />
        </Field>
        <Field label="Amount (₹)">
          <input inputMode="decimal" value={form.amount} onChange={(event) => setAmount(event.target.value)} />
        </Field>
        <Field label="Odometer (km)">
          <input inputMode="decimal" value={form.odometer} onChange={(event) => setForm({ ...form, odometer: event.target.value })} />
        </Field>
        <Toggle label="Full tank" checked={form.fullTank} onChange={(fullTank) => setForm({ ...form, fullTank })} />
        {error && (
          <p className="odo-error" role="alert">
            {error}
          </p>
        )}
      </div>
      <div className="odo-savebar">
        <button type="submit" className="odo-btn">
          Save fill
        </button>
      </div>
    </form>
  );
}
