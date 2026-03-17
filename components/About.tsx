"use client";
import { MapPin, Mail, GraduationCap } from "lucide-react";
import FadeIn from "./FadeIn";

export default function About() {
  return (
    <section style={{ background: "#f8f8f6", padding: "100px 6%", borderTop: "1px solid #ebebeb" }}>
      <div className="about-grid">
        <FadeIn direction="left">
          <div>
            <p style={{ fontSize: 13, color: "#2563eb", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 16 }}>
              Personal Information
            </p>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1, color: "#111", marginBottom: 24 }}>
              About<br />
              <span style={{ WebkitTextStroke: "2px #111", color: "transparent" }}>Me.</span>
            </h2>
            <p style={{ fontSize: 15, color: "#555", lineHeight: 1.9, marginBottom: 32 }}>
              Motivated MSc IT student at GLS University with strong skills in full-stack web development. Experienced in building modern web applications using Python, Django, Next.js, React, and databases like MySQL and MongoDB. Completed multiple internships and hands-on projects including authentication systems and AI-based platforms.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: <MapPin size={16} />, label: "Location", value: "Ahmedabad, Gujarat, India" },
                { icon: <Mail size={16} />, label: "Email", value: "vaghelatirth719@gmail.com" },
                { icon: <GraduationCap size={16} />, label: "University", value: "GLS University, 2022–2027" },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ color: "#2563eb", flexShrink: 0 }}>{icon}</div>
                  <span style={{ fontSize: 13, color: "#888", minWidth: 80 }}>{label}:</span>
                  <span style={{ fontSize: 14, color: "#111", fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="right" delay={0.15}>
          <div className="about-stats">
            {[
              { num: "8", label: "Projects Completed", color: "#111" },
              { num: "5", label: "Tech Stacks Mastered", color: "#2563eb" },
              { num: "1", label: "Internship", color: "#111" },
              { num: "3", label: "Years of Learning", color: "#2563eb" },
            ].map(({ num, label, color }) => (
              <div key={label}
                className="stat-card"
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#2563eb"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e8e8e8"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
              >
                <div className="stat-num" style={{ color }}>
                  {num}<span style={{ color: "#2563eb", fontSize: 36 }}>+</span>
                </div>
                <div style={{ fontSize: 13, color: "#888", marginTop: 8, lineHeight: 1.4 }}>{label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <style>{`
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .stat-card { border: 1.5px solid #e8e8e8; border-radius: 6px; padding: 32px 24px; text-align: center; transition: border-color 0.2s, transform 0.2s; }
        .stat-num { font-size: 52px; font-weight: 900; letter-spacing: -2px; line-height: 1; }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .about-stats { gap: 12px; }
          .stat-card { padding: 20px 12px; }
          .stat-num { font-size: 36px; }
        }
      `}</style>
    </section>
  );
}
