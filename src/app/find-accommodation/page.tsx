import { PageShell } from "@/components/site/page-shell";
import { Search, MapPin, Calendar, Users, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

const popularAreas = [
  { city: "London",     area: "Canary Wharf", count: 48, from: "£285/wk" },
  { city: "London",     area: "Shoreditch",   count: 62, from: "£240/wk" },
  { city: "Manchester", area: "Northern Quarter", count: 35, from: "£180/wk" },
  { city: "Birmingham", area: "Aston",        count: 28, from: "£150/wk" },
  { city: "Leicester",  area: "City Centre",  count: 22, from: "£95/wk" },
  { city: "Northampton",area: "Waterside",    count: 14, from: "£85/wk" },
];

const propertyTypes = [
  { type: "En-suite studio", count: 412, icon: "□" },
  { type: "1-bed apartment", count: 268, icon: "▢" },
  { type: "2-bed apartment", count: 187, icon: "▢▢" },
  { type: "Shared house",   count: 142, icon: "▦" },
  { type: "Co-living suite",count: 89,  icon: "▦▦" },
];

export default function FindAccommodationPage() {
  return (
    <PageShell
      header={{
        eyebrow: "Find your home",
        title: "Search 1,240+ verified properties.",
        description: "Filter by city, budget, move-in date and amenities. Every listing is inspected by our team before going live.",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Search panel */}
        <form className="bg-bg-elevated border border-line rounded-2xl p-6 lg:p-8 mb-12 shadow-[0_12px_40px_-16px_rgba(46,49,148,0.18)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <label className="md:col-span-3 block">
              <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-muted mb-1.5">
                <MapPin className="h-3 w-3 text-brand" /> City
              </span>
              <select className="w-full h-11 rounded-lg border border-line bg-bg px-3 text-[14px] text-ink focus:outline-none focus:border-brand">
                <option>London</option>
                <option>Manchester</option>
                <option>Birmingham</option>
                <option>Leicester</option>
                <option>Northampton</option>
              </select>
            </label>
            <label className="md:col-span-3 block">
              <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-muted mb-1.5">
                <Calendar className="h-3 w-3 text-brand" /> Move in
              </span>
              <input type="date" className="w-full h-11 rounded-lg border border-line bg-bg px-3 text-[14px] text-ink focus:outline-none focus:border-brand" />
            </label>
            <label className="md:col-span-2 block">
              <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-muted mb-1.5">
                <Users className="h-3 w-3 text-brand" /> Guests
              </span>
              <select className="w-full h-11 rounded-lg border border-line bg-bg px-3 text-[14px] text-ink focus:outline-none focus:border-brand">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>
            </label>
            <label className="md:col-span-2 block">
              <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-muted mb-1.5">
                Max budget
              </span>
              <select className="w-full h-11 rounded-lg border border-line bg-bg px-3 text-[14px] text-ink focus:outline-none focus:border-brand">
                <option>Any</option>
                <option>£100/wk</option>
                <option>£150/wk</option>
                <option>£200/wk</option>
                <option>£300/wk</option>
              </select>
            </label>
            <div className="md:col-span-2 flex items-end">
              <Link
                href="/search-results"
                className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-lg bg-brand text-brand-foreground text-[14px] font-semibold hover:bg-brand-soft transition-colors"
              >
                <Search className="h-4 w-4" />
                Search
              </Link>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-line">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-soft hover:text-brand transition-colors"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              More filters
            </button>
            <span className="text-[12px] text-ink-muted">1,240 verified properties available</span>
          </div>
        </form>

        {/* Popular areas */}
        <div className="mb-16">
          <h2 className="headline text-ink text-[28px] lg:text-[36px] mb-2">Popular areas</h2>
          <p className="text-[15px] text-ink-soft mb-6">Most-searched neighbourhoods this month.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularAreas.map((a) => (
              <Link
                key={`${a.city}-${a.area}`}
                href="/search-results"
                className="group flex items-center justify-between bg-bg-elevated border border-line rounded-xl p-4 hover:border-brand/30 transition-colors"
              >
                <div>
                  <p className="font-display font-semibold text-[16px] text-ink">{a.area}</p>
                  <p className="text-[13px] text-ink-soft">{a.city} · {a.count} listings</p>
                </div>
                <span className="text-[13px] text-ink-muted">
                  From <span className="text-ink font-semibold">{a.from}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Property types */}
        <div>
          <h2 className="headline text-ink text-[28px] lg:text-[36px] mb-2">Browse by property type</h2>
          <p className="text-[15px] text-ink-soft mb-6">Find the right kind of space for your needs.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {propertyTypes.map((p) => (
              <Link
                key={p.type}
                href="/search-results"
                className="group bg-bg-elevated border border-line rounded-2xl p-5 hover:border-brand/30 hover:shadow-[0_8px_24px_-12px_rgba(46,49,148,0.2)] transition-all"
              >
                <div className="text-[28px] text-brand/40 font-display leading-none mb-4">{p.icon}</div>
                <p className="font-display font-semibold text-[15px] text-ink">{p.type}</p>
                <p className="text-[13px] text-ink-soft mt-1">{p.count} available</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
