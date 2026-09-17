import { PageShell } from "@/components/site/page-shell";
import { Check, Calendar, Users, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";

const included = [
  "Verified property inspection report",
  "Lease agreement reviewed by our legal team",
  "Rent protection for the first 30 days",
  "24/7 support throughout your tenancy",
  "Move-in assistance (keys handed in person)",
  "Deposit held in a UK government-approved scheme",
];

const steps = [
  { label: "Property selected", done: true },
  { label: "Booking inquiry sent", done: true },
  { label: "Lease reviewed", done: false, current: true },
  { label: "Deposit paid", done: false },
  { label: "Move-in confirmed", done: false },
];

export default function BookingConfirmationPage() {
  return (
    <PageShell
      header={{
        eyebrow: "Booking confirmation",
        title: "You're almost there, David.",
        description: "Skyline View Apartments, Canary Wharf, London. Move-in 28 September 2026. Review the lease and pay the deposit to lock in your booking.",
        heroImage: "/images/cities/london-day.jpg",
        badge: "Step 4 of 4",
      }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Booking summary card */}
        <div className="bg-bg-elevated border border-line rounded-2xl overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-[4/3] lg:aspect-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/property-skyline-view-apartments.jpg"
                alt="Skyline View Apartments"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6 lg:p-8 flex flex-col">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 text-success px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider self-start mb-3">
                <Check className="h-3 w-3" /> Available
              </span>
              <h2 className="font-display font-semibold text-[24px] text-ink">
                Skyline View Apartments
              </h2>
              <p className="text-[14px] text-ink-soft mt-1">
                En-suite studio · Canary Wharf, London
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 text-[14px]">
                <dt className="text-ink-muted">Move-in</dt>
                <dd className="text-ink font-medium flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-brand" /> 28 Sep 2026
                </dd>
                <dt className="text-ink-muted">Guests</dt>
                <dd className="text-ink font-medium flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-brand" /> 1 person
                </dd>
                <dt className="text-ink-muted">Tenancy</dt>
                <dd className="text-ink font-medium">42 weeks (full academic year)</dd>
                <dt className="text-ink-muted">Rent</dt>
                <dd className="text-ink font-semibold">£285/wk</dd>
                <dt className="text-ink-muted">Deposit</dt>
                <dd className="text-ink font-semibold">£570 (2 weeks)</dd>
                <dt className="text-ink-muted">Total due today</dt>
                <dd className="text-ink font-bold text-[18px]">£855</dd>
              </dl>
            </div>
          </div>
        </div>

        {/* Progress steps */}
        <div className="bg-bg-elevated border border-line rounded-2xl p-6 lg:p-8 mb-8">
          <h3 className="font-display font-semibold text-[18px] text-ink mb-6">
            Where you are in the booking flow
          </h3>
          <ol className="flex flex-col sm:flex-row sm:items-stretch gap-4">
            {steps.map((s, i) => (
              <li
                key={s.label}
                className={`flex-1 flex items-start gap-3 p-3 rounded-lg border ${
                  s.current ? "border-brand bg-brand/4" : "border-line"
                }`}
              >
                <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-bold ${
                  s.done ? "bg-success text-white" :
                  s.current ? "bg-brand text-white" :
                  "bg-line text-ink-muted"
                }`}>
                  {s.done ? <Check className="h-3 w-3" /> : i + 1}
                </span>
                <span className={`text-[13.5px] font-medium ${s.done ? "text-ink-soft" : "text-ink"}`}>
                  {s.label}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* What's included */}
        <div className="bg-bg-elevated border border-line rounded-2xl p-6 lg:p-8 mb-8">
          <h3 className="font-display font-semibold text-[18px] text-ink mb-4">
            What's included with your booking
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <span className="text-[14px] text-ink-soft">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Final actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/booking-cancellation"
            className="rounded-full border border-line bg-bg-elevated text-ink-soft px-6 py-3 text-[14px] font-medium hover:border-brand/30 hover:text-ink transition-colors text-center"
          >
            Cancel booking
          </Link>
          <button
            type="button"
            className="rounded-full bg-brand text-brand-foreground px-6 py-3 text-[14px] font-semibold hover:bg-brand-soft transition-colors inline-flex items-center justify-center gap-2"
          >
            <ShieldCheck className="h-4 w-4" />
            Pay deposit &amp; confirm booking
          </button>
        </div>

        {/* Fine print */}
        <p className="mt-6 text-[12px] text-ink-muted flex items-center gap-1.5">
          <Clock className="h-3 w-3" />
          This booking is held for 24 hours. Pay the deposit before 28 Sep 2026, 11:59 PM UK time to confirm.
        </p>
      </div>
    </PageShell>
  );
}
