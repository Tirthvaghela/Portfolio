"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSite } from "./SiteProvider";
import { COURSES, EDUCATION, pad } from "@/content/site";
import WeIntern from "./WeIntern";
import Prodigy from "./Prodigy";
import s from "./Experience.module.css";

/** Experience & education: 01 WeIntern (current) → 02 Prodigy InfoTech → 03 Education → 04 Training (certificates). */
export default function Experience() {
  const { motion } = useSite();
  const certRef = useRef<HTMLDivElement>(null);
  // Each certificate's seal stamps on just after its sheet rises in (the sheets use [data-reveal]).
  useGSAP(() => {
    if (!motion || document.documentElement.dataset.motion === "off") return;
    gsap.utils.toArray<HTMLElement>("[data-cert]").forEach((cert) =>
      gsap.from(cert.querySelector("[data-seal]"), { scale: 1.5, rotate: -40, opacity: 0, duration: .6, ease: "power4.out", delay: .45, scrollTrigger: { trigger: cert, start: "top 92%" } }));
  }, { scope: certRef, dependencies: [motion], revertOnUpdate: true });
  return (
    <section id="experience" aria-labelledby="exp-h" data-sheet="" className={`sheet secPad ${s.exp}`}>
      <div data-reveal="" className="secHead mono"><span>(06) Experience</span><span>Work · Education · Training</span></div>
      <h2 id="exp-h" data-lines="" className={`h2 ${s.h2}`}>
        <span className="mask"><span data-line="">Experience &amp;</span></span>
        <span className={`mask ${s.l2}`}><span data-line="" className="accent">education</span></span>
      </h2>
      <WeIntern />
      <Prodigy />

      {/* Education — one integrated programme, drawn as a single timeline 2022 → 2025 → 2027 */}
      <div className={`${s.block} ${s.eduBlock}`}>
        <div className={`${s.chapter} mono`}><h3 className={s.chapterH}>03 · Education</h3><span>2022 – 2027</span></div>
        <div data-reveal="" className={s.eduCard}>
          <div className={s.eduHead}>
            <a href="https://www.glsuniversity.ac.in" target="_blank" rel="noopener noreferrer" className={s.uni}>GLS University ↗</a>
            <span className={`${s.eduKind} serif`}>Integrated IMSc IT · Ahmedabad</span>
          </div>
          <div data-progress="" className={s.track} aria-hidden="true">
            <span data-seg="" className={s.trackDone} />
            <span data-seg="" className={s.trackNow} />
            <span data-mark="" className={s.marker}><span className={`${s.markerTag} mono11`}>Semester 9</span></span>
          </div>
          <div className={`${s.years} mono`} aria-hidden="true"><span>2022</span><span>2025</span><span>2027</span></div>
          <div className={s.phases}>
            {[...EDUCATION].reverse().map((e) => (
              <div key={e.years} className={s.phase} data-pursuing={e.status === "Pursuing"}>
                <div className={`${s.phaseTop} mono`}><span>{e.years}</span><span className={s.status} style={{ background: e.chipBg }}>{e.status}</span></div>
                <span className={s.degree}>{e.degree}</span>
                <span className={`${s.note} serif`}>{e.note}</span>
                {e.cgpa && <span className={`${s.cgpa} mono`}>{e.cgpa}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 04 · Training — each course as a certificate sheet with the issuer's seal */}
      <div ref={certRef} className={`${s.block} ${s.eduBlock}`}>
        <div className={`${s.chapter} mono`}><h3 className={s.chapterH}>04 · Training</h3><span>{COURSES.length} certificates</span></div>
        <ol className={s.certs}>
          {COURSES.map((c, i) => {
            const parts = c.meta.split(" · ");
            const issuer = parts[0], date = parts[parts.length - 1], detail = parts.slice(1, -1).join(" · ");
            const year = date.match(/\d{4}/)?.[0] ?? "";
            return (
              <li key={c.title} data-reveal="" data-cert="" className={s.cert} data-tone={i % 3}>
                <div className={s.certFrame}>
                  <div className={`${s.certTop} mono11`}><span>Certificate · {pad(i + 1)}</span><span>{date}</span></div>
                  <h4 className={s.certTitle}>{c.title}</h4>
                  {detail && <p className={`${s.certDetail} serif`}>{detail}</p>}
                  <p className={`${s.certIssuer} mono11`}>Issued by <b>{issuer}</b></p>
                  <div className={s.certLinks}>
                    {c.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={`${s.certBtn} mono`} aria-label={`${c.title}: ${l.label.toLowerCase()} (opens in a new tab)`}>{l.label} ↗</a>
                    ))}
                  </div>
                  <span data-seal="" className={`${s.seal} mono11`} aria-hidden="true">
                    <span>{issuer.split(/\s+[—-]\s+/)[0]}</span><b>{year}</b>
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
