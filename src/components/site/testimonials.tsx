import { Star } from "lucide-react";

export function Testimonials() {
  return (
    <section className="bg-bg py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-1 mb-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-5 w-5 fill-accent text-accent" />
            ))}
          </div>

          <blockquote className="headline text-ink text-[26px] sm:text-[34px] lg:text-[42px] leading-[1.15] tracking-tight">
            <span className="text-brand">&ldquo;</span>I was moving from Lagos to Leicester and
            couldn&rsquo;t view properties in person. Accommodation Finders did the viewings,
            negotiated my lease, and someone was at the door to hand me keys when I landed.
            I&rsquo;d recommend them to any international student coming to the UK.
            <span className="text-brand">&rdquo;</span>
          </blockquote>

          <div className="mt-8 flex items-center justify-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/avatar-chidinma.jpg"
              alt="Chidinma A."
              className="h-11 w-11 rounded-full object-cover border border-line"
            />
            <div className="text-left">
              <p className="font-semibold text-[14px] text-ink leading-tight">Chidinma A.</p>
              <p className="text-[13px] text-ink-soft">MSc Finance, University of Leicester</p>
            </div>
          </div>
        </div>

        {/* Mini stat strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-line">
          {[
            { stat: "12,000+", label: "Students housed" },
            { stat: "4.9/5", label: "Average rating" },
            { stat: "1,240+", label: "Verified properties" },
            { stat: "94%", label: "Would recommend" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display font-semibold text-[28px] lg:text-[34px] text-ink leading-none">{s.stat}</p>
              <p className="mt-2 text-[12px] uppercase tracking-wider text-ink-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
