import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const metadata: Metadata = {
  title: "Gallery — Beautiful Code Image Examples | CodeGlow",
  description:
    "Starter styles for beautiful code images: Midnight Glass, Sunset Hot Take, Terminal Hacker and more. Open any example in CodeGlow, remix it, and share it.",
  openGraph: {
    title: "CodeGlow Gallery — Made to be shared",
    description:
      "Beautiful code image examples you can open, remix and post. Paste. Style. Glow. Share.",
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <div className="flex flex-col h-screen overflow-y-auto select-none">
      <GalleryGrid />
    </div>
  );
}
