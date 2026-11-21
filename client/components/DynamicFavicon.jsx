// @ts-nocheck
"use client";

import { useEffect } from "react";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export default function DynamicFavicon() {
  const { faviconUrl } = useSiteSettings();

  useEffect(() => {
    if (!faviconUrl || typeof document === "undefined") return;

    // Detect MIME type based on file extension
    let mimeType = "image/x-icon";
    const cleanUrl = faviconUrl.split("?")[0].toLowerCase();
    if (cleanUrl.endsWith(".svg")) {
      mimeType = "image/svg+xml";
    } else if (cleanUrl.endsWith(".png")) {
      mimeType = "image/png";
    } else if (cleanUrl.endsWith(".webp")) {
      mimeType = "image/webp";
    } else if (cleanUrl.endsWith(".jpg") || cleanUrl.endsWith(".jpeg")) {
      mimeType = "image/jpeg";
    } else if (cleanUrl.endsWith(".ico")) {
      mimeType = "image/x-icon";
    }

    // 1. Remove ALL existing icon / favicon links in document.head
    const existingLinks = document.querySelectorAll(
      "link[rel*='icon'], link[rel='shortcut icon'], link[rel='apple-touch-icon']"
    );
    existingLinks.forEach((el) => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });

    // 2. Append fresh <link rel="icon" ... />
    const linkIcon = document.createElement("link");
    linkIcon.rel = "icon";
    linkIcon.type = mimeType;
    linkIcon.href = faviconUrl;
    document.head.appendChild(linkIcon);

    // 3. Append fresh <link rel="shortcut icon" ... />
    const linkShortcut = document.createElement("link");
    linkShortcut.rel = "shortcut icon";
    linkShortcut.type = mimeType;
    linkShortcut.href = faviconUrl;
    document.head.appendChild(linkShortcut);

    // 4. Append <link rel="apple-touch-icon" ... /> for mobile device bookmarks
    const linkApple = document.createElement("link");
    linkApple.rel = "apple-touch-icon";
    linkApple.href = faviconUrl;
    document.head.appendChild(linkApple);
  }, [faviconUrl]);

  return null;
}
