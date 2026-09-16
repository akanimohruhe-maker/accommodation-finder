import { PageShell } from "@/components/site/page-shell";
import { AlertCircle, RotateCcw, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function BookingCancellationPage() {
  return (
    <PageShell
      header={{
        eyebrow: "Booking cancellation",
        title: "Cancel your booking.",
        description: "We're sorry this didn't work out. Cancel below and we'll release the booking immediately. Refund policy applies based on your cancellation timing.",
      }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Refund policy */}
        <div className="bg-bg-elevated border border-line rounded-2xl p-6 lg:p-8 mb-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-warning/10 border border-warning/15 text-warning shrink-0">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-[20px] text-ink">
                Refund policy
              </h2>
              <p className="text-[14px] text-ink-soft mt-1">
                Refund amount depends on how close you are to the move-in date.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-4 items-start">
              <span className="inline-flex items-center justify-center rounded-full bg-success/10 text-success text-[12px] font-bold px-2.5 py-1 h-fit">
                100%
              </span>
              <p className="text-[14px] text-ink-soft">
                Cancel <strong className="text-ink">14 days or more</strong> before move-in.
                Full refund of deposit and any paid rent, no fees.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-4 items-start">
              <span className="inline-flex items-center justify-center rounded-full bg-warning/10 text-warning text-[12px] font-bold px-2.5 py-1 h-fit">
                50%
              </span>
              <p className="text-[14px] text-ink-soft">
                Cancel <strong className="text-ink">between 7 and 13 days</strong> before move-in.
                Half of deposit refunded. Rent fully refunded.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-4 items-start">
              <span className="inline-flex items-center justify-center rounded-full bg-danger/10 text-danger text-[12px] font-bold px-2.5 py-1 h-fit">
                0%
              </span>
              <p className="text-[14px] text-ink-soft">
                Cancel <strong className="text-ink">less than 7 days</strong> before move-in.
                Deposit forfeited. Rent refunded minus £50 admin fee.
              </p>
            </div>
          </div>
        </div>

        {/* Cancellation form */}
        <form className="bg-bg-elevated border border-line rounded-2xl p-6 lg:p-8 mb-8">
          <h3 className="font-display font-semibold text-[18px] text-ink mb-4">
            Tell us why you're cancelling
          </h3>
          <p className="text-[14px] text-ink-soft mb-5">
            This helps us improve. We won't share your reason with the landlord.
          </p>
          <div className="space-y-3 mb-6">
            {[
              "Found a different property",
              "Change of plans (uni, dates, city)",
              "Visa or funding fell through",
              "Issues with the property",
              "Other (please specify below)",
            ].map((reason) => (
              <label key={reason} className="flex items-start gap-2.5 cursor-pointer">
                <input type="radio" name="reason" className="mt-1 h-4 w-4 text-brand" />
                <span className="text-[14px] text-ink-soft">{reason}</span>
              </label>
            ))}
          </div>

          <label className="block">
            <span className="text-[12px] font-medium uppercase tracking-wider text-ink-muted block mb-1.5">
              Additional details (optional)
            </span>
            <textarea
              rows={4}
              placeholder="Tell us more so we can help..."
              className="w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-[14px] text-ink focus:outline-none focus:border-brand"
            />
          </label>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/booking-confirmation"
              className="flex-1 rounded-full border border-line bg-bg-elevated text-ink-soft px-6 py-3 text-[14px] font-medium hover:border-brand/30 hover:text-ink transition-colors text-center"
            >
              Keep my booking
            </Link>
            <button
              type="submit"
              className="flex-1 rounded-full bg-danger text-white px-6 py-3 text-[14px] font-semibold hover:bg-danger/90 transition-colors"
            >
              Cancel booking &amp; request refund
            </button>
          </div>
        </form>

        {/* Need help */}
        <div className="bg-brand/4 border border-brand/15 rounded-2xl p-6 lg:p-8">
          <h3 className="font-display font-semibold text-[16px] text-ink mb-3">
            Need to talk to someone first?
          </h3>
          <p className="text-[14px] text-ink-soft mb-4">
            If you're on the fence, our team can help you find an alternative property
            or adjust your booking dates before you cancel.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:hello@accommodationfinders.co.uk"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-bg-elevated border border-line text-ink-soft px-4 py-2 text-[13px] font-medium hover:border-brand/30 hover:text-ink transition-colors"
            >
              <Mail className="h-3.5 w-3.5" /> Email support
            </a>
            <a
              href="tel:+442012345678"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand text-brand-foreground px-4 py-2 text-[13px] font-medium hover:bg-brand-soft transition-colors"
            >
              <Phone className="h-3.5 w-3.5" /> Call now
            </a>
          </div>
        </div>

        <p className="mt-6 text-[12px] text-ink-muted flex items-center gap-1.5">
          <RotateCcw className="h-3 w-3" />
          Once submitted, cancellation is irreversible. Refunds are processed within 5 business days.
        </p>
      </div>
    </PageShell>
  );
}
