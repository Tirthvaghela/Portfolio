"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SECTIONS, SITE, pad } from "@/content/site";
import { useSite } from "./SiteProvider";
import s from "./Header.module.css";

export default function Header() {
  const { motion, navOpen, setNavOpen } = useSite();
  const progressRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState("");
  const st = useRef({ lastY: 0, motion, navOpen });
  useEffect(() => { st.current.motion = motion; st.current.navOpen = navOpen; if (!motion && headerRef.current) headerRef.current.style.transform = "none"; }, [motion, navOpen]);

  // Progress bar scaleX, header hide-on-down / show-on-up, active section.
  useEffect(() => {
    let raf = 0;
    const handle = () => {
      raf = 0;
      const h = document.documentElement, y = scrollY;
      const p = Math.min(1, y / Math.max(1, h.scrollHeight - innerHeight));
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
      const hd = headerRef.current, c = st.current;
      if (hd && c.motion) {
        if (y > c.lastY + 4 && y > 300 && !c.navOpen) hd.style.transform = "translateY(-100%)";
        else if (y < c.lastY - 4 || y < 300) hd.style.transform = "none";
      }
      c.lastY = y;
      let a = "";
      for (const [id] of SECTIONS) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= innerHeight * 0.4) a = id; }
      setActive(a);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(handle); };
    handle();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  // Mobile menu: circle reveal from the top-right + links rise from masks.
  useGSAP(() => {
    if (!navOpen || !panelRef.current) return;
    if (motion) {
      gsap.fromTo(panelRef.current, { clipPath: "circle(0% at 100% 0%)" }, { clipPath: "circle(150% at 100% 0%)", duration: .9, ease: "expo.inOut" });
      gsap.from("[data-nav-link]", { yPercent: 110, duration: 1, ease: "expo.out", stagger: .06, delay: .35 });
    }
  }, { scope: panelRef, dependencies: [navOpen] });

  // Menu focus management + Escape.
  useEffect(() => {
    if (!navOpen) return;
    const btn = burgerRef.current;
    panelRef.current?.querySelector<HTMLElement>("button")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("button,a[href]"); if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    addEventListener("keydown", onKey);
    return () => { removeEventListener("keydown", onKey); btn?.focus({ preventScroll: true }); };
  }, [navOpen, setNavOpen]);

  const items = SECTIONS.map(([id, label], i) => ({ id, label, num: pad(i + 1), current: active === id, op: !active || active === id ? 1 : .55 }));

  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <div ref={progressRef} aria-hidden="true" className={s.progress} />
      <header ref={headerRef} className={s.header}>
        <div className={s.row}>
          <a href="#top" data-magnetic="" aria-label="TV. Tirth Vaghela, back to top" className={s.mark}>TV.</a>
          <nav aria-label="Primary" className={s.nav}>
            {items.map((n) => (
              <a key={n.id} href={`#${n.id}`} aria-current={n.current ? "true" : undefined} className={`${s.navLink} mono`} style={{ opacity: n.op }}>
                <span className={s.navNum}>{n.num}</span><span data-scramble="">{n.label}</span>
              </a>
            ))}
          </nav>
          <div className={s.tools}>
            <a href={SITE.resume} target="_blank" rel="noopener noreferrer" data-magnetic="" className={`${s.resume} mono`}>Résumé ↗</a>
            <button ref={burgerRef} type="button" onClick={() => setNavOpen(true)} aria-label="Open menu" aria-expanded={navOpen} className={`btn ${s.burger}`}>
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      {navOpen && (
        <div ref={panelRef} role="dialog" aria-modal="true" aria-label="Menu" className={s.panel}>
          <div className={s.panelTop}>
            <span className={s.mark}>TV.</span>
            <button type="button" onClick={() => setNavOpen(false)} aria-label="Close menu" className={`btn ${s.close} mono`}>Close ✕</button>
          </div>
          <nav aria-label="Mobile" className={s.mnav}>
            {items.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setNavOpen(false)} aria-current={n.current ? "true" : undefined} className={s.mlink}>
                <span data-nav-link="" className={s.mlinkIn}><span className={s.mlabel}>{n.label}</span><span className={`${s.mnum} serif`}>{n.num}</span></span>
              </a>
            ))}
          </nav>
          <div className={s.mfoot}>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <div className={s.mrow}>
              <a href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
