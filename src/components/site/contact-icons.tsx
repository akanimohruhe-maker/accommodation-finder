/**
 * Bespoke brand-themed contact icons.
 *
 * These replace the generic Lucide icons (Mail, Phone, MessageSquare, MapPin,
 * Clock) that the Contact page previously used. They are hand-crafted SVGs in
 * the brand's geometric visual language — the same shapes (concentric circles,
 * rotating diamonds, sun rays, vertical lines, triangles) and the same sun
 * palette (orange #FF8C00, yellow #FFC107, gold #F9B43A, amber #FFB700) as the
 * homepage's `geometric-patterns.tsx`.
 *
 * Each icon accepts the standard Lucide-like props (size, className) and is
 * rendered with the brand color scheme. They are deliberately NOT Lucide
 * outline icons — they have a more bespoke, branded feel.
 *
 * Subtle hover animations (defined in globals.css) are triggered by the
 * parent element having the `.group` class and the icon's SVG having the
 * corresponding `.contact-anim-*` class. Each icon gets a DIFFERENT animation
 * so the user sees varied motion across the contact channels:
 *
 *   MailIcon     -> .contact-anim-mail     (gentle envelope flap flutter)
 *   PhoneIcon    -> .contact-anim-phone    (phone ring-shake)
 *   ChatIcon     -> .contact-anim-chat     (typing bubble float)
 *   LocationIcon -> .contact-anim-location (pin-drop bob)
 *   ClockIcon    -> .contact-anim-clock    (slow clockwise spin)
 *
 * All animations are disabled under prefers-reduced-motion.
 */

type IconProps = {
  size?: number;
  /** Optional extra class — used to attach the contact-anim-* hover animation. */
  className?: string;
};

const SUN = {
  orange: "#FF8C00",
  yellow: "#FFC107",
  gold: "#F9B43A",
  amber: "#FFB700",
  navy: "#2E3194",
};

/**
 * MailIcon — an envelope formed from a rectangle + a triangular flap, with
 * small floating dot accents in the brand sun palette to suggest motion
 * ("your message is on its way").
 *
 * Hover animation: gentle flap flutter (contact-anim-mail).
 */
export function MailIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer envelope body — rounded rectangle */}
      <rect
        x="6" y="14" width="36" height="24" rx="3"
        stroke={SUN.orange}
        strokeWidth="2"
        fill="none"
      />
      {/* Envelope flap — triangle, slightly inset */}
      <path
        d="M6 16 L24 28 L42 16"
        stroke={SUN.gold}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Inner small triangle accent (highlight on flap fold) */}
      <path
        d="M6 14 L24 26 L42 14"
        stroke={SUN.yellow}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
        fill="none"
      />
      {/* Floating dot accents */}
      <circle cx="10" cy="8"  r="2"   fill={SUN.yellow} opacity="0.85" />
      <circle cx="38" cy="6"  r="1.5" fill={SUN.amber}  opacity="0.75" />
      <circle cx="42" cy="42" r="2"   fill={SUN.gold}   opacity="0.65" />
      <circle cx="6"  cy="44" r="1.5" fill={SUN.orange} opacity="0.55" />
    </svg>
  );
}

/**
 * PhoneIcon — a stylized phone handset inside concentric signal-ring arcs,
 * echoing the geometric concentric-circle motif of the homepage.
 *
 * Hover animation: phone ring-shake (contact-anim-phone).
 */
export function PhoneIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Concentric signal rings radiating outward (bottom-right) */}
      <path d="M30 36 Q40 30 36 18"     stroke={SUN.yellow} strokeWidth="1.5" strokeLinecap="round" opacity="0.45" fill="none" />
      <path d="M33 38 Q43 30 39 14"     stroke={SUN.gold}   strokeWidth="1.5" strokeLinecap="round" opacity="0.65" fill="none" />
      <path d="M36 40 Q46 30 42 10"     stroke={SUN.orange} strokeWidth="1.5" strokeLinecap="round" opacity="0.85" fill="none" />

      {/* Phone handset — geometric, formed from a rounded shape */}
      <path
        d="M14 10 Q10 10 10 14 L10 18 Q14 22 22 26 Q26 30 30 34 L34 38 Q38 38 38 34 L38 30 Q34 28 30 30 L26 26 Q22 22 22 18 L20 14 Q20 10 18 10 Z"
        stroke={SUN.orange}
        strokeWidth="2"
        strokeLinejoin="round"
        fill={SUN.yellow}
        fillOpacity="0.25"
      />
      {/* Central dot — earpiece */}
      <circle cx="15" cy="14" r="1.5" fill={SUN.orange} />
    </svg>
  );
}

