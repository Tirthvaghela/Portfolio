import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, SLUGS } from "@/content/projects";
import { PANEL } from "@/content/palette";
import { SITE, pad } from "@/content/site";
import CaseBody from "@/components/site/CaseBody";
import s from "@/components/site/Dialog.module.css";

type CSSVars = React.CSSProperties & Record<`--${string}`, string>;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = SLUGS.indexOf(slug);
  if (i < 0) return {};
  const p = PROJECTS[i];
  const title = `${p.title} | Tirth Vaghela`;
  const url = `${SITE.url}/projects/${slug}`;
  return {
    title,
    description: p.desc,
    alternates: { canonical: url },
    openGraph: { title, description: p.desc, url, siteName: "Tirth Vaghela Portfolio", images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: title }], type: "website" },
    twitter: { card: "summary_large_image", title, description: p.desc, images: [`${SITE.url}/opengraph-image`] },
  };
}

/** Standalone case page — the same case layout and panel colours as the in-page dialog. */
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = SLUGS.indexOf(slug);
  if (i < 0) notFound();
  const p = PROJECTS[i], c = PANEL[i % PANEL.length];
  const next = (i + 1) % PROJECTS.length;
  const vars: CSSVars = { "--bg": c[0], "--fg": c[1], background: c[0], color: c[1], minHeight: "100svh" };

  return (
    <main id="main" style={vars}>
      <div className={s.bar} style={{ position: "sticky" }}>
        <Link href="/#work" className="mono" style={{ display: "flex", alignItems: "center", height: 46 }}>← All work</Link>
        <span className="mono">Project {pad(i + 1)} / {pad(PROJECTS.length)}</span>
      </div>
      <CaseBody p={p} i={i} rule={c[2]} titleId="case-title" as="h1" />
      <div style={{ padding: "0 clamp(18px,3vw,40px) clamp(32px,4vw,56px)" }}>
        <Link href={`/projects/${SLUGS[next]}`} className={`${s.line} mono`} style={{ display: "inline-flex" }}>Next: {PROJECTS[next].title} →</Link>
      </div>
    </main>
  );
}
