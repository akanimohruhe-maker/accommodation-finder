"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

/**
 * SignInDropdown — the "Get started" button reveals a bubble-style dropdown
 * containing the three sign-in methods:
 *   1. Zoho (continue with Zoho account)
 *   2. Email magic link
 *   3. Username + password (legacy form)
 *
 * The bubble appears below the button with a soft drop-shadow and a small
 * arrow pointing up to the trigger. The dropdown:
 *   - opens on hover AND on click (so touch users can use it)
 *   - closes when the pointer leaves both the button and the bubble
 *   - closes on Escape and on outside click
 *   - animates in with a subtle bubble pop (scale + opacity + slide)
 *   - keeps open while the focus is anywhere inside the dropdown
 *
 * Per the user's spec, each option uses the bespoke geometric brand
 * visual language (sun-palette stroke icons + warm orange accent button).
 */

type Props = {
  /** If true, the navbar is over a transparent hero — render text in white.
   *  If false (scrolled state with solid navbar bg), render text in ink. */
  light: boolean;
};

/** Three small bespoke SVG icons matching the brand geometric style. */
function ZohoMark({ size = 20 }: { size?: number }) {
  // Zoho's logo is red, but for our dropdown we use a bespoke geometric
  // mark — a hexagon with a "Z" inside — in the brand sun palette.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <hexagon />
      <polygon
        points="16,3 28,10 28,22 16,29 4,22 4,10"
        stroke="#FF8C00"
        strokeWidth="1.6"
        fill="#FFC107"
        fillOpacity="0.18"
        strokeLinejoin="round"
      />
      <path
        d="M11 11 L21 11 L11 21 L21 21"
        stroke="#2E3194"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function EnvelopeMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect
        x="5" y="9" width="22" height="16" rx="2"
        stroke="#FF8C00"
        strokeWidth="1.6"
        fill="#FFC107"
        fillOpacity="0.10"
      />
      <path
        d="M5 11 L16 19 L27 11"
        stroke="#F9B43A"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="27" cy="9" r="3" fill="#FFB700" opacity="0.85" />
    </svg>
  );
}

function KeyMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {/* Key ring */}
      <circle
        cx="11" cy="11" r="6"
        stroke="#FF8C00"
        strokeWidth="1.6"
        fill="#FFC107"
        fillOpacity="0.15"
      />
      <circle cx="11" cy="11" r="2" fill="#F9B43A" />
      {/* Key shaft and teeth */}
      <line x1="15" y1="15" x2="27" y2="27" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="22" x2="25" y2="19" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" />
      <line x1="25" y1="25" x2="28" y2="22" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const METHODS = [
  {
    Icon: ZohoMark,
    label: "Continue with Zoho",
    sub: "Sign in with your Zoho account.",
  },
  {
    Icon: EnvelopeMark,
    label: "Continue with email",
    sub: "We'll send a one-time magic link.",
  },
  {
    Icon: KeyMark,
    label: "Sign in with username",
    sub: "Use your Accommodation Finders account.",
  },
];

export function SignInDropdown({ light }: Props) {
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
    // Small delay so the user can move the pointer from the button to the
    // bubble without the bubble disappearing mid-move.
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setClosing(true);
      setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, 180);
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

  // The trigger button colors depend on whether the navbar is transparent
  // (over the hero) or solid (scrolled). On transparent hero, the brand
  // button stays the navy with white text — already high-contrast.
  const buttonBase = light
    ? "bg-white/10 text-white hover:bg-white/15 backdrop-blur-sm border border-white/20"
    : "bg-brand text-brand-foreground hover:bg-brand-soft border border-brand";

  return (
    <div
      ref={containerRef}
      className="relative ml-2"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
      onFocus={openNow}
      onBlur={(e) => {
        // If focus leaves the whole container, close
        if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose();
      }}
    >
      {/* Trigger */}
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => (open ? scheduleClose() : openNow())}
        className={`group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13.5px] font-semibold transition-colors ${buttonBase}`}
      >
        Get started
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-300 ${
            open ? "rotate-180" : "group-hover:rotate-180"
          }`}
        />
      </button>

      {/* Bubble dropdown */}
      {open && (
        <div
          role="menu"
          aria-label="Sign in"
          className={`absolute right-0 top-full pt-3 z-50 w-[320px] sm:w-[360px] ${
            closing ? "animate-[signInBubbleOut_180ms_ease-in_forwards]" : "animate-[signInBubbleIn_280s_ease-out_forwards]"
          }`}
        >
          {/* The bubble — rounded card with a small upward arrow */}
          <div className="relative bg-bg-elevated border border-line rounded-2xl shadow-[0_18px_50px_-12px_rgba(15,23,42,0.25)] p-2 overflow-hidden">
            {/* Small upward arrow centered under the trigger */}
            <div
              aria-hidden="true"
              className="absolute -top-1.5 right-7 h-3 w-3 rotate-45 bg-bg-elevated border-l border-t border-line"
            />

            {/* Header inside the bubble */}
            <div className="px-3 py-3 border-b border-line">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                Sign in to your account
              </p>
              <p className="mt-1 text-[13px] text-ink-soft leading-relaxed">
                Pick a method below — all three connect to the same account.
              </p>
            </div>

            {/* Method list */}
            <ul className="py-1.5" role="none">
              {METHODS.map((m) => (
                <li key={m.label} role="none">
                  <Link
                    href="/my-account"
                    role="menuitem"
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-brand/4 transition-colors"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sun-1/10 to-sun-2/10 border border-sun-1/20 shrink-0 group-hover:from-sun-1/20 group-hover:to-sun-2/20 transition-colors">
                      <m.Icon size={20} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[14px] font-medium text-ink leading-tight">
                        {m.label}
                      </span>
                      <span className="text-[12px] text-ink-muted mt-0.5">
                        {m.sub}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="px-3 py-2.5 border-t border-line">
              <p className="text-[11.5px] text-ink-muted">
                New here?{" "}
                <Link
                  href="/find-accommodation"
                  className="font-medium text-brand hover:text-brand-soft transition-colors"
                >
                  Browse verified properties →
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
