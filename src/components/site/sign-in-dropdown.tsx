"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";

/**
 * SignInDropdown — "Get started" reveals an origami-unfolding dropdown
 * containing the brand CTA:
 *
 *   1. A bold "Continue with Zoho Mail" button (the most prominent
 *      option — bigger icon, bolder border, brand-orange gradient).
 *   2. An email input field where the user can type their preferred
 *      email address to receive a magic link.
 *
 * Both options sit in a card that unfolds from the button like a
 * piece of origami paper. The card uses the brand harmonic
 * white → soft yellow → white vertical gradient. The outer
 * border + drop-shadow use the brand alternate palette
 * (orange #FF8C00, yellow #FFC107, gold #F9B43A) so the
 * teardrop + origami animations stay on-brand.
 *
 * Auth integration:
 *   - "Continue with Zoho Mail"  → signIn("zoho", { callbackUrl })
 *   - Email input + submit       → POST /api/auth/signin/email
 *     (sends a one-time magic link to the user's preferred email)
 *
 * The dropdown:
 *   - opens on hover AND on click (so touch users can use it)
 *   - closes when the pointer leaves both the button and the bubble
 *   - closes on Escape and on outside click
 *   - animates IN with the origami-unfold keyframe (480ms cubic-bezier)
 *   - animates OUT with a faster 280ms origami-fold
 *   - keeps open while the focus is anywhere inside the dropdown
 *   - is disabled under prefers-reduced-motion (instant show)
 */

type Props = {
  /** If true, the navbar is over a transparent hero — render the trigger
   *  button in white-on-dark. If false (scrolled navbar with solid bg),
   *  render in brand navy. */
  light: boolean;
};

/**
 * ZohoMailMark — a bespoke geometric SVG mark for Zoho Mail. We use a
 * larger, bolder version here than the small dropdown icons used
 * previously because the user wants Zoho Mail to be the most
 * prominent option in the CTA.
 *
 * The mark combines:
 *   - An orange hexagon (the Zoho brand shape)
 *   - A bold "Z" inside (for Zoho)
 *   - A small envelope flap on the right (for "Mail")
 * All in the brand alternate palette (orange / yellow / gold).
 */
function ZohoMailMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer hexagon — orange stroke, yellow fill, bolder than the
          small mark used in the previous dropdown. */}
      <polygon
        points="24,3 42,13 42,35 24,45 6,35 6,13"
        stroke="#FF8C00"
        strokeWidth="2.2"
        fill="#FFC107"
        fillOpacity="0.22"
        strokeLinejoin="round"
      />
      {/* Inner hexagon ring for a layered, origami-paper feel */}
      <polygon
        points="24,9 36,16 36,32 24,39 12,32 12,16"
        stroke="#F9B43A"
        strokeWidth="1.2"
        fill="none"
        opacity="0.7"
      />
      {/* Bold "Z" mark — the Zoho letter, in brand navy for contrast
          against the warm yellow fill. */}
      <path
        d="M16 18 L32 18 L16 30 L32 30"
        stroke="#2E3194"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Small envelope flap accent at the bottom-right — signals "Mail" */}
      <path
        d="M30 36 L38 36 L34 41 Z"
        stroke="#FF8C00"
        strokeWidth="1.5"
        fill="#FFB700"
        fillOpacity="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * EnvelopeMark — the small email icon used inside the email input field
 * area. Kept subtle so the Zoho Mail button stays the most prominent.
 */
function EnvelopeMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="2"
        stroke="#FF8C00" strokeWidth="1.5" fill="#FFC107" fillOpacity="0.08" />
      <path d="M3 8 L12 14 L21 8"
        stroke="#F9B43A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function SignInDropdown({ light }: Props) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Email magic-link form state
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [emailInfo, setEmailInfo] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

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
      }, 280);
    }, 220);
  };

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

  /** Submit the email magic-link form. Hits the Auth.js v5
   *  /api/auth/signin/email endpoint with the user's preferred email. */
  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setEmailInfo(null);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setSending(true);
    try {
      // Get CSRF token first (Auth.js v5 requires it on POST)
      const csrfRes = await fetch("/api/auth/csrf");
      const csrfData = await csrfRes.json();
      const csrfToken = csrfData.csrfToken as string;

      const res = await fetch("/api/auth/signin/email", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          email,
          csrfToken,
          callbackUrl: window.location.origin + "/my-account",
        }).toString(),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to send magic link");
      }
      setEmailInfo(`Magic link sent to ${email}. Check your inbox.`);
      setEmail("");
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSending(false);
    }
  };

  /** Trigger the Zoho OAuth flow. */
  const signInWithZoho = () => {
    setOpen(false);
    setClosing(false);
    signIn("zoho", { callbackUrl: "/my-account" });
  };

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

      {/* Origami-unfolding dropdown card */}
      {open && (
        <div
          role="menu"
          aria-label="Sign in"
          className="absolute right-0 top-full pt-3 z-50 w-[340px] sm:w-[380px]"
          style={{ perspective: "800px" }}
        >
          {/* The outer wrapper applies the origami animation + the brand-
              alternate gradient border. The inner card uses the brand
              harmonic white → soft-yellow → white vertical gradient so
              the card stays in the same color family as the navbar
              (no color clash). */}
          <div
            className={`rounded-[20px] p-[1.5px] shadow-[0_18px_50px_-12px_rgba(255,140,0,0.32)] ${
              closing ? "origami-unfold-out" : "origami-unfold-in"
            }`}
            style={{
              background:
                "linear-gradient(135deg, #FF8C00 0%, #FFC107 50%, #F9B43A 100%)",
            }}
          >
            <div
              className="relative rounded-[18px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, #FFFFFF 0%, #FFF8E8 50%, #FFFFFF 100%)",
              }}
            >
              {/* Small origami-fold arrow pointing up at the trigger button.
                  Filled with the brand-alternate gradient. */}
              <div
                aria-hidden="true"
                className="absolute -top-1.5 right-7 h-3 w-3 rotate-45"
                style={{
                  background:
                    "linear-gradient(135deg, #FF8C00 0%, #FFC107 100%)",
                }}
              />

              {/* Header inside the card */}
              <div className="px-5 pt-4 pb-3 border-b border-sun-1/15">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                  Sign in to your account
                </p>
                <p className="mt-1 text-[13px] text-ink-soft leading-relaxed">
                  Pick a method below — both connect to the same account.
                </p>
              </div>

              {/* Primary CTA — Continue with Zoho Mail (bold + prominent) */}
              <div className="px-3 pt-3 pb-2">
                <button
                  type="button"
                  onClick={signInWithZoho}
                  className="group w-full inline-flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border-2 border-sun-1 hover:border-sun-1/70 transition-colors text-left shadow-[0_8px_24px_-8px_rgba(255,140,0,0.35)]"
                  style={{
                    background:
                      "linear-gradient(135deg, #FFF8E8 0%, #FFE9B8 100%)",
                  }}
                >
                  {/* Bigger, bolder Zoho Mail icon (32px vs 20px) */}
                  <span
                    className="inline-flex h-14 w-14 items-center justify-center rounded-2xl shrink-0 group-hover:scale-105 transition-transform"
                    style={{
                      background:
                        "linear-gradient(135deg, #FFC107 0%, #FF8C00 100%)",
                      boxShadow:
                        "0 4px 14px -4px rgba(255,140,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4)",
                    }}
                  >
                    <ZohoMailMark size={32} />
                  </span>
                  <span className="flex flex-col flex-1">
                    <span className="text-[15.5px] font-bold text-ink leading-tight">
                      Continue with Zoho Mail
                    </span>
                    <span className="text-[12.5px] text-ink-soft mt-0.5">
                      Recommended — sign in with your Zoho Mail account.
                    </span>
                  </span>
                  {/* Small arrow indicator */}
                  <ChevronDown
                    className="h-4 w-4 text-sun-1 -rotate-90 group-hover:translate-x-0.5 transition-transform shrink-0"
                  />
                </button>
              </div>

              {/* Divider */}
              <div className="px-5 py-2 flex items-center gap-3">
                <div className="flex-1 h-px bg-sun-1/15" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted">
                  or
                </span>
                <div className="flex-1 h-px bg-sun-1/15" />
              </div>

              {/* Email input field — for the user's preferred email */}
              <form onSubmit={sendMagicLink} className="px-3 pt-1 pb-3">
                <label className="block">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted block mb-1.5 px-1">
                    <EnvelopeMark size={14} />
                    Enter your preferred email
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-11 rounded-xl border border-sun-1/25 bg-white px-3.5 text-[14px] text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-sun-1 focus:ring-2 focus:ring-sun-1/15 transition-colors"
                  />
                </label>
                {emailError && (
                  <p className="mt-2 px-1 text-[12px] text-danger">
                    {emailError}
                  </p>
                )}
                {emailInfo && (
                  <p className="mt-2 px-1 text-[12px] text-success">
                    {emailInfo}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-semibold transition-colors disabled:opacity-60"
                  style={{
                    background:
                      "linear-gradient(135deg, #FF8C00 0%, #FFB700 100%)",
                    color: "#1A1407",
                    boxShadow:
                      "0 4px 14px -4px rgba(255,140,0,0.4)",
                  }}
                >
                  {sending && <Loader2 className="h-4 w-4 animate-spin" />}
                  {sending ? "Sending magic link..." : "Send magic link"}
                </button>
              </form>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-sun-1/15 bg-white/40">
                <p className="text-[11.5px] text-ink-muted">
                  New here?{" "}
                  <Link
                    href="/find-accommodation"
                    className="font-semibold text-sun-1 hover:text-sun-1/80 transition-colors"
                  >
                    Browse verified properties →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
