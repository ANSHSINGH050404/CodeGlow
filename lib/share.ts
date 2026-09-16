import type { CodeGlowConfig } from "@/types/codeglow";

interface CompactPayload {
  c?: string;
  l?: string;
  t?: string;
  f?: string;
  fs?: number;
  lh?: number;
  p?: number;
  r?: number;
  sh?: boolean;
  ss?: CodeGlowConfig["shadowStyle"];
  ln?: boolean;
  sln?: number;
  hl?: number[];
  w?: CodeGlowConfig["windowStyle"];
  g?: CodeGlowConfig["glow"];
  b?: CodeGlowConfig["background"];
  pr?: string;
  ti?: string;
  st?: boolean;
  wm?: boolean;
  wmt?: string;
  cw?: CodeGlowConfig["cardWidth"];
  es?: CodeGlowConfig["exportScale"];
}

function toBase64Url(base64: string): string {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(hash: string): string {
  let base64 = hash.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4;
  if (pad === 2) base64 += "==";
  else if (pad === 3) base64 += "=";
  return base64;
}

export function encodeSnippetToHash(config: Partial<CodeGlowConfig>): string {
  try {
    const payload: CompactPayload = {
      c: config.code,
      l: config.language,
      t: config.theme,
      f: config.font,
      fs: config.fontSize,
      lh: config.lineHeight,
      p: config.padding,
      r: config.borderRadius,
      sh: config.shadow,
      ss: config.shadowStyle,
      ln: config.lineNumbers,
      sln: config.startLineNumber,
      hl: config.highlightedLines,
      w: config.windowStyle,
      g: config.glow,
      b: config.background,
      pr: config.preset,
      ti: config.title,
      st: config.showTitle,
      wm: config.showWatermark,
      wmt: config.watermarkText,
      cw: config.cardWidth,
      es: config.exportScale,
    };

    const json = JSON.stringify(payload);
    // Base64-URL encoding compatible with UTF-8 (emoji-safe)
    const base64 = btoa(
      encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
    return toBase64Url(base64);
  } catch (e) {
    console.error("[CodeGlow] Failed to encode share link:", e);
    return "";
  }
}

export function decodeSnippetFromHash(hash: string): Partial<CodeGlowConfig> | null {
  try {
    const cleanHash = hash.replace(/^#/, "").trim();
    if (!cleanHash) return null;

    const json = decodeURIComponent(
      Array.prototype.map
        .call(atob(fromBase64Url(cleanHash)), (c: string) =>
          "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        )
        .join("")
    );

    const data: CompactPayload = JSON.parse(json);
    const result: Partial<CodeGlowConfig> = {};

    if (data.c !== undefined) result.code = data.c;
    if (data.l !== undefined) result.language = data.l;
    if (data.t !== undefined) result.theme = data.t;
    if (data.f !== undefined) result.font = data.f;
    if (data.fs !== undefined) result.fontSize = data.fs;
    if (data.lh !== undefined) result.lineHeight = data.lh;
    if (data.p !== undefined) result.padding = data.p;
    if (data.r !== undefined) result.borderRadius = data.r;
    if (data.sh !== undefined) result.shadow = data.sh;
    if (data.ss !== undefined) result.shadowStyle = data.ss;
    if (data.ln !== undefined) result.lineNumbers = data.ln;
    if (data.sln !== undefined) result.startLineNumber = data.sln;
    if (data.hl !== undefined) result.highlightedLines = data.hl;
    if (data.w !== undefined) result.windowStyle = data.w;
    if (data.g !== undefined) result.glow = data.g;
    if (data.b !== undefined) result.background = data.b;
    if (data.pr !== undefined) result.preset = data.pr;
    if (data.ti !== undefined) result.title = data.ti;
    if (data.st !== undefined) result.showTitle = data.st;
    if (data.wm !== undefined) result.showWatermark = data.wm;
    if (data.wmt !== undefined) result.watermarkText = data.wmt;
    if (data.cw !== undefined) result.cardWidth = data.cw;
    if (data.es !== undefined) result.exportScale = data.es;

    return result;
  } catch (e) {
    console.warn("[CodeGlow] Invalid or corrupted URL hash payload:", e);
    return null;
  }
}
