import { PageShell } from "@/components/site/page-shell";
import { Mail, Phone, MapPin, MessageSquare, Clock } from "lucide-react";

const contactChannels = [
  {
    Icon: Mail,
    label: "Email us",
    value: "hello@accommodationfinders.co.uk",
    sub: "We reply within one business day.",
  },
  {
    Icon: Phone,
    label: "Call us",
    value: "+44 (0) 20 1234 5678",
    sub: "Mon to Fri, 9am to 6pm UK time.",
  },
  {
    Icon: MessageSquare,
    label: "Live chat",
    value: "Available in-app",
    sub: "Once you're logged in, chat with our team.",
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
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {contactChannels.map((c) => (
            <div
              key={c.label}
              className="bg-bg-elevated border border-line rounded-2xl p-6 lg:p-8"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/8 border border-brand/15 text-brand mb-4">
                <c.Icon className="h-5 w-5" />
              </div>
              <p className="text-[12px] uppercase tracking-wider text-ink-muted mb-1">
                {c.label}
              </p>
              <p className="font-display font-semibold text-[18px] text-ink">{c.value}</p>
              <p className="mt-2 text-[13.5px] text-ink-soft">{c.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact form */}
          <form className="bg-bg-elevated border border-line rounded-2xl p-6 lg:p-8 space-y-5">
            <h2 className="headline text-ink text-[24px] mb-2">Send us a message</h2>
            <p className="text-[14px] text-ink-soft mb-4">We'll get back within 24 hours.</p>

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
                  className="bg-bg-elevated border border-line rounded-2xl p-5 flex items-start gap-4"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand/8 border border-brand/15 text-brand shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-[16px] text-ink">{o.city} office</p>
                    <p className="text-[14px] text-ink-soft mt-1">{o.address}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 bg-brand/4 border border-brand/15 rounded-2xl p-5 flex items-start gap-3">
              <Clock className="h-5 w-5 text-brand shrink-0 mt-0.5" />
              <div>
                <p className="font-display font-semibold text-[15px] text-ink">Support hours</p>
                <p className="text-[13.5px] text-ink-soft mt-1">
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
