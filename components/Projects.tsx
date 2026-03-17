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
    <section id="projects" style={{ background: "#f8f8f6", padding: "100px 6%" }}>
      <FadeIn>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
          <div>
            <p style={{ fontSize: 12, color: "#2563eb", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 10 }}>
              What I&apos;ve built
            </p>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1, color: "#111" }}>
              Featured<br />
              <span style={{ WebkitTextStroke: "2px #111", color: "transparent" }}>Projects</span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)}
                style={{
                  padding: "9px 20px",
                  border: active === cat ? "2px solid #111" : "1.5px solid #e0e0e0",
                  background: active === cat ? "#111" : "transparent",
                  color: active === cat ? "#fff" : "#888",
                  cursor: "pointer", fontSize: 12, fontWeight: 700,
                  borderRadius: 100, transition: "all 0.2s",
                  letterSpacing: "0.5px", textTransform: "uppercase",
                }}
                onMouseEnter={(e) => { if (active !== cat) { e.currentTarget.style.borderColor = "#111"; e.currentTarget.style.color = "#111"; } }}
                onMouseLeave={(e) => { if (active !== cat) { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.color = "#888"; } }}
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
                style={{ background: isHovered ? "#eef2ff" : "#f8f8f6", transition: "background 0.2s", borderRadius: 4, cursor: "pointer", borderTop: "1.5px solid #ebebeb", borderBottom: i === filtered.length - 1 ? "1.5px solid #ebebeb" : "none" }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: "#ccc", letterSpacing: "1px", userSelect: "none" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5, flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: "clamp(18px, 2.2vw, 24px)", fontWeight: 900, color: "#111", letterSpacing: "-0.5px", lineHeight: 1 }}>
                      {project.title}
                    </h3>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#2563eb", background: "#eff6ff", padding: "3px 9px", borderRadius: 2 }}>
                      {project.category}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "#999", marginBottom: 10, lineHeight: 1.6 }}>
                    {project.subtitle} — {project.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {project.tech.map((t) => (
                      <span key={t} style={{ fontSize: 11, color: "#666", background: "#f5f5f5", padding: "3px 9px", borderRadius: 2, border: "1px solid #ebebeb" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: "50%", border: `1.5px solid ${isHovered ? "#111" : "#e0e0e0"}`, background: isHovered ? "#111" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                  <ArrowUpRight size={16} color={isHovered ? "#fff" : "#ccc"} />
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
