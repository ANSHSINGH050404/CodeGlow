import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CODE_LINES: Array<{ text: string; color: string }> = [
  { text: "const glow = await codeglow(style, code);", color: "#f472b6" },
  { text: "", color: "#e4e4e7" },
  { text: "export function Post({ code }) {", color: "#c4b5fd" },
  { text: '  return <Image src={glow.png("4x")} />;', color: "#e4e4e7" },
  { text: "}", color: "#c4b5fd" },
];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #082f49 0%, #312e81 55%, #4c1d95 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 920,
            borderRadius: 28,
            backgroundColor: "#0d1117",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: 40,
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: "#ff5f56" }} />
              <div style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: "#ffbd2e" }} />
              <div style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: "#27c93f" }} />
            </div>
            <div style={{ marginLeft: 24, fontSize: 26, color: "#e4e4e7", fontFamily: "monospace" }}>
              CodeGlow
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontFamily: "monospace", fontSize: 30 }}>
            {CODE_LINES.map((line, i) => (
              <div key={i} style={{ color: line.color, whiteSpace: "pre" }}>
                {line.text || " "}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", marginTop: 32, fontSize: 30, color: "#a5b4fc" }}>
            Paste. Style. Glow. Share.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
