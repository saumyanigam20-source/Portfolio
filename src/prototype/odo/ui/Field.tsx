export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="odo-field">
      <span>{label}</span>
      {children}
    </label>
  );
}
