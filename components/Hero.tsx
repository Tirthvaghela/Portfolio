"use client";
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const roles = ["Full-Stack Developer", "AI/ML Engineer", "React Developer", "Python Developer"];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = roles[roleIndex];
    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, deleting, roleIndex]);

  return (
    <section id="about" className="hero-section">
      <div className="hero-dots" />

      <div className="hero-grid">
        {/* LEFT */}
        <div className="hero-left">
          <h1 style={{ fontWeight: 900, color: "#111", marginBottom: 8, lineHeight: 1 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 2 }}>
              <span style={{ fontSize: "clamp(28px, 6vw, 80px)", fontStyle: "italic", letterSpacing: "-2px", fontWeight: 900, color: "#111" }}>Hi, </span>
              <span style={{ fontSize: "clamp(12px, 1.4vw, 20px)", fontStyle: "italic", fontWeight: 500, color: "#999" }}>I am</span>
            </div>
            <div style={{ fontSize: "clamp(52px, 10vw, 130px)", letterSpacing: "-5px", lineHeight: 0.88, fontWeight: 900, WebkitTextStroke: "2px #111", color: "transparent" }}>Tirth</div>
            <div style={{ fontSize: "clamp(52px, 10vw, 130px)", letterSpacing: "-5px", lineHeight: 0.88, fontWeight: 900, WebkitTextStroke: "2px #111", color: "transparent", marginBottom: 20 }}>Vaghela</div>
            <div style={{ fontSize: "clamp(12px, 1.4vw, 20px)", fontWeight: 500, color: "#999", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 4 }}>and I am a</div>
          </h1>

          <div className="hero-typewriter">
            {displayed}<span style={{ color: "#2563eb", animation: "blink 1s step-end infinite" }}>|</span>
          </div>

          <p style={{ fontSize: 14, color: "#777", lineHeight: 1.85, maxWidth: 460, marginBottom: 28 }}>
            MSc IT student at GLS University. Building modern web apps and AI-powered systems using React, Next.js, Django, Flask, and more.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
            <button onClick={() => scrollTo("projects")} className="btn-primary">View Projects</button>
            <button onClick={() => scrollTo("contact")} className="btn-outline">Contact Me</button>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {[
              { icon: <Github size={17} />, href: "https://github.com/Tirthvaghela", label: "GitHub" },
              { icon: <Linkedin size={17} />, href: "https://www.linkedin.com/in/tirthvaghela/", label: "LinkedIn" },
              { icon: <Mail size={17} />, href: "mailto:vaghelatirth719@gmail.com", label: "Email" },
            ].map(({ icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="social-icon">{icon}</a>
            ))}
          </div>
        </div>

        {/* RIGHT — code card */}
        <div className="hero-right">
          <div className="code-card">
            {/* Window bar */}
            <div className="code-card-bar">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
              <span className="code-card-filename">portfolio.ts</span>
            </div>
            {/* Code body */}
            <div className="code-body">
              <div><span className="c-purple">const</span> <span className="c-blue">developer</span> <span className="c-white">= {"{"}</span></div>
              <div className="code-line"><span className="c-red">name</span><span className="c-white">: </span><span className="c-green">&quot;Tirth Vaghela&quot;</span><span className="c-white">,</span></div>
              <div className="code-line"><span className="c-red">role</span><span className="c-white">: </span><span className="c-green">&quot;Full Stack Dev&quot;</span><span className="c-white">,</span></div>
              <div className="code-line"><span className="c-red">skills</span><span className="c-white">: [</span><span className="c-green">&quot;React&quot;</span><span className="c-white">, </span><span className="c-green">&quot;Next.js&quot;</span><span className="c-white">,</span></div>
              <div className="code-line code-indent"><span className="c-green">&quot;Django&quot;</span><span className="c-white">, </span><span className="c-green">&quot;MongoDB&quot;</span><span className="c-white">],</span></div>
              <div className="code-line"><span className="c-red">passion</span><span className="c-white">: </span><span className="c-green">&quot;Building things&quot;</span><span className="c-white">,</span></div>
              <div><span className="c-white">{"}"}</span><span className="c-white">;</span></div>
              <div className="code-cursor">▋</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "#ccc", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", zIndex: 1 }}>
        <span>Scroll</span>
        <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, #ccc, transparent)" }} />
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .hero-section { min-height: 100vh; background: linear-gradient(160deg, #f8f8f6 0%, #eef2ff 60%, #f8f8f6 100%); position: relative; overflow: hidden; padding-top: 72px; }
        .hero-dots { position: absolute; inset: 0; z-index: 0; pointer-events: none; background-image: radial-gradient(circle, #2563eb18 1px, transparent 1px); background-size: 32px 32px; mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%); -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%); }
        .hero-grid { position: relative; z-index: 1; width: 100%; padding: 40px 5% 80px; display: grid; grid-template-columns: 55% 45%; align-items: center; min-height: calc(100vh - 72px); }
        .hero-left { padding-right: 4%; }
        .hero-right { display: flex; flex-direction: column; align-items: center; padding-left: 2%; }
        .code-card { background: #1e1e2e; border-radius: 12px; width: 100%; max-width: 380px; box-shadow: 0 24px 64px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.06); overflow: hidden; }
        .code-card-bar { background: #2a2a3e; padding: 12px 16px; display: flex; align-items: center; gap: 6px; }
        .dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
        .dot-red { background: #ff5f57; }
        .dot-yellow { background: #febc2e; }
        .dot-green { background: #28c840; }
        .code-card-filename { margin-left: 8px; font-size: 12px; color: #666; font-family: monospace; }
        .code-body { padding: 24px 28px 28px; font-family: 'Fira Code', 'Cascadia Code', monospace; font-size: clamp(12px, 1.3vw, 14px); line-height: 2; }
        .code-line { padding-left: 20px; }
        .code-indent { padding-left: 40px; }
        .code-cursor { color: #2563eb; animation: blink 1s step-end infinite; margin-top: 4px; }
        .c-purple { color: #c792ea; }
        .c-blue { color: #82aaff; }
        .c-red { color: #f07178; }
        .c-green { color: #c3e88d; }
        .c-white { color: #cdd6f4; }
        .hero-typewriter { font-size: clamp(22px, 4.5vw, 64px); font-weight: 600; letter-spacing: -1px; color: #2563eb; line-height: 1; margin-bottom: 24px; min-height: 1.1em; overflow: hidden; white-space: nowrap; }
        .btn-primary { background: #111; color: #fff; padding: 13px 28px; border-radius: 3px; font-weight: 700; font-size: 14px; border: 2px solid #111; cursor: pointer; letter-spacing: 0.4px; transition: all 0.2s; }
        .btn-primary:hover { background: #2563eb; border-color: #2563eb; }
        .btn-outline { background: transparent; color: #111; padding: 13px 28px; border-radius: 3px; font-weight: 700; font-size: 14px; border: 2px solid #111; cursor: pointer; letter-spacing: 0.4px; transition: all 0.2s; }
        .btn-outline:hover { background: #111; color: #fff; }
        .social-icon { width: 40px; height: 40px; border-radius: 3px; border: 1.5px solid #ddd; display: flex; align-items: center; justify-content: center; color: #666; text-decoration: none; transition: all 0.2s; }
        .social-icon:hover { border-color: #2563eb; color: #2563eb; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr; padding: 32px 5% 60px; gap: 40px; }
          .hero-left { padding-right: 0; }
          .hero-right { padding-left: 0; }
          .hero-typewriter { white-space: normal; }
        }
      `}</style>
    </section>
  );
}
