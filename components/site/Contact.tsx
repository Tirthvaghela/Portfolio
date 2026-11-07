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
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [sentTo, setSentTo] = useState("");
  const [copied, setCopied] = useState(false);
  const sent = status === "sent";

  const validate = () => {
    const e: Errors = {};
    if (name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Enter a valid email address.";
    if (message.trim().length < 20) e.message = "Message needs at least 20 characters.";
    return e;
  };

  // Sends through Formspree; the success state only appears once Formspree confirms delivery.
  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (status === "sending") return;
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    // Only sent when a bot filled it, so real messages never carry the spam flag.
    const trap = (ev.currentTarget as HTMLFormElement).querySelector<HTMLInputElement>("[name=_gotcha]")?.value ?? "";
    setErrors({}); setStatus("sending");
    try {
      const res = await fetch(SITE.formspree, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim(), ...(trap ? { _gotcha: trap } : {}), _subject: `Portfolio enquiry from ${name.trim()}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSentTo(email.trim()); setStatus("sent");
      setName(""); setEmail(""); setMessage("");
    } catch {
      setStatus("error"); // keep what they typed so they can retry
    }
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
              {/* Honeypot: invisible to people, bots fill it, Formspree drops those submissions. */}
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className={s.trap} />
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
                <button type="submit" data-magnetic="" disabled={status === "sending"} aria-busy={status === "sending"} className={`btn ${s.send}`}>
                  {status === "sending"
                    ? <span>Sending…</span>
                    : <><span>Send</span><span className={`${s.sendSub} serif`}>message →</span></>}
                </button>
                <p className={s.sendNote} aria-live="polite">
                  {status === "error"
                    ? <span className={s.sendErr}>✕ Couldn&apos;t send right now. Try again, or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> directly.</span>
                    : "Goes straight to Tirth's inbox."}
                </p>
              </div>
            </form>
          ) : (
            <div role="status" className={s.sent}>
              <span className={`${s.sentTag} mono`}>Message sent</span>
              <p className={s.sentBig}>Thanks — your message reached Tirth. You&apos;ll get a reply at {sentTo}.</p>
              <p className={s.sentSmall}>Need to add something? Write directly to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
              <button type="button" onClick={() => { setStatus("idle"); setErrors({}); }} className={`btn ${s.again} mono`}>Write another</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
