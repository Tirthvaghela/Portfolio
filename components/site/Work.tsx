"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, DESKTOP_MQ, MOBILE_MQ } from "@/lib/gsap";
import { PROJECTS, CATS } from "@/content/projects";
import { PANEL, RED, MUST, TEAL } from "@/content/palette";
import { SITE, pad } from "@/content/site";
import { useSite } from "./SiteProvider";
import Cover from "./Cover";
import s from "./Work.module.css";

type CSSVars = React.CSSProperties & Record<`--${string}`, string>;

export default function Work() {
  const { motion, openProject } = useSite();
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [row, setRow] = useState(false);

  useEffect(() => {
    const mq = matchMedia(DESKTOP_MQ);
    const apply = () => setRow(mq.matches && motion);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [motion]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.map((p, i) => ({ ...p, i })).filter((p) =>
      (filter === "All" || p.cat === filter) && (!q || [p.title, p.sub, p.desc, p.cat, ...p.stack].join(" ").toLowerCase().includes(q)));
  }, [filter, query]);

  // Refresh ScrollTrigger after filtering/search (reel length changes).
  const filtered = useRef(false);
  useEffect(() => {
    if (!filtered.current) { filtered.current = true; return; } // initial layout is refreshed by ScrollMotion
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      // Filter/search changed: the matching projects rise in, confirming the result updated.
      if (motion) gsap.fromTo(trackRef.current?.querySelectorAll("[data-panel]") ?? [], { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .5, ease: "expo.out", stagger: .05, overwrite: true });
    });
    return () => cancelAnimationFrame(id);
  }, [filter, query]); // eslint-disable-line react-hooks/exhaustive-deps

  useGSAP(() => {
    if (!motion) return;
    const mm = gsap.matchMedia();
    // Desktop: pin #work and translate the track horizontally.
    mm.add(DESKTOP_MQ, () => {
      const track = trackRef.current, pin = pinRef.current; if (!track || !pin) return;
      const dist = () => Math.max(0, track.scrollWidth - innerWidth);
      gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: pin, pin: true, start: "top top", end: () => "+=" + dist(), scrub: .8, invalidateOnRefresh: true } });
    });
    // Mobile: panels rise in, then stack like the page's sheets — each sticks once its bottom reaches
    // the screen and the next slides over it while it sinks back (scale .94, dimmed). Covers open
    // from a window as they arrive; the ghost number drifts up. Covers also tilt with device
    // orientation (or get a scroll parallax).
    mm.add(MOBILE_MQ, () => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
      gsap.set(panels, { y: 80, opacity: 0 });
      ScrollTrigger.batch(panels, { start: "top 92%", once: true, onEnter: (b) => { gsap.to(b, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: .08 }); } });

      // Stack: one scale per panel = (sink while covered) × (touch press), so the two never fight.
      const state = panels.map(() => ({ sink: 0, press: 1 }));
      const render = (i: number) => {
        const st = state[i], p = panels[i];
        gsap.set(p, { scale: (1 - .06 * st.sink) * st.press, transformOrigin: "50% 0%" });
        p.style.setProperty("--dim", String(st.sink * .55));
      };
      // Sticky offset: short panels stick under the header; tall ones once their bottom is on screen.
      const stickTop = (p: HTMLElement) => Math.min(72, innerHeight - p.offsetHeight - 12);
      // While ScrollTrigger measures, panels sit in normal flow (a stuck panel would skew every
      // trigger measured inside or after it); sticky comes back once the refresh is done.
      const unstick = () => panels.forEach((p) => { p.style.position = "relative"; });
      const setSticks = () => panels.forEach((p) => { p.style.setProperty("--stick", `${stickTop(p)}px`); p.style.position = ""; });
      unstick(); setSticks();
      ScrollTrigger.addEventListener("refreshInit", unstick);
      ScrollTrigger.addEventListener("refresh", setSticks);
      panels.forEach((p, i) => {
        const next = (panels[i + 1] ?? p.parentElement?.querySelector<HTMLElement>("[data-reel-end]")) || null;
        if (!next) return;
        ScrollTrigger.create({
          // sinks from the moment the next sheet enters until it settles at the top
          trigger: next, start: "top bottom", end: () => `top ${next.hasAttribute("data-panel") ? Math.max(0, stickTop(next)) : 0}px`, scrub: true, invalidateOnRefresh: true,
          onUpdate: (self) => { state[i].sink = self.progress; render(i); },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((c) =>
        gsap.fromTo(c, { clipPath: "inset(14% 10% 14% 10% round 16px)" }, { clipPath: "inset(0% 0% 0% 0% round 16px)", ease: "none", scrollTrigger: { trigger: c, start: "top bottom", end: "top 55%", scrub: true } }));
      gsap.utils.toArray<HTMLElement>("[data-ghost]").forEach((g) =>
        gsap.fromTo(g, { yPercent: 35 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: g.parentElement, start: "top bottom", end: "bottom 60%", scrub: true } }));

      const covers = gsap.utils.toArray<HTMLElement>("[data-tilt]");
      const parallax = covers.map((c) => gsap.fromTo(c, { y: -20 }, { y: 20, ease: "none", scrollTrigger: { trigger: c, start: "top bottom", end: "bottom top", scrub: true } }));
      let oriented = false;
      const onOrient = (e: DeviceOrientationEvent) => {
        if (e.gamma == null || e.beta == null) return;
        if (!oriented) { oriented = true; parallax.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); }); gsap.set(covers, { y: 0 }); }
        const ry = gsap.utils.clamp(-7, 7, (e.gamma / 30) * 7);
        const rx = gsap.utils.clamp(-5, 5, -((e.beta - 45) / 30) * 5);
        gsap.to(covers, { rotateY: ry, rotateX: rx, duration: .6, ease: "power3.out", overwrite: "auto" });
      };
      type DOE = typeof DeviceOrientationEvent & { requestPermission?: () => Promise<string> };
      const DO = (typeof window !== "undefined" ? window.DeviceOrientationEvent : undefined) as DOE | undefined;
      const listen = () => addEventListener("deviceorientation", onOrient);
      // iOS needs a user gesture to grant motion access; ask on the first tap in the reel.
      const ask = () => { DO?.requestPermission?.().then((r) => { if (r === "granted") listen(); }).catch(() => {}); };
      const sec = sectionRef.current;
      if (DO && typeof DO.requestPermission === "function") sec?.addEventListener("touchend", ask, { once: true });
      else if (DO) listen();

      // Press state: scale .98 on touch, spring back.
      const press = (i: number, v: number, duration: number, ease: string) =>
        gsap.to(state[i], { press: v, duration, ease, overwrite: true, onUpdate: () => render(i) });
      const down = (e: TouchEvent) => { const i = panels.indexOf((e.target as Element).closest?.("[data-panel]") as HTMLElement); if (i >= 0) press(i, .98, .2, "power2.out"); };
      const up = () => state.forEach((st, i) => { if (st.press !== 1) press(i, 1, .8, "expo.out"); });
      sec?.addEventListener("touchstart", down, { passive: true });
      sec?.addEventListener("touchend", up); sec?.addEventListener("touchcancel", up);
      return () => {
        ScrollTrigger.removeEventListener("refreshInit", unstick);
        ScrollTrigger.removeEventListener("refresh", setSticks);
        panels.forEach((p) => { p.style.removeProperty("--stick"); p.style.removeProperty("--dim"); p.style.position = ""; });
        removeEventListener("deviceorientation", onOrient);
        sec?.removeEventListener("touchend", ask); sec?.removeEventListener("touchstart", down);
        sec?.removeEventListener("touchend", up); sec?.removeEventListener("touchcancel", up);
      };
    });
    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [motion], revertOnUpdate: true });

  const tabs = CATS.map((c) => ({ label: c, count: c === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.cat === c).length, active: filter === c }));
  const announce = list.length + (list.length === 1 ? " project" : " projects") + (row ? " · scroll →" : "");

  return (
    <section id="work" ref={sectionRef} aria-labelledby="work-h" className={s.work}>
      <div ref={pinRef} className={s.pin}>
        <div ref={trackRef} className={s.track}>
          <div className={s.intro}>
            <div className={s.introTop}>
              <span className="mono">(03) Work — 09 shipped · 03 key projects</span>
              <h2 id="work-h" className={s.h2}>Selected<br /><span className={`accent ${s.red}`}>projects</span></h2>
            </div>
            <div className={s.controls}>
              <div role="group" aria-label="Filter projects by category" className={s.tabs}>
                {tabs.map((t) => (
                  <button key={t.label} type="button" onClick={() => setFilter(t.label)} aria-pressed={t.active} className={`btn ${s.tab} mono`}>
                    {t.label}<sup>{t.count}</sup>
                  </button>
                ))}
              </div>
              <label className={s.search}>
                <span aria-hidden="true">⌕</span><span className="sr">Search projects</span>
                <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name or stack — try “YOLOv8”" />
              </label>
              <span aria-live="polite" className={`mono ${s.count}`}>{announce}</span>
            </div>
          </div>

          {list.map((p) => {
            const c = PANEL[p.i % PANEL.length];
            const vars: CSSVars = { "--bg": c[0], "--fg": c[1], "--ghost": c[2] };
            const open = () => openProject(p.i);
            return (
              <article key={p.i} data-panel="" data-cursor="Open" className={s.panel} style={vars}>
                <span aria-hidden="true" data-ghost="" className={`${s.ghost} serif`}>{pad(p.i + 1)}</span>
                <div className={s.info}>
                  <div className={`${s.meta} mono`}>
                    <span className={s.catPill}>{p.cat}</span>
                    {p.days ? <span className={s.linePill}>{p.days} days to build</span> : null}
                  </div>
                  <div className={s.text}>
                    <h3 className={s.h3}>{p.title}</h3>
                    <p className={`${s.sub} serif`}>{p.sub}</p>
                    <p className={s.desc}>{p.desc}</p>
                    <div className={s.stack}>{p.stack.map((t) => <span key={t}>{t}</span>)}</div>
                    {p.collab ? <span className={s.with}>Built with <a href={SITE.collaborator} target="_blank" rel="noopener noreferrer">Dhruv Sadrawala</a></span> : null}
                    <div className={s.actions}>
                      <button type="button" onClick={open} aria-label={`Open ${p.title} case study`} className={`btn ${s.openBtn} mono`}>Open case →</button>
                      {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className={`${s.lineBtn} mono`}>GitHub ↗</a>}
                      {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className={`${s.lineBtn} mono`}>Live demo ↗</a>}
                    </div>
                  </div>
                </div>
                <div className={s.coverWrap}>
                  <button type="button" onClick={open} tabIndex={-1} aria-hidden="true" className={`btn ${s.coverBtn}`}>
                    <span data-tilt="" className={s.tilt}>
                      <span className={s.chrome}>
                        <i style={{ background: RED }} /><i style={{ background: MUST }} /><i style={{ background: TEAL }} />
                        <span className={s.chromeTitle}>{p.title}</span>
                      </span>
                      <span className={s.shot}>
                        {p.image
                          ? <Image src={p.image} alt={`${p.title} screenshot`} fill sizes="(min-width: 900px) 60vw, 100vw" />
                          : <Cover i={p.i} title={p.title} decorative />}
                      </span>
                    </span>
                  </button>
                </div>
              </article>
            );
          })}

          {list.length === 0 && (
            <div className={s.empty}>
              <p className={s.emptyText}>No projects match “{query}”.</p>
              <button type="button" onClick={() => { setFilter("All"); setQuery(""); }} className={`btn ${s.clear} mono`}>Clear filters</button>
            </div>
          )}

          <a href={SITE.github} target="_blank" rel="noopener noreferrer" data-cursor="GitHub" data-reel-end="" className={s.end}>
            <span className="mono">End of reel</span>
            <span className={s.endTitle}>
              <span className={s.endBig}>More on <span className={`accent ${s.must}`}>GitHub</span></span>
              <span className={s.endHandle}>@Tirthvaghela ↗</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
