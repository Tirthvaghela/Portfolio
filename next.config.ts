import type { NextConfig } from "next";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Fingerprint of the résumé PDF, appended to its links (?v=…). Replacing the file changes the
// link, so phones and browsers can't keep showing a cached old copy.
let resumeV = "1";
try { resumeV = createHash("md5").update(readFileSync(join(__dirname, "public/TV_Resume.pdf"))).digest("hex").slice(0, 8); } catch {}

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  env: { NEXT_PUBLIC_RESUME_V: resumeV },
};

export default nextConfig;
