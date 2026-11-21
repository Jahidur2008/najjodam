// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Scale,
  Package,
  Globe2,
  Megaphone,
  Palette,
  UserCog,
  Crown,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  User,
  Loader2
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  {
    href: "/admin/dashboard",
    label: "ড্যাশবোর্ড ওভারভিউ",
    icon: LayoutDashboard,
    exact: true
  },
  {
    href: "/admin/dashboard/prices",
    label: "বাজারদর ম্যানেজমেন্ট",
    icon: Scale
  },
  {
    href: "/admin/dashboard/products",
    label: "কৃষিজাত পণ্য ও ছবি",
    icon: Package
  },
  {
    href: "/admin/dashboard/api-configs",
    label: "এক্সটার্নাল API সেটিংস",
    icon: Globe2
  },
  {
    href: "/admin/dashboard/notices",
    label: "জরুরি নোটিশ বার",
    icon: Megaphone
  },
  {
    href: "/admin/dashboard/branding",
    label: "লোগো ও ফ্যাভিকন",
    icon: Palette
  },
  {
    href: "/admin/dashboard/access-control",
    label: "অ্যাডমিন ও অ্যাক্সেস কন্ট্রোল",
    icon: UserCog,
    masterOnly: true
  }
];

export default function AdminDashboardLayout({ children }) {
  const { admin, isAuthenticated, isLoading, logout } = useAdminAuth();
  const { logoUrl } = useSiteSettings();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authentication Guard: Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-green-500" />
          <span className="text-sm font-semibold">অ্যাডমিন প্রোফাইল লোড হচ্ছে...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Filter navigation items: Master Admin sees all; sub-admins do not see access-control
  const visibleNavItems = NAV_ITEMS.filter(
    (item) => !item.masterOnly || admin?.role === "MASTER_ADMIN"
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8FAFC]">
      
      {/* 1. Mobile Top Navigation Bar (Hidden on Desktop) */}
      <div className="lg:hidden bg-[#0F172A] text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 sticky top-0 z-50">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div
            className="relative flex items-center shrink-0"
            style={{ height: "calc(var(--spacing) * 18)" }}
          >
            <img
              src={logoUrl}
              alt="ন্যায্য দাম"
              className="h-18 w-auto max-w-[260px] object-contain filter brightness-110"
              style={{ height: "calc(var(--spacing) * 18)" }}
            />
          </div>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 shrink-0" /> : <Menu className="w-5 h-5 shrink-0" />}
        </button>
      </div>

      {/* Mobile Slide-in Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Mobile Slide-in Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0F172A] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="shrink-0 p-5 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin/dashboard" onClick={() => setMobileMenuOpen(false)}>
            <div
              className="relative flex items-center shrink-0"
              style={{ height: "calc(var(--spacing) * 18)" }}
            >
              <img
                src={logoUrl}
                alt="ন্যায্য দাম"
                className="h-18 w-auto max-w-[260px] object-contain filter brightness-110"
                style={{ height: "calc(var(--spacing) * 18)" }}
              />
            </div>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5 shrink-0" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? "bg-green-700 text-white shadow-md shadow-green-900/30 font-extrabold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-amber-300" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0 text-white/70" />}
              </Link>
            );
          })}
        </nav>

        <div className="shrink-0 p-4 border-t border-slate-800 mt-auto bg-[#0F172A] space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-emerald-300 hover:bg-slate-800/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              <span>মূল ওয়েবসাইট দেখুন</span>
            </span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">নতুন ট্যাব</span>
          </Link>

          <div className="bg-slate-800/60 rounded-xl p-3 flex items-center justify-between border border-slate-800">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                admin?.role === "MASTER_ADMIN"
                  ? "bg-amber-400/20 border border-amber-400/40 text-amber-300"
                  : "bg-green-700/30 border border-green-500/30 text-green-400"
              }`}>
                {admin?.role === "MASTER_ADMIN" ? <Crown className="w-4 h-4 fill-amber-300" /> : <User className="w-4 h-4" />}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">
                  {admin?.name || admin?.username || "অ্যাডমিন"}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {admin?.email}
                </div>
                {admin?.role === "MASTER_ADMIN" ? (
                  <span className="inline-block mt-0.5 text-[9px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full">
                    👑 Master Admin
                  </span>
                ) : (
                  <span className="inline-block mt-0.5 text-[9px] font-bold uppercase tracking-wider bg-slate-700 text-slate-300 border border-slate-600 px-1.5 py-0.5 rounded-full">
                    Admin
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={logout}
              title="লগআউট করুন"
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-1 cursor-pointer"
            >
              <LogOut className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Desktop Full-Height Sticky Sidebar (Fixed h-screen with No White Gap) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:h-screen lg:sticky lg:top-0 lg:shrink-0 bg-[#0F172A] text-white overflow-y-auto z-30">
        
        {/* Top Header with h-18 (72px) Logo */}
        <div className="shrink-0 p-4 border-b border-slate-800">
          <Link href="/admin/dashboard" className="block">
            <div
              className="relative w-full max-w-[260px] bg-white/10 rounded-2xl p-2 backdrop-blur-xs flex items-center justify-center shrink-0"
              style={{ height: "calc(var(--spacing) * 18)" }}
            >
              <img
                src={logoUrl}
                alt="ন্যায্য দাম"
                className="h-18 w-auto max-w-[260px] object-contain filter brightness-110"
                style={{ height: "calc(var(--spacing) * 18)" }}
              />
            </div>
          </Link>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 mt-3">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>ন্যায্য দাম - অ্যাডমিন ম্যানেজমেন্ট পোর্টাল</span>
          </div>
        </div>

        {/* Middle Navigation (Filtered by Master Admin Role) */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? "bg-green-700 text-white shadow-md shadow-green-900/30 font-extrabold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-amber-300" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0 text-white/70" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Footer (Pinned to Bottom with mt-auto & bg-[#0F172A]) */}
        <div className="shrink-0 p-4 border-t border-slate-800 mt-auto bg-[#0F172A] space-y-3">
          
          {/* Public site link */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-emerald-300 hover:bg-slate-800/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              <span>মূল ওয়েবসাইট দেখুন</span>
            </span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">নতুন ট্যাব</span>
          </Link>

          {/* Admin Profile Box */}
          <div className="bg-slate-800/60 rounded-xl p-3 flex items-center justify-between border border-slate-800">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                admin?.role === "MASTER_ADMIN"
                  ? "bg-amber-400/20 border border-amber-400/40 text-amber-300"
                  : "bg-green-700/30 border border-green-500/30 text-green-400"
              }`}>
                {admin?.role === "MASTER_ADMIN" ? <Crown className="w-4 h-4 fill-amber-300" /> : <User className="w-4 h-4" />}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">
                  {admin?.name || admin?.username || "অ্যাডমিন"}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {admin?.email}
                </div>
                {admin?.role === "MASTER_ADMIN" ? (
                  <span className="inline-block mt-0.5 text-[9px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full">
                    👑 Master Admin
                  </span>
                ) : (
                  <span className="inline-block mt-0.5 text-[9px] font-bold uppercase tracking-wider bg-slate-700 text-slate-300 border border-slate-600 px-1.5 py-0.5 rounded-full">
                    Admin
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={logout}
              title="লগআউট করুন"
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-1 cursor-pointer"
            >
              <LogOut className="w-4 h-4 shrink-0" />
            </button>
          </div>

        </div>

      </aside>

      {/* 3. Main Content Container (Right Side) */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Desktop Navigation Bar */}
        <header className="hidden lg:flex h-16 bg-white border-b border-slate-200 px-6 items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-sm font-extrabold text-slate-800">
              ন্যায্য দাম কন্ট্রোল সেন্টার
            </span>
            <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
              সিস্টেম সচল • ৬৪ জেলা
            </span>
            {admin?.role === "MASTER_ADMIN" && (
              <span className="text-xs bg-amber-50 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full font-black flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-600 fill-amber-500" />
                <span>মাস্টার অ্যাক্সেস</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-bold text-green-800 hover:text-green-900 bg-green-50 hover:bg-green-100 border border-green-200 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              <span>লাইভ ওয়েবসাইট</span>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="text-xs font-bold text-slate-700 hover:text-red-700 hover:border-red-300 gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 shrink-0 text-red-600" />
              <span>লগআউট</span>
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}
