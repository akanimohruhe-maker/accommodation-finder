import { ShieldCheck, Lock, Wallet, GraduationCap, Headphones } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified properties",
    desc: "100% of listings pass our 32-point verification check.",
  },
  {
    icon: Lock,
    title: "Secure booking",
    desc: "Encrypted payments and lease signing. No wire fraud risk.",
  },
  {
    icon: Wallet,
    title: "Affordable price",
    desc: "Direct-from-landlord rates. No hidden agency fees.",
  },
  {
    icon: GraduationCap,
    title: "Student-friendly",
    desc: "Locations vetted for proximity to UK university campuses.",
  },
  {
    icon: Headphones,
    title: "24/7 support",
    desc: "Our team is on hand throughout your tenancy. Always.",
  },
];

export function FeaturesBar() {
  return (
    <section id="about" className="bg-bg-elevated py-20 lg:py-24 border-y border-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand mb-3">
            Why students choose us
          </p>
          <h2 className="headline text-ink text-[32px] sm:text-[40px] lg:text-[48px]">
            Built for students, trusted by parents.
          </h2>
          <p className="mt-4 text-[16px] lg:text-[17px] text-ink-soft leading-relaxed">
            We started Accommodation Finders because finding student housing from abroad
            is broken. Fake listings, hidden fees, agents who vanish after deposit — we
            fix all of it. Here's how.
          </p>
        </div>

        {/* Features row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
          {features.map((f) => (
            <div key={f.title} className="group">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 border border-brand/15 text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display font-semibold text-[16px] text-ink leading-tight">
                {f.title}
              </h3>
              <p className="mt-1.5 text-[13.5px] text-ink-soft leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
