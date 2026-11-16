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
