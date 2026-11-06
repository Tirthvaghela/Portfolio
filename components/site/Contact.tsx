"use client";
import { useState } from "react";
import { CHANNELS, SITE } from "@/content/site";
import { useSite } from "./SiteProvider";
import s from "./Contact.module.css";

type Errors = { name?: string; email?: string; message?: string };
const VF0 = { fontVariationSettings: "'wght' 800, 'wdth' 75" };

export default function Contact() {
  const { time } = useSite();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const e: Errors = {};
    if (name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Enter a valid email address.";
    if (message.trim().length < 20) e.message = "Message needs at least 20 characters.";
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Portfolio enquiry from " + name.trim())}&body=${encodeURIComponent(message.trim() + "\n\n— " + name.trim() + " (" + email.trim() + ")")}`;
    setSent(true); setErrors({});
  };

  const copy = () => {
    try { navigator.clipboard.writeText(SITE.email); } catch {}
    setCopied(true); setTimeout(() => setCopied(false), 1800);
  };

  const bd = (k: keyof Errors) => (errors[k] ? s.bad : "");

  return (
    <section id="contact" aria-labelledby="contact-h" data-sheet="" className={`sheet ${s.contact}`}>
      <div data-reveal="" className="secHead mono"><span>(07) Contact</span><span suppressHydrationWarning>{time} in Ahmedabad</span></div>
      <h2 id="contact-h" data-cwords="" className={s.h2}>
        <span data-cw="" className={s.cw} style={VF0}>Got</span> <span data-cw="" className={s.cw} style={VF0}>something</span><br />
        <span data-cw="" className={s.cw} style={VF0}>to</span> <span className={s.build}>build?</span>
      </h2>
      <div className={s.grid}>
        <div data-reveal="" className={s.left}>
          <p className={s.lede}>Got a project idea, an internship offer, or just want to say hi? I respond fast let&apos;s build something together.</p>
          <ul className={s.channels}>
            {CHANNELS.map((c) => (
              <li key={c.label}>
                <a href={c.href} target={c.target} rel="noopener noreferrer" className={s.ch}>
                  <span className="mono">{c.label}</span><span className={s.chValue}>{c.value}</span><span className={s.chArrow}>↗</span>
                </a>
              </li>
            ))}
          </ul>
          <button type="button" onClick={copy} className={`btn ${s.copy} mono`} aria-live="polite">{copied ? "Copied ✓" : "Copy address"}</button>
        </div>
        <div data-reveal="" className={s.card}>
          {!sent ? (
            <form onSubmit={submit} noValidate className={s.form}>
              <label className={s.field}>
                <span className="mono">Name</span>
                <input type="text" name="name" autoComplete="name" value={name} aria-invalid={!!errors.name}
                  onChange={(e) => { setName(e.target.value); setErrors({ ...errors, name: undefined }); }} className={`${s.input} ${bd("name")}`} />
                {errors.name && <span role="alert" className={s.err}>✕ {errors.name}</span>}
              </label>
              <label className={s.field}>
                <span className="mono">Email</span>
                <input type="email" name="email" autoComplete="email" value={email} aria-invalid={!!errors.email}
                  onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: undefined }); }} className={`${s.input} ${bd("email")}`} />
                {errors.email && <span role="alert" className={s.err}>✕ {errors.email}</span>}
              </label>
              <label className={s.field}>
                <span className={`${s.msgHead} mono`}><span>Message</span><span>{message.trim().length}/20</span></span>
                <textarea name="message" rows={4} value={message} aria-invalid={!!errors.message}
                  onChange={(e) => { setMessage(e.target.value); setErrors({ ...errors, message: undefined }); }} className={`${s.textarea} ${bd("message")}`} />
                {errors.message && <span role="alert" className={s.err}>✕ {errors.message}</span>}
              </label>
              <div className={s.sendRow}>
                <button type="submit" data-magnetic="" className={`btn ${s.send}`}><span>Send</span><span className={`${s.sendSub} serif`}>message →</span></button>
                <p className={s.sendNote}>Opens a pre-filled draft in your email app.</p>
              </div>
            </form>
          ) : (
            <div role="status" className={s.sent}>
              <span className={`${s.sentTag} mono`}>Draft ready</span>
              <p className={s.sentBig}>Your email app should have opened with the message filled in. Hit send there to reach Tirth.</p>
              <p className={s.sentSmall}>Nothing opened? Write directly to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
              <button type="button" onClick={() => { setSent(false); setName(""); setEmail(""); setMessage(""); setErrors({}); }} className={`btn ${s.again} mono`}>Write another</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
