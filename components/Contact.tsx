"use client";
import { useState } from "react";
import { Mail, MapPin, Github, Linkedin, ArrowUpRight, CheckCircle, Copy } from "lucide-react";
import FadeIn from "./FadeIn";

const FORMSPREE_ID = "xqeygzoo";
const EMAIL = "vaghelatirth719@gmail.com";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validate = () => {
    const e = { name: "", email: "", message: "" };
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Name must be at least 2 characters.";
    else if (!/^[a-zA-Z\s]+$/.test(form.name.trim())) e.name = "Name can only contain letters.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Enter a valid email address.";
    if (!form.message.trim() || form.message.trim().length < 20) e.message = "Message must be at least 20 characters.";
    setErrors(e);
    return !e.name && !e.email && !e.message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (res.ok) { setStatus("sent"); setForm({ name: "", email: "", message: "" }); setTimeout(() => setStatus("idle"), 4000); }
      else { setStatus("error"); setTimeout(() => setStatus("idle"), 3000); }
    } catch { setStatus("error"); setTimeout(() => setStatus("idle"), 3000); }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "var(--bg-card)", border: "1.5px solid var(--border)",
    borderRadius: 2, padding: "14px 16px", color: "var(--text)", fontSize: 14,
    outline: "none", transition: "border-color 0.2s", fontFamily: "inherit",
  };

  return (
    <section id="contact" style={{ background: "var(--bg-section)", padding: "100px 6%" }}>
      <FadeIn>
        <div style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 13, color: "var(--accent)", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>
            Get in touch
          </p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1, color: "var(--text)" }}>
            Let&apos;s Work<br />
            <span style={{ WebkitTextStroke: "2px var(--stroke)", color: "transparent" }}>Together</span>
          </h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="contact-grid">
          <div>
            <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 32 }}>
              Have a project in mind or want to collaborate? I&apos;d love to hear from you.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 48 }}>
              {[
                { icon: <Mail size={18} />, label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, copyable: true },
                { icon: <MapPin size={18} />, label: "Location", value: "Ahmedabad, Gujarat, India", href: null, copyable: false },
              ].map(({ icon, label, value, href, copyable }) => (
                <div key={label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, border: "1.5px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", flexShrink: 0, borderRadius: 2, background: "var(--bg-card)" }}>
                    {icon}
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: "var(--text-faint)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 2 }}>{label}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {href
                        ? <a href={href} style={{ fontSize: 14, color: "var(--text)", fontWeight: 600, textDecoration: "none" }}>{value}</a>
                        : <p style={{ fontSize: 14, color: "var(--text)", fontWeight: 600 }}>{value}</p>}
                      {copyable && (
                        <button onClick={copyEmail} title="Copy email"
                          style={{ background: "none", border: "none", cursor: "pointer", color: copied ? "#16a34a" : "var(--text-faint)", padding: 2, display: "flex", alignItems: "center", transition: "color 0.2s" }}
                          onMouseEnter={(e) => { if (!copied) e.currentTarget.style.color = "var(--accent)"; }}
                          onMouseLeave={(e) => { if (!copied) e.currentTarget.style.color = "var(--text-faint)"; }}
                        >
                          {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { icon: <Github size={18} />, href: "https://github.com/Tirthvaghela", label: "GitHub" },
                { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/tirthvaghela/", label: "LinkedIn" },
              ].map(({ icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{ width: 44, height: 44, border: "1.5px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", textDecoration: "none", borderRadius: 2, transition: "all 0.2s", background: "var(--bg-card)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="contact-form-row">
              <div>
                <label style={{ fontSize: 11, color: "var(--text-faint)", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Name</label>
                <input type="text" placeholder="John Doe" value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }} style={{ ...inputStyle, borderColor: errors.name ? "#ef4444" : "var(--border)" }} onFocus={(e) => (e.target.style.borderColor = errors.name ? "#ef4444" : "var(--text)")} onBlur={(e) => (e.target.style.borderColor = errors.name ? "#ef4444" : "var(--border)")} />
                {errors.name && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.name}</p>}
              </div>
              <div>
                <label style={{ fontSize: 11, color: "var(--text-faint)", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email</label>
                <input type="email" placeholder="john@example.com" value={form.email} onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }} style={{ ...inputStyle, borderColor: errors.email ? "#ef4444" : "var(--border)" }} onFocus={(e) => (e.target.style.borderColor = errors.email ? "#ef4444" : "var(--text)")} onBlur={(e) => (e.target.style.borderColor = errors.email ? "#ef4444" : "var(--border)")} />
                {errors.email && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.email}</p>}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 11, color: "var(--text-faint)", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Message</label>
              <textarea rows={6} placeholder="Tell me about your project... (min 20 characters)" value={form.message} onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }} style={{ ...inputStyle, resize: "vertical", borderColor: errors.message ? "#ef4444" : "var(--border)" }} onFocus={(e) => (e.target.style.borderColor = errors.message ? "#ef4444" : "var(--text)")} onBlur={(e) => (e.target.style.borderColor = errors.message ? "#ef4444" : "var(--border)")} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                {errors.message ? <p style={{ fontSize: 11, color: "#ef4444" }}>{errors.message}</p> : <span />}
                <span style={{ fontSize: 11, color: form.message.length >= 20 ? "var(--accent)" : "var(--text-faint)" }}>{form.message.length}/20</span>
              </div>
            </div>
            <button type="submit" disabled={status === "sending"}
              className="send-btn"
              style={{ background: status === "sent" ? "#16a34a" : status === "error" ? "#dc2626" : "var(--text)", color: "var(--bg)", border: "none", padding: "16px 32px", fontSize: 14, fontWeight: 700, cursor: status === "sending" ? "not-allowed" : "pointer", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: 8, borderRadius: 2, transition: "background 0.2s, color 0.2s", alignSelf: "flex-start", opacity: status === "sending" ? 0.7 : 1 }}
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
        .send-btn { background: var(--text) !important; color: var(--bg) !important; }
        .send-btn:hover:not(:disabled) { background: var(--accent) !important; color: #fff !important; }
        .contact-form { padding-top: 0; }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
          .contact-form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
