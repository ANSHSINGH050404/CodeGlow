"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCodeGlowStore } from "@/store/codeglow-store";
import type { GlowIntensity, GlowMode } from "@/types/codeglow";

const GLOW_COLORS = [
  { id: "purple", name: "Purple", value: "#8b5cf6" },
  { id: "cyan", name: "Cyan", value: "#06b6d4" },
  { id: "pink", name: "Pink", value: "#ec4899" },
  { id: "blue", name: "Blue", value: "#3b82f6" },
  { id: "green", name: "Green", value: "#10b981" },
  { id: "amber", name: "Amber", value: "#f59e0b" },
];

const INTENSITIES: Array<{ id: GlowIntensity; name: string }> = [
  { id: "subtle", name: "Subtle (20px)" },
  { id: "soft", name: "Soft (30px)" },
  { id: "medium", name: "Medium (50px)" },
  { id: "strong", name: "Strong (80px)" },
  { id: "neon", name: "Neon Bloom" },
];

export function GlowControls() {
  const { glow, setGlow } = useCodeGlowStore();

  const handleIntensityChange = (intensity: GlowIntensity) => {
    setGlow({ ...glow, intensity });
  };

  const handleModeChange = (mode: GlowMode) => {
    setGlow({ ...glow, mode });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Enable Glow Checkbox */}
      <div className="flex items-center justify-between">
        <Label htmlFor="glow-enabled" className="text-xs cursor-pointer font-medium">
          Enable Glow Luminescence
        </Label>
        <input
          type="checkbox"
          id="glow-enabled"
          checked={glow.enabled}
          onChange={(e) => setGlow({ ...glow, enabled: e.target.checked })}
          className="w-4 h-4 rounded border-zinc-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
        />
      </div>

      {glow.enabled && (
        <>
          {/* Mode Selector: Theme Accent vs Custom */}
          <div>
            <Label className="text-xs mb-1.5 block">Color Source</Label>
            <div className="grid grid-cols-2 gap-1 p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => handleModeChange("theme")}
                className={`py-1 text-xs font-medium rounded-md transition-all ${
                  glow.mode === "theme"
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                Theme Accent ✨
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("custom")}
                className={`py-1 text-xs font-medium rounded-md transition-all ${
                  glow.mode === "custom"
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                Custom Color
              </button>
            </div>
          </div>

          {/* Intensity Dropdown */}
          <div>
            <Label htmlFor="glow-intensity" className="text-xs mb-1 block">
              Intensity Level
            </Label>
            <Select value={glow.intensity} onValueChange={handleIntensityChange}>
              <SelectTrigger id="glow-intensity" className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {INTENSITIES.map((item) => (
                  <SelectItem key={item.id} value={item.id} className="text-xs">
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Custom Color Palette */}
          {glow.mode === "custom" && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-xs">Glow Color</Label>
                <span className="text-[10px] text-zinc-400 font-mono">{glow.color}</span>
              </div>
              <div className="grid grid-cols-6 gap-1.5 mb-2">
                {GLOW_COLORS.map((c) => {
                  const isSelected = glow.color.toLowerCase() === c.value.toLowerCase();
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setGlow({ ...glow, color: c.value })}
                      title={c.name}
                      className={`w-full aspect-square rounded-md transition-all ${
                        isSelected
                          ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950 scale-105"
                          : "opacity-80 hover:opacity-100 hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.value }}
                    />
                  );
                })}
              </div>
              <input
                type="color"
                value={glow.color.startsWith("#") ? glow.color : "#8b5cf6"}
                onChange={(e) => setGlow({ ...glow, color: e.target.value })}
                className="w-full h-7 rounded cursor-pointer border border-zinc-200 dark:border-zinc-800 bg-transparent"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
