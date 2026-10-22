import { useState } from "react";
import { downloadText, rupees, toCsv } from "../format";
import { categoryTotals, yearsIn } from "../stats";
import { useOdo } from "../store";
import type { RecordItem } from "../types";

const bars = [
  { key: "fuel", label: "Fuel", color: "#1A6BFF" },
  { key: "part", label: "Parts", color: "#3D3DFF" },
  { key: "service", label: "Service", color: "#19D68A" },
  { key: "insurance", label: "Insurance", color: "#FFC21A" },
] as const;

export function ReportScreen() {
  const { records, vehicles } = useOdo();
  const todayYear = new Date().getFullYear();
  const years = yearsIn(records, todayYear);
  const [year, setYear] = useState(todayYear);
  const totals = categoryTotals(records, year);
  const max = Math.max(...bars.map((bar) => totals[bar.key]), 1);
  const yearTotal = bars.reduce((sum, bar) => sum + totals[bar.key], 0);
  const lastYearTotal = bars.reduce((sum, bar) => sum + categoryTotals(records, year - 1)[bar.key], 0);
  const summary = bars.map((bar) => `${bar.label} ${rupees(totals[bar.key])}`).join(", ");

  const exportCsv = () => {
    const header = ["date", "vehicle", "category", "detail", "quantity", "unit", "amount_inr", "odometer_km", "full_tank"];
    const rows = records
      .filter((record) => record.date.startsWith(String(year)))
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((record) => csvRow(record, vehicles.find((vehicle) => vehicle.id === record.vehicleId)?.nickname ?? ""));
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
      <p className="odo-stat-value odo-stat-value-sm">{rupees(yearTotal)}</p>
      <p className="odo-muted">Total in {year}</p>
      <svg className="odo-chart" viewBox="0 0 320 180" role="img" aria-label={`Spending in ${year}. ${summary}`}>
        {bars.map((bar, index) => {
          const height = (totals[bar.key] / max) * 120;
          const x = 18 + index * 78;
          return (
            <g key={bar.key}>
              <rect x={x} y={140 - height} width="54" height={Math.max(height, totals[bar.key] > 0 ? 4 : 0)} rx="12" fill={bar.color} />
              <text x={x + 27} y="166" textAnchor="middle" fill="currentColor" fontSize="13">
                {bar.label}
              </text>
            </g>
          );
        })}
      </svg>
      <ul className="odo-legend">
        {bars.map((bar) => (
          <li key={bar.key}>
            <span style={{ background: bar.color }} />
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

function csvRow(record: RecordItem, nickname: string): string[] {
  if (record.kind === "fuel") {
    return [
      record.date,
      nickname,
      "fuel",
      record.fuelType,
      String(record.quantity),
      record.fuelType === "cng" ? "kg" : record.fuelType === "electric" ? "kWh" : "litres",
      String(record.amount),
      record.odometer == null ? "" : String(record.odometer),
      record.fullTank ? "yes" : "no",
    ];
  }
  return [record.date, nickname, record.kind, record.name, "", "", String(record.amount), "", ""];
}
