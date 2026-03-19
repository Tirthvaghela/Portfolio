import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });

export const metadata: Metadata = {
  title: "Tirth Vaghela | Full-Stack Developer",
  description:
    "Portfolio of Tirth Vaghela – Full-Stack Developer specializing in React, Next.js, Django, Flask, and AI/ML integrations.",
  keywords: ["Tirth Vaghela", "Full-Stack Developer", "React", "Next.js", "Django", "Flask", "AI", "ML", "Portfolio"],
  authors: [{ name: "Tirth Vaghela" }],
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  openGraph: {
    title: "Tirth Vaghela | Full-Stack Developer",
    description: "MSc IT student at GLS University. Building modern web apps and AI-powered systems using React, Next.js, Django, Flask, and more.",
    siteName: "Tirth Vaghela Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Tirth Vaghela – Full-Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tirth Vaghela | Full-Stack Developer",
    description: "MSc IT student at GLS University. Building modern web apps and AI-powered systems.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.variable} style={{ fontFamily: "var(--font-space), sans-serif" }}>{children}</body>
    </html>
  );
}
