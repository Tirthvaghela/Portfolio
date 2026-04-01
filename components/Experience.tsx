"use client";
import { experience, education } from "@/app/data";
import FadeIn from "./FadeIn";

export default function Experience() {
  return (
    <section id="experience" style={{ background: "var(--bg-alt)", padding: "100px 6%" }}>
      <FadeIn>
        <div style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 13, color: "var(--accent)", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>
            My journey
          </p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1, color: "var(--text)" }}>
            Experience &amp;<br />
            <span style={{ WebkitTextStroke: "2px var(--stroke)", color: "transparent" }}>Education</span>
          </h2>
        </div>
      </FadeIn>

      <div className="exp-grid">
        <FadeIn direction="left" delay={0.1}>
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 32 }}>Work Experience</h3>
            {experience.map((exp, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "4px 1fr", gap: 24 }}>
                <div style={{ background: "var(--accent)", borderRadius: 2 }} />
                <div style={{ paddingBottom: 40 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                    <h4 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.5px" }}>{exp.role}</h4>
                    <span style={{ fontSize: 12, color: "var(--text-muted)", background: "var(--bg-card)", padding: "4px 12px", border: "1px solid var(--border)", borderRadius: 2 }}>{exp.period}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "var(--accent)", fontWeight: 700, marginBottom: 4 }}>{exp.company}</p>
                  <p style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 16 }}>{exp.type}</p>
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                    {exp.points.map((pt, j) => (
                      <li key={j} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-muted)", lineHeight: 1.8, paddingBottom: 16, borderBottom: "1px solid var(--border-light)" }}>
                        <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: 4, fontSize: 10 }}>●</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
                    <a href="/Certificate.pdf" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}
                      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                    >View Certificate ↗</a>
                    <a href="/lor.pdf" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}
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
            <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 32 }}>Education</h3>
            {education.map((edu, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "4px 1fr", gap: 24, marginBottom: 32 }}>
                <div style={{ background: "var(--accent)", borderRadius: 2 }} />
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                    <div>
                      <h4 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.5px" }}>
                        <a href="https://www.glsuniversity.ac.in" target="_blank" rel="noopener noreferrer"
                          style={{ color: "var(--text)", textDecoration: "none" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
                        >{edu.institution} ↗</a>
                      </h4>
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: edu.status === "Pursuing" ? "#2563eb" : "#16a34a", background: edu.status === "Pursuing" ? "#eff6ff" : "#f0fdf4", padding: "3px 10px", borderRadius: 2, display: "inline-block", marginTop: 6 }}>
                        {edu.status}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: "var(--text-muted)", background: "var(--bg-card)", padding: "4px 12px", border: "1px solid var(--border)", borderRadius: 2, whiteSpace: "nowrap" }}>{edu.period}</span>
                  </div>
                  <p style={{ fontSize: 15, color: "var(--text)", fontWeight: 600, lineHeight: 1.5, marginTop: 10 }}>{edu.degree}</p>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{edu.note}</p>
                  {"cgpa" in edu && (
                    <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", background: "var(--bg-section)", border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 2 }}>
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

            <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 24, marginTop: 16 }}>Training / Courses</h3>

            <div style={{ display: "grid", gridTemplateColumns: "4px 1fr", gap: 24 }}>
              <div style={{ background: "var(--accent)", borderRadius: 2 }} />
              <div style={{ paddingBottom: 16 }}>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: "var(--text)" }}>Master MongoDB Database Design</h4>
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Compass + Mongosh + PyMongo — Udemy · Feb 2026</p>
                <a href="/mongodb-udemy.pdf" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "var(--accent)", marginTop: 6, display: "inline-block", textDecoration: "none", fontWeight: 600 }}>View Certificate ↗</a>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "4px 1fr", gap: 24, marginTop: 20 }}>
              <div style={{ background: "var(--accent)", borderRadius: 2 }} />
              <div style={{ paddingBottom: 16 }}>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: "var(--text)" }}>Claude Code in Action</h4>
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Anthropic — March 2026</p>
                <a href="/claude-code-certificate.pdf" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "var(--accent)", marginTop: 6, display: "inline-block", textDecoration: "none", fontWeight: 600 }}>View Certificate ↗</a>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "4px 1fr", gap: 24, marginTop: 20 }}>
              <div style={{ background: "#f59e0b", borderRadius: 2 }} />
              <div style={{ paddingBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                  <h4 style={{ fontSize: 16, fontWeight: 800, color: "var(--text)" }}>Developing Front-End Apps with React</h4>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#f59e0b", background: "#fef3c7", padding: "2px 8px", borderRadius: 2 }}>In Progress</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>IBM — Coursera · 4 modules</p>
                <a href="https://www.coursera.org/learn/developing-frontend-apps-with-react" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "var(--accent)", marginTop: 6, display: "inline-block", textDecoration: "none", fontWeight: 600 }}>View Course ↗</a>
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
