export type DialogueMessage = {
  id: string;
  speaker: "saumya" | "ops" | "system";
  label: string;
  text: string;
};

export type ProblemReveal = {
  id: string;
  label: string;
  detail: string;
};

export type ProcessStep = {
  title: string;
  body: string;
};

export const trackAndTraceMeta = {
  title: "Track & Trace Mobile App",
  slug: "track-and-trace",
  company: "KlearNow.AI",
  role: "UX Designer",
  tags: ["UI/UX", "Mobile", "Product Design", "UX Research"],
  category: "work",
  cover: "/images/case-studies/track-and-trace/cover.svg",
  summary:
    "A mobile Track & Trace experience for logistics teams — clear shipment status, multi-format lookup, and documents on the go.",
} as const;

export const trackAndTraceContent = {
  meta: trackAndTraceMeta,
  problemDialogue: [
    {
      id: "p1",
      speaker: "ops",
      label: "Ops lead",
      text: "We’re still jumping between desktop tools just to answer one question — where is this shipment, and is it clearable?",
    },
    {
      id: "p2",
      speaker: "saumya",
      label: "Saumya",
      text: "So the pain isn’t “tracking exists” — it’s that tracking isn’t usable when people are away from their desk.",
    },
    {
      id: "p3",
      speaker: "ops",
      label: "Ops lead",
      text: "Exactly. Numbers come in as MBL, HAWB, railbill… and status language is inconsistent. Then someone has to dig for ABI docs.",
    },
    {
      id: "p4",
      speaker: "saumya",
      label: "Saumya",
      text: "Let’s map the failure points. Tap below if you want the detail behind each one.",
    },
  ] satisfies DialogueMessage[],
  problemReveals: [
    {
      id: "formats",
      label: "Too many formats",
      detail:
        "Teams track with MBL, HAWB, railbill, PARS/PAPS — but the old flow assumed one mental model. Wrong format = dead end or support tickets.",
    },
    {
      id: "status",
      label: "Unclear status",
      detail:
        "Admissible, declaration, and PGA signals were hard to scan. People re-checked desktop tools to trust what they saw.",
    },
    {
      id: "docs",
      label: "Docs not on the go",
      detail:
        "ABI documents lived in separate paths. On a warehouse floor or in transit, that delay blocked decisions.",
    },
    {
      id: "mobile",
      label: "Desktop-first friction",
      detail:
        "The experience wasn’t designed for quick, one-handed checks. Mobile was an afterthought, not a primary job.",
    },
  ] satisfies ProblemReveal[],
  solutionDialogue: [
    {
      id: "s1",
      speaker: "saumya",
      label: "Saumya",
      text: "What if Track & Trace were a phone-first flow: one input, clear validation, status you can trust in three seconds?",
    },
    {
      id: "s2",
      speaker: "ops",
      label: "Ops lead",
      text: "And if I need the ABI packet, I shouldn’t leave the same screen tree.",
    },
    {
      id: "s3",
      speaker: "saumya",
      label: "Saumya",
      text: "That’s the product bet — multi-format lookup, scannable compliance status, and document actions without the desktop detour.",
    },
    {
      id: "s4",
      speaker: "system",
      label: "Prototype",
      text: "Walk the redesigned phone flow below — home, shipment, drayage, documents.",
    },
  ] satisfies DialogueMessage[],
  process: [
    {
      title: "Research",
      body: "Mapped how ops, brokers, and coordinators chase status on mobile — and where formats + docs create rework.",
    },
    {
      title: "Flows",
      body: "One home, one shipment list, then a workspace: status, move, documents. Drayage is a task, not a landing page.",
    },
    {
      title: "UI",
      body: "Job chips instead of Overview vs Visibility. Cards answer where it is, which one, and what’s next. Share is one sheet.",
    },
  ] satisfies ProcessStep[],
  impact: [
    "Faster status checks away from desktop",
    "Fewer format-related dead ends through guided input",
    "Documents reachable inside the same mobile journey",
    "Clearer trust in compliance signals on a small screen",
  ],
};
