"use client";
import { useState } from "react";
import { projects } from "@/app/data";
import { ArrowUpRight } from "lucide-react";
import ProjectModal from "./ProjectModal";
import FadeIn from "./FadeIn";

const categories = ["All", "AI / ML", "Full-Stack", "Web", "Mobile"];

export default function Projects() {
  const [active, setActive] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" style={{ background: "var(--bg-section)", padding: "100px 6%" }}>
      <FadeIn>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
          <div>
            <p style={{ fontSize: 12, color: "var(--accent)", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 10 }}>
              What I&apos;ve built
            </p>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1, color: "var(--text)" }}>
              Featured<br />
              <span style={{ WebkitTextStroke: "2px var(--stroke)", color: "transparent" }}>Projects</span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)}
                style={{
                  padding: "9px 20px",
                  border: active === cat ? "2px solid var(--text)" : "1.5px solid var(--border)",
                  background: active === cat ? "var(--text)" : "transparent",
                  color: active === cat ? "var(--bg)" : "var(--text-muted)",
                  cursor: "pointer", fontSize: 12, fontWeight: 700,
                  borderRadius: 100, transition: "all 0.2s",
                  letterSpacing: "0.5px", textTransform: "uppercase",
                }}
                onMouseEnter={(e) => { if (active !== cat) { e.currentTarget.style.borderColor = "var(--text)"; e.currentTarget.style.color = "var(--text)"; } }}
                onMouseLeave={(e) => { if (active !== cat) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; } }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      <div>
        {filtered.map((project, i) => {
          const isHovered = hovered === project.id;
          return (
            <FadeIn key={project.id} delay={i * 0.06}>
              <div
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(project)}
                className="project-row"
                style={{ background: isHovered ? "var(--bg-alt)" : "var(--bg-section)", transition: "background 0.2s", borderRadius: 4, cursor: "pointer", borderTop: "1.5px solid var(--border)", borderBottom: i === filtered.length - 1 ? "1.5px solid var(--border)" : "none" }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-faint)", letterSpacing: "1px", userSelect: "none" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5, flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: "clamp(18px, 2.2vw, 24px)", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.5px", lineHeight: 1 }}>
                      {project.title}
                    </h3>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--accent)", background: "var(--accent-bg, #eff6ff)", padding: "3px 9px", borderRadius: 2 }}>
                      {project.category}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10, lineHeight: 1.6 }}>
                    {project.subtitle} — {project.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {project.tech.map((t) => (
                      <span key={t} style={{ fontSize: 11, color: "var(--text-muted)", background: "var(--bg-alt)", padding: "3px 9px", borderRadius: 2, border: "1px solid var(--border)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: "50%", border: `1.5px solid ${isHovered ? "var(--text)" : "var(--border)"}`, background: isHovered ? "var(--text)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                  <ArrowUpRight size={16} color={isHovered ? "var(--bg)" : "var(--text-faint)"} />
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />

      <style>{`
        .project-row { display: grid; grid-template-columns: 56px 1fr 52px; gap: 24px; align-items: center; padding: 28px 16px; }
        @media (max-width: 600px) {
          .project-row { grid-template-columns: 1fr 36px; gap: 12px; padding: 20px 12px; }
          .project-row > div:first-child { display: none; }
        }
      `}</style>
    </section>
  );
}
