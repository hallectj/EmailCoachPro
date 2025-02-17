"use client"; // This directive tells Next.js to treat this file as a Client Component

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, PenTool, Zap, BarChart3, FileText, Clock } from "lucide-react";

const features = [
  {
    title: "Pre-made Templates",
    description: "Access a library of professional email templates designed for coaches.",
    icon: FileText
  },
  {
    title: "Custom Builder",
    description: "Create and customize your own templates with our intuitive builder.",
    icon: PenTool
  },
  {
    title: "Smart Automation",
    description: "Automate your email sequences and save valuable time.",
    icon: Zap
  },
  {
    title: "Campaign Management",
    description: "Manage and schedule your email campaigns efficiently.",
    icon: Mail
  },
  {
    title: "Performance Analytics",
    description: "Track and analyze your email campaign performance.",
    icon: BarChart3
  },
  {
    title: "Time-Saving Features",
    description: "Streamline your workflow with scheduling and automation tools.",
    icon: Clock
  }
];

export function FeaturesGrid() {
  return (
    <div className="py-24 px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to manage and improve your email communications
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <Card key={index} className="border-2">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="mb-2">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
