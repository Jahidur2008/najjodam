// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import {
  ShieldAlert,
  UserCog,
  Crown,
  Users,
  UserCheck,
  UserX,
  Trash2,
  Lock,
  Unlock,
  RefreshCw,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Sparkles
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
import { toBengaliNumber } from "@/lib/api";

export default function MasterAccessControlPage() {
  const { admin, authAxios } = useAdminAuth();

  const [loading, setLoading] = useState(true);
  const [adminsList, setAdminsList] = useState([]);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch admin list & registration status
  const loadAdminsData = async () => {
    try {
      setLoading(true);
      const res = await authAxios.get("/api/admin/manage/admins");
      if (res.data?.success) {
        setAdminsList(res.data.admins || []);
        setIsRegistrationOpen(Boolean(res.data.isAdminRegistrationOpen));
      }
    } catch (err) {
      console.error("Error loading access control data:", err);
      setFeedback({
        type: "error",
        message: err.response?.data?.message || "অ্যাডমিন তালিকা লোড করতে সমস্যা হয়েছে।"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminsData();
  }, []);

  // Handle Toggle Registration
  const handleToggleRegistration = async () => {
    try {
      setToggling(true);
      setFeedback(null);
      const res = await authAxios.patch("/api/admin/manage/toggle-registration");
      if (res.data?.success) {
        setIsRegistrationOpen(Boolean(res.data.isAdminRegistrationOpen));
        setFeedback({
          type: "success",
          message: res.data.message || "রেজিস্ট্রেশন স্ট্যাটাস সফলভাবে পরিবর্তন হয়েছে।"
        });
      }
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.response?.data?.message || "রেজিস্ট্রেশন স্ট্যাটাস পরিবর্তন করতে ব্যর্থ হয়েছে।"
      });
    } finally {
      setToggling(false);
    }
  };

  // Handle Delete Sub-Admin
  const confirmDelete = async () => {
    if (!adminToDelete) return;
    try {
      setDeleting(true);
      const res = await authAxios.delete(`/api/admin/manage/admins/${adminToDelete._id}`);
      if (res.data?.success) {
        setFeedback({
          type: "success",
          message: res.data.message || "সাব-অ্যাডমিন সফলভাবে অপসারিত হয়েছে।"
        });
        setDeleteModalOpen(false);
        setAdminToDelete(null);
        loadAdminsData();
      }
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.response?.data?.message || "অ্যাডমিন মুছতে সমস্যা হয়েছে।"
      });
    } finally {
      setDeleting(false);
    }
  };

  // Guard for sub-admins who might navigate directly
  if (admin && admin.role !== "MASTER_ADMIN") {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center max-w-lg mx-auto mt-12 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900 mb-2">অনুমতি নেই (Access Restricted)</h2>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          এই পৃষ্ঠাটি শুধুমাত্র প্ল্যাটফর্মের প্রধান **মাস্টার অ্যাডমিন (MASTER_ADMIN)** এর জন্য সংরক্ষিত। আপনি একজন সাব-অ্যাডমিন হিসেবে এই নিয়ন্ত্রণ প্যানেলটি ব্যবহার করতে পারবেন না।
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* 1. Header Title & Value Proposition */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-300 text-amber-900 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>মাস্টার অ্যাডমিন এক্সক্লুসিভ প্যানেল</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            অ্যাডমিন ও অ্যাক্সেস কন্ট্রোল
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            পাবলিক অ্যাডমিন রেজিস্ট্রেশন অনুমোদন নিয়ন্ত্রণ করুন এবং সাব-অ্যাডমিন অ্যাকাউন্ট পরিচালনা করুন।
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={loadAdminsData}
          disabled={loading}
          className="self-start sm:self-auto text-xs font-bold gap-1.5 rounded-xl border-slate-200 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>রিফ্রেশ করুন</span>
        </Button>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 ${
            feedback.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-xs font-bold underline hover:opacity-75 cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      )}

      {/* 2. DYNAMIC REGISTRATION TOGGLE CARD */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black text-slate-900">
                পাবলিক অ্যাডমিন রেজিস্ট্রেশন টগল
              </span>
              <Badge
                className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                  isRegistrationOpen
                    ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                    : "bg-rose-100 text-rose-800 border-rose-300"
                }`}
              >
                {isRegistrationOpen ? (
                  <span className="flex items-center gap-1">
                    <Unlock className="w-3 h-3 text-emerald-600" />
                    <span>উন্মুক্ত (OPEN)</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-rose-600" />
                    <span>লকড (CLOSED)</span>
                  </span>
                )}
              </Badge>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {isRegistrationOpen
                ? "বর্তমানে রেজিস্ট্রেশন খোলা রয়েছে। যে কেউ /admin/login পেজ থেকে 'নতুন অ্যাডমিন অ্যাকাউন্ট তৈরি করুন' লিংকে গিয়ে সাব-অ্যাডমিন হিসেবে যুক্ত হতে পারবে।"
                : "পাবলিক রেজিস্ট্রেশন সম্পূর্ণ বন্ধ। কোনো বহিরাগত ব্যক্তি অ্যাকাউন্ট খুলতে পারবে না। নতুন কাউকে অ্যাডমিন বানাতে চাইলে নিচের সুইচ অন করুন।"}
            </p>

            <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-4 h-4 text-green-700" />
              <span>সাব-অ্যাডমিনরা কেবল পণ্য ও বাজারদর আপডেট করতে পারবে, মাস্টার প্যানেল তাদের জন্য সুরক্ষিত।</span>
            </div>
          </div>

          {/* Toggle Action Button */}
          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <Button
              onClick={handleToggleRegistration}
              disabled={toggling || loading}
              className={`h-12 px-6 rounded-2xl font-black text-sm shadow-md transition-all gap-2 cursor-pointer ${
                isRegistrationOpen
                  ? "bg-rose-600 hover:bg-rose-700 text-white"
                  : "bg-green-700 hover:bg-green-800 text-white"
              }`}
            >
              {toggling ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>পরিবর্তন হচ্ছে...</span>
                </>
              ) : isRegistrationOpen ? (
                <>
                  <Lock className="w-4 h-4" />
                  <span>রেজিস্ট্রেশন বন্ধ করুন (Lock)</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>রেজিস্ট্রেশন উন্মুক্ত করুন (Open)</span>
                </>
              )}
            </Button>
          </div>

        </div>
      </div>

      {/* 3. REGISTERED ADMINS LIST & MANAGEMENT */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        
        {/* Table Header Banner */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Users className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                নিবন্ধিত অ্যাডমিনদের তালিকা
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                সর্বমোট {toBengaliNumber(adminsList.length)} জন অ্যাডমিন প্ল্যাটফর্মে সক্রিয় রয়েছেন
              </p>
            </div>
          </div>
        </div>

        {/* Data Table */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-500 gap-2">
            <Loader2 className="w-7 h-7 animate-spin text-green-700" />
            <span className="text-xs font-semibold">অ্যাডমিন তালিকা লোড হচ্ছে...</span>
          </div>
        ) : adminsList.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-500">
            কোনো অ্যাডমিন অ্যাকাউন্ট পাওয়া যায়নি।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-600 font-bold uppercase text-[11px]">
                <tr>
                  <th className="py-3.5 px-5">অ্যাডমিনের তথ্য</th>
                  <th className="py-3.5 px-4">ইমেইল ঠিকানা</th>
                  <th className="py-3.5 px-4">পদবী / ভূমিকা (Role)</th>
                  <th className="py-3.5 px-4">তৈরির তারিখ</th>
                  <th className="py-3.5 px-5 text-right">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {adminsList.map((item) => {
                  const isMaster = item.role === "MASTER_ADMIN";
                  const isCurrentLoggedAdmin = item._id === admin?.id || item._id === admin?._id;

                  return (
                    <tr key={item._id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Name */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                            isMaster
                              ? "bg-amber-400/20 text-amber-700 border border-amber-300"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}>
                            {isMaster ? <Crown className="w-4 h-4 fill-amber-500" /> : <UserCog className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                              <span>{item.name || item.username}</span>
                              {isCurrentLoggedAdmin && (
                                <span className="text-[10px] bg-green-100 text-green-800 font-black px-1.5 py-0.2 rounded">
                                  আপনি
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400 font-normal">
                              Username: {item.username}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-4 font-semibold text-slate-700">
                        {item.email}
                      </td>

                      {/* Role Badge */}
                      <td className="py-4 px-4">
                        {isMaster ? (
                          <Badge className="bg-amber-100 text-amber-900 border-amber-300 font-extrabold text-[11px] gap-1 shadow-2xs">
                            <Crown className="w-3 h-3 text-amber-600 fill-amber-500" />
                            <span>মাস্টার অ্যাডমিন</span>
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-300 font-bold text-[11px]">
                            সাব-অ্যাডমিন (Admin)
                          </Badge>
                        )}
                      </td>

                      {/* Created At */}
                      <td className="py-4 px-4 text-slate-500 text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString("bn-BD") : "তথ্য নেই"}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right">
                        {isMaster ? (
                          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            <span>সুরক্ষিত</span>
                          </span>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setAdminToDelete(item);
                              setDeleteModalOpen(true);
                            }}
                            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 text-xs font-bold gap-1 rounded-xl cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>মুছে ফেলুন</span>
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="max-w-md p-6 rounded-3xl">
          <DialogHeader>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-2 border border-rose-200">
              <Trash2 className="w-6 h-6" />
            </div>
            <DialogTitle className="text-lg font-black text-slate-900">
              সাব-অ্যাডমিন মুছে ফেলতে চান?
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-600 leading-relaxed font-medium">
              আপনি কি নিশ্চিতভাবে{" "}
              <span className="font-extrabold text-slate-900">
                "{adminToDelete?.name || adminToDelete?.email}"
              </span>{" "}
              কে অপসারণ করতে চান? এই অ্যাকাউন্টটি মুছে ফেললে তিনি আর ড্যাশবোর্ডে লগইন করতে পারবেন না।
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteModalOpen(false);
                setAdminToDelete(null);
              }}
              disabled={deleting}
              className="rounded-xl text-xs font-bold"
            >
              বাতিল করুন
            </Button>
            <Button
              onClick={confirmDelete}
              disabled={deleting}
              className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold gap-1.5 shadow-md"
            >
              {deleting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>মুছে ফেলা হচ্ছে...</span>
                </>
              ) : (
                <span>হ্যাঁ, মুছে ফেলুন</span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
