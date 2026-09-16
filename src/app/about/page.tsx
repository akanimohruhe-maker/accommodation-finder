import { PageShell } from "@/components/site/page-shell";
import { Logo } from "@/components/site/logo";

const values = [
  {
    title: "Verified first, listed second",
    body: "Every property is visited, photographed and compliance-checked by our team before it ever appears on the site. If we wouldn't live there, we won't list it.",
  },
  {
    title: "Transparent pricing",
    body: "You see the full cost up front. No agency fees, no surprise deposits, no lease clauses hidden in fine print. The price on the listing is the price you pay.",
  },
  {
    title: "End-to-end support",
    body: "From the moment you start searching to the day you move out, our team is reachable. Lease questions, deposit disputes, maintenance tickets. All of it.",
  },
  {
    title: "Built by people who lived it",
    body: "Accommodation Finders was started by international students who got burned by bad landlords and fake listings. We built the platform we wished existed.",
  },
];

const timeline = [
  { year: "2019", title: "Idea", body: "Two students in Leicester got scammed by an agent who vanished with their deposit. The idea was born." },
  { year: "2020", title: "First listings", body: "We hand-verified 30 properties across 2 cities. Every landlord interviewed in person." },
  { year: "2022", title: "Five cities", body: "Expanded to London, Manchester, Birmingham, Leicester, Northampton. 800+ properties." },
  { year: "2024", title: "12,000 students housed", body: "Word-of-mouth became our growth engine. Students started recommending us to siblings and friends." },
  { year: "2026", title: "Platform rebuild", body: "We're rebuilding on a modern stack to support faster search, real-time availability and better security for international students." },
];

export default function AboutPage() {
  return (
    <PageShell
      header={{
        eyebrow: "About us",
        title: "We started this because we got scammed.",
        description: "Accommodation Finders exists because the founders lost money to a fake agent. We built the platform we wished existed when we were students.",
      }}
    >
      {/* Mission statement */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
        <Logo variant="stacked" showTagline className="mx-auto mb-12" />
        <p className="text-[22px] lg:text-[28px] leading-[1.35] text-ink font-display font-medium tracking-tight">
          Our mission is simple. Better places. Brighter stays. We vet every property, negotiate every lease, and stand behind every booking. If a listing is on this site, you can trust it.
        </p>
      </div>

      {/* Values */}
      <div className="bg-bg-elevated border-y border-line py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 lg:mb-16">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand mb-3">
              What we stand for
            </p>
            <h2 className="headline text-ink text-[32px] sm:text-[40px] lg:text-[48px]">
              Four principles, no exceptions.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
            {values.map((v, i) => (
              <div key={v.title}>
                <p className="font-display font-bold text-[44px] text-brand/15 leading-none mb-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display font-semibold text-[20px] text-ink mb-2">
                  {v.title}
                </h3>
                <p className="text-[15px] text-ink-soft leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="max-w-2xl mb-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand mb-3">
            Our story
          </p>
          <h2 className="headline text-ink text-[32px] sm:text-[40px] lg:text-[48px]">
            From a scam in Leicester to a national network.
          </h2>
        </div>
        <ol className="relative border-l border-line pl-8 space-y-12">
          {timeline.map((t) => (
            <li key={t.year} className="relative">
              <span className="absolute -left-[41px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent ring-4 ring-bg" />
              <p className="font-display font-bold text-[14px] text-brand mb-1">{t.year}</p>
              <h3 className="font-display font-semibold text-[18px] text-ink mb-1.5">{t.title}</h3>
              <p className="text-[15px] text-ink-soft leading-relaxed">{t.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </PageShell>
  );
}
