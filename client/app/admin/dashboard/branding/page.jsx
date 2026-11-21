// @ts-nocheck
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Palette,
  Upload,
  Trash2,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  Globe,
  Sparkles,
  Info,
  ShieldCheck,
  ExternalLink
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

export default function BrandingManagementPage() {
  const { authAxios, apiBaseUrl } = useAdminAuth();

  // Settings state
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    logoUrl: "/images/najjo-dam-logo.svg",
    faviconUrl: "/images/najjo-dam-favicon.svg"
  });

  // Logo upload state
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [resettingLogo, setResettingLogo] = useState(false);
  const logoInputRef = useRef(null);

  // Favicon upload state
  const [faviconFile, setFaviconFile] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(null);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [resettingFavicon, setResettingFavicon] = useState(false);
  const faviconInputRef = useRef(null);

  // Feedback notifications
  const [feedback, setFeedback] = useState(null);

  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: null, // "logo" | "favicon"
    title: "",
    description: ""
  });

  // Resolve image URL helper
  const resolveUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const base = apiBaseUrl || "http://localhost:5000";
    if (path.startsWith("/uploads")) return `${base}${path}`;
    return path;
  };

  // 1. Fetch current settings from backend
  const loadSettings = async () => {
    try {
      setLoading(true);
      const res = await authAxios.get("/api/admin/site-settings");
      if (res.data?.success && res.data?.data) {
        setSettings(res.data.data);
      }
    } catch (err) {
      console.error("Error loading branding settings:", err);
      setFeedback({
        type: "error",
        message: err.response?.data?.message || "ব্র্যান্ডিং সেটিংস লোড করতে ব্যর্থ হয়েছে।"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // Handle Logo file selection
  const handleLogoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFeedback({
          type: "error",
          message: "লোগো ফাইলের আকার সর্বোচ্চ ৫ মেগাবাইট (5 MB) হতে পারবে।"
        });
        return;
      }
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
      setFeedback(null);
    }
  };

  // Handle Favicon file selection
  const handleFaviconSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFeedback({
          type: "error",
          message: "ফ্যাভিকন ফাইলের আকার সর্বোচ্চ ২ মেগাবাইট (2 MB) হতে পারবে।"
        });
        return;
      }
      setFaviconFile(file);
      setFaviconPreview(URL.createObjectURL(file));
      setFeedback(null);
    }
  };

  // Upload Logo
  const handleUploadLogo = async () => {
    if (!logoFile) return;

    try {
      setUploadingLogo(true);
      setFeedback(null);
      const formData = new FormData();
      formData.append("logo", logoFile);

      const res = await authAxios.post("/api/admin/site-settings/logo", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.data?.success) {
        setSettings(res.data.data);
        setLogoFile(null);
        setLogoPreview(null);
        if (logoInputRef.current) logoInputRef.current.value = "";
        setFeedback({
          type: "success",
          message: res.data.message || "ওয়েবসাইট লোগো সফলভাবে আপডেট হয়েছে!"
        });
      }
    } catch (err) {
      console.error("Error uploading logo:", err);
      setFeedback({
        type: "error",
        message: err.response?.data?.message || "লোগো আপলোড ব্যর্থ হয়েছে।"
      });
    } finally {
      setUploadingLogo(false);
    }
  };

  // Reset Logo to Default
  const handleResetLogo = async () => {
    try {
      setResettingLogo(true);
      setFeedback(null);
      const res = await authAxios.delete("/api/admin/site-settings/logo");
      if (res.data?.success) {
        setSettings(res.data.data);
        setLogoFile(null);
        setLogoPreview(null);
        if (logoInputRef.current) logoInputRef.current.value = "";
        setFeedback({
          type: "success",
          message: "লোগো সফলভাবে ডিফল্ট সিস্টেমে ফিরিয়ে আনা হয়েছে।"
        });
      }
    } catch (err) {
      console.error("Error resetting logo:", err);
      setFeedback({
        type: "error",
        message: err.response?.data?.message || "লোগো রিসেট করতে সমস্যা হয়েছে।"
      });
    } finally {
      setResettingLogo(false);
      setConfirmDialog({ open: false, type: null, title: "", description: "" });
    }
  };

  // Upload Favicon
  const handleUploadFavicon = async () => {
    if (!faviconFile) return;

    try {
      setUploadingFavicon(true);
      setFeedback(null);
      const formData = new FormData();
      formData.append("favicon", faviconFile);

      const res = await authAxios.post("/api/admin/site-settings/favicon", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.data?.success) {
        setSettings(res.data.data);
        setFaviconFile(null);
        setFaviconPreview(null);
        if (faviconInputRef.current) faviconInputRef.current.value = "";
        setFeedback({
          type: "success",
          message: res.data.message || "ওয়েবসাইট ফ্যাভিকন সফলভাবে আপডেট হয়েছে!"
        });
      }
    } catch (err) {
      console.error("Error uploading favicon:", err);
      setFeedback({
        type: "error",
        message: err.response?.data?.message || "ফ্যাভিকন আপলোড ব্যর্থ হয়েছে।"
      });
    } finally {
      setUploadingFavicon(false);
    }
  };

  // Reset Favicon to Default
  const handleResetFavicon = async () => {
    try {
      setResettingFavicon(true);
      setFeedback(null);
      const res = await authAxios.delete("/api/admin/site-settings/favicon");
      if (res.data?.success) {
        setSettings(res.data.data);
        setFaviconFile(null);
        setFaviconPreview(null);
        if (faviconInputRef.current) faviconInputRef.current.value = "";
        setFeedback({
          type: "success",
          message: "ফ্যাভিকন সফলভাবে ডিফল্ট সিস্টেমে ফিরিয়ে আনা হয়েছে।"
        });
      }
    } catch (err) {
      console.error("Error resetting favicon:", err);
      setFeedback({
        type: "error",
        message: err.response?.data?.message || "ফ্যাভিকন রিসেট করতে সমস্যা হয়েছে।"
      });
    } finally {
      setResettingFavicon(false);
      setConfirmDialog({ open: false, type: null, title: "", description: "" });
    }
  };

  const isCustomLogo = settings.logoUrl && settings.logoUrl.startsWith("/uploads");
  const isCustomFavicon = settings.faviconUrl && settings.faviconUrl.startsWith("/uploads");

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-green-700" />
        <span className="text-sm font-semibold">ব্র্যান্ডিং সেটিংস লোড হচ্ছে...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-50 text-green-700 rounded-xl">
              <Palette className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              লোগো ও ফ্যাভিকন ম্যানেজমেন্ট
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            ওয়েবসাইটের মূল ব্র্যান্ড লোগো এবং ব্রাউজার ফ্যাভিকন আপলোড, পরিবর্তন অথবা ডিফল্ট রিসেট করুন।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 gap-1.5 py-1 px-3 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>লাইভ অটো-রিসাইজ নিশ্চিত</span>
          </Badge>
        </div>
      </div>

      {/* Global Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between gap-3 text-sm font-medium animate-in fade-in duration-200 ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-xs font-bold underline opacity-80 hover:opacity-100 cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      )}

      {/* 2-Card Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ======================================================== */}
        {/* CARD 1: ওয়েবসাইট লোগো (Website Logo)                    */}
        {/* ======================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between">
          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-green-700" />
                <h2 className="text-base font-bold text-slate-800">
                  ওয়েবসাইট লোগো (Main Logo)
                </h2>
              </div>
              <Badge
                className={
                  isCustomLogo
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-100 text-slate-600 border border-slate-200"
                }
              >
                {isCustomLogo ? "কাস্টম আপলোড" : "ডিফল্ট সিস্টেম লোগো"}
              </Badge>
            </div>

            {/* Live Preview Box with Fixed Constraint */}
            <div className="my-5">
              <label className="text-xs font-bold text-slate-600 block mb-2">
                বর্তমান লোগো ডিসপ্লে প্রিভিউ:
              </label>
              <div className="w-full h-28 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-4 flex items-center justify-center relative overflow-hidden group">
                <div className="h-16 max-w-[220px] flex items-center justify-center">
                  <img
                    src={logoPreview || resolveUrl(settings.logoUrl)}
                    alt="লোগো প্রিভিউ"
                    className="max-h-16 max-w-[220px] object-contain transition-transform group-hover:scale-105"
                  />
                </div>
                {logoPreview && (
                  <span className="absolute bottom-1 right-2 text-[10px] font-bold text-amber-700 bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-300">
                    নতুন সিলেক্টেড প্রিভিউ
                  </span>
                )}
              </div>
            </div>

            {/* Format Instructions */}
            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-500 space-y-1 mb-5 border border-slate-100">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <Info className="w-3.5 h-3.5 text-green-700 shrink-0" />
                <span>ফরমেট ও সাইজ নির্দেশিকা:</span>
              </div>
              <p>• সমর্থিত ফাইল: <strong>JPG, PNG, WEBP, SVG</strong></p>
              <p>• সর্বোচ্চ ফাইল সাইজ: <strong>5 MB</strong></p>
              <p>• প্রস্তাবিত রেজোলিউশন: <strong>200x50</strong> বা <strong>240x60 পিক্সেল</strong> (স্বচ্ছ ব্যাকগ্রাউন্ড প্রযোজ্য)</p>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={logoInputRef}
              onChange={handleLogoSelect}
              accept=".jpg,.jpeg,.png,.webp,.svg,image/jpeg,image/png,image/webp,image/svg+xml"
              className="hidden"
            />

            {/* Select File Info */}
            {logoFile && (
              <div className="mb-4 p-2.5 rounded-lg bg-green-50/70 border border-green-200 text-xs text-green-800 flex items-center justify-between">
                <span className="truncate max-w-[200px] font-semibold">{logoFile.name}</span>
                <span className="text-[11px] opacity-75">{(logoFile.size / 1024).toFixed(1)} KB</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
            {!logoFile ? (
              <Button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                className="flex-1 bg-green-700 hover:bg-green-800 text-white font-bold text-xs rounded-xl h-10 gap-1.5 cursor-pointer shadow-xs"
              >
                <Upload className="w-4 h-4" />
                <span>নতুন লোগো বেছে নিন</span>
              </Button>
            ) : (
              <div className="flex-1 flex gap-2">
                <Button
                  type="button"
                  disabled={uploadingLogo}
                  onClick={handleUploadLogo}
                  className="flex-1 bg-green-700 hover:bg-green-800 text-white font-bold text-xs rounded-xl h-10 gap-1.5 cursor-pointer shadow-xs"
                >
                  {uploadingLogo ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>আপলোড হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>আপলোড ও সেভ করুন</span>
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setLogoFile(null);
                    setLogoPreview(null);
                    if (logoInputRef.current) logoInputRef.current.value = "";
                  }}
                  className="text-xs rounded-xl h-10 font-bold border-slate-200 text-slate-600 cursor-pointer"
                >
                  বাতিল
                </Button>
              </div>
            )}

            {isCustomLogo && !logoFile && (
              <Button
                type="button"
                variant="outline"
                disabled={resettingLogo}
                onClick={() =>
                  setConfirmDialog({
                    open: true,
                    type: "logo",
                    title: "ডিফল্ট লোগো রিসেট নিশ্চিতকরণ",
                    description:
                      "আপনি কি আপলোডকৃত কাস্টম লোগো মুছে ফেলে মূল সিস্টেম ডিফল্ট লোগোতে ফিরে যেতে চান?"
                  })
                }
                className="border-red-200 text-red-600 hover:bg-red-50 text-xs rounded-xl h-10 font-bold gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ডিফল্ট রিসেট</span>
              </Button>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* CARD 2: ওয়েবসাইট ফ্যাভিকন (Browser Favicon)             */}
        {/* ======================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between">
          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-600" />
                <h2 className="text-base font-bold text-slate-800">
                  ব্রাউজার ফ্যাভিকন (Tab Icon)
                </h2>
              </div>
              <Badge
                className={
                  isCustomFavicon
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-100 text-slate-600 border border-slate-200"
                }
              >
                {isCustomFavicon ? "কাস্টম ফ্যাভিকন" : "ডিফল্ট ফ্যাভিকন"}
              </Badge>
            </div>

            {/* Live Preview Box & Simulated Browser Tab */}
            <div className="my-5 space-y-3">
              <label className="text-xs font-bold text-slate-600 block">
                ব্রাউজার ট্যাব প্রিভিউ:
              </label>

              {/* Simulated Browser Chrome Tab Mockup */}
              <div className="bg-slate-100 rounded-xl p-2.5 border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-1.5 mb-1.5 px-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="bg-white rounded-lg px-3 py-1.5 flex items-center gap-2 max-w-[240px] shadow-xs border border-slate-200">
                  <div className="w-4 h-4 shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={faviconPreview || resolveUrl(settings.faviconUrl)}
                      alt="Favicon"
                      className="w-4 h-4 object-contain"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 truncate">
                    ন্যায্য দাম - কৃষকের বাজারদর
                  </span>
                </div>
              </div>

              {/* Square Preview Display */}
              <div className="flex items-center gap-4 p-3 bg-slate-50/70 rounded-xl border border-dashed border-slate-300">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2 shadow-xs shrink-0">
                  <img
                    src={faviconPreview || resolveUrl(settings.faviconUrl)}
                    alt="Favicon Square Preview"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="text-xs text-slate-500">
                  <p className="font-bold text-slate-700">বর্গাকার ডিসপ্লে (Square Preview)</p>
                  <p className="text-[11px] mt-0.5">সবগুলো আধুনিক ব্রাউজার এবং মোবাইল বুকমার্কে দৃশ্যমান হবে।</p>
                </div>
              </div>
            </div>

            {/* Format Instructions */}
            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-500 space-y-1 mb-5 border border-slate-100">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>ফরমেট ও সাইজ নির্দেশিকা:</span>
              </div>
              <p>• সমর্থিত ফাইল: <strong>SVG, PNG, ICO, WEBP, JPG</strong></p>
              <p>• সর্বোচ্চ ফাইল সাইজ: <strong>2 MB</strong></p>
              <p>• প্রস্তাবিত অনুপাত: <strong>1:1 (বর্গাকার, 32x32 বা 64x64 পিক্সেল)</strong></p>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={faviconInputRef}
              onChange={handleFaviconSelect}
              accept=".jpg,.jpeg,.png,.webp,.svg,.ico,image/jpeg,image/png,image/webp,image/svg+xml,image/x-icon"
              className="hidden"
            />

            {/* Select File Info */}
            {faviconFile && (
              <div className="mb-4 p-2.5 rounded-lg bg-green-50/70 border border-green-200 text-xs text-green-800 flex items-center justify-between">
                <span className="truncate max-w-[200px] font-semibold">{faviconFile.name}</span>
                <span className="text-[11px] opacity-75">{(faviconFile.size / 1024).toFixed(1)} KB</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
            {!faviconFile ? (
              <Button
                type="button"
                onClick={() => faviconInputRef.current?.click()}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl h-10 gap-1.5 cursor-pointer shadow-xs"
              >
                <Upload className="w-4 h-4" />
                <span>নতুন ফ্যাভিকন বেছে নিন</span>
              </Button>
            ) : (
              <div className="flex-1 flex gap-2">
                <Button
                  type="button"
                  disabled={uploadingFavicon}
                  onClick={handleUploadFavicon}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl h-10 gap-1.5 cursor-pointer shadow-xs"
                >
                  {uploadingFavicon ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>আপলোড হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>আপলোড ও সেভ করুন</span>
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFaviconFile(null);
                    setFaviconPreview(null);
                    if (faviconInputRef.current) faviconInputRef.current.value = "";
                  }}
                  className="text-xs rounded-xl h-10 font-bold border-slate-200 text-slate-600 cursor-pointer"
                >
                  বাতিল
                </Button>
              </div>
            )}

            {isCustomFavicon && !faviconFile && (
              <Button
                type="button"
                variant="outline"
                disabled={resettingFavicon}
                onClick={() =>
                  setConfirmDialog({
                    open: true,
                    type: "favicon",
                    title: "ডিফল্ট ফ্যাভিকন রিসেট নিশ্চিতকরণ",
                    description:
                      "আপনি কি আপলোডকৃত কাস্টম ফ্যাভিকন মুছে ফেলে মূল সিস্টেম ডিফল্ট ফ্যাভিকনে ফিরে যেতে চান?"
                  })
                }
                className="border-red-200 text-red-600 hover:bg-red-50 text-xs rounded-xl h-10 font-bold gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ডিফল্ট রিসেট</span>
              </Button>
            )}
          </div>
        </div>

      </div>

      {/* Confirmation Modal */}
      <Dialog
        open={confirmDialog.open}
        onOpenChange={(open) => {
          if (!open) setConfirmDialog({ open: false, type: null, title: "", description: "" });
        }}
      >
        <DialogContent className="max-w-md bg-white rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-amber-600" />
              <span>{confirmDialog.title}</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 mt-2">
              {confirmDialog.description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex flex-row justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={resettingLogo || resettingFavicon}
              onClick={() => setConfirmDialog({ open: false, type: null, title: "", description: "" })}
              className="text-xs rounded-xl font-bold cursor-pointer"
            >
              বাতিল
            </Button>
            <Button
              type="button"
              disabled={resettingLogo || resettingFavicon}
              onClick={() => {
                if (confirmDialog.type === "logo") handleResetLogo();
                else if (confirmDialog.type === "favicon") handleResetFavicon();
              }}
              className="bg-red-600 hover:bg-red-700 text-white text-xs rounded-xl font-bold cursor-pointer"
            >
              {(resettingLogo || resettingFavicon) ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
                  <span>রিসেট হচ্ছে...</span>
                </>
              ) : (
                "হ্যাঁ, রিসেট করুন"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
