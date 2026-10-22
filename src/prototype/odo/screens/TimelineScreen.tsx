import { useMemo, useState } from "react";
import { formatDate, recordDetail, recordTitle, rupees } from "../format";
import { scopedVehicles } from "../stats";
import { useOdo } from "../store";
import type { RecordItem } from "../types";
import { WheelFace } from "../ui/Marks";

const filters = [
  { id: "all", label: "All" },
  { id: "fuel", label: "Fuel" },
  { id: "part", label: "Parts" },
  { id: "service", label: "Service" },
] as const;

type FilterId = (typeof filters)[number]["id"];

export function TimelineScreen() {
  const { vehicles, records, selectedId } = useOdo();
  const [filter, setFilter] = useState<FilterId>("all");
  const [query, setQuery] = useState("");
  const ids = scopedVehicles(vehicles, selectedId).map((vehicle) => vehicle.id);

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matched = records.filter((record) => {
      if (!ids.includes(record.vehicleId)) return false;
      if (filter !== "all" && record.kind !== filter) return false;
      if (!needle) return true;
      const vehicle = vehicles.find((item) => item.id === record.vehicleId);
      const haystack = `${recordTitle(record)} ${recordDetail(record, vehicle)} ${record.kind}`.toLowerCase();
      return haystack.includes(needle);
    });
    matched.sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
    const buckets = new Map<string, RecordItem[]>();
    for (const record of matched) {
      const list = buckets.get(record.date) ?? [];
      list.push(record);
      buckets.set(record.date, list);
    }
    return [...buckets.entries()];
  }, [filter, ids, query, records, vehicles]);

  return (
    <div className="odo-scroll odo-pad">
      <h1 className="odo-title">Timeline</h1>
      <label className="odo-search">
        <span className="odo-sr">Search records</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" aria-label="Search records" />
      </label>
      <div className="odo-chips" role="group" aria-label="Record type">
        {filters.map((item) => (
          <button key={item.id} type="button" className="odo-chip odo-chip-ink" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      {groups.length === 0 ? (
        <div className="odo-empty">
          <WheelFace />
          <p>No records yet.</p>
        </div>
      ) : (
        groups.map(([date, items]) => (
          <section key={date} className="odo-day">
            <h2>{formatDate(date)}</h2>
            <ul>
              {items.map((record) => {
                const vehicle = vehicles.find((item) => item.id === record.vehicleId);
                return (
                  <li key={record.id} className="odo-row">
                    <div>
                      <p className="odo-strong">{recordTitle(record)}</p>
                      <p className="odo-muted">{recordDetail(record, vehicle)}</p>
                    </div>
                    <p className="odo-row-amount">{rupees(record.amount)}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
