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
  metadataBase: new URL("https://portfolio-hazel-eight-17.vercel.app"),
  openGraph: {
    title: "Tirth Vaghela | Full-Stack Developer",
    description: "IMSC IT student at GLS University. Building modern web apps and AI-powered systems using React, Next.js, Django, Flask, and more.",
    url: "https://portfolio-hazel-eight-17.vercel.app",
    siteName: "Tirth Vaghela Portfolio",
    images: [
      {
        url: "https://portfolio-hazel-eight-17.vercel.app/og-image.png",
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
    description: "IMSC IT student at GLS University. Building modern web apps and AI-powered systems.",
    images: ["https://portfolio-hazel-eight-17.vercel.app/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content="https://portfolio-hazel-eight-17.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://portfolio-hazel-eight-17.vercel.app/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className={spaceGrotesk.variable} style={{ fontFamily: "var(--font-space), sans-serif" }}>{children}</body>
    </html>
  );
}
