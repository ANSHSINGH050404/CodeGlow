export type WindowStyle = "macos" | "macos-outline" | "windows" | "minimal" | "none";
export type GlowIntensity = "none" | "subtle" | "soft" | "medium" | "strong" | "neon";
export type GlowMode = "custom" | "theme";
export type BackgroundType = "gradient" | "solid" | "mesh" | "transparent";
export type ShadowStyle = "none" | "soft" | "medium" | "dramatic";
export type ExportScale = 1 | 2 | 3 | 4;
export type ExportFormat = "png" | "svg" | "jpeg";
export type CardWidth = "auto" | "wide" | "full";

export interface GlowConfig {
  enabled: boolean;
  intensity: GlowIntensity;
  color: string;
  mode: GlowMode;
  spread?: number;
}

export interface BackgroundConfig {
  type: BackgroundType;
  value: string;
  noise?: boolean;
}

export interface CodeGlowConfig {
  code: string;
  language: string;
  title: string;
  showTitle: boolean;
  theme: string;
  font: string;
  fontSize: number;
  lineHeight: number;
  padding: number;
  borderRadius: number;
  shadow: boolean;
  shadowStyle: ShadowStyle;
  lineNumbers: boolean;
  startLineNumber: number;
  highlightedLines: number[];
  windowStyle: WindowStyle;
  showWatermark: boolean;
  watermarkText: string;
  glow: GlowConfig;
  background: BackgroundConfig;
  preset: string;
  cardWidth: CardWidth;
  exportScale: ExportScale;
}

export const DEFAULT_CODE = `const sleep = (ms: number) => {
  return new Promise<void>((resolve) =>
    setTimeout(resolve, ms)
  );
};

const cleanupJob = async () => {
  console.log("🧹 cleanup started");

  await sleep(8000);

  console.log("✅ cleanup finished");
};

setInterval(() => {
  cleanupJob();
}, 5000);`;

export const DEFAULT_CONFIG: CodeGlowConfig = {
  code: DEFAULT_CODE,
  language: "typescript",
  title: "cleanup.ts",
  showTitle: true,
  theme: "github-dark",
  font: "geist-mono",
  fontSize: 14,
  lineHeight: 1.6,
  padding: 32,
  borderRadius: 16,
  shadow: true,
  shadowStyle: "medium",
  lineNumbers: true,
  startLineNumber: 1,
  highlightedLines: [],
  windowStyle: "macos",
  showWatermark: false,
  watermarkText: "CodeGlow",
  glow: {
    enabled: true,
    intensity: "medium",
    color: "#8b5cf6",
    mode: "custom",
    spread: 40,
  },
  background: {
    type: "gradient",
    value: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)",
    noise: true,
  },
  preset: "auto",
  cardWidth: "wide",
  exportScale: 2,
};
