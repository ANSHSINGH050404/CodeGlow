import { describe, it, expect } from "bun:test";
import { VIBES } from "./vibes";
import { THEMES } from "./themes";
import { FONTS } from "./fonts";
import type { CodeGlowConfig } from "../types/codeglow";

const themeIds: Set<string> = new Set(THEMES.map((t) => t.id));
const fontIds: Set<string> = new Set(FONTS.map((f) => f.id));

// Vibe configs must be style-only: applying one must never clobber code.
const FORBIDDEN_KEYS = ["code", "language", "title"] as const;

describe("VIBES", () => {
  it("has unique ids with names, taglines and swatches", () => {
    const ids = VIBES.map((v) => v.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.length).toBeGreaterThan(0);
    for (const vibe of VIBES) {
      expect(vibe.name.length).toBeGreaterThan(0);
      expect(vibe.tagline.length).toBeGreaterThan(0);
      expect(vibe.swatch.length).toBeGreaterThan(0);
    }
  });

  it("only overrides style, never code content", () => {
    for (const vibe of VIBES) {
      for (const key of FORBIDDEN_KEYS) {
        expect(
          vibe.config,
          `${vibe.id} must not set ${key}`
        ).not.toHaveProperty(key);
      }
    }
  });

  it("references real themes, fonts and well-formed nested configs", () => {
    for (const vibe of VIBES) {
      const c: Partial<CodeGlowConfig> = vibe.config;
      if (c.theme !== undefined) expect(themeIds.has(c.theme)).toBe(true);
      if (c.font !== undefined) expect(fontIds.has(c.font)).toBe(true);
      if (c.background !== undefined) {
        expect(typeof c.background.value).toBe("string");
        expect(c.background.value.length).toBeGreaterThan(0);
      }
      if (c.glow !== undefined) {
        expect(typeof c.glow.enabled).toBe("boolean");
      }
    }
  });
});
