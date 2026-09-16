import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  heroImage?: string;
};

export function PageShell({
  children,
  header,
}: {
  children: React.ReactNode;
  header: PageHeaderProps;
}) {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <section className="relative overflow-hidden bg-brand text-white pt-32 pb-16 lg:pt-40 lg:pb-24">
        {/* Optional hero background image (overlaid with brand navy gradient) */}
        {header.heroImage && (
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={header.heroImage}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand/75 via-brand/55 to-brand/85" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />
          </div>
        )}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent mb-3">
            {header.eyebrow}
          </p>
          <h1 className="headline text-white text-[40px] sm:text-[52px] lg:text-[64px] max-w-3xl">
            {header.title}
          </h1>
          {header.description && (
            <p className="mt-5 max-w-2xl text-[16px] lg:text-[18px] text-white/85 leading-relaxed">
              {header.description}
            </p>
          )}
        </div>
      </section>
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  );
}
