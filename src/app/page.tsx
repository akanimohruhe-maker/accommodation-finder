import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { CitiesGrid } from "@/components/site/cities-grid";
import { FeaturedProperties } from "@/components/site/featured-properties";
import { FeaturesBar } from "@/components/site/features-bar";
import { TestimonialsMarquee } from "@/components/site/testimonials-marquee";
import { StatsMarquee } from "@/components/site/stats-marquee";
import { GeometricPatterns } from "@/components/site/geometric-patterns";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background relative">
      <GeometricPatterns />
      <Navbar />
      <Hero />
      <CitiesGrid />
      <FeaturedProperties />
      <FeaturesBar />
      <StatsMarquee />
      <TestimonialsMarquee />
      <Footer />
    </main>
  );
}
