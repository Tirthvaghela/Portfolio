"use client";
export default function Footer() {
  return (
    <footer style={{ background: "var(--footer-bg)", padding: "48px 6%" }}>
      <div className="footer-inner">
        <div className="footer-brand">
          <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-1px", marginBottom: 4, color: "#fff" }}>
            TV<span style={{ color: "var(--accent)" }}>.</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--footer-text, #888)" }}>Full-Stack Developer · Ahmedabad, India</p>
        </div>
        <div className="footer-links">
          {["About", "Skills", "Projects", "Experience", "Contact"].map((l) => (
            <button key={l}
              onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "none", border: "none", color: "var(--footer-text, #888)", cursor: "pointer", fontSize: 13, transition: "color 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--footer-text, #888)")}
            >
              {l}
            </button>
          ))}
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} Tirth Vaghela · &quot;Dream it. Code it. Deploy it.&quot;
        </p>
      </div>
      <style>{`
        .footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px; }
        .footer-links { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
        .footer-copy { font-size: 12px; color: #444; }
        @media (max-width: 768px) {
          .footer-inner { flex-direction: column; align-items: center; text-align: center; gap: 20px; }
          .footer-brand { text-align: center; }
          .footer-links { justify-content: center; width: 100%; }
          .footer-copy { text-align: center; }
        }
      `}</style>
    </footer>
  );
}
