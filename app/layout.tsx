import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { bricolage, instrument, jetbrains } from "./fonts";
import { SITE } from "@/content/site";

const DESCRIPTION =
  "Portfolio of Tirth Vaghela – Full-Stack Developer specializing in React, Next.js, Django, Flask, and AI/ML integrations.";

export const metadata: Metadata = {
  title: "Tirth Vaghela | Full-Stack Developer",
  description: DESCRIPTION,
  metadataBase: new URL(SITE.url),
  alternates: { canonical: SITE.url },
  authors: [{ name: SITE.name }],
  openGraph: {
    title: "Tirth Vaghela | Full-Stack Developer",
    description: DESCRIPTION,
    url: SITE.url,
    siteName: "Tirth Vaghela Portfolio",
    images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: "Tirth Vaghela – Full-Stack Developer" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tirth Vaghela | Full-Stack Developer",
    description: DESCRIPTION,
    images: [`${SITE.url}/opengraph-image`],
  },
};

export const viewport: Viewport = { themeColor: "#14120f", width: "device-width", initialScale: 1 };

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  jobTitle: "Full-Stack Developer",
  email: `mailto:${SITE.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressRegion: "Gujarat", addressCountry: "IN" },
  sameAs: [SITE.github, SITE.linkedin],
  alumniOf: { "@type": "CollegeOrUniversity", name: "GLS University" },
  knowsAbout: ["React", "Next.js", "Django", "Flask", "Python", "TypeScript", "AI/ML"],
};

/* Runs before paint: decides motion on/off so CSS (hero height, pinned reel layout)
   is correct on the very first frame — no layout shift once React hydrates. */
const motionBoot = `(function(){try{var on=!matchMedia('(prefers-reduced-motion: reduce)').matches;document.documentElement.setAttribute('data-motion',on?'on':'off');if(on)document.documentElement.setAttribute('data-loading','');}catch(e){document.documentElement.setAttribute('data-motion','on');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
