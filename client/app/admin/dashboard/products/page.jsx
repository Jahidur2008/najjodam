// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Search,
  Upload,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Layers,
  Sparkles
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

const CATEGORIES = [
  { bn: "প্রধান খাদ্যশস্য", en: "Cereal Crops" },
  { bn: "অর্থকরী ফসল", en: "Cash Crops" },
  { bn: "ডালজাতীয় ফসল", en: "Pulses" },
  { bn: "তৈলবীজ ফসল", en: "Oilseeds" },
  { bn: "মসলাজাতীয় ফসল", en: "Spices" },
  { bn: "শাকসবজি ও কন্দাল ফসল", en: "Vegetables & Tubers" },
  { bn: "ফলমূল", en: "Fruits" },
  { bn: "ফুল ও শোভাবর্ধক উদ্ভিদ", en: "Flowers" },
  { bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য", en: "Allied Agricultural Products" }
];

const UNITS = ["কেজি", "হালি", "ডজন", "লিটার", "পিস", "আঁটি"];

export default function AdminProductsPage() {
  const { authAxios, apiBaseUrl } = useAdminAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    name_bn: "",
    name_en: "",
    category_bn: "প্রধান খাদ্যশস্য",
    category_en: "Cereal Crops",
    subCategory_bn: "",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "",
    isActive: true
  });

  // Load products
  const loadProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory) params.append("category", selectedCategory);
      if (searchQuery) params.append("search", searchQuery);
      params.append("limit", "300");

      const res = await authAxios.get(`/api/admin/products?${params.toString()}`);
      if (res.data?.success) {
        setProducts(res.data.data || []);
      }
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, searchQuery]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingProductId(null);
    setImageFile(null);
    setImagePreview("");
    setFormData({
      name_bn: "",
      name_en: "",
      category_bn: "প্রধান খাদ্যশস্য",
      category_en: "Cereal Crops",
      subCategory_bn: "",
      unit_bn: "কেজি",
      maundMultiplier: 40,
      image_url: "",
      isActive: true
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (p) => {
    setEditingProductId(p._id);
    setImageFile(null);
    setImagePreview(p.image_url ? (p.image_url.startsWith("http") ? p.image_url : `${apiBaseUrl}${p.image_url}`) : "");
    setFormData({
      name_bn: p.name_bn,
      name_en: p.name_en,
      category_bn: p.category_bn,
      category_en: p.category_en,
      subCategory_bn: p.subCategory_bn || "",
      unit_bn: p.unit_bn || "কেজি",
      maundMultiplier: p.maundMultiplier !== undefined ? p.maundMultiplier : 40,
      image_url: p.image_url || "",
      isActive: p.isActive !== undefined ? p.isActive : true
    });
    setIsModalOpen(true);
  };

  // Category select handler (updates both BN and EN)
  const handleCategorySelect = (catBn) => {
    const found = CATEGORIES.find((c) => c.bn === catBn);
    setFormData({
      ...formData,
      category_bn: catBn,
      category_en: found ? found.en : catBn
    });
  };

  // Unit select handler (sets maundMultiplier to 40 if কেজি, 0 otherwise)
  const handleUnitSelect = (unitBn) => {
    setFormData({
      ...formData,
      unit_bn: unitBn,
      maundMultiplier: unitBn === "কেজি" ? 40 : 0
    });
  };

  // Image file change
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Form Submit
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const payload = new FormData();
      payload.append("name_bn", formData.name_bn);
      payload.append("name_en", formData.name_en);
      payload.append("category_bn", formData.category_bn);
      payload.append("category_en", formData.category_en);
      payload.append("subCategory_bn", formData.subCategory_bn);
      payload.append("unit_bn", formData.unit_bn);
      payload.append("maundMultiplier", formData.maundMultiplier);
      payload.append("isActive", formData.isActive);

      if (imageFile) {
        payload.append("image", imageFile);
      } else if (formData.image_url) {
        payload.append("image_url", formData.image_url);
      }

      if (editingProductId) {
        const res = await authAxios.put(`/api/admin/products/${editingProductId}`, payload, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (res.data?.success) {
          setFeedback({ type: "success", message: "পণ্য সফলভাবে হালনাগাদ করা হয়েছে।" });
          setIsModalOpen(false);
          loadProducts();
        }
      } else {
        const res = await authAxios.post("/api/admin/products", payload, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (res.data?.success) {
          setFeedback({ type: "success", message: "নতুন পণ্য সফলভাবে যুক্ত করা হয়েছে।" });
          setIsModalOpen(false);
          loadProducts();
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

  // Delete product
  const handleDeleteProduct = async (id) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই পণ্যটি এবং এর সংশ্লিষ্ট সকল দর মুছে ফেলতে চান?")) return;
    try {
      const res = await authAxios.delete(`/api/admin/products/${id}`);
      if (res.data?.success) {
        setFeedback({ type: "success", message: "পণ্য এবং সংশ্লিষ্ট দর মুছে ফেলা হয়েছে।" });
        loadProducts();
      }
    } catch (err) {
      alert("পণ্য মুছে ফেলতে ব্যর্থ হয়েছে।");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Package className="w-6 h-6 text-green-700" />
            <span>কৃষিজাত পণ্য ও ছবি মাস্টার ডাটা</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            ৯টি ক্যাটাগরির সকল কৃষিপণ্য ও হাই-কোয়ালিটি ছবি পরিচালনা করুন
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="h-11 px-5 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-xs sm:text-sm shadow-md gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন পণ্য যুক্ত করুন</span>
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

      {/* Filters */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">সকল ক্যাটাগরি (৯টি)</option>
            {CATEGORIES.map((c) => (
              <option key={c.bn} value={c.bn}>
                {c.bn}
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <Input
            type="text"
            placeholder="পণ্য খুঁজুন (ধান, আলু...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 text-xs rounded-xl bg-slate-50 pl-8"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3 pointer-events-none" />
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-500">
            <Loader2 className="w-7 h-7 animate-spin text-green-700" />
            <span className="text-xs font-semibold">পণ্য তালিকা লোড হচ্ছে...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs font-medium">
            কোনো কৃষিপণ্য পাওয়া যায়নি।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4">ছবি</th>
                  <th className="py-3 px-4">বাংলা নাম</th>
                  <th className="py-3 px-4">ইংরেজি নাম</th>
                  <th className="py-3 px-4">ক্যাটাগরি</th>
                  <th className="py-3 px-4">পরিমাপের একক</th>
                  <th className="py-3 px-4">মণ গুণক</th>
                  <th className="py-3 px-4">স্ট্যাটাস</th>
                  <th className="py-3 px-4 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {products.map((p) => {
                  const imgUrl = p.image_url
                    ? p.image_url.startsWith("http")
                      ? p.image_url
                      : `${apiBaseUrl}${p.image_url}`
                    : "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=150&q=80";

                  return (
                    <tr key={p._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                          <Image src={imgUrl} alt={p.name_bn} fill className="object-cover" />
                        </div>
                      </td>
                      <td className="py-3 px-4 font-black text-slate-900 text-sm">
                        {p.name_bn}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-600">
                        {p.name_en}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-[10px] font-semibold">
                          {p.category_bn}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-800">
                        {p.unit_bn}
                      </td>
                      <td className="py-3 px-4">
                        {p.maundMultiplier === 40 ? (
                          <span className="text-green-800 font-bold text-[11px] bg-green-50 px-2 py-0.5 rounded-md border border-green-200">
                            ৪০ (১ মণ = ৪০ কেজি)
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">প্রযোজ্য নয়</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={p.isActive ? "default" : "secondary"}
                          className={`text-[10px] font-bold ${p.isActive ? "bg-green-700" : ""}`}
                        >
                          {p.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenEdit(p)}
                          className="h-8 w-8 p-0 text-slate-600 hover:text-green-700"
                          title="সম্পাদনা করুন"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProduct(p._id)}
                          className="h-8 w-8 p-0 text-slate-400 hover:text-red-600"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl rounded-3xl p-6 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Package className="w-5 h-5 text-green-700" />
              <span>{editingProductId ? "পণ্য তথ্য সম্পাদনা করুন" : "নতুন কৃষিপণ্য যুক্ত করুন"}</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              পণ্যের বাংলা/ইংরেজি নাম, ক্যাটাগরি, ইউনিট ও ছবি নির্ধারণ করুন।
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveProduct} className="space-y-4 my-2">
            
            {/* Bengali & English Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700">বাংলা নাম *</label>
                <Input
                  type="text"
                  required
                  placeholder="যেমন: গোল আলু"
                  value={formData.name_bn}
                  onChange={(e) => setFormData({ ...formData, name_bn: e.target.value })}
                  className="h-10 text-xs font-bold bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">ইংরেজি নাম *</label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. Potato"
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  className="h-10 text-xs font-bold bg-white"
                />
              </div>
            </div>

            {/* Category & Subcategory */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700">ক্যাটাগরি *</label>
                <select
                  required
                  value={formData.category_bn}
                  onChange={(e) => handleCategorySelect(e.target.value)}
                  className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.bn} value={c.bn}>
                      {c.bn} ({c.en})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">সাব-ক্যাটাগরি</label>
                <Input
                  type="text"
                  placeholder="যেমন: কন্দাল ফসল / ধান / মাছ"
                  value={formData.subCategory_bn}
                  onChange={(e) => setFormData({ ...formData, subCategory_bn: e.target.value })}
                  className="h-10 text-xs bg-white"
                />
              </div>
            </div>

            {/* Unit & Maund Multiplier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700">পরিমাপের একক *</label>
                <select
                  required
                  value={formData.unit_bn}
                  onChange={(e) => handleUnitSelect(e.target.value)}
                  className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold"
                >
                  {UNITS.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">মণ গুণক (Maund Multiplier)</label>
                <Input
                  type="number"
                  value={formData.maundMultiplier}
                  onChange={(e) => setFormData({ ...formData, maundMultiplier: Number(e.target.value) })}
                  className="h-10 text-xs font-bold bg-white"
                />
                <span className="text-[10px] text-slate-400">কেজির জন্য ৪০, অন্যান্য এককের জন্য ০</span>
              </div>
            </div>

            {/* Image Upload OR Image URL */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-green-700" />
                <span>পণ্যের ছবি আপলোড অথবা ওয়েব URL</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                {/* File picker */}
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold block mb-1">
                    ডিভাইস থেকে ছবি আপলোড করুন
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="text-xs file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-green-700 file:text-white hover:file:bg-green-800 cursor-pointer"
                  />
                </div>

                {/* External URL */}
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold block mb-1">
                    অথবা সরাসরি ছবির URL দিন
                  </label>
                  <Input
                    type="url"
                    placeholder="https://..."
                    value={formData.image_url}
                    onChange={(e) => {
                      setFormData({ ...formData, image_url: e.target.value });
                      setImagePreview(e.target.value);
                    }}
                    className="h-9 text-xs bg-white"
                  />
                </div>
              </div>

              {/* Live Preview */}
              {imagePreview && (
                <div className="mt-2 flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-300">
                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold">ছবি সফলভাবে প্রিভিউ হচ্ছে</span>
                </div>
              )}
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
