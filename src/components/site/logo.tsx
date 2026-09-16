import { cn } from "@/lib/utils";

type LogoVariant = "light" | "dark" | "stacked" | "horizontal";

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
  showTagline?: boolean;
};

/**
 * Accommodation Finders logo — recreation of the original brand mark.
 *
 * Visual DNA:
 *  - House silhouette (45° roof, chimney, 2×2 window grid)
 *  - Sun behind it: orange→yellow radial gradient
 *  - Wordmark: "Accommodation" bold + "Finders" light + orange line + tagline
 *
 * Variants:
 *  - "light"    : wordmark in white (for navy/dark backgrounds)
 *  - "dark"     : wordmark in near-black (for light backgrounds)
 *  - "stacked"  : house on top, wordmark below
 *  - "horizontal": house left, wordmark right
 */
export function Logo({
  variant = "horizontal",
  className,
  showTagline = false,
}: LogoProps) {
  const isStacked = variant === "stacked";
  const wordmarkColor = variant === "light" ? "#FFFFFF" : "#0A0A0A";
  const subColor = variant === "light" ? "rgba(255,255,255,0.75)" : "#4A4A4A";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        isStacked && "flex-col gap-2 items-center text-center",
        className
      )}
    >
      {/* House + sun mark */}
      <span
        className="relative inline-flex shrink-0"
        style={{
          width: 40,
          height: 40,
        }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="block"
        >
          {/* Sun: radial gradient orange → yellow */}
          <defs>
            <radialGradient id="af-sun" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFC107" />
              <stop offset="60%" stopColor="#FFB300" />
              <stop offset="100%" stopColor="#FF8C00" />
            </radialGradient>
          </defs>
          <circle cx="24" cy="22" r="20" fill="url(#af-sun)" />
          {/* House silhouette */}
          <path
            d="M24 8 L42 22 V42 H6 V22 Z"
            fill={variant === "light" ? "#FFFFFF" : "#0A0A0A"}
          />
          {/* Chimney */}
          <rect
            x="34"
            y="14"
            width="4"
            height="10"
            fill={variant === "light" ? "#FFFFFF" : "#0A0A0A"}
          />
          {/* Window 2x2 grid */}
          <rect x="20" y="26" width="6" height="6" fill="#FFC107" />
          <rect x="28" y="26" width="6" height="6" fill="#FFC107" />
          <rect x="20" y="34" width="6" height="6" fill="#FFC107" />
          <rect x="28" y="34" width="6" height="6" fill="#FFC107" />
        </svg>
      </span>

      {/* Wordmark */}
      <span
        className={cn(
          "flex flex-col leading-none",
          isStacked && "items-center"
        )}
      >
        <span
          className="font-grotesk font-bold tracking-tight"
          style={{ color: wordmarkColor, fontSize: 19, lineHeight: 1.0 }}
        >
          Accommodation
        </span>
        <span className="flex items-center gap-1.5 mt-0.5">
          <span
            className="font-grotesk font-normal tracking-tight"
            style={{ color: wordmarkColor, fontSize: 19, lineHeight: 1.0 }}
          >
            Finders
          </span>
          <span
            className="inline-block"
            style={{ width: 14, height: 2, backgroundColor: "#FF8C00" }}
          />
        </span>
        {showTagline && (
          <span
            className="font-grotesk mt-1.5 uppercase tracking-[0.22em] font-medium"
            style={{ color: subColor, fontSize: 8.5 }}
          >
            Better places. Brighter stays.
          </span>
        )}
      </span>
    </span>
  );
}
