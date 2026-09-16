import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const quickLinks = [
  { label: "Find Accommodation", href: "#search" },
  { label: "Search Availability", href: "#" },
  { label: "Search Results", href: "#" },
  { label: "Booking Confirmation", href: "#" },
  { label: "Booking Cancellation", href: "#" },
  { label: "My Account", href: "#" },
];

const cities = [
  { label: "London", href: "#" },
  { label: "Manchester", href: "#" },
  { label: "Birmingham", href: "#" },
  { label: "Leicester", href: "#" },
  { label: "Northampton", href: "#" },
];

const support = [
  { label: "About us", href: "#about" },
  { label: "Contact us", href: "#contact" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-ink text-white">
      {/* Newsletter CTA */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="headline text-[28px] lg:text-[36px] text-white">
                Stay in the loop.
              </h3>
              <p className="mt-2 text-[15px] text-white/70 max-w-md">
                Subscribe for new listings, exclusive student offers and
                tips on studying in the UK. No spam, ever.
              </p>
            </div>
            <form className="flex w-full gap-2 max-w-md lg:ml-auto">
              <input
                type="email"
                placeholder="you@university.ac.uk"
                className="flex-1 h-12 rounded-full bg-white/8 border border-white/15 px-5 text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-accent"
                required
              />
              <button
                type="submit"
                className="h-12 rounded-full bg-accent text-accent-foreground px-5 text-[14px] font-semibold hover:bg-accent-hot transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-10">
          {/* Brand column (spans 2 cols on lg) */}
          <div className="col-span-2 lg:col-span-2 max-w-sm">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative h-9 w-9 rounded-xl bg-brand flex items-center justify-center">
                <span className="font-display font-bold text-base text-brand-foreground">a</span>
                <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent" />
              </div>
              <span className="font-display font-semibold text-[17px] tracking-tight text-white">
                Accommodation<span className="text-accent">Finders</span>
              </span>
            </Link>
            <p className="mt-5 text-[14px] text-white/60 leading-relaxed">
              Providing accommodations that suit your budget — viewings, lease
              agreements, roommate matching and moving-in support, all under one roof.
            </p>

            {/* Contact rows */}
            <div className="mt-6 space-y-2.5 text-[13.5px] text-white/75">
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent" />
                hello@accommodationfinders.co.uk
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-accent" />
                +44 (0) 20 1234 5678
              </p>
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-accent" />
                London · Manchester · Birmingham
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/40 mb-4">
              Quick links
            </p>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/40 mb-4">
              Cities
            </p>
            <ul className="space-y-2.5">
              {cities.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/40 mb-4">
              Support
            </p>
            <ul className="space-y-2.5">
              {support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/40 mb-4">
              Follow us
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="inline-flex items-center gap-2.5 text-[14px] text-white/70 hover:text-accent transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright strip */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12.5px] text-white/50">
            © 2026 Accommodation Finders. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[12.5px] text-white/50">
            <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <span className="text-white/20">|</span>
            <Link href="#" className="hover:text-accent transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
