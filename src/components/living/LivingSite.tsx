"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { profile } from "@/lib/profile";

const projects = [
  {
    slug: "klearassist",
    href: "/work/klearassist",
    title: "KlearAssist",
    kicker: "01 / AI · Product",
    tags: ["AI", "Product"],
    summary:
      "an assistant on the KlearNow desktop. one sentence in, the right record out, and a next step she can actually take.",
    image: "/images/case-studies/klearassist/flow-01-launcher.png",
  },
  {
    slug: "track-and-trace",
    href: "/work/track-and-trace",
    title: "Track & Trace",
    kicker: "02 / Product · Mobile",
    tags: ["Product"],
    summary:
      "shipment status, multi-format lookup, and documents on a phone, so ops can answer where it is without the desktop.",
    image: "/images/case-studies/track-and-trace/cover.svg",
  },
  {
    slug: "icon-library",
    href: "/drawings/icon-library",
    title: "Icon Library",
    kicker: "03 / Visual",
    tags: ["Visual"],
    summary: "a 24px icon set for KlearNow — hardline, softline, and gradient — drawn to stay clear at a small size.",
    image: "/images/illustrations/icon-library.png",
  },
  {
    slug: "customs",
    href: "/drawings/customs",
    title: "Customs illustrations",
    kicker: "04 / Visual",
    tags: ["Visual"],
    summary: "milestones for a customs product, drawn as one family.",
    image: "/images/illustrations/customs.png",
  },
];

const filters = ["All", "Product", "AI", "Visual"] as const;

export function LivingSite() {
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("intro-seen") === "1") {
      setIntro(false);
      return;
    }
    const timer = window.setTimeout(() => {
      sessionStorage.setItem("intro-seen", "1");
      setIntro(false);
    }, 1700);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#f6f5f2] text-[#1a1916]">
      {intro ? <Intro onSkip={() => { sessionStorage.setItem("intro-seen", "1"); setIntro(false); }} /> : null}
      <Brain />
      <Work />
      <Close />
    </div>
  );
}

function Intro({ onSkip }: { onSkip: () => void }) {
  return (
    <button
      type="button"
      onClick={onSkip}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#f6f5f2]"
      aria-label="Enter the site"
    >
      <svg viewBox="0 0 360 360" className="h-[min(52vh,420px)] w-[min(52vh,420px)]" aria-hidden>
        <path
          d="M180 40c80 10 140 70 130 140-12 80-90 120-150 90-50-24-40-90 10-100 40-8 70 30 40 70-20 28-70 20-90-10-30-46 10-110 70-120 80-14 150 50 140 130"
          fill="none"
          stroke="#1a1916"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="scribble-draw"
        />
        <path
          d="M70 200c40-80 90-30 80 20s-20 70 30 60 80-90 120-40"
          fill="none"
          stroke="#1a1916"
          strokeWidth="2"
          strokeLinecap="round"
          className="scribble-draw delay"
        />
      </svg>
    </button>
  );
}

function Brain() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [width, setWidth] = useState(1280);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), Math.max(total, 0));
      setProgress(total > 0 ? scrolled / total : 0);
      setWidth(window.innerWidth);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const s = layout(width);
  const x = progress * Math.max(s.track - width, 0);

  return (
    <section id="brain">
      <div ref={ref} className="relative hidden h-[760vh] md:block">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="relative h-full will-change-transform" style={{ width: s.track, transform: `translate3d(${-x}px,0,0)` }}>
            <Thread s={s} />
            <Opening width={width} />
            <Jack s={s} />
            <Heart s={s} />
            <Timeline s={s} />
            <Loop s={s} />
            <Enough s={s} />
          </div>
        </div>
      </div>
      {progress > 0.04 ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-40 hidden text-sm text-[#6d6a64] hover:text-[#1a1916] md:block"
        >
          back to introduction
        </button>
      ) : null}
      <MobileBrain />
    </section>
  );
}

type Story = ReturnType<typeof layout>;

function layout(w: number) {
  return {
    w,
    track: w * 7.7,
    jack: w * 1.25,
    heart: w * 2.55,
    time: w * 4.2,
    alone: w * 5.65,
    loop: w * 6.2,
    enough: w * 7.05,
  };
}

