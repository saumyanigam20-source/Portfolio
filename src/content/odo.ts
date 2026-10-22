export const odoMeta = {
  title: "odo",
  slug: "odo",
  company: "Product concept",
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
  { label: "Type", value: "Product concept" },
  { label: "Role", value: "Research, product definition, UX and UI, prototype" },
  { label: "Platform", value: "Mobile (iPhone and Android), web planned" },
  { label: "Tools", value: "Claude, Cursor" },
] as const;

export const odoGoal = {
  intro:
    "Let anyone in India who owns a car or a two-wheeler answer three questions at any moment:",
  bullets: [
    {
      lead: "What have I spent?",
      detail: "This year's total, by category, at a glance.",
    },
    {
      lead: "What was done, and what's due?",
      detail: "Every service, part and document on one timeline, with reminders that don't nag.",
    },
    {
      lead: "Is my vehicle getting better or worse value?",
      detail: "Mileage, cost per km, and a clear signal when repairs start to outweigh the vehicle.",
    },
  ],
  close: "These are the goals the design is measured against. Results will come once real people use it.",
} as const;

export const odoProblem = {
  open: "Ask someone, “How much did your car cost you last year?” Most will guess.",
  scatter:
    "The money leaves in small pieces, and the proof ends up in different places or nowhere at all.",
  aside: "It's like asking how much you spent on chai last year. Every cup was small, and nobody kept count.",
  close:
    "I own a car and a scooter, and I couldn't tell you my yearly spend, my petrol average, or when I last changed a part.",
  quote: "Not a lack of apps. A lack of one place that takes less effort than forgetting.",
} as const;

export const odoScatter = [
  { title: "Petrol", detail: "at the pump" },
  { title: "Service", detail: "at the workshop" },
  { title: "Insurance", detail: "renewed online" },
  { title: "Battery", detail: "bought on a Saturday" },
] as const;

export const odoAudience =
  "Daily commuters · Households with a car and a scooter · New owners · Used-vehicle buyers and sellers · Cab owners and the drivers they appoint.";

export const odoHeard = {
  intro:
    "I started with myself, the user who tracks nothing today, and then spoke with three people: Ashish and Aman, both corporate employees who commute by car, and Mohsin, a cab driver.",
  findings: [
    {
      lead: "Paperwork gets missed.",
      detail:
        "Ashish and Aman keep their car bills and papers themselves, and some things slip. They didn't want a bigger system. They wanted to log their car spend in a way they could use every day without it feeling like a task.",
    },
    {
      lead: "A cab has two users, not one.",
      detail:
        "Mohsin explained that the main user is the driver the owner appoints, while the owner mainly wants to see the fuel status.",
    },
  ],
  rulesIntro: "That became three design rules:",
  rules: [
    { title: "Faster than forgetting", detail: "Under 15 seconds per entry." },
    {
      title: "Reminders respect you",
      detail: "One a week in the last month before a due date, not a flood.",
    },
    {
      title: "The app gives back",
      detail: "It answers questions for you instead of just storing data.",
    },
  ],
} as const;

export const odoDecisions = [
  {
    title: "A vehicle recorder, not an expense tracker.",
    body: "My first idea was an expense log. But people's questions go wider than money: what part was changed, when, under what warranty, and when the next one is due. So the product records every detail, and expenses are one view of it.",
  },
  {
    title: "Fuel maths that matches real life.",
    body: "In India people fill both ways: a full tank, or a fixed amount like ₹500. A simple “litres per fill” average would be wrong. Mileage is worked out between two full-tank fills, with every part-fill in between added in.",
    fuel: true,
  },
  {
    title: "Built for the pump, not the desk.",
    body: "People log standing at the pump or the workshop, usually with one hand. The product plans four ways to log: type it, pick from your last fill, say it (“500 petrol”), or scan the pump receipt. The prototype ships the first two.",
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

export const odoFuelSteps = ["Full tank", "Part-fill", "Part-fill", "Full tank"] as const;

export const odoFuelCaption =
  "The fuel form also changes by fuel type: litres for petrol and diesel, kg for CNG, kWh for electric.";

export const odoInside = [
  ["Record", "Vehicle profile, expenses, fuel, parts, service history, odometer by photo"],
  ["Keep safe", "Documents vault with expiry dates, bill and receipt photos"],
  ["Remind", "Weekly nudges in the last month, by push, SMS, WhatsApp or email"],
  [
    "Understand",
    "Timeline and search, reports and export, insights, import of old records, family sharing (view only)",
  ],
] as const;

export const odoPrototypeIntro =
  "Built in one week as a working web version that runs on sample data for a car and a scooter. You can:";

export const odoPrototypeBullets = [
  "Switch between vehicles and see petrol average, this year's spend, and the last fill and service.",
  "Log a fuel fill and watch the mileage update.",
  "Add a part with brand, price, warranty and due date.",
  "Scroll the timeline and open a yearly report by category.",
] as const;

export const odoTargets = {
  intro: "For a real launch, not results:",
  cards: [
    { value: "15 sec", detail: "Median time to add an expense" },
    { value: "40%", detail: "Of new users adding five or more records in week 1" },
    { value: "60%", detail: "Of users with a document and a reminder set" },
    { value: "35%", detail: "Still active after 30 days" },
    { value: "3 to 5%", detail: "Of free users moving to the paid plan" },
  ],
} as const;

export const odoLearned = [
  "The hardest problem was the maths, not the interface. Real fuel habits don't fit a tidy formula, so the design started from how people fill, not from how apps usually calculate.",
  "Speed is a feature. Every field I considered had to earn its place against the 15-second rule.",
  "Not everything needs to ship to be real. The work shows how I define, scope and prototype a product end to end.",
] as const;
