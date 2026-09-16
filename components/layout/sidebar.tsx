"use client";

import { useState, type ReactNode } from "react";
import { ThemeSelector } from "@/components/controls/theme-selector";
import { FontSelector } from "@/components/controls/font-selector";
import { PresetSelector } from "@/components/controls/preset-selector";
import { BackgroundSelector } from "@/components/controls/background-selector";
import { GlowControls } from "@/components/controls/glow-controls";
import { FrameControls } from "@/components/controls/frame-controls";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileCode,
  Copy,
  Check,
  Trash2,
  Sparkles,
} from "lucide-react";
import { useCodeGlowStore } from "@/store/codeglow-store";
import { LANGUAGES } from "@/lib/languages";

function stripExtension(filename: string) {
  const dot = filename.lastIndexOf(".");
  if (dot > 0 && dot < filename.length - 1) {
    return filename.slice(0, dot);
  }
  return filename;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="px-4 py-4 border-b border-zinc-200 dark:border-zinc-800 last:border-b-0">
      <h2 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
        {title}
      </h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}

export function Sidebar() {
  const {
    code,
    language,
    title,
    fontSize,
    setFontSize,
    lineHeight,
    setLineHeight,
    setCode,
    setLanguage,
    setTitle,
  } = useCodeGlowStore();

  const [copied, setCopied] = useState(false);

  const handleLanguageChange = (langId: string) => {
    setLanguage(langId);
    const langObj = LANGUAGES.find((l) => l.id === langId);
    if (langObj && title) {
      setTitle(`${stripExtension(title)}.${langObj.extension}`);
    }
  };

  const handleLoadSample = (langId: string) => {
    const langObj = LANGUAGES.find((l) => l.id === langId);
    if (langObj) {
      setCode(langObj.sample);
      setLanguage(langObj.id);
      setTitle(`example.${langObj.extension}`);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      console.error("Failed to copy raw code:", e);
    }
  };

  return (
    <aside className="w-full lg:w-72 shrink-0 bg-white dark:bg-zinc-950 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 overflow-y-auto lg:max-h-full max-h-[42vh]">
      {/* Code */}
      <Section title="Code">
        <div className="flex items-center gap-1.5 px-2.5 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <FileCode className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="filename.ext"
            aria-label="Filename"
            className="bg-transparent text-xs font-mono text-zinc-900 dark:text-zinc-100 outline-none w-full placeholder:text-zinc-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-zinc-500">Language</Label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger
                aria-label="Language"
                className="h-9 text-xs border-zinc-200 dark:border-zinc-800"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.id} value={lang.id} className="text-xs">
                    <span className="font-medium">{lang.name}</span>
                    <span className="ml-2 text-[10px] text-zinc-400 font-mono">
                      .{lang.extension}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-zinc-500">Sample</Label>
            <Select onValueChange={handleLoadSample}>
              <SelectTrigger
                aria-label="Load code sample"
                className="h-9 px-2.5 text-xs border-zinc-200 dark:border-zinc-800 gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                <span>Samples</span>
              </SelectTrigger>
              <SelectContent>
                <div className="px-2 py-1 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Load Code Template
                </div>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.id} value={lang.id} className="text-xs">
                    {lang.name} snippet
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyCode}
            className="h-8 text-xs gap-1.5 border-zinc-200 dark:border-zinc-800"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-500" />
                <span className="text-green-500">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy code</span>
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCode("")}
            className="h-8 text-xs gap-1.5 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-red-500"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </Button>
        </div>
        <p className="text-[11px] text-zinc-400 leading-relaxed">
          Tip: click the canvas and type — or drop a code file onto it.
        </p>
      </Section>

      {/* Canvas size */}
      <Section title="Canvas">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-zinc-500">Size preset</Label>
          <PresetSelector />
        </div>
      </Section>

      {/* Theme */}
      <Section title="Theme">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-zinc-500">Syntax theme</Label>
          <ThemeSelector />
        </div>
      </Section>

      {/* Font */}
      <Section title="Font">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-zinc-500">Typeface</Label>
          <FontSelector />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="sidebar-font-size" className="text-xs text-zinc-500">
              Size
            </Label>
            <span className="text-xs font-mono text-zinc-500">{fontSize}px</span>
          </div>
          <Slider
            id="sidebar-font-size"
            value={[fontSize]}
            onValueChange={([val]) => setFontSize(val)}
            min={10}
            max={24}
            step={1}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="sidebar-line-height" className="text-xs text-zinc-500">
              Line height
            </Label>
            <span className="text-xs font-mono text-zinc-500">{lineHeight}</span>
          </div>
          <Slider
            id="sidebar-line-height"
            value={[lineHeight]}
            onValueChange={([val]) => setLineHeight(val)}
            min={1.2}
            max={2.0}
            step={0.1}
          />
        </div>
      </Section>

      {/* Background */}
      <Section title="Background">
        <BackgroundSelector />
      </Section>

      {/* Glow */}
      <Section title="Glow">
        <GlowControls />
      </Section>

      {/* Frame */}
      <Section title="Frame">
        <FrameControls />
      </Section>
    </aside>
  );
}
