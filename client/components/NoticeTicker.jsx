"use client";

import React, { useEffect, useState } from "react";
import { Megaphone, AlertCircle } from "lucide-react";
import { fetchNotices } from "@/lib/api";

export default function NoticeTicker({ initialNotices = [] }) {
  const [notices, setNotices] = useState(initialNotices);

  useEffect(() => {
    if (initialNotices.length === 0) {
      fetchNotices().then((data) => {
        if (data && data.length > 0) setNotices(data);
      });
    }
  }, [initialNotices]);

  if (!notices || notices.length === 0) {
    return (
      <div className="bg-amber-500 text-white text-xs font-semibold py-1.5 px-4 flex items-center justify-center gap-2">
        <Megaphone className="w-4 h-4 animate-bounce" />
        <span>কৃষক ভাইদের দৃষ্টি আকর্ষণ: ফসল বিক্রির পূর্বে স্থানীয় পাইকারি ও খুচরা দর যাচাই করে নিন।</span>
      </div>
    );
  }

  // Combine notice texts
  const fullTickerText = notices.map((n) => n.text_bn).join("   ★   ");

  return (
    <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white text-xs sm:text-sm font-medium py-2 px-3 shadow-inner overflow-hidden flex items-center relative z-50">
      <div className="container mx-auto flex items-center gap-3">
        {/* Urgent Badge */}
        <div className="flex-shrink-0 flex items-center gap-1.5 bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20 text-amber-100 font-bold text-xs uppercase tracking-wider">
          <AlertCircle className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
          <span>জরুরি বার্তা</span>
        </div>

        {/* Marquee Scroller */}
        <div className="flex-1 overflow-hidden relative whitespace-nowrap">
          <div className="inline-block animate-marquee hover:[animation-play-state:paused] cursor-default font-medium">
            <span className="mx-4">{fullTickerText}</span>
            <span className="mx-4 font-bold text-amber-200">•</span>
            <span className="mx-4">{fullTickerText}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </div>
  );
}
