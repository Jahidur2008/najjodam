// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Crown,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  LockKeyhole
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function AdminRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [statusLoading, setStatusLoading] = useState(true);
  const [canRegister, setCanRegister] = useState(false);
  const [isFirstSetup, setIsFirstSetup] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { register, isAuthenticated, isLoading, apiBaseUrl } = useAdminAuth();
  const router = useRouter();

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  // Check dynamic registration status
  useEffect(() => {
    const checkStatus = async () => {
      try {
        setStatusLoading(true);
        const res = await axios.get(`${apiBaseUrl}/api/admin/registration-status`);
        if (res.data?.success) {
          setCanRegister(Boolean(res.data.canRegister));
          setIsFirstSetup(Boolean(res.data.isFirstSetup));
        } else {
          setCanRegister(false);
        }
      } catch (err) {
        console.error("Error checking registration status:", err);
        setCanRegister(false);
      } finally {
        setStatusLoading(false);
      }
    };

    checkStatus();
  }, [apiBaseUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !email.trim() || !password) {
      setErrorMessage("দয়া করে নাম, ইমেইল এবং পাসওয়ার্ড সবগুলো ফিল্ডই পূরণ করুন।");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("পাসওয়ার্ড ন্যূনতম ৬ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড দুটি মেলেনি।");
      return;
    }

    setSubmitting(true);
    const result = await register(name, email, password);
    setSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  if (statusLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-950 to-slate-900 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 text-white">
          <Loader2 className="w-8 h-8 animate-spin text-green-500" />
          <span className="text-sm font-semibold">স্ট্যাটাস যাচাই করা হচ্ছে...</span>
        </div>
      </div>
    );
  }

  // If registration is currently locked
  if (!canRegister) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-950 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-center relative z-10">
          <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-4 text-rose-600">
            <LockKeyhole className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2">
            অ্যাডমিন রেজিস্ট্রেশন বন্ধ আছে
          </h2>
          <p className="text-xs text-slate-600 font-medium leading-relaxed mb-6">
            পাবলিক অ্যাডমিন রেজিস্ট্রেশন বর্তমানে নিষ্ক্রিয় রয়েছে। শুধুমাত্র মাস্টার অ্যাডমিন অ্যাক্সেস কন্ট্রোল প্যানেল থেকে রেজিস্ট্রেশন উন্মুক্ত করলে নতুন অ্যাডমিন অ্যাকাউন্ট খোলা সম্ভব।
          </p>
          <Link href="/admin/login">
            <Button className="w-full h-11 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-sm shadow-md gap-2 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              <span>লগইন পেজে ফিরে যান</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-950 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back to public homepage */}
      <div className="w-full max-w-md mb-6 flex justify-start">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full border border-white/10 transition-colors backdrop-blur-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>মূল ওয়েবসাইটে ফিরে যান</span>
        </Link>
      </div>

      {/* Main Registration Card */}
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative z-10">
        
        {/* Brand Logo Header */}
        <div className="text-center mb-6">
          <div className="relative w-48 h-12 mx-auto mb-3">
            <Image
              src="/images/najjo-dam-logo.svg"
              alt="ন্যায্য দাম"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Setup Pill */}
          {isFirstSetup ? (
            <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-300 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full shadow-2xs">
              <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>প্রথম মাস্টার অ্যাডমিন সেটআপ</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
              <span>নতুন অ্যাডমিন রেজিস্ট্রেশন</span>
            </div>
          )}

          <h2 className="text-xl font-black text-slate-900 mt-2">
            {isFirstSetup ? "মাস্টার অ্যাডমিন অ্যাকাউন্ট তৈরি" : "অ্যাডমিন রেজিস্ট্রেশন"}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {isFirstSetup
              ? "এই অ্যাকাউন্টের মাধ্যমে আপনি প্ল্যাটফর্মের সর্বোচ্চ ক্ষমতা (মাস্টার অ্যাক্সেস) পাবেন।"
              : "প্ল্যাটফর্মের বাজারদর ও তথ্য পরিচালনার জন্য অ্যাকাউন্ট তৈরি করুন।"}
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-5 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold p-3 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>আপনার পূর্ণ নাম</span>
            </label>
            <Input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="যেমন: মোঃ আল-আমিন"
              className="h-10 rounded-xl bg-slate-50 text-sm font-semibold pl-3.5 focus-visible:ring-green-600"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>অ্যাডমিন ইমেইল</span>
            </label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="h-10 rounded-xl bg-slate-50 text-sm font-semibold pl-3.5 focus-visible:ring-green-600"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>পাসওয়ার্ড (ন্যূনতম ৬ অক্ষর)</span>
              </span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-green-700 hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                <span>{showPassword ? "লুকান" : "দেখুন"}</span>
              </button>
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-10 rounded-xl bg-slate-50 text-sm font-semibold pl-3.5 focus-visible:ring-green-600"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
              <span>পাসওয়ার্ড নিশ্চিত করুন</span>
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="h-10 rounded-xl bg-slate-50 text-sm font-semibold pl-3.5 focus-visible:ring-green-600"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-11 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-sm shadow-md gap-2 cursor-pointer mt-3"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>অ্যাকাউন্ট তৈরি হচ্ছে...</span>
              </>
            ) : (
              <>
                {isFirstSetup ? <Crown className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                <span>{isFirstSetup ? "মাস্টার অ্যাডমিন হিসেবে যোগ দিন" : "রেজিস্ট্রেশন সম্পন্ন করুন"}</span>
              </>
            )}
          </Button>

        </form>

        {/* Link back to login */}
        <div className="mt-5 text-center text-xs text-slate-600">
          ইতিমধ্যে একটি অ্যাকাউন্ট আছে?{" "}
          <Link href="/admin/login" className="font-bold text-green-700 hover:underline">
            লগইন করুন →
          </Link>
        </div>

      </div>
    </div>
  );
}
