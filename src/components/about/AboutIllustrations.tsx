const pink = "#f3cfc8";
const leaf = "#7d9a58";
const leafDeep = "#5c7a42";
const stem = "#3e6848";
const orange = "#ef8b36";
const center = "#4a3428";
const yellow = "#f3d34a";
const mustard = "#e2a828";
const plum = "#7b569f";
const plumSoft = "#c9a6d6";
const bud = "#e7a3b8";
const water = "#7eb6e4";
const glass = "#f0b429";
const pitcher = "#a33d55";
const bottle = "#e56b3c";
const cream = "#f7f4ef";
const twig = "#8b5e46";

function Scene({
  children,
  viewBox = "0 0 640 420",
}: {
  children: React.ReactNode;
  viewBox?: string;
}) {
  return (
    <svg viewBox={viewBox} className="sketch-illu h-full w-full" aria-hidden>
      <rect width="100%" height="100%" fill={pink} />
      {children}
    </svg>
  );
}

function Leaf({ x, y, rotate = 0, scale = 1 }: { x: number; y: number; rotate?: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M2 28C8 16 18 6 34 0 28 16 22 28 16 40 10 28 4 18 2 28Z" fill={leaf} />
      <path d="M8 24C16 16 24 8 32 4" fill="none" stroke={leafDeep} strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

function OrangeBloom({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="0" r="22" fill={orange} />
      <circle cx="0" cy="0" r="9" fill={center} />
      <circle cx="-4" cy="-3" r="2.2" fill="#6b4a32" />
      <circle cx="3" cy="-2" r="1.8" fill="#6b4a32" />
      <circle cx="0" cy="4" r="1.8" fill="#6b4a32" />
    </g>
  );
}

function YellowBloom({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="0" r="24" fill={yellow} />
      <path d="M0-10 3-2 11 0 3 3 0 11-3 3-11 0-3-2Z" fill={mustard} />
      <circle cx="0" cy="0" r="4" fill="#f7e7a2" />
    </g>
  );
}

function PlumBloom({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="2" rx="18" ry="20" fill={plum} />
      <path d="M-10 4c2-8 6-12 10-14 4 2 8 6 10 14-4 4-8 6-10 6s-6-2-10-6Z" fill={plumSoft} />
    </g>
  );
}

function PinkBud({ x, y, rotate = 0 }: { x: number; y: number; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <path d="M0 16C2 8 2 4 0 0" fill="none" stroke={stem} strokeWidth="2.4" strokeLinecap="round" />
      <ellipse cx="0" cy="-2" rx="6" ry="9" fill={bud} />
      <ellipse cx="0" cy="-4" rx="3" ry="4.5" fill="#f6c9d4" />
    </g>
  );
}

function Tumbler({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M8 0h36l8 78H0Z" fill={glass} opacity="0.92" />
      <path d="M6 52h44l4 26H2Z" fill={water} opacity="0.85" />
    </g>
  );
}

function Pitcher({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M10 8h34l6 70H6Z" fill={pitcher} />
      <path d="M40 16c18 0 26 14 18 26-8 10-20 8-26 0" fill={pitcher} />
      <path d="M14 48h32l3 30H12Z" fill={water} opacity="0.8" />
    </g>
  );
}

function Jar({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="10" y="0" width="36" height="14" rx="4" fill={cream} />
      <path d="M6 12h44c2 8 6 16 6 28v36c0 8-8 14-28 14S0 84 0 76V40c0-12 4-20 6-28Z" fill={cream} />
      <path d="M8 48h40v22c0 8-6 12-20 12S8 78 8 70Z" fill={water} opacity="0.8" />
    </g>
  );
}

function Bottle({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M16 0h16v18c14 8 22 22 22 40 0 22-12 36-30 36S-6 80-6 58C-6 40 2 26 16 18Z" fill={bottle} />
      <path d="M2 48c8-4 20-4 30 0 2 10 2 20 0 30-10 6-22 6-32 0-1-10-1-20 2-30Z" fill={water} opacity="0.8" />
    </g>
  );
}

export function CraftIllustration() {
  return (
    <Scene>
      <Leaf x={78} y={168} rotate={-40} scale={1.15} />
      <Leaf x={108} y={132} rotate={18} scale={0.95} />
      <Leaf x={62} y={118} rotate={-70} scale={0.85} />
      <path d="M92 250c-6-70 8-120 18-168" fill="none" stroke={stem} strokeWidth="4" strokeLinecap="round" />
      <path d="M96 190c18-10 28-36 22-58" fill="none" stroke={stem} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M90 160c-16-8-22-28-14-46" fill="none" stroke={stem} strokeWidth="3.5" strokeLinecap="round" />
      <OrangeBloom x={118} y={86} s={0.72} />
      <OrangeBloom x={108} y={78} s={1.15} />
      <OrangeBloom x={86} y={132} s={0.7} />
      <Tumbler x={68} y={248} />

      <Leaf x={196} y={150} rotate={-20} scale={1.05} />
      <Leaf x={168} y={176} rotate={20} scale={0.9} />
      <path d="M214 250c-8-80-2-130 6-170" fill="none" stroke={stem} strokeWidth="4" strokeLinecap="round" />
      <path d="M210 200c-20-16-24-40-10-58" fill="none" stroke={stem} strokeWidth="3.5" strokeLinecap="round" />
      <YellowBloom x={214} y={78} s={1.05} />
      <YellowBloom x={188} y={128} s={0.78} />
      <Pitcher x={176} y={246} />

      <path d="M360 250c-4-40 6-70 8-90" fill="none" stroke={twig} strokeWidth="3" strokeLinecap="round" />
      <path d="M368 180c-28-8-40-24-36-40M372 168c22-6 40-8 52 4M366 200c18 8 34 6 46-4" fill="none" stroke={twig} strokeWidth="3" strokeLinecap="round" />
      <Leaf x={400} y={108} rotate={16} scale={1.2} />
      <Leaf x={430} y={132} rotate={40} scale={0.8} />
      <path d="M392 250c18-90 28-130 20-176" fill="none" stroke={stem} strokeWidth="4" strokeLinecap="round" />
      <PlumBloom x={360} y={96} s={0.85} />
      <PlumBloom x={392} y={78} s={0.95} />
      <PlumBloom x={418} y={124} s={0.62} />
      <PinkBud x={448} y={62} rotate={18} />
      <PinkBud x={468} y={86} rotate={28} />
      <PinkBud x={430} y={48} rotate={-10} />
      <path d="M404 120c28-6 48-2 58 16" fill="none" stroke={stem} strokeWidth="3" strokeLinecap="round" />
      <Jar x={332} y={236} />

      <Leaf x={520} y={150} rotate={-30} scale={1} />
      <Leaf x={560} y={168} rotate={24} scale={1.05} />
      <Leaf x={548} y={112} rotate={-8} scale={0.85} />
      <path d="M548 250c-2-70 6-110 4-150" fill="none" stroke={stem} strokeWidth="4" strokeLinecap="round" />
      <path d="M546 190c22-8 36-22 34-42" fill="none" stroke={stem} strokeWidth="3.5" strokeLinecap="round" />
      <PlumBloom x={552} y={92} s={1.15} />
      <PlumBloom x={520} y={132} s={0.78} />
      <Bottle x={524} y={236} />
    </Scene>
  );
}

export function BrandIllustration() {
  return (
    <Scene>
      <Leaf x={120} y={150} rotate={-36} scale={1.2} />
      <Leaf x={86} y={180} rotate={24} scale={0.95} />
      <path d="M150 268c-10-90 4-150 16-200" fill="none" stroke={stem} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M154 200c-28-12-36-40-18-62" fill="none" stroke={stem} strokeWidth="3.5" strokeLinecap="round" />
      <YellowBloom x={168} y={64} />
      <YellowBloom x={126} y={118} s={0.8} />
      <Pitcher x={112} y={262} />

      <Leaf x={300} y={120} rotate={12} scale={1.25} />
      <Leaf x={250} y={150} rotate={-18} scale={1} />
      <path d="M300 268c6-100 8-150-6-196" fill="none" stroke={stem} strokeWidth="4" strokeLinecap="round" />
      <path d="M304 180c30-10 48-28 40-52" fill="none" stroke={stem} strokeWidth="3.5" strokeLinecap="round" />
      <PlumBloom x={292} y={70} s={1.15} />
      <PlumBloom x={340} y={108} s={0.85} />
      <PinkBud x={360} y={58} rotate={20} />
      <PinkBud x={378} y={82} rotate={32} />
      <Jar x={268} y={250} />

      <Leaf x={470} y={160} rotate={-24} scale={1.1} />
      <Leaf x={520} y={140} rotate={18} scale={0.9} />
      <path d="M500 268c2-80 10-130 8-170" fill="none" stroke={stem} strokeWidth="4" strokeLinecap="round" />
      <OrangeBloom x={508} y={92} s={1.1} />
      <OrangeBloom x={468} y={140} s={0.7} />
      <Bottle x={470} y={250} />
    </Scene>
  );
}

export function OpsIllustration() {
  return (
    <Scene>
      <Leaf x={150} y={140} rotate={-28} scale={1.3} />
      <Leaf x={110} y={180} rotate={30} scale={1} />
      <Leaf x={186} y={168} rotate={12} scale={0.9} />
      <path d="M176 270c-4-90 10-150 8-196" fill="none" stroke={stem} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M178 190c-26-14-34-42-16-64" fill="none" stroke={stem} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M180 176c24-8 40-24 36-48" fill="none" stroke={stem} strokeWidth="3.5" strokeLinecap="round" />
      <OrangeBloom x={184} y={70} s={1.2} />
      <YellowBloom x={140} y={124} s={0.75} />
      <PlumBloom x={224} y={118} s={0.7} />
      <Jar x={144} y={258} />

      <path d="M430 270c8-70 4-120-8-168" fill="none" stroke={twig} strokeWidth="3.2" strokeLinecap="round" />
      <path d="M422 180c-30-6-46-22-40-42M428 160c26-4 44 2 52 16M424 210c22 10 40 8 52-6" fill="none" stroke={twig} strokeWidth="3" strokeLinecap="round" />
      <Leaf x={470} y={100} rotate={20} scale={1.15} />
      <PinkBud x={500} y={72} rotate={16} />
      <PinkBud x={518} y={98} rotate={30} />
      <PlumBloom x={456} y={92} s={0.9} />
      <Bottle x={404} y={248} />
    </Scene>
  );
}

export function ApproachIllustration() {
  return (
    <Scene viewBox="0 0 640 440">
      <Leaf x={168} y={150} rotate={-34} scale={1.35} />
      <Leaf x={120} y={200} rotate={22} scale={1.05} />
      <Leaf x={210} y={186} rotate={8} scale={0.95} />
      <path d="M196 300c-8-100 6-160 14-210" fill="none" stroke={stem} strokeWidth="5" strokeLinecap="round" />
      <path d="M200 210c-30-16-40-48-18-72" fill="none" stroke={stem} strokeWidth="3.5" strokeLinecap="round" />
      <OrangeBloom x={214} y={84} s={1.25} />
      <YellowBloom x={156} y={140} s={0.85} />
      <Tumbler x={156} y={292} />

      <Leaf x={360} y={120} rotate={14} scale={1.3} />
      <Leaf x={410} y={150} rotate={36} scale={0.95} />
      <path d="M390 300c10-110 6-170-8-220" fill="none" stroke={stem} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M396 190c32-12 50-30 42-56" fill="none" stroke={stem} strokeWidth="3.5" strokeLinecap="round" />
      <PlumBloom x={378} y={78} s={1.2} />
      <PlumBloom x={432} y={124} s={0.8} />
      <PinkBud x={456} y={64} rotate={22} />
      <PinkBud x={474} y={92} rotate={34} />
      <Jar x={348} y={278} />

      <Leaf x={520} y={188} rotate={-16} scale={1} />
      <path d="M540 300c4-70 8-110 2-150" fill="none" stroke={stem} strokeWidth="4" strokeLinecap="round" />
      <YellowBloom x={546} y={140} s={0.9} />
      <Bottle x={512} y={278} />
    </Scene>
  );
}

export function ProcessMark({ index }: { index: number }) {
  const icons = [ListenMark, MapMark, GridMark, PrototypeMark, PeopleMark];
  const Icon = icons[index] ?? ListenMark;
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-[#fffaf2] text-ink">
      <Icon />
    </div>
  );
}

function ListenMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="10" cy="11" r="3.6" stroke="currentColor" strokeWidth="2.2" />
      <path d="M4 21c1-3.2 3-4.8 6-4.8s5 1.6 6 4.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M18 8h6M18 13h6M18 18h4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function MapMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="7.5" cy="8" r="2.4" fill="currentColor" />
      <circle cx="20.5" cy="13" r="2.4" fill="currentColor" />
      <circle cx="10" cy="20" r="2.4" fill="currentColor" />
      <path d="M9.5 10 18.5 12.4M19.4 15.4 11.4 18.6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function GridMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="4" y="4" width="8" height="8" rx="1.8" stroke="currentColor" strokeWidth="2.2" />
      <rect x="16" y="4" width="8" height="8" rx="1.8" stroke="currentColor" strokeWidth="2.2" />
      <rect x="4" y="16" width="8" height="8" rx="1.8" stroke="currentColor" strokeWidth="2.2" />
      <rect x="16" y="16" width="8" height="8" rx="1.8" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

function PrototypeMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="6" y="3" width="16" height="22" rx="3.2" stroke="currentColor" strokeWidth="2.2" />
      <path d="M10 8h8M9 13h10M9 17h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function PeopleMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="10" cy="9" r="3" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="18.5" cy="10.5" r="2.4" stroke="currentColor" strokeWidth="2.2" />
      <path d="M4.5 21c1-3 3-4.5 5.5-4.5S14.5 18 15.5 21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M15 21c.7-2 2.2-3.2 4-3.2 1.8 0 3.1 1.2 3.8 3.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
