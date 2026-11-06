"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { PROJECTS, PIPES } from "@/content/projects";
import { MUST_RGB, PAPER } from "@/content/palette";
import { pad } from "@/content/site";
import { useSite } from "./SiteProvider";
import s from "./Systems.module.css";

export default function Systems() {
  const { motion, openProject } = useSite();
  const ref = useRef<HTMLElement>(null);
  const [pipe, setPipe] = useState(0);
  const [vertical, setVertical] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(max-width: 899px)");
    const apply = () => setVertical(mq.matches);
    apply(); mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  const pp = PROJECTS[PIPES[pipe]];

  // Looping pipeline: the fill runs 2.6s while each step pops (y −10, mustard, back.out(2)),
  // then everything resets; repeats every 1.2s. Vertical (scaleY) under 900px. Rebuilt per tab.
  useGSAP(() => {
    const fill = ref.current?.querySelector<HTMLElement>("[data-pfill]");
    if (!fill) return;
    const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
    if (!motion) { gsap.set(fill, { scaleX: 1, scaleY: 1 }); return; }
    const prop = vertical ? "scaleY" : "scaleX";
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, paused: true });
    tl.set(fill, { scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1, opacity: 1 });
    tl.set(steps, { y: 0, background: PAPER });
    tl.to(fill, { [prop]: 1, duration: 2.6, ease: "none" }, 0);
    steps.forEach((st, i) => tl.to(st, { y: -10, background: MUST_RGB, duration: .35, ease: "back.out(2)" }, i * (2.6 / Math.max(1, steps.length - 1)) * .98));
    tl.to(steps, { y: 0, background: PAPER, duration: .5, stagger: .05 }, "+=1");
    tl.to(fill, { opacity: 0, duration: .4 }, "<");
    // Starts once the pipeline scrolls into view (top 80%).
    ScrollTrigger.create({ trigger: "[data-pipe]", start: "top 80%", once: true, onEnter: () => { tl.play(); } });
  }, { scope: ref, dependencies: [motion, pipe, vertical], revertOnUpdate: true });

  return (
    <section id="systems" ref={ref} aria-labelledby="sys-h" data-sheet="" className={`sheet secPad ${s.sys}`}>
      <div data-reveal="" className="secHead mono"><span>(04) Inside the systems</span><span>System flow</span></div>
      <div className={s.headRow}>
        <h2 id="sys-h" data-lines="" className={s.h2}>
          <span className="mask"><span data-line="">How the vision</span></span>
          <span className={`mask ${s.l2}`}><span data-line="" className="accent">pipelines run</span></span>
        </h2>
        <div role="tablist" aria-label="Choose a system" className={s.tabs}>
          {PIPES.map((pi, k) => (
            <button key={pi} type="button" role="tab" aria-selected={pipe === k} onClick={() => setPipe(k)} className={`btn ${s.tab}`}>{PROJECTS[pi].title}</button>
          ))}
        </div>
      </div>
      <ol data-pipe="" className={s.pipe}>
        <li role="presentation" aria-hidden="true" className={s.line}><span data-pfill="" className={s.fill} /></li>
        {pp.pipeline!.map((x, k) => (
          <li key={`${pipe}-${k}`} data-step="" className={s.step}>
            <span className={s.n}>{pad(k + 1)}</span>
            <span className={s.label}>{x[0]}</span>
            <span className={`${s.note} serif`}>{x[1]}</span>
          </li>
        ))}
      </ol>
      {pp.override && (
        <p className={s.override}><span className={`${s.overrideTag} mono11`}>Override</span>{pp.override}</p>
      )}
      <button type="button" onClick={() => openProject(PIPES[pipe])} className={`btn ${s.openCase}`}>Open the {pp.title} case →</button>
    </section>
  );
}
