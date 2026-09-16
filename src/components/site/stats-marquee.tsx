type Stat = {
  value: string;
  label: string;
};

const stats: Stat[] = [
  { value: "12,000+",   label: "Students housed" },
  { value: "1,240+",    label: "Verified properties" },
  { value: "4.9/5",     label: "Average student rating" },
  { value: "94%",       label: "Would recommend" },
  { value: "5",         label: "UK cities covered" },
  { value: "32",        label: "Point verification check" },
  { value: "24/7",      label: "Support availability" },
  { value: "<1 day",    label: "Average reply time" },
  { value: "£0",        label: "Hidden agency fees" },
  { value: "100%",     label: "Deposit-protected bookings" },
];

function Card({ s }: { s: Stat }) {
  return (
    <div className="flex-shrink-0 mx-5 lg:mx-7 flex flex-col items-center text-center min-w-[160px] lg:min-w-[200px]">
      <span
        className="font-display font-semibold text-[36px] lg:text-[44px] leading-none"
        style={{
          background: "linear-gradient(135deg, #FFC107 0%, #FF8C00 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {s.value}
      </span>
      <span className="mt-2 text-[12px] uppercase tracking-wider text-ink-soft">
        {s.label}
      </span>
    </div>
  );
}

export function StatsMarquee() {
  // Duplicate the array for seamless loop
  const loop = [...stats, ...stats];

  return (
    <section className="bg-bg-elevated border-y border-line py-12 lg:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand text-center">
          By the numbers
        </p>
      </div>

      {/* Marquee track — scrolls RIGHT (opposite direction from testimonials) */}
      <div className="marquee-container relative">
        <div className="marquee-track-right flex w-max items-center">
          {loop.map((s, i) => (
            <Card key={i} s={s} />
          ))}
        </div>
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bg-elevated to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-bg-elevated to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
