"use client";
import { useState } from "react";
import { Mail, MapPin, Github, Linkedin, ArrowUpRight, CheckCircle } from "lucide-react";
import FadeIn from "./FadeIn";

// Replace YOUR_FORM_ID with your Formspree form ID from formspree.io
const FORMSPREE_ID = "xqeygzoo";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "#fff", border: "1.5px solid #e0e0e0",
    borderRadius: 2, padding: "14px 16px", color: "#111", fontSize: 14,
    outline: "none", transition: "border-color 0.2s", fontFamily: "inherit",
  };

  return (
    <section id="contact" style={{ background: "#f8f8f6", padding: "100px 6%" }}>
      <FadeIn>
        <div style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 13, color: "#2563eb", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>
            Get in touch
          </p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1, color: "#111" }}>
            Let&apos;s Work<br />
            <span style={{ WebkitTextStroke: "2px #111", color: "transparent" }}>Together</span>
          </h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="contact-grid">
        <div>
          <p style={{ fontSize: 15, color: "#666", lineHeight: 1.8, marginBottom: 40 }}>
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 48 }}>
            {[
              { icon: <Mail size={18} />, label: "Email", value: "vaghelatirth719@gmail.com", href: "mailto:vaghelatirth719@gmail.com" },
              { icon: <MapPin size={18} />, label: "Location", value: "Ahmedabad, Gujarat, India", href: null },
            ].map(({ icon, label, value, href }) => (
              <div key={label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, border: "1.5px solid #e8e8e8", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", flexShrink: 0, borderRadius: 2 }}>
                  {icon}
                </div>
                <div>
                  <p style={{ fontSize: 11, color: "#aaa", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 2 }}>{label}</p>
                  {href ? <a href={href} style={{ fontSize: 14, color: "#111", fontWeight: 600, textDecoration: "none" }}>{value}</a>
                    : <p style={{ fontSize: 14, color: "#111", fontWeight: 600 }}>{value}</p>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { icon: <Github size={18} />, href: "https://github.com/Tirthvaghela/thius", label: "GitHub" },
              { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/tirthvaghela/", label: "LinkedIn" },
            ].map(({ icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{ width: 44, height: 44, border: "1.5px solid #e8e8e8", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", textDecoration: "none", borderRadius: 2, transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#2563eb"; e.currentTarget.style.color = "#2563eb"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e8e8e8"; e.currentTarget.style.color = "#555"; }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="contact-form-row">
            <div>
              <label style={{ fontSize: 11, color: "#aaa", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Name</label>
              <input type="text" required placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#111")} onBlur={(e) => (e.target.style.borderColor = "#e8e8e8")} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#aaa", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email</label>
              <input type="email" required placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#111")} onBlur={(e) => (e.target.style.borderColor = "#e8e8e8")} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 11, color: "#aaa", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Message</label>
            <textarea required rows={6} placeholder="Tell me about your project..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} onFocus={(e) => (e.target.style.borderColor = "#111")} onBlur={(e) => (e.target.style.borderColor = "#e8e8e8")} />
          </div>
          <button type="submit" disabled={status === "sending"}
            style={{ background: status === "sent" ? "#16a34a" : status === "error" ? "#dc2626" : "#111", color: "#fff", border: "none", padding: "16px 32px", fontSize: 14, fontWeight: 700, cursor: status === "sending" ? "not-allowed" : "pointer", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: 8, borderRadius: 2, transition: "background 0.2s", alignSelf: "flex-start", opacity: status === "sending" ? 0.7 : 1 }}
            onMouseEnter={(e) => { if (status === "idle") e.currentTarget.style.background = "#2563eb"; }}
            onMouseLeave={(e) => { if (status === "idle") e.currentTarget.style.background = "#111"; }}
          >
            {status === "sending" && "Sending..."}
            {status === "sent" && <><CheckCircle size={16} /> Sent!</>}
            {status === "error" && "Failed — try again"}
            {status === "idle" && <> Send Message <ArrowUpRight size={16} /></>}
          </button>
        </form>
      </div>
      </FadeIn>

      <style>{`
        .contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px; align-items: start; }
        .contact-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
          .contact-form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
