export interface ThemeOption {
  id: string;
  name: string;
  shikiTheme: string;
  accent: string;
  type: "dark" | "light";
  bg: string;
}

export const THEMES: readonly ThemeOption[] = [
  { id: "github-dark", name: "GitHub Dark", shikiTheme: "github-dark", accent: "#58a6ff", type: "dark", bg: "#0d1117" },
  { id: "github-light", name: "GitHub Light", shikiTheme: "github-light", accent: "#0969da", type: "light", bg: "#ffffff" },
  { id: "dracula", name: "Dracula", shikiTheme: "dracula", accent: "#bd93f9", type: "dark", bg: "#282a36" },
  { id: "one-dark", name: "One Dark Pro", shikiTheme: "one-dark-pro", accent: "#61afef", type: "dark", bg: "#282c34" },
  { id: "tokyo-night", name: "Tokyo Night", shikiTheme: "tokyo-night", accent: "#7aa2f7", type: "dark", bg: "#1a1b26" },
  { id: "catppuccin-mocha", name: "Catppuccin Mocha", shikiTheme: "catppuccin-mocha", accent: "#cba6f7", type: "dark", bg: "#1e1e2e" },
  { id: "catppuccin-latte", name: "Catppuccin Latte", shikiTheme: "catppuccin-latte", accent: "#8839ef", type: "light", bg: "#eff1f5" },
  { id: "nord", name: "Nord", shikiTheme: "nord", accent: "#88c0d0", type: "dark", bg: "#2e3440" },
  { id: "rose-pine", name: "Rosé Pine", shikiTheme: "rose-pine", accent: "#ebbcba", type: "dark", bg: "#191724" },
  { id: "vesper", name: "Vesper", shikiTheme: "vesper", accent: "#ffc799", type: "dark", bg: "#101010" },
  { id: "night-owl", name: "Night Owl", shikiTheme: "night-owl", accent: "#82aaff", type: "dark", bg: "#011627" },
  { id: "monokai", name: "Monokai", shikiTheme: "monokai", accent: "#a6e22e", type: "dark", bg: "#272822" },
  { id: "synthwave-84", name: "Synthwave '84", shikiTheme: "synthwave-84", accent: "#ff7edb", type: "dark", bg: "#262335" },
  { id: "poimandres", name: "Poimandres", shikiTheme: "poimandres", accent: "#5de4c7", type: "dark", bg: "#1b1e28" },
  { id: "gruvbox-dark", name: "Gruvbox Dark", shikiTheme: "gruvbox-dark-medium", accent: "#fe8019", type: "dark", bg: "#282828" },
  { id: "vercel-dark", name: "Vercel Dark", shikiTheme: "vitesse-dark", accent: "#4d9375", type: "dark", bg: "#121212" },
] as const;

export type ThemeId = typeof THEMES[number]["id"];
