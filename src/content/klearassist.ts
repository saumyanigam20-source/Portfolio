export const klearassistMeta = {
  title: "KlearAssist – Conversational AI Assistant",
  slug: "klearassist",
  company: "KlearNow.AI",
  role: "UX Designer",
  tags: ["Conversational UX", "UX Research", "Enterprise AI", "Information Architecture"],
  category: "work",
  cover: "/images/case-studies/klearassist/cover.svg",
  summary:
    "An assistant that lives on the KlearNow desktop — not a separate app. People ask in plain language, see the right record, and take the next step without learning ten modules.",
} as const;

export const klearassistLead =
  "A small assistant that takes you straight to the one detail you need, so nobody has to hunt through tables to find it.";

/** Paste a prototype URL here. A Figma link is embedded; any other URL is iframed as-is. */
export const klearassistPrototypeUrl = "";

export const klearassistContent = {
  meta: klearassistMeta,
  snapshot: [
    { label: "Role", value: "End-to-end UX" },
    { label: "Team", value: "PM, engineering, support" },
    { label: "Product", value: "Desktop, embedded in KlearNow" },
    { label: "Timeline", value: "Research to live release" },
  ],
  impact: {
    body: "KlearAssist is live for customers. People who use it every day say it fits the way they already work: they no longer hunt through tables for one detail or wade through clutter.",
    bullets: [
      "Status: live, with customer reviews.",
      "Expected to move: clicks to reach a detail, and “where do I find...?” questions to support.",
    ],
    note: "These are the metrics I expected to move; they weren’t formally measured.",
  },
  problem: {
    body: "To find one small detail in KlearNow, like a port of lading or an ETA, you had to go to a table, set filters or use global search, and click several times. The data was there, but there was no direct way to it.",
    aside:
      "It's like asking a shopkeeper 'Bhaiya, Maggi hai?' and being handed the whole stock register to search.",
    before: ["Need an ETA", "Open table", "Set filters", "Global search", "Several clicks"],
    after: ["Need an ETA", "Ask, get it"],
    caption: "The data was never missing. The path to it was.",
  },
  started: {
    paragraphs: [
      "A small complaint came in through customer support. One customer wanted to see the port of lading or unlading across multiple shipments, and the only way was to open each shipment and look for it.",
      "It could have been a quick patch. But I noticed it wasn’t new: people had been running into the same thing for a long time, and nobody had properly addressed it.",
    ],
    pull: "One small detail shouldn’t cost you a journey through the product.",
  },
  firstIdea: {
    cards: [
      {
        label: "First idea",
        body: "A customizable dashboard, built on research and user interviews, so users could choose the data they cared about.",
      },
      {
        label: "What I realised",
        body: "Every user has their own way of getting things done, so no single dashboard could fit everyone.",
      },
    ],
    close:
      "I stopped asking “where should the data sit?” and started asking “what does this person want to do?” The answer was to let people go from a small detail to an action in one step, the way we already use AI tools.",
  },
  modules: {
    paragraphs: [
      "KlearNow isn’t one product. It’s many modules, each with its own users and its own linked data. A generic chatbot would have been noisy and often wrong.",
      "I used user interviews and module research to sort what mattered: major data from minor data, and read-only information from things people can act on. Then I designed the assistant around the module the user is in.",
    ],
    names: ["Admin", "Entity", "Finance", "Master data", "Transactions", "Payments", "KlearHub"],
    active: "KlearHub",
    panel: "You’re in KlearHub, so suggestions are only about KlearHub",
    chips: ["Track a shipment", "Upcoming ETAs", "Delays"],
    caption: "Move to another module and the suggestions change with it.",
  },
  solution: {
    body: "It looks like a chatbot, but it works like a shortcut. A chat icon sits at the bottom right of the screen. At login a short intro explains what it does, and after that the icon stays quietly in place until needed.",
    screens: [
      {
        src: "/images/case-studies/klearassist/flow-01-launcher.png",
        alt: "KlearNow dashboard with the KlearAssist chat icon at the bottom right. The panel is closed.",
        caption: "The entry point is small, always there and never in the way.",
      },
      {
        src: "/images/case-studies/klearassist/flow-02-intents.png",
        alt: "KlearAssist panel open on the KlearHub dashboard, with suggestions to track a shipment, show upcoming ETAs, and view delayed shipments.",
        caption: "Suggestions come from the module you’re in.",
      },
    ],
  },
  customers: {
    body: "Customers who use it daily told us it goes with their workflow. They don’t need to hunt inside table structures for one specific detail or deal with cluttered details.",
    pull: "It goes with our workflow. We don’t have to hunt through a table for one detail.",
    caption: "Customer using KlearAssist daily, feedback condensed.",
  },
  forward: [
    "A small complaint can point to a big problem. Look for the pattern before fixing the ticket.",
    "Let go of an idea you’ve invested in when the evidence says it won’t fit everyone.",
    "Design AI around what people want to do, not around where the data sits.",
  ],
  prototypeIntro: "Ask it the way you’d ask a colleague.",
  guide: [
    {
      id: "problem",
      label: "Problem",
      title: "The problem, simply",
      body: "The data was there. The path to it was not.",
    },
    {
      id: "started",
      label: "Start",
      title: "How it started",
      body: "One support complaint, and a pattern behind it.",
    },
    {
      id: "idea",
      label: "Idea",
      title: "The first idea didn’t hold",
      body: "No single dashboard could fit every way of working.",
    },
    {
      id: "modules",
      label: "Modules",
      title: "Many modules",
      body: "Suggestions follow the module you’re in.",
    },
    {
      id: "solution",
      label: "Solution",
      title: "The solution",
      body: "A shortcut that looks like a chat.",
    },
    {
      id: "customers",
      label: "Customers",
      title: "What customers said",
      body: "It goes with the way they already work.",
    },
    {
      id: "forward",
      label: "Forward",
      title: "What I’d take forward",
      body: "Pattern first. Evidence over a pet idea. Design for the job.",
    },
    {
      id: "try",
      label: "Try",
      title: "Try the prototype",
      body: "Ask it the way you’d ask a colleague.",
    },
    {
      id: "impact",
      label: "Impact",
      title: "What changed",
      body: "Live for customers. The numbers I expected to move.",
    },
  ],
};
