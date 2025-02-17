"use client"; // This directive tells Next.js to treat this file as a Client Component

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "1,000 emails per month",
      "100 contacts",
      "Basic templates",
      "Email support"
    ]
  },
  {
    name: "Pro Lite",
    price: "$15",
    description: "For growing coaches",
    features: [
      "10,000 emails per month",
      "5,000 contacts",
      "Premium templates",
      "Custom builder",
      "Priority support"
    ]
  },
  {
    name: "Pro Standard",
    price: "$40",
    description: "For established practices",
    features: [
      "50,000 emails per month",
      "25,000 contacts",
      "All Pro Lite features",
      "Advanced analytics",
      "API access",
      "24/7 phone support"
    ]
  }
];

export function PricingTable() {
  return (
    <div className="py-24 px-6 bg-secondary/30">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that best fits your needs. All plans include our core features.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <Card key={index} className="relative border-2">
            <CardHeader>
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="text-4xl font-bold my-4">
                {plan.price}<span className="text-lg font-normal text-muted-foreground">/mo</span>
              </div>
              <p className="text-muted-foreground">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                Get Started
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
