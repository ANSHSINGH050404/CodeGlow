export const FONTS = [
  { id: "geist-mono", name: "Geist Mono", fontFamily: "var(--font-geist-mono)" },
  { id: "jetbrains-mono", name: "JetBrains Mono", fontFamily: "var(--font-jetbrains-mono)" },
  { id: "fira-code", name: "Fira Code", fontFamily: "var(--font-fira-code)" },
  { id: "ibm-plex-mono", name: "IBM Plex Mono", fontFamily: "var(--font-ibm-plex-mono)" },
  { id: "source-code-pro", name: "Source Code Pro", fontFamily: "var(--font-source-code-pro)" },
] as const;

export type FontId = typeof FONTS[number]["id"];
