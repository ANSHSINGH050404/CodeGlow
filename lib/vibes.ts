import type { CodeGlowConfig } from "@/types/codeglow";

export interface VibeOption {
  id: string;
  name: string;
  tagline: string;
  /** Swatch shown on the vibe button. */
  swatch: string;
  /** Style-only overrides — never touches the user's code. */
  config: Partial<CodeGlowConfig>;
}

export const VIBES: readonly VibeOption[] = [
  {
    id: "midnight-glass",
    name: "Midnight Glass",
    tagline: "Signature dark glow",
    swatch: "linear-gradient(135deg, #1e1b4b 0%, #312e81 45%, #4c1d95 100%)",
    config: {
      theme: "tokyo-night",
      font: "jetbrains-mono",
      background: {
        type: "gradient",
        value: "linear-gradient(135deg, #1e1b4b 0%, #312e81 45%, #4c1d95 100%)",
        noise: true,
      },
      glow: { enabled: true, intensity: "medium", color: "#8b5cf6", mode: "custom", spread: 40 },
      windowStyle: "macos",
      shadow: true,
      shadowStyle: "medium",
      borderRadius: 16,
      padding: 32,
      showWatermark: true,
      watermarkText: "CodeGlow",
    },
  },
  {
    id: "sunset-hot-take",
    name: "Sunset Hot Take",
    tagline: "Built for spicy posts",
    swatch: "linear-gradient(135deg, #431407 0%, #9a3412 50%, #ea580c 100%)",
    config: {
      theme: "synthwave-84",
      font: "fira-code",
      background: {
        type: "gradient",
        value: "linear-gradient(135deg, #431407 0%, #9a3412 50%, #ea580c 100%)",
        noise: true,
      },
      glow: { enabled: true, intensity: "strong", color: "#ec4899", mode: "custom", spread: 40 },
      windowStyle: "macos",
      shadow: true,
      shadowStyle: "dramatic",
      borderRadius: 20,
      padding: 40,
      showWatermark: true,
      watermarkText: "CodeGlow",
    },
  },
  {
    id: "terminal-hacker",
    name: "Terminal Hacker",
    tagline: "Green-on-black terminal",
    swatch: "#000000",
    config: {
      theme: "min-dark",
      font: "jetbrains-mono",
      background: { type: "solid", value: "#000000", noise: false },
      glow: { enabled: true, intensity: "subtle", color: "#22c55e", mode: "custom", spread: 40 },
      windowStyle: "minimal",
      shadow: true,
      shadowStyle: "soft",
      borderRadius: 12,
      padding: 28,
      lineNumbers: false,
      showWatermark: true,
      watermarkText: "CodeGlow",
    },
  },
  {
    id: "clean-minimal",
    name: "Clean Minimal",
    tagline: "Docs & README ready",
    swatch: "#f4f1ea",
    config: {
      theme: "github-light",
      font: "geist-mono",
      background: { type: "solid", value: "#f4f1ea", noise: false },
      glow: { enabled: false, intensity: "none", color: "#8b5cf6", mode: "custom", spread: 40 },
      windowStyle: "macos-outline",
      shadow: true,
      shadowStyle: "soft",
      borderRadius: 12,
      padding: 32,
      showWatermark: true,
      watermarkText: "CodeGlow",
    },
  },
  {
    id: "ocean-focus",
    name: "Ocean Focus",
    tagline: "Calm deep-sea blues",
    swatch: "linear-gradient(135deg, #082f49 0%, #0369a1 50%, #06b6d4 100%)",
    config: {
      theme: "night-owl",
      font: "ibm-plex-mono",
      background: {
        type: "gradient",
        value: "linear-gradient(135deg, #082f49 0%, #0369a1 50%, #06b6d4 100%)",
        noise: true,
      },
      glow: { enabled: true, intensity: "soft", color: "#06b6d4", mode: "custom", spread: 40 },
      windowStyle: "macos",
      shadow: true,
      shadowStyle: "medium",
      borderRadius: 16,
      padding: 32,
      showWatermark: true,
      watermarkText: "CodeGlow",
    },
  },
  {
    id: "ultraviolet-pop",
    name: "Ultraviolet Pop",
    tagline: "Maximum timeline pop",
    swatch: "linear-gradient(135deg, #0f0520 0%, #5b21b6 55%, #d946ef 100%)",
    config: {
      theme: "dracula",
      font: "source-code-pro",
      background: {
        type: "gradient",
        value: "linear-gradient(135deg, #0f0520 0%, #5b21b6 55%, #d946ef 100%)",
        noise: true,
      },
      glow: { enabled: true, intensity: "neon", color: "#d946ef", mode: "custom", spread: 40 },
      windowStyle: "macos",
      shadow: true,
      shadowStyle: "dramatic",
      borderRadius: 20,
      padding: 40,
      showWatermark: true,
      watermarkText: "CodeGlow",
    },
  },
] as const;

export type VibeId = (typeof VIBES)[number]["id"];
