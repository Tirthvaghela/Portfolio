/* Notification email for the contact form, in the site's v8 identity: ink header with the
   loader's colour stripe, paper body, mono labels, red accents, mustard on ink for the reply
   button. Email-safe: tables + inline styles only, system font fallbacks (mail apps don't load
   web fonts), 600px wide, scales down on phones. */

const INK = "#14120f", PAPER = "#efe9dc", CARD = "#f7f3ea", RED = "#e8452f", TEAL = "#1f7f73", MUST = "#f4bf3f", MUTED = "#6b665c", LINE = "#d9d1c1";
const DISPLAY = "'Arial Black','Helvetica Neue',Helvetica,Arial,sans-serif";
const SANS = "'Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "Georgia,'Times New Roman',serif";
const MONO = "'SFMono-Regular',Menlo,Consolas,'Courier New',monospace";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

type Msg = { name: string; email: string; message: string; site: string; when?: Date };

const stamp = (d: Date) =>
  new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }).format(d) + " IST";

export function contactEmail({ name, email, message, site, when = new Date() }: Msg) {
  const host = site.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const first = name.split(/\s+/)[0];
  const subject = `Portfolio enquiry from ${name}`;
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Re: your message on " + host)}`;
  const preview = message.replace(/\s+/g, " ").slice(0, 120);
  const label = (t: string, color = MUTED) => `<span style="font-family:${MONO};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${color}">${t}</span>`;
  const row = (k: string, v: string) => `
              <tr>
                <td style="padding:14px 0;border-top:1px solid ${LINE};width:96px;vertical-align:top">${label(k)}</td>
                <td style="padding:12px 0;border-top:1px solid ${LINE};font-family:${SANS};font-size:17px;font-weight:700;color:${INK};word-break:break-word">${v}</td>
              </tr>`;
  const stripe = [RED, INK, TEAL, INK, MUST].map((c) => `<td style="height:6px;background:${c};font-size:0;line-height:0">&nbsp;</td>`).join("");

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light">
<title>${esc(subject)}</title>
<style>
  @media (max-width:620px){ .wrap{width:100%!important} .pad{padding-left:22px!important;padding-right:22px!important} .h1{font-size:34px!important} .btn a{display:block!important;text-align:center!important} }
  a{color:${INK}}
</style></head>
<body style="margin:0;padding:0;background:${PAPER};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${PAPER}">${esc(preview)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PAPER}">
  <tr><td align="center" style="padding:32px 12px">
    <table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;border-radius:24px;overflow:hidden;background:${CARD};border:1px solid ${LINE}">

      <!-- header -->
      <tr><td class="pad" style="background:${INK};padding:22px 36px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="font-family:${DISPLAY};font-size:22px;font-weight:900;letter-spacing:-.5px;color:${PAPER}">TV<span style="color:${RED}">.</span></td>
          <td align="right">
            <span style="display:inline-block;width:8px;height:8px;border-radius:4px;background:${MUST};vertical-align:middle"></span>
            <span style="font-family:${MONO};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${PAPER};vertical-align:middle">&nbsp;New enquiry</span>
          </td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:0;font-size:0;line-height:0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${stripe}</tr></table></td></tr>

      <!-- headline -->
      <tr><td class="pad" style="padding:36px 36px 8px">
        ${label(`From your portfolio &middot; ${esc(stamp(when))}`)}
        <h1 class="h1" style="margin:14px 0 0;font-family:${DISPLAY};font-size:44px;line-height:1;font-weight:900;letter-spacing:-1.5px;text-transform:uppercase;color:${INK}">
          ${esc(first)} wants<br>to <span style="font-family:${SERIF};font-style:italic;font-weight:400;text-transform:none;letter-spacing:-1px;color:${RED}">talk.</span>
        </h1>
      </td></tr>

      <!-- sender -->
      <tr><td class="pad" style="padding:22px 36px 0">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom:1px solid ${LINE}">
          ${row("Name", esc(name))}
          ${row("Email", `<a href="mailto:${esc(email)}" style="color:${INK};text-decoration:none;border-bottom:2px solid ${MUST}">${esc(email)}</a>`)}
        </table>
      </td></tr>

      <!-- message -->
      <tr><td class="pad" style="padding:28px 36px 0">
        ${label("Message")}
        <div style="margin-top:12px;padding:20px 22px;background:#ffffff;border-radius:16px;border-left:4px solid ${RED};font-family:${SANS};font-size:16px;line-height:1.6;color:${INK};white-space:pre-wrap;word-break:break-word">${esc(message)}</div>
      </td></tr>

      <!-- reply -->
      <tr><td class="pad btn" style="padding:28px 36px 36px">
        <a href="${replyHref}" style="display:inline-block;background:${INK};color:${MUST};font-family:${MONO};font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;padding:16px 28px;border-radius:99px">Reply to ${esc(first)} &rarr;</a>
        <p style="margin:14px 0 0;font-family:${SANS};font-size:13px;line-height:1.5;color:${MUTED}">Or just hit Reply &mdash; it goes straight to ${esc(email)}.</p>
      </td></tr>

      <!-- footer -->
      <tr><td class="pad" style="background:${INK};padding:20px 36px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="font-family:${SERIF};font-style:italic;font-size:15px;color:${PAPER}">Sent from the contact form</td>
          <td align="right"><a href="${esc(site)}" style="font-family:${MONO};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${PAPER};text-decoration:none">${esc(host)} &nearr;</a></td>
        </tr></table>
      </td></tr>

    </table>
  </td></tr>
</table>
</body></html>`;

  const text = `NEW ENQUIRY - ${host}
${stamp(when)}

Name:  ${name}
Email: ${email}

${message}

Reply to this email to answer ${first} directly.`;

  return { subject, html, text };
}
