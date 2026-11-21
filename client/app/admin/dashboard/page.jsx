// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Scale,
  Globe2,
  Lock,
  RefreshCw,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ArrowRight,
  ShieldAlert,
  Clock,
  Sparkles
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toBengaliNumber } from "@/lib/api";

export default function AdminDashboardPage() {
  const { authAxios } = useAdminAuth();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState(null);

  // Fetch Dashboard Stats
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const res = await authAxios.get("/api/admin/dashboard-stats");
      if (res.data?.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error("Dashboard stats error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Sync Now Trigger (calls the background sync trigger)
  const handleSyncNow = async () => {
    try {
      setSyncing(true);
      setSyncFeedback(null);

      // Call API sync trigger
      const res = await authAxios.post("/api/sync/trigger");
      if (res.data?.success) {
        setSyncFeedback({
          type: "success",
          message: "স্বয়ংক্রিয় বাজারদর সিঙ্ক অপারেশন সফলভাবে শুরু হয়েছে।"
        });
        // Reload stats
        await loadDashboardData();
      }
    } catch (err) {
      setSyncFeedback({
        type: "error",
        message: err.response?.data?.message || "API সিঙ্ক করতে সমস্যা হয়েছে।"
      });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>ড্যাশবোর্ড ওভারভিউ</span>
            <span className="text-xs bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full font-bold">
              লাইভ স্ট্যাটাস
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            সারা দেশের ৮ বিভাগ, ৬৪ জেলা ও ৪৯৫ উপজেলার বাজারদর নিয়ন্ত্রণ প্যানেল
          </p>
        </div>

        {/* Global Sync Now Action Button */}
        <div className="flex items-center gap-3">
          <Button
            onClick={handleSyncNow}
            disabled={syncing}
            className="h-11 px-5 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-xs sm:text-sm shadow-md gap-2"
          >
            {syncing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                <span>সিঙ্ক হচ্ছে...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 text-amber-300" />
                <span>এখনই API সিঙ্ক করুন (Sync Now)</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Sync Feedback Alert */}
      {syncFeedback && (
        <div
          className={`p-4 rounded-xl text-xs font-bold flex items-center justify-between border ${
            syncFeedback.type === "success"
              ? "bg-emerald-50 text-emerald-900 border-emerald-200"
              : "bg-rose-50 text-rose-900 border-rose-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {syncFeedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span>{syncFeedback.message}</span>
          </div>
          <button
            onClick={() => setSyncFeedback(null)}
            className="text-xs underline opacity-70 hover:opacity-100"
          >
            বন্ধ করুন
          </button>
        </div>
      )}

      {/* 4 Primary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: Total Products */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              মোট কৃষিজাত পণ্য
            </CardTitle>
            <div className="w-9 h-9 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">
              {loading ? "..." : toBengaliNumber(stats?.totalProducts || 0)} টি
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center justify-between">
              <span>৯টি প্রধান ক্যাটাগরি</span>
              <Link
                href="/admin/dashboard/products"
                className="text-green-700 font-bold hover:underline flex items-center gap-0.5"
              >
                পণ্য দেখুন <ArrowRight className="w-3 h-3" />
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Total Prices */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              মোট বাজারদর এন্ট্রি
            </CardTitle>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">
              {loading ? "..." : toBengaliNumber(stats?.totalPrices || 0)} টি
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center justify-between">
              <span>আওতাভুক্ত জেলা: {toBengaliNumber(stats?.coveredDistrictsCount || 0)} টি</span>
              <Link
                href="/admin/dashboard/prices"
                className="text-blue-700 font-bold hover:underline flex items-center gap-0.5"
              >
                দর দেখুন <ArrowRight className="w-3 h-3" />
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Card 3: Active APIs */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              সক্রিয় এক্সটার্নাল API
            </CardTitle>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">
              {loading ? "..." : toBengaliNumber(stats?.activeApiConfigs || 0)} টি
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center justify-between">
              <span>স্ট্যাটাস: {stats?.lastSyncStatus || "IDLE"}</span>
              <Link
                href="/admin/dashboard/api-configs"
                className="text-amber-700 font-bold hover:underline flex items-center gap-0.5"
              >
                API সেটিংস <ArrowRight className="w-3 h-3" />
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Card 4: Manual Overrides */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              ম্যানুয়াল আপডেট (লকড)
            </CardTitle>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">
              {loading ? "..." : toBengaliNumber(stats?.manualOverridesCount || 0)} টি
            </div>
            <p className="text-xs text-slate-500 mt-1">
              স্বয়ংক্রিয় সিঙ্ক এই রেকর্ডগুলো মুছবে না
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Quick Navigation Cards & Recent Manual Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Recent Manual Overrides */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>সাম্প্রতিক ম্যানুয়াল আপডেটসমূহ</span>
              </h3>
              <p className="text-xs text-slate-500">
                অ্যাডমিন কর্তৃক নির্ধারিত সংরক্ষিত বাজারদর
              </p>
            </div>
            <Link href="/admin/dashboard/prices">
              <Button variant="ghost" size="sm" className="text-xs font-bold text-green-700">
                সকল দর দেখুন
              </Button>
            </Link>
          </div>

          {stats?.recentOverrides && stats.recentOverrides.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 font-bold border-b border-slate-100 text-[11px]">
                    <th className="py-2.5 px-3">পণ্য</th>
                    <th className="py-2.5 px-3">স্থান (জেলা/উপজেলা)</th>
                    <th className="py-2.5 px-3">পাইকারি রেঞ্জ</th>
                    <th className="py-2.5 px-3">খুচরা রেঞ্জ</th>
                    <th className="py-2.5 px-3">স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stats.recentOverrides.map((row) => (
                    <tr key={row._id} className="hover:bg-slate-50 font-medium">
                      <td className="py-2.5 px-3 font-bold text-slate-900">
                        {row.product?.name_bn || "পণ্য"}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">
                        {row.district_bn} {row.upazila_bn ? `(${row.upazila_bn})` : ""}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-green-800">
                        ৳ {toBengaliNumber(row.wholesale_price_min)} - {toBengaliNumber(row.wholesale_price_max)}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700">
                        ৳ {toBengaliNumber(row.retail_price_min)} - {toBengaliNumber(row.retail_price_max)}
                      </td>
                      <td className="py-2.5 px-3">
                        <Badge className="bg-amber-100 text-amber-800 text-[10px] font-bold border-amber-300">
                          ম্যানুয়াল লকড
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              কোনো ম্যানুয়াল আপডেট এন্ট্রি নেই।
            </div>
          )}
        </div>

        {/* Right 1 Col: Quick Control Shortcuts */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-green-800 to-emerald-800 text-white p-5 rounded-2xl shadow-sm">
            <h4 className="font-extrabold text-base mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>দ্রুত বাজারদর হালনাগাদ</span>
            </h4>
            <p className="text-xs text-slate-200 mb-4 leading-relaxed">
              সরাসরি যেকোনো জেলা বা উপজেলার কৃষিপণ্যের পাইকারি দর পরিবর্তন করতে মূল্য ম্যানেজারে যান।
            </p>
            <Link href="/admin/dashboard/prices">
              <Button className="w-full bg-white text-green-900 hover:bg-slate-100 font-bold text-xs shadow-md">
                মূল্য পরিবর্তন প্যানেলে যান
              </Button>
            </Link>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <h4 className="font-extrabold text-sm text-slate-900 mb-2">
              সিস্টেম তথ্যাদি
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">সর্বশেষ সিঙ্ক:</span>
                <span className="font-bold text-slate-800">
                  {stats?.lastSyncTimestamp
                    ? new Date(stats.lastSyncTimestamp).toLocaleTimeString("bn-BD")
                    : "এখনো হয়নি"}
                </span>
              </li>
              <li className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">সিঙ্ক সময়সূচি:</span>
                <span className="font-bold text-slate-800">প্রতি ৬০ মিনিট পর পর</span>
              </li>
              <li className="flex justify-between py-1">
                <span className="text-slate-400">ডাটাবেজ ইঞ্জিন:</span>
                <span className="font-bold text-green-700">MongoDB Atlas / Mongoose</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}
