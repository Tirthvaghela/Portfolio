"use client";
import { experience, education } from "@/app/data";
import FadeIn from "./FadeIn";

export default function Experience() {
  return (
    <section id="experience" style={{ background: "#fff", padding: "100px 6%" }}>
      <FadeIn>
        <div style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 13, color: "#2563eb", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>
            My journey
          </p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1, color: "#111" }}>
            Experience &amp;<br />
            <span style={{ WebkitTextStroke: "2px #111", color: "transparent" }}>Education</span>
          </h2>
        </div>
      </FadeIn>

      <div className="exp-grid">
        <FadeIn direction="left" delay={0.1}>
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#bbb", marginBottom: 32 }}>Work Experience</h3>
            {experience.map((exp, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "4px 1fr", gap: 24 }}>
                <div style={{ background: "#2563eb", borderRadius: 2 }} />
                <div style={{ paddingBottom: 40 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                    <h4 style={{ fontSize: 20, fontWeight: 800, color: "#111", letterSpacing: "-0.5px" }}>{exp.role}</h4>
                    <span style={{ fontSize: 12, color: "#888", background: "#fff", padding: "4px 12px", border: "1px solid #e8e8e8", borderRadius: 2 }}>{exp.period}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "#2563eb", fontWeight: 700, marginBottom: 4 }}>{exp.company}</p>
                  <p style={{ fontSize: 12, color: "#aaa", marginBottom: 16 }}>{exp.type}</p>
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                    {exp.points.map((pt, j) => (
                      <li key={j} style={{ display: "flex", gap: 10, fontSize: 14, color: "#555", lineHeight: 1.8, paddingBottom: 16, borderBottom: "1px solid #f0f0f0" }}>
                        <span style={{ color: "#2563eb", flexShrink: 0, marginTop: 4, fontSize: 10 }}>●</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
                    <a href="/Certificate.pdf" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#2563eb", textDecoration: "none", fontWeight: 600 }}
                      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                    >View Certificate ↗</a>
                    <a href="/lor.pdf" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#2563eb", textDecoration: "none", fontWeight: 600 }}
                      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                    >View LOR ↗</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn direction="right" delay={0.2}>
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#bbb", marginBottom: 32 }}>Education</h3>
            {education.map((edu, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "4px 1fr", gap: 24, marginBottom: 32 }}>
                <div style={{ background: "#2563eb", borderRadius: 2 }} />
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                    <div>
                      <h4 style={{ fontSize: 20, fontWeight: 800, color: "#111", letterSpacing: "-0.5px" }}>
                        <a href="https://www.glsuniversity.ac.in" target="_blank" rel="noopener noreferrer" style={{ color: "#111", textDecoration: "none" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#2563eb")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "#111")}
                        >{edu.institution} ↗</a>
                      </h4>
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: edu.status === "Pursuing" ? "#2563eb" : "#16a34a", background: edu.status === "Pursuing" ? "#eff6ff" : "#f0fdf4", padding: "3px 10px", borderRadius: 2, display: "inline-block", marginTop: 6 }}>
                        {edu.status}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: "#888", background: "#fff", padding: "4px 12px", border: "1px solid #e8e8e8", borderRadius: 2, whiteSpace: "nowrap" }}>{edu.period}</span>
                  </div>
                  <p style={{ fontSize: 15, color: "#333", fontWeight: 600, lineHeight: 1.5, marginTop: 10 }}>{edu.degree}</p>
                  <p style={{ fontSize: 13, color: "#999", marginTop: 4 }}>{edu.note}</p>
                  {"cgpa" in edu && (
                    <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#111", background: "#f5f5f5", border: "1px solid #e8e8e8", padding: "4px 12px", borderRadius: 2 }}>
                        CGPA: {(edu as {cgpa: string}).cgpa}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#16a34a", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "4px 12px", borderRadius: 2 }}>
                        {(edu as {distinction: string}).distinction}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#bbb", marginBottom: 24, marginTop: 16 }}>Training / Courses</h3>
            <div style={{ display: "grid", gridTemplateColumns: "4px 1fr", gap: 24 }}>
              <div style={{ background: "#2563eb", borderRadius: 2 }} />
              <div style={{ paddingBottom: 16 }}>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: "#111" }}>Master MongoDB Database Design</h4>
                <p style={{ fontSize: 13, color: "#888", marginTop: 4 }}>Compass + Mongosh + PyMongo — Udemy · Feb 2026</p>
                <a href="https://ude.my/UC-388999aa-8ab3-436b-be34-365e8ff02b38" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#2563eb", marginTop: 6, display: "inline-block", textDecoration: "none" , fontWeight: 600}}>View Certificate ↗</a>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "4px 1fr", gap: 24, marginTop: 20 }}>
              <div style={{ background: "#2563eb", borderRadius: 2 }} />
              <div style={{ paddingBottom: 16 }}>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: "#111" }}>Claude Code in Action</h4>
                <p style={{ fontSize: 13, color: "#888", marginTop: 4 }}>Anthropic — March 2026</p>
                <a href="https://verify.skilljar.com/c/a4m7t9ktauru" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#2563eb", marginTop: 6, display: "inline-block", textDecoration: "none" , fontWeight: 600}}>View Certificate ↗</a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <style>{`
        .exp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
        @media (max-width: 768px) {
          .exp-grid { grid-template-columns: 1fr; gap: 48px; }
          .exp-grid > div > div > h3 { margin-top: 0; }
        }
      `}</style>
    </section>
  );
}
