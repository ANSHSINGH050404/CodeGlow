import { describe, it, expect } from "bun:test";
import { stripExtension, getBaseFileName } from "./filenames";

describe("stripExtension", () => {
  it("strips the last extension", () => {
    expect(stripExtension("cleanup.ts")).toBe("cleanup");
    expect(stripExtension("my.file.ts")).toBe("my.file");
    expect(stripExtension("archive.tar.gz")).toBe("archive.tar");
  });

  it("leaves dotfiles and extensionless names alone", () => {
    expect(stripExtension(".gitignore")).toBe(".gitignore");
    expect(stripExtension("myfile")).toBe("myfile");
    expect(stripExtension("trailing.")).toBe("trailing.");
  });
});

describe("getBaseFileName", () => {
  it("strips the extension for export filenames", () => {
    expect(getBaseFileName("cleanup.ts", "auto")).toBe("cleanup");
    expect(getBaseFileName("my.file.ts", "auto")).toBe("my.file");
  });

  it("keeps dotfiles intact", () => {
    expect(getBaseFileName(".gitignore", "auto")).toBe(".gitignore");
  });

  it("falls back to codeglow-<preset> for empty titles", () => {
    expect(getBaseFileName("", "auto")).toBe("codeglow-auto");
    expect(getBaseFileName("   ", "twitter")).toBe("codeglow-twitter");
    expect(getBaseFileName(undefined, "auto")).toBe("codeglow-auto");
    expect(getBaseFileName(null, "auto")).toBe("codeglow-auto");
  });

  it("does not strip path-like suffixes", () => {
    expect(getBaseFileName("a/b", "auto")).toBe("a/b");
    expect(getBaseFileName("noext", "auto")).toBe("noext");
  });
});
