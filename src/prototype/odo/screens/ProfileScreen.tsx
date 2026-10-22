import { useState } from "react";
import { fuelLabel, km, vehicleFuels, vehicleTitle } from "../format";
import { useOdo } from "../store";
import type { FuelType, ThemeMode } from "../types";
import { Logo } from "../ui/Logo";
import { VehicleIcon } from "../ui/VehicleIcon";

const modes: { value: ThemeMode; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export function ProfileScreen() {
  const { vehicles, theme, setTheme, resetDemo, go, signOut, setFuels, session } = useOdo();
  const [confirming, setConfirming] = useState(false);
  const [kitFor, setKitFor] = useState<string | null>(null);

  const addKit = (id: string, gas: Extract<FuelType, "cng" | "lpg">) => {
    const vehicle = vehicles.find((item) => item.id === id);
    if (!vehicle) return;
    const fuels = vehicleFuels(vehicle).filter((fuel) => fuel !== "cng" && fuel !== "lpg");
    setFuels(id, [...(fuels.includes("petrol") ? fuels : ["petrol", ...fuels.filter((fuel) => fuel !== "petrol")]), gas]);
    setKitFor(null);
  };

  return (
    <div className="odo-scroll odo-pad">
      <Logo />
      <h1 className="odo-title">{session.name || "Profile"}</h1>
      <ul className="odo-vehicles">
        {vehicles.map((vehicle) => {
          const fuels = vehicleFuels(vehicle);
          const hasGas = fuels.includes("cng") || fuels.includes("lpg");
          return (
            <li key={vehicle.id}>
              <div className="odo-vehicle-row">
                <VehicleIcon type={vehicle.kind} size={32} label={vehicleTitle(vehicle)} />
                <div>
                  <p className="odo-strong">{vehicleTitle(vehicle)}</p>
                  <p className="odo-muted">
                    {vehicle.plateDisplay ? `${vehicle.plateDisplay} · ` : ""}
                    {fuels.map((fuel) => fuelLabel(fuel)).join(" · ")}
                  </p>
                  <p>{km(vehicle.odometer)}</p>
                </div>
              </div>
              {!hasGas && (
                kitFor === vehicle.id ? (
                  <div className="odo-pills" role="group" aria-label="Gas kit">
                    <button type="button" className="odo-pill" onClick={() => addKit(vehicle.id, "cng")}>Petrol + CNG</button>
                    <button type="button" className="odo-pill" onClick={() => addKit(vehicle.id, "lpg")}>Petrol + LPG</button>
                  </div>
                ) : (
                  <button type="button" className="odo-text-btn" onClick={() => setKitFor(vehicle.id)}>
                    Add a gas kit
                  </button>
                )
              )}
            </li>
          );
        })}
      </ul>
      <button type="button" className="odo-btn odo-btn-ghost" onClick={() => go({ name: "add-vehicle", returnTo: "profile" })}>
        Add a vehicle
      </button>
      <div className="odo-field">
        <span id="odo-appearance">Appearance</span>
        <div className="odo-pills" role="radiogroup" aria-labelledby="odo-appearance">
          {modes.map((mode) => (
            <button
              key={mode.value}
              type="button"
              className="odo-pill"
              role="radio"
              aria-checked={theme === mode.value}
              onClick={() => setTheme(mode.value)}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="odo-btn odo-btn-ghost"
        onClick={() => {
          if (!confirming) {
            setConfirming(true);
            return;
          }
          resetDemo();
        }}
      >
        {confirming ? "Reset demo now" : "Reset demo"}
      </button>
      <p className="odo-hint">Reset loads the sample car and scooter. Data stays on this device.</p>
      <button type="button" className="odo-btn odo-btn-ghost" onClick={signOut}>
        Sign out
      </button>
    </div>
  );
}
