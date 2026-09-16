export interface BackgroundOption {
  id: string;
  name: string;
  type: "gradient" | "solid" | "mesh" | "transparent";
  value: string;
  category: "gradient" | "solid" | "mesh";
}

export const BACKGROUNDS: readonly BackgroundOption[] = [
  // Gradients
  {
    id: "cosmic-purple",
    name: "Cosmic Violet",
    type: "gradient",
    category: "gradient",
    value: "linear-gradient(135deg, #1e1b4b 0%, #312e81 45%, #4c1d95 100%)",
  },
  {
    id: "sunset-blaze",
    name: "Sunset Blaze",
    type: "gradient",
    category: "gradient",
    value: "linear-gradient(135deg, #431407 0%, #9a3412 50%, #ea580c 100%)",
  },
  {
    id: "neon-cyberpunk",
    name: "Neon Cyberpunk",
    type: "gradient",
    category: "gradient",
    value: "linear-gradient(135deg, #050518 0%, #3b0764 45%, #ec4899 90%, #f43f5e 100%)",
  },
  {
    id: "aurora-green",
    name: "Northern Lights",
    type: "gradient",
    category: "gradient",
    value: "linear-gradient(135deg, #022c22 0%, #065f46 50%, #059669 100%)",
  },
  {
    id: "oceanic-cyan",
    name: "Deep Oceanic",
    type: "gradient",
    category: "gradient",
    value: "linear-gradient(135deg, #082f49 0%, #0369a1 50%, #06b6d4 100%)",
  },
  {
    id: "rose-quartz",
    name: "Rose Quartz",
    type: "gradient",
    category: "gradient",
    value: "linear-gradient(135deg, #500724 0%, #831843 50%, #be185d 100%)",
  },
  {
    id: "obsidian-dark",
    name: "Dark Obsidian",
    type: "gradient",
    category: "gradient",
    value: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #27272a 100%)",
  },
  {
    id: "vaporwave",
    name: "Retro Vapor",
    type: "gradient",
    category: "gradient",
    value: "linear-gradient(135deg, #1e1b4b 0%, #831843 50%, #f59e0b 100%)",
  },
  {
    id: "cotton-candy",
    name: "Cotton Candy",
    type: "gradient",
    category: "gradient",
    value: "linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #f472b6 100%)",
  },
  {
    id: "emerald-glow",
    name: "Emerald City",
    type: "gradient",
    category: "gradient",
    value: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #10b981 100%)",
  },
  {
    id: "midnight-sky",
    name: "Midnight Sky",
    type: "gradient",
    category: "gradient",
    value: "linear-gradient(135deg, #030712 0%, #111827 50%, #1f2937 100%)",
  },
  {
    id: "ultraviolet",
    name: "Ultraviolet",
    type: "gradient",
    category: "gradient",
    value: "linear-gradient(135deg, #0f0520 0%, #5b21b6 55%, #d946ef 100%)",
  },
  {
    id: "matcha",
    name: "Matcha",
    type: "gradient",
    category: "gradient",
    value: "linear-gradient(135deg, #052e16 0%, #166534 55%, #4d7c0f 100%)",
  },
  {
    id: "bubblegum",
    name: "Bubblegum",
    type: "gradient",
    category: "gradient",
    value: "linear-gradient(135deg, #831843 0%, #db2777 50%, #f9a8d4 100%)",
  },
  {
    id: "ember",
    name: "Ember",
    type: "gradient",
    category: "gradient",
    value: "linear-gradient(135deg, #180202 0%, #7c2d12 55%, #fbbf24 100%)",
  },
  {
    id: "nordic-frost",
    name: "Nordic Frost",
    type: "gradient",
    category: "gradient",
    value: "linear-gradient(135deg, #082f49 0%, #475569 60%, #cbd5e1 100%)",
  },
  {
    id: "supernova",
    name: "Supernova",
    type: "gradient",
    category: "gradient",
    value: "linear-gradient(135deg, #450a0a 0%, #991b1b 50%, #ef4444 100%)",
  },

  // Solids
  {
    id: "pitch-black",
    name: "Pitch Black",
    type: "solid",
    category: "solid",
    value: "#000000",
  },
  {
    id: "dark-zinc",
    name: "Dark Zinc",
    type: "solid",
    category: "solid",
    value: "#18181b",
  },
  {
    id: "deep-slate",
    name: "Deep Slate",
    type: "solid",
    category: "solid",
    value: "#0f172a",
  },
  {
    id: "pure-white",
    name: "Pure White",
    type: "solid",
    category: "solid",
    value: "#ffffff",
  },
  {
    id: "crimson",
    name: "Crimson Red",
    type: "solid",
    category: "solid",
    value: "#7f1d1d",
  },
  {
    id: "royal-blue",
    name: "Royal Blue",
    type: "solid",
    category: "solid",
    value: "#1e3a8a",
  },
  {
    id: "warm-paper",
    name: "Warm Paper",
    type: "solid",
    category: "solid",
    value: "#f4f1ea",
  },
] as const;

export const NOISE_SVG_DATA_URL = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E`;
