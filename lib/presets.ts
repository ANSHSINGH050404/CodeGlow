export interface PresetOption {
  id: string;
  name: string;
  category: "auto" | "social" | "general";
  width?: number;
  height?: number;
  description: string;
  badge?: string;
}

export const PRESETS: readonly PresetOption[] = [
  {
    id: "auto",
    name: "Auto (Fit Code)",
    category: "auto",
    description: "Dynamically fits snippet with even padding",
    badge: "Popular",
  },
  {
    id: "twitter",
    name: "X / Twitter",
    category: "social",
    width: 1200,
    height: 675,
    description: "16:9 post card (1200 × 675)",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    category: "social",
    width: 1200,
    height: 627,
    description: "Optimized feed image (1200 × 627)",
  },
  {
    id: "square",
    name: "Square (1:1)",
    category: "social",
    width: 1080,
    height: 1080,
    description: "Instagram & Discord post (1080 × 1080)",
  },
  {
    id: "story",
    name: "Story / Reels",
    category: "social",
    width: 1080,
    height: 1920,
    description: "9:16 vertical story (1080 × 1920)",
  },
  {
    id: "github",
    name: "GitHub README",
    category: "general",
    width: 1280,
    height: 640,
    description: "2:1 repository banner (1280 × 640)",
  },
  {
    id: "blog",
    name: "Blog Header",
    category: "general",
    width: 1600,
    height: 900,
    description: "High-res blog cover (1600 × 900)",
  },
  {
    id: "dribbble",
    name: "Dribbble Shot",
    category: "general",
    width: 1600,
    height: 1200,
    description: "4:3 showcase preview (1600 × 1200)",
  },
] as const;

export type PresetId = typeof PRESETS[number]["id"];
