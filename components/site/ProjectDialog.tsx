"use client";
import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { PROJECTS } from "@/content/projects";
import { PANEL } from "@/content/palette";
import { pad } from "@/content/site";
import { useSite } from "./SiteProvider";
import CaseBody from "./CaseBody";
import s from "./Dialog.module.css";

type CSSVars = React.CSSProperties & Record<`--${string}`, string>;

export default function ProjectDialog() {
  const { dialog, setDialog, returnFocus, motion } = useSite();
  const dlgRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prev = useRef(-1);
  const closing = useRef(false);
  const open = dialog >= 0;

  const close = () => {
    if (closing.current) return;
    const done = () => { closing.current = false; setDialog(-1); returnFocus(); };
    if (motion && dlgRef.current) { closing.current = true; gsap.to(dlgRef.current, { yPercent: 100, duration: .55, ease: "expo.in", onComplete: done }); }
    else done();
  };
  const step = (d: number) => setDialog((dialog + d + PROJECTS.length) % PROJECTS.length);

  // Entrance (slide up + contents stagger) and project-switch re-animation.
  useGSAP(() => {
    const was = prev.current; prev.current = dialog;
    if (!open || !dlgRef.current) return;
    if (was < 0) {
      if (motion) {
        gsap.fromTo(dlgRef.current, { yPercent: 100 }, { yPercent: 0, duration: .9, ease: "expo.out" });
        gsap.from("[data-dlg-in]", { y: 60, opacity: 0, duration: 1, ease: "expo.out", stagger: .08, delay: .2 });
      }
      setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 60);
    } else if (was !== dialog) {
      dlgRef.current.scrollTop = 0;
      if (motion) gsap.fromTo("[data-dlg-in]", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: "expo.out", stagger: .06 });
    }
  }, { scope: dlgRef, dependencies: [dialog] });

  // Esc closes, ←/→ switch project, Tab is trapped inside.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      const dl = dlgRef.current;
      if (e.key === "Tab" && dl) {
        const f = dl.querySelectorAll<HTMLElement>("button,a[href]"); if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  });

  if (!open) return null;
  const d = PROJECTS[dialog], c = PANEL[dialog % PANEL.length];
  const vars: CSSVars = { "--bg": c[0], "--fg": c[1] };

  return (
    <div className={s.overlay} onClick={close}>
      <div ref={dlgRef} role="dialog" aria-modal="true" aria-labelledby="dlg-title" onClick={(e) => e.stopPropagation()} className={s.dlg} style={vars}>
        <div className={s.bar}>
          <span className="mono">Project {pad(dialog + 1)} / {pad(PROJECTS.length)}</span>
          <div className={s.barBtns}>
            <button type="button" onClick={() => step(-1)} aria-label="Previous project" className={`btn ${s.round}`}>←</button>
            <button type="button" onClick={() => step(1)} aria-label="Next project" className={`btn ${s.round}`}>→</button>
            <button ref={closeRef} type="button" onClick={close} aria-label="Close project" className={`btn ${s.close} mono`}>Close ✕</button>
          </div>
        </div>
        <CaseBody p={d} i={dialog} rule={c[2]} titleId="dlg-title" />
      </div>
    </div>
  );
}
