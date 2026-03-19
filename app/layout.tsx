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
  metadataBase: new URL("https://tirth-portfolio-htko.vercel.app"),
  openGraph: {
    title: "Tirth Vaghela | Full-Stack Developer",
    description: "MSc IT student at GLS University. Building modern web apps and AI-powered systems using React, Next.js, Django, Flask, and more.",
    url: "https://tirth-portfolio-htko.vercel.app",
    siteName: "Tirth Vaghela Portfolio",
    images: [
      {
        url: "https://i.ibb.co/Kcwf5mKb/Screenshot-2026-03-19-194705.png",
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
    images: ["https://i.ibb.co/Kcwf5mKb/Screenshot-2026-03-19-194705.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.variable} style={{ fontFamily: "var(--font-space), sans-serif" }}>{children}</body>
    </html>
  );
}