function curve(points: number[][]) {
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x, y] = points[i];
    const [px, py] = points[i - 1];
    const cx = (px + x) / 2;
    d += ` C ${cx} ${py}, ${cx} ${y}, ${x} ${y}`;
  }
  return d;
}

function Thread({ s }: { s: Story }) {
  const w = s.w;
  const d = curve([
    [40, 560],
    [w * 0.46, 300],
    [w * 0.92, 500],
    [s.jack + w * 0.15, 250],
    [s.jack + w * 0.55, 660],
    [s.heart, 240],
    [s.heart + w * 0.55, 640],
    [s.heart + w * 1.15, 300],
    [s.time - w * 0.15, 450],
    [s.time + w * 1.2, 450],
    [s.alone, 320],
    [s.loop + w * 0.35, 500],
    [s.enough + w * 0.2, 430],
  ]);
  const stops = timelineStops(s);
  return (
    <svg className="pointer-events-none absolute top-0 left-0 h-full" width={s.track} height="100%" viewBox={`0 0 ${s.track} 900`} preserveAspectRatio="none" aria-hidden>
      <path d={d} fill="none" stroke="#1a1916" strokeWidth="3.2" strokeLinecap="round" />
      {stops.map((stop) => (
        <g key={stop.title}>
          <line x1={stop.x} y1={450} x2={stop.x} y2={stop.above ? 170 : 640} stroke="#1a1916" strokeWidth="1.4" />
          <circle cx={stop.x} cy={stop.above ? 170 : 640} r="5" fill="#1a1916" />
        </g>
      ))}
    </svg>
  );
}

function timelineStops(s: Story) {
  return [
    { x: s.time + s.w * 0.05, above: false, title: "trained in cloth.", body: "NIFT, Bhopal. colour, repeat, and a grid that can scale.", year: "foundation" },
    { x: s.time + s.w * 0.42, above: true, title: "then a brand.", body: "HouseThis. a visual system, and a small team.", year: "visual" },
    { x: s.time + s.w * 0.82, above: false, title: "now, the product.", body: "KlearNow.AI. logistics, customs, and an assistant on the desktop.", year: "now" },
  ];
}

function Opening({ width }: { width: number }) {
  return (
    <>
      <div className="absolute bottom-10 left-8 max-w-[22rem] sm:bottom-12 sm:left-10">
        <h1 className="text-4xl leading-[0.95] font-semibold tracking-[-0.03em] sm:text-5xl">
          the
          <br />
          anatomy of a
          <br />
          product designer.
        </h1>
      </div>
      <p className="absolute top-28 flex max-w-56 items-start gap-2 text-sm text-[#6d6a64]" style={{ left: width * 0.58 }}>
        <Arrow />
        an almost accurate map of how i think.
      </p>
      <div className="absolute bottom-10 w-72 text-right" style={{ left: Math.max(width - 320, 360) }}>
        <p className="mb-4 text-sm">or do i say, welcome to my portfolio :)</p>
        <div className="flex justify-end gap-2">
          <a href="#work" className={solid}>view work</a>
          <a href="#hi" className={ghost}>let&apos;s talk</a>
        </div>
      </div>
    </>
  );
}

function Jack({ s }: { s: Story }) {
  const base = s.jack;
  return (
    <>
      <Float src="/images/illustrations/customs.png" alt="Customs illustration" className="w-44 -rotate-6" style={{ top: "12%", left: base }} />
      <Float src="/images/illustrations/social.png" alt="Social graphics" className="w-40 rotate-3" style={{ top: "64%", left: base + s.w * 0.22 }} />
      <Float src="/images/illustrations/icon-library.png" alt="Icon library" className="w-48 rotate-2" style={{ top: "10%", left: base + s.w * 0.58 }} />
      <div className="absolute w-[34rem] -translate-x-1/2 text-center" style={{ top: "40%", left: base + s.w * 0.38 }}>
        <p className="text-lg text-[#6d6a64]">i design across a lot of surfaces.</p>
        <h2 className="font-display text-6xl leading-tight font-medium">a jack of all trades</h2>
        <p className="mt-2 text-lg text-[#6d6a64]">textile, brand, and product. same instinct.</p>
      </div>
    </>
  );
}

