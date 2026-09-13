"use client";
import { MapPin, Mail, GraduationCap, Github, ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/app/data";
import FadeIn from "./FadeIn";
import SectionPanel from "./SectionPanel";
import GithubActivity from "./GithubActivity";

export default function About() {
  return (
    <section style={{ background: "var(--bg-section)", padding: "var(--space-2xl) 5%", borderBottom: "var(--bw) solid var(--text)" }}>
      <SectionPanel className="about-grid">
        <FadeIn direction="left">
          <div>
            <h2 className="about-statement">
              STILL LEARNING.<br />ALREADY SHIPPING.
            </h2>
            <p className="about-body">
              Motivated MSc IT student (Semester 9) at GLS University with strong skills in full-stack web development. Completed BSc IT as part of the integrated IMSC program. Experienced in building modern web applications using Python, Django, Next.js, React, and databases like MySQL and MongoDB. Completed multiple internships and hands-on projects including authentication systems and AI-based platforms.
            </p>
            <div className="about-meta">
              {[
                { icon: <MapPin size={16} />, label: "Location", value: personalInfo.location, href: null },
                { icon: <Mail size={16} />, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: <GraduationCap size={16} />, label: "University", value: "GLS University, 2022–2027", href: "https://www.glsuniversity.ac.in" },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="about-meta-row">
                  <span className="about-meta-icon">{icon}</span>
                  <span className="about-meta-label">{label}</span>
                  {href
                    ? <a href={href} className="about-meta-value">{value}</a>
                    : <span className="about-meta-value">{value}</span>}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="right" delay={0.1}>
          <div className="github-box">
            <div className="github-box-head">
              <Github size={14} aria-hidden />
              <p className="github-label">ENGINEERING ACTIVITY</p>
              <span className="github-live-dot" aria-hidden />
            </div>
            <GithubActivity username="Tirthvaghela" />
            <a href="https://github.com/Tirthvaghela" target="_blank" rel="noopener noreferrer" className="github-link">
              VIEW PROFILE <span className="github-link-arrow"><ArrowUpRight size={14} /></span>
            </a>
          </div>
        </FadeIn>
      </SectionPanel>

      <style>{`
        .about-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: var(--space-2xl); align-items: start; }
        .about-grid > * { min-width: 0; }
        .about-statement {
          font-family: var(--font-display); font-weight: 800; text-transform: uppercase;
          font-size: clamp(2.2rem, 4.6vw, 3.4rem); line-height: 0.98; letter-spacing: -0.01em;
          color: var(--text); margin-bottom: var(--space-lg);
        }
        .about-body { font-size: 15px; color: var(--text-muted); line-height: 1.8; max-width: 62ch; margin-bottom: var(--space-xl); }
        .about-meta { border-top: var(--bw) solid var(--text); }
        .about-meta-row {
          display: flex; align-items: center; gap: 12px; padding: 14px 4px; border-bottom: 1.5px solid var(--text);
          transition: border-color var(--dur-med) var(--ease-out), background-color var(--dur-med) var(--ease-out);
        }
        .about-meta-icon { color: var(--accent); flex-shrink: 0; display: flex; transition: transform var(--dur-med) var(--ease-out); }
        .about-meta-label { font-family: var(--font-mono-face); font-size: 11px; color: var(--text-faint); text-transform: uppercase; letter-spacing: 0.05em; min-width: 90px; }
        .about-meta-value { font-size: 14px; font-weight: 700; color: var(--text); text-decoration: none; display: inline-block; transition: transform var(--dur-med) var(--ease-out), color var(--dur-med) var(--ease-out); }
        @media (hover: hover) and (pointer: fine) {
          .about-meta-row:hover { border-color: var(--accent); background: var(--bg-alt); }
          .about-meta-row:hover .about-meta-icon { transform: translateX(3px); }
          .about-meta-row:hover .about-meta-value { transform: translateX(3px); color: var(--accent); }
        }
        .github-box { border: var(--bw) solid var(--text); background: var(--bg-card); padding: var(--space-lg); }
        .github-box-head { display: flex; align-items: center; gap: 8px; color: var(--text-muted); margin-bottom: var(--space-md); }
        .github-label { font-family: var(--font-mono-face); font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: var(--text-muted); }
        .github-live-dot { width: 6px; height: 6px; background: var(--positive); margin-left: auto; flex-shrink: 0; }
        .github-link {
          display: inline-flex; align-items: center; gap: 6px; margin-top: var(--space-md);
          font-family: var(--font-display); font-size: 13px; font-weight: 700; letter-spacing: 0.04em;
          color: var(--text); text-decoration: none; border-bottom: 2px solid var(--accent);
        }
        .github-link-arrow { transition: transform var(--dur-short) var(--ease-out); display: inline-flex; align-items: center; }
        @media (hover: hover) and (pointer: fine) {
          .github-link:hover .github-link-arrow { transform: translateX(3px); }
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; gap: var(--space-xl); }
        }
      `}</style>
    </section>
  );
}
