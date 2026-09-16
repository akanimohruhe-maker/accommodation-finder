/**
 * Bespoke brand-aligned SVG marks for the 5 trust signals.
 *
 * Each logo is a custom geometric icon aligned with the Accommodation Finders
 * brand DNA: navy + gold/amber, with the same visual weight as the house mark
 * in the main logo. No more generic Lucide icons.
 */

type IconProps = {
  className?: string;
};

/* 1. Verified Properties — shield with checkmark inside a stylised house */
function VerifiedMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="af-vp-grad" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
      </defs>
      <path
        d="M16 2 L28 6 V14 C28 21 23 26 16 30 C9 26 4 21 4 14 V6 Z"
        fill="url(#af-vp-grad)"
        stroke="#2E3194"
        strokeWidth="1.5"
      />
      <path
        d="M11 16 L15 20 L22 12"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* 2. Secure Booking — padlock with keyhole + sun rays */
function SecureMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="af-sb-grad" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
      </defs>
      {/* Padlock body */}
      <rect
        x="6"
        y="14"
        width="20"
        height="14"
        rx="2"
        fill="url(#af-sb-grad)"
        stroke="#2E3194"
        strokeWidth="1.5"
      />
      {/* Shackle */}
      <path
        d="M10 14 V10 C10 6.7 12.7 4 16 4 C19.3 4 22 6.7 22 10 V14"
        stroke="#2E3194"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Keyhole */}
      <circle cx="16" cy="20" r="2" fill="#2E3194" />
      <rect x="15" y="20" width="2" height="4" fill="#2E3194" />
    </svg>
  );
}

/* 3. Affordable Price — coin with house silhouette inside */
function AffordableMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="af-ap-grad" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="13" fill="url(#af-ap-grad)" stroke="#2E3194" strokeWidth="1.5" />
      {/* House silhouette */}
      <path
        d="M16 9 L23 14 V23 H9 V14 Z"
        fill="#2E3194"
      />
      <rect x="14" y="17" width="4" height="6" fill="url(#af-ap-grad)" />
    </svg>
  );
}

/* 4. Student-Friendly — graduation cap */
function StudentMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="af-st-grad" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
      </defs>
      {/* Cap top (mortarboard) */}
      <path
        d="M2 11 L16 5 L30 11 L16 17 Z"
        fill="url(#af-st-grad)"
        stroke="#2E3194"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Cap underside */}
      <path
        d="M7 13 V20 C7 22 11 24 16 24 C21 24 25 22 25 20 V13"
        stroke="#2E3194"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Tassel */}
      <line x1="30" y1="11" x2="30" y2="18" stroke="#2E3194" strokeWidth="1.5" />
      <circle cx="30" cy="20" r="1.5" fill="#2E3194" />
    </svg>
  );
}

/* 5. 24/7 Support — clock with chat bubble */
function SupportMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="af-sup-grad" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
      </defs>
      {/* Chat bubble */}
      <path
        d="M4 6 H28 V20 H17 L11 26 V20 H4 Z"
        fill="url(#af-sup-grad)"
        stroke="#2E3194"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Clock face inside bubble */}
      <circle cx="16" cy="13" r="4.5" fill="#FFFFFF" stroke="#2E3194" strokeWidth="1.2" />
      <path
        d="M16 13 V10 M16 13 L18 14"
        stroke="#2E3194"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const features = [
  {
    Icon: VerifiedMark,
    title: "Verified properties",
    desc: "100% of listings pass our 32-point verification check.",
  },
  {
    Icon: SecureMark,
    title: "Secure booking",
    desc: "Encrypted payments and lease signing. No wire fraud risk.",
  },
  {
    Icon: AffordableMark,
    title: "Affordable price",
    desc: "Direct-from-landlord rates. No hidden agency fees.",
  },
  {
    Icon: StudentMark,
    title: "Student-friendly",
    desc: "Locations vetted for proximity to UK university campuses.",
  },
  {
    Icon: SupportMark,
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
            is broken. Fake listings, hidden fees, agents who vanish after deposit. We
            fix all of it. Here's how.
          </p>
        </div>

        {/* Features row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
          {features.map(({ Icon, title, desc }) => (
            <div key={title} className="group">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/8 border border-brand/15 transition-colors group-hover:bg-brand/12">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display font-semibold text-[16px] text-ink leading-tight">
                {title}
              </h3>
              <p className="mt-1.5 text-[13.5px] text-ink-soft leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
