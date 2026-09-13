"use client";
import { skills } from "@/app/data";
import FadeIn from "./FadeIn";
import SectionPanel from "./SectionPanel";

export default function Skills() {
  const entries = Object.entries(skills);

  return (
    <section id="skills" style={{ background: "var(--bg-alt)", padding: "var(--space-2xl) 5%", borderBottom: "var(--bw) solid var(--text)" }}>
      <SectionPanel>
        <h2 className="skills-heading">SKILLS &amp; TECHNOLOGIES</h2>

        <div className="skills-index">
          {entries.map(([category, items], i) => (
            <FadeIn key={category} direction="left" delay={i * 0.04}>
              <div className="skill-row">
                <div className="skill-row-head">
                  <span className="skill-num">{String(i + 1).padStart(2, "0")} /</span>
                  <span className="skill-cat">{category.toUpperCase()}</span>
                </div>
                <div className="skill-items">
                  {items.map((skill) => (
                    <span key={skill} className="skill-item">{skill.toUpperCase()}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </SectionPanel>

      <style>{`
        .skills-heading {
          font-family: var(--font-display); font-weight: 800; text-transform: uppercase;
          font-size: clamp(2rem, 4.2vw, 3.2rem); letter-spacing: -0.01em; line-height: 1;
          color: var(--text); margin-bottom: var(--space-2xl);
        }
        .skills-index { border-top: var(--bw) solid var(--text); }
        .skill-row {
          display: grid; grid-template-columns: 320px 1fr; gap: var(--space-xl);
          padding: var(--space-lg) 0; padding-left: var(--space-md);
          border-bottom: var(--bw) solid var(--text); border-left: 4px solid transparent; align-items: baseline;
          transition: border-left-color var(--dur-med) var(--ease-out), background-color var(--dur-med) var(--ease-out);
        }
        .skill-row-head { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
        .skill-num { font-family: var(--font-mono-face); font-size: 14px; color: var(--accent); font-weight: 700; white-space: nowrap; transition: transform var(--dur-med) var(--ease-out); display: inline-block; }
        .skill-cat { font-family: var(--font-display); font-weight: 800; font-size: clamp(18px, 2vw, 24px); letter-spacing: -0.01em; color: var(--text); transition: transform var(--dur-med) var(--ease-out); display: inline-block; }
        .skill-items { display: flex; flex-wrap: wrap; gap: 10px 22px; }
        .skill-item { font-family: var(--font-display); font-weight: 600; font-size: clamp(14px, 1.4vw, 17px); color: var(--text-muted); letter-spacing: 0.01em; transition: color var(--dur-med) var(--ease-out); }
        @media (hover: hover) and (pointer: fine) {
          .skill-row:hover { border-left-color: var(--accent); background: var(--bg-card); }
          .skill-row:hover .skill-num { transform: translateX(4px); }
          .skill-row:hover .skill-cat { transform: translateX(6px); }
          .skill-row:hover .skill-item { color: var(--text); }
        }
        @media (max-width: 700px) {
          .skill-row { grid-template-columns: 1fr; gap: 12px; padding-left: var(--space-sm); }
        }
      `}</style>
    </section>
  );
}
