import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/context/ThemeContext";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });

export const metadata: Metadata = {
  title: "Tirth Vaghela | Full-Stack Developer",
  description:
    "Portfolio of Tirth Vaghela – Full-Stack Developer specializing in React, Next.js, Django, Flask, and AI/ML integrations.",
  keywords: ["Tirth Vaghela", "Full-Stack Developer", "React", "Next.js", "Django", "Flask", "AI", "ML", "Portfolio"],
  authors: [{ name: "Tirth Vaghela" }],
  metadataBase: new URL("https://tirthvaghela.in"),
  openGraph: {
    title: "Tirth Vaghela | Full-Stack Developer",
    description: "IMSC IT student (Sem 9) at GLS University. Building modern web apps and AI-powered systems using React, Next.js, Django, Flask, and more.",
    url: "https://tirthvaghela.in",
    siteName: "Tirth Vaghela Portfolio",
    images: [
      {
        url: "https://tirthvaghela.in/opengraph-image",
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
    images: ["https://tirthvaghela.in/opengraph-image"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tirth Vaghela",
  url: "https://tirthvaghela.in",
  jobTitle: "Full-Stack Developer",
  email: "mailto:vaghelatirth719@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  sameAs: ["https://github.com/Tirthvaghela", "https://www.linkedin.com/in/tirthvaghela/"],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "GLS University",
  },
  knowsAbout: ["React", "Next.js", "Django", "Flask", "Python", "TypeScript", "AI/ML"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content="https://tirthvaghela.in/opengraph-image" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://tirthvaghela.in/opengraph-image" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              const saved = localStorage.getItem('theme');
              if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.setAttribute('data-theme', 'dark');
              } else {
                document.documentElement.setAttribute('data-theme', 'light');
              }
            } catch (e) {}
          })();
        ` }} />
      </head>
      <body className={spaceGrotesk.variable} style={{ fontFamily: "var(--font-space), sans-serif" }}><ThemeProvider>{children}</ThemeProvider><Analytics /></body>
    </html>
  );
}
