"use client";
import { useState } from "react";
import { COURSES, EDUCATION, TASKS, pad } from "@/content/site";
import s from "./Experience.module.css";

export default function Experience() {
  const [open, setOpen] = useState(true);
  return (
    <section id="experience" aria-labelledby="exp-h" data-sheet="" className={`sheet secPad ${s.exp}`}>
      <div data-reveal="" className="secHead mono"><span>(06) Experience</span><span>Work · Education · Training</span></div>
      <h2 id="exp-h" data-lines="" className={`h2 ${s.h2}`}>
        <span className="mask"><span data-line="">Experience &amp;</span></span>
        <span className={`mask ${s.l2}`}><span data-line="" className="accent">education</span></span>
      </h2>
      <div className={s.grid}>
        <div className={s.card}>
          <div className={`${s.cardHead} mono`}><span>Work experience</span><span>Feb 2026 – Mar 2026</span></div>
          <h3 className={s.role}>Full-stack web development intern</h3>
          <span className={`${s.co} serif`}>Prodigy InfoTech — Remote</span>
          <div className={s.proof}>
            <a href="/Certificate.pdf" target="_blank" rel="noopener noreferrer" data-magnetic="" className={`${s.ink} mono`}>Certificate ↗</a>
            <a href="/lor.pdf" target="_blank" rel="noopener noreferrer" data-magnetic="" className={`${s.line} mono`}>LOR ↗</a>
          </div>
          <figure className={s.quote}>
            <blockquote className="serif">“His attention to detail, creativity, and willingness to go the extra mile set him apart from his peers.”</blockquote>
            <figcaption className="mono11">— Deven Chopra, Software Engineering Manager at Prodigy InfoTech</figcaption>
          </figure>
        </div>
        <div className={s.tasksCol}>
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="tasks" className={`btn ${s.toggle} mono`}>
            {open ? "Hide internship tasks" : "Show internship tasks"} <span className={s.toggleIcon}>{open ? "−" : "+"}</span>
          </button>
          {open && (
            <ol id="tasks" className={s.tasks}>
              {TASKS.map((t, i) => (
                <li key={i} data-reveal=""><span className={`${s.tn} serif`}>{pad(i + 1)}</span><span className={s.tBody}><span className={`${s.tLabel} mono`}>Task {i + 1}</span><span className={s.tText}>{t}</span></span></li>
              ))}
            </ol>
          )}
        </div>
      </div>
      {/* Education — one integrated programme, drawn as a single timeline 2022 → 2025 → 2027 */}
      <div className={s.block}>
        <span className={`${s.listHead} mono`}>Education</span>
        <div data-reveal="" className={s.eduCard}>
          <div className={s.eduHead}>
            <a href="https://www.glsuniversity.ac.in" target="_blank" rel="noopener noreferrer" className={s.uni}>GLS University ↗</a>
            <span className={`${s.eduKind} serif`}>Integrated IMSc IT · Ahmedabad</span>
          </div>
          <div className={s.track} aria-hidden="true">
            <span className={s.trackDone} />
            <span className={s.trackNow} />
            <span className={s.marker}><span className={`${s.markerTag} mono11`}>Semester 9</span></span>
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

      {/* Training / courses — one colour tile each */}
      <div className={s.block}>
        <span className={`${s.listHead} mono`}>Training / courses</span>
        <div className={s.courses}>
          {COURSES.map((c, i) => {
            const parts = c.meta.split(" · ");
            const issuer = parts[0], date = parts[parts.length - 1], detail = parts.slice(1, -1).join(" · ");
            return (
              <div key={c.title} data-reveal="" className={s.course} data-tone={i % 3}>
                <div className={`${s.courseTop} mono`}><span>{issuer}</span><span>{date}</span></div>
                <span className={s.courseTitle}>{c.title}</span>
                {detail && <span className={`${s.courseDetail} serif`}>{detail}</span>}
                <div className={s.courseLinks}>
                  {c.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={`${s.courseBtn} mono`}>{l.label} ↗</a>)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
