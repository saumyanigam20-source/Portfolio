export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button type="button" className="odo-toggle" role="switch" aria-checked={checked} onClick={() => onChange(!checked)}>
      <span>{label}</span>
      <span className="odo-switch" aria-hidden="true" />
    </button>
  );
}
