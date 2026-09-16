import { create } from "zustand";
import type { CodeGlowConfig, ExportScale } from "@/types/codeglow";
import { cloneDefaultConfig, loadConfigClient, saveConfig, resetConfigClient } from "@/lib/storage";

interface CodeGlowStore extends CodeGlowConfig {
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  setTitle: (title: string) => void;
  setShowTitle: (showTitle: boolean) => void;
  setTheme: (theme: string) => void;
  setFont: (font: string) => void;
  setFontSize: (fontSize: number) => void;
  setLineHeight: (lineHeight: number) => void;
  setPadding: (padding: number) => void;
  setBorderRadius: (borderRadius: number) => void;
  setShadow: (shadow: boolean) => void;
  setShadowStyle: (shadowStyle: CodeGlowConfig["shadowStyle"]) => void;
  setLineNumbers: (lineNumbers: boolean) => void;
  setStartLineNumber: (startLineNumber: number) => void;
  setHighlightedLines: (lines: number[]) => void;
  toggleHighlightedLine: (line: number) => void;
  setWindowStyle: (windowStyle: CodeGlowConfig["windowStyle"]) => void;
  setShowWatermark: (showWatermark: boolean) => void;
  setWatermarkText: (watermarkText: string) => void;
  setGlow: (glow: CodeGlowConfig["glow"]) => void;
  setBackground: (background: CodeGlowConfig["background"]) => void;
  setPreset: (preset: string) => void;
  setCardWidth: (cardWidth: CodeGlowConfig["cardWidth"]) => void;
  setExportScale: (scale: ExportScale) => void;
  loadConfig: (config: Partial<CodeGlowConfig>) => void;
  reset: () => void;
  initialize: () => void;
}

export const useCodeGlowStore = create<CodeGlowStore>((set) => ({
  ...cloneDefaultConfig(),
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  setTitle: (title) => set({ title }),
  setShowTitle: (showTitle) => set({ showTitle }),
  setTheme: (theme) => set({ theme }),
  setFont: (font) => set({ font }),
  setFontSize: (fontSize) => set({ fontSize }),
  setLineHeight: (lineHeight) => set({ lineHeight }),
  setPadding: (padding) => set({ padding }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setShadow: (shadow) => set({ shadow }),
  setShadowStyle: (shadowStyle) => set({ shadowStyle }),
  setLineNumbers: (lineNumbers) => set({ lineNumbers }),
  setStartLineNumber: (startLineNumber) => set({ startLineNumber }),
  setHighlightedLines: (highlightedLines) => set({ highlightedLines }),
  toggleHighlightedLine: (line) =>
    set((state) => {
      const exists = state.highlightedLines.includes(line);
      return {
        highlightedLines: exists
          ? state.highlightedLines.filter((l) => l !== line)
          : [...state.highlightedLines, line],
      };
    }),
  setWindowStyle: (windowStyle) => set({ windowStyle }),
  setShowWatermark: (showWatermark) => set({ showWatermark }),
  setWatermarkText: (watermarkText) => set({ watermarkText }),
  setGlow: (glow) => set({ glow }),
  setBackground: (background) => set({ background }),
  setPreset: (preset) => set({ preset }),
  setCardWidth: (cardWidth) => set({ cardWidth }),
  setExportScale: (exportScale) => set({ exportScale }),
  loadConfig: (partial) =>
    set((state) => ({
      ...state,
      ...partial,
      // Deep-merge nested objects so partial payloads
      // can't wipe out nested defaults.
      ...(partial.glow ? { glow: { ...state.glow, ...partial.glow } } : {}),
      ...(partial.background
        ? { background: { ...state.background, ...partial.background } }
        : {}),
    })),
  reset: () => {
    resetConfigClient();
    set(cloneDefaultConfig());
  },
  initialize: () => set(loadConfigClient()),
}));

// Subscribe to store changes and persist to localStorage (debounced so
// typing doesn't hammer localStorage on every keystroke).
let persistTimer: ReturnType<typeof setTimeout> | null = null;
useCodeGlowStore.subscribe((state) => {
  if (persistTimer) clearTimeout(persistTimer);
  persistTimer = setTimeout(() => {
    saveConfig({
    code: state.code,
    language: state.language,
    title: state.title,
    showTitle: state.showTitle,
    theme: state.theme,
    font: state.font,
    fontSize: state.fontSize,
    lineHeight: state.lineHeight,
    padding: state.padding,
    borderRadius: state.borderRadius,
    shadow: state.shadow,
    shadowStyle: state.shadowStyle,
    lineNumbers: state.lineNumbers,
    startLineNumber: state.startLineNumber,
    highlightedLines: state.highlightedLines,
    windowStyle: state.windowStyle,
    showWatermark: state.showWatermark,
    watermarkText: state.watermarkText,
    glow: state.glow,
    background: state.background,
    preset: state.preset,
    cardWidth: state.cardWidth,
    exportScale: state.exportScale,
    });
  }, 300);
});
