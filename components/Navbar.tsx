"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = ["About", "Skills", "Projects", "Experience", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("About");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section
      const offsets = links.map((l) => {
        const el = document.getElementById(l.toLowerCase());
        if (!el) return { id: l, top: Infinity };
        return { id: l, top: el.getBoundingClientRect().top };
      });

      // Find the last section whose top is above the middle of the viewport
      const inView = offsets.filter((o) => o.top <= 120);
      if (inView.length > 0) {
        setActive(inView[inView.length - 1].id);
      }
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
      background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid #f0f0f0" : "none",
      transition: "all 0.3s",
    }}>
      <div style={{ padding: "0 6%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <span
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ cursor: "pointer", fontSize: 22, fontWeight: 900, letterSpacing: "-1px", color: "#111" }}
        >
          TV<span style={{ color: "#2563eb" }}>.</span>
        </span>

        {/* Desktop links */}
        <ul style={{ display: "flex", gap: 36, listStyle: "none" }} className="nav-desktop">
          {links.map((l) => (
            <li key={l} style={{ position: "relative" }}>
              <button
                onClick={() => handleNav(l)}
                style={{
                  background: "none", border: "none",
                  color: active === l ? "#111" : "#888",
                  cursor: "pointer", fontSize: 14,
                  fontWeight: active === l ? 700 : 500,
                  letterSpacing: "0.3px",
                  transition: "color 0.2s",
                  padding: "4px 0",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
                onMouseLeave={(e) => (e.currentTarget.style.color = active === l ? "#111" : "#888")}
              >
                {l}
              </button>
              {/* Active underline dot */}
              {active === l && (
                <span style={{
                  position: "absolute", bottom: -2, left: "50%",
                  transform: "translateX(-50%)",
                  width: 4, height: 4, borderRadius: "50%",
                  background: "#2563eb",
                }} />
              )}
            </li>
          ))}
        </ul>

        <a
          href="mailto:vaghelatirth719@gmail.com"
          className="nav-desktop"
          style={{ background: "#111", color: "#fff", padding: "10px 24px", borderRadius: 4, fontSize: 13, fontWeight: 600, textDecoration: "none", letterSpacing: "0.5px", transition: "background 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#2563eb")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
        >
          Hire Me
        </a>

        <button onClick={() => setOpen(!open)} className="nav-mobile" style={{ background: "none", border: "none", cursor: "pointer", color: "#111" }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div style={{ background: "#fff", borderTop: "1px solid #f0f0f0", padding: "16px 6%" }}>
          {links.map((l) => (
            <button key={l} onClick={() => handleNav(l)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", color: active === l ? "#2563eb" : "#333", fontWeight: active === l ? 700 : 400, cursor: "pointer", fontSize: 16, padding: "12px 0", borderBottom: "1px solid #f5f5f5" }}>
              {l}
            </button>
          ))}
        </div>
      )}

      <style>{`
        .nav-desktop { display: flex; }
        .nav-mobile { display: none; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
