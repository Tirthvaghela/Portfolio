import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tirth Vaghela | Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f7f5",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            background: "#f7f7f5",
            padding: "56px 72px",
            border: "5px solid #111",
            boxShadow: "16px 16px 0 0 #2148d8",
            gap: 14,
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "2px", color: "#2148d8", display: "flex" }}>
            TV.
          </div>

          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              color: "#111",
              letterSpacing: "-3px",
              lineHeight: 0.95,
              textTransform: "uppercase",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>TIRTH</span>
            <span>VAGHELA</span>
          </div>

          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#111",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              borderTop: "5px solid #111",
              paddingTop: 14,
              marginTop: 6,
              display: "flex",
            }}
          >
            Full-Stack Developer
          </div>

          <div
            style={{
              fontSize: 17,
              color: "#444",
              letterSpacing: "0.5px",
              display: "flex",
            }}
          >
            REACT · NEXT.JS · DJANGO · FLASK · PYTHON
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
