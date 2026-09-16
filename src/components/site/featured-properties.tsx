"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star, MapPin, BedDouble, Maximize } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Property = {
  name: string;
  city: string;
  area: string;
  type: string;
  price: string;
  period: string;
  rating: number;
  reviews: number;
  image: string;
  available: string;
  beds: string;
  size: string;
  featured?: boolean;
};

const properties: Property[] = [
  {
    name: "Skyline View Apartments",
    city: "London",
    area: "Canary Wharf",
    type: "En-suite studio",
    price: "£285",
    period: "/wk",
    rating: 4.9,
    reviews: 184,
    image: "/images/property-skyline-view-apartments.jpg",
    available: "Available Sep 28",
    beds: "Studio",
    size: "28 m²",
    featured: true,
  },
  {
    name: "The Northern Quarter Lofts",
    city: "Manchester",
    area: "Northern Quarter",
    type: "2-bed apartment",
    price: "£220",
    period: "/wk",
    rating: 4.8,
    reviews: 92,
    image: "/images/property-the-northern-quarter-lofts.jpg",
    available: "Available Oct 4",
    beds: "2 beds",
    size: "62 m²",
  },
  {
    name: "Aston Square Residence",
    city: "Birmingham",
    area: "Aston",
    type: "En-suite studio",
    price: "£165",
    period: "/wk",
    rating: 4.7,
    reviews: 68,
    image: "/images/property-aston-square-residence.jpg",
    available: "Available Sep 22",
    beds: "Studio",
    size: "24 m²",
  },
  {
    name: "Victoria House",
    city: "Leicester",
    area: "City centre",
    type: "Shared house",
    price: "£115",
    period: "/wk",
    rating: 4.8,
    reviews: 47,
    image: "/images/property-victoria-house.jpg",
    available: "Available Oct 10",
    beds: "Single room",
    size: "16 m²",
  },
  {
    name: "Waterside Apartments",
    city: "Northampton",
    area: "Waterside campus",
    type: "1-bed apartment",
    price: "£130",
    period: "/wk",
    rating: 4.6,
    reviews: 31,
    image: "/images/property-waterside-apartments.jpg",
    available: "Available Sep 30",
    beds: "1 bed",
    size: "42 m²",
  },
  {
    name: "King's Cross Hub",
    city: "London",
    area: "King's Cross",
    type: "Co-living suite",
    price: "£310",
    period: "/wk",
    rating: 4.9,
    reviews: 156,
    image: "/images/property-kings-cross-hub.jpg",
    available: "Available Oct 15",
    beds: "En-suite",
    size: "22 m²",
  },
];

export function FeaturedProperties() {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : 380;
    rail.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <section className="bg-bg py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-10 lg:mb-14">
          <div className="max-w-2xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand mb-3">
              Featured properties
            </p>
            <h2 className="headline text-ink text-[34px] sm:text-[42px] lg:text-[52px]">
              Hand-picked for the term ahead.
            </h2>
            <p className="mt-4 text-[16px] lg:text-[17px] text-ink-soft leading-relaxed">
              All properties listed below are available for the upcoming term and have
              passed our 32-point verification check.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="h-10 w-10 rounded-full border border-line bg-bg-elevated flex items-center justify-center hover:border-brand hover:text-brand transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="h-10 w-10 rounded-full border border-line bg-bg-elevated flex items-center justify-center hover:border-brand hover:text-brand transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll rail — full bleed */}
      <div
        ref={railRef}
        className="scroll-rail scroll-rail-snap flex gap-5 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4"
        style={{ scrollPaddingLeft: "max(1.5rem, calc((100vw - 80rem) / 2))" }}
      >
        {/* Left spacer to align cards to container on wide screens */}
        <div className="hidden lg:block" style={{ flex: "0 0 max(0px, calc((100vw - 80rem) / 2 - 1.5rem))" }} />
        {properties.map((p) => (
          <article
            key={p.name}
            data-card
            className="group relative flex-shrink-0 w-[320px] sm:w-[360px] bg-bg-elevated border border-line rounded-2xl overflow-hidden hover:border-brand/30 hover:shadow-[0_12px_40px_-16px_rgba(46,49,148,0.25)] transition-all"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
              {/* Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                {p.featured ? (
                  <Badge className="bg-accent text-accent-foreground border-0 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider">
                    Featured
                  </Badge>
                ) : (
                  <span />
                )}
                <div className="flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-2 py-1 text-[12px] font-semibold text-ink">
                  <Star className="h-3 w-3 fill-accent text-accent" />
                  {p.rating}
                </div>
              </div>
            </div>

            <div className="p-5">
              {/* Meta */}
              <div className="flex items-center gap-1.5 text-[12px] text-ink-muted mb-2">
                <MapPin className="h-3 w-3 text-brand" />
                <span>{p.area}, {p.city}</span>
              </div>
              <h3 className="font-display font-semibold text-[18px] text-ink leading-snug">
                {p.name}
              </h3>
              <p className="mt-1 text-[13.5px] text-ink-soft">{p.type}</p>

              {/* Specs */}
              <div className="mt-4 flex items-center gap-4 text-[12px] text-ink-muted">
                <span className="inline-flex items-center gap-1.5">
                  <BedDouble className="h-3.5 w-3.5" />
                  {p.beds}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Maximize className="h-3.5 w-3.5" />
                  {p.size}
                </span>
                <span className="text-success font-medium">{p.available}</span>
              </div>

              {/* Price + CTA */}
              <div className="mt-5 pt-4 border-t border-line flex items-end justify-between">
                <div>
                  <p className="text-[12px] text-ink-muted leading-none">From</p>
                  <p className="mt-1 text-[20px] font-semibold text-ink leading-none">
                    {p.price}
                    <span className="text-[13px] font-normal text-ink-muted">{p.period}</span>
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-full bg-brand text-brand-foreground px-3.5 py-2 text-[12.5px] font-medium hover:bg-brand-soft transition-colors"
                >
                  View details
                </button>
              </div>
            </div>
          </article>
        ))}
        {/* Right spacer */}
        <div className="hidden lg:block" style={{ flex: "0 0 max(0px, calc((100vw - 80rem) / 2 - 1.5rem))" }} />
      </div>
    </section>
  );
}
