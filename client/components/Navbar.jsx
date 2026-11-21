"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, PhoneCall, RefreshCw } from "lucide-react";
import { getBengaliDate } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export default function Navbar({ onResetToDhaka }) {
  const [currentDate, setCurrentDate] = useState("");
  const { logoUrl } = useSiteSettings();

  useEffect(() => {
    setCurrentDate(getBengaliDate());
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 border-b border-slate-200/80 shadow-xs transition-all">
      <div className="container mx-auto px-4 sm:px-6 min-h-[88px] py-2 sm:py-2.5 flex items-center justify-between gap-4">
        
        {/* Dynamic Brand Logo with h-18 (72px) Fixed Bounds */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-green-600 rounded-xl p-1 shrink-0"
        >
          <div
            className="relative flex items-center shrink-0 transition-transform duration-200 group-hover:scale-[1.02]"
            style={{ height: "calc(var(--spacing) * 18)" }}
          >
            <img
              src={logoUrl}
              alt="ন্যায্য দাম - কৃষকের বাজারদর"
              className="h-18 w-auto max-w-[260px] object-contain object-left shrink-0"
              style={{ height: "calc(var(--spacing) * 18)" }}
            />
          </div>
        </Link>

        {/* Center / Right Meta */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Live Date in Bengali (Hidden on small mobile) */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200">
            <Calendar className="w-3.5 h-3.5 shrink-0 text-green-700" />
            <span>{currentDate || "আজকের তাজা দর"}</span>
          </div>

          {/* Quick Dhaka Reset Button */}
          {onResetToDhaka && (
            <Button
              variant="outline"
              size="sm"
              onClick={onResetToDhaka}
              className="hidden sm:inline-flex text-xs font-bold text-green-800 border-green-200 bg-green-50/60 hover:bg-green-100 gap-1.5 cursor-pointer"
              title="ঢাকার মূল বাজারদরে ফিরে যান"
            >
              <RefreshCw className="w-3 h-3 shrink-0 text-green-700" />
              <span>ঢাকার বাজারদর</span>
            </Button>
          )}

          {/* Agri Call Center Helpline 16123 */}
          <a
            href="tel:16123"
            className="hidden md:flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-200 transition-colors"
            title="কৃষি কল সেন্টার - সরাসরি কৃষি পরামর্শ"
          >
            <PhoneCall className="w-3.5 h-3.5 shrink-0 text-amber-600 animate-pulse" />
            <span>কৃষি হেল্পলাইন: ১৬১২৩</span>
          </a>

        </div>

      </div>
    </header>
  );
}
