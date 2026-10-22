import { useState } from "react";
import { fuelLabel, km } from "../format";
import { useOdo } from "../store";
import type { ThemeMode } from "../types";
import { Logo } from "../ui/Logo";

const modes: { value: ThemeMode; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export function ProfileScreen() {
  const { vehicles, theme, setTheme, resetDemo, go } = useOdo();
  const [confirming, setConfirming] = useState(false);
  const onPaper = theme === "light" || (theme === "system" && documentAppearance() === "light");

  return (
    <div className="odo-scroll odo-pad">
      <Logo on={onPaper ? "paper" : "dark"} />
      <h1 className="odo-title">Profile</h1>
      <ul className="odo-vehicles">
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            <p className="odo-strong">{vehicle.nickname}</p>
            <p className="odo-muted">
              {vehicle.make} {vehicle.model} · {fuelLabel(vehicle.fuelType)}
            </p>
            <p>{km(vehicle.odometer)}</p>
          </li>
        ))}
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
      <p className="odo-hint">Reset loads the sample hatchback and scooter. Data stays on this device.</p>
    </div>
  );
}

function documentAppearance(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.odoAppearance === "dark" ? "dark" : "light";
}
