import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/app/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { CategoryIcon } from "@/components/CategoryIcon";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} | Tirth Vaghela`;
  const url = `https://tirthvaghela.in/projects/${project.slug}`;

  return {
    title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: project.description,
      url,
      siteName: "Tirth Vaghela Portfolio",
      images: [{ url: "https://tirthvaghela.in/opengraph-image", width: 1200, height: 630, alt: title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: ["https://tirthvaghela.in/opengraph-image"],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <section style={{ background: "var(--bg-section)", padding: "var(--space-2xl) 6%", minHeight: "80vh" }}>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <Link
              href="/#projects"
              className="back-link"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: "var(--text-muted)", textDecoration: "none", marginBottom: 32 }}
            >
              <ArrowLeft size={14} /> BACK TO PROJECTS
            </Link>

            <FadeIn>
            <div style={{ background: "var(--bg-card)", border: "var(--bw) solid var(--text)", boxShadow: "10px 10px 0 0 var(--accent)" }}>
              <div style={{ padding: "clamp(24px, 5vw, 48px)" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
                    color: "var(--accent)", border: "1.5px solid var(--accent)", padding: "3px 10px", display: "inline-flex", alignItems: "center", gap: 6,
                  }}
                >
                  <CategoryIcon category={project.category} size={12} />
                  {project.category}
                </span>

                <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 800, textTransform: "uppercase", color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 0.95, marginTop: 14, marginBottom: 6, overflowWrap: "anywhere" }}>
                  {project.title}
                </h1>
                <p style={{ fontSize: 15, color: "var(--text-muted)", fontWeight: 600 }}>{project.subtitle}</p>

                {project.buildDays && (
                  <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", border: "1.5px solid var(--text)", padding: "4px 12px" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>BUILT IN ~{project.buildDays} DAYS</span>
                  </div>
                )}

                <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.8, marginTop: 24, marginBottom: 28 }}>
                  {project.description}
                </p>

                <div style={{ marginBottom: 28 }}>
                  <h2 style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "var(--text-faint)", marginBottom: 16 }}>
                    KEY FEATURES
                  </h2>
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column" }}>
                    {project.points.map((pt, i) => (
                      <li key={i} style={{ display: "flex", gap: 12, fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, padding: "12px 0", borderTop: i === 0 ? "none" : "1.5px solid var(--border)" }}>
                        <span style={{ color: "var(--accent)", fontWeight: 800, flexShrink: 0 }}>—</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.collaborator && (
                  <div style={{ marginBottom: 28, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-faint)", letterSpacing: "0.05em" }}>BUILT WITH</span>
                    <a
                      href={project.collaborator.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", textDecoration: "none", borderBottom: "2px solid var(--accent)" }}
                    >
                      {project.collaborator.name} <ArrowUpRight size={13} style={{ display: "inline", verticalAlign: "-2px" }} />
                    </a>
                  </div>
                )}

                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "var(--text-faint)", marginBottom: 12 }}>
                    TECH STACK
                  </h2>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {project.tech.map((t) => (
                      <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text)", padding: "5px 12px", border: "1.5px solid var(--text)", fontWeight: 600 }}>
                        {t.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ background: "var(--accent)", color: "var(--accent-ink)", border: "var(--bw) solid var(--text)", padding: "13px 24px", fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}
                    >
                      LIVE DEMO <ArrowUpRight size={15} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ background: project.demo ? "var(--bg-card)" : "var(--text)", color: project.demo ? "var(--text)" : "var(--bg)", border: "var(--bw) solid var(--text)", padding: "13px 24px", fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}
                    >
                      VIEW ON GITHUB <ArrowUpRight size={15} />
                    </a>
                  )}
                  <Link
                    href="/#projects"
                    style={{ background: "var(--bg-card)", color: "var(--text)", border: "var(--bw) solid var(--border)", padding: "13px 24px", fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}
                  >
                    BACK TO PROJECTS
                  </Link>
                </div>
              </div>
            </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .back-link { transition: transform var(--dur-short) var(--ease-out), color var(--dur-short) var(--ease-out); }
        @media (hover: hover) and (pointer: fine) {
          .back-link:hover { color: var(--text); transform: translateX(-3px); }
        }
      `}</style>
    </>
  );
}
