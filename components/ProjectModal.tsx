"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { CategoryIcon } from "./CategoryIcon";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN = [0.7, 0, 0.84, 0] as const;

interface Project {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  tech: string[];
  description: string;
  points: string[];
  github?: string;
  demo?: string;
  collaborator?: { name: string; linkedin: string };
  buildDays?: number;
  category: string;
}

interface Props {
  project: Project | null;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({ project, onClose }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !modalRef.current) return;

      // Keep Tab/Shift+Tab cycling within the modal instead of escaping to the page behind it.
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (project) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    if (project) {
      previouslyFocused.current = document.activeElement as HTMLElement;
      closeBtnRef.current?.focus();
    } else {
      previouslyFocused.current?.focus();
    }
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100 }}
          />

          <div style={{ position: "fixed", inset: 0, zIndex: 101, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", pointerEvents: "none" }}>
          <motion.div
            key="modal"
            ref={modalRef}
            initial={{ opacity: 0, y: 20, scale: 0.98, boxShadow: "4px 4px 0 0 var(--accent)" }}
            animate={{ opacity: 1, y: 0, scale: 1, boxShadow: "10px 10px 0 0 var(--accent)", transition: { duration: 0.32, ease: EASE_OUT } }}
            exit={{ opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.18, ease: EASE_IN } }}
            style={{
              position: "relative", zIndex: 101,
              background: "var(--bg-card)",
              border: "var(--bw) solid var(--text)",
              width: "min(680px, 92vw)",
              maxHeight: "85vh",
              overflowY: "auto",
              pointerEvents: "all",
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <div style={{ padding: "clamp(20px, 5vw, 40px)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, gap: 16 }}>
                <div style={{ minWidth: 0 }}>
                  <span style={{ fontFamily: "var(--font-mono-face)", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: "var(--accent)", border: "1.5px solid var(--accent)", padding: "3px 10px", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                    <CategoryIcon category={project.category} size={12} />
                    {project.category.toUpperCase()}
                  </span>
                  <h2 id="project-modal-title" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 5vw, 38px)", fontWeight: 800, textTransform: "uppercase", color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 0.95, marginBottom: 6, overflowWrap: "anywhere" }}>
                    {project.title}
                  </h2>
                  <p style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 600 }}>{project.subtitle}</p>
                  {project.buildDays && (
                    <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono-face)", border: "1.5px solid var(--text)", padding: "4px 12px" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>BUILT IN ~{project.buildDays} DAYS</span>
                    </div>
                  )}
                </div>
                <button
                  ref={closeBtnRef}
                  onClick={onClose}
                  aria-label="Close"
                  style={{ background: "var(--bg-card)", border: "var(--bw) solid var(--text)", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "background-color var(--dur-short) var(--ease-out), color var(--dur-short) var(--ease-out)", color: "var(--text)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--text)"; e.currentTarget.style.color = "var(--bg)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-card)"; e.currentTarget.style.color = "var(--text)"; }}
                >
                  <X size={16} />
                </button>
              </div>

              <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 28 }}>
                {project.description}
              </p>

              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontFamily: "var(--font-mono-face)", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "var(--text-faint)", marginBottom: 16 }}>
                  KEY FEATURES
                </h3>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column" }}>
                  {project.points.map((pt, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, padding: "12px 0", borderTop: i === 0 ? "none" : "1.5px solid var(--border)" }}>
                      <span style={{ color: "var(--accent)", fontWeight: 800, flexShrink: 0 }}>—</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {project.collaborator && (
                <div style={{ marginBottom: 28, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: "var(--font-mono-face)", fontSize: 12, color: "var(--text-faint)", letterSpacing: "0.05em" }}>BUILT WITH</span>
                  <a href={project.collaborator.linkedin} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", textDecoration: "none", borderBottom: "2px solid var(--accent)" }}
                  >
                    {project.collaborator.name} <ArrowUpRight size={13} style={{ display: "inline", verticalAlign: "-2px" }} />
                  </a>
                </div>
              )}

              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontFamily: "var(--font-mono-face)", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "var(--text-faint)", marginBottom: 12 }}>
                  TECH STACK
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {project.tech.map((t) => (
                    <span key={t} style={{ fontFamily: "var(--font-mono-face)", fontSize: 12, color: "var(--text)", padding: "5px 12px", border: "1.5px solid var(--text)", fontWeight: 600 }}>
                      {t.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer"
                    style={{ background: "var(--accent)", color: "var(--accent-ink)", border: "var(--bw) solid var(--text)", padding: "13px 24px", fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, textDecoration: "none", transition: "transform var(--dur-short) var(--ease-out)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-2px,-2px)"; e.currentTarget.style.boxShadow = "4px 4px 0 0 var(--text)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                  >
                    LIVE DEMO <ArrowUpRight size={15} />
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    style={{ background: project.demo ? "var(--bg-card)" : "var(--text)", color: project.demo ? "var(--text)" : "var(--bg)", border: "var(--bw) solid var(--text)", padding: "13px 24px", fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, textDecoration: "none", transition: "transform var(--dur-short) var(--ease-out)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-2px,-2px)"; e.currentTarget.style.boxShadow = "4px 4px 0 0 var(--accent)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                  >
                    VIEW ON GITHUB <ArrowUpRight size={15} />
                  </a>
                )}
                <button onClick={onClose}
                  style={{ background: "var(--bg-card)", color: "var(--text)", border: "var(--bw) solid var(--border)", padding: "13px 24px", fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "border-color var(--dur-short) var(--ease-out)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--text)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                >
                  CLOSE
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
