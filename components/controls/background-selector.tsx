"use client";

import { Label } from "@/components/ui/label";
import { useCodeGlowStore } from "@/store/codeglow-store";
import { BACKGROUNDS } from "@/lib/backgrounds";

const GRADIENTS = BACKGROUNDS.filter((b) => b.category === "gradient");
const SOLIDS = BACKGROUNDS.filter((b) => b.category === "solid");

export function BackgroundSelector() {
  const { background, setBackground } = useCodeGlowStore();

  const handleTypeSelect = (type: "gradient" | "solid" | "transparent") => {
    if (type === "gradient") {
      const defaultGrad = GRADIENTS[0]?.value || "linear-gradient(135deg, #1e1b4b 0%, #312e81 45%, #4c1d95 100%)";
      setBackground({
        ...background,
        type: "gradient",
        value: background.type === "gradient" ? background.value : defaultGrad,
      });
    } else if (type === "solid") {
      const defaultSolid = SOLIDS[0]?.value || "#000000";
      setBackground({
        ...background,
        type: "solid",
        value: background.type === "solid" ? background.value : defaultSolid,
      });
    } else if (type === "transparent") {
      setBackground({
        ...background,
        type: "transparent",
        value: "transparent",
      });
    }
  };

  const handleValueChange = (value: string) => {
    setBackground({ ...background, value });
  };

  const handleToggleNoise = (noise: boolean) => {
    setBackground({ ...background, noise });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Background Type Segmented Control */}
      <div>
        <Label className="text-xs mb-1.5 block">Background Type</Label>
        <div className="grid grid-cols-3 gap-1 p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          {(["gradient", "solid", "transparent"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => handleTypeSelect(t)}
              className={`py-1 text-xs font-medium rounded-md capitalize transition-all ${
                background.type === t
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Gradients Palette Grid */}
      {background.type === "gradient" && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Label className="text-xs">Presets ({GRADIENTS.length})</Label>
            <span className="text-[10px] text-zinc-400 truncate max-w-[140px]">
              {GRADIENTS.find((g) => g.value === background.value)?.name || "Custom"}
            </span>
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {GRADIENTS.map((g) => {
              const isSelected = background.value === g.value;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => handleValueChange(g.value)}
                  title={g.name}
                  className={`w-full aspect-square rounded-md transition-all relative ${
                    isSelected
                      ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950 scale-105 z-10"
                      : "opacity-80 hover:opacity-100 hover:scale-105"
                  }`}
                  style={{ background: g.value }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Solids Palette Grid + Custom Picker */}
      {background.type === "solid" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-1.5">
            <Label className="text-xs">Presets</Label>
            <span className="text-[10px] text-zinc-400 font-mono">
              {background.value}
            </span>
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {SOLIDS.map((s) => {
              const isSelected = background.value.toLowerCase() === s.value.toLowerCase();
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleValueChange(s.value)}
                  title={s.name}
                  className={`w-full aspect-square rounded-md border border-zinc-200 dark:border-zinc-800 transition-all ${
                    isSelected
                      ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950 scale-105 z-10"
                      : "opacity-80 hover:opacity-100 hover:scale-105"
                  }`}
                  style={{ backgroundColor: s.value }}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Label htmlFor="custom-color-picker" className="text-xs shrink-0 text-zinc-500">
              Custom:
            </Label>
            <input
              id="custom-color-picker"
              type="color"
              value={background.value.startsWith("#") ? background.value : "#000000"}
              onChange={(e) => handleValueChange(e.target.value)}
              className="w-full h-7 rounded cursor-pointer border border-zinc-200 dark:border-zinc-800 bg-transparent"
            />
          </div>
        </div>
      )}

      {/* Noise Texture Toggle */}
      {background.type !== "transparent" && (
        <div className="flex items-center justify-between pt-1 border-t border-zinc-200/60 dark:border-zinc-800/60">
          <Label htmlFor="bg-noise" className="text-xs cursor-pointer">
            Noise Texture Overlay
          </Label>
          <input
            type="checkbox"
            id="bg-noise"
            checked={Boolean(background.noise)}
            onChange={(e) => handleToggleNoise(e.target.checked)}
            className="w-4 h-4 rounded border-zinc-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}
