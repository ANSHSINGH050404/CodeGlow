# CodeGlow

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**Make your code glow.**

Paste. Style. Glow. Share.

CodeGlow is a modern web app that lets developers paste or write code, customize its visual appearance, preview it live, and export it as a beautiful high-resolution image for X/Twitter, LinkedIn, GitHub, blogs, and documentation.

## Features

- **Canvas Editing**: Edit code directly on the canvas with live Shiki syntax highlighting
- **Vibes**: One-click style templates (Midnight Glass, Sunset Hot Take, Terminal Hacker, Clean Minimal, Ocean Focus, Ultraviolet Pop)
- **Customization**:
  - 25 syntax themes across dark and light styles
  - 5 monospace fonts (Geist Mono, JetBrains Mono, Fira Code, IBM Plex Mono, Source Code Pro)
  - 18 gradient/solid backgrounds plus transparent
  - Glow effects with customizable intensity and colors
  - Frame styles (macOS, Minimal, None)
  - Adjustable padding, border radius, shadows, line numbers
- **Share Links**: Copy a URL that reopens your exact snippet for anyone (remix loop)
- **Post to X**: One click opens a pre-filled post and downloads the image to attach
- **Social Pack**: Export X + Square + Story sizes in one go
- **README Snippets**: Export PNG and copy a Markdown image tag together
- **Gallery**: Curated remixable examples at `/gallery`
- **Social Media Presets**: Pre-configured dimensions for X/Twitter, LinkedIn, Square, Story, GitHub, and Blog
- **Export**: High-quality PNG (1x–4x), SVG vector, and JPEG
- **Copy to Clipboard**: Canvas image copying from navbar and sidebar
- **Local Storage**: Automatic persistence of your work
- **Keyboard Shortcuts**: 
  - `Ctrl/Cmd + Enter`: Export PNG
  - `Ctrl/Cmd + Shift + C`: Copy image
- **Responsive Design**: Works on desktop, tablet, and mobile

## Tech Stack

- **Next.js 16** with React 19
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Shiki** for syntax highlighting and canvas editing
- **Zustand** for state management
- **html-to-image** for image export
- **Radix UI** for accessible components
- **Lucide React** for icons

## Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

## Testing

```bash
bun test        # unit tests (Bun runner, colocated *.test.ts)
```

Covers share-link codec, storage sanitize/persistence, language
detection, filename helpers, vibes/gallery data validity, catalog
metadata, and store behavior (setters, highlight toggles, deep-merge,
reset).

## Analytics

Product analytics via [PostHog](https://posthog.com/): pageviews plus
`export_png`, `export_svg`, `export_jpeg`, `copy_svg`, `copy_image`,
`sample_loaded`, `preset_changed`, `share_link_copied`, `post_to_x`,
`template_applied`, `export_pack`, `readme_copied` and `gallery_remix`
events. Optional — without
`NEXT_PUBLIC_POSTHOG_KEY` all tracking calls are no-ops. To enable,
create `.env.local`:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com  # or https://eu.i.posthog.com
```

## SEO & Deployment

Set the canonical production URL so Open Graph cards, sitemap and
canonical links point at the right domain (defaults to
`https://codeglow-kappa.vercel.app`):

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Tracking stays off on `localhost` so dev traffic never pollutes
production data. To verify events end to end locally, add
`NEXT_PUBLIC_POSTHOG_FORCE_DEV=true` and watch PostHog's Live events
view while exporting.

## Usage

1. **Paste Code**: Type directly on the canvas, paste, or drop a code file anywhere on it
2. **Pick a Vibe**: One-click style templates, or fine-tune theme, font, background, glow, and frame in the sidebar
3. **Preview**: See your changes in real-time on the canvas
4. **Export**: Click "Export PNG" to download, "Copy" for the clipboard, or grab the X + Square + Story pack
5. **Share**: Copy a shareable link, post straight to X, or browse `/gallery` for remixable starters

## Project Structure

```
codeglow/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Studio (share-hash loading, shortcuts)
│   ├── gallery/page.tsx   # Remixable examples gallery (+ SEO metadata)
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── analytics/        # PostHog provider
│   ├── gallery/          # Gallery grid
│   ├── layout/           # Navbar, sidebar, and workspace
│   ├── preview/          # Editable code canvas with Shiki highlighting
│   ├── controls/         # Customization controls
│   ├── export/           # Export functionality
│   └── ui/               # Reusable UI components
├── lib/                  # Utility functions
│   ├── analytics.ts      # Safe trackEvent helper
│   ├── gallery.ts        # Gallery example data
│   ├── share.ts          # Share-link encode/decode
│   ├── vibes.ts          # One-click style templates
│   ├── utils.ts          # General utilities
│   ├── themes.ts         # Theme definitions
│   ├── fonts.ts          # Font definitions
│   ├── presets.ts        # Social media presets
│   ├── export.ts         # Image export functions
│   └── storage.ts        # Local storage utilities
├── store/                # State management
│   └── codeglow-store.ts # Zustand store
└── types/                # TypeScript types
    └── codeglow.ts       # Type definitions
```

## Contributing

Issues and pull requests are welcome. Please open an issue first to discuss
larger changes.

## License

This project is open source under the [MIT License](./LICENSE).

## Built with

- [Next.js](https://nextjs.org/)
- [Shiki](https://shiki.style/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
