"use client";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const links = ["About", "Skills", "Projects", "Experience", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("About");
  const [progress, setProgress] = useState(0);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      const offsets = links.map((l) => {
        const el = document.getElementById(l.toLowerCase());
        if (!el) return { id: l, top: Infinity };
        return { id: l, top: el.getBoundingClientRect().top };
      });
      const inView = offsets.filter((o) => o.top <= 120);
      if (inView.length > 0) setActive(inView[inView.length - 1].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "var(--nav-bg)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border-light)" : "none",
      transition: "all 0.3s",
    }}>
      {/* Scroll progress bar */}
      <div style={{ position: "absolute", top: 0, left: 0, height: 2, width: `${progress}%`, background: "var(--accent)", transition: "width 0.1s linear", zIndex: 51 }} />

      <div style={{ padding: "0 6%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <span onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ cursor: "pointer", fontSize: 22, fontWeight: 900, letterSpacing: "-1px", color: "var(--text)" }}>
          TV<span style={{ color: "var(--accent)" }}>.</span>
        </span>

        {/* Desktop links */}
        <ul style={{ display: "flex", gap: 36, listStyle: "none" }} className="nav-desktop">
          {links.map((l) => (
            <li key={l} style={{ position: "relative" }}>
              <button onClick={() => handleNav(l)}
                style={{ background: "none", border: "none", color: active === l ? "var(--text)" : "var(--text-faint)", cursor: "pointer", fontSize: 14, fontWeight: active === l ? 700 : 500, letterSpacing: "0.3px", transition: "color 0.2s", padding: "4px 0" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = active === l ? "var(--text)" : "var(--text-faint)")}
              >{l}</button>
              {active === l && (
                <span style={{ position: "absolute", bottom: -2, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: "var(--accent)" }} />
              )}
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="nav-desktop">
          <button onClick={toggle} aria-label="Toggle theme"
            style={{ background: "none", border: "1.5px solid var(--border)", borderRadius: 6, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text)", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; }}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <a href="mailto:vaghelatirth719@gmail.com"
            style={{ background: "var(--text)", color: "var(--bg)", padding: "10px 24px", borderRadius: 4, fontSize: 13, fontWeight: 600, textDecoration: "none", letterSpacing: "0.5px", transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--text)")}
          >Hire Me</a>
        </div>

        <button onClick={() => setOpen(!open)} className="nav-mobile" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)" }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border-light)", padding: "16px 6%" }}>
          {links.map((l) => (
            <button key={l} onClick={() => handleNav(l)}
              style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", color: active === l ? "var(--accent)" : "var(--text-muted)", fontWeight: active === l ? 700 : 400, cursor: "pointer", fontSize: 16, padding: "12px 0", borderBottom: "1px solid var(--border-light)" }}>
              {l}
            </button>
          ))}
          <button onClick={toggle}
            style={{ marginTop: 12, background: "none", border: "1.5px solid var(--border)", borderRadius: 6, padding: "8px 16px", cursor: "pointer", color: "var(--text)", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}

      <style>{`
        .nav-desktop { display: flex; align-items: center; }
        .nav-mobile { display: none; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
