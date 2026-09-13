"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/app/data";
import { onIntroComplete } from "@/lib/introSignal";
import HeroArt from "./HeroArt";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const stats = [
  { num: "8+", label: "Projects shipped" },
  { num: "5+", label: "Tech stacks" },
  { num: "1+", label: "Internship" },
  { num: "4+", label: "Years building" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

// Timings run ~20% slower than the base choreography for a more deliberate,
// premium entrance now that it's sequenced to start right after the intro.
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const rise = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: EASE } },
};

const nameRise = {
  hidden: { opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" },
  visible: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", transition: { duration: 0.58, ease: EASE } },
};

const blockIn = {
  hidden: { opacity: 0, x: -26 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.53, ease: EASE } },
};

const ruleGrow = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.5, ease: EASE } },
};

export default function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => onIntroComplete(() => setReady(true)), []);

  return (
    <section id="about" className="hero">
      <motion.div className="hero-inner" variants={container} initial="hidden" animate={ready ? "visible" : "hidden"}>
        <div className="hero-copy">
          <motion.div className="hero-meta" variants={rise}>
            <span className="tag">{personalInfo.location.toUpperCase()}</span>
            <span className="tag tag-live">
              <span className="tag-dot" /> OPEN TO WORK
            </span>
          </motion.div>

          <h1 className="hero-name">
            <motion.span className="hero-name-line" variants={nameRise}>TIRTH</motion.span>
            <br />
            <motion.span className="hero-name-hit" variants={blockIn}>VAGHELA</motion.span>
          </h1>

          <motion.div className="hero-role-row" variants={rise}>
            <span className="hero-role">{personalInfo.title.toUpperCase()}</span>
            <span className="hero-stack">REACT · NEXT.JS · DJANGO · FLASK · PYTHON</span>
            <motion.span className="hero-rule" variants={ruleGrow} />
          </motion.div>

          <motion.p className="hero-desc" variants={rise}>
            MSc IT student (Sem 9) at GLS University. Building modern web apps and AI-powered systems using React, Next.js, Django, Flask, and more.
          </motion.p>

          <motion.div className="hero-actions" variants={rise}>
            <button onClick={() => scrollTo("projects")} className="btn-solid">
              VIEW PROJECTS <ArrowUpRight size={18} />
            </button>
            <a href="/TV_Resume.pdf" download className="btn-outline">RÉSUMÉ</a>
            <div className="hero-social">
              {[
                { icon: <Github size={18} />, href: personalInfo.github, label: "GitHub" },
                { icon: <Linkedin size={18} />, href: personalInfo.linkedin, label: "LinkedIn" },
                { icon: <Mail size={18} />, href: `mailto:${personalInfo.email}`, label: "Email" },
              ].map(({ icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="social-btn">{icon}</a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div className="hero-art" variants={rise}>
          <HeroArt />
        </motion.div>
      </motion.div>

      <div className="hero-stats">
        {stats.map(({ num, label }) => (
          <div key={label} className="hero-stat">
            <div className="hero-stat-num">{num}</div>
            <div className="hero-stat-label">{label}</div>
          </div>
        ))}
      </div>

      <style>{`
        .hero { border-bottom: var(--bw) solid var(--text); }
        .hero-inner {
          padding: var(--space-2xl) 5% var(--space-xl); overflow: clip;
          display: grid; grid-template-columns: 1.15fr 0.85fr; gap: var(--space-2xl); align-items: center;
        }
        .hero-art { color: var(--text); display: flex; align-items: center; justify-content: center; }
        .hero-art svg { width: 100%; max-width: 340px; height: auto; }
        .tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono-face); font-size: 11px; font-weight: 500; letter-spacing: 0.06em;
          border: 1.5px solid var(--text); padding: 5px 12px; color: var(--text-muted);
        }
        .hero-meta { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: var(--space-lg); }
        .tag-live { color: var(--text); font-weight: 700; }
        .tag-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--positive); display: inline-block; }
        .hero-name {
          font-family: var(--font-display); font-weight: 800; text-transform: uppercase;
          font-size: clamp(3.2rem, 12vw, 8.5rem); line-height: 0.88; letter-spacing: -0.02em;
          color: var(--text); margin-bottom: var(--space-lg); overflow-wrap: anywhere; min-width: 0;
        }
        .hero-name-line { display: inline-block; }
        .hero-name-hit {
          display: inline-block; background: var(--accent); color: var(--accent-ink);
          padding: 0 0.08em; box-decoration-break: clone; -webkit-box-decoration-break: clone;
        }
        .hero-role-row {
          position: relative; display: flex; align-items: baseline; gap: var(--space-lg); flex-wrap: wrap;
          padding-bottom: var(--space-md); margin-bottom: var(--space-md);
        }
        .hero-rule {
          position: absolute; left: 0; right: 0; bottom: 0; height: var(--bw); background: var(--text);
          transform-origin: left center; display: block;
        }
        .hero-role { font-family: var(--font-display); font-weight: 700; font-size: clamp(18px, 2.4vw, 26px); letter-spacing: -0.01em; color: var(--text); }
        .hero-stack { font-family: var(--font-mono-face); font-size: 12px; color: var(--text-muted); letter-spacing: 0.02em; }
        .hero-desc { font-size: 15px; color: var(--text-muted); line-height: 1.7; max-width: 56ch; margin-bottom: var(--space-xl); }
        .hero-actions { display: flex; align-items: center; gap: var(--space-md); flex-wrap: wrap; }
        .btn-solid {
          background: var(--text); color: var(--bg); border: var(--bw) solid var(--text);
          padding: 15px 26px; font-family: var(--font-display); font-weight: 700; font-size: 14px;
          letter-spacing: 0.04em; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
          transition: transform var(--dur-short) var(--ease-out), background-color var(--dur-short) var(--ease-out), color var(--dur-short) var(--ease-out), box-shadow var(--dur-short) var(--ease-out);
        }
        .btn-solid:hover { background: var(--accent); border-color: var(--text); color: var(--accent-ink); transform: translate(-3px, -3px); box-shadow: var(--shadow-hard); }
        .btn-solid:active { transform: translate(0, 0); box-shadow: none; }
        .btn-outline {
          background: var(--bg); color: var(--text); border: var(--bw) solid var(--text);
          padding: 15px 26px; font-family: var(--font-display); font-weight: 700; font-size: 14px;
          letter-spacing: 0.04em; cursor: pointer; text-decoration: none;
          transition: transform var(--dur-short) var(--ease-out), background-color var(--dur-short) var(--ease-out), color var(--dur-short) var(--ease-out), box-shadow var(--dur-short) var(--ease-out);
        }
        .btn-outline:hover { background: var(--accent); color: var(--accent-ink); transform: translate(-3px, -3px); box-shadow: var(--shadow-hard); }
        .btn-outline:active { transform: translate(0, 0); box-shadow: none; }
        .hero-social { display: flex; gap: 10px; margin-left: var(--space-sm); }
        .social-btn {
          width: 46px; height: 46px; border: var(--bw) solid var(--text); display: flex; align-items: center; justify-content: center;
          color: var(--text); text-decoration: none; background: var(--bg);
          transition: background-color var(--dur-short) var(--ease-out), color var(--dur-short) var(--ease-out);
        }
        .social-btn:hover { background: var(--text); color: var(--bg); }
        @media (hover: hover) and (pointer: fine) {
          .social-btn svg { transition: transform var(--dur-short) var(--ease-out); }
          .social-btn:hover svg { transform: translateY(-2px); }
        }
        .hero-stats { display: grid; grid-template-columns: repeat(4, 1fr); border-top: var(--bw) solid var(--text); }
        .hero-stat { padding: var(--space-lg) 5%; border-left: var(--bw) solid var(--text); transition: background-color var(--dur-med) var(--ease-out); }
        .hero-stat:first-child { border-left: none; }
        .hero-stat-num { font-family: var(--font-mono-face); font-size: clamp(26px, 3.4vw, 42px); font-weight: 500; color: var(--text); line-height: 1; }
        .hero-stat-label { font-size: 11px; color: var(--text-muted); margin-top: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
        @media (hover: hover) and (pointer: fine) {
          .hero-stat:hover { background: var(--bg-alt); }
        }
        @media (max-width: 768px) {
          /* globals.css forces padding-top/bottom:48px !important on every <section> for
             mobile breathing room; .hero manages its own spacing entirely through
             .hero-inner, so that global padding was adding an untracked 48px gap below
             .hero-stats — its own border-bottom never actually touched the stats grid,
             which is why the last row's vertical divider looked disconnected from it. */
          .hero { padding-top: 0 !important; padding-bottom: 0 !important; }
          .hero-inner { padding: var(--space-xl) 6% var(--space-lg); grid-template-columns: 1fr; }
          .hero-art { display: none; }
          .hero-stats { grid-template-columns: repeat(2, 1fr); }
          .hero-stat { border-left: none; border-top: none; }
          .hero-stat:nth-child(-n+2) { border-bottom: var(--bw) solid var(--text); }
          .hero-stat:nth-child(odd) { border-right: var(--bw) solid var(--text); }
          .hero-actions { gap: var(--space-sm); }
          .btn-solid, .btn-outline { flex: 1 1 auto; justify-content: center; }
          .hero-social { width: 100%; margin-left: 0; margin-top: var(--space-sm); }
          .hero-social .social-btn { flex: 1; }
        }
      `}</style>
    </section>
  );
}
