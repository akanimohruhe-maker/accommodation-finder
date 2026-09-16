"use client";

import { useEffect, useState } from "react";

/**
 * GeometricPatterns — fixed-position animated decorative element on the left side
 * of the viewport, visible after the user scrolls past the hero.
 *
 * Design rules (per brand brief):
 *  - Symmetrical geometric shapes (circles, squares, lines, triangles)
 *  - Animated subtly (rotation, scale, opacity pulses)
 *  - Brand alternate theme: orange / amber / gold (sun palette)
 *  - Do NOT clash with horizontal scrolls (testimonials left, stats right)
 *  - Pleasant, ambient, never distracting
 *  - Disappears when hero is in view (only shows after scroll)
 */
export function GeometricPatterns() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past ~60% of viewport height
      const threshold = window.innerHeight * 0.5;
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 bottom-0 w-[120px] sm:w-[180px] lg:w-[260px] z-[1] transition-opacity duration-700 ${
        visible ? "opacity-60" : "opacity-0"
      }`}
      style={{
        // Radial fade so the patterns fade out toward the centre of the page
        maskImage: "linear-gradient(to right, black 0%, black 40%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, black 0%, black 40%, transparent 100%)",
      }}
    >
      {/* Layer 1 — concentric pulsing circles, top */}
      <svg
        viewBox="0 0 200 200"
        className="absolute top-[10%] left-[-30px] w-[140px] h-[140px] gp-rotate"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="80" stroke="#FFC107" strokeWidth="1.5" opacity="0.4" />
        <circle cx="100" cy="100" r="60" stroke="#FF8C00" strokeWidth="1.5" opacity="0.5" />
        <circle cx="100" cy="100" r="40" stroke="#F9B43A" strokeWidth="1.5" opacity="0.6" />
        <circle cx="100" cy="100" r="20" fill="#FFB700" opacity="0.3" className="gp-pulse" />
      </svg>

      {/* Layer 2 — rotating square + diamond, middle */}
      <svg
        viewBox="0 0 100 100"
        className="absolute top-[40%] left-[10px] w-[80px] h-[80px] gp-rotate-slow"
        fill="none"
      >
        <rect x="20" y="20" width="60" height="60" stroke="#FF8C00" strokeWidth="1.5" opacity="0.5" />
        <rect
          x="35" y="35" width="30" height="30"
          stroke="#F9B43A" strokeWidth="1.5" opacity="0.6"
          transform="rotate(45 50 50)"
          className="gp-rotate"
        />
        <circle cx="50" cy="50" r="4" fill="#FFC107" opacity="0.8" />
      </svg>

      {/* Layer 3 — vertical lines pulsing opacity, middle-bottom */}
      <svg
        viewBox="0 0 80 200"
        className="absolute top-[55%] left-[20px] w-[60px] h-[160px]"
        fill="none"
      >
        <line x1="10" y1="20" x2="10" y2="180" stroke="#FFC107" strokeWidth="1" opacity="0.4" className="gp-pulse-1" />
        <line x1="25" y1="40" x2="25" y2="160" stroke="#FF8C00" strokeWidth="1" opacity="0.4" className="gp-pulse-2" />
        <line x1="40" y1="10" x2="40" y2="190" stroke="#F9B43A" strokeWidth="1" opacity="0.4" className="gp-pulse-3" />
        <line x1="55" y1="50" x2="55" y2="150" stroke="#FFB700" strokeWidth="1" opacity="0.4" className="gp-pulse-4" />
        <line x1="70" y1="30" x2="70" y2="170" stroke="#FFC107" strokeWidth="1" opacity="0.4" className="gp-pulse-1" />
      </svg>

      {/* Layer 4 — rotating triangle, bottom */}
      <svg
        viewBox="0 0 100 100"
        className="absolute bottom-[8%] left-[30px] w-[100px] h-[100px] gp-rotate-slower"
        fill="none"
      >
        <polygon points="50,15 85,80 15,80" stroke="#FF8C00" strokeWidth="1.5" opacity="0.5" />
        <polygon points="50,30 70,70 30,70" stroke="#F9B43A" strokeWidth="1.5" opacity="0.6" />
        <polygon points="50,45 60,65 40,65" fill="#FFC107" opacity="0.5" />
      </svg>

      {/* Layer 5 — small floating dots */}
      <svg
        viewBox="0 0 200 400"
        className="absolute inset-0 w-full h-full"
      >
        <circle cx="50"  cy="80"  r="3" fill="#FFC107" className="gp-pulse-1" />
        <circle cx="120" cy="180" r="2" fill="#FF8C00" className="gp-pulse-2" />
        <circle cx="40"  cy="260" r="4" fill="#F9B43A" className="gp-pulse-3" />
        <circle cx="150" cy="320" r="2.5" fill="#FFB700" className="gp-pulse-4" />
        <circle cx="80"  cy="370" r="2" fill="#FFC107" className="gp-pulse-1" />
      </svg>
    </div>
  );
}
