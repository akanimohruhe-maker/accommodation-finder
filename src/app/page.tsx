import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { CitiesGrid } from "@/components/site/cities-grid";
import { FeaturedProperties } from "@/components/site/featured-properties";
import { FeaturesBar } from "@/components/site/features-bar";
import { Testimonials } from "@/components/site/testimonials";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <Hero />
      <CitiesGrid />
      <FeaturedProperties />
      <FeaturesBar />
      <Testimonials />
      <Footer />
    </main>
  );
}
