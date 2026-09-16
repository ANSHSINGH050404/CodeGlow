# CodeGlow

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**Make your code glow.**

Paste. Style. Glow. Share.

CodeGlow is a modern web app that lets developers paste or write code, customize its visual appearance, preview it live, and export it as a beautiful high-resolution image for X/Twitter, LinkedIn, GitHub, blogs, and documentation.

## Features

- **Canvas Editing**: Edit code directly on the canvas with live Shiki syntax highlighting
- **Customization**: 
  - 8 syntax themes (GitHub Dark/Light, Dracula, One Dark, Nord, Monokai, Tokyo Night, Vercel Dark)
  - 5 monospace fonts (Geist Mono, JetBrains Mono, Fira Code, IBM Plex Mono, Source Code Pro)
  - Background options (solid, gradient, transparent)
  - Glow effects with customizable intensity and colors
  - Frame styles (macOS, Minimal, None)
  - Adjustable padding, border radius, shadows, line numbers
- **Social Media Presets**: Pre-configured dimensions for X/Twitter, LinkedIn, Square, Story, GitHub, and Blog
- **Export**: High-quality PNG export at 2x resolution
- **Copy to Clipboard**: Direct clipboard support for quick sharing
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

## Analytics

Product analytics via [PostHog](https://posthog.com/): pageviews plus
`export_png`, `export_svg`, `export_jpeg`, `copy_svg`, `copy_image`,
`sample_loaded` and `preset_changed` events. Optional — without
`NEXT_PUBLIC_POSTHOG_KEY` all tracking calls are no-ops. To enable,
create `.env.local`:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com  # or https://eu.i.posthog.com
```

## SEO & Deployment

Set the canonical production URL so Open Graph cards, sitemap and
canonical links point at the right domain (defaults to
`https://codeglow.vercel.app`):

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Usage

1. **Paste Code**: Type directly on the canvas, paste, or drop a code file anywhere on it
2. **Customize**: Use the controls below to adjust theme, font, background, glow, and frame settings
3. **Preview**: See your changes in real-time on the canvas
4. **Export**: Click "Export PNG" to download or "Copy Image" to copy to clipboard
5. **Share**: Use your beautiful code image on social media, blogs, or documentation

## Project Structure

```
codeglow/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Main page with keyboard shortcuts
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/           # Navbar, unified control bar, and workspace
│   ├── preview/          # Editable code canvas with Shiki highlighting
│   ├── controls/         # Customization controls
│   ├── export/           # Export functionality
│   ├── layout/           # Navbar and workspace
│   └── ui/               # Reusable UI components
├── lib/                  # Utility functions
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
