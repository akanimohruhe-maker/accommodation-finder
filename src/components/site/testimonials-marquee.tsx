import { Star, Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "I was moving from Lagos to Leicester and couldn’t view properties in person. Accommodation Finders did the viewings, negotiated my lease, and someone was at the door to hand me keys when I landed. I’d recommend them to any international student coming to the UK.",
    name: "Chidinma A.",
    role: "MSc Finance, University of Leicester",
  },
  {
    quote:
      "I’d been burned by an agent before — deposit gone, no reply to emails. With Accommodation Finders the deposit sat in a protected scheme and the team replied within hours every time I had a question. Different league.",
    name: "Mateusz K.",
    role: "BSc Computer Science, University of Manchester",
  },
  {
    quote:
      "Found a one-bed in Canary Wharf for less than I was paying for a shared house in Zone 4. The verified photos were exactly what I got on day one. No surprises, no hidden fees. That’s worth a lot.",
    name: "Priya R.",
    role: "LLM International Law, UCL",
  },
  {
    quote:
      "My lease had a clause I didn’t understand. Their legal team explained it in plain English, got it removed, and the landlord signed the revised version the next day. I never felt like just another transaction.",
    name: "Tobi O.",
    role: "MEng Aerospace, University of Birmingham",
  },
  {
    quote:
      "Booked a short stay in Northampton while I sorted permanent housing. Two days after I moved in the boiler broke. They had an engineer out within four hours. I’ve rented in three countries — that level of support is unheard of.",
    name: "Aisha M.",
    role: "MSc Physiotherapy, University of Northampton",
  },
];

function Card({ t }: { t: Testimonial }) {
  return (
    <article
      className="flex-shrink-0 w-[340px] sm:w-[420px] lg:w-[480px] mr-6 bg-bg-elevated border border-line rounded-2xl p-7 lg:p-8"
    >
      <div className="flex items-start justify-between mb-4">
        <Quote className="h-7 w-7 text-accent shrink-0" />
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
          ))}
        </div>
      </div>
      <blockquote className="text-[14.5px] lg:text-[15px] text-ink leading-relaxed">
        {t.quote}
      </blockquote>
      <div className="mt-5 pt-5 border-t border-line">
        <p className="font-display font-semibold text-[15px] text-ink">{t.name}</p>
        <p className="text-[12.5px] text-ink-soft mt-0.5">{t.role}</p>
      </div>
    </article>
  );
}

export function TestimonialsMarquee() {
  // Duplicate the array so the marquee loops seamlessly
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="bg-bg py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 lg:mb-14">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand mb-3">
          From students who landed well
        </p>
        <h2 className="headline text-ink text-[32px] sm:text-[40px] lg:text-[48px]">
          Five voices. Five cities. One verdict.
        </h2>
      </div>

      {/* Marquee track — scrolls LEFT */}
      <div className="marquee-container relative">
        <div className="marquee-track-left flex w-max">
          {loop.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
