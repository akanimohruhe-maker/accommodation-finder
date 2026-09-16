import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
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
      <section className="bg-brand text-white pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
