import { BackIcon } from "./Icons";

export function ScreenHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <header className="odo-subhead">
      <button type="button" className="odo-icon-btn" onClick={onBack} aria-label="Back">
        <BackIcon />
      </button>
      <h1>{title}</h1>
    </header>
  );
}
