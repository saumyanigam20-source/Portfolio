import { useOdo } from "../store";
import { Logo } from "../ui/Logo";
import { VehicleArt } from "../ui/Marks";

export function WelcomeScreen() {
  const { startSample, go } = useOdo();

  return (
    <section className="odo-welcome">
      <Logo on="blue" />
      <h1>Let&apos;s get started</h1>
      <p>Fuel, services and parts for your car or scooter, in one place.</p>
      <div className="odo-welcome-actions">
        <button type="button" className="odo-btn" onClick={startSample}>
          Try with sample data
        </button>
        <button type="button" className="odo-btn odo-btn-ghost" onClick={() => go({ name: "add-vehicle", returnTo: "welcome" })}>
          Add my vehicle
        </button>
      </div>
      <div className="odo-welcome-art">
        <VehicleArt kind="car" />
      </div>
    </section>
  );
}
