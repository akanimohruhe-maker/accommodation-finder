"use client";

import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroImage = "/images/hero.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[640px] lg:min-h-[760px] flex items-end overflow-hidden">
      {/* Background image with navy gradient overlay (brand DNA) */}
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
          {/* Trust pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[12px] font-medium text-white/90 tracking-wide">
              100% verified listings · Trusted by 12,000+ students
            </span>
          </div>

          {/* Headline */}
          <h1 className="headline text-white text-[44px] sm:text-[56px] lg:text-[72px]">
            Find your perfect<br />
            <span className="text-accent">accommodation.</span>
          </h1>

          {/* Subhead */}
          <p className="mt-5 max-w-xl text-[16px] sm:text-[18px] leading-relaxed text-white/85">
            Student housing, apartments, short stays and long stays —
            across London, Manchester, Birmingham, Leicester and Northampton.
            Verified properties, secure bookings, 24/7 support.
          </p>
        </div>

        {/* Glass search bar */}
        <div
          id="search"
          className="mt-8 lg:mt-12 glass rounded-2xl lg:rounded-3xl shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)] border border-white/40 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 divide-x divide-y md:divide-y-0 divide-line">
            {/* City */}
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
            {/* Move-in date */}
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
            {/* Guests */}
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
            {/* Search button */}
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

        {/* Quick stats */}
        <div className="mt-10 lg:mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 text-white/80">
          {[
            { stat: "1,240+", label: "Verified properties" },
            { stat: "5 cities", label: "Across the UK" },
            { stat: "24/7", label: "Support team" },
            { stat: "4.9/5", label: "Student rating" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col">
              <span className="font-display text-[22px] font-semibold text-white leading-none">{item.stat}</span>
              <span className="mt-1 text-[12px] uppercase tracking-wider text-white/60">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
