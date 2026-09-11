"use client";
import { useState } from "react";
import Image from "next/image";
import { MapPin, Github, Linkedin, ArrowUpRight, CheckCircle, Copy } from "lucide-react";
import SectionPanel from "./SectionPanel";

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
    width: "100%", background: "var(--bg-card)", border: "var(--bw) solid var(--border)",
    padding: "14px 16px", color: "var(--text)", fontSize: 14,
    outline: "none", transition: "border-color var(--dur-short) var(--ease-out)", fontFamily: "inherit",
  };

  return (
    <section id="contact" style={{ background: "var(--bg-section)", padding: "var(--space-2xl) 5%" }}>
      <SectionPanel>
        <h2 className="contact-heading">GOT SOMETHING TO BUILD?</h2>
        <p className="contact-lede">
          Got a project idea, an internship offer, or just want to say hi? I respond fast — let&apos;s build something together.
        </p>

        <div className="contact-panel">
          <div className="contact-panel-info">
            <div className="contact-primary">
              <p className="contact-row-label">EMAIL</p>
              <div className="contact-email-row">
                <a href={`mailto:${EMAIL}`} className="contact-email-big">{EMAIL}</a>
                <button onClick={copyEmail} title="Copy email" className="contact-copy-btn" data-copied={copied}>
                  {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="contact-secondary-row">
              <MapPin size={16} aria-hidden />
              <span>Ahmedabad, Gujarat, India</span>
            </div>

            <div className="contact-social-icons">
              {[
                { icon: <Github size={18} />, href: "https://github.com/Tirthvaghela", label: "GitHub" },
                { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/tirthvaghela/", label: "LinkedIn" },
              ].map(({ icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="contact-social">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-panel-form">
            <div className="contact-form-row">
              <div>
                <label className="field-label">NAME</label>
                <input type="text" placeholder="John Doe" value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }} style={{ ...inputStyle, borderColor: errors.name ? "var(--danger)" : "var(--border)" }} onFocus={(e) => (e.target.style.borderColor = errors.name ? "var(--danger)" : "var(--text)")} onBlur={(e) => (e.target.style.borderColor = errors.name ? "var(--danger)" : "var(--border)")} />
                {errors.name && <p className="field-error">{errors.name}</p>}
              </div>
              <div>
                <label className="field-label">EMAIL</label>
                <input type="email" placeholder="john@example.com" value={form.email} onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }} style={{ ...inputStyle, borderColor: errors.email ? "var(--danger)" : "var(--border)" }} onFocus={(e) => (e.target.style.borderColor = errors.email ? "var(--danger)" : "var(--text)")} onBlur={(e) => (e.target.style.borderColor = errors.email ? "var(--danger)" : "var(--border)")} />
                {errors.email && <p className="field-error">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label className="field-label">MESSAGE</label>
              <textarea rows={6} placeholder="Tell me about your project... (min 20 characters)" value={form.message} onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }} style={{ ...inputStyle, resize: "vertical", borderColor: errors.message ? "var(--danger)" : "var(--border)" }} onFocus={(e) => (e.target.style.borderColor = errors.message ? "var(--danger)" : "var(--text)")} onBlur={(e) => (e.target.style.borderColor = errors.message ? "var(--danger)" : "var(--border)")} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                {errors.message ? <p className="field-error">{errors.message}</p> : <span />}
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: form.message.length >= 20 ? "var(--accent)" : "var(--text-faint)" }}>{form.message.length}/20</span>
              </div>
            </div>
            <button type="submit" disabled={status === "sending"} className="send-btn" data-status={status}>
              {status === "sending" && "SENDING..."}
              {status === "sent" && <><CheckCircle size={16} /> SENT!</>}
              {status === "error" && "FAILED — TRY AGAIN"}
              {status === "idle" && <> SEND MESSAGE <ArrowUpRight size={16} /></>}
            </button>
          </form>
        </div>
      </SectionPanel>

      <style>{`
        .contact-heading {
          font-family: var(--font-display); font-weight: 800; text-transform: uppercase;
          font-size: clamp(2.2rem, 5vw, 4rem); letter-spacing: -0.01em; line-height: 0.98;
          color: var(--text); margin-bottom: var(--space-lg); max-width: 16ch;
        }
        .contact-lede { font-size: 15px; color: var(--text-muted); line-height: 1.75; margin-bottom: var(--space-xl); max-width: 62ch; }

        .contact-panel {
          display: grid; grid-template-columns: 1fr 1.3fr;
          border: var(--bw) solid var(--text); background: var(--bg-card);
        }
        .contact-panel-info {
          padding: var(--space-2xl); border-right: var(--bw) solid var(--text);
          display: flex; flex-direction: column; gap: var(--space-xl);
        }
        .contact-panel-form { padding: var(--space-2xl); display: flex; flex-direction: column; gap: 16px; }

        .contact-row-label { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); letter-spacing: 0.08em; margin-bottom: 10px; }
        .contact-email-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .contact-email-big {
          font-family: var(--font-display); font-weight: 800; letter-spacing: -0.01em;
          font-size: clamp(19px, 2.1vw, 26px); line-height: 1.15; color: var(--text); text-decoration: none;
          border-bottom: 3px solid var(--accent); word-break: break-all;
          transition: color var(--dur-short) var(--ease-out);
        }
        .contact-email-big:hover { color: var(--accent); }
        .contact-copy-btn {
          background: none; border: 1.5px solid var(--text); cursor: pointer; color: var(--text);
          padding: 6px; display: flex; align-items: center; flex-shrink: 0;
          transition: color var(--dur-short) var(--ease-out), border-color var(--dur-short) var(--ease-out), background-color var(--dur-short) var(--ease-out);
        }
        .contact-copy-btn:hover { border-color: var(--accent); color: var(--accent); }
        .contact-copy-btn[data-copied="true"] { border-color: var(--positive); color: var(--positive); }

        .contact-secondary-row {
          display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-muted);
          padding-top: var(--space-lg); border-top: 1.5px solid var(--border);
        }
        .contact-illustration { flex: 1; min-height: 120px; display: flex; align-items: center; justify-content: center; }
        .contact-illustration img { width: 100%; max-width: 220px; height: auto; }
        .contact-social-icons { display: flex; gap: 12px; padding-top: var(--space-lg); border-top: 1.5px solid var(--border); }
        .contact-social {
          width: 46px; height: 46px; border: var(--bw) solid var(--text); display: flex; align-items: center; justify-content: center;
          color: var(--text); text-decoration: none; background: var(--bg-card);
          transition: background-color var(--dur-short) var(--ease-out), color var(--dur-short) var(--ease-out), border-color var(--dur-short) var(--ease-out), transform var(--dur-short) var(--ease-out);
        }
        @media (hover: hover) and (pointer: fine) {
          .contact-social:hover { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); transform: translate(-3px, -3px); }
        }
        .contact-social:active { transform: translate(0, 0); }

        .contact-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .field-label { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); letter-spacing: 0.05em; display: block; margin-bottom: 8px; }
        .field-error { font-size: 11px; color: var(--danger); margin-top: 4px; }
        .send-btn {
          border: var(--bw) solid var(--text) !important; padding: 16px 32px; font-family: var(--font-display); font-size: 14px; font-weight: 700;
          cursor: pointer; letter-spacing: 0.04em; display: flex; align-items: center; gap: 8px;
          transition: transform var(--dur-short) var(--ease-out), background-color var(--dur-short) var(--ease-out), color var(--dur-short) var(--ease-out);
          align-self: flex-start; background: var(--accent) !important; color: var(--accent-ink) !important;
        }
        .send-btn:hover:not(:disabled) { transform: translate(-3px, -3px); box-shadow: var(--shadow-hard); }
        .send-btn:active:not(:disabled) { transform: translate(0, 0); box-shadow: none; }
        .send-btn[data-status="sent"] { background: var(--positive) !important; color: var(--accent-ink) !important; }
        .send-btn[data-status="error"] { background: var(--danger) !important; color: var(--accent-ink) !important; }
        .send-btn:disabled { cursor: not-allowed; opacity: 0.7; }
        @media (max-width: 768px) {
          .contact-panel { grid-template-columns: 1fr; }
          .contact-panel-info { border-right: none; border-bottom: var(--bw) solid var(--text); }
          .contact-form-row { grid-template-columns: 1fr; }
          .contact-email-big { font-size: 17px; }
        }
      `}</style>
    </section>
  );
}
