import { oneDecimal } from "../format";
import { useOdo } from "../store";
import { CheckIcon } from "../ui/Icons";
import { markMileageFlash } from "../ui/motion";

export function FuelSavedScreen() {
  const { screen, go } = useOdo();
  const saved = screen.name === "fuel-saved" ? screen : null;

  return (
    <section className="odo-saved">
      <div className="odo-success-mark">
        <CheckIcon className="odo-check" />
      </div>
      <h1>Fill saved</h1>
      {saved?.segment != null ? (
        <p className="odo-saved-figure odo-flash" aria-live="polite">
          {oneDecimal(saved.segment)} <span>{saved.unit}</span>
        </p>
      ) : saved?.average != null ? (
        <p className="odo-flash" aria-live="polite">
          Average is {oneDecimal(saved.average)} {saved.unit}. The next full tank with an odometer updates it.
        </p>
      ) : (
        <p aria-live="polite">Log one more full tank with an odometer to see mileage.</p>
      )}
      <button
        type="button"
        className="odo-btn"
        onClick={() => {
          markMileageFlash();
          go({ name: "home" });
        }}
      >
        Back to home
      </button>
    </section>
  );
}
