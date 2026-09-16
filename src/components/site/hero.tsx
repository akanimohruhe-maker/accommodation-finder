"use client";

import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroImage = "/images/hero.jpg";

/** Split a string into letter spans for staggered color-cycle animation. */
function AnimatedHeadline({ text }: { text: string }) {
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

export function Hero() {
  return (
    <section className="relative min-h-[640px] lg:min-h-[760px] flex items-end overflow-hidden">
      {/* Background image with navy gradient overlay */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImage}
          alt="London cityscape at dusk"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand/70 via-brand/40 to-brand/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40 pb-16 lg:pb-24">
        <div className="max-w-3xl fade-up">
          {/* Headline — Coolors-style color cycling animation, Space Grotesk */}
          <h1 className="hero-headline text-white text-[44px] sm:text-[56px] lg:text-[72px]">
            <AnimatedHeadline text="Find your perfect accommodation." />
            <span className="sr-only">Find your perfect accommodation.</span>
          </h1>

          {/* Subhead */}
          <p className="mt-5 max-w-xl text-[16px] sm:text-[18px] leading-relaxed text-white/85">
            Student housing, apartments, short stays and long stays across
            London, Manchester, Birmingham, Leicester and Northampton. Verified
            properties, secure bookings, 24/7 support.
          </p>
        </div>

        {/* Glass search bar */}
        <div
          id="search"
          className="mt-8 lg:mt-12 glass rounded-2xl lg:rounded-3xl shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)] border border-white/40 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 divide-x divide-y md:divide-y-0 divide-line">
            <div className="md:col-span-4 p-4 lg:p-5">
              <label className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-ink-muted">
                <MapPin className="h-3 w-3 text-brand" />
                City
              </label>
              <select className="mt-1.5 w-full bg-transparent border-0 text-[15px] text-ink focus:outline-none focus:ring-0 p-0 pr-6">
                <option>London</option>
                <option>Manchester</option>
                <option>Birmingham</option>
                <option>Leicester</option>
                <option>Northampton</option>
              </select>
            </div>
            <div className="md:col-span-3 p-4 lg:p-5">
              <label className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-ink-muted">
                <Calendar className="h-3 w-3 text-brand" />
                Move in
              </label>
              <input
                type="date"
                className="mt-1.5 w-full bg-transparent border-0 text-[15px] text-ink focus:outline-none focus:ring-0 p-0"
              />
            </div>
            <div className="md:col-span-3 p-4 lg:p-5">
              <label className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-ink-muted">
                <Users className="h-3 w-3 text-brand" />
                Guests
              </label>
              <select className="mt-1.5 w-full bg-transparent border-0 text-[15px] text-ink focus:outline-none focus:ring-0 p-0 pr-6">
                <option>1 person</option>
                <option>2 people</option>
                <option>3 people</option>
                <option>4+ people</option>
              </select>
            </div>
            <div className="md:col-span-2 p-3 lg:p-4 flex items-stretch">
              <Button
                size="lg"
                className="w-full h-full bg-brand hover:bg-brand-soft text-brand-foreground rounded-xl text-[14px] font-medium"
              >
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
