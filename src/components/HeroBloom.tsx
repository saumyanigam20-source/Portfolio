const portrait = "/images/aside/portrait-clear.png";

type Piece = {
  kind: "star" | "tulip" | "plum" | "berry" | "leaf";
  x: string;
  y: string;
  delay: string;
  rot: string;
  size: string;
};

const pieces: Piece[] = [
  { kind: "plum", x: "2%", y: "-38%", delay: "0.28s", rot: "-6deg", size: "30%" },
  { kind: "berry", x: "-30%", y: "-30%", delay: "0.4s", rot: "-18deg", size: "16%" },
  { kind: "star", x: "-40%", y: "-4%", delay: "0.5s", rot: "8deg", size: "26%" },
  { kind: "tulip", x: "-34%", y: "24%", delay: "0.62s", rot: "-12deg", size: "28%" },
  { kind: "leaf", x: "-18%", y: "36%", delay: "0.72s", rot: "24deg", size: "22%" },
  { kind: "tulip", x: "36%", y: "-8%", delay: "0.48s", rot: "10deg", size: "26%" },
  { kind: "berry", x: "28%", y: "-24%", delay: "0.36s", rot: "16deg", size: "14%" },
  { kind: "star", x: "38%", y: "22%", delay: "0.66s", rot: "-8deg", size: "24%" },
  { kind: "plum", x: "22%", y: "34%", delay: "0.78s", rot: "14deg", size: "22%" },
  { kind: "leaf", x: "8%", y: "-30%", delay: "0.34s", rot: "-28deg", size: "18%" },
  { kind: "leaf", x: "30%", y: "8%", delay: "0.56s", rot: "32deg", size: "18%" },
  { kind: "berry", x: "-16%", y: "8%", delay: "0.44s", rot: "0deg", size: "12%" },
];

const sparks = [
  { x: "18%", y: "12%", delay: "0.2s" },
  { x: "78%", y: "20%", delay: "0.9s" },
  { x: "12%", y: "62%", delay: "1.3s" },
  { x: "84%", y: "70%", delay: "0.5s" },
  { x: "48%", y: "8%", delay: "1.6s" },
];

export function HeroBloom({ className = "" }: { className?: string }) {
  return (
    <div className={`hero-bloom ${className}`.trim()} aria-hidden={false}>
      {pieces.map((piece) => (
        <span
          key={`${piece.kind}-${piece.x}-${piece.y}`}
          className="bloom-piece"
          style={{
            ["--x" as string]: piece.x,
            ["--y" as string]: piece.y,
            ["--rot" as string]: piece.rot,
            animationDelay: piece.delay,
            width: piece.size,
          }}
          aria-hidden
        >
          <Flower kind={piece.kind} />
        </span>
      ))}
      {sparks.map((spark) => (
        <span
          key={`${spark.x}-${spark.y}`}
          className="bloom-spark"
          style={{ left: spark.x, top: spark.y, animationDelay: spark.delay }}
          aria-hidden
        />
      ))}
      <img src={portrait} alt="Illustration of Saumya" className="bloom-portrait" />
    </div>
  );
}

function Flower({ kind }: { kind: Piece["kind"] }) {
  if (kind === "star") {
    return (
      <svg viewBox="0 0 80 80" className="h-full w-full">
        <circle cx="40" cy="40" r="30" fill="#c4513a" />
        <path d="M40 12 46 32 66 40 46 48 40 68 34 48 14 40 34 32Z" fill="#e0a84a" />
      </svg>
    );
  }
  if (kind === "tulip") {
    return (
      <svg viewBox="0 0 80 80" className="h-full w-full">
        <path d="M14 46c0-22 12-34 26-34s26 12 26 34c0 10-8 22-26 22S14 56 14 46Z" fill="#d46558" />
        <path d="M28 48c2-12 8-20 12-24 4 4 10 12 12 24-4 6-10 10-12 10s-8-4-12-10Z" fill="#f4efe6" />
      </svg>
    );
  }
  if (kind === "plum") {
    return (
      <svg viewBox="0 0 80 80" className="h-full w-full">
        <path d="M12 46c2-20 14-32 28-32s26 12 28 32c-6 14-16 22-28 22S18 60 12 46Z" fill="#8e4585" />
        <path d="M24 42c6-10 12-14 16-16 4 2 10 6 16 16-6 6-12 8-16 8s-10-2-16-8Z" fill="#c48cb8" />
      </svg>
    );
  }
  if (kind === "berry") {
    return (
      <svg viewBox="0 0 80 80" className="h-full w-full">
        <circle cx="40" cy="40" r="22" fill="#7f8fd6" />
        <circle cx="40" cy="40" r="8" fill="#eef1fb" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full">
      <path d="M40 8c8 16 18 22 32 24-16 6-24 18-28 40C40 48 30 34 8 30 22 26 32 20 40 8Z" fill="#3f6b45" />
    </svg>
  );
}
