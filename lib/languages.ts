export interface LanguageOption {
  id: string;
  name: string;
  shikiLang: string;
  extension: string;
  sample: string;
}

export const LANGUAGES: readonly LanguageOption[] = [
  {
    id: "typescript",
    name: "TypeScript",
    shikiLang: "typescript",
    extension: "ts",
    sample: `interface User {
  id: string;
  name: string;
  role: "admin" | "member";
}

export async function fetchProfile(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
}`,
  },
  {
    id: "javascript",
    name: "JavaScript",
    shikiLang: "javascript",
    extension: "js",
    sample: `const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};`,
  },
  {
    id: "tsx",
    name: "React (TSX)",
    shikiLang: "tsx",
    extension: "tsx",
    sample: `export function GlowingButton({ children, onClick }: Props) {
  const [active, setActive] = useState(false);

  return (
    <button
      onClick={onClick}
      className="relative px-6 py-2.5 rounded-xl font-medium text-white shadow-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 transition-transform"
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 rounded-xl bg-purple-500/50 blur-lg" />
    </button>
  );
}`,
  },
  {
    id: "python",
    name: "Python",
    shikiLang: "python",
    extension: "py",
    sample: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="CodeGlow API")

class Snippet(BaseModel):
    title: str
    code: str
    language: str = "python"

@app.post("/snippets")
async def create_snippet(snippet: Snippet):
    return {"id": "snip_9821", **snippet.model_dump()}`,
  },
  {
    id: "rust",
    name: "Rust",
    shikiLang: "rust",
    extension: "rs",
    sample: `use tokio::sync::mpsc;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let (tx, mut rx) = mpsc::channel(32);

    tokio::spawn(async move {
        tx.send("🚀 Message from worker").await.unwrap();
    });

    while let Some(message) = rx.recv().await {
        println!("Received: {}", message);
    }
    Ok(())
}`,
  },
  {
    id: "go",
    name: "Go",
    shikiLang: "go",
    extension: "go",
    sample: `package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	ch := make(chan string, 3)

	for i := 1; i <= 3; i++ {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			ch <- fmt.Sprintf("Worker %d completed", id)
		}(i)
	}

	wg.Wait()
	close(ch)
	for msg := range ch {
		fmt.Println(msg)
	}
}`,
  },
  {
    id: "sql",
    name: "SQL",
    shikiLang: "sql",
    extension: "sql",
    sample: `WITH RankedSales AS (
  SELECT
    author_id,
    SUM(amount) AS total_revenue,
    DENSE_RANK() OVER (ORDER BY SUM(amount) DESC) AS rank
  FROM transactions
  WHERE created_at >= NOW() - INTERVAL '30 days'
  GROUP BY author_id
)
SELECT * FROM RankedSales WHERE rank <= 10;`,
  },
  {
    id: "css",
    name: "CSS",
    shikiLang: "css",
    extension: "css",
    sample: `.glow-card {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 50px -10px rgba(147, 51, 234, 0.5);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}`,
  },
  {
    id: "json",
    name: "JSON",
    shikiLang: "json",
    extension: "json",
    sample: `{
  "name": "codeglow",
  "version": "1.0.0",
  "features": [
    "Ultra HD Export",
    "Multi-Layered Glow",
    "Realtime Syntax Highlights"
  ],
  "author": "CodeGlow",
  "license": "MIT"
}`,
  },
  {
    id: "html",
    name: "HTML",
    shikiLang: "html",
    extension: "html",
    sample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CodeGlow</title>
  </head>
  <body class="bg-black text-white flex items-center justify-center min-h-screen">
    <div class="card p-8 rounded-2xl shadow-glow">
      <h1>Make your code glow ✨</h1>
    </div>
  </body>
</html>`,
  },
  {
    id: "bash",
    name: "Bash / Shell",
    shikiLang: "bash",
    extension: "sh",
    sample: `#!/usr/bin/env bash
set -euo pipefail

echo "⚡ Starting CodeGlow deployment..."
bun install --frozen-lockfile
bun run build

docker build -t codeglow:latest .
echo "✨ Deploy successful!"`,
  },
  {
    id: "markdown",
    name: "Markdown",
    shikiLang: "markdown",
    extension: "md",
    sample: `# 🌟 CodeGlow
> Beautiful code images in seconds.

- **Fast**: Realtime rendering with Shiki
- **Crisp**: Vector SVG & 4K Retina PNG
- **Social Ready**: Presets for X, LinkedIn & GitHub`,
  },
  {
    id: "cpp",
    name: "C++",
    shikiLang: "cpp",
    extension: "cpp",
    sample: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {5, 2, 9, 1, 5, 6};
    std::sort(numbers.begin(), numbers.end());

    std::cout << "Sorted: ";
    for (int n : numbers) std::cout << n << " ";
    std::cout << "\\n";
    return 0;
}`,
  },
  {
    id: "java",
    name: "Java",
    shikiLang: "java",
    extension: "java",
    sample: `import java.util.List;

public class StreamExample {
    public static void main(String[] args) {
        List<String> names = List.of("Alice", "Bob", "Charlie", "David");
        names.stream()
             .filter(name -> name.length() > 3)
             .map(String::toUpperCase)
             .forEach(System.out::println);
    }
}`,
  },
  {
    id: "yaml",
    name: "YAML",
    shikiLang: "yaml",
    extension: "yaml",
    sample: `name: Release Pipeline
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Bun
        uses: oven-sh/setup-bun@v2`,
  },
] as const;

export type LanguageId = typeof LANGUAGES[number]["id"];

export function detectLanguage(title?: string, code?: string): string {
  if (title) {
    const dot = title.lastIndexOf(".");
    const ext =
      dot > 0 && dot < title.length - 1
        ? title.slice(dot + 1).toLowerCase()
        : undefined;
    if (ext) {
      const matched = LANGUAGES.find((l) => l.extension === ext);
      if (matched) return matched.id;
      if (ext === "py") return "python";
      if (ext === "rs") return "rust";
      if (ext === "js" || ext === "mjs" || ext === "cjs") return "javascript";
      if (ext === "ts" || ext === "mts" || ext === "cts") return "typescript";
      if (ext === "tsx" || ext === "jsx") return "tsx";
      if (ext === "go") return "go";
      if (ext === "sql") return "sql";
      if (ext === "json") return "json";
      if (ext === "html") return "html";
      if (ext === "css") return "css";
      if (ext === "sh" || ext === "bash" || ext === "zsh") return "bash";
    }
  }

  if (code) {
    if (code.includes("fn ") && code.includes("let ")) return "rust";
    if (code.includes("package ") && code.includes("func ")) return "go";
    if (/SELECT\s+.*\s+FROM/i.test(code)) return "sql";
    if (code.includes("<div") || code.includes("<!DOCTYPE") || code.includes("<html>")) return "html";
    if (code.includes("def ") && !code.includes("function") && !code.includes("const")) return "python";
    if (code.includes("interface ") || code.includes(": string") || code.includes(": number") || code.includes("type ")) return "typescript";
  }

  return "typescript";
}
