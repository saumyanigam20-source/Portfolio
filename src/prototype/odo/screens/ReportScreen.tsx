import { useState } from "react";
import { downloadText, fuelLabel, mileageUnit, quantityUnit, rupees, toCsv, vehicleTitle } from "../format";
import { mileageForFuel } from "../mileage";
import { categoryTotals, fuelSpend, yearsIn } from "../stats";
import { useOdo } from "../store";
import type { FuelType, RecordItem } from "../types";
import { CountUp } from "../ui/motion";

const shade: Record<FuelType, string> = {
  petrol: "var(--odo-chart-1)",
  diesel: "var(--odo-chart-2)",
  cng: "var(--odo-chart-3)",
  lpg: "var(--odo-chart-4)",
  electric: "var(--odo-muted)",
};

const bars = [
  { key: "fuel", label: "Fuel" },
  { key: "part", label: "Parts" },
  { key: "service", label: "Service" },
  { key: "insurance", label: "Insurance" },
] as const;

export function ReportScreen() {
  const { records, vehicles, selectedId } = useOdo();
  const todayYear = new Date().getFullYear();
  const years = yearsIn(records, todayYear);
  const [year, setYear] = useState(todayYear);
  const activeId = selectedId === "all" ? vehicles[0]?.id : selectedId;
  const totals = categoryTotals(records, year);
  const fuels = fuelSpend(records, year, activeId);
  const fuelMax = Math.max(...fuels.map((item) => item.amount), 1);
  const max = Math.max(...bars.map((bar) => totals[bar.key]), 1);
  const yearTotal = bars.reduce((sum, bar) => sum + totals[bar.key], 0);
  const lastYearTotal = bars.reduce((sum, bar) => sum + categoryTotals(records, year - 1)[bar.key], 0);
  const summary = bars.map((bar) => `${bar.label} ${rupees(totals[bar.key])}`).join(", ");

  const exportCsv = () => {
    const header = ["date", "vehicle", "category", "detail", "quantity", "unit", "amount_inr", "odometer_km", "full_tank"];
    const rows = records
      .filter((record) => record.date.startsWith(String(year)))
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((record) => {
        const vehicle = vehicles.find((item) => item.id === record.vehicleId);
        return csvRow(record, vehicle ? vehicleTitle(vehicle) : "");
      });
    downloadText(`odo-${year}.csv`, toCsv([header, ...rows]));
  };

  return (
    <div className="odo-scroll odo-pad">
      <h1 className="odo-title">Report</h1>
      <div className="odo-chips" role="group" aria-label="Year">
        {years.map((item) => (
          <button key={item} type="button" className="odo-chip odo-chip-ink" aria-pressed={item === year} onClick={() => setYear(item)}>
            {item}
          </button>
        ))}
      </div>
      <p className="odo-stat-value odo-stat-value-sm">
        <CountUp value={yearTotal} format={rupees} />
      </p>
      <p className="odo-muted">Total in {year}</p>
      <h2 className="odo-kicker">Fuel spend</h2>
      {fuels.length === 0 ? (
        <p className="odo-muted">No fuel logged in {year}.</p>
      ) : (
        <svg className="odo-chart" viewBox="0 0 320 180" role="img" aria-label={`Fuel spend in ${year}. ${fuels.map((item) => `${fuelLabel(item.fuel)} ${rupees(item.amount)}`).join(", ")}`}>
          {fuels.map((item, index) => {
            const height = (item.amount / fuelMax) * 120;
            const width = Math.min(48, 280 / fuels.length - 12);
            const x = 20 + index * (width + 16);
            return (
              <g key={item.fuel}>
                <rect fill={shade[item.fuel]} x={x} y={140 - height} width={width} height={Math.max(height, 4)} />
                <text x={x + width / 2} y="166" textAnchor="middle" fill="currentColor" fontSize="12">
                  {fuelLabel(item.fuel)}
                </text>
              </g>
            );
          })}
        </svg>
      )}
      <ul className="odo-legend">
        {fuels.map((item) => (
          <li key={item.fuel}>
            <span className="odo-swatch" style={{ background: shade[item.fuel] }} />
            {fuelLabel(item.fuel)} · {quantityUnit(item.fuel)}
            <strong>{rupees(item.amount)}</strong>
          </li>
        ))}
      </ul>
      <MileageChart records={records} vehicleId={activeId} year={year} />
      <svg className="odo-chart" viewBox="0 0 320 180" role="img" aria-label={`Spending in ${year}. ${summary}`}>
        <defs>
          <pattern id="odo-pat-part" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" className="odo-bar-part" />
            <path d="M0 8 L8 0" stroke="var(--odo-on-accent)" strokeWidth="1" />
          </pattern>
          <pattern id="odo-pat-service" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" className="odo-bar-service" />
            <circle cx="2" cy="2" r="1" fill="var(--odo-on-accent)" />
          </pattern>
          <pattern id="odo-pat-insurance" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" className="odo-bar-insurance" />
            <path d="M0 4 H8" stroke="var(--odo-on-accent)" strokeWidth="1" />
          </pattern>
        </defs>
        {bars.map((bar, index) => {
          const height = (totals[bar.key] / max) * 120;
          const x = 28 + index * 76;
          const fill = bar.key === "fuel" ? undefined : `url(#odo-pat-${bar.key})`;
          return (
            <g key={bar.key}>
              <rect className={bar.key === "fuel" ? "odo-bar-fuel" : undefined} fill={fill} x={x} y={140 - height} width="36" height={Math.max(height, totals[bar.key] > 0 ? 4 : 0)} rx="0" />
              <text x={x + 18} y="166" textAnchor="middle" fill="currentColor" fontSize="12">
                {bar.label}
              </text>
            </g>
          );
        })}
      </svg>
      <ul className="odo-legend">
        {bars.map((bar) => (
          <li key={bar.key}>
            <span className={`odo-swatch odo-bar-${bar.key}`} />
            {bar.label}
            <strong>{rupees(totals[bar.key])}</strong>
          </li>
        ))}
      </ul>
      <p className="odo-insight">
        Last year ({year - 1}) · {rupees(lastYearTotal)}
      </p>
      <button type="button" className="odo-btn" onClick={exportCsv}>
        Export
      </button>
    </div>
  );
}

