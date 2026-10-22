export function IosChrome() {
  return (
    <div className="odo-ios" aria-hidden="true">
      <span className="odo-ios-time">9:41</span>
      <span className="odo-ios-island" />
      <span className="odo-ios-glyphs">
        <svg viewBox="0 0 18 12" className="odo-ios-signal" aria-hidden="true">
          <rect x="0" y="7" width="3" height="5" rx="0.6" />
          <rect x="5" y="5" width="3" height="7" rx="0.6" />
          <rect x="10" y="2.5" width="3" height="9.5" rx="0.6" />
          <rect x="15" y="0" width="3" height="12" rx="0.6" />
        </svg>
        <svg viewBox="0 0 16 12" className="odo-ios-wifi" aria-hidden="true">
          <path d="M8 9.6a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6ZM3.4 7.2a6.6 6.6 0 0 1 9.2 0l-1.2 1.3a4.8 4.8 0 0 0-6.8 0L3.4 7.2ZM.6 4.3a10.4 10.4 0 0 1 14.8 0L14.2 5.6a8.6 8.6 0 0 0-12.4 0L.6 4.3Z" />
        </svg>
        <svg viewBox="0 0 27 13" className="odo-ios-battery" aria-hidden="true">
          <rect x="0.6" y="0.6" width="22" height="11.8" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="2.4" y="2.4" width="16" height="8.2" rx="1.4" />
          <path d="M24.2 4.2h1.2a1.2 1.2 0 0 1 1.2 1.2v2.2a1.2 1.2 0 0 1-1.2 1.2h-1.2V4.2Z" />
        </svg>
      </span>
    </div>
  );
}
