"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Workspace } from "@/components/layout/workspace";
import { useCodeGlowStore } from "@/store/codeglow-store";
import { decodeSnippetFromHash } from "@/lib/share";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

const SOFTWARE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: SITE_DESCRIPTION,
};

export default function Home() {
  const { initialize, loadConfig } = useCodeGlowStore();

  useEffect(() => {
    // Shared links win over localStorage: open the snippet from the URL hash.
    const loadFromHashIfPresent = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const decoded = decodeSnippetFromHash(window.location.hash);
        if (decoded && Object.keys(decoded).length > 0) {
          loadConfig(decoded);
          return true;
        }
      }
      return false;
    };

    const hasHash = loadFromHashIfPresent();
    if (!hasHash) {
      // Fallback to localStorage
      initialize();
    }

    const handleHashChange = () => {
      loadFromHashIfPresent();
    };

    window.addEventListener("hashchange", handleHashChange);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        const exportButton = document.querySelector('[data-export="true"]') as HTMLButtonElement;
        if (exportButton) exportButton.click();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        const copyButton = document.querySelector('[data-copy="true"]') as HTMLButtonElement;
        if (copyButton) copyButton.click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [initialize, loadConfig]);

  return (
    <div className="flex flex-col h-screen bg-zinc-50 dark:bg-black overflow-hidden select-none">
      <h1 className="sr-only">
        CodeGlow — create beautiful code images for social media
      </h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_SCHEMA) }}
      />
      <Navbar />
      <Workspace />
    </div>
  );
}
