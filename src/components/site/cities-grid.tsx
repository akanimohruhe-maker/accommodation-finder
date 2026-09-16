import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type City = {
  name: string;
  blurb: string;
  properties: number;
  from: string;
  /** The "period of day" featured photo */
  period: "dawn" | "day" | "dusk" | "night";
};

const cities: City[] = [
  {
    name: "London",
    blurb: "From Shoreditch to Camden, student lets near every major campus.",
    properties: 412,
    from: "£185/wk",
    period: "dusk",
  },
  {
    name: "Manchester",
    blurb: "Affordable city-centre living minutes from MMU and the University of Manchester.",
    properties: 268,
    from: "£120/wk",
    period: "dawn",
  },
  {
    name: "Birmingham",
    blurb: "Modern student towers and shared houses near Aston and UoB.",
    properties: 187,
    from: "£110/wk",
    period: "day",
  },
  {
    name: "Leicester",
    blurb: "Quiet, leafy neighbourhoods a short walk from University of Leicester.",
    properties: 142,
    from: "£95/wk",
    period: "night",
  },
  {
    name: "Northampton",
    blurb: "Budget-friendly student housing close to the University of Northampton.",
    properties: 89,
    from: "£85/wk",
    period: "dusk",
  },
];

export function CitiesGrid() {
  return (
    <section id="cities" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between gap-6 mb-10 lg:mb-14">
          <div className="max-w-2xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand mb-3">
              Popular cities
            </p>
            <h2 className="headline text-ink text-[34px] sm:text-[42px] lg:text-[52px]">
              Find your home in five UK cities.
            </h2>
            <p className="mt-4 text-[16px] lg:text-[17px] text-ink-soft leading-relaxed">
              Every property is inspected by our team before listing. We only work with
              landlords who pass our background and compliance checks.
            </p>
          </div>
          <Link
            href="/cities"
            className="hidden md:inline-flex items-center gap-1.5 text-[14px] font-medium text-ink-soft hover:text-brand transition-colors whitespace-nowrap"
          >
            View all cities
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Featured city (London) — full-width hero card */}
        <Link
          href="/cities"
          className="group relative block w-full overflow-hidden rounded-3xl mb-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[380px] lg:min-h-[460px]">
            {/* Image */}
            <div className="relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/cities/london-${cities[0].period}.jpg`}
                alt={`${cities[0].name} at ${cities[0].period}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg-elevated/10 lg:to-bg-elevated" />
            </div>
            {/* Content */}
            <div className="bg-bg-elevated p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">
                    Featured
                  </span>
                  <span className="text-[13px] text-ink-muted">Most popular</span>
                </div>
                <h3 className="headline text-ink text-[36px] lg:text-[44px]">
                  {cities[0].name}
                </h3>
                <p className="mt-3 text-[15px] lg:text-[16px] text-ink-soft leading-relaxed max-w-md">
                  {cities[0].blurb}
                </p>
              </div>
              <div className="mt-8 flex items-end justify-between">
                <div>
                  <p className="text-[12px] uppercase tracking-wider text-ink-muted">
                    {cities[0].properties} verified properties
                  </p>
                  <p className="mt-1 text-[14px] text-ink-soft">
                    From <span className="text-ink font-semibold">{cities[0].from}</span>
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-brand text-brand-foreground px-4 py-2.5 text-[13px] font-medium hover:bg-brand-soft transition-colors">
                  Explore {cities[0].name}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Other 4 cities — 2×2 / 4-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cities.slice(1).map((city) => (
            <Link
              key={city.name}
              href="/cities"
              className="group relative overflow-hidden rounded-2xl bg-bg-elevated border border-line hover:border-brand/30 transition-colors"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/cities/${city.name.toLowerCase()}-${city.period}.jpg`}
                  alt={`${city.name} at ${city.period}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                  <span className="font-display font-semibold text-[22px]">{city.name}</span>
                  <span className="rounded-full bg-white/15 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium">
                    {city.properties} listings
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[13.5px] text-ink-soft leading-relaxed line-clamp-2">
                  {city.blurb}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[13px] text-ink-muted">
                    From <span className="text-ink font-semibold">{city.from}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-ink-muted group-hover:text-brand transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
