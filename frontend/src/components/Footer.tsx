"use client"; // This directive tells Next.js to treat this file as a Client Component

import React from "react";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-secondary text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6" />
            <span className="text-xl font-bold">EmailCoach Pro</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              Contact
            </a>
          </div>
          <div className="text-white/80 text-sm">
            © 2024 EmailCoach Pro. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
