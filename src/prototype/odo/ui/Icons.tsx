type IconProps = { className?: string };

export function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="odo-glyph">
      <path d="M14.5 5.5 8 12l6.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="odo-glyph">
      <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function TimelineIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="odo-glyph">
      <path d="M8 6h11M8 12h11M8 18h11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="4.5" cy="6" r="1.3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="4.5" cy="12" r="1.3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="4.5" cy="18" r="1.3" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ReportIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="odo-glyph">
      <path d="M5 19V10M10 19V5M15 19v-7M20 19V8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="odo-glyph">
      <circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 19.2c1.4-3 3.6-4.4 6.5-4.4s5.1 1.4 6.5 4.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="odo-glyph odo-glyph-plus">
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function KindIcon({ kind }: { kind: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="odo-glyph">
      {kind === "fuel" ? (
        <path d="M7 4h7v16H7zM14 8h3l2 3v5h-5M8 20v2M13 20v2M6 8h8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : kind === "part" ? (
        <path d="M14.5 6.5a2 2 0 0 1 3 3L8 19l-3.5.5L5 16 14.5 6.5Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      ) : kind === "service" ? (
        <path d="M14 7a4 4 0 0 0-5 5L4 17l3 3 5-5a4 4 0 0 0 5-5l-2.5 2.5L12 10l2.5-2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M7 3.5h7L18 8v12.5H7zM14 3.5V8h4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className ?? "odo-glyph"}>
      <path d="M5 12.5 9.5 17 19 7.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
