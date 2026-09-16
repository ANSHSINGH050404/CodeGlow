"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCodeGlowStore } from "@/store/codeglow-store";
import { PRESETS } from "@/lib/presets";

export function PresetSelector() {
  const { preset, setPreset } = useCodeGlowStore();

  return (
    <Select value={preset} onValueChange={setPreset}>
      <SelectTrigger
        aria-label="Canvas size preset"
        title="Canvas size preset"
        className="h-9 w-full text-xs"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-80">
        {PRESETS.map((p) => (
          <SelectItem key={p.id} value={p.id} className="text-xs">
            <div className="flex flex-col py-0.5">
              <div className="flex items-center gap-1.5">
                <span className="font-medium">{p.name}</span>
                {p.badge && (
                  <span className="text-[9px] bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 px-1 rounded font-normal">
                    {p.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-zinc-500 font-normal">
                {p.id === "auto" ? "Tight fit (Best for Twitter/LinkedIn feeds)" : p.description}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
