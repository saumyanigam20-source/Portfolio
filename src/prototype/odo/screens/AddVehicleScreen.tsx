import { useState } from "react";
import { parseNumber } from "../format";
import { useOdo } from "../store";
import type { FuelType, VehicleKind } from "../types";
import { Field } from "../ui/Field";
import { VehicleArt } from "../ui/Marks";
import { ScreenHeader } from "../ui/ScreenHeader";

const kinds: VehicleKind[] = ["car", "bike", "scooter"];
const fuels: FuelType[] = ["petrol", "diesel", "cng", "electric"];

export function AddVehicleScreen() {
  const { screen, go, addVehicle } = useOdo();
  const [kind, setKind] = useState<VehicleKind>("car");
  const [nickname, setNickname] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [fuelType, setFuelType] = useState<FuelType>("petrol");
  const [odometer, setOdometer] = useState("");
  const [error, setError] = useState("");

  const back = () => {
    if (screen.name === "add-vehicle" && screen.returnTo === "profile") go({ name: "profile" });
    else if (screen.name === "add-vehicle" && screen.returnTo === "home") go({ name: "home" });
    else go({ name: "welcome" });
  };

  const save = () => {
    const reading = parseNumber(odometer);
    if (!nickname.trim() || !make.trim() || !model.trim() || reading == null || reading < 0) {
      setError("Add a nickname, make, model and odometer.");
      return;
    }
    addVehicle({
      kind,
      nickname: nickname.trim(),
      make: make.trim(),
      model: model.trim(),
      fuelType,
      odometer: reading,
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
      <ScreenHeader title="Add vehicle" onBack={back} />
      <div className="odo-scroll odo-form">
        <div className="odo-kind-row" role="group" aria-label="Vehicle type">
          {kinds.map((item) => (
            <button key={item} type="button" className="odo-kind" aria-pressed={kind === item} onClick={() => setKind(item)}>
              <VehicleArt kind={item} />
              <span>{item}</span>
            </button>
          ))}
        </div>
        <Field label="Nickname">
          <input value={nickname} onChange={(event) => setNickname(event.target.value)} maxLength={24} required />
        </Field>
        <Field label="Make">
          <input value={make} onChange={(event) => setMake(event.target.value)} maxLength={24} required />
        </Field>
        <Field label="Model">
          <input value={model} onChange={(event) => setModel(event.target.value)} maxLength={24} required />
        </Field>
        <div className="odo-field">
          <span>Fuel</span>
          <div className="odo-pills" role="group" aria-label="Fuel">
            {fuels.map((item) => (
              <button key={item} type="button" className="odo-pill" aria-pressed={fuelType === item} onClick={() => setFuelType(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <Field label="Current odometer (km)">
          <input inputMode="decimal" value={odometer} onChange={(event) => setOdometer(event.target.value)} required />
        </Field>
        {error && (
          <p className="odo-error" role="alert">
            {error}
          </p>
        )}
      </div>
      <div className="odo-savebar">
        <button type="submit" className="odo-btn">
          Save vehicle
        </button>
      </div>
    </form>
  );
}
