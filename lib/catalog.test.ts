import { describe, it, expect } from "bun:test";
import { THEMES } from "./themes";
import { BACKGROUNDS } from "./backgrounds";
import { PRESETS } from "./presets";
import { FONTS } from "./fonts";

describe("catalogs", () => {
  it("themes are unique with valid metadata", () => {
    const ids = THEMES.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const theme of THEMES) {
      expect(theme.name.length).toBeGreaterThan(0);
      expect(theme.shikiTheme.length).toBeGreaterThan(0);
      expect(theme.accent).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(theme.bg).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(["dark", "light"]).toContain(theme.type);
    }
  });

  it("backgrounds are unique with valid metadata", () => {
    const ids = BACKGROUNDS.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const bg of BACKGROUNDS) {
      expect(bg.name.length).toBeGreaterThan(0);
      expect(bg.value.length).toBeGreaterThan(0);
      expect(["gradient", "solid", "mesh", "transparent"]).toContain(bg.type);
    }
  });

  it("has an auto preset plus sized social presets", () => {
    const ids = PRESETS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain("auto");
    expect(ids).toContain("twitter");
    const twitter = PRESETS.find((p) => p.id === "twitter")!;
    expect(twitter.width).toBe(1200);
    expect(twitter.height).toBe(675);
  });

  it("fonts are unique with CSS variable families", () => {
    const ids = FONTS.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const font of FONTS) {
      expect(font.name.length).toBeGreaterThan(0);
      expect(font.fontFamily).toMatch(/^var\(--font-.+\)$/);
    }
  });
});
