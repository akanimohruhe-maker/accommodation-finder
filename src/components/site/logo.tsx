import { cn } from "@/lib/utils";

type LogoVariant = "light" | "dark";

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
  /** Size of the logo mark in pixels (square) */
  size?: number;
};

/**
 * Accommodation Finders official logo — uses the brand-supplied PNG asset.
 *
 * The logo mark depicts a stylised house silhouette with a sun circle behind it,
 * the wordmark reads "Accommodation finders" (cursive "Accommodation" + bold
 * sans-serif "finders").
 *
 * The pulsing animation on hover is applied by the parent (navbar/footer) via
 * the `group/logo` class — see globals.css `@keyframes logoPulse`.
 *
 * Variants:
 *  - "light" — drop-shadow filter so it's readable on dark backgrounds (hero, footer)
 *  - "dark"  — no filter, used on light backgrounds
 */
export function Logo({
  variant = "dark",
  className,
  size = 44,
}: LogoProps) {
  const isLight = variant === "light";

  return (
    <span
      className={cn("inline-flex items-center", className)}
      style={{
        height: size,
        // On light backgrounds (nav scrolled), the logo is black + orange — readable as-is.
        // On dark backgrounds (hero, footer), invert filter flips black to white.
        filter: isLight
          ? "invert(1) hue-rotate(180deg) saturate(1.5)"
          : "none",
        transition: "filter 200ms ease",
      }}
    >
      <img
        src="/images/official-logo.png"
        alt="Accommodation Finders"
        width={size}
        height={size}
        // Logo is decorative-textual — the alt text covers screen readers
        // eslint-disable-next-line @next/next/no-img-element
        style={{
          height: size,
          width: "auto",
          objectFit: "contain",
        }}
      />
    </span>
  );
}
