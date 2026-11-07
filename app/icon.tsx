import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/* Browser-tab icon: the v8 "TV." mark — paper on ink, red dot. */
export default async function Icon() {
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
          borderRadius: 7,
          fontSize: 19,
          fontFamily: "Bricolage",
          fontWeight: 800,
          letterSpacing: "-1px",
          color: "#efe9dc",
        }}
      >
        TV<span style={{ color: "#e8452f" }}>.</span>
      </div>
    ),
    { ...size, fonts: [{ name: "Bricolage", data: display, weight: 800, style: "normal" }] }
  );
}
