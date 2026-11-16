"use client";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useSite } from "./SiteProvider";

/**
 * Page-wide scroll choreography from the reference's initMotion(), scoped to the page root:
 * sheet scaling, [data-reveal] batches, [data-lines] masks, [data-word] fill, [data-count]
 * counters and the contact heading's variable-weight words. Mounted last so every section's
 * own triggers (pins especially) already exist when it sorts and refreshes ScrollTrigger.
 */
export default function ScrollMotion({ scope }: { scope: React.RefObject<HTMLDivElement | null> }) {
  const { motion } = useSite();

  useGSAP(() => {
    if (!motion) { ScrollTrigger.refresh(); return; }

    // Each sheet scales to .94 as the next one slides over it (not #work / #skills).
    const sheets = gsap.utils.toArray<HTMLElement>("[data-sheet]");
    sheets.forEach((sh, i) => {
      const next = sheets[i + 1];
      if (!next || sh.id === "work" || sh.id === "skills") return;
      // The sheet right before the marquee (dark Key projects) doesn't scale: the marquee shares
      // its background and reads as that section's closing band, so there's no edge to reveal.
      if (sh.nextElementSibling?.hasAttribute("data-marq")) return;
      const trigger = next;
      gsap.to(sh, { scale: .94, ease: "none", scrollTrigger: { trigger, start: "top bottom", end: "top 30%", scrub: true } });
    });

    const rev = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    gsap.set(rev, { y: 60, opacity: 0 });
    ScrollTrigger.batch(rev, { start: "top 92%", once: true, onEnter: (b) => { gsap.to(b, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: .08, overwrite: true }); } });

    gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((h) =>
      gsap.from(h.querySelectorAll("[data-line]"), { yPercent: 110, duration: 1.3, ease: "expo.out", stagger: .1, scrollTrigger: { trigger: h, start: "top 85%" } }));

    const words = gsap.utils.toArray<HTMLElement>("[data-word]");
    if (words.length) gsap.fromTo(words, { opacity: .14 }, { opacity: 1, ease: "none", stagger: .05, scrollTrigger: { trigger: "[data-words]", start: "top 85%", end: "bottom 55%", scrub: true } });

    // [data-stagger]: list items inside tall panels (where the panel's own reveal has long finished)
    // rise in as each one arrives; items arriving together (a desktop row) go one after another.
    // Per-item, so stacked mobile layouts never animate off-screen.
    gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((list) => {
      const items = Array.from(list.children) as HTMLElement[];
      gsap.set(items, { y: 24, opacity: 0 });
      ScrollTrigger.batch(items, { start: "top 90%", once: true, onEnter: (b) => { gsap.to(b, { y: 0, opacity: 1, duration: .8, ease: "expo.out", stagger: .07, overwrite: true }); } });
    });

    // [data-progress]: the progress track draws as ONE continuous stroke — completed segment then
    // current segment — and the "you are here" marker appears as the stroke reaches it.
    // Velocity is matched at the joint: segment 1 accelerates (power1.in, end speed 2·d1/t1) and
    // segment 2 decelerates (power3.out, start speed 3·d2/t2), with t2 = 1.5·d2·t1/d1 so the speeds
    // are equal — no stop-and-lurch where the colours meet. d = each segment's share of the track.
    gsap.utils.toArray<HTMLElement>("[data-progress]").forEach((track) => {
      const [s1, s2] = Array.from(track.querySelectorAll<HTMLElement>("[data-seg]"));
      const mark = track.querySelectorAll("[data-mark]");
      if (!s1) return;
      const W = track.offsetWidth || 1, d1 = s1.offsetWidth / W, d2 = s2 ? s2.offsetWidth / W : 0;
      const t1 = .6, t2 = d2 ? Math.max(.2, 1.5 * d2 * t1 / d1) : 0;
      const tl = gsap.timeline({ scrollTrigger: { trigger: track, start: "top 85%" } });
      tl.from(s1, { scaleX: 0, transformOrigin: "0% 50%", duration: t1, ease: "power1.in" });
      if (s2) tl.from(s2, { scaleX: 0, transformOrigin: "0% 50%", duration: t2, ease: "power3.out" });
      tl.from(mark, { opacity: 0, y: 6, duration: .4, ease: "expo.out" }, "-=.06");
    });

    const counts = gsap.utils.toArray<HTMLElement>("[data-count]");
    counts.forEach((el) => {
      const end = +(el.getAttribute("data-count") || 0), o = { v: 0 };
      el.textContent = "0";
      gsap.to(o, { v: end, duration: 1.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%" }, onUpdate: () => { el.textContent = String(Math.round(o.v)); } });
    });

    const cw = gsap.utils.toArray<HTMLElement>("[data-cw]");
    if (cw.length) gsap.fromTo(cw, { fontVariationSettings: "'wght' 200, 'wdth' 75" }, { fontVariationSettings: "'wght' 800, 'wdth' 100", ease: "none", stagger: .25, scrollTrigger: { trigger: "[data-cwords]", start: "top 85%", end: "top 25%", scrub: true } });

    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    let alive = true;
    document.fonts?.ready.then(() => { if (alive) ScrollTrigger.refresh(); });
    return () => {
      alive = false;
      counts.forEach((el) => { el.textContent = el.getAttribute("data-count"); });
    };
  }, { scope, dependencies: [motion], revertOnUpdate: true });

  return null;
}
