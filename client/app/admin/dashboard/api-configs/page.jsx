// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import {
  Globe2,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Code2,
  Clock,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { toBengaliNumber } from "@/lib/api";

export default function AdminApiConfigsPage() {
  const { authAxios } = useAdminAuth();

  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncingId, setSyncingId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConfigId, setEditingConfigId] = useState(null);
  const [headersText, setHeadersText] = useState("{}");
  const [fieldMappingText, setFieldMappingText] = useState(
    JSON.stringify(
      {
        productNameKey: "commodity_name",
        divisionKey: "division",
        districtKey: "market_district",
        upazilaKey: "market_upazila",
        wholesaleMinKey: "price_wholesale_min",
        wholesaleMaxKey: "price_wholesale_max",
        retailMinKey: "price_retail_min",
        retailMaxKey: "price_retail_max"
      },
      null,
      2
    )
  );

  const [formData, setFormData] = useState({
    providerName: "",
    apiUrl: "",
    apiKey: "",
    syncIntervalMinutes: 60,
    isActive: true
  });

  // Load API configs
  const loadConfigs = async () => {
    try {
      setLoading(true);
      const res = await authAxios.get("/api/admin/api-configs");
      if (res.data?.success) {
        setConfigs(res.data.data || []);
      }
    } catch (err) {
      console.error("Error loading API configs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConfigs();
  }, []);

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingConfigId(null);
    setHeadersText("{}");
    setFieldMappingText(
      JSON.stringify(
        {
          productNameKey: "commodity_name",
          divisionKey: "division",
          districtKey: "market_district",
          upazilaKey: "market_upazila",
          wholesaleMinKey: "price_wholesale_min",
          wholesaleMaxKey: "price_wholesale_max",
          retailMinKey: "price_retail_min",
          retailMaxKey: "price_retail_max"
        },
        null,
        2
      )
    );
    setFormData({
      providerName: "",
      apiUrl: "",
      apiKey: "",
      syncIntervalMinutes: 60,
      isActive: true
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (c) => {
    setEditingConfigId(c._id);
    setHeadersText(JSON.stringify(c.headers || {}, null, 2));
    setFieldMappingText(JSON.stringify(c.fieldMapping || {}, null, 2));
    setFormData({
      providerName: c.providerName,
      apiUrl: c.apiUrl,
      apiKey: c.apiKey || "",
      syncIntervalMinutes: c.syncIntervalMinutes || 60,
      isActive: c.isActive !== undefined ? c.isActive : true
    });
    setIsModalOpen(true);
  };

  // Form Submit
  const handleSaveConfig = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      let parsedHeaders = {};
      let parsedMapping = {};

      try {
        parsedHeaders = JSON.parse(headersText);
      } catch (e) {
        throw new Error("কাস্টম Headers একটি সঠিক JSON ফরম্যাট হতে হবে।");
      }

      try {
        parsedMapping = JSON.parse(fieldMappingText);
      } catch (e) {
        throw new Error("Field Mapping একটি সঠিক JSON ফরম্যাট হতে হবে।");
      }

      const payload = {
        providerName: formData.providerName,
        apiUrl: formData.apiUrl,
        apiKey: formData.apiKey,
        headers: parsedHeaders,
        fieldMapping: parsedMapping,
        syncIntervalMinutes: Number(formData.syncIntervalMinutes),
        isActive: formData.isActive
      };

      if (editingConfigId) {
        const res = await authAxios.put(`/api/admin/api-configs/${editingConfigId}`, payload);
        if (res.data?.success) {
          setFeedback({ type: "success", message: "API কনফিগারেশন সফলভাবে আপডেট হয়েছে।" });
          setIsModalOpen(false);
          loadConfigs();
        }
      } else {
        const res = await authAxios.post("/api/admin/api-configs", payload);
        if (res.data?.success) {
          setFeedback({ type: "success", message: "নতুন API কনফিগারেশন যুক্ত হয়েছে।" });
          setIsModalOpen(false);
          loadConfigs();
        }
      }
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.message || err.response?.data?.message || "সংরক্ষণে সমস্যা হয়েছে।"
      });
    } finally {
      setSaving(false);
    }
  };

  // Trigger Sync Now for a specific provider
  const handleSyncNow = async (id, providerName) => {
    try {
      setSyncingId(id);
      setFeedback(null);
      const res = await authAxios.post(`/api/admin/api-configs/${id}/sync-now`);
      if (res.data?.success) {
        const resultStats = res.data.result?.data;
        const msg = resultStats
          ? `${providerName} সিঙ্ক সম্পন্ন! নতুন এন্ট্রি: ${resultStats.insertedCount}, আপডেট: ${resultStats.updatedCount}, সংরক্ষিত লকড: ${resultStats.skippedManualOverrides}`
          : `${providerName} সিঙ্ক সম্পন্ন হয়েছে।`;
        setFeedback({ type: "success", message: msg });
        loadConfigs();
      }
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.response?.data?.message || `${providerName} সিঙ্ক ব্যর্থ হয়েছে।`
      });
    } finally {
      setSyncingId(null);
    }
  };

  // Delete config
  const handleDeleteConfig = async (id) => {
    if (!confirm("আপনি কি এই API কনফিগারেশনটি মুছে ফেলতে চান?")) return;
    try {
      const res = await authAxios.delete(`/api/admin/api-configs/${id}`);
      if (res.data?.success) {
        setFeedback({ type: "success", message: "API কনফিগারেশন মুছে ফেলা হয়েছে।" });
        loadConfigs();
      }
    } catch (err) {
      alert("মুছে ফেলতে সমস্যা হয়েছে।");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Globe2 className="w-6 h-6 text-green-700" />
            <span>এক্সটার্নাল বাজারদর API ইন্টিগ্রেশন ম্যানেজার</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            সরকারি কৃষি বিপণন ও পাইকারি আড়ত API-এর স্বয়ংক্রিয় সিঙ্ক ও ফিল্ড ম্যাপিং কনফিগার করুন
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="h-11 px-5 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-xs sm:text-sm shadow-md gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন API প্রোভাইডার যোগ করুন</span>
        </Button>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs font-bold flex items-center justify-between border ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-900 border-emerald-200"
              : "bg-rose-50 text-rose-900 border-rose-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="underline text-xs opacity-70">
            মুছুন
          </button>
        </div>
      )}

      {/* API Config Cards List */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-500">
          <Loader2 className="w-7 h-7 animate-spin text-green-700" />
          <span className="text-xs font-semibold">API সেটিংস লোড হচ্ছে...</span>
        </div>
      ) : configs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-xs font-medium">
          কোনো এক্সটার্নাল API কনফিগারেশন পাওয়া যায়নি।
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {configs.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-extrabold text-base text-slate-900">
                    {c.providerName}
                  </h3>
                  <Badge
                    variant={c.isActive ? "default" : "secondary"}
                    className={c.isActive ? "bg-green-700 font-bold" : "font-medium"}
                  >
                    {c.isActive ? "সক্রিয় (Active)" : "নিষ্ক্রিয়"}
                  </Badge>
                </div>

                <div className="text-xs font-mono bg-slate-50 text-slate-700 p-2.5 rounded-xl border border-slate-200 break-all mb-3">
                  {c.apiUrl}
                </div>

                {/* Telemetry info */}
                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-600">
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="text-slate-400 text-[10px] block font-bold uppercase">সিঙ্ক ব্যবধান</span>
                    <span>প্রতি {toBengaliNumber(c.syncIntervalMinutes || 60)} মিনিট</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="text-slate-400 text-[10px] block font-bold uppercase">সর্বশেষ স্ট্যাটাস</span>
                    <span
                      className={`font-bold ${
                        c.lastSyncStatus === "SUCCESS"
                          ? "text-emerald-700"
                          : c.lastSyncStatus === "FAILED"
                          ? "text-rose-600"
                          : "text-slate-700"
                      }`}
                    >
                      {c.lastSyncStatus || "IDLE"}
                    </span>
                  </div>
                </div>

                {c.lastSyncAt && (
                  <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>সর্বশেষ সফল সিঙ্ক: {new Date(c.lastSyncAt).toLocaleString("bn-BD")}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <Button
                  onClick={() => handleSyncNow(c._id, c.providerName)}
                  disabled={syncingId === c._id}
                  size="sm"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs gap-1.5"
                >
                  {syncingId === c._id ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>সিঙ্ক হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>এখনই সিঙ্ক করুন (Sync Now)</span>
                    </>
                  )}
                </Button>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenEdit(c)}
                    className="h-8 w-8 p-0 text-slate-600 hover:text-green-700"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteConfig(c._id)}
                    className="h-8 w-8 p-0 text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Config Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl rounded-3xl p-6 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-green-700" />
              <span>{editingConfigId ? "API প্রোভাইডার সম্পাদনা" : "নতুন API প্রোভাইডার যুক্তকরণ"}</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              API এন্ডপয়েন্ট, নিরাপত্তা হেডার ও JSON ফিল্ড ম্যাপিং কনফিগার করুন।
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveConfig} className="space-y-4 my-2">
            
            {/* Provider Name & URL */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">প্রোভাইডারের নাম *</label>
                <Input
                  type="text"
                  required
                  placeholder="যেমন: Department of Agricultural Marketing (DAM)"
                  value={formData.providerName}
                  onChange={(e) => setFormData({ ...formData, providerName: e.target.value })}
                  className="h-10 text-xs font-bold bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">API এন্ডপয়েন্ট URL *</label>
                <Input
                  type="url"
                  required
                  placeholder="https://dam.gov.bd/api/v1/market-prices"
                  value={formData.apiUrl}
                  onChange={(e) => setFormData({ ...formData, apiUrl: e.target.value })}
                  className="h-10 text-xs font-mono bg-white"
                />
              </div>
            </div>

            {/* API Key & Interval */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700">API Key / Token (ঐচ্ছিক)</label>
                <Input
                  type="text"
                  placeholder="Bearer token or API Key"
                  value={formData.apiKey}
                  onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                  className="h-10 text-xs font-mono bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">সিঙ্ক ব্যবধান (মিনিট)</label>
                <Input
                  type="number"
                  required
                  min="1"
                  value={formData.syncIntervalMinutes}
                  onChange={(e) => setFormData({ ...formData, syncIntervalMinutes: e.target.value })}
                  className="h-10 text-xs font-bold bg-white"
                />
              </div>
            </div>

            {/* Field Mapping JSON Editor */}
            <div>
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between mb-1">
                <span className="flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5 text-green-700" />
                  <span>JSON Field Mapping কনফিগারেশন</span>
                </span>
                <span className="text-[10px] text-slate-400">JSON Format</span>
              </label>
              <textarea
                rows={7}
                value={fieldMappingText}
                onChange={(e) => setFieldMappingText(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-900 text-emerald-400 font-mono text-xs p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <span className="text-[10px] text-slate-400">
                বহিরাগত API-এর ফিল্ডের নামের সাথে আমাদের সিস্টেমের ফিল্ডের ম্যাপিং।
              </span>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isActiveConfig"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 text-green-700 rounded focus:ring-green-600"
              />
              <label htmlFor="isActiveConfig" className="text-xs font-bold text-slate-800 cursor-pointer">
                এই API ইন্টিগ্রেশন সক্রিয় রাখুন (স্বয়ংক্রিয় ব্যাকগ্রাউন্ড সিঙ্ক চালু থাকবে)
              </label>
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="text-xs font-bold"
              >
                বাতিল
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="bg-green-700 hover:bg-green-800 text-white font-bold text-xs"
              >
                {saving ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
              </Button>
            </DialogFooter>

          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}
