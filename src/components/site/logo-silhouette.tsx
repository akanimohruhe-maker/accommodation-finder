import { cn } from "@/lib/utils";

/**
 * LogoSilhouette — a faint, decorative outline of the Accommodation Finders
 * logo (the sun + house forming the letter "A"), used as ambient brand
 * watermark at strategic locations across the site.
 *
 * The silhouette is rendered as an inline SVG (so it inherits page colors),
 * matching the geometric visual language of the homepage's
 * `geometric-patterns.tsx` and the bespoke contact icons.
 *
 * Visual: a circle (the sun) with an "A"-shaped house structure inside
 * (two diagonal legs forming a peak, with a horizontal crossbar and a
 * small window square at the bottom-left). Drawn as STROKE ONLY so it
 * reads as a "silhouette" / outline watermark rather than a full-color logo.
 *
 * Props:
 *  - size — pixel size (square)
 *  - className — extra classes (use Tailwind to set color via text-* and
 *               opacity via opacity-*)
 *  - animate — optionally add a slow rotate/pulse to draw attention
 *
 * Strategic placement recommendations (implemented in the page components):
 *  - About page: bottom-right of the "Mission statement" section, very faint
 *  - Contact page: faint watermark in the form-area background
 *  - Cities page: faint watermark behind the city-card grid
 *  - Footer: already shows the real Logo; silhouette would be redundant
 *  - Hero: NOT recommended (would clash with the full logo in the navbar)
 */
type Props = {
  size?: number;
  className?: string;
  animate?: boolean;
};

export function LogoSilhouette({ size = 200, className, animate = false }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      className={cn("text-current", animate && "gp-rotate-slower", className)}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer circle — the "sun" — stroke only */}
      <circle
        cx="100" cy="100" r="78"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.4"
      />
      {/* Inner concentric circle for a subtle ring */}
      <circle
        cx="100" cy="100" r="64"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.25"
      />

      {/* The "A" house structure inside the sun:
          - Two diagonal lines meeting at the peak (top center)
          - A horizontal crossbar
          - A small window square at the bottom-left
          All stroke only, so it reads as an outline silhouette. */}
      {/* Left diagonal leg of the A */}
      <line
        x1="65" y1="140" x2="100" y2="60"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Right vertical leg of the A (acts as both the A's right side and the
          house's chimney/door) */}
      <line
        x1="100" y1="60" x2="135" y2="140"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Crossbar of the A */}
      <line
        x1="78" y1="110" x2="122" y2="110"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Small window square at the bottom-left of the A (the house's window) */}
      <rect
        x="60" y="138" width="14" height="14"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.55"
      />

      {/* Optional animate-only pulse dot in the center of the sun */}
      {animate && (
        <circle
          cx="100" cy="100" r="6"
          fill="currentColor"
          opacity="0.4"
          className="gp-pulse"
        />
      )}
    </svg>
  );
}
