import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });

export const metadata: Metadata = {
  title: "Tirth Vaghela | Full-Stack Developer",
  description:
    "Portfolio of Tirth Vaghela – Full-Stack Developer specializing in React, Next.js, Django, Flask, and AI/ML integrations.",
  keywords: ["Tirth Vaghela", "Full-Stack Developer", "React", "Next.js", "Django", "AI", "Portfolio"],
  authors: [{ name: "Tirth Vaghela" }],
  openGraph: {
    title: "Tirth Vaghela | Full-Stack Developer",
    description: "Full-Stack Developer building modern web apps and AI-powered systems.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.variable} style={{ fontFamily: "var(--font-space), sans-serif" }}>{children}</body>
    </html>
  );
}
