import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { Categories } from "@/components/site/Categories";
import { Templates } from "@/components/site/Templates";
import { Features } from "@/components/site/Features";
import { CustomCta } from "@/components/site/CustomCta";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Categories />
        <Templates />
        <Features />
        <CustomCta />
      </main>
      <Footer />
    </div>
  );
}
