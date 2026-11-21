// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  AlertCircle,
  UserPlus
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Dynamic registration status state
  const [canRegister, setCanRegister] = useState(false);
  const [isFirstSetup, setIsFirstSetup] = useState(false);

  const { login, isAuthenticated, isLoading, apiBaseUrl } = useAdminAuth();
  const router = useRouter();

  // If already logged in, redirect straight to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  // Check if registration is open or first-time setup
  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/api/admin/registration-status`);
        if (res.data?.success) {
          setCanRegister(Boolean(res.data.canRegister));
          setIsFirstSetup(Boolean(res.data.isFirstSetup));
        }
      } catch (err) {
        console.error("Error fetching registration status:", err);
      }
    };

    checkRegistrationStatus();
  }, [apiBaseUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("দয়া করে ইমেইল এবং পাসওয়ার্ড দুটিই পূরণ করুন।");
      return;
    }

    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.message || "ভুল ইমেইল অথবা পাসওয়ার্ড।");
    }
  };

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

      {/* Main Login Card */}
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
          <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
            <span>নিরাপদ বাজারদর কন্ট্রোল প্যানেল</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-2">
            অ্যাডমিন লগইন
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            বাজারদর, পণ্য ও এক্সটার্নাল API পরিচালনা করতে সাইন ইন করুন
          </p>
        </div>

        {/* First Setup Banner if 0 Admins */}
        {isFirstSetup && (
          <div className="mb-5 bg-amber-50 border border-amber-300 rounded-2xl p-3 text-xs text-amber-900 flex items-center justify-between gap-2 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span className="font-bold">সিস্টেমে কোনো অ্যাডমিন নেই। প্রথম মাস্টার অ্যাডমিন সেটআপ প্রয়োজন।</span>
            </div>
            <Link
              href="/admin/register"
              className="font-black text-xs text-amber-800 underline hover:text-amber-950 shrink-0"
            >
              সেটআপ →
            </Link>
          </div>
        )}

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-5 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold p-3 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>অ্যাডমিন ইমেইল</span>
            </label>
            <div className="relative">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="আপনার অ্যাডমিন ইমেইল"
                className="h-11 rounded-xl bg-slate-50 text-sm font-semibold pl-3.5 focus-visible:ring-green-600"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>পাসওয়ার্ড</span>
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
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 rounded-xl bg-slate-50 text-sm font-semibold pl-3.5 pr-10 focus-visible:ring-green-600"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-11 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-sm shadow-md gap-2 cursor-pointer mt-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>যাচাই করা হচ্ছে...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>লগইন করুন</span>
              </>
            )}
          </Button>

        </form>

        {/* Conditional Register Link - ONLY SHOWS IF REGISTRATION IS OPEN OR FIRST-TIME SETUP */}
        {canRegister && (
          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            {isFirstSetup ? "সিস্টেমের কোনো অ্যাডমিন নেই? " : "নতুন অ্যাডমিন অ্যাকাউন্ট তৈরি করতে চান? "}
            <Link
              href="/admin/register"
              className="font-bold text-green-700 hover:underline inline-flex items-center gap-1"
            >
              <span>{isFirstSetup ? "প্রথম মাস্টার অ্যাডমিন সেটআপ করুন" : "নতুন অ্যাডমিন অ্যাকাউন্ট তৈরি করুন"}</span>
              <span>→</span>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
