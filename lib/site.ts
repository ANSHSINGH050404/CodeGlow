/**
 * Public site links. Fill in GITHUB_REPO_URL with the real repository URL
 * (e.g. https://github.com/<user>/codeglow) — the navbar GitHub icon
 * stays hidden until this is set.
 */
export const GITHUB_REPO_URL = "https://github.com/ANSHSINGH050404/CodeGlow";

/**
 * Canonical production URL used for SEO metadata (Open Graph, sitemap,
 * canonical links). Override with NEXT_PUBLIC_SITE_URL once a custom
 * domain or the final Vercel URL is known.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://codeglow.vercel.app";

export const SITE_NAME = "CodeGlow";
export const SITE_TAGLINE = "Make your code glow";
export const SITE_DESCRIPTION =
  "Paste. Style. Glow. Share. Create beautiful code images for X, LinkedIn, GitHub READMEs, blogs and docs — free, no sign-up.";
