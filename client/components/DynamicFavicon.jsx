"use client";

import { useEffect } from "react";
import axios from "axios";

export default function DynamicFavicon() {
  useEffect(() => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const fetchAndApplyFavicon = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/api/public/site-settings`);
        if (res.data?.success && res.data?.data?.faviconUrl) {
          const raw = res.data.data.faviconUrl;
          const fullFaviconUrl = raw.startsWith("http")
            ? raw
            : raw.startsWith("/uploads")
            ? `${apiBaseUrl}${raw}`
            : raw;

          // Determine mime type from extension
          let mimeType = "image/x-icon";
          if (fullFaviconUrl.endsWith(".svg")) {
            mimeType = "image/svg+xml";
          } else if (fullFaviconUrl.endsWith(".png")) {
            mimeType = "image/png";
          } else if (fullFaviconUrl.endsWith(".webp")) {
            mimeType = "image/webp";
          } else if (fullFaviconUrl.endsWith(".jpg") || fullFaviconUrl.endsWith(".jpeg")) {
            mimeType = "image/jpeg";
          }

          // Update or create standard icon
          let link = document.querySelector("link[rel='icon']");
          if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
          }
          link.href = fullFaviconUrl;
          link.type = mimeType;

          // Update or create shortcut icon
          let shortcut = document.querySelector("link[rel='shortcut icon']");
          if (!shortcut) {
            shortcut = document.createElement("link");
            shortcut.rel = "shortcut icon";
            document.head.appendChild(shortcut);
          }
          shortcut.href = fullFaviconUrl;
          shortcut.type = mimeType;
        }
      } catch (err) {
        // Fallback silently if API is offline
        console.debug("[DynamicFavicon] Using default favicon:", err.message);
      }
    };

    fetchAndApplyFavicon();
  }, []);

  return null;
}