function Heart({ s }: { s: Story }) {
  const base = s.heart;
  return (
    <>
      <h2 className="absolute w-[22rem] font-display text-6xl leading-none font-medium" style={{ top: "6%", left: base }}>
        but few things have my heart.
      </h2>
      <Pair
        style={{ top: "58%", left: base + s.w * 0.05 }}
        src="/images/case-studies/klearassist/flow-02-intents.png"
        alt="KlearAssist"
        title="logistics came first."
        body="dense systems. too many statuses. that is the work i like."
      />
      <Pair
        style={{ top: "12%", left: base + s.w * 0.62 }}
        src="/images/illustrations/mental-health.png"
        alt="Illustration"
        title="turns out, i like the people in them."
        body="operators, brokers, the person stuck in the menu."
        flip
      />
      <Pair
        style={{ top: "56%", left: base + s.w * 1.15 }}
        src="/images/case-studies/track-and-trace/cover.svg"
        alt="Track and Trace"
        title="and now, conversational AI."
        body={'half product designer. half “what if it just did the task?”'}
      />
    </>
  );
}

function Timeline({ s }: { s: Story }) {
  return (
    <>
      {timelineStops(s).map((stop) => (
        <div
          key={stop.title}
          className="absolute w-64 -translate-x-1/2 text-center"
          style={{ left: stop.x, top: stop.above ? "6%" : "73%" }}
        >
          <p className="font-medium">{stop.title}</p>
          <p className="mt-1 text-sm text-[#6d6a64]">{stop.body}</p>
          <p className="mt-2 text-xs tracking-[0.14em] text-[#8a877f] uppercase">{stop.year}</p>
        </div>
      ))}
      <p className="absolute font-display text-5xl font-medium whitespace-nowrap" style={{ top: "86%", left: s.time }}>
        somehow, i keep ending up...
      </p>
      <div className="absolute w-[24rem]" style={{ top: "86%", left: s.time + s.w * 0.95 }}>
        <p className="font-display text-5xl font-medium">
          making it <em className="font-normal">simpler.</em>
        </p>
        <p className="mt-4 text-lg">most dense workflows i sit with, i end up redesigning.</p>
        <p className="text-[#6d6a64]">most things i redesign, i stay with until they ship.</p>
      </div>
    </>
  );
}

function Loop({ s }: { s: Story }) {
  const words = [
    { label: "sit with it.", x: 0, y: "72%" },
    { label: "map it.", x: s.w * 0.22, y: "28%" },
    { label: "shape it.", x: s.w * 0.42, y: "18%" },
    { label: "make it.", x: s.w * 0.18, y: "48%" },
    { label: "prove it.", x: s.w * 0.38, y: "62%" },
  ];
  return (
    <>
      <p className="absolute w-[32rem] font-display text-4xl leading-tight font-medium" style={{ top: "18%", left: s.alone }}>
        apparently, i don&apos;t leave a workflow alone.
      </p>
      {words.map((word) => (
        <p key={word.label} className="absolute font-display text-2xl font-medium" style={{ left: s.loop + word.x, top: word.y }}>
          {word.label}
        </p>
      ))}
    </>
  );
}

function Enough({ s }: { s: Story }) {
  return (
    <div className="absolute w-[36rem] text-center" style={{ top: "34%", left: s.enough }}>
      <p className="text-sm">enough autobiography.</p>
      <h2 className="mt-3 font-display text-6xl leading-none font-medium">
        let&apos;s look at what came out of it.
      </h2>
      <a href="#work" className={`${solid} mt-8`}>
        see the work
      </a>
    </div>
  );
}

