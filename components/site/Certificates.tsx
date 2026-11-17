"use client";
import Image from "next/image";
import { useRef } from "react";
import { DESKTOP_MQ, MOBILE_MQ, gsap, useGSAP } from "@/lib/gsap";
import { useSite } from "./SiteProvider";
import { COURSES, pad } from "@/content/site";
import s from "./Certificates.module.css";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Split "Issuer · detail · date" into its parts (same format as COURSES.meta). */
const parse = (meta: string) => {
  const parts = meta.split(" · ");
  return { issuer: parts[0], date: parts[parts.length - 1], detail: parts.slice(1, -1).join(" · ") };
};
const items = COURSES.map((c, i) => ({ ...c, ...parse(c.meta), n: pad(i + 1), tone: i % 3 }));

/** Resting tilt of each print once spread out, and its tilt while piled up. */
const REST = [-2.5, 1.5, 3, -1.5];
const PILE = [-4, 3, -8, 6];

/**
 * 04 · Training as a stack of the real certificates (each PDF's first page, printed with a paper
 * border and taped down in the course's colour). Desktop: the prints start piled in the middle;
 * scrolling fans them out into a row and the tape presses on as each lands (scrubbed — scrolling back
 * gathers the pile). Only the print tilts, so captions stay level. Hover straightens and lifts a print; the print
 * opens its certificate. Phones: a swipeable deck.
 * Reduced motion: the prints simply rest spread out.
 */
export default function Certificates() {
  const { motion } = useSite();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = root.current;
    if (!motion || !el || document.documentElement.dataset.motion === "off") return;
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MQ, () => {
      const pile = el.querySelector<HTMLElement>("[data-pile]");
      const prints = gsap.utils.toArray<HTMLElement>("[data-paper]", el);
      if (!pile || !prints.length) return;
      // Offset that puts a print's top-centre on the pile's (layout values, so transforms don't skew it).
      // Works for a single row or the 2 × 2 grid: every print gathers at the pile's top middle.
      const toX = (p: HTMLElement) => pile.offsetLeft + pile.offsetWidth / 2 - (p.offsetLeft + p.offsetWidth / 2);
      const toY = (p: HTMLElement) => prints[0].offsetTop - p.offsetTop;
      const tl = gsap.timeline({ scrollTrigger: { trigger: pile, start: "top 80%", end: "top 20%", scrub: .6, invalidateOnRefresh: true } });
      prints.forEach((p, i) => {
        // Moves the whole item; only the print tilts (via --tilt), so captions stay level.
        tl.fromTo(p, { x: () => toX(p) + i * 16, y: () => toY(p) + i * -12, "--tilt": `${PILE[i]}deg` }, { x: 0, y: 0, "--tilt": `${REST[i]}deg`, duration: 1, ease: "power2.inOut" }, i * .12);
        tl.fromTo(p.querySelector("[data-cap]"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .3, ease: "power2.out" }, .7 + i * .12);
        tl.fromTo(p.querySelector("[data-tape]"), { scaleX: 0 }, { scaleX: 1, duration: .25, ease: "power3.out" }, .8 + i * .12);
      });
    });
    // Phones: the prints are dealt onto the table from the right (each lands askew, then its tape
    // presses on); while swiping, the print in the middle is picked up (straight, full size) and the
    // others rest tilted and slightly smaller (--near, read by the CSS).
    mm.add(MOBILE_MQ, () => {
      const pile = el.querySelector<HTMLElement>("[data-pile]");
      const prints = gsap.utils.toArray<HTMLElement>("[data-paper]", el);
      if (!pile || !prints.length) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: pile, start: "top 85%", once: true } });
      prints.forEach((p, i) => {
        tl.fromTo(p, { x: () => innerWidth * .9, y: 30, "--tilt": `${PILE[i] + 10}deg` }, { x: 0, y: 0, "--tilt": `${REST[i]}deg`, duration: 1.1, ease: "expo.out" }, i * .14);
        tl.fromTo(p.querySelector("[data-cap]"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .6, ease: "power2.out" }, .35 + i * .14);
        tl.fromTo(p.querySelector("[data-tape]"), { scaleX: 0 }, { scaleX: 1, duration: .35, ease: "power3.out" }, .5 + i * .14);
      });
      let raf = 0;
      const focus = () => {
        raf = 0;
        const mid = pile.offsetLeft + pile.scrollLeft + pile.clientWidth / 2; // offsetLeft is relative to .wrap
        prints.forEach((p) => {
          const d = Math.abs(p.offsetLeft + p.offsetWidth / 2 - mid) / p.offsetWidth;
          p.style.setProperty("--near", String(Math.max(0, 1 - d).toFixed(3)));
        });
      };
      const onScroll = () => { if (!raf) raf = requestAnimationFrame(focus); };
      focus();
      pile.addEventListener("scroll", onScroll, { passive: true });
      addEventListener("resize", onScroll);
      return () => {
        cancelAnimationFrame(raf);
        pile.removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll);
        prints.forEach((p) => p.style.removeProperty("--near"));
      };
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [motion], revertOnUpdate: true });

  return (
    <div ref={root} className={s.wrap}>
      <p className={`${s.hint} mono11`} aria-hidden="true">Swipe the stack →</p>
      <ol data-pile="" className={s.pile} aria-label="Certificates">
        {items.map((c, i) => (
          <li key={c.title} data-paper="" className={s.paper} data-tone={c.tone} style={{ "--tilt": `${REST[i]}deg`, zIndex: items.length - i } as React.CSSProperties}>
            <figure className={s.fig}>
              <a href={c.links[0].href} {...ext} className={s.print} aria-label={`${c.title} certificate from ${c.issuer} (PDF, opens in a new tab)`}>
                <span data-tape="" className={s.tape} aria-hidden="true" />
                <Image src={c.img.src} width={c.img.w} height={c.img.h} alt="" sizes="(max-width: 899px) 84vw, (max-width: 1199px) 46vw, 23vw" className={s.img} />
                <span className={`${s.open} mono11`} aria-hidden="true">View certificate ↗</span>
              </a>
              <figcaption data-cap="" className={s.cap}>
                <span className={`${s.meta} mono11`}><span>{c.n} · {c.issuer}</span><span>{c.date}</span></span>
                <span className={s.title}>{c.title}</span>
                {c.detail && <span className={`${s.detail} serif`}>{c.detail}</span>}
                <span className={s.links}>
                  {c.links.map((l) => (
                    <a key={l.href} href={l.href} {...ext} className={`${s.btn} mono`} aria-label={`${c.title}: ${l.label.toLowerCase()} (opens in a new tab)`}>{l.label} ↗</a>
                  ))}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
    </div>
  );
}
