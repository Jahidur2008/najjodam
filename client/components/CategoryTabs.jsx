"use client";

import React, { useRef, useState, useEffect } from "react";
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
  LayoutGrid,
  ChevronLeft,
  ChevronRight
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
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll boundary to toggle arrow buttons visibility
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 8);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons, { passive: true });
      window.addEventListener("resize", updateScrollButtons);
      return () => {
        container.removeEventListener("scroll", updateScrollButtons);
        window.removeEventListener("resize", updateScrollButtons);
      };
    }
  }, []);

  // Smooth scroll handler for buttons
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Mouse wheel horizontal scroll support
  const handleWheel = (e) => {
    if (scrollContainerRef.current && e.deltaY !== 0) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="w-full bg-white border-b border-slate-200 shadow-2xs sticky top-20 z-30">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left Arrow Button for Desktop */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="পূর্ববর্তী ক্যাটাগরি"
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 items-center justify-center w-8 h-8 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 hover:bg-green-50 hover:text-green-700 z-10 transition-all duration-150 cursor-pointer active:scale-90"
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onWheel={handleWheel}
          className="flex items-center gap-2.5 overflow-x-auto scroll-smooth py-3 px-1 sm:px-6 no-scrollbar"
        >
          {CATEGORY_MAP.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count =
              categoryCounts[cat.id] ??
              (cat.id === ""
                ? Object.values(categoryCounts).reduce((a, b) => a + b, 0)
                : null);

            return (
              <button
                key={cat.name_en}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all duration-200 select-none cursor-pointer active:scale-95",
                  isSelected
                    ? "bg-green-700 text-white shadow-md shadow-green-700/25 ring-2 ring-green-700/20"
                    : "bg-slate-100/90 text-slate-700 hover:bg-slate-200/80 hover:text-green-800"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0 transition-transform",
                    isSelected ? "text-amber-300 scale-110" : "text-slate-500"
                  )}
                />
                <span>{cat.name_bn}</span>
                {count !== null && count > 0 && (
                  <span
                    className={cn(
                      "text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ml-0.5 shrink-0",
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

        {/* Right Arrow Button for Desktop */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="পরবর্তী ক্যাটাগরি"
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-center w-8 h-8 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 hover:bg-green-50 hover:text-green-700 z-10 transition-all duration-150 cursor-pointer active:scale-90"
          >
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        )}
      </div>
    </div>
  );
}
