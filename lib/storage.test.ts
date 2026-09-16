import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import {
  loadConfig,
  loadConfigClient,
  saveConfig,
  resetConfigClient,
  cloneDefaultConfig,
} from "./storage";
import { DEFAULT_CONFIG } from "../types/codeglow";

function installFakeDom() {
  const store = new Map<string, string>();
  (globalThis as Record<string, unknown>).window = {};
  (globalThis as Record<string, unknown>).localStorage = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
  };
  return store;
}

describe("cloneDefaultConfig / loadConfig", () => {
  it("returns fresh deep copies that never share nested refs", () => {
    const a = cloneDefaultConfig();
    const b = cloneDefaultConfig();
    expect(a).toEqual(DEFAULT_CONFIG);
    expect(a).not.toBe(DEFAULT_CONFIG);
    expect(a.glow).not.toBe(b.glow);
    expect(a.background).not.toBe(b.background);
    expect(a.glow).not.toBe(DEFAULT_CONFIG.glow);
    a.glow.enabled = false;
    expect(DEFAULT_CONFIG.glow.enabled).toBe(true);
    expect(b.glow.enabled).toBe(true);
  });

  it("loadConfig returns defaults without touching the shared object", () => {
    const config = loadConfig();
    expect(config).toEqual(DEFAULT_CONFIG);
    expect(config).not.toBe(DEFAULT_CONFIG);
  });
});

describe("loadConfigClient", () => {
  let prevWindow: unknown;
  let prevStorage: unknown;

  beforeEach(() => {
    prevWindow = (globalThis as Record<string, unknown>).window;
    prevStorage = (globalThis as Record<string, unknown>).localStorage;
    installFakeDom();
  });

  afterEach(() => {
    if (prevWindow === undefined) delete (globalThis as Record<string, unknown>).window;
    else (globalThis as Record<string, unknown>).window = prevWindow;
    if (prevStorage === undefined)
      delete (globalThis as Record<string, unknown>).localStorage;
    else (globalThis as Record<string, unknown>).localStorage = prevStorage;
  });

  it("returns defaults when storage is empty", () => {
    expect(loadConfigClient()).toEqual(DEFAULT_CONFIG);
  });

  it("deep-merges stored values over defaults", () => {
    localStorage.setItem(
      "codeglow-config",
      JSON.stringify({ fontSize: 20, glow: { enabled: false } })
    );
    const config = loadConfigClient();
    expect(config.fontSize).toBe(20);
    expect(config.glow.enabled).toBe(false);
    // Untouched nested defaults survive a partial stored object
    expect(config.glow.color).toBe(DEFAULT_CONFIG.glow.color);
    expect(config.background).toEqual(DEFAULT_CONFIG.background);
  });

  it("falls back to defaults on corrupt JSON", () => {
    localStorage.setItem("codeglow-config", "{not-json");
    expect(loadConfigClient()).toEqual(DEFAULT_CONFIG);
  });

  it("sanitizes invalid numeric fields", () => {
    localStorage.setItem(
      "codeglow-config",
      JSON.stringify({
        fontSize: "huge",
        lineHeight: NaN,
        padding: null,
        borderRadius: -4, // present but unusual: kept (only type-checked)
        startLineNumber: "first",
      })
    );
    const config = loadConfigClient();
    expect(config.fontSize).toBe(DEFAULT_CONFIG.fontSize);
    expect(config.lineHeight).toBe(DEFAULT_CONFIG.lineHeight);
    expect(config.padding).toBe(DEFAULT_CONFIG.padding);
    expect(config.borderRadius).toBe(-4);
    expect(config.startLineNumber).toBe(DEFAULT_CONFIG.startLineNumber);
  });

  it("sanitizes highlightedLines and exportScale", () => {
    localStorage.setItem(
      "codeglow-config",
      JSON.stringify({ highlightedLines: [3, "x", null, 7], exportScale: 5 })
    );
    const config = loadConfigClient();
    expect(config.highlightedLines).toEqual([3, 7]);
    expect(config.exportScale).toBe(DEFAULT_CONFIG.exportScale);
  });

  it("accepts a non-object payload by returning defaults", () => {
    localStorage.setItem("codeglow-config", JSON.stringify([1, 2, 3]));
    const config = loadConfigClient();
    expect(config.fontSize).toBe(DEFAULT_CONFIG.fontSize);
  });
});

describe("saveConfig / resetConfigClient", () => {
  let prevWindow: unknown;
  let prevStorage: unknown;

  beforeEach(() => {
    prevWindow = (globalThis as Record<string, unknown>).window;
    prevStorage = (globalThis as Record<string, unknown>).localStorage;
    installFakeDom();
  });

  afterEach(() => {
    if (prevWindow === undefined) delete (globalThis as Record<string, unknown>).window;
    else (globalThis as Record<string, unknown>).window = prevWindow;
    if (prevStorage === undefined)
      delete (globalThis as Record<string, unknown>).localStorage;
    else (globalThis as Record<string, unknown>).localStorage = prevStorage;
  });

  it("persists and reloads the full config", () => {
    const config = { ...cloneDefaultConfig(), title: "saved.ts" };
    saveConfig(config);
    expect(loadConfigClient().title).toBe("saved.ts");
  });

  it("resetConfigClient clears storage so defaults load again", () => {
    saveConfig({ ...cloneDefaultConfig(), title: "saved.ts" });
    resetConfigClient();
    expect(loadConfigClient().title).toBe(DEFAULT_CONFIG.title);
  });

  it("does nothing without a window (SSR safety)", () => {
    delete (globalThis as Record<string, unknown>).window;
    expect(() => saveConfig(cloneDefaultConfig())).not.toThrow();
    expect(() => resetConfigClient()).not.toThrow();
    expect(loadConfigClient()).toEqual(DEFAULT_CONFIG);
  });
});