function MobileBrain() {
  return (
    <div className="px-5 pt-28 pb-20 md:hidden">
      <h1 className="text-4xl leading-[0.95] font-semibold">
        the
        <br />
        anatomy of a
        <br />
        product designer.
      </h1>
      <p className="mt-4 max-w-xs text-sm text-[#6d6a64]">an almost accurate map of how i think.</p>
      <p className="mt-8 text-sm">or do i say, welcome to my portfolio :)</p>
      <div className="mt-4 flex gap-2">
        <a href="#work" className={solid}>view work</a>
        <a href="#hi" className={ghost}>let&apos;s talk</a>
      </div>
      <div className="mt-16 text-center">
        <p className="text-[#6d6a64]">i design across a lot of surfaces.</p>
        <h2 className="mt-2 font-display text-4xl font-medium">a jack of all trades</h2>
        <p className="mt-2 text-[#6d6a64]">textile, brand, and product. same instinct.</p>
      </div>
      <h2 className="mt-16 font-display text-4xl leading-none font-medium">but few things have my heart.</h2>
      <ul className="mt-6 space-y-6 text-sm">
        <li>
          <p className="font-medium">logistics came first.</p>
          <p className="text-[#6d6a64]">dense systems. too many statuses. that is the work i like.</p>
        </li>
        <li>
          <p className="font-medium">turns out, i like the people in them.</p>
          <p className="text-[#6d6a64]">operators, brokers, the person stuck in the menu.</p>
        </li>
        <li>
          <p className="font-medium">and now, conversational AI.</p>
          <p className="text-[#6d6a64]">half product designer. half “what if it just did the task?”</p>
        </li>
      </ul>
      <p className="mt-16 font-display text-3xl font-medium">somehow, i keep ending up making it simpler.</p>
      <p className="mt-3 text-sm text-[#6d6a64]">most dense workflows i sit with, i end up redesigning.</p>
      <p className="mt-10 text-sm">enough autobiography.</p>
      <h2 className="mt-2 font-display text-4xl leading-none font-medium">let&apos;s look at what came out of it.</h2>
      <a href="#work" className={`${solid} mt-8`}>see the work</a>
    </div>
  );
}

