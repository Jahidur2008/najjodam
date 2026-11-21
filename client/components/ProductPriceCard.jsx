"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Scale,
  MapPin,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toBengaliNumber } from "@/lib/api";

export default function ProductPriceCard({ priceRecord, onOpenCompare }) {
  const [imageError, setImageError] = useState(false);
  const { product } = priceRecord;
  if (!product) return null;

  const unit = product.unit_bn || "কেজি";

  // Price values
  const wholesaleMin = Number(priceRecord.wholesale_price_min) || 0;
  const wholesaleMax = Number(priceRecord.wholesale_price_max) || 0;
  const retailMin = Number(priceRecord.retail_price_min) || 0;
  const retailMax = Number(priceRecord.retail_price_max) || 0;

  // Safe Per-Maund Calculation (১ মণ = ৪০ কেজি)
  const multiplier = product.maundMultiplier || (product.unit_bn === "কেজি" ? 40 : 0);
  const maundMin = wholesaleMin * multiplier;
  const maundMax = wholesaleMax * multiplier;
  const isPerMaundAvailable = multiplier > 0 && maundMin > 0;

  // Trend calculations
  const currentAvg = (wholesaleMin + wholesaleMax) / 2;
  const prevAvg = priceRecord.previous_wholesale_avg || currentAvg;
  const priceDiff = Math.round(currentAvg - prevAvg);

  let trendType = priceRecord.price_trend || "STABLE";
  if (priceDiff > 0) trendType = "UP";
  else if (priceDiff < 0) trendType = "DOWN";

  // Fallback image url if broken or local upload
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const rawImage = product.image_url;
  const resolvedImage = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `${apiBaseUrl}${rawImage}`
    : "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80";

  const displayImage = imageError
    ? "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80"
    : resolvedImage;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-green-300 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* 1. PRODUCT PHOTO & BADGES */}
      <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
        <Image
          src={displayImage}
          alt={product.name_bn}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-black/50 backdrop-blur-md text-white border-white/20 text-[11px] font-medium">
            {product.category_bn}
          </Badge>
        </div>

        {/* Location Level Pill */}
        <div className="absolute top-3 right-3">
          <Badge
            variant={priceRecord.priceLevel === "UPAZILA_EXACT" ? "default" : "secondary"}
            className={`text-[10px] font-bold ${
              priceRecord.priceLevel === "UPAZILA_EXACT"
                ? "bg-green-700/90 text-white"
                : "bg-white/85 text-slate-800 backdrop-blur-md border border-slate-200"
            }`}
          >
            <MapPin className="w-2.5 h-2.5 shrink-0 mr-1" />
            {priceRecord.priceLevel === "UPAZILA_EXACT"
              ? `${priceRecord.upazila_bn} উপজেলা দর`
              : `${priceRecord.district_bn} জেলা গড় দর`}
          </Badge>
        </div>

        {/* Product Title Banner at Bottom of Photo */}
        <div className="absolute bottom-2.5 left-3 right-3 text-white">
          <h3 className="font-extrabold text-lg sm:text-xl drop-shadow-md text-white tracking-tight leading-snug">
            {product.name_bn}
          </h3>
          <p className="text-xs text-slate-200 drop-shadow font-medium tracking-wide">
            {product.name_en}
          </p>
        </div>
      </div>

      {/* 2. CARD BODY & PRICING */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
        
        {/* Highlighted Wholesale Box (কৃষক/পাইকারি দর) */}
        <div className="bg-gradient-to-br from-green-50 via-emerald-50/70 to-green-50/40 border border-green-200/90 rounded-xl p-3 sm:p-3.5 relative overflow-hidden shadow-2xs">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-green-800 flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 shrink-0 text-green-700" />
              <span>কৃষক / পাইকারি বাজারদর</span>
            </span>

            {/* Price Trend Indicator */}
            {trendType === "UP" && (
              <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3 shrink-0 text-emerald-700" />
                <span>+৳{toBengaliNumber(Math.abs(priceDiff))}</span>
              </span>
            )}
            {trendType === "DOWN" && (
              <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-rose-800 bg-rose-100/90 border border-rose-300 px-2 py-0.5 rounded-full">
                <TrendingDown className="w-3 h-3 shrink-0 text-rose-700" />
                <span>-৳{toBengaliNumber(Math.abs(priceDiff))}</span>
              </span>
            )}
            {trendType === "STABLE" && (
              <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                <Minus className="w-3 h-3 shrink-0 text-slate-400" />
                <span>অপরিবর্তিত</span>
              </span>
            )}
          </div>

          {/* Unit Price (e.g. ৳ ৫৫ - ৬০ / কেজি) */}
          <div className="flex items-baseline gap-1 text-slate-900 my-1">
            <span className="text-xl sm:text-2xl font-black text-green-800 tracking-tight">
              ৳ {toBengaliNumber(wholesaleMin)} - {toBengaliNumber(wholesaleMax)}
            </span>
            <span className="text-xs font-bold text-slate-600">/ {unit}</span>
          </div>

          {/* Automatic Per-Maund Calculation (১ মণ = ৪০ কেজি) */}
          {isPerMaundAvailable && (
            <div className="mt-1.5 pt-1.5 border-t border-green-200/60 flex items-center justify-between text-xs font-bold text-amber-900 bg-amber-50/80 px-2.5 py-1.5 rounded-lg">
              <span className="flex items-center gap-1.5 text-amber-800">
                <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                <span>প্রতি মণ ({toBengaliNumber(multiplier)} {unit}):</span>
              </span>
              <span className="font-extrabold text-amber-900">
                ৳ {toBengaliNumber(Math.round(maundMin).toLocaleString("en-IN"))} - {toBengaliNumber(Math.round(maundMax).toLocaleString("en-IN"))}
              </span>
            </div>
          )}
        </div>

        {/* Consumer Retail Price Row */}
        <div className="flex items-center justify-between text-xs px-1 text-slate-600 font-semibold border-b border-slate-100 pb-2.5">
          <span>ভোক্তা খুচরা বাজারদর:</span>
          <span className="text-sm font-extrabold text-slate-800">
            ৳ {toBengaliNumber(retailMin)} - {toBengaliNumber(retailMax)}
            <span className="text-xs font-normal text-slate-500 ml-0.5">/{unit}</span>
          </span>
        </div>

        {/* District Comparison Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onOpenCompare(product)}
          className="w-full text-xs font-bold text-slate-700 hover:text-green-800 hover:border-green-400 hover:bg-green-50/50 gap-1.5 rounded-xl border-slate-200 py-2.5"
        >
          <BarChart3 className="w-3.5 h-3.5 shrink-0 text-green-700" />
          <span>অন্যান্য জেলার সাথে তুলনা করুন</span>
        </Button>

      </div>
    </motion.div>
  );
}
