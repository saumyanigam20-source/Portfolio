export type WorkPreview = {
  slug: string;
  title: string;
  discipline: string;
  role: string;
  outcome: string;
  stat: string;
  statLabel: string;
};

/** UX case studies, in reading order. Copy lives here so cards stay one component. */
export const workPreviews: WorkPreview[] = [
  {
    slug: "klearassist",
    title: "KlearAssist",
    discipline: "Conversational UX",
    role: "UX Designer",
    outcome:
      "Embedded an assistant on the KlearNow desktop so a four-step admin path becomes one prompt and a table.",
    stat: "4 steps → 1 prompt",
    statLabel: "User lookup",
  },
  {
    slug: "track-and-trace",
    title: "Track & Trace",
    discipline: "Mobile product",
    role: "UX Designer",
    outcome:
      "A mobile home for shipment status, multi-format lookup, and documents, so ops can answer where it is without the desktop.",
    stat: "One mobile journey",
    statLabel: "Status, move, documents",
  },
  {
    slug: "tracking-tool-redesign",
    title: "Tracking Tool",
    discipline: "Workflow redesign",
    role: "Product / UI-UX Designer",
    outcome:
      "Rebuilt shipment lookup so MBL, HAWB, and Railbill validate in one form, with status and ABI documents on the same page.",
    stat: "Three formats, one form",
    statLabel: "Tracking lookup",
  },
];

export const record = [
  { when: "Now", title: "UX Designer III", place: "KlearNow.AI" },
  { when: "Prior", title: "Visual Designer", place: "HouseThis" },
  { when: "Foundation", title: "B.Des, Textile Design", place: "NIFT, Bhopal" },
] as const;
