import { formatDate, km, oneDecimal, rupees, todayISO } from "../format";
import { homeSnapshot } from "../stats";
import { useOdo } from "../store";
import { Logo } from "../ui/Logo";
import { VehicleArt } from "../ui/Marks";

function MintPhoto() {
  return <img className="odo-hero-photo" src="/odo/mint-venue.png" alt="" />;
}

function ZipPhoto() {
  return <img className="odo-hero-photo" src="/odo/zip-scooter.png?v=2" alt="" />;
}

export function HomeScreen() {
  const { vehicles, records, selectedId, setSelectedId } = useOdo();
  const year = new Date().getFullYear();
  const snap = homeSnapshot(vehicles, records, selectedId, year);
  const selected = vehicles.find((vehicle) => vehicle.id === selectedId);
  const heading = selected?.nickname ?? "Both vehicles";

  return (
    <div className="odo-scroll">
      <header className="odo-hero">
        <div className="odo-hero-top">
          <Logo on="blue" />
          <p>{formatDate(todayISO())}</p>
        </div>
        <h1>{heading}</h1>
        <div className="odo-chips" role="group" aria-label="Vehicles">
          {vehicles.map((vehicle) => (
            <button
              key={vehicle.id}
              type="button"
              className="odo-chip"
              aria-pressed={selectedId === vehicle.id}
              onClick={() => setSelectedId(vehicle.id)}
            >
              {vehicle.nickname}
            </button>
          ))}
          {vehicles.length > 1 && (
            <button type="button" className="odo-chip" aria-pressed={selectedId === "all"} onClick={() => setSelectedId("all")}>
              Both
            </button>
          )}
        </div>
        <div className="odo-hero-art">
          {snap.art === "both" ? (
            <div className="odo-art-row">
              <MintPhoto />
              <ZipPhoto />
            </div>
          ) : snap.art === "car" ? (
            <MintPhoto />
          ) : snap.art === "scooter" ? (
            <ZipPhoto />
          ) : (
            <VehicleArt kind={snap.art} />
          )}
        </div>
      </header>
      <div className="odo-stack">
        <article className="odo-card">
          <p className="odo-stat-label">{snap.title}</p>
          <p className="odo-stat-value">{snap.average == null ? "—" : oneDecimal(snap.average)}</p>
          <p className="odo-stat-unit">{snap.phrase}</p>
        </article>
        <article className="odo-card">
          <p className="odo-stat-label">This year&apos;s spend</p>
          <p className="odo-stat-value odo-stat-value-sm">{rupees(snap.spend)}</p>
          {snap.ratio != null && (
            <div
              className="odo-meter"
              role="img"
              aria-label={`This year is ${Math.round(snap.ratio * 100)} percent of last year`}
            >
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
                <p className="odo-muted">{formatDate(snap.lastFill.date)}</p>
              </>
            ) : (
              <p className="odo-muted">Nothing logged yet</p>
            )}
          </div>
          <div>
            <p className="odo-stat-label">Last service</p>
            {snap.lastService ? (
              <>
                <p className="odo-strong">{snap.lastService.name}</p>
                <p className="odo-muted">{formatDate(snap.lastService.date)}</p>
              </>
            ) : (
              <p className="odo-muted">Nothing logged yet</p>
            )}
          </div>
        </article>
        {snap.insight && <p className="odo-insight">{snap.insight}</p>}
      </div>
      {selected && <p className="odo-footnote">{km(selected.odometer)} on the clock</p>}
    </div>
  );
}
