/**
 * Filename helpers shared by the export button and the sidebar.
 * Dotfiles (e.g. ".gitignore") are treated as having no extension.
 */

/** Remove the last extension: "a.b.ts" -> "a.b", ".gitignore" -> ".gitignore". */
export function stripExtension(filename: string): string {
  const dot = filename.lastIndexOf(".");
  if (dot > 0 && dot < filename.length - 1) {
    return filename.slice(0, dot);
  }
  return filename;
}

/**
 * Base name for exported files: "cleanup.ts" -> "cleanup".
 * Falls back to `codeglow-${preset}` for empty titles.
 */
export function getBaseFileName(
  title: string | undefined | null,
  preset: string
): string {
  const raw = title?.trim() || `codeglow-${preset}`;
  const lastDot = raw.lastIndexOf(".");
  if (lastDot > 0) {
    const after = raw.slice(lastDot + 1);
    if (after && !after.includes("/") && !after.includes("\\")) {
      return raw.slice(0, lastDot) || raw;
    }
  }
  return raw;
}
