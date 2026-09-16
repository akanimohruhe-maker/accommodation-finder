"use client";

const heroImage = "/images/hero-london-night.jpg";

/** Split a string into letter spans for staggered color-cycle animation. */
function AnimatedText({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          className="color-cycle"
          style={{ ["--i" as string]: i }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[640px] lg:min-h-[760px] flex items-end overflow-hidden">
      {/* Background image with navy gradient overlay */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImage}
          alt="London cityscape at night"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand/70 via-brand/40 to-brand/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40 pb-20 lg:pb-32">
        <div className="max-w-3xl fade-up">
          {/* Two-line headline, Amarante font, color-cycle animation.
              whitespace-nowrap prevents 'perfect' / 'Accommodation' from breaking. */}
          <h1 className="hero-headline text-white text-[44px] sm:text-[64px] lg:text-[88px] xl:text-[100px]">
            <span className="block whitespace-nowrap">
              <AnimatedText text="Find your perfect" />
            </span>
            <span className="block mt-2 lg:mt-4 whitespace-nowrap">
              <AnimatedText text="Accommodation" />
            </span>
            <span className="sr-only">Find your perfect Accommodation</span>
          </h1>

          {/* Subhead */}
          <p className="mt-8 lg:mt-10 max-w-xl text-[16px] sm:text-[18px] leading-relaxed text-white/85">
            Student housing, apartments, short stays and long stays across
            London, Manchester, Birmingham, Leicester and Northampton. Verified
            properties, secure bookings, 24/7 support.
          </p>
        </div>
      </div>
    </section>
  );
}
