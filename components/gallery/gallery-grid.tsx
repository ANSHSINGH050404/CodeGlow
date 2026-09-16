"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import { GALLERY_EXAMPLES, type GalleryExample } from "@/lib/gallery";
import { VIBES } from "@/lib/vibes";
import { encodeSnippetToHash } from "@/lib/share";
import { trackEvent } from "@/lib/analytics";

function remixHash(example: GalleryExample): string {
  const vibe = VIBES.find((v) => v.id === example.vibe);
  return encodeSnippetToHash({
    ...(vibe?.config ?? {}),
    code: example.code,
    language: example.language,
    title: example.fileTitle,
  });
}

function ExampleCard({ example }: { example: GalleryExample }) {
  const vibe = VIBES.find((v) => v.id === example.vibe);
  const hash = useMemo(() => remixHash(example), [example]);
  const previewLines = example.code.split("\n").slice(0, 5);

  return (
    <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all">
      <div className="p-5" style={{ background: vibe?.swatch }}>
        <div className="rounded-xl bg-black/70 backdrop-blur px-4 py-3 font-mono text-[11px] leading-relaxed text-zinc-200 overflow-hidden">
          {previewLines.map((line, i) => (
            <div key={i} className="whitespace-pre truncate">
              {line || " "}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {example.title}
          </h2>
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            {example.language}
          </span>
        </div>
        <p className="text-xs text-zinc-500 leading-relaxed">{example.blurb}</p>
        <Link
          href={`/#${hash}`}
          onClick={() => trackEvent("gallery_remix", { slug: example.slug })}
          className="mt-2 inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium bg-purple-600 hover:bg-purple-700 text-white transition-colors"
        >
          <Pencil className="w-3.5 h-3.5" />
          Remix this
        </Link>
      </div>
    </article>
  );
}

export function GalleryGrid() {
  return (
    <div className="min-h-full flex flex-col bg-zinc-50 dark:bg-black">
      <header className="shrink-0 px-4 sm:px-8 pt-10 pb-6 max-w-6xl mx-auto w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-purple-500 transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Studio
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Made to be shared
        </h1>
        <p className="mt-2 text-sm text-zinc-500 max-w-xl leading-relaxed">
          Starter styles from the CodeGlow community. Open any example,
          make it yours, and post it — every remix links back here.
        </p>
      </header>
      <main className="flex-1 px-4 sm:px-8 pb-12 max-w-6xl mx-auto w-full grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY_EXAMPLES.map((example) => (
          <ExampleCard key={example.slug} example={example} />
        ))}
      </main>
    </div>
  );
}