function Work() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shown = projects.filter((project) => filter === "All" || project.tags.includes(filter));

  return (
    <section id="work" className="relative border-t border-[#1a1916] px-5 pt-28 pb-24 sm:px-8">
      <p className="pointer-events-none absolute top-6 right-0 left-0 overflow-hidden font-display text-[22vw] leading-none font-medium text-black/[0.05] select-none">
        WORKS
      </p>
      <div className="relative grid items-start gap-12 lg:grid-cols-[minmax(260px,380px)_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm text-[#6d6a64]">selected work / klearnow</p>
          <h2 className="mt-4 font-display text-5xl leading-[0.95] font-medium sm:text-6xl">
            a few things, <em className="font-normal">chosen on purpose.</em>
          </h2>
          <p className="mt-4 max-w-sm text-[#3f3d39]">logistics, customs, and conversational systems, designed end to end.</p>
          <p className="mt-8 text-sm">show me</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-full border px-3.5 py-1.5 text-sm ${
                  filter === item ? "border-[#1a1916] bg-[#1a1916] text-[#f6f5f2]" : "border-[#1a1916]/20"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-20">
          {shown.map((project) => (
            <article key={project.slug}>
              <Link href={project.href} className="group block">
                <div className="relative min-h-[70vh] overflow-hidden rounded-2xl bg-[#eeece7] shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    className="object-cover object-top transition duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    unoptimized={project.image.endsWith(".svg")}
                  />
                </div>
                <p className="mt-8 text-sm text-[#6d6a64]">{project.kicker}</p>
                <h3 className="mt-1 font-display text-4xl font-medium">{project.title}</h3>
                <p className="mt-2 max-w-xl text-[#3f3d39]">{project.summary}</p>
              </Link>
            </article>
          ))}
          <p className="text-sm">
            interested? there&apos;s more.{" "}
            <Link href="/about" className="underline underline-offset-4">
              more about the practice →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function Close() {
  return (
    <section id="hi" className="relative min-h-screen overflow-hidden border-t border-[#1a1916]/15 px-5 pt-28 pb-16 sm:px-8 md:px-[4.5vw]">
      <svg className="pointer-events-none absolute top-[18%] right-[8%] hidden w-[46vw] md:block" viewBox="0 0 640 220" fill="none" aria-hidden>
        <path d="M0 40 C 180 40 220 180 400 150 S 560 20 640 36" stroke="#1a1916" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <p className="absolute top-[38%] left-[36%] hidden w-36 text-lg leading-snug md:block" style={{ fontFamily: "var(--font-hand), cursive" }}>
        same designer... just more systems now.
      </p>
      <p className="absolute top-[52%] left-[52%] hidden w-36 text-lg leading-snug md:block" style={{ fontFamily: "var(--font-hand), cursive" }}>
        still figuring this out... and probably always will.
      </p>
      <p className="absolute top-[12%] left-[42%] hidden -rotate-6 text-lg md:block" style={{ fontFamily: "var(--font-hand), cursive" }}>
        who made this?
      </p>
      <div className="relative max-w-xl">
        <h2 className="font-display text-6xl leading-[0.9] font-medium sm:text-7xl">
          oh, hi.
          <br />
          i&apos;m <em className="font-normal">saumya.</em>
        </h2>
        <p className="mt-6 text-lg leading-snug">
          still drawing.
          <br />
          still designing.
          <br />
          still in the file.
        </p>
        <p className="mt-8 font-display text-4xl leading-[1.05] font-medium sm:text-5xl">
          let&apos;s make a dense workflow feel <em className="font-normal">obvious.</em>
        </p>
        <a href={`mailto:${profile.email}`} className={`${solid} mt-8 gap-3 pr-3 pl-4`}>
          {profile.email}
          <span aria-hidden>↗</span>
        </a>
        <div className="mt-3 flex gap-2">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className={ghost}>
            linkedin ↗
          </a>
        </div>
      </div>
      <p className="font-hand mt-10 max-w-[10rem] text-lg leading-tight md:absolute md:top-[62%] md:left-[42%]" style={{ fontFamily: "var(--font-hand), cursive" }}>
        fun fact: i trained as a textile designer.
      </p>
      <Image
        src="/images/aside/portrait-clear.png"
        alt="Illustrated portrait of Saumya"
        width={640}
        height={800}
        className="mt-10 ml-auto w-[min(100%,420px)] md:absolute md:right-[4vw] md:bottom-0 md:mt-0 md:w-[min(34vw,460px)]"
      />
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="mt-16 text-xs tracking-[0.08em] text-[#6d6a64]"
      >
        © 2026 saumya · back to top ↑
      </button>
    </section>
  );
}

function Float({
  src,
  alt,
  className,
  style,
}: {
  src: string;
  alt: string;
  className: string;
  style?: CSSProperties;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={420}
      height={320}
      style={style}
      className={`absolute rounded-2xl object-cover shadow-[0_22px_40px_rgba(0,0,0,0.12)] ${className}`}
      unoptimized={src.endsWith(".svg")}
    />
  );
}

function Pair({
  style,
  src,
  alt,
  title,
  body,
  flip,
}: {
  style?: CSSProperties;
  src: string;
  alt: string;
  title: string;
  body: string;
  flip?: boolean;
}) {
  return (
    <div className={`absolute flex items-center gap-5 ${flip ? "flex-row-reverse" : ""}`} style={style}>
      <Image
        src={src}
        alt={alt}
        width={240}
        height={240}
        className="h-44 w-44 rounded-3xl object-cover shadow-[0_18px_36px_rgba(0,0,0,0.12)] lg:h-52 lg:w-52"
        unoptimized={src.endsWith(".svg")}
      />
      <div className="w-64">
        <p className="font-display text-3xl leading-none font-medium">{title}</p>
        <p className="mt-2 text-sm text-[#6d6a64]">{body}</p>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden className="mt-1 shrink-0">
      <path d="M26 2 C 14 4 8 10 2 18" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 18 l6-2 M2 18 l2-6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

const solid =
  "inline-flex h-10 items-center justify-center rounded-full border border-[#1a1916] bg-[#1a1916] px-4 text-sm font-medium text-[#f6f5f2] transition hover:opacity-85";
const ghost =
  "inline-flex h-10 items-center justify-center rounded-full border border-[#1a1916]/30 bg-transparent px-4 text-sm font-medium text-[#1a1916] transition hover:border-[#1a1916]";
