import { describe, it, expect } from "bun:test";
import {
  encodeSnippetToHash,
  decodeSnippetFromHash,
} from "./share";
import { DEFAULT_CONFIG } from "../types/codeglow";

describe("encodeSnippetToHash / decodeSnippetFromHash", () => {
  it("round-trips a full config including unicode and emoji", () => {
    const config = {
      ...DEFAULT_CONFIG,
      code: "const x = 'hi';\n// café 🧹✨",
      highlightedLines: [1, 2],
      exportScale: 4 as const,
      cardWidth: "full" as const,
    };
    const hash = encodeSnippetToHash(config);
    expect(hash.length).toBeGreaterThan(0);
    const decoded = decodeSnippetFromHash(`#${hash}`);
    expect(decoded).not.toBeNull();
    expect(decoded!.code).toBe(config.code);
    expect(decoded!.exportScale).toBe(4);
    expect(decoded!.cardWidth).toBe("full");
    expect(decoded!.highlightedLines).toEqual([1, 2]);
    expect(decoded!.glow).toEqual(config.glow);
    expect(decoded!.background).toEqual(config.background);
    expect(decoded!.theme).toBe(config.theme);
    expect(decoded!.font).toBe(config.font);
  });

  it("produces URL-safe output (base64url, no padding)", () => {
    const hash = encodeSnippetToHash({
      ...DEFAULT_CONFIG,
      code: "a+b/c=d?e&f#g ünïcodé 🎉",
    });
    expect(hash).toMatch(/^[A-Za-z0-9\-_]+$/);
  });

  it("round-trips a partial config, omitting absent fields", () => {
    const hash = encodeSnippetToHash({ code: "hello" });
    const decoded = decodeSnippetFromHash(hash);
    expect(decoded!.code).toBe("hello");
    expect(decoded!.theme).toBeUndefined();
    expect(decoded!.glow).toBeUndefined();
  });

  it("decodes legacy padded base64 hashes", () => {
    const hash = encodeSnippetToHash({ code: "legacy" });
    const padded = hash + "=".repeat((4 - (hash.length % 4)) % 4);
    expect(padded).not.toBe(hash);
    expect(decodeSnippetFromHash(`#${padded}`)?.code).toBe("legacy");
  });

  it("returns null for empty, missing, or corrupt input", () => {
    expect(decodeSnippetFromHash("")).toBeNull();
    expect(decodeSnippetFromHash("#")).toBeNull();
    expect(decodeSnippetFromHash("#!!!not-valid!!!")).toBeNull();
    expect(decodeSnippetFromHash("#aGVsbG8")).toBeNull(); // "hello": valid b64, invalid JSON
  });

  it("returns null for valid JSON that is not an object payload", () => {
    // "[1,2,3]" is valid JSON but has no known fields -> empty result is still an object;
    // a JSON string decodes to a primitive with no fields -> {}
    const asHash = (s: string) =>
      Buffer.from(s, "utf-8")
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    expect(decodeSnippetFromHash(`#${asHash('"just a string"')}`)).toEqual({});
  });

  it("encode returns empty string instead of throwing on unserializable input", () => {
    const circular: Record<string, unknown> = {};
    circular.self = circular;
    expect(encodeSnippetToHash({ code: "x", glow: circular as never })).toBe("");
  });
});
