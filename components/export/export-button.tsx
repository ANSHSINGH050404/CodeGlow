"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Download,
  Copy,
  ChevronDown,
  Share2,
  Send,
  Layers,
  FileText,
  FileCode2,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import {
  exportToPng,
  exportToSvg,
  exportToJpeg,
  copyToClipboard,
  copySvgToClipboard,
} from "@/lib/export";
import { useCodeGlowStore } from "@/store/codeglow-store";
import { useToast } from "@/components/ui/toast";
import { trackEvent } from "@/lib/analytics";
import { encodeSnippetToHash } from "@/lib/share";
import { getBaseFileName } from "@/lib/filenames";

export function ExportButton({
  getFrameElement,
}: {
  getFrameElement?: () => HTMLElement | null;
} = {}) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<string | null>(null);
  const { preset, title, exportScale, setExportScale, setPreset } = useCodeGlowStore();
  const { showToast } = useToast();

  const resolveElement = () => {
    if (getFrameElement) {
      const el = getFrameElement();
      if (el) return el;
    }
    return document.getElementById("code-frame-capture");
  };

  const baseFileName = getBaseFileName(title, preset);

  const handleExportPng = async (scale: number = exportScale) => {
    const element = resolveElement();
    if (!element) return;

    setIsExporting(true);
    setExportType(`png-${scale}`);
    try {
      await exportToPng(element, `${baseFileName}-${scale}x.png`, scale);
      trackEvent("export_png", { scale });
      showToast(`Exported ${scale}x PNG successfully! ✨`, "glow");
    } catch (error) {
      console.error("Export failed:", error);
      showToast("Failed to export image", "error");
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const handleExportSvg = async () => {
    const element = resolveElement();
    if (!element) return;

    setIsExporting(true);
    setExportType("svg");
    try {
      await exportToSvg(element, `${baseFileName}.svg`);
      trackEvent("export_svg");
      showToast("Exported vector SVG successfully! 🎨", "success");
    } catch (error) {
      console.error("SVG export failed:", error);
      showToast("Failed to export SVG", "error");
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const handleExportJpeg = async () => {
    const element = resolveElement();
    if (!element) return;

    setIsExporting(true);
    setExportType("jpeg");
    try {
      await exportToJpeg(element, `${baseFileName}.jpg`, exportScale);
      trackEvent("export_jpeg", { scale: exportScale });
      showToast("Exported JPEG successfully! 🖼️", "success");
    } catch (error) {
      console.error("JPEG export failed:", error);
      showToast("Failed to export JPEG", "error");
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const handleCopyImage = async (scale: number = exportScale) => {
    const element = resolveElement();
    if (!element) return;

    setIsExporting(true);
    setExportType("copy-png");
    try {
      await copyToClipboard(element, scale);
      trackEvent("copy_image", { scale, source: "navbar" });
      showToast("Image copied to clipboard! 📋", "glow");
    } catch (error) {
      console.error("Copy failed:", error);
      showToast("Failed to copy image to clipboard", "error");
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const handleCopySvg = async () => {
    const element = resolveElement();
    if (!element) return;

    setIsExporting(true);
    setExportType("copy-svg");
    try {
      await copySvgToClipboard(element);
      trackEvent("copy_svg");
      showToast("SVG code copied to clipboard! 📋", "success");
    } catch (error) {
      console.error("SVG copy failed:", error);
      showToast("Failed to copy SVG", "error");
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const collectShareConfig = () => {
    const s = useCodeGlowStore.getState();
    return {
      code: s.code,
      language: s.language,
      title: s.title,
      showTitle: s.showTitle,
      theme: s.theme,
      font: s.font,
      fontSize: s.fontSize,
      lineHeight: s.lineHeight,
      padding: s.padding,
      borderRadius: s.borderRadius,
      shadow: s.shadow,
      shadowStyle: s.shadowStyle,
      lineNumbers: s.lineNumbers,
      startLineNumber: s.startLineNumber,
      highlightedLines: s.highlightedLines,
      windowStyle: s.windowStyle,
      showWatermark: s.showWatermark,
      watermarkText: s.watermarkText,
      glow: s.glow,
      background: s.background,
      preset: s.preset,
      cardWidth: s.cardWidth,
      exportScale: s.exportScale,
    };
  };

  const handleCopyLink = async () => {
    try {
      const hash = encodeSnippetToHash(collectShareConfig());
      if (!hash) throw new Error("Encoding failed");
      const url = `${window.location.origin}${window.location.pathname}#${hash}`;
      await navigator.clipboard.writeText(url);
      trackEvent("share_link_copied");
      showToast("Shareable link copied! Anyone opening it sees your snippet 🔗", "glow");
    } catch (e) {
      console.error("Failed to generate share link:", e);
      showToast("Failed to generate share link", "error");
    }
  };

  const handlePostToX = async () => {
    const element = resolveElement();
    if (!element) return;

    // Open the compose window synchronously so popup blockers allow it,
    // then export the image for the user to attach.
    const text = `${title?.trim() || "My code"} — made with CodeGlow ✨ #CodeGlow`;
    window.open(
      `https://x.com/intent/post?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener"
    );

    setIsExporting(true);
    setExportType(`png-${exportScale}`);
    try {
      await exportToPng(element, `${baseFileName}-${exportScale}x.png`, exportScale);
      trackEvent("post_to_x", { scale: exportScale });
      showToast("Image downloaded — attach it to your post! 🐦", "glow");
    } catch (error) {
      console.error("Export failed:", error);
      showToast("Failed to export image", "error");
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const handleExportPack = async () => {
    const element = resolveElement();
    if (!element) return;

    const pack: Array<{ id: string; label: string }> = [
      { id: "twitter", label: "X / Twitter" },
      { id: "square", label: "Square" },
      { id: "story", label: "Story" },
    ];
    const previousPreset = preset;

    setIsExporting(true);
    setExportType("pack");
    try {
      for (const item of pack) {
        setPreset(item.id);
        // Let React flush the layout + paint before capturing.
        await new Promise((r) => setTimeout(r, 450));
        const el = resolveElement();
        if (!el) throw new Error("Canvas element lost during pack export");
        await exportToPng(el, `${baseFileName}-${item.id}-${exportScale}x.png`, exportScale);
      }
      trackEvent("export_pack", { count: pack.length, scale: exportScale });
      showToast("Exported X + Square + Story pack! 🖼️", "glow");
    } catch (error) {
      console.error("Pack export failed:", error);
      showToast("Failed to export pack", "error");
    } finally {
      setPreset(previousPreset);
      setIsExporting(false);
      setExportType(null);
    }
  };

  const handleCopyReadme = async () => {
    const element = resolveElement();
    if (!element) return;

    setIsExporting(true);
    setExportType("readme");
    try {
      const fileName = `${baseFileName}-${exportScale}x.png`;
      await exportToPng(element, fileName, exportScale);
      const alt = title?.trim() || "code snippet";
      await navigator.clipboard.writeText(`![${alt}](${fileName})`);
      trackEvent("readme_copied");
      showToast("PNG downloaded + README markdown copied! 📝", "success");
    } catch (error) {
      console.error("README export failed:", error);
      showToast("Failed to export README snippet", "error");
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Primary Export Button Group */}
      <div className="inline-flex rounded-xl shadow-lg shadow-purple-500/15 overflow-hidden">
        <Button
          onClick={() => handleExportPng(exportScale)}
          disabled={isExporting}
          className="rounded-r-none border-r border-purple-500/30 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium h-9 px-3.5 gap-1.5"
          data-export="true"
        >
          {isExporting && exportType?.startsWith("png") ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">Export PNG</span>
          <span className="sm:hidden">Export</span>
          <span className="text-[10px] opacity-75 font-mono ml-0.5 bg-black/20 px-1 py-0.5 rounded">
            {exportScale}x
          </span>
        </Button>

        {/* Export Options Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              disabled={isExporting}
              className="rounded-l-none bg-indigo-600 hover:bg-indigo-700 text-white px-2 h-9"
              aria-label="Export options"
            >
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-1.5 shadow-2xl">
            <DropdownMenuLabel className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-2 py-1">
              Resolution Scale
            </DropdownMenuLabel>
            <div className="grid grid-cols-4 gap-1 px-1 mb-2">
              {[1, 2, 3, 4].map((scale) => (
                <button
                  key={scale}
                  onClick={() => {
                    setExportScale(scale as 1 | 2 | 3 | 4);
                    handleExportPng(scale);
                  }}
                  className={`flex items-center justify-center py-1 rounded text-xs font-mono font-medium transition-colors ${
                    exportScale === scale
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {scale}x {scale === 2 && "•"}
                </button>
              ))}
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuLabel className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-2 py-1">
              Formats
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => handleExportPng(exportScale)}
              className="gap-2 cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 text-purple-400" />
              <span>PNG Image ({exportScale}x Retina)</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleExportSvg}
              className="gap-2 cursor-pointer"
            >
              <FileCode2 className="w-4 h-4 text-blue-400" />
              <span>SVG Vector Graphic</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleCopySvg}
              className="gap-2 cursor-pointer"
            >
              <Copy className="w-4 h-4 text-blue-400" />
              <span>Copy SVG to Clipboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleExportJpeg}
              className="gap-2 cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 text-emerald-400" />
              <span>JPEG Image (Compressed)</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleExportPack}
              className="gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Social Pack (X + Square + Story)</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleCopyReadme}
              className="gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-zinc-400" />
              <span>README Markdown Snippet</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuLabel className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-2 py-1">
              Share
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={handleCopyLink}
              className="gap-2 cursor-pointer font-medium text-purple-600 dark:text-purple-400"
            >
              <Share2 className="w-4 h-4" />
              <span>Copy Shareable Link</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handlePostToX}
              className="gap-2 cursor-pointer font-medium text-sky-500 dark:text-sky-400"
            >
              <Send className="w-4 h-4" />
              <span>Post to X</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Always render Copy so SSR HTML matches the client. Clipboard
          support is feature-detected at click time; failures toast. */}
      <Button
        onClick={() => handleCopyImage(exportScale)}
        disabled={isExporting}
        variant="outline"
        className="border-zinc-300 dark:border-zinc-700 hover:border-purple-500 dark:hover:border-purple-500 h-9 px-3 gap-1.5"
        data-copy="true"
        title="Copy PNG to clipboard (Ctrl+Shift+C)"
      >
        {isExporting && exportType === "copy-png" ? (
          <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
        <span className="hidden sm:inline">Copy</span>
      </Button>
    </div>
  );
}