function MileageChart({ records, vehicleId, year }: { records: RecordItem[]; vehicleId: string | undefined; year: number }) {
  const fuels = [...new Set(records.filter((record) => record.kind === "fuel" && record.vehicleId === vehicleId).map((record) => record.fuelType))];
  const series = fuels.map((fuel) => ({
    fuel,
    points: mileageForFuel(
      records.filter((record) => record.kind === "fuel" && record.vehicleId === vehicleId && record.date.startsWith(String(year))),
      fuel,
    ),
  }));
  const points = series.flatMap((item) => item.points);
  const max = Math.max(...points.map((point) => point.kmPerUnit), 1);

  return (
    <>
      <h2 className="odo-kicker">Mileage over time</h2>
      {points.length === 0 ? (
        <p className="odo-muted">Needs one more full fill</p>
      ) : (
        <svg className="odo-chart" viewBox="0 0 320 160" role="img" aria-label={series.map((item) => `${fuelLabel(item.fuel)} ${item.points.length ? item.points.map((point) => point.kmPerUnit.toFixed(1)).join(", ") : "Needs one more full fill"}`).join(". ")}>
          {series.map((item) => {
            if (item.points.length === 0) return null;
            const step = item.points.length === 1 ? 0 : 260 / (item.points.length - 1);
            const coords = item.points.map((point, index) => ({ x: 30 + index * step, y: 140 - (point.kmPerUnit / max) * 110 }));
            const line = coords.map((point) => `${point.x},${point.y}`).join(" ");
            return (
              <g key={item.fuel} className="odo-chart-line">
                {coords.length > 1 && <polyline fill="none" stroke={shade[item.fuel]} strokeWidth="2" points={line} />}
                {coords.map((point) => (
                  <circle key={`${item.fuel}-${point.x}`} cx={point.x} cy={point.y} r="4" fill={shade[item.fuel]} />
                ))}
              </g>
            );
          })}
        </svg>
      )}
      <ul className="odo-legend">
        {series.map((item) => (
          <li key={item.fuel}>
            <span className="odo-swatch" style={{ background: shade[item.fuel] }} />
            {fuelLabel(item.fuel)}
            <strong>{item.points.length === 0 ? "Needs one more full fill" : `${item.points.at(-1)?.kmPerUnit.toFixed(1)} ${mileageUnit(item.fuel)}`}</strong>
          </li>
        ))}
      </ul>
    </>
  );
}

function csvRow(record: RecordItem, nickname: string): string[] {
  if (record.kind === "fuel") {
    return [
      record.date,
      nickname,
      "fuel",
      record.fuelType,
      String(record.quantity),
      quantityUnit(record.fuelType),
      String(record.amount),
      record.odometer == null ? "" : String(record.odometer),
      record.fullTank ? "yes" : "no",
    ];
  }
  return [record.date, nickname, record.kind, record.name, "", "", String(record.amount), "", ""];
}
