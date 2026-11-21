// @ts-nocheck
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const SiteSettingsContext = createContext(null);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Helper to format full URL with cache buster
export function resolveAssetUrl(url, timestamp = "") {
  if (!url) return "";
  let fullUrl = url;
  if (!fullUrl.startsWith("http")) {
    if (fullUrl.startsWith("/uploads")) {
      fullUrl = `${API_BASE_URL}${fullUrl}`;
    }
  }
  if (timestamp) {
    const separator = fullUrl.includes("?") ? "&" : "?";
    return `${fullUrl}${separator}v=${timestamp}`;
  }
  return fullUrl;
}

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    logoUrl: "/images/najjo-dam-logo.svg",
    faviconUrl: "/images/najjo-dam-favicon.svg",
    isAdminRegistrationOpen: false,
    updatedAt: null
  });
  const [timestamp, setTimestamp] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/public/site-settings?_t=${Date.now()}`);
      if (res.data?.success && res.data?.data) {
        setSettings(res.data.data);
        setTimestamp(Date.now());
      }
    } catch (err) {
      console.debug("[SiteSettings] Using fallback defaults:", err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();

    // Listen to custom window event dispatched whenever branding is updated
    const handleUpdate = () => {
      fetchSettings();
    };

    window.addEventListener("site-settings-updated", handleUpdate);
    return () => {
      window.removeEventListener("site-settings-updated", handleUpdate);
    };
  }, [fetchSettings]);

  const refreshSettings = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/public/site-settings?_t=${Date.now()}`);
      if (res.data?.success && res.data?.data) {
        setSettings(res.data.data);
        setTimestamp(Date.now());
      }
    } catch (err) {
      console.debug("[SiteSettings] Error refreshing:", err.message);
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("site-settings-updated"));
    }
  }, []);

  const resolvedLogoUrl = resolveAssetUrl(settings.logoUrl || "/images/najjo-dam-logo.svg", timestamp);
  const resolvedFaviconUrl = resolveAssetUrl(settings.faviconUrl || "/images/najjo-dam-favicon.svg", timestamp);

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        logoUrl: resolvedLogoUrl,
        faviconUrl: resolvedFaviconUrl,
        rawLogoUrl: settings.logoUrl,
        rawFaviconUrl: settings.faviconUrl,
        timestamp,
        isLoading,
        refreshSettings,
        apiBaseUrl: API_BASE_URL
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error("useSiteSettings must be used within a SiteSettingsProvider");
  }
  return context;
}
