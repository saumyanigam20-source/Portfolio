import { useState } from "react";
import { addMonths, parseNumber, todayISO } from "../format";
import { useOdo } from "../store";
import { Field } from "../ui/Field";
import { ScreenHeader } from "../ui/ScreenHeader";

export function AddRecordScreen() {
  const { screen, vehicles, selectedId, go, addExpense } = useOdo();
  const recordKind = screen.name === "add-record" ? screen.recordKind : "part";
  const initialId =
    selectedId !== "all" && vehicles.some((vehicle) => vehicle.id === selectedId) ? selectedId : vehicles[0]?.id ?? "";
  const [vehicleId, setVehicleId] = useState(initialId);
  const [date, setDate] = useState(todayISO());
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [warranty, setWarranty] = useState("12");
  const [due, setDue] = useState(addMonths(todayISO(), 12));
  const [dueTouched, setDueTouched] = useState(false);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  const save = () => {
    const amount = parseNumber(price);
    const months = parseNumber(warranty);
    if (!name.trim() || !brand.trim() || amount == null || amount < 0 || months == null || months < 0 || !due) {
      setError("Add a name, brand, price, warranty and due date.");
      return;
    }
    addExpense({
      vehicleId,
      recordKind,
      date,
      name: name.trim(),
      brand: brand.trim(),
      amount,
      warrantyMonths: months,
      dueDate: due,
    });
  };

  return (
    <form
      className="odo-form-screen"
      onSubmit={(event) => {
        event.preventDefault();
        save();
      }}
    >
      <ScreenHeader title={recordKind === "part" ? "Add part" : "Add service"} onBack={() => go({ name: "home" })} />
      <div className="odo-scroll odo-form">
        {vehicles.length > 1 && (
          <div className="odo-chips" role="group" aria-label="Vehicle">
            {vehicles.map((vehicle) => (
              <button key={vehicle.id} type="button" className="odo-chip odo-chip-ink" aria-pressed={vehicle.id === vehicleId} onClick={() => setVehicleId(vehicle.id)}>
                {vehicle.nickname}
              </button>
            ))}
          </div>
        )}
        <Field label="Date">
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
        </Field>
        <Field label="Name">
          <input value={name} onChange={(event) => setName(event.target.value)} maxLength={40} required />
        </Field>
        <Field label="Brand">
          <input value={brand} onChange={(event) => setBrand(event.target.value)} maxLength={24} required />
        </Field>
        <Field label="Price (₹)">
          <input inputMode="decimal" value={price} onChange={(event) => setPrice(event.target.value)} required />
        </Field>
        <Field label="Warranty (months)">
          <input
            inputMode="numeric"
            value={warranty}
            onChange={(event) => {
              const next = event.target.value;
              setWarranty(next);
              const months = parseNumber(next);
              if (!dueTouched && months != null) setDue(addMonths(date, months));
            }}
          />
        </Field>
        <Field label="Replacement due">
          <input
            type="date"
            value={due}
            onChange={(event) => {
              setDueTouched(true);
              setDue(event.target.value);
            }}
            required
          />
        </Field>
        <Field label="Photo">
          <input
            type="file"
            accept="image/*"
            aria-label="Optional photo preview"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) {
                setPreview("");
                return;
              }
              const reader = new FileReader();
              reader.onload = () => setPreview(typeof reader.result === "string" ? reader.result : "");
              reader.readAsDataURL(file);
            }}
          />
        </Field>
        {preview && <img className="odo-preview" src={preview} alt="Selected photo preview" />}
        <p className="odo-hint">Preview only. The photo is not saved.</p>
        {error && (
          <p className="odo-error" role="alert">
            {error}
          </p>
        )}
      </div>
      <div className="odo-savebar">
        <button type="submit" className="odo-btn">
          Save {recordKind}
        </button>
      </div>
    </form>
  );
}
