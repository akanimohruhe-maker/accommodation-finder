import { PageShell } from "@/components/site/page-shell";

/**
 * Terms & Conditions — Accommodation Finders
 *
 * Substantive terms covering: who we are and what service we provide,
 * eligibility, account registration and sign-in methods (Zoho, email,
 * username+password), booking process, lease agreement, deposits and
 * payments, cancellations and refunds, landlord obligations, user
 * responsibilities (no fake listings, no abuse), intellectual property
 * (logo and content), disclaimer of warranties, limitation of liability,
 * indemnity, governing law (England & Wales), changes, and contact.
 *
 * Sections are numbered (1–13) so the user can cite them.
 */

const sections = [
  {
    n: "01",
    title: "About these terms",
    body: [
      "These terms and conditions (\"the Terms\") govern your use of the Accommodation Finders website at accommodation-finder-two.vercel.app and the related booking, search, and support services we provide (\"the Service\"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, please do not use the Service.",
      "We may update these Terms from time to time. When we do, we will change the 'last updated' date at the top of the page. If a change is material we will notify you by email and by a banner on the website. We encourage you to review this page periodically.",
    ],
  },
  {
    n: "02",
    title: "Who we are and what service we provide",
    body: [
      "Accommodation Finders Ltd (\"we\", \"us\", \"our\") is a private limited company registered in England and Wales. Our registered office is at 1 Canada Square, Canary Wharf, London E14 5AB, United Kingdom. We provide an online platform that connects verified landlords and their letting agents with students and other prospective tenants who are looking for short-term and academic-year housing in London, Manchester, Birmingham, Leicester, and Northampton.",
      "We are not a party to the tenancy agreement between you and the landlord. We act as an introducer and a booking facilitator. We do not own, manage, or control any of the properties listed on our platform. Each landlord is solely responsible for the condition of their property and for honouring the lease they sign with you. Our role is to verify the property, facilitate the booking, hold the deposit in a UK government-approved scheme, and provide move-in and tenancy support.",
    ],
  },
  {
    n: "03",
    title: "Who can use the Service",
    body: [
      "You may use the Service only if you are at least sixteen (16) years old and you are legally capable of entering into a binding contract in the United Kingdom. If you are sixteen or seventeen, we may require a guarantor to co-sign your booking. By using the Service, you represent and warrant that you meet these eligibility requirements and that you will provide accurate and complete information when creating an account and making a booking.",
      "You may not use the Service if you are listed on any UK or international sanctions list, if you have been previously removed from the Service for fraud or abuse, or if you are acting on behalf of a competitor for the purpose of scraping our listings or recruiting our landlords.",
    ],
  },
  {
    n: "04",
    title: "Account registration and sign-in",
    body: [
      "To make a booking you must register an account. You can register and sign in using any of the following methods: (a) Zoho — sign in with your existing Zoho account; we receive your email address and a secure token from Zoho, but we never see or store your Zoho password; (b) email — sign in using your email address and a one-time link sent to your inbox; (c) username and password — choose a username and a strong password (we hash it with bcrypt, we never store it in plain text).",
      "You are responsible for keeping your sign-in credentials confidential. You are responsible for all activity that occurs under your account. If you suspect that your account has been compromised, you must change your password immediately and contact us at security@accommodationfinders.co.uk. We may suspend your account if we have reasonable grounds to believe it has been compromised.",
      "You agree to provide accurate and complete information when creating an account, and to keep that information up to date. We may refuse to create an account or may close an existing account if the information provided is materially inaccurate, or if you have previously breached these Terms.",
    ],
  },
  {
    n: "05",
    title: "The booking process",
    body: [
      "Booking a property on our Service involves four steps: (1) search — you use our filters (city, budget, move-in date, amenities) to find a property that meets your needs; (2) enquiry — you submit a booking enquiry; we forward it to the landlord (or their letting agent) who has forty-eight (48) hours to accept or decline; (3) lease review — once the landlord accepts, we generate a lease agreement based on the terms of the listing; you have seventy-two (72) hours to review and sign it; (4) deposit and move-in — you pay the deposit through our secure payment processor, Stripe; we hold it in a UK government-approved deposit protection scheme; on the move-in date the landlord hands over the keys in person.",
      "A booking enquiry is not a binding booking. A booking becomes binding only when (a) the landlord accepts your enquiry, (b) you sign the lease agreement, and (c) the deposit has been successfully charged. Until all three steps are complete, the property may remain visible to other users and another user may book it before you.",
    ],
  },
  {
    n: "06",
    title: "Lease agreement, deposits, and payments",
    body: [
      "The lease agreement is between you and the landlord. It is governed by the Housing Act 1988 (as amended) and any other applicable UK tenancy law. We provide a standard template that the landlord may modify to reflect the specific terms of the property (rent amount, payment schedule, included bills, house rules, break clauses). You should read the lease carefully before signing. We do not provide legal advice and we recommend that you consult a solicitor or your university housing office if any clause is unclear.",
      "The deposit is held by us in a UK government-approved deposit protection scheme (DPS, mydeposits, or TDS, depending on the property's location). The deposit cannot exceed five (5) weeks' rent under the Tenant Fees Act 2019. The deposit is returned to you at the end of the tenancy, minus any agreed deductions for damage or unpaid rent. Any dispute over the deposit is resolved through the free dispute-resolution service offered by the deposit protection scheme.",
      "Rent is paid monthly in advance by direct debit or by card via Stripe. We add no markup to the rent. The price you see on the listing is the price you pay. If you fail to pay rent on time, the landlord may charge a late-payment fee in accordance with the Tenant Fees Act 2019.",
    ],
  },
  {
    n: "07",
    title: "Cancellations and refunds",
    body: [
      "If you cancel a booking before the landlord has accepted your enquiry, no charge is applied. If you cancel after the landlord has accepted but before you have signed the lease, the deposit (if already paid) is refunded in full. If you cancel after signing the lease but before the move-in date, the refund depends on how close you are to the move-in date: more than 30 days before move-in — full refund; 14-30 days before move-in — 50% refund; less than 14 days before move-in — no refund. These are also detailed on the Booking Cancellation page.",
      "If you wish to end the tenancy early after moving in, you must give the landlord the notice period specified in the lease (typically 2 months). You remain liable for the rent until the end of the notice period or until a new tenant moves in, whichever is sooner. The landlord may charge a re-letting fee to cover the cost of finding a new tenant, but only if the lease specifically allows it and the amount is reasonable.",
    ],
  },
  {
    n: "08",
    title: "Landlord and listing obligations",
    body: [
      "Landlords must own or have the legal right to let the property, and they must have all required safety certificates in place before listing (gas safety, electrical safety, energy performance certificate, HMO licence where applicable). Landlords must accurately describe the property, including any known defects. Landlords must respond to booking enquiries within forty-eight (48) hours and honour the lease agreement they sign.",
      "We inspect every property before listing it. We re-inspect at least once every twelve (12) months. If we receive credible reports that a property is unsafe, materially mis-described, or that the landlord is breaching the lease, we may suspend or remove the listing and, where appropriate, refund the affected tenants.",
    ],
  },
  {
    n: "09",
    title: "Your responsibilities",
    body: [
      "You agree to: (a) provide accurate and complete information when creating an account and making a booking; (b) keep your sign-in credentials confidential; (c) use the Service only for lawful purposes and not for scraping, spamming, or sending unsolicited commercial messages; (d) not post fake reviews, not create fake listings, not impersonate another person; (e) not attempt to circumvent our payment system by paying the landlord directly before a lease is signed; (f) respect the property you book and the house rules in the lease; (g) comply with the lease agreement you sign.",
      "We may suspend or terminate your account if you breach any of these responsibilities. We may also report serious breaches to the police, to your university, and to UK visa and immigration authorities where appropriate.",
    ],
  },
  {
    n: "10",
    title: "Intellectual property",
    body: [
      "The Accommodation Finders name, logo, brand colours, and visual design are owned by Accommodation Finders Ltd. You may not use them without our prior written consent, except to share a link to our website on social media or in email. The property listings, photographs, and reviews on our site are owned by the relevant landlords and reviewers; we display them under licence. You may not copy, scrape, or republish them without permission.",
      "Any feedback, suggestions, or ideas you send to us about the Service may be used by us without restriction or compensation. We respect your intellectual property rights and we ask you to respect ours.",
    ],
  },
  {
    n: "11",
    title: "Disclaimer of warranties and limitation of liability",
    body: [
      "We provide the Service on an 'as is' and 'as available' basis. We do not warrant that the Service will be uninterrupted, error-free, or that every listing will be available at the time you try to book it. We do not warrant that any property will meet your expectations or that any landlord will honour the lease they sign. Where the law allows, we exclude all implied warranties.",
      "To the maximum extent permitted by law, our total liability to you for any claim arising out of or relating to these Terms or the Service is limited to the greater of (a) the amount of fees we have earned from your booking, or (b) one hundred pounds (£100). We are not liable for any indirect, incidental, consequential, or loss-of-profit damages. This limitation does not apply to liability for death or personal injury caused by our negligence, or for any other liability that cannot be excluded under English law.",
    ],
  },
  {
    n: "12",
    title: "Indemnity and governing law",
    body: [
      "You agree to indemnify and hold us, our directors, officers, employees, and agents harmless from any claim, demand, or loss (including reasonable legal fees) arising out of your breach of these Terms, your misuse of the Service, or your violation of any law or third-party right.",
      "These Terms are governed by the laws of England and Wales. Any dispute arising out of or relating to these Terms or the Service will be subject to the exclusive jurisdiction of the courts of England and Wales, except that you may bring a small-claims case in your local county court where you live. Nothing in these Terms affects your statutory rights as a consumer under UK law; if you are a consumer, you may also use the European Online Dispute Resolution platform at ec.europa.eu/consumers/odr.",
    ],
  },
  {
    n: "13",
    title: "How to contact us",
    body: [
      "If you have any questions about these Terms, if you would like to report a violation, or if you would like to give us feedback, please contact us:",
    ],
    contact: [
      { label: "Email",    value: "hello@accommodationfinders.co.uk" },
      { label: "Phone",    value: "+44 (0) 20 1234 5678" },
      { label: "Post",     value: "Accommodation Finders Ltd, 1 Canada Square, Canary Wharf, London E14 5AB, United Kingdom" },
      { label: "Company", value: "Registered in England and Wales. Company number: 12345678." },
    ],
  },
];

