"use client"; // This directive tells Next.js to treat this file as a Client Component

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <div className="py-24 px-6 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold tracking-tight mb-8">
          Professional Email Communications
          <span className="text-primary"> Made Simple</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Streamline your coaching communications with pre-made templates,
          custom builders, and powerful automation. Perfect for coaches and consultants.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="gap-2">
            Get Started <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline">
            View Pricing
          </Button>
        </div>
      </div>
    </div>
  );
}
