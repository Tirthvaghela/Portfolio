"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useSite } from "./SiteProvider";
import { PRODIGY as P, pad } from "@/content/site";
import s from "./Prodigy.module.css";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * 02 · Prodigy InfoTech as one complete chapter:
 *  opening  — red band: company, role, mode, dates and a build counter
 *  bridge   — a line that carries the band down into the builds
 *  builds   — four cards, each with its own colour and a motif drawn from its README; on desktop a
 *             sticky counter rolls 01 → 04 as each build passes the middle of the screen
 *  closing  — the manager's words, with the certificate and letter of recommendation
 * All content is visible without JS; motion only sets start states when it's on.
 */
export default function Prodigy() {
  const { motion } = useSite();
  const root = useRef<HTMLElement>(null);
  const counter = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = root.current;
    if (!motion || !el || document.documentElement.dataset.motion === "off") return;
    const q = gsap.utils.selector(el);
    const one = (sel: string) => q(sel)[0] as HTMLElement | undefined;

    // Opening: the band unfolds downward, the name rises out of its masks, the facts follow.
    const head = one("[data-pi-head]");
    if (head) gsap.timeline({ scrollTrigger: { trigger: head, start: "top 82%" } })
      .from(head, { clipPath: "inset(0% 0% 100% 0% round 32px)", duration: 1.2, ease: "expo.inOut" })
      .from(q("[data-pi-line]"), { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: .1 }, "-=.45")
      .from(q("[data-pi-meta]"), { y: 20, opacity: 0, duration: .8, ease: "expo.out", stagger: .07 }, "-=.8");

    // Bridge: the line draws down from the band into the builds.
    const bridge = one("[data-pi-bridge]");
    if (bridge) gsap.from(bridge, { "--b": 0, duration: 1, ease: "power3.inOut", scrollTrigger: { trigger: bridge, start: "top 85%" } });

    // Builds: each card's colour block wipes open, its motif words rise, then the details follow.
    q("[data-build]").forEach((card, i) => {
      gsap.timeline({ scrollTrigger: { trigger: card, start: "top 82%" } })
        .from(card.querySelector("[data-motif-block]"), { clipPath: "inset(0% 100% 0% 0%)", duration: 1, ease: "expo.inOut" })
        .from(card.querySelectorAll("[data-motif]"), { yPercent: 110, duration: .9, ease: "expo.out", stagger: .08 }, "-=.45")
        .from(card.querySelectorAll("[data-build-part]"), { y: 26, opacity: 0, duration: .8, ease: "expo.out", stagger: .07 }, "-=.75");
      // Desktop counter: roll to this build while it's the one in the middle of the screen.
      ScrollTrigger.create({
        trigger: card, start: "top 55%", end: "bottom 55%",
        onToggle: (st) => { const c = counter.current; if (st.isActive && c) { c.style.setProperty("--i", String(i)); c.dataset.i = String(i); } },
      });
    });

    // Closing: the quote and the proof rise in together.
    const close = one("[data-pi-close]");
    if (close) gsap.from(close.querySelectorAll("[data-close-part]"), { y: 40, opacity: 0, duration: 1, ease: "expo.out", stagger: .1, scrollTrigger: { trigger: close, start: "top 80%" } });
  }, { scope: root, dependencies: [motion], revertOnUpdate: true });

  return (
    <section ref={root} className={s.pi} aria-labelledby="pi-h">
      <div className={`${s.top} mono`}>
        <span>02 · Work experience · Earlier internship</span>
        <span>{P.dates}</span>
      </div>

      {/* Opening */}
      <div data-pi-head="" className={s.head}>
        <h3 id="pi-h" className={s.company}>
          <span className="mask"><span data-pi-line="">Prodigy</span></span>
          <span className="mask"><span data-pi-line="">InfoTech</span></span>
        </h3>
        <div className={s.headSide}>
          <p data-pi-meta="" className={`${s.lead} serif`}>Four full-stack builds, from an authentication system to a social platform.</p>
          <dl className={s.meta}>
            <div data-pi-meta=""><dt className="mono11">Role</dt><dd>{P.role}</dd></div>
            <div data-pi-meta=""><dt className="mono11">Mode</dt><dd>{P.where}</dd></div>
            <div data-pi-meta=""><dt className="mono11">Dates</dt><dd>{P.dates}</dd></div>
            <div data-pi-meta=""><dt className="mono11">Builds</dt><dd className={s.metaNum}><span data-count={String(P.projects.length)}>{P.projects.length}</span></dd></div>
          </dl>
        </div>
      </div>

      {/* Bridge into the builds */}
      <div data-pi-bridge="" className={s.bridge} aria-hidden="true">
        <span className={`${s.bridgeLabel} mono11`}>The builds</span>
      </div>

      {/* Builds */}
      <div className={s.builds}>
        <aside ref={counter} data-i="0" className={s.counter} aria-hidden="true">
          <span className="mono">Build</span>
          <div className={s.counterNum}>
            <span className={s.counterStack}>{P.projects.map((_, i) => <span key={i}>{pad(i + 1)}</span>)}</span>
          </div>
          <span className={`${s.counterOf} mono11`}>of {pad(P.projects.length)}</span>
          <ol className={`${s.counterKinds} mono11`}>
            {P.projects.map((p) => <li key={p.title}>{p.kind}</li>)}
          </ol>
        </aside>
        <ol className={s.list}>
          {P.projects.map((p, i) => (
            <li key={p.title} data-build="" data-tone={p.tone} className={s.card}>
              <div data-motif-block="" className={s.motif} aria-hidden="true">
                <span className={`${s.motifNum} serif`}>{pad(i + 1)}</span>
                <span className={s.motifWords}>
                  {p.motif.map((m) => <span key={m} className="mask"><span data-motif="">{m}</span></span>)}
                </span>
              </div>
              <div className={s.body}>
                <span data-build-part="" className={`${s.kind} mono11`}>Build {pad(i + 1)} · {p.kind}</span>
                <h4 data-build-part="" className={s.name}>{p.title}</h4>
                <p data-build-part="" className={s.desc}>{p.desc}</p>
                <ul data-build-part="" className={s.feats} aria-label={`${p.title} features`}>{p.points.map((f) => <li key={f}>{f}</li>)}</ul>
                <div data-build-part="" className={s.foot}>
                  <span className={`${s.tech} mono11`}>{p.tech.join(" · ")}</span>
                  <a href={p.repo} {...ext} className={`${s.repo} mono`} aria-label={`${p.title} repository on GitHub (opens in a new tab)`}>GitHub ↗</a>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Closing */}
      <figure data-pi-close="" className={s.close}>
        <span data-close-part="" className={`${s.closeLabel} mono`}>How it ended</span>
        <blockquote data-close-part="" className="serif">“{P.quote}”</blockquote>
        <figcaption data-close-part="" className="mono11">— {P.quoteBy}</figcaption>
        <div data-close-part="" className={s.proof}>
          <a href={P.certificate} {...ext} data-magnetic="" className={`${s.ink} mono`} aria-label="Prodigy InfoTech internship certificate (PDF, opens in a new tab)">Certificate ↗</a>
          <a href={P.lor} {...ext} data-magnetic="" className={`${s.line} mono`} aria-label="Prodigy InfoTech letter of recommendation (PDF, opens in a new tab)">Letter of recommendation ↗</a>
        </div>
      </figure>
    </section>
  );
}
