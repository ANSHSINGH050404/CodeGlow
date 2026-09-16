"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCodeGlowStore } from "@/store/codeglow-store";
import type { WindowStyle, ShadowStyle } from "@/types/codeglow";

export function FrameControls() {
  const {
    windowStyle,
    setWindowStyle,
    padding,
    setPadding,
    borderRadius,
    setBorderRadius,
    shadow,
    setShadow,
    shadowStyle,
    setShadowStyle,
    lineNumbers,
    setLineNumbers,
    startLineNumber,
    setStartLineNumber,
    showWatermark,
    setShowWatermark,
    watermarkText,
    setWatermarkText,
    showTitle,
    setShowTitle,
    cardWidth,
    setCardWidth,
  } = useCodeGlowStore();

  return (
    <div className="flex flex-col gap-3">
      {/* Card Width / Canvas Fill */}
      <div>
        <Label className="text-xs mb-1 block">
          Card Width in Canvas
        </Label>
        <div className="grid grid-cols-3 gap-1 p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          {(
            [
              { id: "auto", label: "Compact" },
              { id: "wide", label: "Wide (80%)" },
              { id: "full", label: "Full (92%)" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCardWidth(item.id)}
              className={`py-1 text-xs font-medium rounded-md transition-all ${
                cardWidth === item.id
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Window Style Dropdown */}
      <div>
        <Label htmlFor="window-style" className="text-xs mb-1 block">
          Window Header Style
        </Label>
        <Select
          value={windowStyle}
          onValueChange={(val: WindowStyle) => setWindowStyle(val)}
        >
          <SelectTrigger id="window-style" className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="macos" className="text-xs">macOS (Colored Dots)</SelectItem>
            <SelectItem value="macos-outline" className="text-xs">macOS Outline</SelectItem>
            <SelectItem value="windows" className="text-xs">Windows (Min/Max/Close)</SelectItem>
            <SelectItem value="minimal" className="text-xs">Minimal (Subtle Dots)</SelectItem>
            <SelectItem value="none" className="text-xs">None (Borderless)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Shadow Controls */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <Label htmlFor="shadow" className="text-xs cursor-pointer">
            Window Shadow
          </Label>
          <input
            type="checkbox"
            id="shadow"
            checked={shadow}
            onChange={(e) => setShadow(e.target.checked)}
            className="w-4 h-4 rounded border-zinc-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
          />
        </div>
        {shadow && (
          <Select
            value={shadowStyle}
            onValueChange={(val: ShadowStyle) => setShadowStyle(val)}
          >
            <SelectTrigger className="h-7 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="soft" className="text-xs">Soft Ambient</SelectItem>
              <SelectItem value="medium" className="text-xs">Medium Elevation</SelectItem>
              <SelectItem value="dramatic" className="text-xs">Dramatic Float</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Sliders: Padding & Radius */}
      <div className="flex gap-3">
        <div className="flex-1">
          <Label htmlFor="padding" className="text-xs mb-1 block">
            Padding: {padding}px
          </Label>
          <Slider
            id="padding"
            value={[padding]}
            onValueChange={([value]) => setPadding(value)}
            min={8}
            max={64}
            step={4}
          />
        </div>

        <div className="flex-1">
          <Label htmlFor="border-radius" className="text-xs mb-1 block">
            Radius: {borderRadius}px
          </Label>
          <Slider
            id="border-radius"
            value={[borderRadius]}
            onValueChange={([value]) => setBorderRadius(value)}
            min={0}
            max={32}
            step={2}
          />
        </div>
      </div>

      {/* Line Numbers & Start Number */}
      <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
        <div className="flex items-center justify-between mb-1.5">
          <Label htmlFor="line-numbers" className="text-xs cursor-pointer">
            Line Numbers
          </Label>
          <input
            type="checkbox"
            id="line-numbers"
            checked={lineNumbers}
            onChange={(e) => setLineNumbers(e.target.checked)}
            className="w-4 h-4 rounded border-zinc-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
          />
        </div>
        {lineNumbers && (
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-zinc-500">Start from line:</span>
            <input
              type="number"
              min={1}
              max={9999}
              value={startLineNumber || 1}
              onChange={(e) => setStartLineNumber(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 h-7 text-xs font-mono px-2 rounded border border-zinc-200 dark:border-zinc-800 bg-transparent text-right"
            />
          </div>
        )}
      </div>

      {/* Watermark & Title Badges */}
      <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="show-title" className="text-xs cursor-pointer">
            Show Title Bar
          </Label>
          <input
            type="checkbox"
            id="show-title"
            checked={showTitle}
            onChange={(e) => setShowTitle(e.target.checked)}
            className="w-4 h-4 rounded border-zinc-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="show-watermark" className="text-xs cursor-pointer">
            Watermark Badge
          </Label>
          <input
            type="checkbox"
            id="show-watermark"
            checked={showWatermark}
            onChange={(e) => setShowWatermark(e.target.checked)}
            className="w-4 h-4 rounded border-zinc-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
          />
        </div>

        {showWatermark && (
          <input
            type="text"
            placeholder="Watermark text (e.g. @yourname)"
            value={watermarkText}
            onChange={(e) => setWatermarkText(e.target.value)}
            className="w-full h-7 text-xs px-2 rounded border border-zinc-200 dark:border-zinc-800 bg-transparent"
          />
        )}
      </div>
    </div>
  );
}
