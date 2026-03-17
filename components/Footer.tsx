"use client";
export default function Footer() {
  return (
    <footer style={{ background: "#111", color: "#fff", padding: "48px 6%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-1px", marginBottom: 4 }}>
            TV<span style={{ color: "#2563eb" }}>.</span>
          </div>
          <p style={{ fontSize: 13, color: "#666" }}>Full-Stack Developer · Ahmedabad, India</p>
        </div>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {["About", "Skills", "Projects", "Experience", "Contact"].map((l) => (
            <button key={l}
              onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: 13, transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
            >
              {l}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "#444" }}>
          © {new Date().getFullYear()} Tirth Vaghela. Built with Next.js &amp; Vercel.
        </p>
      </div>
    </footer>
  );
}
