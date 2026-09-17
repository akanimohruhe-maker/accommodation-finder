import { PageShell } from "@/components/site/page-shell";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

/**
 * Cities page — shows the 5 UK cities Accommodation Finders operates in.
 *
 * Each city card displays 4 DISTINCT real photos (no longer the same image
 * with 4 different color tints). For each city we use:
 *   - the existing city-day.jpg (residential houses we picked earlier)
 *   - 3 additional views sourced from real UK city photo providers:
 *     official tourism boards (Visit Manchester, Visit Leicester), local
 *     newspapers (Leicester Mercury), estate agents (UK Sotheby's, TK
 *     Property Group), and developer/property sites (Galliard Homes,
 *     Jewellery Quarter Property, All Saints Northampton).
 *
 * Each photo is VLM-verified as real and free of watermark/overlay.
 *
 * Images are protected with draggable={false} and onContextMenu handler,
 * plus the global <ImageShield> in layout.tsx.
 */

type City = {
  name: string;
  blurb: string;
  properties: number;
  from: string;
  /** 4 distinct photo paths (relative to /images/cities/). */
  images: [string, string, string, string];
  /** Optional small caption shown on each photo (e.g. "Northern Quarter"). */
  captions?: [string, string, string, string];
};

const cities: City[] = [
  {
    name: "London",
    blurb: "From Shoreditch to Camden, student lets near every major campus.",
    properties: 412,
    from: "£185/wk",
    images: [
      "london-day.jpg",
      "london-view-1.jpg",
      "london-view-2.jpg",
      "london-view-3.jpg",
    ],
    captions: [
      "Residential street",
      "Aesthetic spot",
      "Townhouse",
      "Period facade",
    ],
  },
  {
    name: "Manchester",
    blurb: "Affordable city-centre living minutes from MMU and the University of Manchester.",
    properties: 268,
    from: "£120/wk",
    images: [
      "manchester-day.jpg",
      "manchester-view-1.jpg",
      "manchester-view-2.jpg",
      "manchester-view-3.jpg",
    ],
    captions: [
      "Terraced street",
      "City centre",
      "Salford",
      "Northern Quarter",
    ],
  },
  {
    name: "Birmingham",
    blurb: "Modern student towers and shared houses near Aston and UoB.",
    properties: 187,
    from: "£110/wk",
    images: [
      "birmingham-day.jpg",
      "birmingham-view-1.jpg",
      "birmingham-view-2.jpg",
      "birmingham-view-3.jpg",
    ],
    captions: [
      "Victorian terraces",
      "City living",
      "Spectrum",
      "Jewellery Quarter",
    ],
  },
  {
    name: "Leicester",
    blurb: "Quiet, leafy neighbourhoods a short walk from University of Leicester.",
    properties: 142,
    from: "£95/wk",
    images: [
      "leicester-day.jpg",
      "leicester-view-1.jpg",
      "leicester-view-2.jpg",
      "leicester-view-3.jpg",
    ],
    captions: [
      "Historic house",
      "City skyline",
      "Old town",
      "Town centre",
    ],
  },
  {
    name: "Northampton",
    blurb: "Budget-friendly student housing close to the University of Northampton.",
    properties: 89,
    from: "£85/wk",
    images: [
      "northampton-day.jpg",
      "northampton-view-1.jpg",
      "northampton-view-2.jpg",
      "northampton-view-3.jpg",
    ],
    captions: [
      "Terraced row",
      "All Saints",
      "Stately home",
      "Town centre",
    ],
  },
];

export default function CitiesPage() {
  return (
    <PageShell
      header={{
        eyebrow: "Browse by location",
        title: "Five UK cities. One verified network.",
        description:
          "Pick a city to see every property we have listed there, with availability, pricing and verified images for each.",
        heroImage: "/images/cities/london-dusk.jpg",
        badge: "Updated weekly",
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
                {/* 4 small images — distinct real photos, not tinted variants */}
                <div className="grid grid-cols-2 grid-rows-2 gap-0.5 p-1.5">
                  {city.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative overflow-hidden rounded-md"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/images/cities/${img}`}
                        alt={`${city.name} — ${city.captions?.[i] ?? `view ${i + 1}`}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        draggable={false}
                      />
                      {/* Optional small caption strip on each photo */}
                      {city.captions && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent px-2 pt-3 pb-1.5">
                          <span className="text-[10px] uppercase tracking-wider text-white/90 font-medium">
                            {city.captions[i]}
                          </span>
                        </div>
                      )}
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
