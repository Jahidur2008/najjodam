// @ts-nocheck
"use client";

import React from "react";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import DynamicFavicon from "@/components/DynamicFavicon";

export default function ClientProviders({ children }) {
  return (
    <AdminAuthProvider>
      <DynamicFavicon />
      {children}
    </AdminAuthProvider>
  );
}
