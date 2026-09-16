/**
 * Bespoke brand-aligned SVG icons for the footer contact section.
 * Same visual DNA as the Features section icons: orange→yellow gradient + navy outlines.
 *
 * - EnvelopeMark  : stylised envelope with sun gradient
 * - PhoneMark     : phone handset inside a speech bubble
 * - LocationMark  : map pin with house silhouette inside
 */

type IconProps = { className?: string };

function EnvelopeMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="af-env-grad" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
      </defs>
      <rect
        x="3"
        y="7"
        width="26"
        height="18"
        rx="2"
        fill="url(#af-env-grad)"
        stroke="#2E3194"
        strokeWidth="1.5"
      />
      <path
        d="M3 9 L16 18 L29 9"
        stroke="#2E3194"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="af-phn-grad" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
      </defs>
      {/* Speech bubble shape */}
      <path
        d="M4 6 H28 V20 H17 L11 26 V20 H4 Z"
        fill="url(#af-phn-grad)"
        stroke="#2E3194"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Phone handset */}
      <path
        d="M11 11 C11 10 12 9 13 9 L15 9 L16 12 L14 13.5 C15 15 17 17 18.5 18 L20 16 L23 17 L23 19 C23 20 22 21 21 21 C16 21 11 16 11 11 Z"
        fill="#2E3194"
      />
    </svg>
  );
}

function LocationMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="af-loc-grad" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
      </defs>
      {/* Map pin */}
      <path
        d="M16 2 C22 2 27 7 27 13 C27 20 16 30 16 30 C16 30 5 20 5 13 C5 7 10 2 16 2 Z"
        fill="url(#af-loc-grad)"
        stroke="#2E3194"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* House silhouette inside */}
      <path
        d="M16 8 L21 12 V18 H11 V12 Z"
        fill="#2E3194"
      />
      <rect x="14" y="14" width="4" height="4" fill="url(#af-loc-grad)" />
    </svg>
  );
}

export { EnvelopeMark, PhoneMark, LocationMark };
