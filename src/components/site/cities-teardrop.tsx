"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

/**
 * CitiesTeardrop — the "Find Accommodation" nav link reveals the "Cities"
 * link with a teardrop animation. The card literally drops from under
 * the parent button, hangs just beneath it, and points back up at the
 * button via a small triangular teardrop arrow at the top.
 *
 * Animation: `citiesTeardropIn` keyframe in globals.css. The class is
 * applied to the card ONLY when the dropdown is open — so the animation
 * runs fresh every time the user hovers. (If we left the class applied
 * always, the animation would run on page load while the card was
 * invisible and finish before the user ever hovered — they'd see only
 * the static end state.)
 *
 * Open/close behaviour:
 *   - opens on hover AND on click (so touch users can use it)
 *   - closes when the pointer leaves both the button and the card
 *   - closes on Escape and on outside click
 *   - 220ms hover-out grace period so the card doesn't disappear
 *     mid-move
 *
 * Colors:
 *   - Outer border: brand alternate gradient (orange → yellow → gold)
 *   - Inner card: brand harmonic white → soft-yellow → white vertical
 *     gradient — matches the navbar so colors don't clash
 *   - Small geometric sun + house mark beside the "Cities" label
 *     (matches the logo silhouette)
 */

export function CitiesTeardrop() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setClosing(false);
    setOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setClosing(true);
      setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, 220);
    }, 220);
  };

  // Close on Escape and on outside click
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setClosing(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setClosing(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
      onFocus={openNow}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose();
      }}
    >
      {/* Trigger */}
      <Link
        href="/find-accommodation"
        className="px-3.5 py-2 text-[14px] font-medium text-ink-soft hover:text-ink transition-colors rounded-lg hover:bg-line-soft inline-flex items-center gap-1"
        onClick={(e) => {
          // If the dropdown is open and the user clicks the link text,
          // navigate normally. If it's closed and they click, toggle
          // the dropdown (so touch users can open it).
          if (!open) {
            e.preventDefault();
            openNow();
          }
        }}
      >
        Find Accommodation
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-300 ${
            open ? "rotate-180" : "group-hover:rotate-180"
          }`}
        />
      </Link>

      {/* Teardrop card — only mounted when open, so the animation
          class runs fresh each time the user hovers. */}
      {open && (
        <div
          className="absolute top-full left-0 pt-2 z-50"
          style={{ perspective: "800px" }}
        >
          <div
            className={`rounded-[18px] p-[1.5px] shadow-[0_10px_30px_-10px_rgba(255,140,0,0.35)] ${
              closing ? "cities-teardrop-out" : "cities-teardrop-in"
            }`}
            style={{
              background:
                "linear-gradient(135deg, #FF8C00 0%, #FFC107 50%, #F9B43A 100%)",
              transformOrigin: "top center",
            }}
          >
            {/* Teardrop arrow at the top — points up at the trigger */}
            <div
              aria-hidden="true"
              className="absolute -top-1 left-7 h-3 w-3 rotate-45"
              style={{
                background:
                  "linear-gradient(135deg, #FF8C00 0%, #FFC107 100%)",
              }}
            />
            {/* Inner card — white → soft-yellow → white harmonic gradient */}
            <Link
              href="/cities"
              onClick={() => {
                setOpen(false);
                setClosing(false);
              }}
              className="block rounded-[16px] px-5 py-3 text-[13.5px] font-semibold whitespace-nowrap transition-colors hover:text-brand"
              style={{
                background:
                  "linear-gradient(180deg, #FFFFFF 0%, #FFF8E8 50%, #FFFFFF 100%)",
              }}
            >
              <span className="flex items-center gap-2">
                {/* Small geometric sun + house mark — matches the logo
                    silhouette. Brand alternate palette. */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 32 32"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="16"
                    cy="16"
                    r="13"
                    stroke="#FF8C00"
                    strokeWidth="1.5"
                    fill="#FFC107"
                    fillOpacity="0.15"
                  />
                  <path
                    d="M9 22 L16 8 L23 22"
                    stroke="#FF8C00"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <line
                    x1="12"
                    y1="17"
                    x2="20"
                    y2="17"
                    stroke="#F9B43A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Cities
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
