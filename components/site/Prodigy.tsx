"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useSite } from "./SiteProvider";
import { PRODIGY as P, pad } from "@/content/site";
import s from "./Prodigy.module.css";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * 02 · Prodigy InfoTech: a red header band (role, dates, certificate, LOR, the manager's quote)
 * followed by the four internship builds as an editorial index — numbered rows whose rule draws
 * across as each one arrives. Repositories only: none of these has a live demo.
 */
export default function Prodigy() {
  const { motion } = useSite();
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = root.current;
    if (!motion || !el || document.documentElement.dataset.motion === "off") return;
    const q = gsap.utils.selector(el);
    const head = q("[data-pi-head]")[0];
    if (head) gsap.from(head, { clipPath: "inset(0% 0% 100% 0% round 32px)", y: 40, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: head, start: "top 85%" } });

    // Each row: its rule draws left → right, then the row's contents rise (per row, so phones never
    // animate off-screen).
    const rows = q("[data-pi-row]");
    rows.forEach((r) => {
      const parts = r.querySelectorAll("[data-pi-part]");
      gsap.set(r, { "--d": 0 });
      gsap.set(parts, { y: 28, opacity: 0 });
    });
    ScrollTrigger.batch(rows, {
      start: "top 88%", once: true,
      onEnter: (b) => (b as HTMLElement[]).forEach((r, k) => {
        gsap.timeline({ delay: k * .12 })
          .to(r, { "--d": 1, duration: .9, ease: "power3.inOut" })
          .to(r.querySelectorAll("[data-pi-part]"), { y: 0, opacity: 1, duration: .9, ease: "expo.out", stagger: .07 }, .25);
      }),
    });
  }, { scope: root, dependencies: [motion], revertOnUpdate: true });

  return (
    <section ref={root} className={s.pi} aria-labelledby="pi-h">
      <div className={`${s.top} mono`}>
        <span>02 · Work experience · Earlier internship</span>
        <span>{P.dates}</span>
      </div>

      <div data-pi-head="" className={s.head}>
        <div className={s.headMain}>
          <h3 id="pi-h" className={s.company}>{P.company}</h3>
          <p className={`${s.role} serif`}>{P.role} — {P.where}</p>
          <div className={s.proof}>
            <a href={P.certificate} {...ext} data-magnetic="" className={`${s.ink} mono`} aria-label="Prodigy InfoTech internship certificate (PDF, opens in a new tab)">Certificate ↗</a>
            <a href={P.lor} {...ext} data-magnetic="" className={`${s.line} mono`} aria-label="Prodigy InfoTech letter of recommendation (PDF, opens in a new tab)">Letter of recommendation ↗</a>
          </div>
        </div>
        <figure className={s.quote}>
          <blockquote className="serif">“{P.quote}”</blockquote>
          <figcaption className="mono11">— {P.quoteBy}</figcaption>
        </figure>
      </div>

      <h4 data-lines="" className={s.title}>
        <span className="mask"><span data-line="">Four builds.</span></span>
        <span className="mask"><span data-line="">Different problems.</span></span>
        <span className="mask"><span data-line="" className={`accent ${s.acc}`}>One internship.</span></span>
      </h4>

      <ol className={s.index}>
        {P.projects.map((p, i) => (
          <li key={p.title} data-pi-row="" className={s.row}>
            <span data-pi-part="" className={`${s.num} serif`} aria-hidden="true">{pad(i + 1)}</span>
            <div data-pi-part="" className={s.main}>
              <span className={`${s.kind} mono11`}>Build {pad(i + 1)} · {p.kind}</span>
              <h5 className={s.name}>{p.title}</h5>
              <p className={s.desc}>{p.desc}</p>
            </div>
            <ul data-pi-part="" className={s.feats} aria-label={`${p.title} features`}>{p.points.map((f) => <li key={f}>{f}</li>)}</ul>
            <div data-pi-part="" className={s.side}>
              <span className={`${s.tech} mono11`}>{p.tech.join(" · ")}</span>
              <a href={p.repo} {...ext} className={`${s.repo} mono`} aria-label={`${p.title} repository on GitHub (opens in a new tab)`}>GitHub ↗</a>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
