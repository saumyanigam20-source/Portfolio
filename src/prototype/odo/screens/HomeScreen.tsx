import { formatDate, fuelLabel, greeting, km, oneDecimal, rupees, todayISO, vehicleFuels, vehicleTitle } from "../format";
import { homeSnapshot } from "../stats";
import { useOdo } from "../store";
import { Logo } from "../ui/Logo";
import { PlatePreview } from "../ui/PlatePreview";
import { CountUp, takeMileageFlash } from "../ui/motion";
import { useState } from "react";

const vehiclePhoto: Record<string, { src: string; alt: string }> = {
  mint: { src: "/odo/mint-venue.png", alt: "Car" },
  zip: { src: "/odo/zip-scooter.png", alt: "Scooter" },
};

export function HomeScreen() {
  const { vehicles, records, selectedId, setSelectedId, session } = useOdo();
  const year = new Date().getFullYear();
  const selected = vehicles.find((vehicle) => vehicle.id === selectedId) ?? vehicles[0];
  const snap = homeSnapshot(vehicles, records, selected?.id ?? selectedId, year);
  const [flash] = useState(takeMileageFlash);
  const single = snap.fuels.length <= 1 ? snap.fuels[0] : null;
  const photo = selected ? vehiclePhoto[selected.id] : undefined;

  return (
    <div className="odo-scroll">
      <header className="odo-hero">
        <div className="odo-hero-top">
          <Logo />
          <p>{formatDate(todayISO())}</p>
        </div>
        <h1>{greeting(session.name, new Date().getHours())}</h1>
        {vehicles.length > 0 && (
          <div className="odo-switcher" role="group" aria-label="Vehicles">
            {vehicles.map((vehicle) => (
              <button key={vehicle.id} type="button" className="odo-vehicle-switch" aria-pressed={selected?.id === vehicle.id} onClick={() => setSelectedId(vehicle.id)}>
                <span className="odo-switch-copy">
                  <span className="odo-strong">{vehicle.make}</span>
                  <span>{vehicle.model}</span>
                  {vehicle.plateDisplay && <span className="odo-muted">{vehicle.plateDisplay}</span>}
                </span>
              </button>
            ))}
          </div>
        )}
        {photo && (
          <div className="odo-hero-art">
            <img className="odo-hero-photo" src={photo.src} alt={photo.alt} />
          </div>
        )}
      </header>
      <div className="odo-stack">
        {selected && (
          <article className="odo-card odo-vehicle-card">
            <div className="odo-vehicle-copy">
              <h2>{vehicleTitle(selected)}</h2>
              {selected.plateDisplay && <PlatePreview display={selected.plateDisplay} kind={selected.kind} compact />}
              <p className="odo-muted">{vehicleFuels(selected).map((fuel) => fuelLabel(fuel)).join(" · ")}</p>
            </div>
          </article>
        )}
        {single && (
          <article className="odo-card odo-hero-card">
            <p className="odo-stat-label">{single.label} average</p>
            <p className={single.average == null ? "odo-stat-note" : `odo-stat-value${flash ? " odo-pulse" : ""}`}>
              {single.average == null ? "Needs one more full fill" : <CountUp value={single.average} format={oneDecimal} />}
            </p>
            {single.average != null && <p className="odo-stat-unit">{single.unit}</p>}
          </article>
        )}
        {snap.fuels.length > 1 && (
          <div className="odo-fuel-grid">
            {snap.fuels.map((fuel) => (
              <article key={fuel.fuel} className="odo-card">
                <p className="odo-stat-label">{fuel.label}</p>
                <p className={fuel.average == null ? "odo-stat-note" : "odo-stat-value odo-stat-value-sm"}>{fuel.average == null ? "Needs one more full fill" : oneDecimal(fuel.average)}</p>
                {fuel.average != null && <p className="odo-stat-unit">{fuel.unit}</p>}
              </article>
            ))}
          </div>
        )}
        <article className="odo-card">
          <p className="odo-stat-label">Cost per km, all fuels</p>
          <p className="odo-stat-value odo-stat-value-sm">{snap.costPerKm == null ? "—" : <CountUp value={snap.costPerKm} format={rupees} />}</p>
        </article>
        <article className="odo-card">
          <p className="odo-stat-label">This year&apos;s spend</p>
          <p className="odo-stat-value odo-stat-value-sm">
            <CountUp value={snap.spend} format={rupees} />
          </p>
          {snap.fuels.length > 1 && (
            <ul className="odo-split-list">
              {snap.fuels.map((fuel) => (
                <li key={fuel.fuel}>
                  <span>{fuel.label}</span>
                  <strong>{rupees(fuel.spend)}</strong>
                </li>
              ))}
            </ul>
          )}
          {snap.ratio != null && (
            <div className="odo-meter" role="img" aria-label={`This year is ${Math.round(snap.ratio * 100)} percent of last year`}>
              <span style={{ width: `${Math.min(100, Math.round(snap.ratio * 100))}%` }} />
            </div>
          )}
        </article>
        <article className="odo-card odo-split">
          <div>
            <p className="odo-stat-label">Last fill</p>
            {snap.lastFill ? (
              <>
                <p className="odo-strong">{rupees(snap.lastFill.amount)}</p>
                <p className="odo-muted">
                  {fuelLabel(snap.lastFill.fuelType)} · {formatDate(snap.lastFill.date)}
                </p>
              </>
            ) : (
              <p className="odo-muted">Nothing logged yet</p>
            )}
          </div>
          <div>
            <p className="odo-stat-label">What&apos;s due next</p>
            {snap.lastService ? (
              <>
                <p className="odo-strong">{snap.lastService.name}</p>
                <p className="odo-muted">Due {formatDate(snap.lastService.dueDate)}</p>
              </>
            ) : (
              <p className="odo-muted">Nothing logged yet</p>
            )}
          </div>
        </article>
        {snap.insight && (
          <p className={`odo-insight ${snap.insight.includes("less") ? "odo-tone-positive" : snap.insight.includes("more") ? "odo-tone-negative" : ""}`}>
            {snap.insight}
          </p>
        )}
      </div>
      {selected && <p className="odo-footnote">{km(selected.odometer)} on the clock</p>}
    </div>
  );
}
