"use client";

import React, { useState, useMemo } from "react";
import {
  MapPin,
  Search,
  Check,
  ChevronsUpDown,
  X,
  Sparkles,
  Building2,
  Navigation
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

export default function LocationFilterBar({
  locationsData,
  selectedDivision,
  selectedDistrict,
  selectedUpazila,
  searchQuery,
  onDivisionChange,
  onDistrictChange,
  onUpazilaChange,
  onSearchChange,
  totalResultsCount = 0
}) {
  const [openDiv, setOpenDiv] = useState(false);
  const [openDist, setOpenDist] = useState(false);
  const [openUpz, setOpenUpz] = useState(false);

  // 1. Get list of divisions
  const divisions = useMemo(() => {
    return locationsData?.divisions || [];
  }, [locationsData]);

  // 2. Get districts for selected division
  const currentDistricts = useMemo(() => {
    if (!selectedDivision || !locationsData?.divisions) return [];
    const div = locationsData.divisions.find(
      (d) => (d.division_en || "").toLowerCase() === (selectedDivision || "").toLowerCase()
    );
    return div?.districts || [];
  }, [selectedDivision, locationsData]);

  // 3. Get upazilas for selected district
  const currentUpazilas = useMemo(() => {
    if (!selectedDistrict || currentDistricts.length === 0) return [];
    const dst = currentDistricts.find(
      (d) => (d.district_en || "").toLowerCase() === (selectedDistrict || "").toLowerCase()
    );
    return dst?.upazilas || [];
  }, [selectedDistrict, currentDistricts]);

  // Current active label helpers
  const currentDivObj = divisions.find(
    (d) => (d.division_en || "").toLowerCase() === (selectedDivision || "").toLowerCase()
  );
  const currentDistObj = currentDistricts.find(
    (d) => (d.district_en || "").toLowerCase() === (selectedDistrict || "").toLowerCase()
  );
  const currentUpzObj = currentUpazilas.find(
    (u) => (u.upazila_en || "").toLowerCase() === (selectedUpazila || "").toLowerCase()
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-800 text-white pt-10 pb-16 px-4 sm:px-6 shadow-xl">
      {/* Background Decorative Rings & Glow */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Hero Title & Value Proposition */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-emerald-200 text-xs sm:text-sm font-semibold mb-3 shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>সারা দেশের ৬৪ জেলার ৪৯৫টি উপজেলার লাইভ বাজারদর</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight drop-shadow-sm">
            আপনার এলাকার আজকের ফসলের <span className="text-amber-300 underline decoration-amber-400/50 decoration-wavy decoration-2">ন্যায্য বাজারদর</span> জানুন
          </h1>

          <p className="text-slate-200 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            কোনো রেজিস্ট্রেশন বা লগইন ছাড়াই মধ্যস্বত্বভোগীদের দৌরাত্ম্য এড়িয়ে যেকোনো কৃষিপণ্যের তাজা পাইকারি ও খুচরা দর যাচাই করুন।
          </p>

          {/* Active Location Indicator Badge */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-400/30 text-emerald-200 px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-md">
              <Navigation className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>বর্তমানে দেখানো হচ্ছে:</span>
              <span className="text-white font-extrabold underline decoration-amber-400">
                {currentDistObj ? currentDistObj.district_bn : "ঢাকা"} জেলা
                {currentUpzObj ? ` • ${currentUpzObj.upazila_bn} উপজেলা` : " (সকল উপজেলা)"}
              </span>
            </div>
            {totalResultsCount > 0 && (
              <Badge variant="accent" className="bg-amber-400/20 text-amber-200 border-amber-400/40 text-xs">
                {totalResultsCount} টি পণ্যের বাজারদর উপলব্ধ
              </Badge>
            )}
          </div>
        </div>

        {/* 3-Level Cascading Filter Bar Box */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-100 text-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-center">
            
            {/* 1. DIVISION SELECTOR */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-green-700" />
                <span>১. বিভাগ নির্বাচন করুন</span>
              </label>
              
              <Popover open={openDiv} onOpenChange={setOpenDiv}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openDiv}
                    className="w-full justify-between h-12 rounded-xl text-left font-bold text-sm bg-slate-50/70 border-slate-200 hover:bg-slate-100 focus:ring-green-600"
                  >
                    <span className="truncate">
                      {currentDivObj ? `${currentDivObj.division_bn} (${currentDivObj.division_en})` : "বিভাগ বাছুন..."}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="বিভাগের নাম খুঁজুন..." />
                    <CommandList>
                      <CommandEmpty>কোনো বিভাগ পাওয়া যায়নি</CommandEmpty>
                      <CommandGroup heading="৮টি বিভাগ">
                        {divisions.map((div) => {
                          const isSelected = div.division_en.toLowerCase() === selectedDivision.toLowerCase();
                          return (
                            <CommandItem
                              key={div.division_en}
                              value={`${div.division_bn} ${div.division_en}`}
                              onSelect={() => {
                                onDivisionChange(div.division_en);
                                setOpenDiv(false);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${isSelected ? "opacity-100 text-green-700" : "opacity-0"}`}
                              />
                              <span className="font-bold">{div.division_bn}</span>
                              <span className="text-xs text-slate-400 ml-1">({div.division_en})</span>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* 2. DISTRICT SELECTOR */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-green-700" />
                <span>২. জেলা নির্বাচন করুন</span>
              </label>

              <Popover open={openDist} onOpenChange={setOpenDist}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openDist}
                    className="w-full justify-between h-12 rounded-xl text-left font-bold text-sm bg-slate-50/70 border-slate-200 hover:bg-slate-100 focus:ring-green-600"
                  >
                    <span className="truncate">
                      {currentDistObj ? `${currentDistObj.district_bn} (${currentDistObj.district_en})` : "জেলা বাছুন..."}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="জেলার নাম খুঁজুন..." />
                    <CommandList>
                      <CommandEmpty>কোনো জেলা পাওয়া যায়নি</CommandEmpty>
                      <CommandGroup heading={`${currentDivObj?.division_bn || ""} বিভাগের জেলাসমূহ`}>
                        {currentDistricts.map((dst) => {
                          const isSelected = dst.district_en.toLowerCase() === selectedDistrict.toLowerCase();
                          return (
                            <CommandItem
                              key={dst.district_en}
                              value={`${dst.district_bn} ${dst.district_en}`}
                              onSelect={() => {
                                onDistrictChange(dst.district_en);
                                setOpenDist(false);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${isSelected ? "opacity-100 text-green-700" : "opacity-0"}`}
                              />
                              <span className="font-bold">{dst.district_bn}</span>
                              <span className="text-xs text-slate-400 ml-1">({dst.district_en})</span>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* 3. UPAZILA SELECTOR */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-green-700" />
                <span>৩. উপজেলা (ঐচ্ছিক)</span>
              </label>

              <Popover open={openUpz} onOpenChange={setOpenUpz}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openUpz}
                    className="w-full justify-between h-12 rounded-xl text-left font-bold text-sm bg-slate-50/70 border-slate-200 hover:bg-slate-100 focus:ring-green-600"
                  >
                    <span className="truncate">
                      {currentUpzObj
                        ? `${currentUpzObj.upazila_bn} (${currentUpzObj.upazila_en})`
                        : "সকল উপজেলা (জেলা গড়)"}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="উপজেলার নাম খুঁজুন..." />
                    <CommandList>
                      <CommandEmpty>কোনো উপজেলা পাওয়া যায়নি</CommandEmpty>
                      <CommandGroup heading="উপজেলা নির্বাচন">
                        <CommandItem
                          value="all সকল উপজেলা জেলা গড়"
                          onSelect={() => {
                            onUpazilaChange("");
                            setOpenUpz(false);
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${!selectedUpazila ? "opacity-100 text-green-700" : "opacity-0"}`}
                          />
                          <span className="font-bold text-green-800">সকল উপজেলা (জেলা ভিত্তিক দর)</span>
                        </CommandItem>
                        {currentUpazilas.map((upz) => {
                          const isSelected = upz.upazila_en.toLowerCase() === selectedUpazila.toLowerCase();
                          return (
                            <CommandItem
                              key={upz.upazila_en}
                              value={`${upz.upazila_bn} ${upz.upazila_en}`}
                              onSelect={() => {
                                onUpazilaChange(upz.upazila_en);
                                setOpenUpz(false);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${isSelected ? "opacity-100 text-green-700" : "opacity-0"}`}
                              />
                              <span className="font-medium">{upz.upazila_bn}</span>
                              <span className="text-xs text-slate-400 ml-1">({upz.upazila_en})</span>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* 4. INSTANT PRODUCT SEARCH INPUT */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Search className="w-3.5 h-3.5 text-green-700" />
                  <span>পণ্য খুঁজুন (বাংলা / ইংরেজি)</span>
                </span>
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange("")}
                    className="text-[11px] text-red-500 hover:underline flex items-center gap-0.5"
                  >
                    <X className="w-3 h-3" /> মুছুন
                  </button>
                )}
              </label>

              <div className="relative">
                <Input
                  type="text"
                  placeholder="যেমন: ধান, আলু, পেঁয়াজ, মাছ..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="h-12 pl-10 pr-9 rounded-xl border-slate-200 text-sm font-semibold focus-visible:ring-green-600 bg-slate-50/70"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-4 pointer-events-none" />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange("")}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
