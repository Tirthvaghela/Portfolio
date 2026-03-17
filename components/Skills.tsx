"use client";
import { skills } from "@/app/data";
import FadeIn from "./FadeIn";

const categoryColors: Record<string, string> = {
  "Programming Languages": "#111",
  "Frontend": "#2563eb",
  "Backend": "#111",
  "Databases": "#2563eb",
  "AI / ML": "#111",
  "Tools": "#2563eb",
};

export default function Skills() {
  return (
    <section id="skills" style={{ background: "#111", padding: "100px 6%", marginTop: 0, borderTop: "4px solid #2563eb", boxShadow: "0 -1px 0 0 #1a1a1a" }}>
      <FadeIn>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 64, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontSize: 13, color: "#60a5fa", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>
              What I work with
            </p>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1, color: "#fff" }}>
              Skills &amp;<br />
              <span style={{ WebkitTextStroke: "2px #fff", color: "transparent" }}>Technologies</span>
            </h2>
          </div>
          <p style={{ fontSize: 14, color: "#888", maxWidth: 300, lineHeight: 1.7 }}>
            Tools and technologies I use to build modern, scalable applications.
          </p>
        </div>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2 }}>
        {Object.entries(skills).map(([category, items], i) => {
          const isBlue = categoryColors[category] === "#2563eb";
          return (
            <FadeIn key={category} delay={i * 0.07}>
              <div style={{ background: isBlue ? "#2563eb" : "#1a1a1a", border: isBlue ? "1.5px solid #2563eb" : "1.5px solid #2a2a2a", padding: "36px 32px", height: "100%" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: isBlue ? "rgba(255,255,255,0.6)" : "#bbb", marginBottom: 12 }}>
                  0{i + 1}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 20, letterSpacing: "-0.5px" }}>
                  {category}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {items.map((skill) => (
                    <span key={skill} style={{ background: isBlue ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.07)", color: isBlue ? "#fff" : "#ccc", padding: "6px 14px", borderRadius: 2, fontSize: 13, fontWeight: 500, border: isBlue ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.1)" }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
