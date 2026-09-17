import { PageShell } from "@/components/site/page-shell";
import {
  MailIcon,
  PhoneIcon,
  ChatIcon,
  LocationIcon,
  ClockIcon,
} from "@/components/site/contact-icons";
import { LogoSilhouette } from "@/components/site/logo-silhouette";

const contactChannels = [
  {
    Icon: MailIcon,
    label: "Email us",
    value: "hello@accommodationfinders.co.uk",
    sub: "We reply within one business day.",
    animClass: "contact-anim-mail",
  },
  {
    Icon: PhoneIcon,
    label: "Call us",
    value: "+44 (0) 20 1234 5678",
    sub: "Mon to Fri, 9am to 6pm UK time.",
    animClass: "contact-anim-phone",
  },
  {
    Icon: ChatIcon,
    label: "Live chat",
    value: "Available in-app",
    sub: "Once you're logged in, chat with our team.",
    animClass: "contact-anim-chat",
  },
];

const offices = [
  { city: "London",     address: "1 Canada Square, Canary Wharf, London E14 5AB" },
  { city: "Manchester", address: "24 Deansgate, Manchester M3 2BW" },
  { city: "Birmingham", address: "Colmore Row, Birmingham B3 2QA" },
];

export default function ContactPage() {
  return (
    <PageShell
      header={{
        eyebrow: "Get in touch",
        title: "Talk to a real person.",
        description: "Whether you're a student searching for housing, a landlord looking to list, or a parent trying to verify a property, we're here to help.",
        heroImage: "/images/cities/leicester-night.jpg",
        badge: "We're here",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {contactChannels.map((c) => (
            <div
              key={c.label}
              className="group bg-bg-elevated border border-line rounded-2xl p-6 lg:p-8 hover:border-brand/30 hover:shadow-[0_12px_40px_-16px_rgba(46,49,148,0.18)] transition-all"
            >
              {/* Icon container — soft brand tinted background with a warm
                  accent on hover, to make the bespoke geometric icons pop */}
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sun-1/8 to-sun-2/8 border border-sun-1/20 mb-5 group-hover:from-sun-1/15 group-hover:to-sun-2/15 transition-colors">
                <c.Icon size={28} className={c.animClass} />
              </div>
              <p className="text-[12px] uppercase tracking-wider text-ink-muted mb-1.5">
                {c.label}
              </p>
              <p className="font-display font-semibold text-[18px] text-ink">{c.value}</p>
              <p className="mt-2 text-[13.5px] text-ink-soft leading-relaxed">{c.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact form — has a faint logo silhouette watermark in the
              top-right corner to subtly reinforce the brand while the user
              composes their message. */}
          <form className="relative bg-bg-elevated border border-line rounded-2xl p-6 lg:p-8 space-y-5 overflow-hidden">
            {/* Watermark — top-right corner, faint brand silhouette. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 -right-6 opacity-[0.04] select-none"
              data-shield
            >
              <LogoSilhouette size={180} className="text-ink" />
            </div>
            <h2 className="relative headline text-ink text-[24px] mb-2">Send us a message</h2>
            <p className="relative text-[14px] text-ink-soft mb-4">We'll get back within 24 hours.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-[12px] font-medium uppercase tracking-wider text-ink-muted block mb-1.5">
                  First name
                </span>
                <input
                  type="text"
                  className="w-full h-11 rounded-lg border border-line bg-bg px-3.5 text-[14px] text-ink focus:outline-none focus:border-brand"
                  required
                />
              </label>
              <label className="block">
                <span className="text-[12px] font-medium uppercase tracking-wider text-ink-muted block mb-1.5">
                  Last name
                </span>
                <input
                  type="text"
                  className="w-full h-11 rounded-lg border border-line bg-bg px-3.5 text-[14px] text-ink focus:outline-none focus:border-brand"
                  required
                />
              </label>
            </div>
            <label className="block">
              <span className="text-[12px] font-medium uppercase tracking-wider text-ink-muted block mb-1.5">
                Email
              </span>
              <input
                type="email"
                className="w-full h-11 rounded-lg border border-line bg-bg px-3.5 text-[14px] text-ink focus:outline-none focus:border-brand"
                required
              />
            </label>
            <label className="block">
              <span className="text-[12px] font-medium uppercase tracking-wider text-ink-muted block mb-1.5">
                Subject
              </span>
              <select className="w-full h-11 rounded-lg border border-line bg-bg px-3.5 text-[14px] text-ink focus:outline-none focus:border-brand">
                <option>I'm a student looking for housing</option>
                <option>I'm a landlord wanting to list</option>
                <option>I have a booking query</option>
                <option>I have a press enquiry</option>
                <option>Something else</option>
              </select>
            </label>
            <label className="block">
              <span className="text-[12px] font-medium uppercase tracking-wider text-ink-muted block mb-1.5">
                Message
              </span>
              <textarea
                rows={5}
                className="w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-[14px] text-ink focus:outline-none focus:border-brand"
                required
              />
            </label>
            <button
              type="submit"
              className="w-full sm:w-auto rounded-full bg-brand text-brand-foreground px-6 py-2.5 text-[14px] font-semibold hover:bg-brand-soft transition-colors"
            >
              Send message
            </button>
          </form>

          {/* Offices */}
          <div>
            <h2 className="headline text-ink text-[24px] mb-2">Our offices</h2>
            <p className="text-[14px] text-ink-soft mb-6">Drop in for a chat, or use the address for legal correspondence.</p>
            <ul className="space-y-4">
              {offices.map((o) => (
                <li
                  key={o.city}
                  className="group bg-bg-elevated border border-line rounded-2xl p-5 flex items-start gap-4 hover:border-brand/30 transition-colors"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sun-1/8 to-sun-2/8 border border-sun-1/20 shrink-0 group-hover:from-sun-1/15 group-hover:to-sun-2/15 transition-colors">
                    <LocationIcon size={24} className="contact-anim-location" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-[16px] text-ink">{o.city} office</p>
                    <p className="text-[14px] text-ink-soft mt-1">{o.address}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="group mt-8 bg-gradient-to-br from-brand/4 to-sun-1/4 border border-brand/15 rounded-2xl p-5 flex items-start gap-4 hover:border-brand/30 transition-colors">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sun-1/10 to-sun-2/10 border border-sun-1/20 shrink-0 group-hover:from-sun-1/20 group-hover:to-sun-2/20 transition-colors">
                <ClockIcon size={24} className="contact-anim-clock" />
              </div>
              <div>
                <p className="font-display font-semibold text-[15px] text-ink">Support hours</p>
                <p className="text-[13.5px] text-ink-soft mt-1 leading-relaxed">
                  Phone and live chat: Monday to Friday, 9am to 6pm UK time.
                  Email: monitored daily, replies within 24 hours.
                  Urgent booking issues: 24/7 for active bookings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