/**
 * ChatIcon — a chat bubble formed from a rounded square + a small tail
 * triangle, with three small dots inside (typing indicator) and small
 * floating dots outside.
 *
 * Hover animation: bubble float (contact-anim-chat).
 */
export function ChatIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main bubble — rounded rectangle */}
      <path
        d="M8 10 H40 Q42 10 42 12 V30 Q42 32 40 32 H18 L10 40 V32 Q8 32 8 30 V12 Q8 10 10 10 Z"
        stroke={SUN.orange}
        strokeWidth="2"
        strokeLinejoin="round"
        fill={SUN.yellow}
        fillOpacity="0.10"
      />
      {/* Typing indicator — three dots inside the bubble */}
      <circle cx="18" cy="21" r="2"   fill={SUN.amber}  className="gp-pulse-1" />
      <circle cx="25" cy="21" r="2"   fill={SUN.gold}   className="gp-pulse-2" />
      <circle cx="32" cy="21" r="2"   fill={SUN.yellow} className="gp-pulse-3" />
      {/* Floating dot accents */}
      <circle cx="44" cy="6"  r="2"   fill={SUN.yellow} opacity="0.7" />
      <circle cx="4"  cy="46" r="1.5" fill={SUN.gold}   opacity="0.6" />
    </svg>
  );
}

/**
 * LocationIcon — a location pin formed from a circle on top + a triangle
 * underneath, with concentric rings inside the circle to echo the homepage
 * geometric pattern.
 *
 * Hover animation: pin-drop bob (contact-anim-location).
 */
export function LocationIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Pin outline — circle + triangle below */}
      <path
        d="M24 4 Q14 4 14 16 Q14 24 24 36 Q34 24 34 16 Q34 4 24 4 Z"
        stroke={SUN.orange}
        strokeWidth="2"
        strokeLinejoin="round"
        fill={SUN.yellow}
        fillOpacity="0.15"
      />
      {/* Concentric rings inside the pin head */}
      <circle cx="24" cy="16" r="9"  stroke={SUN.gold}   strokeWidth="1.5" opacity="0.6" fill="none" />
      <circle cx="24" cy="16" r="6"  stroke={SUN.amber} strokeWidth="1.5" opacity="0.75" fill="none" />
      <circle cx="24" cy="16" r="3"  fill={SUN.yellow}  />
      {/* Tail dot below the pin */}
      <circle cx="24" cy="42" r="2" fill={SUN.amber} opacity="0.85" />
      {/* Floating accents */}
      <circle cx="6"  cy="10" r="1.5" fill={SUN.gold}   opacity="0.6" />
      <circle cx="42" cy="6"  r="2"   fill={SUN.yellow} opacity="0.55" />
    </svg>
  );
}

/**
 * ClockIcon — a clock face with sun rays radiating outward (suggesting the
 * passage of time as a daily cycle), with geometric hour markers.
 *
 * Hover animation: slow clockwise spin (contact-anim-clock).
 */
export function ClockIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Sun rays radiating from the clock */}
      <line x1="24" y1="2"  x2="24" y2="6"  stroke={SUN.yellow} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="24" y1="42" x2="24" y2="46" stroke={SUN.gold}   strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="2"  y1="24" x2="6"  y2="24" stroke={SUN.amber} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="42" y1="24" x2="46" y2="24" stroke={SUN.orange} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="8"  y1="8"  x2="11" y2="11" stroke={SUN.yellow} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="37" y1="37" x2="40" y2="40" stroke={SUN.gold}   strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="40" y1="8"  x2="37" y2="11" stroke={SUN.amber} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="11" y1="37" x2="8"  y2="40" stroke={SUN.orange} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

      {/* Outer clock ring */}
      <circle cx="24" cy="24" r="14" stroke={SUN.orange} strokeWidth="2" fill={SUN.yellow} fillOpacity="0.10" />
      {/* Inner ring (concentric) */}
      <circle cx="24" cy="24" r="11" stroke={SUN.gold}   strokeWidth="1"   opacity="0.55" fill="none" />

      {/* Hour markers — small triangles at 12, 3, 6, 9 */}
      <polygon points="24,11 26,14 22,14"   fill={SUN.orange} />
      <polygon points="37,24 34,22 34,26" fill={SUN.gold} />
      <polygon points="24,37 22,34 26,34" fill={SUN.amber} />
      <polygon points="11,24 14,22 14,26" fill={SUN.yellow} />

      {/* Hands — orange minute + gold hour */}
      <line x1="24" y1="24" x2="24" y2="16" stroke={SUN.orange} strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="24" x2="30" y2="24" stroke={SUN.gold}   strokeWidth="2" strokeLinecap="round" />
      {/* Center pin */}
      <circle cx="24" cy="24" r="2" fill={SUN.yellow} />
    </svg>
  );
}

