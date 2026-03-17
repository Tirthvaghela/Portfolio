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
              <span style={{ fontSize: "clamp(28px, 6vw, 80px)", fontStyle: "italic", letterSpacing: "-2px", fontWeight: 900, color: "#111" }}>My</span>
              <span style={{ fontSize: "clamp(12px, 1.4vw, 20px)", fontStyle: "italic", fontWeight: 500, color: "#999" }}>Name is</span>
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

        {/* RIGHT */}
        <div className="hero-right">
          <div style={{ position: "relative", width: "100%", maxWidth: 300 }}>
            <div style={{ position: "absolute", top: 12, left: 12, right: -12, bottom: -12, border: "2px solid #2563eb", borderRadius: 6, zIndex: 0 }} />
            <div style={{ width: "100%", aspectRatio: "3/4", borderRadius: 6, position: "relative", zIndex: 1, border: "1px solid #e0e0e0", overflow: "hidden", background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
              <img src="/avatar.svg" alt="Developer illustration" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div style={{ position: "absolute", bottom: 20, right: -8, background: "#111", color: "#fff", padding: "14px 18px", borderRadius: 3, fontSize: 13, zIndex: 2, letterSpacing: "0.5px", lineHeight: 1.6, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
              Full-Stack<br /><span style={{ color: "#2563eb" }}>Developer</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
            {[{ num: "8", label: "Projects" }, { num: "5", label: "Tech Stacks" }, { num: "1", label: "Internship" }].map(({ num, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#111", letterSpacing: "-1px", lineHeight: 1 }}>{num}<span style={{ color: "#2563eb" }}>+</span></div>
                <div style={{ fontSize: 10, color: "#999", marginTop: 4, letterSpacing: "0.5px", textTransform: "uppercase" }}>{label}</div>
              </div>
            ))}
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
