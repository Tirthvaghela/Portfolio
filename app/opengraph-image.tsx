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
          background: "linear-gradient(135deg, #f8f8f6 0%, #eef2ff 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Dot grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, #2563eb22 1.5px, transparent 1.5px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            borderRadius: 16,
            padding: "60px 80px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
            border: "1.5px solid #e8e8e8",
            gap: 16,
            zIndex: 1,
          }}
        >
          {/* Initials */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              letterSpacing: "-4px",
              color: "#111",
              lineHeight: 1,
              display: "flex",
            }}
          >
            TV<span style={{ color: "#2563eb" }}>.</span>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "#111",
              letterSpacing: "-2px",
              display: "flex",
            }}
          >
            Tirth Vaghela
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#2563eb",
              letterSpacing: "0.5px",
              display: "flex",
            }}
          >
            Full-Stack Developer · AI/ML Engineer
          </div>

          {/* Divider */}
          <div style={{ width: 60, height: 3, background: "#2563eb", borderRadius: 2, display: "flex" }} />

          {/* Description */}
          <div
            style={{
              fontSize: 18,
              color: "#777",
              textAlign: "center",
              maxWidth: 600,
              lineHeight: 1.6,
              display: "flex",
            }}
          >
            React · Next.js · Django · Flask · Python · AI/ML
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
