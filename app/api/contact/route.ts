import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { SITE } from "@/content/site";

/* Contact form → email via Resend (https://resend.com/docs/api-reference/emails/send-email).
   Env: RESEND_API_KEY (required). Optional: CONTACT_FROM once a domain is verified in Resend
   (e.g. "Portfolio <contact@tirthvaghela.in>"), CONTACT_TO to deliver somewhere other than SITE.email. */

const FROM = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO || SITE.email;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const redisUrl = process.env.STORAGE_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const redisToken = process.env.STORAGE_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Bad request" }, { status: 400 }); }

  const str = (k: string, max: number) => (typeof body[k] === "string" ? (body[k] as string).trim().slice(0, max) : "");
  const name = str("name", 100), email = str("email", 200), message = str("message", 5000), trap = str("website", 200);

  // Honeypot filled → a bot. Pretend it worked so it doesn't retry.
  if (trap) return NextResponse.json({ ok: true });
  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 20) {
    return NextResponse.json({ error: "Please check your name, email and message." }, { status: 422 });
  }

  // At most 5 messages per hour per IP (skipped if Redis isn't configured).
  if (redis) {
    const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
    try {
      const key = `portfolio:contact:${ip}`;
      const n = await redis.incr(key);
      if (n === 1) await redis.expire(key, 3600);
      if (n > 5) return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
    } catch { /* rate limit is best-effort */ }
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) { console.error("contact: RESEND_API_KEY is not set"); return NextResponse.json({ error: "Not configured" }, { status: 500 }); }

  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#14120f">
<p style="margin:0 0 12px"><b>${esc(name)}</b> &lt;<a href="mailto:${esc(email)}">${esc(email)}</a>&gt; sent a message from your portfolio:</p>
<div style="white-space:pre-wrap;padding:14px 16px;border-left:3px solid #e8452f;background:#f6f2ea">${esc(message)}</div>
<p style="margin:14px 0 0;color:#6b665c;font-size:13px">Hit Reply to answer ${esc(name)} directly.</p></div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM, to: [TO], reply_to: email,
      subject: `Portfolio enquiry from ${name}`,
      text: `${name} <${email}> sent a message from your portfolio:\n\n${message}\n\nReply to this email to answer them directly.`,
      html,
    }),
  }).catch(() => null);

  if (!res?.ok) {
    console.error("contact: Resend error", res?.status, await res?.text().catch(() => ""));
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
