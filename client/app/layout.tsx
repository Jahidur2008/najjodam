// @ts-nocheck
import type { Metadata } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "ন্যায্য দাম (Najjo Dam) - কৃষকের নির্ভরযোগ্য বাজারদর",
  description: "সারা বাংলাদেশের ৮টি বিভাগ, ৬৪টি জেলা ও ৪৯৫টি উপজেলার পাইকারি ও খুচরা কৃষিপণ্যের ন্যায্য বাজারদর জানুন বিনামূল্যে কোনো লগইন ছাড়াই।",
  keywords: [
    "ন্যায্য দাম",
    "কৃষকের বাজারদর",
    "বাংলাদেশের কৃষিপণ্য দর",
    "পাইকারি বাজার দর",
    "ধান চালের দাম",
    "সবজির বাজারদর",
    "Najjo Dam",
    "Bangladesh agri market price"
  ],
  icons: {
    icon: "/icon.svg",
    shortcut: "/najjo-dam-favicon.svg"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-green-100 selection:text-green-900">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
