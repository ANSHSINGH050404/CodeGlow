import type { CodeGlowConfig } from "@/types/codeglow";
import { DEFAULT_CONFIG } from "@/types/codeglow";

const STORAGE_KEY = "codeglow-config";

export function cloneDefaultConfig(): CodeGlowConfig {
  // Deep-clone so callers never share nested object references
  // (glow / background) with DEFAULT_CONFIG.
  if (typeof structuredClone === "function") {
    return structuredClone(DEFAULT_CONFIG);
  }
  return JSON.parse(JSON.stringify(DEFAULT_CONFIG)) as CodeGlowConfig;
}

export function loadConfig(): CodeGlowConfig {
  // Always return a fresh clone to avoid hydration issues and
  // accidental mutation of the shared DEFAULT_CONFIG object.
  // localStorage loading happens on client side via initialize()
  return cloneDefaultConfig();
}

function sanitizeLoadedConfig(parsed: unknown): CodeGlowConfig {
  const base = cloneDefaultConfig();
  if (!parsed || typeof parsed !== "object") return base;

  const src = parsed as Partial<CodeGlowConfig>;
  const merged: CodeGlowConfig = {
    ...base,
    ...src,
    // Deep-merge nested objects so partial/corrupt payloads can't
    // wipe out nested defaults.
    glow: { ...base.glow, ...((src.glow as object) ?? {}) },
    background: { ...base.background, ...((src.background as object) ?? {}) },
  };

  // Guard numeric fields against corrupt localStorage values
  // (e.g. fontSize stored as a string would break Sliders).
  if (typeof merged.fontSize !== "number" || Number.isNaN(merged.fontSize)) {
    merged.fontSize = base.fontSize;
  }
  if (typeof merged.lineHeight !== "number" || Number.isNaN(merged.lineHeight)) {
    merged.lineHeight = base.lineHeight;
  }
  if (typeof merged.padding !== "number" || Number.isNaN(merged.padding)) {
    merged.padding = base.padding;
  }
  if (typeof merged.borderRadius !== "number" || Number.isNaN(merged.borderRadius)) {
    merged.borderRadius = base.borderRadius;
  }
  if (typeof merged.startLineNumber !== "number" || Number.isNaN(merged.startLineNumber)) {
    merged.startLineNumber = base.startLineNumber;
  }
  if (!Array.isArray(merged.highlightedLines)) {
    merged.highlightedLines = [];
  } else {
    merged.highlightedLines = merged.highlightedLines.filter(
      (n): n is number => typeof n === "number" && Number.isFinite(n)
    );
  }
  if (![1, 2, 3, 4].includes(merged.exportScale as number)) {
    merged.exportScale = base.exportScale;
  }

  return merged;
}

export function loadConfigClient(): CodeGlowConfig {
  if (typeof window === "undefined") {
    return cloneDefaultConfig();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return sanitizeLoadedConfig(JSON.parse(stored));
    }
  } catch (error) {
    console.error("Failed to load config from localStorage:", error);
  }

  return cloneDefaultConfig();
}

export function saveConfig(config: CodeGlowConfig): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error("Failed to save config to localStorage:", error);
  }
}

export function resetConfigClient(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear localStorage:", error);
  }
}

// Keep the old export for compatibility
export function resetConfig(): void {
  resetConfigClient();
}
