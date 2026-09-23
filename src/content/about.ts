export const aboutContent = {
  kicker: "About",
  title: "A designer who learned systems in fabric first, then in product.",
  lede: "I have spent thirteen years making things people can use — first as colour, brand, and visual language, now as software for logistics and operations. The craft changed. The instinct did not: find the pattern, then make it easier to follow.",
  location: "Gurgaon, India",
  role: "UX Designer III · KlearNow.AI",
  chapters: [
    {
      era: "NIFT, Bhopal",
      period: "B.Des",
      title: "Craft before screens",
      body: "I trained as a designer at NIFT, where form, repeat, and material are not decoration — they are how a piece holds together. That education still shows up in how I think: grids that can scale, palettes that stay honest, and a dislike of one-off decisions that do not belong to a family.",
    },
    {
      era: "HouseThis",
      period: "Visual Designer",
      title: "Building a visual system, then a team",
      body: "At HouseThis I owned branding, digital, and marketing design — concept through commercially produced assets. I led three designers, reviewed work, and set a shared visual system so the brand stayed consistent across platforms. That was my first real lesson in design as infrastructure: colour, layout, and language that other people can pick up and keep using.",
    },
    {
      era: "KlearNow.AI",
      period: "UX Designer III",
      title: "Turning operations into product",
      body: "I now design B2B SaaS for customs and logistics — dense, data-heavy work where a missed status or a muddy flow costs time. I sit with product managers and engineers on requirements, then take a feature from first conversation through journeys, UI, and prototype, and show it to the people who will actually run it. Lately that includes AI-led and conversational experiences: helping operators finish complex tasks without learning ten modules.",
    },
  ],
  processIntro:
    "I do not start in Figma. I start with what the operation is trying to do, who owns each step, and where the work currently breaks. The screens come after the story is clear.",
  process: [
    {
      step: "01",
      title: "Sit with the work",
      body: "Stakeholder interviews, user research, and the product requirement itself. I want the messy version first — the exception, the workaround, the thing nobody wrote down.",
    },
    {
      step: "02",
      title: "Map the journey",
      body: "User flows for operational systems, not happy paths only. Who hands off to whom, what data has to be true, and where a person should never have to guess.",
    },
    {
      step: "03",
      title: "Shape the system",
      body: "Information architecture, interface patterns, and the design system. If a screen cannot join the family, it is probably solving the wrong problem.",
    },
    {
      step: "04",
      title: "Make it tangible",
      body: "Wireframes, UI, and prototypes in Figma — enough fidelity that a customs broker or a PM can argue with the real thing, not a slide.",
    },
    {
      step: "05",
      title: "Prove it with people",
      body: "Usability testing, walkthroughs with current users, and another pass. I treat demonstration as part of design, not a handoff after it.",
    },
  ],
  approachTitle: "How I approach a design",
  approach: [
    {
      title: "Density is the brief",
      body: "Logistics software is full of tables, exceptions, and acronyms. I do not hide that. I sequence it — so the next useful action is obvious, and the rest can wait.",
    },
    {
      title: "Requirements are a design material",
      body: "I work the product requirement with PMs and engineers, not after them. Ambiguity in a ticket becomes ambiguity on a screen. Clearing it is part of the job.",
    },
    {
      title: "Systems over one-offs",
      body: "Thirteen years of visual work taught me that consistency is kindness. Patterns, tokens, and repeatable languages let a product grow without feeling like five products.",
    },
    {
      title: "AI should finish the task",
      body: "Conversational UX only earns its place if it changes the screen — finds the record, starts the flow, takes the next step. A paragraph about the problem is not a product.",
    },
  ],
  education: [
    { label: "Education", value: "B.Des, NIFT Bhopal" },
    { label: "Certification", value: "Google UX Design" },
  ],
  tools: ["Figma", "Adobe Creative Suite", "Notion", "Jira", "Canva", "Claude", "Cursor"],
  skills: [
    "Product design",
    "UX research",
    "Usability testing",
    "User journeys & flows",
    "Wireframing & prototyping",
    "Design systems",
    "Conversational UX",
    "AI-led experience",
    "Product requirements",
  ],
} as const;
