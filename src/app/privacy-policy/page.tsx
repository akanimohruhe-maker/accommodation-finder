import { PageShell } from "@/components/site/page-shell";

/**
 * Privacy Policy — Accommodation Finders
 *
 * Substantive legal-grade privacy policy covering: data we collect, how we
 * use it, lawful basis (UK GDPR), sharing with third parties (Zoho for
 * authentication, payment processors, etc.), cookies, retention, your rights
 * (access, rectification, erasure, portability, objection), international
 * transfers, children's privacy, security, changes, and contact.
 *
 * Sections are numbered (1–11) so the user can cite them. Content is
 * long-form (3-5 sentences per paragraph minimum) per the content depth
 * standards.
 */

const sections = [
  {
    n: "01",
    title: "Who we are",
    body: [
      "Accommodation Finders (\"we\", \"us\", \"our\") operates the accommodation-finder platform at accommodation-finder-two.vercel.app and the related student-housing services advertised there. We are a private limited company registered in England and Wales. We act as the data controller for the personal information you provide when you use our website, our search and booking tools, and our support channels.",
      "If you have any questions about how we handle your personal data, you can contact our Data Protection Officer at privacy@accommodationfinders.co.uk. We aim to respond to all privacy enquiries within thirty (30) days of receipt. In the sections below we explain exactly what we collect, why we collect it, who we share it with, how long we keep it, and the rights you have over it.",
    ],
  },
  {
    n: "02",
    title: "What personal information we collect",
    body: [
      "Account information: when you create an account, we collect your full name, email address, mobile phone number, date of birth, and a password (stored as a salted bcrypt hash, never in plain text). If you sign in using a third-party provider such as Zoho, we receive the email address, display name, and profile picture that the provider shares with us.",
      "Booking information: when you enquire about or book a property, we collect your student status (university name and course dates), guarantor details if applicable, intended move-in and move-out dates, payment method tokens (we never see or store full card numbers — our payment processor, Stripe, handles that), and any messages you send to the landlord or to our support team.",
      "Usage information: when you visit the site we automatically collect your IP address, browser type and version, device type, the pages you viewed, the time spent on each page, the search filters you applied, and the property listings you opened. We collect this through first-party cookies and server logs. See section 6 below for the cookie policy.",
      "Marketing information: if you subscribe to our newsletter, we collect the email address you used to subscribe and the campaigns you opened or clicked. You can unsubscribe at any time using the link in the footer of every email or by emailing privacy@accommodationfinders.co.uk.",
    ],
  },
  {
    n: "03",
    title: "How we use your personal information",
    body: [
      "We use your personal information for the following purposes: (1) to verify your identity and prevent fraudulent bookings; (2) to match you with verified properties that fit your filters; (3) to handle booking enquiries, lease agreements, deposit protection, and move-in coordination; (4) to process payments and refunds; (5) to provide customer support and respond to your enquiries; (6) to send you service-related notifications (e.g. booking confirmations, lease reminders); (7) to send you marketing communications, where you have opted in; (8) to maintain and improve the platform, including fixing bugs and analyzing user behaviour to improve search relevance.",
      "When we process your personal data we rely on one or more of the following lawful bases under the UK GDPR: (a) contract — to fulfil the booking contract you have with us; (b) legal obligation — to comply with anti-money-laundering regulations, deposit-protection schemes, and tax reporting; (c) legitimate interests — to improve our services and prevent fraud, balanced against your rights; (d) consent — for marketing communications and optional cookies. You can withdraw consent at any time without affecting the lawfulness of processing based on consent before its withdrawal.",
    ],
  },
  {
    n: "04",
    title: "Who we share your data with",
    body: [
      "We share the minimum amount of personal data necessary with the following categories of recipients: (1) landlords and their letting agents — your name, email, phone, student status, and booking dates, so they can review your enquiry and prepare the lease; (2) our payment processor, Stripe — your card tokens and billing address, so the deposit and rent can be charged; (3) our authentication provider, Zoho — your email address and a secure token, so you can sign in without us storing your password; (4) our email service provider, which sends transactional emails on our behalf; (5) our analytics provider, which helps us understand aggregate usage patterns; (6) HMRC and other UK regulators, where legally required.",
      "We never sell your personal data. We never share your data with social networks, advertising networks, or third-party data brokers. We do not transfer your personal data outside the United Kingdom or the European Economic Area without first ensuring an adequate safeguard is in place, such as the UK International Data Transfer Agreement or the EU Standard Contractual Clauses.",
    ],
  },
  {
    n: "05",
    title: "How long we keep your data",
    body: [
      "We retain your personal data only for as long as necessary to fulfil the purposes described above, plus any legal retention period. Specifically: (1) active booking data is retained for the duration of the tenancy plus six (6) years afterwards for tax and dispute-resolution purposes; (2) marketing consent records are retained for twenty-four (24) months from the date of your last interaction; (3) account data is retained for as long as your account is active, and for twelve (12) months after you delete your account, after which it is permanently erased; (4) server logs (including IP addresses) are retained for ninety (90) days for security and abuse-prevention purposes.",
      "After the retention period expires, your personal data is either permanently erased from our production systems and backups, or it is anonymized in a way that it no longer be used to identify you. If you would like your data erased sooner, you can submit a right-to-erasure request at any time using the contact details in section 11.",
    ],
  },
  {
    n: "06",
    title: "Cookies and similar technologies",
    body: [
      "We use the following categories of cookies: (1) strictly necessary cookies — these are required for the website to function (e.g. session authentication, CSRF protection). They cannot be disabled; (2) preference cookies — these remember your settings such as preferred city and currency; (3) analytics cookies — these help us understand which pages are most useful and where users drop off; (4) marketing cookies — these are only set if you opt in, and they help us measure the effectiveness of our newsletter campaigns.",
      "Most browsers allow you to refuse or delete cookies. Doing so will not prevent you from using the site, but some features (such as staying signed in between visits) may not work. You can review and change your cookie preferences at any time by clicking the 'Cookie preferences' link in the footer.",
    ],
  },
  {
    n: "07",
    title: "Your rights under the UK GDPR",
    body: [
      "You have the following rights over your personal data: (1) the right to be informed about how we use your data — this policy fulfils that right; (2) the right of access — you can request a copy of all the personal data we hold about you; (3) the right to rectification — you can ask us to correct any inaccurate or incomplete data; (4) the right to erasure — in certain circumstances you can ask us to delete your data; (5) the right to restrict processing — you can ask us to suspend processing of your data pending a dispute; (6) the right to data portability — you can receive a copy of your data in a structured, machine-readable format and reuse it elsewhere; (7) the right to object — you can object to processing based on legitimate interests or for marketing; (8) rights in relation to automated decision-making and profiling — we do not use purely automated decisions with legal or similarly significant effects.",
      "To exercise any of these rights, email privacy@accommodationfinders.co.uk with the subject line 'Data subject request'. We respond within thirty (30) days. If you are not satisfied with our response, you can complain to the Information Commissioner's Office at ico.org.uk.",
    ],
  },
  {
    n: "08",
    title: "International data transfers",
    body: [
      "Where we share your data with a third-party processor located outside the UK or EEA (for example, a US-based analytics provider), we ensure an appropriate safeguard is in place. This typically means the UK International Data Transfer Agreement (IDTA) or the EU Standard Contractual Clauses, supplemented by transfer impact assessments where required. We update our transfer mechanisms whenever the law changes and we notify you on this page if any new transfer mechanism is added.",
    ],
  },
  {
    n: "09",
    title: "Children's privacy",
    body: [
      "Our services are designed for students aged sixteen (16) and over. We do not knowingly collect personal data from anyone under sixteen. If you believe we have collected personal data from a child under sixteen, please contact us at privacy@accommodationfinders.co.uk and we will erase it as soon as possible. If you are sixteen or seventeen, we treat your data with the same care as we do for adult users, and we may require a guarantor's signature on the booking contract.",
    ],
  },
  {
    n: "10",
    title: "Security",
    body: [
      "We protect your personal data using industry-standard technical and organizational measures. These include: (1) TLS encryption for all data in transit; (2) AES-256 encryption for sensitive data at rest, including passwords and identity documents; (3) strictly scoped access controls — only trained staff with a legitimate business need can view booking data; (4) regular security reviews and penetration tests; (5) bug-bounty engagement with responsible-disclosure researchers; (6) incident-response playbooks that comply with the UK GDPR's seventy-two (72) hour breach-notification deadline.",
      "No system is one hundred percent secure. In the unlikely event of a personal data breach that is likely to result in a risk to your rights and freedoms, we will notify the ICO within seventy-two (72) hours of becoming aware of it, and we will notify you directly without undue delay if the breach is likely to result in a high risk to you.",
    ],
  },
  {
    n: "11",
    title: "Changes to this policy and how to contact us",
    body: [
      "We may update this privacy policy from time to time. When we do, we will change the 'last updated' date at the bottom of the page and, if the change is material, we will notify you by email and by a banner on the website. We encourage you to review this page periodically.",
      "If you have any questions about this privacy policy, if you would like to exercise any of your data subject rights, or if you would like to complain about how we handle your data, please contact us:",
    ],
    contact: [
      { label: "Email",   value: "privacy@accommodationfinders.co.uk" },
      { label: "Phone",   value: "+44 (0) 20 1234 5678" },
      { label: "Post",    value: "Accommodation Finders Ltd, 1 Canada Square, Canary Wharf, London E14 5AB, United Kingdom" },
      { label: "DPO",     value: "Mark office of the Data Protection Officer" },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PageShell
      header={{
        eyebrow: "Legal",
        title: "Privacy Policy",
        description: "How Accommodation Finders collects, uses, shares, and protects your personal data — and the rights you have over it.",
        heroImage: "/images/cities/london-day.jpg",
        badge: "Last updated: September 2026",
      }}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Intro */}
        <div className="mb-12 lg:mb-16 max-w-2xl">
          <p className="text-[16px] lg:text-[18px] text-ink-soft leading-relaxed">
            This privacy policy explains, in plain English, what personal
            information Accommodation Finders collects about you, why we
            collect it, who we share it with, how long we keep it, and the
            rights you have over it. It applies to our website, our search
            and booking tools, and our customer-support channels. By using
            our services, you agree to the practices described below.
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
            This privacy policy is published under the authority of the UK
            General Data Protection Regulation (UK GDPR) and the Data
            Protection Act 2018. It is not legal advice. If you need legal
            advice about your data protection rights, please consult a
            qualified solicitor.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
