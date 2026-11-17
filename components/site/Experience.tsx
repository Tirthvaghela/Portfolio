"use client";
import Certificates from "./Certificates";
import { COURSES, EDUCATION } from "@/content/site";
import WeIntern from "./WeIntern";
import Prodigy from "./Prodigy";
import s from "./Experience.module.css";

/** Experience & education: 01 WeIntern (current) → 02 Prodigy InfoTech → 03 Education → 04 Training (certificates). */
export default function Experience() {
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

      {/* 04 · Training — featured certificate + list */}
      <div className={`${s.block} ${s.eduBlock}`}>
        <div className={`${s.chapter} mono`}><h3 className={s.chapterH}>04 · Training</h3><span>{COURSES.length} certificates</span></div>
        <Certificates />
      </div>
    </section>
  );
}
