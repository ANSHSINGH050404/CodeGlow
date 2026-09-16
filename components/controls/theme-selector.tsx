"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useCodeGlowStore } from "@/store/codeglow-store";
import { THEMES } from "@/lib/themes";

export function ThemeSelector() {
  const { theme, setTheme } = useCodeGlowStore();
  const currentTheme = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger
        aria-label="Theme"
        title="Theme"
        className="h-9 w-full text-xs"
      >
        <div className="flex items-center gap-2 truncate">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/20 dark:border-white/20"
            style={{ backgroundColor: currentTheme.accent }}
          />
          <span className="truncate">{currentTheme.name}</span>
        </div>
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {THEMES.map((t) => (
          <SelectItem key={t.id} value={t.id} className="text-xs">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/20 dark:border-white/20"
                style={{ backgroundColor: t.accent }}
              />
              <span>{t.name}</span>
              <span className="text-[10px] text-zinc-400 capitalize ml-auto">
                {t.type}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
