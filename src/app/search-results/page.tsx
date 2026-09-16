import { PageShell } from "@/components/site/page-shell";
import { Star, MapPin, BedDouble, Maximize, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

type Result = {
  name: string;
  area: string;
  city: string;
  type: string;
  price: string;
  period: string;
  rating: number;
  reviews: number;
  available: string;
  beds: string;
  size: string;
  featured?: boolean;
};

const results: Result[] = [
  {
    name: "Skyline View Apartments",
    area: "Canary Wharf",
    city: "London",
    type: "En-suite studio",
    price: "£285",
    period: "/wk",
    rating: 4.9,
    reviews: 184,
    available: "Available Sep 28",
    beds: "Studio",
    size: "28 m²",
    featured: true,
  },
  {
    name: "The Northern Quarter Lofts",
    area: "Northern Quarter",
    city: "Manchester",
    type: "2-bed apartment",
    price: "£220",
    period: "/wk",
    rating: 4.8,
    reviews: 92,
    available: "Available Oct 4",
    beds: "2 beds",
    size: "62 m²",
  },
  {
    name: "Aston Square Residence",
    area: "Aston",
    city: "Birmingham",
    type: "En-suite studio",
    price: "£165",
    period: "/wk",
    rating: 4.7,
    reviews: 68,
    available: "Available Sep 22",
    beds: "Studio",
    size: "24 m²",
  },
  {
    name: "Victoria House",
    area: "City centre",
    city: "Leicester",
    type: "Shared house",
    price: "£115",
    period: "/wk",
    rating: 4.8,
    reviews: 47,
    available: "Available Oct 10",
    beds: "Single room",
    size: "16 m²",
  },
  {
    name: "Waterside Apartments",
    area: "Waterside campus",
    city: "Northampton",
    type: "1-bed apartment",
    price: "£130",
    period: "/wk",
    rating: 4.6,
    reviews: 31,
    available: "Available Sep 30",
    beds: "1 bed",
    size: "42 m²",
  },
  {
    name: "King's Cross Hub",
    area: "King's Cross",
    city: "London",
    type: "Co-living suite",
    price: "£310",
    period: "/wk",
    rating: 4.9,
    reviews: 156,
    available: "Available Oct 15",
    beds: "En-suite",
    size: "22 m²",
  },
];

export default function SearchResultsPage() {
  return (
    <PageShell
      header={{
        eyebrow: "Search results",
        title: "6 verified properties match your filters.",
        description: "Showing results for move-in 28 September 2026, 1 guest, across London, Manchester, Birmingham, Leicester, Northampton.",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-line">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-soft hover:text-brand transition-colors"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
          </button>
          <div className="flex items-center gap-4 text-[13px] text-ink-muted">
            <span>Sort by:</span>
            <select className="bg-transparent border-0 text-ink-soft font-medium focus:outline-none focus:ring-0 p-0 pr-6">
              <option>Recommended</option>
              <option>Price (low to high)</option>
              <option>Price (high to low)</option>
              <option>Highest rated</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((r) => (
            <article
              key={r.name}
              className="group bg-bg-elevated border border-line rounded-2xl overflow-hidden hover:border-brand/30 hover:shadow-[0_12px_40px_-16px_rgba(46,49,148,0.25)] transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/property-${r.name.toLowerCase().replace(/['\s]/g, "-")}.jpg`}
                  alt={r.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                  {r.featured ? (
                    <span className="rounded-full bg-accent text-accent-foreground px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider">
                      Featured
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-2 py-1 text-[12px] font-semibold text-ink">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    {r.rating}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-[12px] text-ink-muted mb-2">
                  <MapPin className="h-3 w-3 text-brand" />
                  <span>{r.area}, {r.city}</span>
                </div>
                <h3 className="font-display font-semibold text-[18px] text-ink leading-snug">
                  {r.name}
                </h3>
                <p className="mt-1 text-[13.5px] text-ink-soft">{r.type}</p>
                <div className="mt-4 flex items-center gap-4 text-[12px] text-ink-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <BedDouble className="h-3.5 w-3.5" />
                    {r.beds}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Maximize className="h-3.5 w-3.5" />
                    {r.size}
                  </span>
                  <span className="text-success font-medium">{r.available}</span>
                </div>
                <div className="mt-5 pt-4 border-t border-line flex items-end justify-between">
                  <div>
                    <p className="text-[12px] text-ink-muted leading-none">From</p>
                    <p className="mt-1 text-[20px] font-semibold text-ink leading-none">
                      {r.price}
                      <span className="text-[13px] font-normal text-ink-muted">{r.period}</span>
                    </p>
                  </div>
                  <Link
                    href="/booking-confirmation"
                    className="rounded-full bg-brand text-brand-foreground px-3.5 py-2 text-[12.5px] font-medium hover:bg-brand-soft transition-colors"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
