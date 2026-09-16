import type { VibeId } from "@/lib/vibes";

export interface GalleryExample {
  slug: string;
  title: string;
  blurb: string;
  language: string;
  vibe: VibeId;
  fileTitle: string;
  code: string;
}

export const GALLERY_EXAMPLES: readonly GalleryExample[] = [
  {
    slug: "async-cleanup",
    title: "Async Cleanup Job",
    blurb: "TypeScript with Midnight Glass — the signature CodeGlow look.",
    language: "typescript",
    vibe: "midnight-glass",
    fileTitle: "cleanup.ts",
    code: [
      "const sleep = (ms: number) =>",
      "  new Promise<void>((res) => setTimeout(res, ms));",
      "",
      "const cleanupJob = async () => {",
      '  console.log("cleanup started");',
      "  await sleep(8000);",
      '  console.log("cleanup finished");',
      "};",
    ].join("\n"),
  },
  {
    slug: "sunset-api",
    title: "Sunset API Route",
    blurb: "Sunset Hot Take vibe — built for spicy timeline posts.",
    language: "typescript",
    vibe: "sunset-hot-take",
    fileTitle: "route.ts",
    code: [
      "export async function POST(req: Request) {",
      "  const body = await req.json();",
      '  if (!body.email) return Response.json(',
      '    { error: "email required" },',
      "    { status: 400 }",
      "  );",
      "  return Response.json({ ok: true });",
      "}",
    ].join("\n"),
  },
  {
    slug: "terminal-deploy",
    title: "Ship It Script",
    blurb: "Terminal Hacker vibe — green-on-black deploy script.",
    language: "bash",
    vibe: "terminal-hacker",
    fileTitle: "deploy.sh",
    code: [
      "#!/usr/bin/env bash",
      "set -euo pipefail",
      "",
      'echo "Building..."',
      "bun install --frozen-lockfile",
      "bun run build",
      'echo "Shipped!"',
    ].join("\n"),
  },
  {
    slug: "python-api",
    title: "FastAPI Endpoint",
    blurb: "Ocean Focus vibe — calm blues for Python backends.",
    language: "python",
    vibe: "ocean-focus",
    fileTitle: "main.py",
    code: [
      "from fastapi import FastAPI",
      "",
      "app = FastAPI(title='CodeGlow API')",
      "",
      "@app.get('/health')",
      "async def health():",
      '    return {"status": "glowing"}',
    ].join("\n"),
  },
  {
    slug: "readme-config",
    title: "Config Snapshot",
    blurb: "Clean Minimal vibe — docs and README ready.",
    language: "json",
    vibe: "clean-minimal",
    fileTitle: "codeglow.json",
    code: [
      "{",
      '  "theme": "github-light",',
      '  "exportScale": 2,',
      '  "background": "warm-paper",',
      '  "watermark": true',
      "}",
    ].join("\n"),
  },
  {
    slug: "rust-worker",
    title: "Rust Worker",
    blurb: "Ultraviolet Pop vibe — maximum timeline pop.",
    language: "rust",
    vibe: "ultraviolet-pop",
    fileTitle: "worker.rs",
    code: [
      "use tokio::sync::mpsc;",
      "",
      "async fn worker(mut rx: mpsc::Receiver<Job>) {",
      "    while let Some(job) = rx.recv().await {",
      "        job.run().await;",
      "    }",
      "}",
    ].join("\n"),
  },
] as const;
