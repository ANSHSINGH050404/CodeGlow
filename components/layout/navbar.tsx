"use client";

import { Button } from "@/components/ui/button";
import { ExportButton } from "@/components/export/export-button";
import { RotateCcw, Sparkles } from "lucide-react";
import { useCodeGlowStore } from "@/store/codeglow-store";

export function Navbar() {
  const { reset } = useCodeGlowStore();

  return (
    <nav className="h-14 shrink-0 flex items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md z-30">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-md shadow-purple-500/25">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            CodeGlow
          </span>
          <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
            Studio
          </span>
        </div>
      </div>

      {/* Right Actions: Reset, Export */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={reset}
          className="text-zinc-600 dark:text-zinc-400 h-9 px-2.5 gap-1.5 text-xs"
          title="Reset all settings to default"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </Button>

        <ExportButton />
      </div>
    </nav>
  );
}
