"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SKILLS, RING_ORDER } from "@/content/skills";
import { pad } from "@/content/site";
import { useSite } from "./SiteProvider";
import s from "./Skills.module.css";

type CSSVars = React.CSSProperties & Record<`--${string}`, string>;

export default function Skills() {
  const { motion } = useSite();
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const skillRef = useRef(0);
  const [skill, setSkillState] = useState(0);
  const setSkill = (k: number) => { skillRef.current = k; setSkillState(k); };
  // With Motion on the orbit pins on every screen size (mobile uses a compact layout that
  // fits one screen), so scrolling always starts at group 01 and steps through 01 → 06.
  const pinned = motion;

  // Rings rotate with scroll (alternating direction, speed .35 + i·.09) and pills counter-rotate.
  // Pinned for 2.6 × innerHeight; progress split into 6 steps sets the active group.
  useGSAP(() => {
    const orb = orbitRef.current; if (!orb || !motion) return;
    const rings = gsap.utils.toArray<HTMLElement>("[data-ring]");
    const pills = rings.map((rg) => Array.from(rg.querySelectorAll<HTMLElement>("[data-pill]")));
    const last: number[] = [];
    const upd = (p: number) => rings.forEach((rg, i) => {
      const th = p * 360 * (i % 2 ? -1 : 1) * (.35 + i * .09);
      if (Math.abs((last[i] ?? 1e9) - th) < .05) return;
      last[i] = th;
      rg.style.transform = `rotate(${th}deg)`;
      pills[i].forEach((pl) => { pl.style.transform = `rotate(${-th}deg)`; });
    });
    const band = (p: number) => { const k = Math.min(5, Math.floor(p * 6)); if (k !== skillRef.current) setSkill(k); };
    stRef.current = ScrollTrigger.create({
      trigger: orb, start: "top top", end: () => "+=" + innerHeight * 2.6, pin: true, scrub: .6,
      anticipatePin: 1, invalidateOnRefresh: true,
      onUpdate: (self) => { upd(self.progress); band(self.progress); },
    });
    return () => { stRef.current = null; };
  }, { scope: sectionRef, dependencies: [motion], revertOnUpdate: true });

  // Active group change: panel title and items re-animate in.
  const first = useRef(true);
  useGSAP(() => {
    if (first.current) { first.current = false; return; }
    if (!motion) return;
    gsap.fromTo("[data-sk-item]", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: "expo.out", stagger: .05 });
    gsap.fromTo("[data-sk-title]", { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .7, ease: "expo.out" });
  }, { scope: sectionRef, dependencies: [skill] });

  // Keep the active tab visible in the swipeable mobile tab row (scrolls the row only, never the page).
  const tabsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const row = tabsRef.current; if (!row || row.scrollWidth <= row.clientWidth) return;
    const tab = row.querySelector<HTMLElement>("[aria-selected=true]"); if (!tab) return;
    row.scrollTo({ left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2, behavior: motion ? "smooth" : "auto" });
  }, [skill, motion]);

  const goSkill = (i: number) => {
    const st = stRef.current;
    if (st && st.pin) scrollTo({ top: st.start + (i + .5) / 6 * (st.end - st.start), behavior: "smooth" });
    else setSkill(i);
  };

  const g = SKILLS[skill];
  return (
    <section id="skills" ref={sectionRef} aria-labelledby="skills-h" data-sheet="" className={`sheet ${s.skills}`}>
      <div className={s.head}>
        <div data-reveal="" className="secHead mono"><span>(05) Skills</span><span>27 tools · 6 groups</span></div>
        <h2 id="skills-h" data-lines="" className="h2">
          <span className="mask"><span data-line="">Skills &amp;</span></span>
          <span className={`mask ${s.l2}`}><span data-line="" className="accent">technologies</span></span>
        </h2>
      </div>
      <div ref={orbitRef} className={s.orbit}>
        <div className={s.grid}>
          <div className={s.panel}>
            <div className={s.numRow}><span className={`${s.num} serif`}>{pad(skill + 1)}</span><span className="mono">/ 06</span></div>
            <h3 data-sk-title="" className={s.title}>{g[0]}</h3>
            <ul className={s.items}>
              {g[1].map((t, j) => <li key={`${skill}-${t}`} data-sk-item=""><span>{t}</span><span className="mono11">{pad(j + 1)}</span></li>)}
            </ul>
            <div ref={tabsRef} role="tablist" aria-label="Skill groups" className={s.tabs}>
              {SKILLS.map((sg, i) => (
                <button key={sg[0]} type="button" role="tab" aria-selected={skill === i} onClick={() => goSkill(i)} className={`btn ${s.tab} mono11`}>{sg[0]}</button>
              ))}
            </div>
            <span className={`${s.hint} mono11`}>{pinned ? "Scroll to orbit through the stack" : "Tap a group"}</span>
          </div>
          <div className={s.orbCol}>
            <div aria-hidden="true" className={s.orb}>
              {RING_ORDER.map((gi, k) => {
                const items = SKILLS[gi][1];
                const ring: CSSVars = { "--f": String(.34 + k * .132), "--k": String(k) };
                return (
                  <div key={gi} data-ring="" data-active={gi === skill} className={s.ring} style={ring}>
                    {items.map((t, j) => {
                      const a = Math.round(j * 360 / items.length + k * 37);
                      return (
                        <span key={t} className={s.slot} style={{ "--a": `${a}deg` } as CSSVars}>
                          <span data-pill="" className={s.pillHold}><span className={s.pill}>{t}</span></span>
                        </span>
                      );
                    })}
                  </div>
                );
              })}
              <div className={s.core}><span className={s.coreN}>27</span><span className={`${s.coreL} mono`}>tools</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
