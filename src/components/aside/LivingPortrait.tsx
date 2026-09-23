const portrait = "/images/aside/portrait.png";

const sparks = [
  { x: "18%", y: "8%", delay: "0s" },
  { x: "84%", y: "16%", delay: "1.4s" },
  { x: "8%", y: "62%", delay: "0.6s" },
  { x: "93%", y: "58%", delay: "2.1s" },
  { x: "88%", y: "84%", delay: "0.9s" },
];

const petals = [
  { x: "22%", y: "86%", delay: "0s", color: "#c4a394" },
  { x: "74%", y: "88%", delay: "4.2s", color: "#8eae86" },
  { x: "12%", y: "22%", delay: "8s", color: "#d7cfc0" },
];

export function LivingPortrait({
  className = "",
  labelled = false,
}: {
  className?: string;
  labelled?: boolean;
}) {
  return (
    <div className={`aside-living ${className}`.trim()}>
      <img
        src={portrait}
        alt={labelled ? "Illustration of Saumya" : ""}
        className="aside-living-self"
      />
      <span className="aside-lid aside-lid-left" />
      <span className="aside-lid aside-lid-right" />
      {sparks.map((spark) => (
        <span
          key={`${spark.x}-${spark.y}`}
          className="aside-spark"
          style={{ left: spark.x, top: spark.y, animationDelay: spark.delay }}
        />
      ))}
      {petals.map((petal) => (
        <span
          key={`${petal.x}-${petal.y}`}
          className="aside-petal"
          style={{
            left: petal.x,
            top: petal.y,
            animationDelay: petal.delay,
            background: petal.color,
          }}
        />
      ))}
    </div>
  );
}
