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

export const klearassistContent = {
  meta: klearassistMeta,
  snapshot: [
    { label: "Platform", value: "Desktop · embedded in KlearNow" },
    { label: "Role", value: "End-to-end UX" },
    { label: "Collaborators", value: "PM, engineering, support" },
    { label: "Focus", value: "Intent → data → action" },
  ],
  overview: {
    eyebrow: "What this is",
    title: "A way into a huge system, in ordinary words",
    body: [
      "KlearNow helps companies move goods across borders. The product is strong. It is also dense. Administration, entity, finance, master data, transactions, payments, and KlearHub each have their own menus.",
      "KlearAssist is not a chatbot for chatting. It is a small panel on the dashboard that understands a request, fetches the right record, and shows it as text, a card, or a table — then offers a real next step.",
      "Track & Trace was a phone for people away from a desk. This work is the opposite job: people already at the desktop, lost inside the desktop.",
    ],
  },
  problem: {
    eyebrow: "The problem, simply",
    title: "The data was there. The door was not.",
    body: "Operators did not fail the task. They failed at finding where the task lived. A question like “what is arriving this week?” meant a map of the product, not a sentence. Training and Slack became the real interface.",
    points: [
      {
        title: "Ten doors, one question",
        body: "Each module taught a different mental model. People remembered jobs, not navigation labels.",
      },
      {
        title: "Onboarding as a crutch",
        body: "Even experienced users kept manuals open. The product assumed they would learn the map.",
      },
      {
        title: "Answers that don’t act",
        body: "A paragraph about overdue invoices is not a payment. The assistant had to change the screen, not only talk.",
      },
    ],
  },
  research: {
    eyebrow: "User research",
    title: "Who we listened to, and what they actually do",
    intro:
      "I treated this as a finding problem, not a “make AI sound friendly” problem. The work started with how people already get answers today — then we designed the shortcut.",
    methods: [
      {
        title: "Interviews",
        body: "Sat with super admins, finance managers, and ops / trade leads. Asked them to narrate the last time they hunted for a record, including who they pinged when they got stuck.",
      },
      {
        title: "Support and training",
        body: "Read internal how-to notes and support patterns. Recurring tickets were not bugs — they were missing doors: users, invoices, contract dates, shipments this week.",
      },
      {
        title: "Task walkthroughs",
        body: "Mapped live clicks for “show users,” “overdue invoices,” and “arriving shipments.” Counted how many modules a single sentence crossed.",
      },
    ],
    findings: [
      {
        quote: "I know it’s in there. I don’t know which filter.",
        who: "Finance manager",
      },
      {
        quote: "If I have to train every new hire on KlearHub, we will never scale ops.",
        who: "Operations lead",
      },
      {
        quote: "Show me the list. Don’t send me to a page I have to rebuild.",
        who: "Super admin",
      },
    ],
    insights: [
      "Jobs are sentences. Interfaces are trees. The gap is the product.",
      "People trust a table they can scan more than a confident paragraph.",
      "If an AI action is wrong, they will not try a second time — errors needed a next step, not a stack trace.",
      "The assistant must stay inside KlearNow chrome. A new product would be another thing to learn.",
    ],
  },
  personas: [
    {
      id: "brooke",
      name: "Brooke Nation",
      role: "Trade operations coordinator",
      goal: "Know what is arriving this week, and what is late, without rebuilding a KlearHub view.",
      context:
        "Brooke lives in exceptions. Her morning is ETAs, delays, and a Slack thread that starts with a screenshot. She is the person the Figma flow greets by name.",
      says: "Just tell me what’s coming, and what’s slipping.",
      needs: ["Upcoming ETAs as a list", "Delayed shipments in one tap", "Stay on the dashboard"],
      not: ["A second tracking app", "Another dashboard of KPIs"],
    },
    {
      id: "jordan",
      name: "Jordan Cole",
      role: "Finance manager",
      goal: "See overdue invoices as risk, then start payment from the same turn.",
      context:
        "Jordan’s week is credits, contracts, and aging. She can work Billing — she should not have to remember its IA every Monday.",
      says: "If it’s overdue, show me red rows. Then let me pay.",
      needs: ["Counts she can trust", "Highlighted risk", "A payment action"],
      not: ["A chatty summary with no numbers"],
    },
    {
      id: "asha",
      name: "Asha Mehta",
      role: "Super admin",
      goal: "Find and manage users without Administration → User Management → hunt.",
      context:
        "Asha onboards tenants and cleans access. She is asked “who has access?” daily. Four clicks for a list is four clicks too many.",
      says: "Show me all users. Then let me edit.",
      needs: ["Searchable tables", "Role-aware results", "Clear permission errors"],
      not: ["A bot that invents access it cannot grant"],
    },
  ],
  concepts: [
    {
      id: "palette",
      title: "A. Command palette only",
      verdict: "Too hidden",
      body: "⌘K already sat on the dashboard. Turning Assist into a search overlay was fast for power users and invisible to everyone else. No room for suggested jobs, tables, or history.",
    },
    {
      id: "takeover",
      title: "B. Full-page chatbot",
      verdict: "Too much product",
      body: "Replace the dashboard with a chat canvas. It photographed well and failed the brief: people still needed Critical Alerts and KlearHub behind them. Assist would compete with the home they already trust.",
    },
    {
      id: "dock",
      title: "C. Docked panel, then a workspace",
      verdict: "Shipped direction",
      body: "A launcher on the live dashboard. A compact KlearAssist panel with greetings and jobs. A table inside the panel when the answer is a list. Maximize into a full workspace with saved conversations. This is the Figma flow.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Map the modules to sentences",
      body: "Wrote an intent table: Admin “show all users,” Finance “overdue invoices,” Entity “add a sub-customer,” KlearHub “shipments arriving this week.” If a sentence had no home, the assistant should not pretend.",
    },
    {
      step: "02",
      title: "Watch the real path",
      body: "Walked the live clicks beside operators. The conversation design did not invent jobs — it shortened paths people already paid for in time.",
    },
    {
      step: "03",
      title: "Sketch three homes for the AI",
      body: "Palette, takeover, docked panel. We kept the dashboard and put Assist on it, because Brooke’s job starts with alerts, not a blank chat.",
    },
    {
      step: "04",
      title: "Design how answers look",
      body: "Single value → text. Summary → card. Many records → table. Risk → highlight. Action → confirmable control. This is a UI controller, not a novelist.",
    },
    {
      step: "05",
      title: "Prototype the Figma path",
      body: "Launcher → “Hi Brooke” jobs → typed question → shipment table → expand to a workspace with history. Same enterprise language as the rest of KlearNow.",
    },
    {
      step: "06",
      title: "Error as a next step",
      body: "Session, permission, missing input, network. Each failure says what happened and what to do. Trust is a designed state.",
    },
  ],
  patterns: [
    { data: "One number", ui: "Plain text", example: "Contract expires 12 Nov" },
    { data: "A summary", ui: "Card", example: "3 overdue · $48,210" },
    { data: "Many records", ui: "Table", example: "Upcoming shipments 16–22 Sept" },
    { data: "Risk", ui: "Highlight", example: "Delayed rows, LFD" },
    { data: "A task", ui: "Action", example: "Make payment / edit user" },
  ],
  figmaFlow: [
    {
      src: "/images/case-studies/klearassist/flow-01-launcher.png",
      title: "01 · Stay on the dashboard",
      body: "Assist does not replace home. Brooke still sees greeting, critical work, and KlearHub. A launcher sits on the canvas she already uses — same idea as the Chatbot icon in Figma.",
    },
    {
      src: "/images/case-studies/klearassist/flow-02-intents.png",
      title: "02 · Open a panel, not a new product",
      body: "The panel is named KlearAssist. It greets Brooke and offers jobs in her language: track a shipment, upcoming ETAs, delayed shipments. Suggested intents mean she does not have to invent the prompt.",
    },
    {
      src: "/images/case-studies/klearassist/panel-intents.png",
      title: "03 · Jobs before a blank box",
      body: "Track, ETAs, delays. Each row is a real KlearHub question. The composer still lets her type — “Ask about shipments…” — but the first screen teaches the vocabulary.",
    },
    {
      src: "/images/case-studies/klearassist/flow-03-table.png",
      title: "04 · Lists become tables",
      body: "“Upcoming Shipments (16–22 Sept)” is not a paragraph. It is Shipment ID, container, origin, ETA, status — KX-A7J4-73 at POL, KX-U1C6-8389 in transit. Scan like the rest of the platform.",
    },
    {
      src: "/images/case-studies/klearassist/flow-04-workspace.png",
      title: "05 · Maximize into a workspace",
      body: "When the thread needs room, the panel expands. History on the left (“No saved conversations yet”), jobs on the right. Same intents, more canvas. Minimize returns her to the dashboard.",
    },
  ],
  iaCaption:
    "Every module had to earn a sentence. If we could not say the job in one line, the assistant had no business answering it.",
  conversationCaption:
    "Deep menus became follow-ups. “Let’s add a new user. Select the type.” is the same work as Administration → User Management — without the tree.",
  principles: [
    {
      title: "Progressive disclosure",
      body: "Show the next useful thing. Tables wait until the question needs a list.",
    },
    {
      title: "Context before cleverness",
      body: "Role, permissions, and current module shape the answer. The bot does not over-promise.",
    },
    {
      title: "Visual hierarchy",
      body: "Critical → cards. Volume → tables. Status → color. Action → a control she can press.",
    },
  ],
  impact: [
    "User lookup: a four-step admin path becomes one prompt and a table.",
    "Finance: overdue invoices show as risk, with payment in the same turn.",
    "Ops: arriving and delayed shipments stay on the dashboard instead of a KlearHub rebuild.",
    "Errors speak in next steps, so a failed export does not kill trust.",
    "The assistant steers UI. It is not a second product to learn.",
  ],
};
