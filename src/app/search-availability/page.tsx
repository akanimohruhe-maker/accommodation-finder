import { PageShell } from "@/components/site/page-shell";
import { Calendar, MapPin, Users, Search } from "lucide-react";
import Link from "next/link";

export default function SearchAvailabilityPage() {
  return (
    <PageShell
      header={{
        eyebrow: "Search availability",
        title: "When are you moving in?",
        description: "Pick your dates and we'll show only verified properties that are actually available for that period. No bait listings, no out-of-date calendars.",
        heroImage: "/images/cities/birmingham-day.jpg",
        badge: "Step 2 of 4",
      }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Calendar pick */}
        <div className="bg-bg-elevated border border-line rounded-2xl p-6 lg:p-8 mb-8">
          <h2 className="font-display font-semibold text-[20px] text-ink mb-1">Pick a date range</h2>
          <p className="text-[14px] text-ink-soft mb-6">Tap or drag to select your move-in and move-out dates.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <label className="block">
              <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-muted mb-1.5">
                <Calendar className="h-3 w-3 text-brand" /> Move in
              </span>
              <input
                type="date"
                defaultValue="2026-09-28"
                className="w-full h-11 rounded-lg border border-line bg-bg px-3 text-[14px] text-ink focus:outline-none focus:border-brand"
              />
            </label>
            <label className="block">
              <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-muted mb-1.5">
                <Calendar className="h-3 w-3 text-brand" /> Move out
              </span>
              <input
                type="date"
                defaultValue="2027-07-05"
                className="w-full h-11 rounded-lg border border-line bg-bg px-3 text-[14px] text-ink focus:outline-none focus:border-brand"
              />
            </label>
          </div>

          <label className="block mb-6">
            <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-muted mb-1.5">
              <Users className="h-3 w-3 text-brand" /> Number of guests
            </span>
            <select className="w-full sm:w-auto h-11 rounded-lg border border-line bg-bg px-3 text-[14px] text-ink focus:outline-none focus:border-brand">
              <option>1 person</option>
              <option>2 people</option>
              <option>3 people</option>
              <option>4+ people</option>
            </select>
          </label>

          <label className="block mb-6">
            <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-muted mb-1.5">
              <MapPin className="h-3 w-3 text-brand" /> Preferred city
            </span>
            <select className="w-full sm:w-auto h-11 rounded-lg border border-line bg-bg px-3 text-[14px] text-ink focus:outline-none focus:border-brand">
              <option>Any city</option>
              <option>London</option>
              <option>Manchester</option>
              <option>Birmingham</option>
              <option>Leicester</option>
              <option>Northampton</option>
            </select>
          </label>

          <Link
            href="/search-results"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 rounded-full bg-brand text-brand-foreground px-6 text-[14px] font-semibold hover:bg-brand-soft transition-colors"
          >
            <Search className="h-4 w-4" />
            Check availability
          </Link>
        </div>

        {/* Quick date presets */}
        <h3 className="font-display font-semibold text-[18px] text-ink mb-4">Or pick a popular date range</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { label: "Autumn term 2026",      dates: "Sep 28, 2026 → Dec 12, 2026" },
            { label: "Spring term 2027",      dates: "Jan 10, 2027 → Mar 26, 2027" },
            { label: "Full academic year",    dates: "Sep 28, 2026 → Jul 5, 2027" },
            { label: "Summer short stay",      dates: "Jun 1, 2027 → Aug 31, 2027" },
            { label: "January intake 2027",    dates: "Jan 4, 2027 → Jul 5, 2027" },
            { label: "1 month emergency stay", dates: "Oct 1, 2026 → Oct 31, 2026" },
          ].map((preset) => (
            <Link
              key={preset.label}
              href="/search-results"
              className="group block bg-bg-elevated border border-line rounded-xl p-4 hover:border-brand/30 transition-colors"
            >
              <p className="font-display font-semibold text-[15px] text-ink">{preset.label}</p>
              <p className="text-[13px] text-ink-soft mt-1">{preset.dates}</p>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
