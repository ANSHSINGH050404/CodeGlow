import { describe, it, expect, beforeEach } from "bun:test";
import { useCodeGlowStore } from "./codeglow-store";
import { DEFAULT_CONFIG } from "../types/codeglow";

beforeEach(() => {
  useCodeGlowStore.getState().reset();
});

describe("codeglow store", () => {
  it("starts from default config with independent nested objects", () => {
    const state = useCodeGlowStore.getState();
    expect(state.code).toBe(DEFAULT_CONFIG.code);
    expect(state.theme).toBe(DEFAULT_CONFIG.theme);
    expect(state.exportScale).toBe(DEFAULT_CONFIG.exportScale);
    expect(state.glow).not.toBe(DEFAULT_CONFIG.glow);
    expect(state.background).not.toBe(DEFAULT_CONFIG.background);
  });

  it("updates primitive fields via setters", () => {
    const { setCode, setLanguage, setTitle, setFontSize, setExportScale } =
      useCodeGlowStore.getState();
    setCode("hello");
    setLanguage("python");
    setTitle("main.py");
    setFontSize(18);
    setExportScale(4);
    const state = useCodeGlowStore.getState();
    expect(state.code).toBe("hello");
    expect(state.language).toBe("python");
    expect(state.title).toBe("main.py");
    expect(state.fontSize).toBe(18);
    expect(state.exportScale).toBe(4);
  });

  it("toggles highlighted lines on and off", () => {
    const { toggleHighlightedLine, setHighlightedLines } =
      useCodeGlowStore.getState();
    setHighlightedLines([]);
    toggleHighlightedLine(5);
    expect(useCodeGlowStore.getState().highlightedLines).toEqual([5]);
    toggleHighlightedLine(7);
    expect(useCodeGlowStore.getState().highlightedLines).toEqual([5, 7]);
    toggleHighlightedLine(5);
    expect(useCodeGlowStore.getState().highlightedLines).toEqual([7]);
  });

  it("loadConfig deep-merges nested glow and background", () => {
    useCodeGlowStore.getState().loadConfig({
      theme: "dracula",
      glow: { enabled: false } as never,
      background: { value: "#000000" } as never,
    });
    const state = useCodeGlowStore.getState();
    expect(state.theme).toBe("dracula");
    expect(state.glow.enabled).toBe(false);
    // Untouched nested defaults survive partial payloads
    expect(state.glow.color).toBe(DEFAULT_CONFIG.glow.color);
    expect(state.background.type).toBe(DEFAULT_CONFIG.background.type);
    expect(state.background.value).toBe("#000000");
  });

  it("reset restores every default", () => {
    const store = useCodeGlowStore.getState();
    store.setCode("changed");
    store.setTheme("dracula");
    store.toggleHighlightedLine(3);
    store.reset();
    const state = useCodeGlowStore.getState();
    expect(state.code).toBe(DEFAULT_CONFIG.code);
    expect(state.theme).toBe(DEFAULT_CONFIG.theme);
    expect(state.highlightedLines).toEqual([]);
    expect(state.glow).toEqual(DEFAULT_CONFIG.glow);
  });
});
