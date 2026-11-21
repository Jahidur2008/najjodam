import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PhoneCall, Heart, ShieldCheck, HelpCircle, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-auto">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="relative w-52 h-12 bg-white/10 rounded-xl p-1.5 backdrop-blur-xs inline-block">
              <Image
                src="/images/najjo-dam-logo.svg"
                alt="ন্যায্য দাম"
                fill
                className="object-contain object-left px-2 filter brightness-110"
              />
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              "ন্যায্য দাম" বাংলাদেশের প্রান্তিক কৃষক ভাইদের জন্য একটি উন্মুক্ত, সম্পূর্ণ বিনামূল্যে ব্যবহারযোগ্য প্ল্যাটফর্ম। সারা দেশের ৮টি বিভাগ, ৬৪টি জেলা ও ৪৯৫টি উপজেলার প্রতিদিনের পাইকারি ও খুচরা কৃষিপণ্যের দাম জানুন কোনো রেজিস্ট্রেশন বা অ্যাকাউন্ট ছাড়াই।
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>প্রতিদিন সকাল ৮টায় বাজারদর হালনাগাদ করা হয়</span>
            </div>
          </div>

          {/* Quick Help & Agri Services */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-green-500 pl-2">
              কৃষি সহায়তা ও তথ্য
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <a
                  href="tel:16123"
                  className="flex items-center gap-2 text-amber-300 font-bold hover:underline"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>কৃষি কল সেন্টার: ১৬১২৩</span>
                </a>
              </li>
              <li>
                <a
                  href="https://dam.gov.bd"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>কৃষি বিপণন অধিদপ্তর (DAM)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://dae.gov.bd"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>কৃষি সম্প্রসারণ অধিদপ্তর (DAE)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Platform Info */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-green-500 pl-2">
              প্ল্যাটফর্ম তথ্য
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <span>উন্মুক্ত কৃষকের বাজারদর পোর্টাল</span>
              </li>
              <li>
                <span>গোপনীয়তা ও ব্যবহারের শর্তাবলী</span>
              </li>
              <li>
                <span>সচরাচর জিজ্ঞাসা (FAQ)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>
            © ২০২৬ ন্যায্য দাম (Najjo Dam) • বাংলাদেশের কৃষক সমাজের সমৃদ্ধির লক্ষ্যে নির্মিত।
          </p>
          <p className="flex items-center justify-center gap-1">
            <span>দেশ গড়ার কারিগর আমাদের কৃষকদের প্রতি সম্মান</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          </p>
        </div>

      </div>
    </footer>
  );
}
