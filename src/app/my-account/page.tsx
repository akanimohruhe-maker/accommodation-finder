import { PageShell } from "@/components/site/page-shell";
import { Search, Calendar, MessageSquare, Bell, LogOut, User as UserIcon } from "lucide-react";

const activeBookings = [
  {
    name: "Skyline View Apartments",
    area: "Canary Wharf, London",
    moveIn: "28 Sep 2026",
    moveOut: "5 Jul 2027",
    status: "Confirmed",
    next: "Deposit paid. Move-in day checklist available.",
  },
];

const pastBookings = [
  {
    name: "Victoria House",
    area: "City centre, Leicester",
    moveIn: "Sep 2024",
    moveOut: "Jul 2025",
    status: "Completed",
    next: "Deposit refunded in full. Leave a review?",
  },
  {
    name: "Aston Square Residence",
    area: "Aston, Birmingham",
    moveIn: "Sep 2023",
    moveOut: "Jul 2024",
    status: "Completed",
    next: "Deposit refunded. Review submitted.",
  },
];

export default function MyAccountPage() {
  return (
    <PageShell
      header={{
        eyebrow: "My account",
        title: "Welcome back, David.",
        description: "Manage your active booking, review past tenancies, and update your profile and notification preferences.",
        heroImage: "/images/cities/leicester-dusk.jpg",
        badge: "Your dashboard",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Tabs / sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 mb-12">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
            {[
              { Icon: UserIcon,    label: "Profile",      active: true },
              { Icon: Calendar,    label: "My bookings",   active: false },
              { Icon: Search,      label: "Saved searches", active: false },
              { Icon: MessageSquare, label: "Messages",    active: false },
              { Icon: Bell,        label: "Notifications", active: false },
              { Icon: LogOut,      label: "Sign out",       active: false },
            ].map(({ Icon, label, active }) => (
              <a
                key={label}
                href="#"
                className={`inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-[14px] font-medium whitespace-nowrap transition-colors ${
                  active
                    ? "bg-brand text-brand-foreground"
                    : "text-ink-soft hover:bg-line-soft hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </nav>

          {/* Profile card */}
          <div>
            <div className="bg-bg-elevated border border-line rounded-2xl p-6 lg:p-8 mb-6">
              <div className="flex items-center gap-4 mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/avatar-chidinma.jpg"
                  alt="David"
                  className="h-16 w-16 rounded-full border border-line object-cover"
                />
                <div>
                  <h2 className="font-display font-semibold text-[20px] text-ink">David Akanimoh</h2>
                  <p className="text-[14px] text-ink-soft">david@university.ac.uk</p>
                </div>
                <button className="ml-auto rounded-full border border-line text-ink-soft px-4 py-2 text-[13px] font-medium hover:border-brand/30 hover:text-ink transition-colors">
                  Edit profile
                </button>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-[14px]">
                <div>
                  <dt className="text-ink-muted text-[12px] uppercase tracking-wider mb-1">University</dt>
                  <dd className="text-ink font-medium">University of Leicester</dd>
                </div>
                <div>
                  <dt className="text-ink-muted text-[12px] uppercase tracking-wider mb-1">Course</dt>
                  <dd className="text-ink font-medium">MSc Finance</dd>
                </div>
                <div>
                  <dt className="text-ink-muted text-[12px] uppercase tracking-wider mb-1">Country</dt>
                  <dd className="text-ink font-medium">Nigeria</dd>
                </div>
                <div>
                  <dt className="text-ink-muted text-[12px] uppercase tracking-wider mb-1">Member since</dt>
                  <dd className="text-ink font-medium">September 2024</dd>
                </div>
              </dl>
            </div>

            {/* Active booking */}
            <h3 className="font-display font-semibold text-[18px] text-ink mb-4">Active booking</h3>
            <div className="space-y-4 mb-8">
              {activeBookings.map((b) => (
                <div
                  key={b.name}
                  className="bg-bg-elevated border border-line rounded-2xl p-6 flex flex-col sm:flex-row sm:items-start gap-4"
                >
                  <div className="flex-1">
                    <span className="inline-flex items-center gap-1 rounded-full bg-success/10 text-success px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider mb-2">
                      {b.status}
                    </span>
                    <h4 className="font-display font-semibold text-[17px] text-ink">{b.name}</h4>
                    <p className="text-[13.5px] text-ink-soft mt-0.5">{b.area}</p>
                    <p className="text-[13px] text-ink-muted mt-2">
                      {b.moveIn} → {b.moveOut}
                    </p>
                    <p className="text-[13.5px] text-ink-soft mt-3">{b.next}</p>
                  </div>
                  <a
                    href="/booking-confirmation"
                    className="rounded-full bg-brand text-brand-foreground px-4 py-2 text-[12.5px] font-medium hover:bg-brand-soft transition-colors whitespace-nowrap self-start"
                  >
                    View booking
                  </a>
                </div>
              ))}
            </div>

            {/* Past bookings */}
            <h3 className="font-display font-semibold text-[18px] text-ink mb-4">Past bookings</h3>
            <div className="space-y-3">
              {pastBookings.map((b) => (
                <div
                  key={b.name}
                  className="bg-bg-elevated border border-line rounded-2xl p-5 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-display font-semibold text-[16px] text-ink">{b.name}</h4>
                    <p className="text-[13px] text-ink-soft mt-0.5">{b.area}</p>
                    <p className="text-[12.5px] text-ink-muted mt-1">
                      {b.moveIn} → {b.moveOut}
                    </p>
                  </div>
                  <span className="text-[12px] text-ink-muted text-right max-w-[180px]">
                    {b.next}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
