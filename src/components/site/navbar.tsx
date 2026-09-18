"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/site/logo";
import { SignInDropdown } from "@/components/site/sign-in-dropdown";

const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-shield
      onContextMenu={(e) => e.preventDefault()}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-bg-elevated/70 backdrop-blur-xl border-b border-line/60 shadow-[0_4px_24px_-12px_rgba(15,23,42,0.06)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 lg:h-20 items-center justify-between">
          {/* Brand — pulsing animation on hover */}
          <Link href="/" className="flex items-center group/logo">
            <div className="transition-transform duration-300 group-hover/logo:animate-[logoPulse_1.4s_ease-in-out_infinite]">
              <Logo variant={scrolled ? "dark" : "light"} size={44} />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Find Accommodation — hover reveals the "Cities" link with a
                teardrop animation. The teardrop card has a pointed top
                (matches the bottom of the parent button), drops from
                under the button, and hangs just beneath it. The card
                uses the brand alternate palette (orange / yellow / gold)
                for its accent border and the brand harmonic
                white → soft-yellow → white vertical gradient for the
                card body. */}
            <div className="relative group">
              <Link
                href="/find-accommodation"
                className="px-3.5 py-2 text-[14px] font-medium text-ink-soft hover:text-ink transition-colors rounded-lg hover:bg-line-soft inline-flex items-center gap-1"
              >
                Find Accommodation
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
              </Link>
              {/* Teardrop "Cities" card — drops from the button.
                  transform-origin is top center so the scaleY animation
                  visually grows from the button, not from the page.
                  The teardrop shape is created with a small pointed
                  pseudo-arrow at the top + a rounded-3xl card. The
                  brand-orange/yellow gradient border is applied via
                  a wrapper (because Tailwind can't do gradient borders
                  directly on a single element). */}
              <div
                className="absolute top-full left-0 pt-2 z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-[visibility,opacity] duration-150"
                style={{ transformOrigin: "top center" }}
              >
                {/* Gradient border wrapper — brand alternate colors */}
                <div
                  className="cities-teardrop-in rounded-[18px] p-[1.5px] shadow-[0_10px_30px_-10px_rgba(255,140,0,0.35)]"
                  style={{
                    background:
                      "linear-gradient(135deg, #FF8C00 0%, #FFC107 50%, #F9B43A 100%)",
                  }}
                >
                  {/* Teardrop arrow (the point at the top that connects
                      the card to the button) */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-1 left-7 h-3 w-3 rotate-45 bg-gradient-to-br from-sun-1 to-sun-2"
                  />
                  {/* Inner card — white → soft yellow → white gradient */}
                  <Link
                    href="/cities"
                    className="block rounded-[16px] px-5 py-3 text-[13.5px] font-semibold whitespace-nowrap transition-colors hover:text-brand"
                    style={{
                      background:
                        "linear-gradient(180deg, #FFFFFF 0%, #FFF8E8 50%, #FFFFFF 100%)",
                    }}
                  >
                    <span className="flex items-center gap-2">
                      {/* Small geometric sun-and-house mark in the brand
                          alternate palette — matches the logo silhouette. */}
                      <svg width="14" height="14" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                        <circle cx="16" cy="16" r="13" stroke="#FF8C00" strokeWidth="1.5" fill="#FFC107" fillOpacity="0.15" />
                        <path d="M9 22 L16 8 L23 22" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        <line x1="12" y1="17" x2="20" y2="17" stroke="#F9B43A" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      Cities
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Plain nav links (About Us, Contact — Contact gets accent hover) */}
            {navLinks.map((link) => {
              const isAccentLink = link.label === "Contact";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-[14px] font-medium text-ink-soft transition-colors rounded-lg hover:bg-line-soft ${
                    isAccentLink
                      ? "hover:text-[#FF8C00]"
                      : "hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Get started — hover/click reveals a bubble dropdown with
                the three sign-in methods (Zoho, email, username+password). */}
            <SignInDropdown light={!scrolled} />
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden h-10 w-10 inline-flex items-center justify-center rounded-lg hover:bg-line-soft text-ink"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-bg-elevated border-t border-line">
          <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1">
            <Link
              href="/find-accommodation"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-[15px] font-medium text-ink-soft hover:text-ink hover:bg-line-soft rounded-lg"
            >
              Find Accommodation
            </Link>
            <Link
              href="/cities"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-[15px] font-medium text-ink-soft hover:text-ink hover:bg-line-soft rounded-lg pl-6"
            >
              Cities
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-[15px] font-medium text-ink-soft hover:text-ink hover:bg-line-soft rounded-lg"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-[15px] font-medium text-ink-soft hover:text-ink hover:bg-line-soft rounded-lg"
            >
              Contact
            </Link>
            {/* Sign-in options — same three methods as the desktop dropdown */}
            <div className="flex flex-col gap-1.5 mt-2 pt-3 border-t border-line">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand px-1 pb-1">
                Sign in
              </p>
              <Link
                href="/my-account"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-[14px] font-medium text-ink-soft hover:text-ink hover:bg-line-soft rounded-lg"
              >
                Continue with Zoho
              </Link>
              <Link
                href="/my-account"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-[14px] font-medium text-ink-soft hover:text-ink hover:bg-line-soft rounded-lg"
              >
                Continue with email
              </Link>
              <Link
                href="/my-account"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-[14px] font-medium text-ink-soft hover:text-ink hover:bg-line-soft rounded-lg"
              >
                Sign in with username
              </Link>
              <Button
                size="sm"
                className="mt-2 bg-brand text-brand-foreground hover:bg-brand-soft rounded-full"
                onClick={() => setMobileOpen(false)}
              >
                Get started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
