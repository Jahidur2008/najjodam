// @ts-nocheck
"use client";

import React from "react";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import DynamicFavicon from "@/components/DynamicFavicon";

export default function ClientProviders({ children }) {
  return (
    <SiteSettingsProvider>
      <AdminAuthProvider>
        <DynamicFavicon />
        {children}
      </AdminAuthProvider>
    </SiteSettingsProvider>
  );
}
