"use client";
/* eslint-disable @next/next/no-img-element -- external SVG chart; next/image adds nothing here */
import { LEAD, SITE, STATS } from "@/content/site";
import { useSite } from "./SiteProvider";
import s from "./About.module.css";

export default function About() {
  const { time } = useSite();
  return (
    <section id="about" aria-labelledby="about-h" data-sheet="" className={`sheet secPad ${s.about}`}>
      <div data-reveal="" className="secHead mono"><span>(01) About</span><span>GLS University · 2022–2027</span></div>
      <h2 id="about-h" data-lines="" className="h2">
        <span className="mask"><span data-line="">Still learning.</span></span>
        <span className={`mask ${s.l2}`}><span data-line="" className="accent">Already shipping.</span></span>
      </h2>
      <div className={s.grid}>
        <div className={s.col}>
          <p data-words="" className={s.lead}>
            {LEAD.split(" ").map((w, i) => <span key={i} data-word="">{w} </span>)}
          </p>
          <p data-reveal="" className={s.body}>The work splits two ways. 3 of my projects point computer vision at real-world jobs: reading traffic density, catching helmetless riders, finding one face across a wedding album. Others are systems built around who-can-do-what. 3 of them have role-based access at their core.</p>
          <p data-reveal="" className={s.body}>The pieces that keep coming back are the unglamorous ones: JWT auth, bcrypt hashing, email notifications, audit logs. 6 of the 9 projects were built with <a href={SITE.collaborator} target="_blank" rel="noopener noreferrer" className={s.collab}>Dhruv Sadrawala</a>.</p>
        </div>
        <div className={s.col2}>
          <div data-reveal="" className={s.now}>
            <div className={s.nowHead}><span className={`${s.nowTitle} serif`}>Now</span><span className="mono11" suppressHydrationWarning>{time} IST</span></div>
            <dl className={s.dl}>
              <div><dt>Studying</dt><dd>Master of Science in Information Technology, until 2027</dd></div>
              <div><dt>Building</dt><dd><a href="#key-voiceform">VoiceForm AI · Multilingual Voice-to-Form Accessibility Engine</a></dd></div>
              <div><dt>Looking for</dt><dd>Work and internship offers, and project ideas worth building</dd></div>
            </dl>
          </div>
          <dl data-reveal="" className={s.stats}>
            {STATS.map((st) => (
              <div key={st.label} className={s.stat}>
                <dt className="mono11">{st.label}</dt>
                <dd><span data-count={st.n}>{st.n}</span><span className={`${s.plus} serif`}>+</span></dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div data-reveal="" className={s.gh}>
        <div className={`${s.ghHead} mono`}>
          <span className={s.ghTitle}><span className={s.ghDot} />Engineering activity · @Tirthvaghela</span>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" className={s.ghLink}>View profile ↗</a>
        </div>
        <div className={s.ghBody}>
          <div className={s.ghCard}>
            <img src={SITE.githubChart} alt="GitHub contribution graph for Tirthvaghela over the past year" loading="lazy" width={828} height={128} />
          </div>
        </div>
      </div>
    </section>
  );
}
