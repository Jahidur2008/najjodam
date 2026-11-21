// @ts-nocheck
"use client";

import React, { useEffect, useState, useTransition } from "react";
import Navbar from "@/components/Navbar";
import NoticeTicker from "@/components/NoticeTicker";
import LocationFilterBar from "@/components/LocationFilterBar";
import CategoryTabs from "@/components/CategoryTabs";
import ProductPriceCard from "@/components/ProductPriceCard";
import PriceCompareModal from "@/components/PriceCompareModal";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  fetchLocations,
  fetchNotices,
  fetchPrices,
  fetchCategories,
  toBengaliNumber
} from "@/lib/api";
import { Sprout, AlertCircle, RefreshCw, Layers } from "lucide-react";

export default function HomePage() {
  const [isPending, startTransition] = useTransition();

  // Location filter state (Default: Dhaka Division -> Dhaka District)
  const [selectedDivision, setSelectedDivision] = useState("Dhaka");
  const [selectedDistrict, setSelectedDistrict] = useState("Dhaka");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Data states
  const [locationsData, setLocationsData] = useState(null);
  const [notices, setNotices] = useState([]);
  const [prices, setPrices] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal compare state
  const [compareProduct, setCompareProduct] = useState(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // 1. Initial Load: Locations, Notices & Categories
  useEffect(() => {
    fetchLocations().then((data) => {
      if (data) setLocationsData(data);
    });

    fetchNotices().then((data) => {
      if (data) setNotices(data);
    });

    fetchCategories().then((cats) => {
      if (cats && Array.isArray(cats)) {
        const counts = {};
        cats.forEach((c) => {
          counts[c.category_bn] = c.productCount;
        });
        setCategoryCounts(counts);
      }
    });
  }, []);

  // 2. Fetch prices whenever location, category, or search changes
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);

    fetchPrices({
      division: selectedDivision,
      district: selectedDistrict,
      upazila: selectedUpazila,
      category: selectedCategory,
      search: searchQuery
    })
      .then((res) => {
        if (!isCancelled) {
          if (res?.success) {
            setPrices(res.data || []);
          } else {
            setPrices([]);
          }
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          console.error("Price loading error:", err);
          setError("বাজারদর লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
        }
      })
      .finally(() => {
        if (!isCancelled) setLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [selectedDivision, selectedDistrict, selectedUpazila, selectedCategory, searchQuery]);

  // Handlers for cascading location selection
  const handleDivisionChange = (newDivision) => {
    startTransition(() => {
      setSelectedDivision(newDivision);

      // Auto-select first district of new division
      if (locationsData?.divisions) {
        const divObj = locationsData.divisions.find(
          (d) => d.division_en.toLowerCase() === newDivision.toLowerCase()
        );
        if (divObj?.districts?.length > 0) {
          setSelectedDistrict(divObj.districts[0].district_en);
        }
      }
      setSelectedUpazila(""); // reset upazila to all
    });
  };

  const handleDistrictChange = (newDistrict) => {
    startTransition(() => {
      setSelectedDistrict(newDistrict);
      setSelectedUpazila(""); // reset upazila to all
    });
  };

  const handleUpazilaChange = (newUpazila) => {
    startTransition(() => {
      setSelectedUpazila(newUpazila);
    });
  };

  // Reset to default Dhaka baseline
  const handleResetToDhaka = () => {
    startTransition(() => {
      setSelectedDivision("Dhaka");
      setSelectedDistrict("Dhaka");
      setSelectedUpazila("");
      setSelectedCategory("");
      setSearchQuery("");
    });
  };

  // Open modal
  const handleOpenCompare = (product) => {
    setCompareProduct(product);
    setIsCompareOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      
      {/* 1. Live Urgent Notice Ticker */}
      <NoticeTicker initialNotices={notices} />

      {/* 2. Sticky Glassmorphic Navbar */}
      <Navbar onResetToDhaka={handleResetToDhaka} />

      {/* 3. Hero Section with 3-Level Cascading Location Filter */}
      <LocationFilterBar
        locationsData={locationsData}
        selectedDivision={selectedDivision}
        selectedDistrict={selectedDistrict}
        selectedUpazila={selectedUpazila}
        searchQuery={searchQuery}
        onDivisionChange={handleDivisionChange}
        onDistrictChange={handleDistrictChange}
        onUpazilaChange={handleUpazilaChange}
        onSearchChange={setSearchQuery}
        totalResultsCount={prices.length}
      />

      {/* 4. 9-Category Interactive Pill Tabs */}
      <CategoryTabs
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
      />

      {/* 5. Main Content: Price Cards Grid */}
      <main className="container mx-auto px-4 sm:px-6 py-8 flex-1">
        
        {/* Results Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Sprout className="w-6 h-6 text-green-700" />
              <span>
                {selectedCategory ? `${selectedCategory} এর বাজারদর` : "সকল কৃষিপণ্যের বাজারদর"}
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {prices.length > 0
                ? `${toBengaliNumber(prices.length)} টি পণ্যের যাচাইকৃত পাইকারি ও খুচরা দর দেখানো হচ্ছে`
                : "দর তালিকা হালনাগাদ হচ্ছে"}
            </p>
          </div>

          {/* Quick Active Filter Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {(selectedCategory || searchQuery || selectedUpazila) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory("");
                  setSearchQuery("");
                  setSelectedUpazila("");
                }}
                className="text-xs font-semibold text-slate-500 hover:text-red-600 gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>ফিল্টার মুছুন</span>
              </Button>
            )}
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4">
                <Skeleton className="w-full h-44 rounded-xl" />
                <Skeleton className="h-6 w-3/4 rounded-md" />
                <Skeleton className="h-16 w-full rounded-xl" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* Error Notification */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-6 text-center max-w-lg mx-auto my-12">
            <AlertCircle className="w-10 h-10 text-red-600 mx-auto mb-2" />
            <h3 className="text-base font-bold mb-1">{error}</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleResetToDhaka()}
              className="mt-3 text-xs font-bold border-red-300"
            >
              ঢাকার মূল দর তালিকায় ফিরে যান
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && prices.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center mx-auto mb-4 border border-green-100">
              <Layers className="w-8 h-8 opacity-70" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              কোনো কৃষিপণ্য পাওয়া যায়নি
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto mb-5 leading-relaxed">
              আপনার নির্বাচিত ফিল্টার বা অনুসন্ধানের সাথে মিল রেখে কোনো দর পাওয়া যায়নি। অনুগ্রহ করে বানান পরিবর্তন করুন বা অন্য ক্যাটাগরি বেছে নিন।
            </p>
            <Button
              variant="default"
              size="sm"
              onClick={handleResetToDhaka}
              className="font-bold text-xs"
            >
              সকল পণ্যের তালিকা দেখুন
            </Button>
          </div>
        )}

        {/* Product Cards Grid */}
        {!loading && !error && prices.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {prices.map((priceRecord) => (
              <ProductPriceCard
                key={priceRecord._id}
                priceRecord={priceRecord}
                onOpenCompare={handleOpenCompare}
              />
            ))}
          </div>
        )}

      </main>

      {/* 6. District Price Comparison Modal & Chart */}
      <PriceCompareModal
        product={compareProduct}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />

      {/* 7. Footer */}
      <Footer />

    </div>
  );
}
