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
            {/* Find Accommodation — hover reveals Cities option underneath */}
            <div className="relative group">
              <Link
                href="/find-accommodation"
                className="px-3.5 py-2 text-[14px] font-medium text-ink-soft hover:text-ink transition-colors rounded-lg hover:bg-line-soft inline-flex items-center gap-1"
              >
                Find Accommodation
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
              </Link>
              {/* Hover-revealed Cities link (same pattern as Get started → Sign in) */}
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 -translate-y-1 group-hover:translate-y-0">
                <Link
                  href="/cities"
                  className="block bg-bg-elevated text-ink-soft border border-line rounded-full px-4 py-2 text-[13px] font-medium hover:text-[#FF8C00] hover:border-brand/30 shadow-[0_8px_24px_-8px_rgba(15,23,42,0.25)] whitespace-nowrap"
                >
                  Cities
                </Link>
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
