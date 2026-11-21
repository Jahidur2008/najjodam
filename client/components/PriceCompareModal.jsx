"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";
import {
  TrendingUp,
  MapPin,
  Scale,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fetchProductComparison, toBengaliNumber } from "@/lib/api";

export default function PriceCompareModal({ product, isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [compareData, setCompareData] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setImageError(false);
  }, [product]);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const rawImage = product?.image_url;
  const resolvedImage = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `${apiBaseUrl}${rawImage}`
    : "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80";

  const displayImage = imageError ? "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80" : resolvedImage;

  useEffect(() => {
    if (isOpen && product?._id) {
      setLoading(true);
      fetchProductComparison(product._id)
        .then((res) => {
          if (res?.success) {
            setCompareData(res);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, product]);

  if (!product) return null;

  const chartData = (compareData?.data || []).map((item) => ({
    district: item.district_bn,
    district_en: item.district_en,
    wholesale_avg: item.wholesale_avg,
    wholesale_min: item.wholesale_price_min,
    wholesale_max: item.wholesale_price_max,
    retail_avg: item.retail_avg,
    locationLabel: `${item.district_bn}${item.upazila_bn ? ` (${item.upazila_bn})` : ""}`
  }));

  const summary = compareData?.summary;
  const unit = product.unit_bn || "কেজি";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-6 rounded-3xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
              <Image
                src={displayImage}
                alt={product.name_bn}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            </div>
            <div>
              <DialogTitle className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <span>{product.name_bn}</span>
                <Badge variant="secondary" className="text-xs font-semibold">
                  {product.category_bn}
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 font-medium">
                {product.name_en} • সারা দেশের বিভিন্ন জেলা ও উপজেলার তুলনামূলক বাজারদর
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-green-700" />
            <span className="text-sm font-semibold">তুলনামূলক বাজারদর লোড হচ্ছে...</span>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Top 3 Summary Metric Cards */}
            {summary && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* 1. National Average */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    জাতীয় গড় পাইকারি দর
                  </div>
                  <div className="text-xl font-extrabold text-slate-900">
                    ৳ {toBengaliNumber(summary.nationalAverageWholesale)}
                    <span className="text-xs font-normal text-slate-500 ml-1">/{unit}</span>
                  </div>
                </div>

                {/* 2. Highest Price (Farmer Profit Max) */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5">
                  <div className="text-[11px] font-bold text-emerald-800 flex items-center justify-between uppercase tracking-wider mb-1">
                    <span>সর্বোচ্চ দর (বেশি লাভ)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-700" />
                  </div>
                  <div className="text-xl font-extrabold text-emerald-900">
                    ৳ {toBengaliNumber(summary.highestWholesalePrice)}
                    <span className="text-xs font-normal text-emerald-700 ml-1">/{unit}</span>
                  </div>
                  <div className="text-xs font-semibold text-emerald-800 truncate mt-0.5">
                    {summary.highestDistrict || "তথ্য নেই"}
                  </div>
                </div>

                {/* 3. Lowest Price */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5">
                  <div className="text-[11px] font-bold text-amber-800 flex items-center justify-between uppercase tracking-wider mb-1">
                    <span>সর্বনিম্ন পাইকারি দর</span>
                    <ArrowDownRight className="w-3.5 h-3.5 text-amber-700" />
                  </div>
                  <div className="text-xl font-extrabold text-amber-900">
                    ৳ {toBengaliNumber(summary.cheapestWholesalePrice)}
                    <span className="text-xs font-normal text-amber-700 ml-1">/{unit}</span>
                  </div>
                  <div className="text-xs font-semibold text-amber-800 truncate mt-0.5">
                    {summary.cheapestDistrict || "তথ্য নেই"}
                  </div>
                </div>

              </div>
            )}

            {/* Recharts Bar Chart Visualizing District Prices */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-green-700" />
                  <span>জেলা ভিত্তিক গড় পাইকারি মূল্য চার্ট (টাকা / {unit})</span>
                </span>
                <span className="text-[11px] text-slate-400">উৎস: কৃষি বিপণন ও স্থানীয় আড়ত</span>
              </div>

              {mounted && chartData.length > 0 ? (
                <div className="w-full h-64 sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis
                        dataKey="district"
                        tick={{ fill: "#475569", fontSize: 12, fontWeight: 600 }}
                        interval={0}
                        angle={-15}
                        textAnchor="end"
                      />
                      <YAxis
                        tick={{ fill: "#64748B", fontSize: 11 }}
                        domain={[0, "auto"]}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
                                <div className="font-bold text-emerald-400 text-sm border-b border-slate-700 pb-1">
                                  {data.locationLabel}
                                </div>
                                <div className="flex justify-between gap-4">
                                  <span className="text-slate-300">গড় পাইকারি দর:</span>
                                  <span className="font-extrabold text-white">৳ {toBengaliNumber(data.wholesale_avg)} /{unit}</span>
                                </div>
                                <div className="flex justify-between gap-4">
                                  <span className="text-slate-300">পাইকারি পরিধি:</span>
                                  <span>৳ {toBengaliNumber(data.wholesale_min)} - {toBengaliNumber(data.wholesale_max)}</span>
                                </div>
                                <div className="flex justify-between gap-4 pt-1 border-t border-slate-800">
                                  <span className="text-slate-400">খুচরা গড়:</span>
                                  <span>৳ {toBengaliNumber(data.retail_avg)} /{unit}</span>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="wholesale_avg" radius={[8, 8, 0, 0]}>
                        {chartData.map((entry, index) => {
                          const isMax = summary && entry.wholesale_avg === summary.highestWholesalePrice;
                          return (
                            <Cell
                              key={`cell-${index}`}
                              fill={isMax ? "#15803D" : "#10B981"}
                            />
                          );
                        })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="py-12 text-center text-sm text-slate-500">
                  এই পণ্যের জন্য পর্যাপ্ত তুলনামূলক তথ্য নেই।
                </div>
              )}
            </div>

            {/* Detailed Table */}
            {chartData.length > 0 && (
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">স্থান (জেলা/উপজেলা)</th>
                      <th className="py-2.5 px-3">পাইকারি রেঞ্জ</th>
                      <th className="py-2.5 px-3">গড় পাইকারি</th>
                      <th className="py-2.5 px-3">খুচরা রেঞ্জ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {chartData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-slate-900 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-green-700 flex-shrink-0" />
                          <span>{row.locationLabel}</span>
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-green-800">
                          ৳ {toBengaliNumber(row.wholesale_min)} - {toBengaliNumber(row.wholesale_max)}
                        </td>
                        <td className="py-2.5 px-3 font-extrabold text-slate-900">
                          ৳ {toBengaliNumber(row.wholesale_avg)}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">
                          ৳ {toBengaliNumber(row.retail_avg)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
