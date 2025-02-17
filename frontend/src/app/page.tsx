import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { PricingTable } from "@/components/PricingTable";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <div id="features">
          <FeaturesGrid />
        </div>
        <div id="pricing">
          <PricingTable />
        </div>
      </main>
      <Footer />
    </div>
  );
}
