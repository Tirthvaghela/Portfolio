import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const display = await readFile(join(process.cwd(), "app/og", "Bricolage-800.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#14120f",
          fontSize: 84,
          fontFamily: "Bricolage",
          fontWeight: 800,
          letterSpacing: "-4px",
          color: "#efe9dc",
        }}
      >
        TV<span style={{ color: "#e8452f" }}>.</span>
      </div>
    ),
    { ...size, fonts: [{ name: "Bricolage", data: display, weight: 800, style: "normal" }] }
  );
}
