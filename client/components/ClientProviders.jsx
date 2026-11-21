// @ts-nocheck
"use client";

import React from "react";
import { AdminAuthProvider } from "@/context/AdminAuthContext";

export default function ClientProviders({ children }) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
