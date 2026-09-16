import { cn } from "@/lib/utils";

type LogoVariant = "light" | "dark";

type LogoProps = {
  /**
   * - "light" — pick the logo variant that's readable on a DARK background
   *   (uses official-logo-light.png: white house + orange sun, transparent bg)
   * - "dark"  — pick the logo variant that's readable on a LIGHT background
   *   (uses official-logo-dark.png: black house + orange sun, transparent bg)
   */
  variant?: LogoVariant;
  className?: string;
  size?: number;
};

/**
 * Accommodation Finders official logo — uses the brand-supplied PNG asset
 * (converted from acc.jpeg to two transparent PNGs by scripts/convert_logo.py).
 *
 * Two variants exist:
 *  - official-logo-dark.png  — black house + orange sun, transparent bg  (for light backgrounds)
 *  - official-logo-light.png — white house + orange sun, transparent bg  (for dark backgrounds)
 *
 * The pulsing animation on hover is applied by the parent (navbar/footer) via
 * the `group/logo` class — see globals.css `@keyframes logoPulse`.
 */
export function Logo({
  variant = "dark",
  className,
  size = 44,
}: LogoProps) {
  const src = variant === "light"
    ? "/images/official-logo-light.png"
    : "/images/official-logo-dark.png";

  return (
    <span
      className={cn("inline-flex items-center", className)}
      style={{ height: size }}
    >
      <img
        src={src}
        alt="Accommodation Finders"
        width={size}
        height={size}
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
