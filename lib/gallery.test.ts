import { describe, it, expect } from "bun:test";
import { GALLERY_EXAMPLES } from "./gallery";
import { VIBES } from "./vibes";
import { LANGUAGES } from "./languages";

const vibeIds: Set<string> = new Set(VIBES.map((v) => v.id));
const languageIds: Set<string> = new Set(LANGUAGES.map((l) => l.id));

describe("GALLERY_EXAMPLES", () => {
  it("has unique slugs with remixable content", () => {
    const slugs = GALLERY_EXAMPLES.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.length).toBeGreaterThan(0);
    for (const example of GALLERY_EXAMPLES) {
      expect(example.title.length).toBeGreaterThan(0);
      expect(example.blurb.length).toBeGreaterThan(0);
      expect(example.code.length).toBeGreaterThan(0);
      expect(example.fileTitle.length).toBeGreaterThan(0);
    }
  });

  it("references real vibes and languages", () => {
    for (const example of GALLERY_EXAMPLES) {
      expect(vibeIds.has(example.vibe)).toBe(true);
      expect(languageIds.has(example.language)).toBe(true);
    }
  });
});
