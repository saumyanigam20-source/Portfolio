export type ProblemReveal = {
  id: string;
  label: string;
  detail: string;
};

export const trackAndTraceMeta = {
  title: "Track & Trace Mobile",
  slug: "track-and-trace",
  company: "KlearNow.AI",
  role: "UX Designer",
  tags: ["UI/UX", "Mobile", "Product Design", "UX Research"],
  category: "work",
  cover: "/images/case-studies/track-and-trace/cover.svg",
  summary:
    "A mobile app that shows brokers, truckers and ops teams what needs attention, so a status check never has to wait for a laptop.",
} as const;

export const trackAndTraceContent = {
  meta: trackAndTraceMeta,
  snapshot: [
    { label: "Role", value: "UX designer, from research to final UI" },
    { label: "Team", value: "Product manager, engineers" },
    { label: "Product", value: "KlearNow, mobile app" },
  ],
  goals: {
    intro:
      "Shipment status is something people need while they’re moving. These are the results the app is designed to move:",
    bullets: [
      "Fewer missed or late pickups",
      "Lower demurrage charges",
      "Faster time to find a shipment’s status",
      "More status checks done on a phone instead of a laptop",
    ],
  },
  problem: {
    lead: "The people who most need a shipment’s status are rarely sitting at a desk. They’re moving between a truck, a port and a warehouse. But the status lived on a laptop.",
    stakes:
      "That matters because a late status can mean a truck arriving too late to collect a container, or a container sitting at the port past its free days and costing demurrage charges.",
    aside: "It’s like being able to check your Zomato order only on a laptop at home.",
    before: ["On the move", "Find a laptop", "Log in", "Search", "See status"],
    after: ["On the move", "Open, see it"],
    caption: "The status was never missing. It was just not where people were.",
    pull: "The answer should reach people where they are.",
  },
  audience: {
    body: "Brokers, truckers and operational people. Different jobs, same situation: they’re on the move and need an answer in seconds.",
    labels: ["Brokers", "Truckers", "Operations"],
  },
  scope: {
    body: "The desktop has room for big tables. A phone doesn’t. So I didn’t shrink the desktop. I interviewed each group, listed what each persona really needs, and kept only what earned its place.",
    steps: ["Interview", "List what each persona needs", "Keep only what earns space"],
  },
  home: {
    body: "A Visibility Overview. Each tile is one number you can read at a glance, and the tiles were chosen from what people said in interviews.",
    notes: [
      "Numbers you can scan: active shipments, shipments at risk and journey statuses, one number each.",
      "Direction, not just count: a small trend sits under every label.",
      "Red means act: tiles like “LFD in 48 hours” (last free day) are marked “Action needed”, so a demurrage risk stands out before it costs money.",
    ],
  },
  rule: {
    body: "The number on a tile is the list behind it. Tap 12 and you see exactly 12 shipments. No extra filtering, no surprises.",
  },
  deeper: {
    body: "Open any shipment and you get what you need to act on it, without calling anyone.",
    journey: "Further details of where the shipment has been and where it is.",
    documents: "The shipment’s documents, right there on the phone.",
  },
  forward: [
    "On a small screen, prioritising is the design work. The interviews decided what stayed.",
    "A number should always match the list behind it, so people can trust what they see.",
    "Design for where people are, not where the software is.",
  ],
};
