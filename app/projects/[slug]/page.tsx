import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/app/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <main>
        <section style={{ background: "var(--bg-section)", padding: "120px 6% 100px", minHeight: "80vh" }}>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <Link
              href="/#projects"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--text-muted)", textDecoration: "none", marginBottom: 32 }}
            >
              <ArrowLeft size={14} /> Back to Projects
            </Link>

            <div style={{ background: "var(--bg-card)", border: "1.5px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ height: 5, background: `linear-gradient(90deg, ${project.color}, ${project.color}60)` }} />

              <div style={{ padding: "clamp(24px, 5vw, 48px)" }}>
                <span
                  style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase",
                    color: project.color, background: `${project.color}20`, padding: "3px 10px", borderRadius: 2,
                  }}
                >
                  {project.category}
                </span>

                <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, color: "var(--text)", letterSpacing: "-1px", lineHeight: 1.1, marginTop: 12, marginBottom: 4 }}>
                  {project.title}
                </h1>
                <p style={{ fontSize: 15, color: project.color, fontWeight: 600 }}>{project.subtitle}</p>

                {project.buildDays && (
                  <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6, background: "var(--bg-section)", border: "1px solid var(--border)", borderRadius: 100, padding: "4px 12px" }}>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>⏱</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)" }}>Built in ~{project.buildDays} days</span>
                  </div>
                )}

                <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.8, marginTop: 24, marginBottom: 28 }}>
                  {project.description}
                </p>

                <div style={{ marginBottom: 28 }}>
                  <h2 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 16 }}>
                    Key Features
                  </h2>
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                    {project.points.map((pt, i) => (
                      <li key={i} style={{ display: "flex", gap: 12, fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7 }}>
                        <span style={{ width: 20, height: 20, borderRadius: "50%", background: `${project.color}15`, border: `1.5px solid ${project.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: project.color, display: "block" }} />
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.collaborator && (
                  <div style={{ marginBottom: 28, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, color: "var(--text-faint)", letterSpacing: "1px", textTransform: "uppercase" }}>Built with</span>
                    <a
                      href={project.collaborator.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", textDecoration: "none" }}
                    >
                      {project.collaborator.name} ↗
                    </a>
                  </div>
                )}

                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 12 }}>
                    Tech Stack
                  </h2>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {project.tech.map((t) => (
                      <span key={t} style={{ fontSize: 13, color: "var(--text-muted)", background: "var(--bg-section)", padding: "6px 14px", borderRadius: 3, border: "1px solid var(--border)", fontWeight: 500 }}>
                        {t}
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
                      style={{ background: "var(--accent)", color: "#fff", border: "none", padding: "13px 28px", borderRadius: 3, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}
                    >
                      Live Demo <ArrowUpRight size={15} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={project.demo
                        ? { background: "transparent", color: "var(--text)", border: "1.5px solid var(--border)", padding: "13px 28px", borderRadius: 3, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }
                        : { background: "var(--text)", color: "var(--bg)", border: "none", padding: "13px 28px", borderRadius: 3, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}
                    >
                      View on GitHub <ArrowUpRight size={15} />
                    </a>
                  )}
                  <Link
                    href="/#projects"
                    style={{ background: "transparent", color: "var(--text)", border: "1.5px solid var(--border)", padding: "13px 28px", borderRadius: 3, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}
                  >
                    Back to Projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
