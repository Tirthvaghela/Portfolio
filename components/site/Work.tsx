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
    const id = requestAnimationFrame(() => ScrollTrigger.refresh()); return () => cancelAnimationFrame(id);
  }, [filter, query]);

  useGSAP(() => {
    if (!motion) return;
    const mm = gsap.matchMedia();
    // Desktop: pin #work and translate the track horizontally.
    mm.add(DESKTOP_MQ, () => {
      const track = trackRef.current, pin = pinRef.current; if (!track || !pin) return;
      const dist = () => Math.max(0, track.scrollWidth - innerWidth);
      gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: pin, pin: true, start: "top top", end: () => "+=" + dist(), scrub: .8, invalidateOnRefresh: true } });
    });
    // Mobile: panels stack and rise in; covers tilt with device orientation or get a scroll parallax.
    mm.add(MOBILE_MQ, () => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
      gsap.set(panels, { y: 80, opacity: 0 });
      ScrollTrigger.batch(panels, { start: "top 92%", once: true, onEnter: (b) => { gsap.to(b, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: .08 }); } });

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
      const down = (e: TouchEvent) => { const p = (e.target as Element).closest?.("[data-panel]"); if (p) gsap.to(p, { scale: .98, duration: .2, ease: "power2.out" }); };
      const up = () => gsap.to(panels, { scale: 1, duration: .8, ease: "elastic.out(1,.4)", overwrite: "auto" });
      sec?.addEventListener("touchstart", down, { passive: true });
      sec?.addEventListener("touchend", up); sec?.addEventListener("touchcancel", up);
      return () => {
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
                <span aria-hidden="true" className={`${s.ghost} serif`}>{pad(p.i + 1)}</span>
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

          <a href={SITE.github} target="_blank" rel="noopener noreferrer" data-cursor="GitHub" className={s.end}>
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
