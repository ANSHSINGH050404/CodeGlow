"use client";

import { useEffect, useState, useRef, forwardRef } from "react";
import { codeToHtml } from "shiki";
import { useCodeGlowStore } from "@/store/codeglow-store";
import { THEMES } from "@/lib/themes";
import { FONTS } from "@/lib/fonts";
import { PRESETS } from "@/lib/presets";
import { NOISE_SVG_DATA_URL } from "@/lib/backgrounds";
import { detectLanguage, LANGUAGES } from "@/lib/languages";

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const CodeFrame = forwardRef<HTMLDivElement>((props, ref) => {
  const {
    code,
    setCode,
    language,
    setLanguage,
    title,
    setTitle,
    showTitle,
    theme,
    font,
    fontSize,
    lineHeight,
    padding,
    borderRadius,
    shadow,
    shadowStyle,
    lineNumbers,
    startLineNumber,
    highlightedLines,
    toggleHighlightedLine,
    windowStyle,
    showWatermark,
    watermarkText,
    glow,
    background,
    preset,
    cardWidth,
  } = useCodeGlowStore();

  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentThemeObj = THEMES.find((t) => t.id === theme) || THEMES[0];
  const currentFont = FONTS.find((f) => f.id === font)?.fontFamily || "var(--font-geist-mono)";
  const currentPreset = PRESETS.find((p) => p.id === preset) || PRESETS[0];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      });
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const highlight = async () => {
      try {
        const hasAnyHighlights = highlightedLines && highlightedLines.length > 0;
        const codeToHighlight = code ? (code.endsWith("\n") ? code + " " : code) : " ";
        const shikiLang =
          LANGUAGES.find((l) => l.id === language)?.shikiLang || "typescript";
        const html = await codeToHtml(codeToHighlight, {
          lang: shikiLang,
          theme: currentThemeObj.shikiTheme,
          transformers: [
            {
              pre(node) {
                if (hasAnyHighlights) {
                  this.addClassToHast(node, "has-highlights");
                }
              },
              line(node, line) {
                const currentLineNumber = (startLineNumber || 1) + line - 1;
                if (highlightedLines?.includes(currentLineNumber)) {
                  this.addClassToHast(node, "highlighted-line");
                }
              },
            },
          ],
        });
        if (!isCancelled) {
          setHighlightedCode(html);
        }
      } catch (error) {
        console.error("Failed to highlight code:", error);
        if (!isCancelled) {
          setHighlightedCode(
            `<pre class="shiki"><code>${escapeHtml(code || "")}</code></pre>`
          );
        }
      }
    };

    highlight();
    return () => {
      isCancelled = true;
    };
  }, [code, language, currentThemeObj.shikiTheme, highlightedLines, startLineNumber]);

  const getGlowShadows = () => {
    if (!glow.enabled || glow.intensity === "none") return "";

    const glowColor =
      glow.mode === "theme"
        ? currentThemeObj.accent || glow.color
        : glow.color;

    const blurMap: Record<string, string[]> = {
      subtle: ["0 0 20px", "0 0 40px"],
      soft: ["0 0 30px", "0 0 60px"],
      medium: ["0 0 35px", "0 0 75px", "0 0 115px"],
      strong: ["0 0 45px", "0 0 95px", "0 0 145px"],
      neon: ["0 0 25px", "0 0 60px", "0 0 120px", "0 0 190px"],
    };

    const blurRadii = blurMap[glow.intensity] || blurMap.medium;
    const opacities = ["55", "35", "22", "15"];
    const shadows = blurRadii.map(
      (radius, idx) => `${radius} ${glowColor}${opacities[idx] || "20"}`
    );

    return shadows.join(", ");
  };

  const getBackgroundStyle = () => {
    switch (background.type) {
      case "solid":
        return { backgroundColor: background.value };
      case "gradient":
      case "mesh":
        return { background: background.value };
      case "transparent":
        return { backgroundColor: "transparent" };
      default:
        return { backgroundColor: "#000000" };
    }
  };

  const getWindowShadow = () => {
    if (!shadow || shadowStyle === "none") return "none";
    switch (shadowStyle) {
      case "soft":
        return "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)";
      case "medium":
        return "0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 12px 18px -8px rgba(0, 0, 0, 0.3)";
      case "dramatic":
        return "0 30px 60px -12px rgba(0, 0, 0, 0.7), 0 18px 36px -18px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)";
      default:
        return "0 20px 30px -10px rgba(0, 0, 0, 0.4)";
    }
  };

  const getCombinedShadow = () => {
    const windowShadow = getWindowShadow();
    const glowShadows = getGlowShadows();
    const parts = [
      windowShadow && windowShadow !== "none" ? windowShadow : "",
      glowShadows,
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : "none";
  };

  const windowBg =
    windowStyle === "none"
      ? "transparent"
      : currentThemeObj.bg || (currentThemeObj.type === "light" ? "#ffffff" : "#121212");

  const isLightTheme = currentThemeObj.type === "light";

  const renderWindowControls = () => {
    if (windowStyle === "none") return null;

    if (windowStyle === "macos") {
      return (
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/40 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/40 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/40 shadow-sm" />
        </div>
      );
    }

    if (windowStyle === "macos-outline") {
      return (
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full border ${isLightTheme ? "border-zinc-400" : "border-zinc-600"}`} />
          <div className={`w-3 h-3 rounded-full border ${isLightTheme ? "border-zinc-400" : "border-zinc-600"}`} />
          <div className={`w-3 h-3 rounded-full border ${isLightTheme ? "border-zinc-400" : "border-zinc-600"}`} />
        </div>
      );
    }

    if (windowStyle === "windows") {
      return (
        <div className="flex items-center gap-2 text-xs opacity-60">
          <span className="w-2.5 h-[1px] bg-current inline-block" />
          <span className="w-2.5 h-2.5 border border-current inline-block" />
          <span className="text-[10px] leading-none font-bold">✕</span>
        </div>
      );
    }

    if (windowStyle === "minimal") {
      return (
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-purple-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-indigo-500/50" />
        </div>
      );
    }

    return null;
  };

  const lines = (code || "").split("\n");

  const renderLineNumbers = () => {
    if (!lineNumbers) return null;
    return (
      <div className="flex flex-col text-right select-none pr-3 pl-1 opacity-40 hover:opacity-85 transition-opacity">
        {lines.map((_, i) => {
          const lineNum = (startLineNumber || 1) + i;
          const isHighlighted = highlightedLines?.includes(lineNum);
          return (
            <div
              key={i}
              onClick={() => toggleHighlightedLine(lineNum)}
              title="Click to toggle highlight"
              className={`cursor-pointer transition-colors px-1 rounded text-xs ${
                isHighlighted
                  ? "text-purple-400 font-bold opacity-100 bg-purple-500/15"
                  : "hover:text-purple-300"
              }`}
              style={{ fontSize, lineHeight }}
            >
              {lineNum}
            </div>
          );
        })}
      </div>
    );
  };

  const isAutoPreset = currentPreset.id === "auto" || !currentPreset.width;

  const getCardWidth = () => {
    if (isAutoPreset) {
      return cardWidth === "full" ? "100%" : "auto";
    }
    switch (cardWidth) {
      case "full":
        return "92%";
      case "wide":
        return "80%";
      case "auto":
      default:
        return "auto";
    }
  };

  const getCardMinWidth = () => {
    if (isAutoPreset) return "320px";
    switch (cardWidth) {
      case "full":
        return "85%";
      case "wide":
        return "68%";
      case "auto":
      default:
        return undefined;
    }
  };

  return (
    <div
      ref={ref}
      id="code-frame-capture"
      className="relative flex items-center justify-center transition-all overflow-hidden"
      style={{
        width: isAutoPreset ? "auto" : `${currentPreset.width}px`,
        height: isAutoPreset ? "auto" : `${currentPreset.height}px`,
        minWidth: isAutoPreset ? "auto" : undefined,
        minHeight: isAutoPreset ? "auto" : undefined,
        padding: `${padding}px`,
        ...getBackgroundStyle(),
      }}
    >
      {/* Optional Noise Texture Overlay */}
      {background.noise && (
        <div
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
          style={{ backgroundImage: `url("${NOISE_SVG_DATA_URL}")` }}
        />
      )}

      {/* Code Window Card with Glow */}
      <div
        className="relative transition-all"
        style={{
          width: getCardWidth(),
          minWidth: getCardMinWidth(),
          borderRadius: `${borderRadius}px`,
          backgroundColor: windowBg,
          boxShadow: getCombinedShadow(),
          fontFamily: currentFont,
          maxWidth: isAutoPreset ? "100%" : "calc(100% - 16px)",
          maxHeight: isAutoPreset ? "100%" : "calc(100% - 16px)",
          border:
            windowStyle === "none"
              ? "none"
              : isLightTheme
                ? "1px solid rgba(0, 0, 0, 0.08)"
                : "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Window Header */}
        {windowStyle !== "none" && (
          <div
            className={`flex items-center justify-between px-4 py-3 border-b ${
              isLightTheme
                ? "border-black/5 text-zinc-700"
                : "border-white/5 text-zinc-300"
            }`}
          >
            <div className="flex items-center gap-2">
              {renderWindowControls()}
            </div>

            {showTitle && (
              <div
                key={title}
                className={`text-xs font-mono tracking-tight px-3 py-0.5 rounded-md min-w-[60px] max-w-[200px] truncate outline-none cursor-text ${
                  isLightTheme
                    ? "bg-black/5 text-zinc-600 focus:bg-black/10"
                    : "bg-white/5 text-zinc-300 focus:bg-white/10"
                }`}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                  const newTitle = e.currentTarget.textContent?.trim() || "";
                  setTitle(newTitle);
                  setLanguage(detectLanguage(newTitle, code));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.currentTarget.blur();
                  }
                }}
              >
                {title}
              </div>
            )}

            <div className="w-10" />
          </div>
        )}

        {/* Code Content */}
        <div
          className="p-4 overflow-hidden relative"
          style={
            {
              "--highlight-color": currentThemeObj.accent || "#8b5cf6",
            } as React.CSSProperties
          }
        >
          <div className="flex relative">
            {renderLineNumbers()}
            <div className="flex-1 relative overflow-x-auto">
              {/* Syntax highlighted display (non-interactive, sits behind textarea) */}
              <div
                className="pointer-events-none selection:bg-purple-500/30"
                style={{ fontSize, lineHeight, fontFamily: currentFont }}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
              {/* Transparent editable textarea overlaid on top */}
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
                className="absolute inset-0 w-full h-full resize-none bg-transparent border-none outline-none caret-current z-10 overflow-hidden"
                style={{
                  fontSize,
                  lineHeight,
                  fontFamily: currentFont,
                  color: "transparent",
                  caretColor: currentThemeObj.accent || "#8b5cf6",
                  padding: "0 0.5rem",
                  margin: 0,
                  whiteSpace: "pre",
                  overflowWrap: "normal",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Watermark Branding Badge */}
      {showWatermark && (
        <div className="absolute bottom-3 right-4 flex items-center gap-1.5 select-none pointer-events-none px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/90 text-[11px] font-medium tracking-wide shadow-md">
          <span className="text-purple-400">✨</span>
          <span>{watermarkText || "CodeGlow"}</span>
        </div>
      )}
    </div>
  );
});

CodeFrame.displayName = "CodeFrame";
