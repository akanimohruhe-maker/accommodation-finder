import { PageShell } from "@/components/site/page-shell";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const cities = [
  {
    name: "London",
    blurb: "From Shoreditch to Camden, student lets near every major campus.",
    properties: 412,
    from: "£185/wk",
    periods: ["dawn", "day", "dusk", "night"] as const,
  },
  {
    name: "Manchester",
    blurb: "Affordable city-centre living minutes from MMU and the University of Manchester.",
    properties: 268,
    from: "£120/wk",
    periods: ["day", "dusk", "night", "dawn"] as const,
  },
  {
    name: "Birmingham",
    blurb: "Modern student towers and shared houses near Aston and UoB.",
    properties: 187,
    from: "£110/wk",
    periods: ["dusk", "night", "dawn", "day"] as const,
  },
  {
    name: "Leicester",
    blurb: "Quiet, leafy neighbourhoods a short walk from University of Leicester.",
    properties: 142,
    from: "£95/wk",
    periods: ["night", "dawn", "day", "dusk"] as const,
  },
  {
    name: "Northampton",
    blurb: "Budget-friendly student housing close to the University of Northampton.",
    properties: 89,
    from: "£85/wk",
    periods: ["dawn", "day", "dusk", "night"] as const,
  },
];

export default function CitiesPage() {
  return (
    <PageShell
      header={{
        eyebrow: "Browse by location",
        title: "Five UK cities. One verified network.",
        description: "Pick a city to see every property we have listed there, with availability, pricing and verified images for each.",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cities.map((city) => (
            <Link
              key={city.name}
              href="/find-accommodation"
              className="group relative overflow-hidden rounded-2xl bg-bg-elevated border border-line hover:border-brand/30 transition-colors"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[320px]">
                {/* 4 small images showing different periods of day */}
                <div className="grid grid-cols-2 grid-rows-2 gap-0.5 p-1.5">
                  {city.periods.map((p, i) => (
                    <div
                      key={i}
                      className="relative overflow-hidden rounded-md"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/images/cities/${city.name.toLowerCase()}-${p}.jpg`}
                        alt={`${city.name} at ${p}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
                {/* Content */}
                <div className="p-6 lg:p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-[12px] uppercase tracking-wider text-ink-muted mb-2">
                      {city.properties} verified properties
                    </p>
                    <h2 className="headline text-ink text-[28px] lg:text-[32px]">
                      {city.name}
                    </h2>
                    <p className="mt-2 text-[14px] text-ink-soft leading-relaxed">
                      {city.blurb}
                    </p>
                  </div>
                  <div className="mt-6 flex items-end justify-between">
                    <p className="text-[14px] text-ink-muted">
                      From <span className="text-ink font-semibold">{city.from}</span>
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand text-brand-foreground px-3.5 py-2 text-[12.5px] font-medium hover:bg-brand-soft transition-colors">
                      View listings
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
