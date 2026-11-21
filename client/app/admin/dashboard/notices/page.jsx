// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import {
  Megaphone,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
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

export default function AdminNoticesPage() {
  const { authAxios } = useAdminAuth();

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState(null);
  const [formData, setFormData] = useState({
    text_bn: "",
    priority: 1,
    isActive: true
  });

  // Load notices
  const loadNotices = async () => {
    try {
      setLoading(true);
      const res = await authAxios.get("/api/admin/notices");
      if (res.data?.success) {
        setNotices(res.data.data || []);
      }
    } catch (err) {
      console.error("Error loading notices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotices();
  }, []);

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingNoticeId(null);
    setFormData({
      text_bn: "",
      priority: notices.length + 1,
      isActive: true
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (n) => {
    setEditingNoticeId(n._id);
    setFormData({
      text_bn: n.text_bn,
      priority: n.priority || 1,
      isActive: n.isActive !== undefined ? n.isActive : true
    });
    setIsModalOpen(true);
  };

  // Save Notice
  const handleSaveNotice = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      if (editingNoticeId) {
        const res = await authAxios.put(`/api/admin/notices/${editingNoticeId}`, formData);
        if (res.data?.success) {
          setFeedback({ type: "success", message: "জরুরি নোটিশ সফলভাবে হালনাগাদ হয়েছে।" });
          setIsModalOpen(false);
          loadNotices();
        }
      } else {
        const res = await authAxios.post("/api/admin/notices", formData);
        if (res.data?.success) {
          setFeedback({ type: "success", message: "নতুন জরুরি নোটিশ সফলভাবে তৈরি হয়েছে।" });
          setIsModalOpen(false);
          loadNotices();
        }
      }
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.response?.data?.message || "নোটিশ সংরক্ষণে সমস্যা হয়েছে।"
      });
    } finally {
      setSaving(false);
    }
  };

  // Quick Toggle Active Status
  const handleToggleActive = async (n) => {
    try {
      const res = await authAxios.put(`/api/admin/notices/${n._id}`, {
        isActive: !n.isActive
      });
      if (res.data?.success) {
        loadNotices();
      }
    } catch (err) {
      alert("স্ট্যাটাস পরিবর্তন করতে সমস্যা হয়েছে।");
    }
  };

  // Delete Notice
  const handleDeleteNotice = async (id) => {
    if (!confirm("আপনি কি এই নোটিশটি মুছে ফেলতে চান?")) return;
    try {
      const res = await authAxios.delete(`/api/admin/notices/${id}`);
      if (res.data?.success) {
        setFeedback({ type: "success", message: "নোটিশ মুছে ফেলা হয়েছে।" });
        loadNotices();
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
            <Megaphone className="w-6 h-6 text-amber-600" />
            <span>জরুরি নোটিশ বার ও বার্তা ম্যানেজার</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            ওয়েবসাইটের শীর্ষে চলমান জরুরি কৃষি বার্তা ও ঘোষণার টেক্সট পরিচালনা করুন
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="h-11 px-5 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-xs sm:text-sm shadow-md gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন বার্তা যুক্ত করুন</span>
        </Button>
      </div>

      {/* Feedback Banner */}
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

      {/* Notices Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-500">
            <Loader2 className="w-7 h-7 animate-spin text-green-700" />
            <span className="text-xs font-semibold">নোটিশ লোড হচ্ছে...</span>
          </div>
        ) : notices.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs font-medium">
            কোনো নোটিশ পাওয়া যায়নি।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4 w-16">অগ্রাধিকার</th>
                  <th className="py-3 px-4">বার্তা টেক্সট (বাংলা)</th>
                  <th className="py-3 px-4">স্ট্যাটাস</th>
                  <th className="py-3 px-4 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {notices.map((n) => (
                  <tr key={n._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-black text-slate-900 text-center">
                      #{toBengaliNumber(n.priority || 1)}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800 text-sm max-w-xl">
                      {n.text_bn}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleActive(n)}
                        className="inline-flex items-center gap-1.5 focus:outline-none"
                      >
                        <Badge
                          variant={n.isActive ? "default" : "secondary"}
                          className={`text-[10px] font-bold cursor-pointer ${
                            n.isActive ? "bg-green-700" : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {n.isActive ? "চলমান (Active)" : "বন্ধ (Inactive)"}
                        </Badge>
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenEdit(n)}
                        className="h-8 w-8 p-0 text-slate-600 hover:text-green-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteNotice(n._id)}
                        className="h-8 w-8 p-0 text-slate-400 hover:text-red-600"
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

      {/* Add / Edit Notice Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-amber-600" />
              <span>{editingNoticeId ? "নোটিশ সম্পাদনা করুন" : "নতুন জরুরি বার্তা তৈরি"}</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              এই বার্তাটি ওয়েবসাইটের একদম শীর্ষে স্ক্রলিং টিকারে প্রদর্শিত হবে।
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveNotice} className="space-y-4 my-2">
            
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                নোটিশ বার্তা (বাংলা) *
              </label>
              <textarea
                required
                rows={3}
                placeholder="যেমন: কৃষক ভাইদের দৃষ্টি আকর্ষণ: ফসল বিক্রির পূর্বে স্থানীয় পাইকারি দর জেনে নিন..."
                value={formData.text_bn}
                onChange={(e) => setFormData({ ...formData, text_bn: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                অগ্রাধিকার ক্রম (Priority)
              </label>
              <Input
                type="number"
                min="1"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: Number(e.target.value) })}
                className="h-10 text-xs font-bold bg-white"
              />
              <span className="text-[10px] text-slate-400">ছোট সংখ্যা প্রথমে স্ক্রল করবে (যেমন: ১, ২, ৩)</span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isActiveNotice"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 text-green-700 rounded focus:ring-green-600"
              />
              <label htmlFor="isActiveNotice" className="text-xs font-bold text-slate-800 cursor-pointer">
                এই বার্তাটি বর্তমানে হোমপেজে সক্রিয় ও সচল রাখুন
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
