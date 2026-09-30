export type ExperimentSection = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  points?: string[];
};

export type Experiment = {
  slug: string;
  title: string;
  summary: string;
  kicker: string;
  status: string;
  role: string;
  tools: string[];
  cover: "cursor" | "orders";
  sections: ExperimentSection[];
};

export const experiments: Experiment[] = [
  {
    slug: "cursor-portfolio",
    title: "Directing Cursor to ship this portfolio",
    summary:
      "Specified the visual system and the case studies, then reviewed what the agent built until the site felt like one product.",
    kicker: "From a system to a live site",
    status: "Shipped · this website",
    role: "Direction, content, review",
    tools: ["Cursor", "Next.js", "Figma"],
    cover: "cursor",
    sections: [
      {
        eyebrow: "The question",
        title: "Can the designer stay in charge of a site an agent is writing?",
        paragraphs: [
          "The interesting part was not whether Cursor could produce a Next.js page. It can. The question was whether I could keep the portfolio as a designed object — type, density, what gets said — while an agent handled the implementation.",
          "This site is the test. The pages, the case studies, and the aside are the evidence.",
        ],
      },
      {
        eyebrow: "What I owned",
        title: "The decisions that make it mine",
        paragraphs: [
          "I set the visual system before asking for screens: a warm off-white canvas, a deep sage accent, Syne for display, DM Sans for reading. Case studies live as structured content, not as one long prompt the agent is supposed to remember.",
        ],
        points: [
          "Which stories belong on the home page, and which stay out",
          "The voice of the writing — operational, specific, no filler",
          "When a change is a component fix and when the content itself is wrong",
          "Reviewing motion, spacing, and the aside against the rest of the site",
        ],
      },
      {
        eyebrow: "How I directed it",
        title: "A target the agent can hit",
        paragraphs: [
          "Broad asks drift. “Make the work section nicer” produces a generic card grid. Naming the file, the token, and the behaviour does not.",
          "Content stays in its own modules. The agent edits a component against a stable title, summary, and cover, instead of inventing the case study while it invents the layout.",
        ],
        points: [
          "One change at a time, checked in the browser",
          "Design tokens in one place, so a colour is not re-decided per section",
          "Acceptance in plain language: what should move, what should stay still",
        ],
      },
      {
        eyebrow: "Where it breaks",
        title: "Close is not the same as finished",
        paragraphs: [
          "The agent is fast at scaffolding and slow at taste. It will pick a reasonable layout, a reasonable font pairing, a reasonable hover. Reasonable is how a portfolio starts to look like everyone else’s.",
          "The fixes that mattered were structural. A section that should feel quiet does not get there by adding decoration. An aside that should react needs a behaviour, not another restyle.",
        ],
      },
      {
        eyebrow: "What stayed human",
        title: "Judgement is still the work",
        paragraphs: [
          "Cursor did not decide what thirteen years of design should sound like, or which logistics story is worth a case study. It implemented. I directed, rejected, and rewrote until the page could represent the work.",
          "The shift is practical. The process no longer ends in a Figma file that someone else has to interpret. It ends in a site I can open, click, and stand behind.",
        ],
      },
    ],
  },
  {
    slug: "delivery-orders",
    title: "A spec precise enough to generate the screen",
    summary:
      "Wrote the delivery-order product as requirements and a design prompt, then a desktop prototype a coordinator can click through.",
    kicker: "Specification before pixels",
    status: "Prototype",
    role: "Product design and the written spec",
    tools: ["PRD", "Design prompt", "HTML prototype"],
    cover: "orders",
    sections: [
      {
        eyebrow: "The question",
        title: "What has to be true in writing before a tool should draw the UI?",
        paragraphs: [
          "A delivery order is the instruction that lets a truck pick up a container and take it to the right door. Coordinators already have the facts in KlearNow. They still leave the product to assemble a PDF.",
          "I wrote the product twice before any screen: once as requirements, once as a design prompt with sample data, motion rules, and every state as its own frame. The prompt is the experiment. If a tool cannot build from it, the spec is not finished.",
        ],
      },
      {
        eyebrow: "The rules",
        title: "Three gates, then a person",
        paragraphs: [
          "An order can be issued only when customs has released the cargo, freight has been released, and the terminal has the container available. Anything else stays a draft, with the reason in plain language.",
          "The bill of lading is not the delivery address. Repeat lanes can send on their own. First-time doors, conflicts, and hazardous cargo wait for a yes. The prototype stops at the issued order. It does not pretend to dispatch a driver.",
        ],
        points: [
          "Queue sorted by last free day, not by whichever row was typed last",
          "One current version for the trucker, on a live link, not a thread of PDFs",
          "Conflicts show the old value and the new one before anything is sent",
        ],
      },
      {
        eyebrow: "What the prompt had to carry",
        title: "Constraints, not a mood",
        paragraphs: [
          "The design prompt names the width, the type of shadow, the single action colour, and what must not appear: no map, no fleet dashboard, no cost-per-mile. Sample data is specific — a container, a terminal, a last free day — so the screen cannot hide behind lorem ipsum.",
          "Motion is specified as behaviour. A gate opening changes a pill and a reason line. It does not celebrate. That is the difference between directing a tool and asking it to invent a product.",
        ],
      },
      {
        eyebrow: "The artifact",
        title: "A prototype you can argue with",
        paragraphs: [
          "The result is a desktop prototype: a queue, an order that cannot be issued until the gates are open, and a carrier page that shows one current version. It is there to be corrected against the requirements, not to be a finished product.",
          "The useful outcome is the method. Operational rules written tightly enough that a generated screen can be checked, rejected, and rebuilt — instead of designed from a blank frame.",
        ],
      },
    ],
  },
];

export function getExperiment(slug: string) {
  return experiments.find((experiment) => experiment.slug === slug);
}
