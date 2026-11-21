"use client";

import React from "react";
import Link from "next/link";
import { PhoneCall, Heart, ShieldCheck, ExternalLink } from "lucide-react";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export default function Footer() {
  const { logoUrl } = useSiteSettings();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-auto">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info with h-18 (72px) Logo */}
          <div className="md:col-span-2 space-y-4">
            <div
              className="relative w-auto max-w-[280px] bg-white/10 rounded-2xl p-2 backdrop-blur-xs inline-flex items-center"
              style={{ height: "calc(var(--spacing) * 18)" }}
            >
              <img
                src={logoUrl}
                alt="ন্যায্য দাম"
                className="h-18 w-auto max-w-[260px] object-contain object-left px-2 filter brightness-110"
                style={{ height: "calc(var(--spacing) * 18)" }}
              />
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              "ন্যায্য দাম" বাংলাদেশের প্রান্তিক কৃষক ভাইদের জন্য একটি উন্মুক্ত, সম্পূর্ণ বিনামূল্যে ব্যবহারযোগ্য প্ল্যাটফর্ম। সারা দেশের ৮টি বিভাগ, ৬৪টি জেলা ও ৪৯৫টি উপজেলার প্রতিদিনের পাইকারি ও খুচরা কৃষিপণ্যের দাম জানুন কোনো রেজিস্ট্রেশন বা অ্যাকাউন্ট ছাড়াই।
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>প্রতিদিন সকাল ৮টায় বাজারদর হালনাগাদ করা হয়</span>
            </div>
          </div>

          {/* Quick Help & Agri Services */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-green-500 pl-2">
              কৃষি সহায়তা ও তথ্য
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <a
                  href="tel:16123"
                  className="flex items-center gap-2 text-amber-300 font-bold hover:underline"
                  title="কৃষি কল সেন্টার"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                  <span>কৃষি কল সেন্টার: ১৬১২৩</span>
                </a>
              </li>
              <li>
                <a
                  href="http://www.dam.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>কৃষি বিপণন অধিদপ্তর (DAM)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="http://www.dae.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>কৃষি সম্প্রসারণ অধিদপ্তর (DAE)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="http://www.moa.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>কৃষি মন্ত্রণালয়</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Security & Verification */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              ন্যায্য দামের প্রতিশ্রুতি
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p>সরকারি ডাটাবেস ও স্থানীয় মোকামের সরাসরি সমন্বয়ে যাচাইকৃত দাম।</p>
              </div>
              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <p>কৃষক ভাইদের ঘামের সঠিক মূল্য নিশ্চিতে একটি অলাভজনক উন্মুক্ত উদ্যোগ।</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} ন্যায্য দাম (Najjo Dam) — সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1">
            <span>কৃষকের মুখে হাসি, সমৃদ্ধির বাংলাদেশ</span>
            <span className="text-emerald-500">🌾</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
