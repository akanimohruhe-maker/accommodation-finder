import { cn } from "@/lib/utils";

/**
 * Wordmark — the "Accommodation finders" brand wordmark rendered as text
 * using the SAME font recipe as the official logo PNG:
 *   - "Accommodation" in Allura (flowing cursive script)
 *   - "finders" in Bricolage Grotesque (bold sans-serif)
 *
 * Used in the footer copyright block, the "brand block" that sits under
 * the Northampton image on the homepage, and other free spots where we
 * want to reinforce the brand without re-using the rasterized logo PNG.
 *
 * Accepts a `size` prop that scales the whole wordmark. The two font
 * families scale independently because Allura's visual x-height is much
 * smaller than Bricolage Grotesque's — so we manually nudge the two parts
 * to share a baseline.
 *
 * Color: defaults to `currentColor` so the parent controls the color via
 * `text-ink` / `text-white` / etc. The "Accommodation" word can also be
 * tinted to the brand orange (text-sun-1) by passing `accent="orange"`.
 */

type Props = {
  /** Overall scale: 1 = natural size (~180px wide). Used as a CSS transform
   *  scale on the inline-flex container. */
  scale?: number;
  /** Optional override for the cursive-word color. Default: inherit. */
  accent?: "ink" | "orange";
  className?: string;
};

export function Wordmark({ scale = 1, accent = "ink", className }: Props) {
  const accommodationColor =
    accent === "orange" ? "#FF8C00" : "currentColor";
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-2 whitespace-nowrap select-none",
        className,
      )}
      data-shield
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "left center",
      }}
    >
      {/* "Accommodation" — cursive script (Allura). Allura has a small
          x-height relative to its ascenders, so we use a larger font-size
          for it than for "finders" to visually balance them on a shared
          baseline. */}
      <span
        style={{
          fontFamily: "var(--font-wordmark)",
          fontSize: "44px",
          lineHeight: 1,
          color: accommodationColor,
          letterSpacing: "-0.01em",
        }}
      >
        Accommodation
      </span>
      {/* "finders" — bold sans (Bricolage Grotesque). Lowercase to match
          the logo. */}
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "28px",
          lineHeight: 1,
          color: "currentColor",
          letterSpacing: "-0.02em",
          // Tiny downward nudge so the baseline visually aligns with the
          // cursive ascender baseline of Allura.
          transform: "translateY(-2px)",
          display: "inline-block",
        }}
      >
        finders
      </span>
    </span>
  );
}
