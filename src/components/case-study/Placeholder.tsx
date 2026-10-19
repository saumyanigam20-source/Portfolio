export function Placeholder({ children }: { children: string }) {
  return (
    <span className="mx-0.5 inline-block rounded-md border border-dashed border-accent/40 bg-accent-soft px-1.5 py-0.5 align-baseline text-[0.85em] leading-snug font-medium text-ink">
      {children}
    </span>
  );
}
