"use client";

import React from "react";
import {
  Wheat,
  Coins,
  CircleDot,
  Droplets,
  Flame,
  Carrot,
  Apple,
  Flower2,
  Fish,
  LayoutGrid
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toBengaliNumber } from "@/lib/api";

const CATEGORY_MAP = [
  {
    id: "",
    name_bn: "সকল পণ্য",
    name_en: "All Products",
    icon: LayoutGrid
  },
  {
    id: "প্রধান খাদ্যশস্য",
    name_bn: "প্রধান খাদ্যশস্য",
    name_en: "Cereal Crops",
    icon: Wheat
  },
  {
    id: "অর্থকরী ফসল",
    name_bn: "অর্থকরী ফসল",
    name_en: "Cash Crops",
    icon: Coins
  },
  {
    id: "ডালজাতীয় ফসল",
    name_bn: "ডালজাতীয় ফসল",
    name_en: "Pulses",
    icon: CircleDot
  },
  {
    id: "তৈলবীজ ফসল",
    name_bn: "তৈলবীজ ফসল",
    name_en: "Oilseeds",
    icon: Droplets
  },
  {
    id: "মসলাজাতীয় ফসল",
    name_bn: "মসলাজাতীয় ফসল",
    name_en: "Spices",
    icon: Flame
  },
  {
    id: "শাকসবজি ও কন্দাল ফসল",
    name_bn: "শাকসবজি ও কন্দাল",
    name_en: "Vegetables & Tubers",
    icon: Carrot
  },
  {
    id: "ফলমূল",
    name_bn: "ফলমূল",
    name_en: "Fruits",
    icon: Apple
  },
  {
    id: "ফুল ও শোভাবর্ধক উদ্ভিদ",
    name_bn: "ফুল ও শোভাবর্ধক",
    name_en: "Flowers",
    icon: Flower2
  },
  {
    id: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    name_bn: "মৎস্য, প্রাণিসম্পদ ও বনজ",
    name_en: "Allied Agricultural Products",
    icon: Fish
  }
];

export default function CategoryTabs({
  selectedCategory,
  onSelectCategory,
  categoryCounts = {}
}) {
  return (
    <div className="w-full bg-white border-b border-slate-200 shadow-2xs sticky top-20 z-30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3 scroll-smooth">
          {CATEGORY_MAP.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] ?? (cat.id === "" ? Object.values(categoryCounts).reduce((a, b) => a + b, 0) : null);

            return (
              <button
                key={cat.name_en}
                onClick={() => onSelectCategory(cat.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 select-none flex-shrink-0 cursor-pointer active:scale-95",
                  isSelected
                    ? "bg-green-700 text-white shadow-md shadow-green-700/25 ring-2 ring-green-700/20"
                    : "bg-slate-100/90 text-slate-700 hover:bg-slate-200/80 hover:text-green-800"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 transition-transform",
                    isSelected ? "text-amber-300 scale-110" : "text-slate-500"
                  )}
                />
                <span>{cat.name_bn}</span>
                {count !== null && count > 0 && (
                  <span
                    className={cn(
                      "text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ml-0.5",
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 text-slate-600"
                    )}
                  >
                    {toBengaliNumber(count)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
