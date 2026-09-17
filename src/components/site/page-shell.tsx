"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** Optional hero background image. If omitted, a brand-navy background with
   * decorative geometric SVG is used. */
  heroImage?: string;
  /** Optional smaller badge shown above the eyebrow (e.g. "5 cities" or "Updated weekly"). */
  badge?: string;
};

/**
 * AnimatedText — splits a string into letter spans for the staggered
 * color-cycle animation used in the homepage hero. Mirrors the effect in
 * `src/components/site/hero.tsx` so all page headers feel consistent.
 */
function AnimatedText({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          className="color-cycle"
          style={{ ["--i" as string]: i }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

/**
 * Decorative geometric SVG element placed bottom-right of the header.
 * Uses the brand sun palette (orange / amber / gold) and animated rings /
 * triangles / lines — same visual language as `geometric-patterns.tsx`.
 * Purely decorative; aria-hidden.
 */
function HeaderGeometricAccent() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 bottom-0 w-[180px] sm:w-[280px] lg:w-[400px] opacity-70 z-0"
      style={{
        maskImage: "linear-gradient(to left, black 0%, black 35%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to left, black 0%, black 35%, transparent 100%)",
      }}
    >
      {/* Concentric pulsing circles, top-right */}
      <svg
        viewBox="0 0 200 200"
        className="absolute top-[6%] right-[-40px] w-[160px] h-[160px] gp-rotate"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="85" stroke="#FFC107" strokeWidth="1.5" opacity="0.45" />
        <circle cx="100" cy="100" r="65" stroke="#FF8C00" strokeWidth="1.5" opacity="0.55" />
        <circle cx="100" cy="100" r="45" stroke="#F9B43A" strokeWidth="1.5" opacity="0.65" />
        <circle cx="100" cy="100" r="25" fill="#FFB700" opacity="0.35" className="gp-pulse" />
      </svg>

      {/* Rotating diamond + square, middle-right */}
      <svg
        viewBox="0 0 100 100"
        className="absolute top-[44%] right-[10px] w-[90px] h-[90px] gp-rotate-slow"
        fill="none"
      >
        <rect x="20" y="20" width="60" height="60" stroke="#FF8C00" strokeWidth="1.5" opacity="0.5" />
        <rect
          x="35" y="35" width="30" height="30"
          stroke="#F9B43A" strokeWidth="1.5" opacity="0.6"
          transform="rotate(45 50 50)"
          className="gp-rotate"
        />
        <circle cx="50" cy="50" r="4" fill="#FFC107" opacity="0.85" />
      </svg>

      {/* Vertical pulsing lines, lower-right */}
      <svg
        viewBox="0 0 80 200"
        className="absolute bottom-[8%] right-[24px] w-[60px] h-[180px]"
        fill="none"
      >
        <line x1="10" y1="20" x2="10" y2="180" stroke="#FFC107" strokeWidth="1" opacity="0.5" className="gp-pulse-1" />
        <line x1="25" y1="40" x2="25" y2="160" stroke="#FF8C00" strokeWidth="1" opacity="0.5" className="gp-pulse-2" />
        <line x1="40" y1="10" x2="40" y2="190" stroke="#F9B43A" strokeWidth="1" opacity="0.5" className="gp-pulse-3" />
        <line x1="55" y1="50" x2="55" y2="150" stroke="#FFB700" strokeWidth="1" opacity="0.5" className="gp-pulse-4" />
        <line x1="70" y1="30" x2="70" y2="170" stroke="#FFC107" strokeWidth="1" opacity="0.5" className="gp-pulse-1" />
      </svg>

      {/* Rotating triangle, bottom-right corner */}
      <svg
        viewBox="0 0 100 100"
        className="absolute bottom-[6%] right-[40px] w-[100px] h-[100px] gp-rotate-slower"
        fill="none"
      >
        <polygon points="50,15 85,80 15,80" stroke="#FF8C00" strokeWidth="1.5" opacity="0.55" />
        <polygon points="50,30 70,70 30,70" stroke="#F9B43A" strokeWidth="1.5" opacity="0.65" />
        <polygon points="50,45 60,65 40,65" fill="#FFC107" opacity="0.55" />
      </svg>

      {/* Floating dots scattered throughout the accent area */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
        <circle cx="80"  cy="60"  r="3" fill="#FFC107" className="gp-pulse-1" />
        <circle cx="180" cy="140" r="2" fill="#FF8C00" className="gp-pulse-2" />
        <circle cx="60"  cy="240" r="4" fill="#F9B43A" className="gp-pulse-3" />
        <circle cx="250" cy="320" r="2.5" fill="#FFB700" className="gp-pulse-4" />
        <circle cx="320" cy="200" r="2" fill="#FFC107" className="gp-pulse-1" />
        <circle cx="140" cy="370" r="3" fill="#FF8C00" className="gp-pulse-2" />
      </svg>
    </div>
  );
}

export function PageShell({
  children,
  header,
}: {
  children: React.ReactNode;
  header: PageHeaderProps;
}) {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <section
        className="relative overflow-hidden bg-brand text-white pt-32 pb-20 lg:pt-44 lg:pb-32"
        data-shield
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Optional hero background image with homepage-style dual gradient overlay */}
        {header.heroImage && (
          <div className="absolute inset-0 z-0" data-shield>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={header.heroImage}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
              loading="eager"
              decoding="async"
              onContextMenu={(e) => e.preventDefault()}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand/75 via-brand/55 to-brand/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/15 to-transparent" />
          </div>
        )}

        {/* Decorative geometric accent (sun palette), top-right */}
        <HeaderGeometricAccent />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>
          {header.badge && (
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent-hot mb-3">
              {header.badge}
            </p>
          )}
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent mb-3">
            {header.eyebrow}
          </p>
          <h1 className="hero-headline text-white text-[40px] sm:text-[56px] lg:text-[72px] max-w-3xl">
            <AnimatedText text={header.title} />
          </h1>
          {header.description && (
            <p className="mt-6 max-w-2xl text-[16px] lg:text-[18px] text-white/85 leading-relaxed">
              {header.description}
            </p>
          )}
        </div>
      </section>
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  );
}
