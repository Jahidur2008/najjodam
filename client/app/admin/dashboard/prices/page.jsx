// @ts-nocheck
"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import {
  Scale,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  RefreshCw,
  Building2,
  Navigation
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

export default function AdminPricesPage() {
  const { authAxios } = useAdminAuth();

  // Location hierarchy state
  const [locationsData, setLocationsData] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  // Filter states
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Data states
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [formData, setFormData] = useState({
    product: "",
    division_en: "Dhaka",
    district_en: "Dhaka",
    upazila_en: "",
    wholesale_price_min: "",
    wholesale_price_max: "",
    retail_price_min: "",
    retail_price_max: "",
    isManualOverride: true
  });

  // 1. Initial Load: Locations & Products list
  useEffect(() => {
    // Load Locations
    authAxios.get("/api/public/locations").then((res) => {
      if (res.data?.success) {
        setLocationsData(res.data.data);
      }
    });

    // Load Products for dropdown
    authAxios.get("/api/admin/products?limit=300").then((res) => {
      if (res.data?.success) {
        setAllProducts(res.data.data || []);
      }
    });
  }, [authAxios]);

  // 2. Fetch prices list with filters
  const loadPrices = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedDivision) params.append("division", selectedDivision);
      if (selectedDistrict) params.append("district", selectedDistrict);
      if (selectedUpazila) params.append("upazila", selectedUpazila);
      if (searchQuery) params.append("search", searchQuery);

      const res = await authAxios.get(`/api/admin/prices?${params.toString()}`);
      if (res.data?.success) {
        setPrices(res.data.data || []);
      }
    } catch (err) {
      console.error("Error loading prices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrices();
  }, [selectedDivision, selectedDistrict, selectedUpazila, searchQuery]);

  // Cascading location options
  const divisions = locationsData?.divisions || [];

  const filterDistricts = useMemo(() => {
    if (!selectedDivision || divisions.length === 0) return [];
    const div = divisions.find(
      (d) => (d.division_en || "").toLowerCase() === (selectedDivision || "").toLowerCase()
    );
    return div?.districts || [];
  }, [selectedDivision, divisions]);

  const filterUpazilas = useMemo(() => {
    if (!selectedDistrict || filterDistricts.length === 0) return [];
    const dst = filterDistricts.find(
      (d) => (d.district_en || "").toLowerCase() === (selectedDistrict || "").toLowerCase()
    );
    return dst?.upazilas || [];
  }, [selectedDistrict, filterDistricts]);

  // Modal Cascading Dropdowns
  const modalDistricts = useMemo(() => {
    if (!formData.division_en || divisions.length === 0) return [];
    const div = divisions.find(
      (d) => (d.division_en || "").toLowerCase() === (formData.division_en || "").toLowerCase()
    );
    return div?.districts || [];
  }, [formData.division_en, divisions]);

  const modalUpazilas = useMemo(() => {
    if (!formData.district_en || modalDistricts.length === 0) return [];
    const dst = modalDistricts.find(
      (d) => (d.district_en || "").toLowerCase() === (formData.district_en || "").toLowerCase()
    );
    return dst?.upazilas || [];
  }, [formData.district_en, modalDistricts]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingPriceId(null);
    setFormData({
      product: allProducts[0]?._id || "",
      division_en: selectedDivision || "Dhaka",
      district_en: selectedDistrict || "Dhaka",
      upazila_en: selectedUpazila || "",
      wholesale_price_min: "",
      wholesale_price_max: "",
      retail_price_min: "",
      retail_price_max: "",
      isManualOverride: true
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (price) => {
    setEditingPriceId(price._id);
    setFormData({
      product: price.product?._id || "",
      division_en: price.division_en,
      district_en: price.district_en,
      upazila_en: price.upazila_en || "",
      wholesale_price_min: price.wholesale_price_min,
      wholesale_price_max: price.wholesale_price_max,
      retail_price_min: price.retail_price_min,
      retail_price_max: price.retail_price_max,
      isManualOverride: price.isManualOverride !== undefined ? price.isManualOverride : true
    });
    setIsModalOpen(true);
  };

  // Save (Create or Update)
  const handleSavePrice = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      if (editingPriceId) {
        // Update
        const res = await authAxios.put(`/api/admin/prices/${editingPriceId}`, {
          wholesale_price_min: Number(formData.wholesale_price_min),
          wholesale_price_max: Number(formData.wholesale_price_max),
          retail_price_min: Number(formData.retail_price_min),
          retail_price_max: Number(formData.retail_price_max),
          isManualOverride: formData.isManualOverride
        });
        if (res.data?.success) {
          setFeedback({ type: "success", message: "বাজারদর সফলভাবে হালনাগাদ করা হয়েছে।" });
          setIsModalOpen(false);
          loadPrices();
        }
      } else {
        // Create / Upsert
        const res = await authAxios.post("/api/admin/prices", {
          product: formData.product,
          division_en: formData.division_en,
          district_en: formData.district_en,
          upazila_en: formData.upazila_en || "",
          wholesale_price_min: Number(formData.wholesale_price_min),
          wholesale_price_max: Number(formData.wholesale_price_max),
          retail_price_min: Number(formData.retail_price_min),
          retail_price_max: Number(formData.retail_price_max),
          isManualOverride: formData.isManualOverride
        });
        if (res.data?.success) {
          setFeedback({ type: "success", message: "নতুন বাজারদর সফলভাবে যুক্ত করা হয়েছে।" });
          setIsModalOpen(false);
          loadPrices();
        }
      }
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.response?.data?.message || "সংরক্ষণে ব্যর্থ হয়েছে।"
      });
    } finally {
      setSaving(false);
    }
  };

  // Delete Price
  const handleDeletePrice = async (id) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই দর এন্ট্রিটি মুছে ফেলতে চান?")) return;
    try {
      const res = await authAxios.delete(`/api/admin/prices/${id}`);
      if (res.data?.success) {
        setFeedback({ type: "success", message: "বাজারদর মুছে ফেলা হয়েছে।" });
        loadPrices();
      }
    } catch (err) {
      alert("মুছে ফেলতে ব্যর্থ হয়েছে।");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Scale className="w-6 h-6 text-green-700" />
            <span>বাজারদর ম্যানেজমেন্ট</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            যে কোনো বিভাগ, জেলা ও উপজেলার পাইকারি ও খুচরা কৃষিপণ্যের দর নির্ধারণ ও সম্পাদনা করুন
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="h-11 px-5 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-xs sm:text-sm shadow-md gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন দর যুক্ত করুন</span>
        </Button>
      </div>

      {/* Feedback banner */}
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

      {/* Cascading Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Division Filter */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase mb-1 block">
              বিভাগ ফিল্টার
            </label>
            <select
              value={selectedDivision}
              onChange={(e) => {
                setSelectedDivision(e.target.value);
                setSelectedDistrict("");
                setSelectedUpazila("");
              }}
              className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">সকল বিভাগ</option>
              {divisions.map((d) => (
                <option key={d.division_en} value={d.division_en}>
                  {d.division_bn} ({d.division_en})
                </option>
              ))}
            </select>
          </div>

          {/* District Filter */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase mb-1 block">
              জেলা ফিল্টার
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedUpazila("");
              }}
              disabled={!selectedDivision}
              className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-600 disabled:opacity-50"
            >
              <option value="">সকল জেলা</option>
              {filterDistricts.map((d) => (
                <option key={d.district_en} value={d.district_en}>
                  {d.district_bn} ({d.district_en})
                </option>
              ))}
            </select>
          </div>

          {/* Upazila Filter */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase mb-1 block">
              উপজেলা ফিল্টার
            </label>
            <select
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              disabled={!selectedDistrict}
              className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-600 disabled:opacity-50"
            >
              <option value="">সকল উপজেলা / জেলা গড়</option>
              {filterUpazilas.map((u) => (
                <option key={u.upazila_en} value={u.upazila_en}>
                  {u.upazila_bn} ({u.upazila_en})
                </option>
              ))}
            </select>
          </div>

          {/* Product Search */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase mb-1 block">
              পণ্য অনুসন্ধান
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="যেমন: ধান, আলু..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 text-xs rounded-xl bg-slate-50 pl-8"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      {/* Price Table View */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-500">
            <Loader2 className="w-7 h-7 animate-spin text-green-700" />
            <span className="text-xs font-semibold">বাজারদর লোড হচ্ছে...</span>
          </div>
        ) : prices.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs font-medium">
            নির্বাচিত ফিল্টারের সাথে মিল রেখে কোনো দর পাওয়া যায়নি।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4">পণ্য</th>
                  <th className="py-3 px-4">বিভাগ ও জেলা</th>
                  <th className="py-3 px-4">উপজেলা স্তর</th>
                  <th className="py-3 px-4">পাইকারি দর (টাকা)</th>
                  <th className="py-3 px-4">খুচরা দর (টাকা)</th>
                  <th className="py-3 px-4">উৎস ও স্ট্যাটাস</th>
                  <th className="py-3 px-4 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {prices.map((row) => (
                  <tr key={row._id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Product */}
                    <td className="py-3 px-4">
                      <div className="font-extrabold text-slate-900 text-sm">
                        {row.product?.name_bn || "পণ্য"}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {row.product?.name_en} • প্রতি {row.product?.unit_bn || "কেজি"}
                      </div>
                    </td>

                    {/* Division & District */}
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {row.division_bn} → {row.district_bn}
                    </td>

                    {/* Upazila */}
                    <td className="py-3 px-4">
                      {row.upazila_bn ? (
                        <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[11px] font-bold">
                          {row.upazila_bn}
                        </span>
                      ) : (
                        <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full text-[10px]">
                          জেলা ভিত্তিক গড় দর
                        </span>
                      )}
                    </td>

                    {/* Wholesale Min-Max */}
                    <td className="py-3 px-4 font-black text-green-800 text-sm">
                      ৳ {toBengaliNumber(row.wholesale_price_min)} - {toBengaliNumber(row.wholesale_price_max)}
                    </td>

                    {/* Retail Min-Max */}
                    <td className="py-3 px-4 font-bold text-slate-700">
                      ৳ {toBengaliNumber(row.retail_price_min)} - {toBengaliNumber(row.retail_price_max)}
                    </td>

                    {/* Source & Override */}
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-1 items-start">
                        <Badge
                          variant={row.source === "MANUAL_ADMIN" ? "accent" : "outline"}
                          className="text-[10px] font-bold"
                        >
                          {row.source === "MANUAL_ADMIN" ? "ম্যানুয়াল অ্যাডমিন" : "API সিঙ্ক"}
                        </Badge>
                        {row.isManualOverride && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-amber-800 font-bold">
                            <Lock className="w-2.5 h-2.5" /> লকড (ওভাররাইট হবে না)
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenEdit(row)}
                        className="h-8 w-8 p-0 text-slate-600 hover:text-green-700"
                        title="সম্পাদনা করুন"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePrice(row._id)}
                        className="h-8 w-8 p-0 text-slate-400 hover:text-red-600"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Price Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Scale className="w-5 h-5 text-green-700" />
              <span>{editingPriceId ? "বাজারদর সম্পাদনা করুন" : "নতুন বাজারদর যুক্ত করুন"}</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              নির্বাচিত এলাকার পাইকারি ও খুচরা দর নির্ধারণ করুন। সংরক্ষিত মান স্বয়ংক্রিয়ভাবে লক করা হবে।
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSavePrice} className="space-y-4 my-2">
            
            {/* Product Picker */}
            {!editingPriceId && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">কৃষিজাত পণ্য নির্বাচন করুন *</label>
                <select
                  required
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold"
                >
                  <option value="">পণ্য বাছুন...</option>
                  {allProducts.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name_bn} ({p.name_en}) - {p.category_bn}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Division, District, Upazila Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700">বিভাগ *</label>
                <select
                  required
                  disabled={!!editingPriceId}
                  value={formData.division_en}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      division_en: e.target.value,
                      district_en: "",
                      upazila_en: ""
                    })
                  }
                  className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-2 text-xs font-bold disabled:opacity-50"
                >
                  {divisions.map((d) => (
                    <option key={d.division_en} value={d.division_en}>
                      {d.division_bn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">জেলা *</label>
                <select
                  required
                  disabled={!!editingPriceId}
                  value={formData.district_en}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      district_en: e.target.value,
                      upazila_en: ""
                    })
                  }
                  className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-2 text-xs font-bold disabled:opacity-50"
                >
                  <option value="">জেলা বাছুন</option>
                  {modalDistricts.map((d) => (
                    <option key={d.district_en} value={d.district_en}>
                      {d.district_bn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">উপজেলা (ঐচ্ছিক)</label>
                <select
                  disabled={!!editingPriceId}
                  value={formData.upazila_en}
                  onChange={(e) => setFormData({ ...formData, upazila_en: e.target.value })}
                  className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-2 text-xs font-bold disabled:opacity-50"
                >
                  <option value="">জেলা গড় দর</option>
                  {modalUpazilas.map((u) => (
                    <option key={u.upazila_en} value={u.upazila_en}>
                      {u.upazila_bn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Wholesale Prices */}
            <div className="bg-green-50/70 p-3.5 rounded-xl border border-green-200 space-y-2">
              <span className="text-xs font-bold text-green-900 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5" />
                <span>পাইকারি দর (টাকা) *</span>
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold">সর্বনিম্ন পাইকারি (Min)</label>
                  <Input
                    type="number"
                    required
                    min="1"
                    placeholder="যেমন: ৪০"
                    value={formData.wholesale_price_min}
                    onChange={(e) => setFormData({ ...formData, wholesale_price_min: e.target.value })}
                    className="h-10 text-xs font-bold bg-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold">সর্বোচ্চ পাইকারি (Max)</label>
                  <Input
                    type="number"
                    required
                    min="1"
                    placeholder="যেমন: ৫০"
                    value={formData.wholesale_price_max}
                    onChange={(e) => setFormData({ ...formData, wholesale_price_max: e.target.value })}
                    className="h-10 text-xs font-bold bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Retail Prices */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800">খুচরা বাজারদর (টাকা) *</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold">সর্বনিম্ন খুচরা (Min)</label>
                  <Input
                    type="number"
                    required
                    min="1"
                    placeholder="যেমন: ৫৫"
                    value={formData.retail_price_min}
                    onChange={(e) => setFormData({ ...formData, retail_price_min: e.target.value })}
                    className="h-10 text-xs font-bold bg-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold">সর্বোচ্চ খুচরা (Max)</label>
                  <Input
                    type="number"
                    required
                    min="1"
                    placeholder="যেমন: ৬৫"
                    value={formData.retail_price_max}
                    onChange={(e) => setFormData({ ...formData, retail_price_max: e.target.value })}
                    className="h-10 text-xs font-bold bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Manual Override Lock Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isManualOverride"
                checked={formData.isManualOverride}
                onChange={(e) => setFormData({ ...formData, isManualOverride: e.target.checked })}
                className="w-4 h-4 text-green-700 rounded focus:ring-green-600"
              />
              <label htmlFor="isManualOverride" className="text-xs font-bold text-slate-800 cursor-pointer">
                ম্যানুয়াল লক নিশ্চিত করুন (পরবর্তী API সিঙ্ক এই মান পরিবর্তন করবে না)
              </label>
            </div>

            <DialogFooter className="pt-3">
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
