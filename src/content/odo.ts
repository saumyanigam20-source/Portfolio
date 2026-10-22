export const odoMeta = {
  title: "odo",
  slug: "odo",
  company: "Self-initiated concept project",
  role: "Research, product definition, UX and UI, prototype",
  tags: ["Mobile"],
  category: "work",
  cover: "/images/case-studies/odo/cover.svg",
  summary:
    "A friendly app to record everything about your car or scooter, from petrol average to parts and warranties.",
} as const;

export const odoLead = "One place for everything about your vehicle.";

export const odoPrototypeHref = "#odo-prototype";

export const odoSnapshot = [
  { label: "Type", value: "Self-initiated concept project" },
  { label: "Role", value: "Research, product definition, UX and UI, prototype" },
  { label: "Platform", value: "Mobile (iPhone and Android), with web planned" },
  { label: "Prototype", value: "Built in one week, runs in the browser on sample data" },
  { label: "Tools", value: "Claude, Cursor" },
] as const;

export const odoGoal = {
  intro:
    "Make it easy for anyone in India who owns a car or a two-wheeler to answer three questions at any moment:",
  bullets: [
    "What have I spent? One glance gives this year's total, by category.",
    "What was done, and what is due? Every service, part and document in one timeline, with reminders that do not nag.",
    "Is my vehicle getting better or worse value? Mileage, cost per km and a clear signal when repairs start to outweigh the vehicle.",
  ],
  close:
    "These are the goals the design is measured against. Results will come once real people use it.",
} as const;

export const odoProblem = [
  'Ask a vehicle owner, "How much did your car cost you last year?" Most will guess.',
  "Petrol goes in at the pump. A service happens at the workshop. Insurance renews online. A new battery is bought on a Saturday. The money leaves in small pieces, and the proof of it ends up in different places or nowhere at all.",
  "I own a car and a scooter, and I do not track the cost of either. I could not tell you my yearly spend, my petrol average, or when I last changed a part. That is the problem: not a lack of apps, but a lack of one simple place that takes less effort than forgetting.",
] as const;

export const odoAudience = [
  "Daily commuters who want to know what the drive really costs",
  "Families with a car and a two-wheeler",
  "New owners who do not yet know what is normal",
  "People buying or selling a used vehicle, who need proof of history",
  "Cab and taxi owners with one or two vehicles",
] as const;

export const odoInterviewNote =
  "Add: who you interviewed (for example 5 vehicle owners), what they track today, and what surprised you. Add 2 or 3 findings here.";

export const odoPrototypeNote =
  "Add: link or button to open the prototype, plus 3 screenshots: home, add fuel, report.";

export const odoDecisions = [
  {
    title: "A vehicle recorder, not an expense tracker.",
    body: "My first idea was a simple expense log. But the questions people have are wider than money: what part was changed, when, under what warranty, and when is the next one due. So the product records every detail of the vehicle, and expenses are one view of it.",
  },
  {
    title: "Fuel maths that matches real life.",
    body: "In India people fill both ways: a full tank, or a fixed amount like ₹500. A simple \"litres per fill\" average would be wrong. Mileage is calculated between two full-tank fills, with every part-fill in between added in. The fuel form also changes by fuel type: litres for petrol and diesel, kg for CNG, kWh for electric.",
  },
  {
    title: "Built for the pump, not the desk.",
    body: 'People log standing at the pump or the workshop, usually with one hand. The product plans four ways to log: type it, pick from your last fill, say it ("500 petrol"), or scan the pump receipt. The prototype ships the first two.',
  },
  {
    title: "One app for a car and a scooter.",
    body: "Most households have both. A switcher lets you see one vehicle or both combined.",
  },
  {
    title: "Friendly, not financial.",
    body: "Spreadsheets feel like homework. The look is playful and warm, so logging feels closer to a diary than to accounting.",
  },
  {
    title: "Reports are what people pay for.",
    body: "The basics are free: one car and one two-wheeler, logging, timeline and reminders. Reports and export, cloud backup and sync, and family sharing sit in a paid plan, planned at ₹99 for the first year and ₹199 a year after. Nobody pays to enter data. They pay once the data has become valuable.",
  },
] as const;

export const odoFeatures = [
  ["Vehicle profile", "Make, model, year, fuel type, registration, purchase details and photo, for cars, bikes and scooters"],
  ["Expense log", "Every spend with category, date, note and optional receipt photo"],
  ["Fuel log", "Full-tank and fixed-amount fills, mileage between full fills, fuel spend per month and year"],
  ["Parts register", "Part name and brand, price, warranty, replacement due date, photo of the bill"],
  ["Service history", "Work done, workshop, cost, invoice, and what is due next"],
  ["Documents vault", "RC, insurance, pollution certificate, licence and warranty, with expiry dates"],
  ["Reminders", "Weekly nudges in the last month, by push, SMS, WhatsApp or email"],
  ["Odometer by photo", "Snap the dashboard; the app reads it and you confirm"],
  ["Timeline and search", "Every record in date order, filtered by type, year and category"],
  ["Reports and export", "Yearly total by category, fuel spend and mileage over time, cost per km, parts and warranty history, car vs scooter, as PDF or CSV"],
  ["Insights", "Am I spending more than last year? Which part costs the most? Is my mileage dropping? Is it time to sell or replace?"],
  ["Import", "Bring in old records from a spreadsheet or by photographing old bills"],
  ["Family sharing", "A family member can view, but not edit"],
] as const;

export const odoPrototypeBullets = [
  "Switch between vehicles and see petrol average, this year's spend, and the last fill and service on the home screen",
  "Log a fuel fill and watch the mileage update",
  "Add a part with brand, price, warranty and due date",
  "Scroll the timeline and open a yearly report by category",
] as const;

export const odoMeasure = {
  intro: "Targets for the first 90 days of a real launch, not results:",
  bullets: [
    "A median of under 15 seconds to add an expense",
    "40% of new users adding five or more records in week 1",
    "60% of users with at least one document and one reminder set",
    "35% still active after 30 days",
    "3 to 5% of free users moving to the paid plan",
  ],
} as const;

export const odoLearned = [
  "The hardest problem was not the interface. It was the maths. Real fuel habits do not fit a tidy formula, so the design started from how people fill, not from how apps usually calculate.",
  "Speed is a feature. Every field I considered adding had to earn its place against the 15-second rule.",
  "Not everything needs to ship to be real. The product is not launching now. It is part of my future plans, and the work so far shows how I define, scope and prototype a product end to end.",
] as const;
