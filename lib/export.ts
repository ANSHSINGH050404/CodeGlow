import { toPng, toBlob, toSvg, toJpeg } from "html-to-image";

type ExportOptions = NonNullable<Parameters<typeof toPng>[1]>;

const fontUrlCache = new Map<string, string>();

/**
 * html-to-image iterates `document.styleSheets` and reads `cssRules`.
 * Cross-origin sheets throw SecurityError — even with `skipFonts` —
 * and the library's catch path then tries to fetch and re-parse the
 * remote CSS, which can crash.
 *
 * Temporarily removing those <link> nodes takes them out of
 * `document.styleSheets` for the duration of the capture.
 */
function withCrossOriginStylesheetsDetached<T>(run: () => Promise<T>): Promise<T> {
  const detached: Array<{
    node: HTMLLinkElement;
    parent: Node;
    nextSibling: Node | null;
  }> = [];

  if (typeof document !== "undefined") {
    document.querySelectorAll<HTMLLinkElement>('link[rel~="stylesheet"]').forEach((link) => {
      const href = link.href;
      if (!href) return;
      try {
        if (new URL(href).origin === window.location.origin) return;
      } catch {
        return;
      }
      const parent = link.parentNode;
      if (!parent) return;
      detached.push({ node: link, parent, nextSibling: link.nextSibling });
      link.remove();
    });
  }

  return run().finally(() => {
    for (const { node, parent, nextSibling } of detached) {
      parent.insertBefore(node, nextSibling);
    }
  });
}

/**
 * Embeds same-origin webfonts used by the element as data URLs.
 * Cross-origin stylesheets are skipped — never read via cssRules.
 */
async function getSafeFontEmbedCSS(element: HTMLElement): Promise<string> {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return "";
  }

  try {
    const usedFontFamilies = new Set<string>();
    const traverse = (node: Element) => {
      const style = window.getComputedStyle(node);
      if (style.fontFamily) {
        style.fontFamily.split(",").forEach((family) => {
          const clean = family.trim().replace(/['"]/g, "").toLowerCase();
          if (clean) usedFontFamilies.add(clean);
        });
      }
      for (let i = 0; i < node.children.length; i++) {
        traverse(node.children[i]);
      }
    };
    traverse(element);

    const fontFaceRules: CSSFontFaceRule[] = [];
    const styleSheets = Array.from(document.styleSheets);

    for (const sheet of styleSheets) {
      if (sheet.href) {
        try {
          if (new URL(sheet.href).origin !== window.location.origin) {
            continue;
          }
        } catch {
          continue;
        }
      }

      let rules: CSSRuleList;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      if (!rules) continue;

      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        if (rule.type !== CSSRule.FONT_FACE_RULE) continue;

        const fontRule = rule as CSSFontFaceRule;
        const ruleFamily = fontRule.style
          .getPropertyValue("font-family")
          ?.trim()
          .replace(/['"]/g, "")
          .toLowerCase();

        if (
          !ruleFamily ||
          usedFontFamilies.size === 0 ||
          usedFontFamilies.has(ruleFamily)
        ) {
          fontFaceRules.push(fontRule);
        }
      }
    }

    if (fontFaceRules.length === 0) {
      return "";
    }

    const embeddedRules = await Promise.all(
      fontFaceRules.map(async (rule) => {
        let cssText = rule.cssText;
        const matches = cssText.match(/url\((['"]?)([^'")]+)\1\)/g);
        if (!matches) return cssText;

        for (const match of matches) {
          const execRes = /url\((['"]?)([^'")]+)\1\)/.exec(match);
          if (!execRes) continue;
          const urlStr = execRes[2];

          if (urlStr.startsWith("data:")) continue;

          try {
            let dataUrl = fontUrlCache.get(urlStr);
            if (!dataUrl) {
              const fullUrl = new URL(urlStr, window.location.href).href;
              const res = await fetch(fullUrl);
              const blob = await res.blob();
              dataUrl = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
              });
              fontUrlCache.set(urlStr, dataUrl);
            }
            cssText = cssText.replace(urlStr, dataUrl);
          } catch (fetchErr) {
            console.warn(`[CodeGlow] Failed to embed font URL: ${urlStr}`, fetchErr);
          }
        }
        return cssText;
      })
    );

    return embeddedRules.join("\n");
  } catch (err) {
    console.warn("[CodeGlow] Error generating safe font embed CSS:", err);
    return "";
  }
}

async function getExportOptions(
  element: HTMLElement,
  pixelRatio: number = 2
): Promise<ExportOptions> {
  const fontEmbedCSS = await getSafeFontEmbedCSS(element);
  const options: ExportOptions = {
    quality: 1,
    pixelRatio,
    skipFonts: true,
    style: {
      transform: "none",
    },
  };
  if (fontEmbedCSS) {
    options.fontEmbedCSS = fontEmbedCSS;
  }
  return options;
}

async function capture<T>(
  element: HTMLElement,
  scale: number,
  run: (options: ExportOptions) => Promise<T>
): Promise<T> {
  return withCrossOriginStylesheetsDetached(async () => {
    const options = await getExportOptions(element, scale);
    return run(options);
  });
}

export async function exportToPng(
  element: HTMLElement,
  filename: string = "codeglow.png",
  scale: number = 2
): Promise<void> {
  try {
    const dataUrl = await capture(element, scale, (options) => toPng(element, options));

    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Failed to export PNG:", error);
    throw new Error("Failed to export PNG");
  }
}

export async function exportToSvg(
  element: HTMLElement,
  filename: string = "codeglow.svg"
): Promise<void> {
  try {
    const dataUrl = await capture(element, 1, (options) => toSvg(element, options));

    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Failed to export SVG:", error);
    throw new Error("Failed to export SVG");
  }
}

export async function exportToJpeg(
  element: HTMLElement,
  filename: string = "codeglow.jpg",
  scale: number = 2
): Promise<void> {
  try {
    const dataUrl = await capture(element, scale, (options) =>
      toJpeg(element, {
        ...options,
        quality: 0.95,
        // JPEG has no alpha channel — transparent canvases would render
        // as black without an explicit background.
        backgroundColor: "#ffffff",
      })
    );

    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Failed to export JPEG:", error);
    throw new Error("Failed to export JPEG");
  }
}

export async function copyToClipboard(
  element: HTMLElement,
  scale: number = 2
): Promise<void> {
  try {
    const blob = await capture(element, scale, async (options) => {
      const fromBlob = await toBlob(element, options);
      if (fromBlob) return fromBlob;
      const dataUrl = await toPng(element, options);
      const response = await fetch(dataUrl);
      return response.blob();
    });

    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": blob }),
    ]);
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    throw new Error("Failed to copy to clipboard");
  }
}

export async function copySvgToClipboard(element: HTMLElement): Promise<void> {
  try {
    const dataUrl = await capture(element, 1, (options) => toSvg(element, options));
    const svgCode = decodeURIComponent(
      dataUrl.replace(/^data:image\/svg\+xml;charset=utf-8,/, "")
    );
    await navigator.clipboard.writeText(svgCode);
  } catch (error) {
    console.error("Failed to copy SVG to clipboard:", error);
    throw new Error("Failed to copy SVG to clipboard");
  }
}
