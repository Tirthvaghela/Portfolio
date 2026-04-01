"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { useEffect } from "react";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  tech: string[];
  description: string;
  points: string[];
  github?: string;
  collaborator?: { name: string; linkedin: string };
  buildDays?: number;
  category: string;
  color: string;
}

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (project) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, backdropFilter: "blur(4px)" }}
          />

          {/* Modal panel */}
          <div style={{ position: "fixed", inset: 0, zIndex: 101, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", pointerEvents: "none" }}>
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "relative", zIndex: 101,
              background: "var(--bg-card)",
              borderRadius: 8,
              width: "min(680px, 92vw)",
              maxHeight: "85vh",
              overflowY: "auto",
              boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
              pointerEvents: "all",
            }}
          >
            {/* Color bar */}
            <div style={{ height: 5, background: `linear-gradient(90deg, ${project.color}, ${project.color}60)`, borderRadius: "8px 8px 0 0" }} />

            <div style={{ padding: "clamp(20px, 5vw, 40px)" }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: project.color, background: `${project.color}20`, padding: "3px 10px", borderRadius: 2 }}>
                      {project.category}
                    </span>
                  </div>
                  <h2 style={{ fontSize: 28, fontWeight: 900, color: "var(--text)", letterSpacing: "-1px", lineHeight: 1, marginBottom: 4 }}>
                    {project.title}
                  </h2>
                  <p style={{ fontSize: 14, color: project.color, fontWeight: 600 }}>{project.subtitle}</p>
                  {project.buildDays && (
                    <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 6, background: "var(--bg-section)", border: "1px solid var(--border)", borderRadius: 100, padding: "4px 12px" }}>
                      <span style={{ fontSize: 11, color: "var(--text-muted)" }}>⏱</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)" }}>Built in ~{project.buildDays} days</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={onClose}
                  style={{ background: "var(--bg-section)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "background 0.2s", color: "var(--text)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--border)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bg-section)")}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Description */}
              <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 28 }}>
                {project.description}
              </p>

              {/* Bullet points */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 16 }}>
                  Key Features
                </h3>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {project.points.map((pt, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7 }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", background: `${project.color}15`, border: `1.5px solid ${project.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: project.color, display: "block" }} />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Collaborator */}
              {project.collaborator && (
                <div style={{ marginBottom: 28, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, color: "var(--text-faint)", letterSpacing: "1px", textTransform: "uppercase" }}>Built with</span>
                  <a href={project.collaborator.linkedin} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                  >
                    {project.collaborator.name} ↗
                  </a>
                </div>
              )}

              {/* Tech stack */}
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 12 }}>
                  Tech Stack
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {project.tech.map((t) => (
                    <span key={t} style={{ fontSize: 13, color: "var(--text-muted)", background: "var(--bg-section)", padding: "6px 14px", borderRadius: 3, border: "1px solid var(--border)", fontWeight: 500 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    style={{ background: "var(--text)", color: "var(--bg)", border: "none", padding: "13px 28px", borderRadius: 3, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, textDecoration: "none", transition: "background 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.color = ""; }}
                  >
                    View on GitHub <ArrowUpRight size={15} />
                  </a>
                )}
                <button onClick={onClose}
                  style={{ background: "transparent", color: "var(--text)", border: "1.5px solid var(--border)", padding: "13px 28px", borderRadius: 3, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--text)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
