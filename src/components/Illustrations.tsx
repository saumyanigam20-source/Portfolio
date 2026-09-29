import Image from "next/image";

const pieces = [
  {
    title: "KlearNow.AI Icon Library",
    company: "KlearNow.AI",
    caption:
      "A custom icon set on a 24px grid — hardline, softline, and gradient — drawn so each mark stays clear at a small size.",
    src: "/images/illustrations/icon-library.png",
    alt: "Dark mosaic of icons with the words Icon Library in cyan",
  },
  {
    title: "Customs illustrations",
    company: "KlearNow.AI",
    caption:
      "A series for customs milestones — demurrage, container hold, cargo release, and machine learning — drawn as one illustration system.",
    src: "/images/illustrations/customs.png",
    alt: "Illustration style board with a person, a plane, a globe, and a truck of boxes",
  },
  {
    title: "Mental health platform",
    company: "WAHM",
    caption:
      "Soft pastel drawings about care and being together. Hands, plants, and figures for a place that talks about healing.",
    src: "/images/illustrations/mental-health.png",
    alt: "Layered hands in yellow, green, and lavender reaching upward together",
  },
];

export function Illustrations() {
  return (
    <section id="drawings" className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
      <div className="mb-10">
        <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">Visual design</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          Illustrations
        </h2>
      </div>

      <ul className="grid gap-5 md:grid-cols-3">
        {pieces.map(({ title, company, caption, src, alt }) => (
          <li key={title}>
            <figure className="overflow-hidden rounded-2xl border border-line bg-canvas-elevated">
              <div className="relative aspect-[4/3] overflow-hidden bg-canvas-tint">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <figcaption className="space-y-2 p-5">
                <h3 className="font-display text-lg font-semibold tracking-[-0.03em] text-ink">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{caption}</p>
                <p className="text-xs tracking-[0.14em] text-faint uppercase">{company}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
