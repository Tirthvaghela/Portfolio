"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SITE } from "@/content/site";
import { PAPER } from "@/content/palette";
import { useSite } from "./SiteProvider";
import s from "./Footer.module.css";

const NAME = ["T", "I", "R", "T", "H", null, "V", "A", "G", "H", "E", "L", "A"] as const;
const VF0 = { fontVariationSettings: "'wght' 300, 'wdth' 75" };
type VF = HTMLSpanElement & { _f?: number };

export default function Footer() {
  const { motion, fine, time } = useSite();
  const ref = useRef<HTMLElement>(null);
  const [visitors, setVisitors] = useState<number | null>(null);

  // Visitor counter (Upstash Redis via /api/visits) — shown only once a real count comes back.
  useEffect(() => {
    let alive = true;
    fetch("/api/visits")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (alive && d && typeof d.count === "number") setVisitors(d.count); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);
  const live = useRef({ motion, fine, gp: null as null | { x: number; y: number }, touchAt: 0 });
  useEffect(() => { live.current.motion = motion; live.current.fine = fine; }, [motion, fine]);

  // Letters rise in (stagger .035).
  useGSAP(() => {
    if (!motion) return;
    gsap.from("[data-fl]", { yPercent: 105, duration: 1.2, ease: "expo.out", stagger: .035, scrollTrigger: { trigger: ref.current, start: "top 80%" } });
  }, { scope: ref, dependencies: [motion], revertOnUpdate: true });

  // Every frame: each letter's wght (200–800) / wdth (75–100) follows pointer distance
  // (smoothstep, radius max(220, 26vw)); hot letters turn paper. On touch, a travelling
  // sine wave runs, and a finger dragging across the name drives it like the cursor.
  useEffect(() => {
    const footer = ref.current; if (!footer) return;
    const els = Array.from(footer.querySelectorAll<VF>("[data-vf]"));
    let visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: "300px 0px" });
    io.observe(footer);
    const onMove = (e: PointerEvent) => { live.current.gp = { x: e.clientX, y: e.clientY }; };
    const onTouch = (e: TouchEvent) => { const t = e.touches[0]; if (t) { live.current.gp = { x: t.clientX, y: t.clientY }; live.current.touchAt = performance.now(); } };
    addEventListener("pointermove", onMove, { passive: true });
    footer.addEventListener("touchstart", onTouch, { passive: true });
    footer.addEventListener("touchmove", onTouch, { passive: true });

    const tick = (time: number) => {
      if (!visible || document.hidden) return;
      const t = time * 1000, L = live.current;
      const touching = performance.now() - L.touchAt < 600;
      const isLive = !!L.gp && L.motion && (L.fine || touching);
      const R = Math.max(220, innerWidth * .26);
      const rects = isLive ? els.map((el) => el.getBoundingClientRect()) : null;
      els.forEach((el, i) => {
        let f: number;
        if (isLive) {
          const b = rects![i], d = Math.hypot(L.gp!.x - (b.left + b.width / 2), L.gp!.y - (b.top + b.height / 2));
          f = Math.max(0, 1 - d / R); f = f * f * (3 - 2 * f);
        } else f = L.motion ? (Math.sin(t * .0016 - i * .55) + 1) / 2 * .85 : .6;
        const prev = el._f == null ? -1 : el._f;
        const v = prev < 0 ? f : prev + (f - prev) * .14;
        if (Math.abs(v - prev) > .003) {
          el._f = v;
          el.style.fontVariationSettings = `'wght' ${Math.round(200 + v * 600)}, 'wdth' ${(75 + v * 25).toFixed(1)}`;
          el.style.color = v > .72 ? PAPER : "";
        }
      });
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick); io.disconnect();
      removeEventListener("pointermove", onMove);
      footer.removeEventListener("touchstart", onTouch); footer.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <footer ref={ref} className={s.footer}>
      <div className={s.grid}>
        <nav aria-label="Footer" className={s.col}>
          <span className={`${s.label} mono11`}>Menu</span>
          <a href="#about">About</a><a href="#key">Key projects</a><a href="#work">Work</a><a href="#skills">Skills</a><a href="#experience">Experience</a><a href="#contact">Contact</a>
        </nav>
        <div className={s.col}>
          <span className={`${s.label} mono11`}>Elsewhere</span>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href={`mailto:${SITE.email}`}>Email ↗</a>
          <a href={SITE.resume} target="_blank" rel="noopener noreferrer">Résumé ↗</a>
        </div>
        <div className={s.timeCol}>
          <span className={`${s.label2} mono11`}>Local time</span>
          <span className={s.time} suppressHydrationWarning>{time}</span>
          <span className="mono11">Ahmedabad · IST</span>
          <a href="#top" data-magnetic="" aria-label="Back to top" className={s.top}>↑</a>
        </div>
      </div>
      <div aria-hidden="true" className={s.name}>
        {NAME.map((ch, i) => ch === null
          ? <span key={i} className={s.gap} />
          : <span key={i} data-fl="" className={s.ch}><span data-vf="" className={s.ch} style={VF0}>{ch}</span></span>)}
      </div>
      <div className={`${s.legal} mono11`}><span suppressHydrationWarning>© {new Date().getFullYear()} Tirth Vaghela — Ahmedabad, India</span>{visitors !== null && <span>Visitor #{visitors.toLocaleString("en-IN")}</span>}<span>Designed &amp; built by Tirth</span></div>
    </footer>
  );
}
