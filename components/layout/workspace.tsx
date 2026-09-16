"use client";

import { useRef, useState, useEffect } from "react";
import { CodeFrame } from "@/components/preview/code-frame";
import { Sidebar } from "@/components/layout/sidebar";
import { Upload } from "lucide-react";
import { useCodeGlowStore } from "@/store/codeglow-store";
import { PRESETS } from "@/lib/presets";
import { LANGUAGES } from "@/lib/languages";

export function Workspace() {
  const frameRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    code,
    font,
    fontSize,
    lineHeight,
    padding,
    borderRadius,
    preset,
    cardWidth,
    setCode,
    setTitle,
    setLanguage,
  } = useCodeGlowStore();

  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const currentPreset = PRESETS.find((p) => p.id === preset) || PRESETS[0];

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current || !frameRef.current) return;

      const containerWidth = containerRef.current.clientWidth - 48; // padding
      const containerHeight = containerRef.current.clientHeight - 48;
      const frameWidth = currentPreset.width ?? frameRef.current.offsetWidth;
      const frameHeight = currentPreset.height ?? frameRef.current.offsetHeight;

      if (!frameWidth || !frameHeight) return;

      const scaleX = containerWidth / frameWidth;
      const scaleY = containerHeight / frameHeight;
      const newScale = Math.min(scaleX, scaleY, 1);

      setScale(newScale > 0 && Number.isFinite(newScale) ? newScale : 1);
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    // Observe container + frame size changes so zoom stays correct when
    // font size, padding, code length, or layout changes the frame size.
    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updateScale);
      if (containerRef.current) observer.observe(containerRef.current);
      if (frameRef.current) observer.observe(frameRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateScale);
      observer?.disconnect();
    };
  }, [
    currentPreset,
    cardWidth,
    code,
    font,
    fontSize,
    lineHeight,
    padding,
    borderRadius,
  ]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          setCode(content);
          setTitle(file.name);

          const dot = file.name.lastIndexOf(".");
          const ext =
            dot > 0 ? file.name.slice(dot + 1).toLowerCase() : undefined;
          const matchedLang = ext
            ? LANGUAGES.find((l) => l.extension === ext)
            : undefined;
          if (matchedLang) {
            setLanguage(matchedLang.id);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden bg-zinc-50 dark:bg-black">
      <Sidebar />

      {/* Canvas */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        <div
          className={`flex-1 flex flex-col bg-zinc-100 dark:bg-[#09090b] overflow-hidden relative transition-colors ${
            isDragging ? "ring-2 ring-inset ring-purple-500" : ""
          }`}
          ref={containerRef}
          style={{
            backgroundImage: "radial-gradient(rgba(120, 120, 120, 0.15) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="flex-1 overflow-hidden p-6 flex items-center justify-center">
            <div
              ref={frameRef}
              className="transition-transform duration-150 ease-out shadow-2xl"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "center center",
              }}
            >
              <CodeFrame />
            </div>
          </div>

          <div className="absolute bottom-3 left-4 pointer-events-none select-none text-[11px] font-mono text-zinc-400 dark:text-zinc-500 bg-white/70 dark:bg-zinc-950/70 backdrop-blur px-2 py-0.5 rounded-md border border-zinc-200/60 dark:border-zinc-800/60">
            {Math.round(scale * 100)}%
          </div>

          {/* Drag & Drop Overlay Hint */}
          {isDragging && (
            <div className="absolute inset-0 bg-purple-950/80 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none z-50 text-white gap-2">
              <Upload className="w-10 h-10 text-purple-400 animate-bounce" />
              <p className="text-base font-semibold">Drop code file to import</p>
              <p className="text-xs text-purple-300">Supports .ts, .js, .py, .rs, .go, .sql, and more</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
