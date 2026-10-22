type IconProps = { className?: string };

export function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="odo-glyph">
      <path d="M14.5 5.5 8 12l6.5 6.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="odo-glyph">
      <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function TimelineIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="odo-glyph">
      <path d="M8 6h11M8 12h11M8 18h11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="4.5" cy="6" r="1.3" fill="currentColor" />
      <circle cx="4.5" cy="12" r="1.3" fill="currentColor" />
      <circle cx="4.5" cy="18" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function ReportIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="odo-glyph">
      <path d="M5 19V10M10 19V5M15 19v-7M20 19V8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="odo-glyph">
      <circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.5 19.2c1.4-3 3.6-4.4 6.5-4.4s5.1 1.4 6.5 4.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="odo-glyph odo-glyph-plus">
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className ?? "odo-glyph"}>
      <path d="M5 12.5 9.5 17 19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