export default function TermsConditionsPage() {
  return (
    <PageShell
      header={{
        eyebrow: "Legal",
        title: "Terms & Conditions",
        description: "The rules that govern your use of Accommodation Finders — your account, your booking, your deposit, and your responsibilities.",
        heroImage: "/images/cities/manchester-day.jpg",
        badge: "Last updated: September 2026",
      }}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Intro */}
        <div className="mb-12 lg:mb-16 max-w-2xl">
          <p className="text-[16px] lg:text-[18px] text-ink-soft leading-relaxed">
            These terms and conditions set out the rules that govern your use
            of the Accommodation Finders website and our booking, search,
            and support services. By creating an account, enquiring about a
            property, or signing a lease through us, you agree to these
            terms. Please read them carefully — they explain who is
            responsible for what, how deposits and refunds work, and how we
            handle disputes.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12 lg:space-y-16">
          {sections.map((s) => (
            <section key={s.n} id={`section-${s.n}`} className="scroll-mt-32">
              <div className="flex items-baseline gap-4 mb-5">
                <span className="font-display font-bold text-[40px] lg:text-[48px] text-brand/15 leading-none">
                  {s.n}
                </span>
                <h2 className="headline text-ink text-[26px] lg:text-[32px] leading-tight">
                  {s.title}
                </h2>
              </div>
              <div className="pl-0 lg:pl-16 space-y-4 max-w-2xl">
                {s.body.map((p, i) => (
                  <p key={i} className="text-[15px] lg:text-[16px] text-ink-soft leading-relaxed">
                    {p}
                  </p>
                ))}
                {s.contact && (
                  <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-4 border-t border-line">
                    {s.contact.map((c) => (
                      <div key={c.label} className="flex flex-col">
                        <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                          {c.label}
                        </dt>
                        <dd className="mt-0.5 text-[14px] text-ink leading-relaxed">
                          {c.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 lg:mt-20 pt-8 border-t border-line">
          <p className="text-[13px] text-ink-muted">
            These terms and conditions are governed by the laws of England
            and Wales. They are not legal advice. If you need legal advice
            about your tenancy or your consumer rights, please consult a
            qualified solicitor or your university housing office.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
