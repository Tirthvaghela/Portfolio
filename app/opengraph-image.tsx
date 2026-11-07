import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/* Share card (WhatsApp, LinkedIn, X…) in the v8 identity: ink background, the hero's
   name with its red/teal split, mono labels. Rendered once at build time. */
export const alt = "Tirth Vaghela | Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#14120f", PAPER = "#efe9dc", RED = "#e8452f", TEAL = "#1f7f73", MUST = "#f4bf3f";

const font = (f: string) => readFile(join(process.cwd(), "app/og", f));

export default async function OGImage() {
  const [display, serif, mono] = await Promise.all([font("Bricolage-800.ttf"), font("InstrumentSerif-Italic.ttf"), font("JetBrainsMono-500.ttf")]);

  const nameLine = (text: string, color: string, dx: number) => (
    <div style={{ display: "flex", position: "absolute", left: dx, top: 0, color, fontFamily: "Bricolage", fontSize: 196, lineHeight: 0.82, letterSpacing: "-0.02em" }}>{text}</div>
  );
  const name = (text: string) => (
    <div style={{ display: "flex", position: "relative", height: 166, width: "100%" }}>
      {nameLine(text, RED, -7)}
      {nameLine(text, TEAL, 7)}
      {nameLine(text, PAPER, 0)}
    </div>
  );
  const label = { fontFamily: "JetBrains", fontSize: 20, letterSpacing: "0.08em", textTransform: "uppercase" as const };

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: INK, color: PAPER, padding: "48px 64px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", ...label }}>
          <div style={{ display: "flex", fontFamily: "Bricolage", fontSize: 34, letterSpacing: "-0.03em", textTransform: "none" }}>
            TV<span style={{ color: RED }}>.</span>
          </div>
          <div style={{ display: "flex" }}>Ahmedabad, India</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: MUST }} />
            Open to work
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {name("TIRTH")}
          {name("VAGHELA")}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", gap: 10, ...label, fontSize: 18 }}>
              <div style={{ display: "flex", padding: "8px 16px", borderRadius: 99, background: RED, color: INK }}>Designer</div>
              <div style={{ display: "flex", padding: "8px 16px", borderRadius: 99, border: `2px solid ${PAPER}` }}>Full-Stack Developer</div>
            </div>
            <div style={{ display: "flex", fontFamily: "Instrument", fontSize: 38, color: MUST }}>
              React · Next.js · Django · Flask · Python
            </div>
          </div>
          <div style={{ display: "flex", ...label, fontSize: 22 }}>tirthvaghela.in</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: display, weight: 800, style: "normal" },
        { name: "Instrument", data: serif, weight: 400, style: "italic" },
        { name: "JetBrains", data: mono, weight: 500, style: "normal" },
      ],
    }
  );
}
