"use client";
import { Briefcase, GraduationCap as GradIcon, ArrowUpRight } from "lucide-react";
import { experience, education } from "@/app/data";
import FadeIn from "./FadeIn";
import SectionPanel from "./SectionPanel";

export default function Experience() {
  return (
    <section id="experience" style={{ background: "var(--bg-alt)", padding: "var(--space-2xl) 5%", borderBottom: "var(--bw) solid var(--text)" }}>
      <SectionPanel>
        <h2 className="exp-heading">EXPERIENCE &amp; EDUCATION</h2>

        <div className="exp-grid">
          <FadeIn direction="left" delay={0.05}>
          <div>
            <p className="exp-label"><Briefcase size={13} aria-hidden /> WORK EXPERIENCE</p>
            {experience.map((exp, i) => (
              <div key={i} className="exp-block">
                <div className="exp-block-head">
                  <h3 className="exp-role">{exp.role.toUpperCase()}</h3>
                  <span className="exp-period">{exp.period}</span>
                </div>
                <p className="exp-company">{exp.company} — {exp.type.toUpperCase()}</p>
                <ul className="exp-points">
                  {exp.points.map((pt, j) => (
                    <li key={j}><span className="exp-mark" aria-hidden /><span>{pt}</span></li>
                  ))}
                </ul>
                <blockquote className="exp-quote">
                  &ldquo;His attention to detail, creativity, and willingness to go the extra mile set him apart from his peers.&rdquo;
                  <footer>— DEVEN CHOPRA, SOFTWARE ENGINEERING MANAGER AT PRODIGY INFOTECH</footer>
                </blockquote>
                <div className="exp-links">
                  <a href="/Certificate.pdf" target="_blank" rel="noopener noreferrer">CERTIFICATE <ArrowUpRight size={12} className="ext-arrow" /></a>
                  <a href="/lor.pdf" target="_blank" rel="noopener noreferrer">LOR <ArrowUpRight size={12} className="ext-arrow" /></a>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn direction="right" delay={0.1}>
          <div>
            <p className="exp-label exp-label--accent"><GradIcon size={13} aria-hidden /> EDUCATION</p>
            {education.map((edu, i) => (
              <div key={i} className="exp-block exp-block--edu" data-current={edu.status === "Pursuing"}>
                <span className="exp-index">{String(i + 1).padStart(2, "0")}</span>
                <div className="exp-edu-body">
                  <div className="exp-block-head">
                    <h3 className="exp-role">
                      <a href="https://www.glsuniversity.ac.in" target="_blank" rel="noopener noreferrer" className="exp-role-link">{edu.institution.toUpperCase()} <ArrowUpRight size={15} className="ext-arrow" /></a>
                    </h3>
                    <span className="exp-period">{edu.period}</span>
                  </div>
                  <span className="exp-status" data-pursuing={edu.status === "Pursuing"}>{edu.status.toUpperCase()}</span>
                  <p className="exp-degree">{edu.degree}</p>
                  <p className="exp-note">{edu.note}</p>
                  {"cgpa" in edu && (
                    <div className="exp-badges">
                      <span className="exp-badge">CGPA {(edu as {cgpa: string}).cgpa}</span>
                      <span className="exp-badge exp-badge--accent">{(edu as {distinction: string}).distinction.toUpperCase()}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <p className="exp-label exp-label--tight">TRAINING / COURSES</p>
            <div className="exp-course">
              <h4>MASTER MONGODB DATABASE DESIGN</h4>
              <p className="exp-note">Compass + Mongosh + PyMongo — Udemy · Feb 2026</p>
              <a href="/mongodb-udemy.pdf" target="_blank" rel="noopener noreferrer">CERTIFICATE <ArrowUpRight size={11} className="ext-arrow" /></a>
            </div>
            <div className="exp-course">
              <h4>CLAUDE CODE IN ACTION</h4>
              <p className="exp-note">Anthropic — March 2026</p>
              <a href="/claude-code-certificate.pdf" target="_blank" rel="noopener noreferrer">CERTIFICATE <ArrowUpRight size={11} className="ext-arrow" /></a>
            </div>
            <div className="exp-course">
              <h4>DEVELOPING FRONT-END APPS WITH REACT</h4>
              <p className="exp-note">IBM — Coursera · 4 modules</p>
              <div className="exp-links">
                <a href="/ibm-react-certificate.pdf" target="_blank" rel="noopener noreferrer">CERTIFICATE <ArrowUpRight size={11} className="ext-arrow" /></a>
                <a href="https://www.credly.com/badges/89cb78a8-a849-4529-99f6-70603ec5349c/public_url" target="_blank" rel="noopener noreferrer">BADGE <ArrowUpRight size={11} className="ext-arrow" /></a>
              </div>
            </div>
          </div>
        </FadeIn>
        </div>
      </SectionPanel>

      <style>{`
        .exp-heading {
          font-family: var(--font-display); font-weight: 800; text-transform: uppercase;
          font-size: clamp(2rem, 4.2vw, 3.2rem); letter-spacing: -0.01em; line-height: 1;
          color: var(--text); margin-bottom: var(--space-2xl);
        }
        .exp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2xl); }
        .exp-label {
          display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 12px; font-weight: 800;
          letter-spacing: 0.12em; color: var(--bg); background: var(--text); padding: 11px 14px; margin-bottom: var(--space-lg);
        }
        .exp-label--accent { color: var(--accent-ink); background: var(--accent); }
        .exp-label--tight { margin-top: var(--space-xl); }
        .exp-block {
          border: var(--bw) solid var(--text); background: var(--bg-card); padding: var(--space-lg); margin-bottom: var(--space-lg);
          transition: transform var(--dur-short) var(--ease-out), box-shadow var(--dur-short) var(--ease-out), border-color var(--dur-short) var(--ease-out);
        }
        @media (hover: hover) and (pointer: fine) {
          .exp-block:hover { transform: translate(-4px, -4px); box-shadow: var(--shadow-hard); border-color: var(--accent); }
        }
        .exp-block--edu[data-current="true"] { border-color: var(--accent); background: var(--bg-alt); }
        .exp-block--edu { display: flex; gap: var(--space-md); align-items: flex-start; }
        .exp-index { font-family: var(--font-mono); font-size: clamp(40px, 4.6vw, 64px); font-weight: 500; line-height: 0.8; color: var(--text); flex-shrink: 0; }
        .exp-edu-body { min-width: 0; flex: 1; }
        .exp-block-head { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; }
        .exp-role { font-family: var(--font-display); font-size: clamp(20px, 2.2vw, 26px); font-weight: 800; letter-spacing: -0.005em; color: var(--text); line-height: 1.1; }
        .exp-role-link { color: inherit; text-decoration: none; }
        .exp-role-link:hover { color: var(--accent); }
        .exp-period { font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); border: 1.5px solid var(--text); padding: 3px 10px; white-space: nowrap; }
        .exp-company { font-size: 13px; color: var(--accent); font-weight: 700; margin-top: 4px; }
        .exp-points { list-style: none; padding: 0; margin-top: var(--space-md); display: flex; flex-direction: column; gap: 12px; }
        .exp-points li { display: flex; gap: 12px; font-size: 14px; color: var(--text-muted); line-height: 1.7; }
        .exp-mark { width: 9px; height: 9px; background: var(--accent); flex-shrink: 0; margin-top: 7px; }
        .exp-quote {
          position: relative; margin-top: var(--space-lg); padding: var(--space-lg); background: var(--text); color: var(--bg);
          font-family: var(--font-display); font-weight: 700; font-size: 16px; line-height: 1.5; overflow: hidden;
        }
        .exp-quote::before {
          content: "\\201C"; position: absolute; top: -30px; right: 10px; font-family: var(--font-display); font-weight: 800;
          font-size: 130px; line-height: 1; color: var(--bg); opacity: 0.12; pointer-events: none;
        }
        .exp-quote footer { position: relative; z-index: 1; margin-top: 10px; font-family: var(--font-mono); font-size: 10px; font-weight: 400; color: var(--bg-alt); letter-spacing: 0.03em; }
        .exp-links { display: flex; gap: 18px; margin-top: var(--space-md); }
        .exp-links a { font-family: var(--font-mono); font-size: 12px; color: var(--text); text-decoration: none; border-bottom: 2px solid var(--accent); font-weight: 600; display: inline-flex; align-items: center; gap: 4px; }
        .ext-arrow { display: inline-block; vertical-align: -2px; }
        .exp-status { display: inline-block; margin-top: 8px; font-family: var(--font-mono); font-size: 11px; font-weight: 700; letter-spacing: 0.05em; color: var(--accent); border: 1.5px solid var(--accent); padding: 3px 10px; }
        .exp-status[data-pursuing="false"] { color: var(--positive); border-color: var(--positive); }
        .exp-degree { font-size: 15px; color: var(--text); font-weight: 700; margin-top: 10px; }
        .exp-note { font-size: 13px; color: var(--text-muted); margin-top: 4px; }
        .exp-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-top: var(--space-sm); }
        .exp-badge { font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: var(--text); border: 1.5px solid var(--text); padding: 3px 10px; }
        .exp-badge--accent { color: var(--positive); border-color: var(--positive); }
        .exp-course {
          border: var(--bw) solid var(--text); background: var(--bg-card); padding: var(--space-md) var(--space-lg); margin-bottom: var(--space-lg);
          transition: transform var(--dur-short) var(--ease-out), box-shadow var(--dur-short) var(--ease-out), border-color var(--dur-short) var(--ease-out);
        }
        @media (hover: hover) and (pointer: fine) {
          .exp-course:hover { transform: translate(-3px, -3px); box-shadow: var(--shadow-hard-sm); border-color: var(--accent); }
        }
        .exp-course h4 { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--text); }
        .exp-course a { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); margin-top: 4px; display: inline-flex; align-items: center; gap: 4px; text-decoration: none; border-bottom: 1.5px solid var(--accent); }
        @media (max-width: 768px) {
          .exp-grid { grid-template-columns: 1fr; gap: var(--space-xl); }
          .exp-index { font-size: 32px; }
        }
      `}</style>
    </section>
  );
}
