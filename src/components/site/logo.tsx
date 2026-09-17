import { cn } from "@/lib/utils";

type LogoVariant = "light" | "dark";

type LogoProps = {
  /**
   * - "light" — pick the logo variant readable on a DARK background
   *   (uses official-logo-light.png: white house + orange sun, transparent bg)
   * - "dark"  — pick the logo variant readable on a LIGHT background
   *   (uses official-logo-dark.png: black house + orange sun, transparent bg)
   */
  variant?: LogoVariant;
  className?: string;
  /** Rendered height in pixels. Width auto-derives from the 2070×1110 source's
   *  aspect ratio (roughly 1.86:1). The source is upscaled 2x with LANCZOS so
   *  it stays crisp on retina screens. */
  size?: number;
};

/**
 * Accommodation Finders official logo — uses the brand-supplied PNG asset,
 * processed in scripts/process-logo-pure.py:
 *   - White background removed → transparent RGBA
 *   - Original pixel colors preserved exactly (no recoloring, no shape change)
 *   - Two variants: black text+outline (for light backgrounds) and
 *     white text+outline (for dark backgrounds). Orange sun preserved in both.
 *   - 2× upscaled to 2070×1110 with LANCZOS for crisp rendering.
 *
 * The pulsing animation on hover is applied by the parent (navbar/footer) via
 * the `group/logo` class — see globals.css `@keyframes logoPulse`.
 *
 * Image protection: draggable={false} + the global <ImageShield> in layout.tsx
 * blocks right-click on all images site-wide. We do NOT attach onContextMenu
 * here because this component is rendered inside Server Components (e.g. the
 * About page) and Next.js forbids passing event handlers from a Server
 * Component to a Client DOM element.
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
      className={cn("inline-flex items-center select-none", className)}
      style={{ height: size }}
      data-shield
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Accommodation Finders"
        draggable={false}
        decoding="async"
        style={{
          height: size,
          width: "auto",
          objectFit: "contain",
          // Disable touch callout / long-press save on mobile
          WebkitUserDrag: "none",
        }}
      />
    </span>
  );
}
