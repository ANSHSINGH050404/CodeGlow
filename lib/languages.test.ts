import { describe, it, expect } from "bun:test";
import { detectLanguage, LANGUAGES } from "./languages";

describe("detectLanguage", () => {
  it("maps file extensions to languages", () => {
    expect(detectLanguage("app.ts")).toBe("typescript");
    expect(detectLanguage("app.mts")).toBe("typescript");
    expect(detectLanguage("app.js")).toBe("javascript");
    expect(detectLanguage("app.mjs")).toBe("javascript");
    expect(detectLanguage("app.cjs")).toBe("javascript");
    expect(detectLanguage("app.tsx")).toBe("tsx");
    expect(detectLanguage("app.jsx")).toBe("tsx");
    expect(detectLanguage("main.py")).toBe("python");
    expect(detectLanguage("main.rs")).toBe("rust");
    expect(detectLanguage("main.go")).toBe("go");
    expect(detectLanguage("query.sql")).toBe("sql");
    expect(detectLanguage("data.json")).toBe("json");
    expect(detectLanguage("index.html")).toBe("html");
    expect(detectLanguage("styles.css")).toBe("css");
    expect(detectLanguage("run.sh")).toBe("bash");
    expect(detectLanguage("run.zsh")).toBe("bash");
    expect(detectLanguage("notes.md")).toBe("markdown");
    expect(detectLanguage("main.cpp")).toBe("cpp");
    expect(detectLanguage("Main.java")).toBe("java");
    expect(detectLanguage("ci.yaml")).toBe("yaml");
  });

  it("is case-insensitive and uses the last extension", () => {
    expect(detectLanguage("MAIN.PY")).toBe("python");
    expect(detectLanguage("archive.test.ts")).toBe("typescript");
  });

  it("does not treat dotfiles as having an extension", () => {
    expect(detectLanguage(".gitignore")).toBe("typescript");
    expect(detectLanguage(".env", "SELECT 1 FROM t")).toBe("sql");
  });

  it("detects language from code when the title has no known extension", () => {
    expect(detectLanguage("Dockerfile", "package main\n\nfunc main() {}")).toBe("go");
    expect(detectLanguage("snippet", "SELECT id FROM users")).toBe("sql");
    expect(detectLanguage("snippet", "<!DOCTYPE html>")).toBe("html");
    expect(detectLanguage("snippet", "def hello():\n    pass")).toBe("python");
    expect(
      detectLanguage("snippet", "interface User {\n  id: string;\n}")
    ).toBe("typescript");
    expect(
      detectLanguage("snippet", "fn main() {\n    let x = 1;\n}")
    ).toBe("rust");
  });

  it("falls back to typescript for unknown input", () => {
    expect(detectLanguage(undefined, undefined)).toBe("typescript");
    expect(detectLanguage("README", "just some words")).toBe("typescript");
    expect(detectLanguage("file.unknownext")).toBe("typescript");
  });

  it("every language has a unique id, extension and non-empty sample", () => {
    const ids = LANGUAGES.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const lang of LANGUAGES) {
      expect(lang.extension.length).toBeGreaterThan(0);
      expect(lang.sample.length).toBeGreaterThan(0);
      expect(lang.shikiLang.length).toBeGreaterThan(0);
    }
  });
});
