export type DrawingImage = {
  src: string;
  alt: string;
};

export type DrawingSection = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  images?: DrawingImage[];
};

export type Drawing = {
  slug: string;
  title: string;
  company: string;
  summary: string;
  cover: string;
  alt: string;
  sections: DrawingSection[];
};

export const drawings: Drawing[] = [
  {
    slug: "icon-library",
    title: "KlearNow.AI Icon Library",
    company: "KlearNow.AI",
    summary:
      "A custom icon set on a 24px grid — hardline, softline, and gradient — drawn so each mark stays clear at a small size.",
    cover: "/images/illustrations/icon-library.png",
    alt: "Dark mosaic of icons with the words Icon Library in cyan",
    sections: [
      {
        eyebrow: "Overview",
        title: "One library for web and mobile",
        paragraphs: [
          "The objective was a custom icon library that is simple, modern, and consistent with the brand. It had to be scalable, easy to maintain, and flexible enough for web and mobile.",
        ],
      },
      {
        eyebrow: "Process",
        title: "A 24px grid, then three styles",
        paragraphs: [
          "Research started with IBM Carbon, Google Material, and Microsoft Fluent — how large icon systems stay consistent. The base canvas is 24×24px, with internal padding so each mark has room to breathe.",
          "Construction rules stay fixed: stroke width, corner radius, and simple geometric shapes on the grid. Hardline, softline, and gradient were explored as styles of one system, not three separate sets. Each icon was iterated for optical balance and clarity at a small size.",
          "The gallery is built as components and variants, so the set can grow without breaking the grid.",
        ],
      },
      {
        eyebrow: "Gallery",
        title: "The system, in the file",
        paragraphs: [],
        images: [
          { src: "/images/illustrations/icon-library/01.png", alt: "Icon library construction on a grid" },
          { src: "/images/illustrations/icon-library/02.png", alt: "Icon style explorations" },
          { src: "/images/illustrations/icon-library/03.png", alt: "Icon set arranged as a library" },
          { src: "/images/illustrations/icon-library/04.png", alt: "Icon variants in the component file" },
          { src: "/images/illustrations/icon-library/05.png", alt: "Scalable icon components and variants" },
        ],
      },
    ],
  },
  {
    slug: "customs",
    title: "Customs illustrations",
    company: "KlearNow.AI",
    summary:
      "A series for customs milestones — demurrage, container hold, cargo release, and machine learning — drawn as one illustration system.",
    cover: "/images/illustrations/customs.png",
    alt: "Illustration style board with a person, a plane, a globe, and a truck of boxes",
    sections: [
      {
        eyebrow: "Overview",
        title: "Milestones, drawn as one family",
        paragraphs: [
          "These illustrations represent customs and logistics milestones such as demurrage, container hold, machine learning, and related concepts. The work started as rough sketches — composition and the visual metaphor for each idea — then a colour direction so the set would hold together.",
          "The refined pieces use one visual style: simple, stylised, and readable as a system rather than a pile of one-off pictures.",
        ],
      },
      {
        eyebrow: "Sketches",
        title: "The idea before the colour",
        paragraphs: [],
        images: [
          { src: "/images/illustrations/customs/sketch-01.png", alt: "Pencil sketch of a crane lifting through clouds" },
          { src: "/images/illustrations/customs/sketch-02.png", alt: "Pencil sketch of a robotic arm and gears" },
        ],
      },
      {
        eyebrow: "Final illustrations",
        title: "The set",
        paragraphs: [
          "Machine learning, cargo release, container hold, and container demurrage share the same shapes, the same palette, and the same amount of detail.",
        ],
        images: [
          { src: "/images/illustrations/customs.png", alt: "KlearNow illustration style board" },
          { src: "/images/illustrations/customs/final-01.png", alt: "Empty-state and coming-soon illustrations" },
          { src: "/images/illustrations/customs/final-02.png", alt: "Machine learning and cargo release illustrations" },
          { src: "/images/illustrations/customs/final-03.png", alt: "Container hold and container demurrage illustrations" },
        ],
      },
    ],
  },
  {
    slug: "mental-health",
    title: "Mental health platform",
    company: "WAHM",
    summary:
      "Soft pastel drawings about care and being together. Hands, plants, and figures for a place that talks about healing.",
    cover: "/images/illustrations/mental-health.png",
    alt: "Layered hands in yellow, green, and lavender reaching upward together",
    sections: [
      {
        eyebrow: "Overview",
        title: "A visual language for a careful product",
        paragraphs: [
          "WAHM brings like-minded people together in moderated, topic-based group sessions. The illustrations had to talk about healing, growth, connection, and emotional safety, and still feel warm.",
        ],
      },
      {
        eyebrow: "Style",
        title: "Soft, human, and unhurried",
        paragraphs: [
          "The style avoids harsh lines and anything overly realistic. Organic shapes, light detail, and a hand-drawn texture keep it gentle. The palette is pastel. Hands, plants, and figures stand in for support, growth, and healing together.",
          "Compositions stay on quiet gestures, so the pictures can sit in a sensitive context without crowding the person reading them.",
        ],
      },
      {
        eyebrow: "Collective support",
        title: "Hands, reaching up together",
        paragraphs: [
          "Unity and emotional safety, drawn as layered hands. Soft texture and pastel colour keep the mood calm.",
        ],
        images: [
          {
            src: "/images/illustrations/mental-health.png",
            alt: "Layered hands in yellow, green, and lavender reaching upward",
          },
        ],
      },
      {
        eyebrow: "Growing together",
        title: "Figures, and something in bloom",
        paragraphs: [
          "Collective growth and shared healing: connected figures and blooming elements. The colours stay playful so the piece can hold hope as well as care.",
        ],
        images: [
          {
            src: "/images/illustrations/mental-health/growing.png",
            alt: "Illustration of people growing together beneath a flower",
          },
        ],
      },
      {
        eyebrow: "Nurturing the mind",
        title: "Care, drawn as tending",
        paragraphs: [
          "Self-care and personal growth, pictured as nurturing thoughts and planting something positive. Warm colour, soft texture, a hopeful mood.",
        ],
        images: [
          {
            src: "/images/illustrations/mental-health/nurturing.png",
            alt: "Illustration of a person tending a plant",
          },
          {
            src: "/images/illustrations/mental-health/nurturing-cover.png",
            alt: "Illustration of a person watering flowers in the sun",
          },
        ],
      },
      {
        eyebrow: "On the site",
        title: "How the drawings sit in the product",
        paragraphs: [],
        images: [
          { src: "/images/illustrations/mental-health/site-01.png", alt: "WAHM website using the illustration style" },
          { src: "/images/illustrations/mental-health/site-02.png", alt: "Another WAHM page with the illustrations" },
          { src: "/images/illustrations/mental-health/site-03.png", alt: "WAHM page layout with pastel illustrations" },
        ],
      },
    ],
  },
  {
    slug: "social-graphics",
    title: "Social media graphics",
    company: "HouseThis India",
    summary:
      "Two illustration series for HouseThis: life moved indoors, and portraits of women rooted in nature.",
    cover: "/images/illustrations/social.png",
    alt: "Social post of a person working on a laptop among plants, with a tiger nearby",
    sections: [
      {
        eyebrow: "Future with walls",
        title: "Everyday life, moved indoors",
        paragraphs: [
          "This series looks at how COVID reshaped ordinary days, shifting life from outdoor space to indoor space. The pictures follow changing habits around work, being with people, and well-being — isolation, and the digital connection that stood in for it.",
        ],
        images: [
          { src: "/images/illustrations/social/walls-01.png", alt: "Future with walls social illustration" },
          { src: "/images/illustrations/social/walls-02.png", alt: "Person working on a laptop among plants, with a tiger nearby" },
          { src: "/images/illustrations/social/walls-03.png", alt: "Illustrated scene of life moved indoors" },
          { src: "/images/illustrations/social/walls-04.png", alt: "Future with walls illustration in a social post" },
        ],
      },
      {
        eyebrow: "Rooted in her",
        title: "Portraits, with nature grown through them",
        paragraphs: [
          "Rooted in Her is a series of digital portraits. Women are drawn with elements of nature, around softness, strength, and individuality — grounded, confident, and present.",
          "Each piece holds a quiet moment: a gaze, a pause, a thought. The picture is an inner world, not a story told from the outside.",
        ],
        images: [
          { src: "/images/illustrations/social/rooted-01.png", alt: "Portrait of a woman intertwined with plants" },
          { src: "/images/illustrations/social/rooted-02.png", alt: "Second Rooted in Her portrait" },
          { src: "/images/illustrations/social/rooted-03.png", alt: "Third Rooted in Her portrait" },
          { src: "/images/illustrations/social/rooted-04.png", alt: "Fourth Rooted in Her portrait" },
        ],
      },
    ],
  },
];

export function getDrawing(slug: string) {
  return drawings.find((drawing) => drawing.slug === slug);
}
