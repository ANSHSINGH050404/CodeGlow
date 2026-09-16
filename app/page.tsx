"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Workspace } from "@/components/layout/workspace";
import { useCodeGlowStore } from "@/store/codeglow-store";

export default function Home() {
  const { initialize } = useCodeGlowStore();

  useEffect(() => {
    // Restore persisted settings from localStorage
    initialize();

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
    };
  }, [initialize]);

  return (
    <div className="flex flex-col h-screen bg-zinc-50 dark:bg-black overflow-hidden select-none">
      <Navbar />
      <Workspace />
    </div>
  );
}
