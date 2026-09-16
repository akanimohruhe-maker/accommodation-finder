"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Find Accommodation", href: "#search" },
  { label: "Cities", href: "#cities" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
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
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg-elevated/90 backdrop-blur-xl border-b border-line shadow-[0_4px_24px_-12px_rgba(15,23,42,0.08)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 lg:h-20 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative h-9 w-9 rounded-xl bg-brand flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="font-display font-bold text-base text-brand-foreground">a</span>
              <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent" />
            </div>
            <span className={cn(
              "font-display font-semibold text-[17px] tracking-tight transition-colors",
              scrolled ? "text-ink" : "text-ink"
            )}>
              Accommodation<span className="text-brand">Finders</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-[14px] font-medium text-ink-soft hover:text-ink transition-colors rounded-lg hover:bg-line-soft"
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-2 flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-ink-soft hover:text-ink"
              >
                Sign in
              </Button>
              <Button
                size="sm"
                className="bg-brand text-brand-foreground hover:bg-brand-soft rounded-full px-4"
              >
                Get started
                <ChevronDown className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-[15px] font-medium text-ink-soft hover:text-ink hover:bg-line-soft rounded-lg"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-2 pt-3 border-t border-line">
              <Button variant="outline" size="sm" className="flex-1 rounded-full">Sign in</Button>
              <Button size="sm" className="flex-1 bg-brand text-brand-foreground hover:bg-brand-soft rounded-full">Get started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
