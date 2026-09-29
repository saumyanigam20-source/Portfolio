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
];

export function getExperiment(slug: string) {
  return experiments.find((experiment) => experiment.slug === slug);
}
