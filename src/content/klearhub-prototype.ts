export type JobChip = "all" | "delayed" | "lfd" | "at-pol" | "in-transit";

export type Shipment = {
  id: string;
  company: string;
  knId: string;
  mode: "Ocean" | "Air";
  status: string;
  statusTone: "ok" | "warn" | "risk";
  origin: string;
  originCode: string;
  etd: string;
  dest: string;
  destCode: string;
  eta: string;
  container: string;
  mbl: string;
  po: string;
  nextAction: string;
  delayed?: boolean;
  lfdRisk?: boolean;
  inTransit?: boolean;
  atPol?: boolean;
};

export type PrototypeDoc = {
  id: string;
  title: string;
  ingested: string;
};

export const jobChips: { id: JobChip; label: string }[] = [
  { id: "all", label: "All" },
  { id: "delayed", label: "Delayed" },
  { id: "lfd", label: "Last free day" },
  { id: "at-pol", label: "At POL" },
  { id: "in-transit", label: "In transit" },
];

export const klearhubShipments: Shipment[] = [
  {
    id: "kx-a7j4",
    company: "Schlumberger Argentina",
    knId: "KX-A7J4-73",
    mode: "Ocean",
    status: "At POL",
    statusTone: "risk",
    origin: "Charleston",
    originCode: "USCHS",
    etd: "Aug 21",
    dest: "Hamburg",
    destCode: "DEHAM",
    eta: "Sep 22",
    container: "HLBU8168248",
    mbl: "HLCUOS1250801516",
    po: "4514710485",
    nextAction: "Last free day in 2 days — request drayage",
    lfdRisk: true,
    atPol: true,
  },
  {
    id: "kx-u1c6",
    company: "MI-Overseas",
    knId: "KX-U1C6-8389",
    mode: "Ocean",
    status: "Delayed",
    statusTone: "warn",
    origin: "Houston",
    originCode: "USHOU",
    etd: "Aug 21",
    dest: "Genoa",
    destCode: "ITGOA",
    eta: "Oct 10",
    container: "SMLU7834358",
    mbl: "HLCUGOA2508AQEJ2",
    po: "4514710485",
    nextAction: "Carrier delay · new ETA Oct 10",
    delayed: true,
  },
  {
    id: "kx-uic8",
    company: "Global Trade Inc.",
    knId: "KX-UIC8-900",
    mode: "Ocean",
    status: "In transit",
    statusTone: "ok",
    origin: "Los Angeles",
    originCode: "USLAX",
    etd: "Aug 25",
    dest: "Rotterdam",
    destCode: "NLRTM",
    eta: "Sep 28",
    container: "MSKU1234567",
    mbl: "MAEUX123456789",
    po: "789654123",
    nextAction: "On schedule to Rotterdam",
    inTransit: true,
  },
];

export const klearhubDocs: PrototypeDoc[] = [
  { id: "ci", title: "Commercial Invoice", ingested: "Sep 19, 2025" },
  { id: "bl", title: "Bill of Lading", ingested: "Sep 18, 2025" },
  { id: "pl", title: "Packing List", ingested: "Sep 18, 2025" },
];

export const prototypeCaptions: Record<string, { title: string; body: string }> = {
  home: {
    title: "One home, not two dashboards",
    body: "Alerts, search, and what needs a decision. KPIs that were duplicated on Dashboard and KlearHub Overview are gone.",
  },
  shipments: {
    title: "Find a shipment",
    body: "One list. Job chips instead of Overview vs Visibility. Cards answer where it is, which one, and what’s next.",
  },
  filters: {
    title: "Filters that speak ops",
    body: "Quick jobs first. Last free day is spelled out. Copy is about shipments — not “filter users.”",
  },
  status: {
    title: "Status is the workspace",
    body: "Compliance and the next action on the first screen. Request Drayage lives here, not behind a promo page.",
  },
  move: {
    title: "Route without the dump",
    body: "Origin, destination, and dates as a timeline — not an accordion of every field from desktop.",
  },
  docs: {
    title: "Documents in the same tree",
    body: "Stay on the shipment. Open a file, then share. No extra hop to a separate docs product.",
  },
  drayage: {
    title: "Drayage as a task",
    body: "Which container, which window, confirm. The phone number is a fallback — not the story.",
  },
  preview: {
    title: "A preview you can use",
    body: "The file is on screen. Share sits in one place instead of print, email, and download as three flows.",
  },
  share: {
    title: "One share sheet",
    body: "Email, download, or print from the same sheet. Success is explicit so the action feels finished.",
  },
  success: {
    title: "Closed loop",
    body: "The team knows it landed. Back to the shipment — still in the same mobile journey.",
  },
  alerts: {
    title: "Alerts are work, not a feed",
    body: "Each alert is a job: delayed cargo or last-free-day risk, with a direct path into the shipment.",
  },
  more: {
    title: "Everything else stays backstage",
    body: "Profile and settings don’t compete with tracking. Four tabs: Home, Shipments, Alerts, More.",
  },
};
