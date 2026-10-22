export function Logo({ on }: { on: "blue" | "paper" | "dark" }) {
  const src =
    on === "dark" ? "/odo/odo-logo-on-dark.svg" : on === "paper" ? "/odo/odo-logo-dark.svg" : "/odo/odo-logo-light.svg";
  return <img className="odo-logo" src={src} alt="odo" />;
}
