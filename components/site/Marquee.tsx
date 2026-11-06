"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { PROJECTS } from "@/content/projects";
import { SKILLS } from "@/content/skills";
import { KEY_PROJECTS } from "@/content/site";
import { useSite } from "./SiteProvider";

const all = SKILLS.flatMap((g) => g[1]);
const names = KEY_PROJECTS.map((p) => p.title).concat(PROJECTS.map((p) => p.title));
const tapeA = all.concat(all), tapeB = names.concat(names);

export default function Marquee() {
  const { motion } = useSite();
  const ref = useRef<HTMLDivElement>(null);

  // Tape A loops xPercent 0→−50 (40s), tape B −50→0 (50s). Scroll velocity skews both
  // (clamp ±16) and multiplies their timeScale (up to ×7); both then ease back.
  useGSAP(() => {
    if (!motion) return;
    const tapes = gsap.utils.toArray<HTMLElement>("[data-tape]").map((t) =>
      t.hasAttribute("data-rev")
        ? gsap.fromTo(t, { xPercent: -50 }, { xPercent: 0, duration: 50, ease: "none", repeat: -1 })
        : gsap.to(t, { xPercent: -50, duration: 40, ease: "none", repeat: -1 })
    );
    ScrollTrigger.create({
      trigger: ref.current, start: "top bottom", end: "bottom top",
      onUpdate: (self) => {
        const v = self.getVelocity();
        gsap.to("[data-skew]", { skewX: gsap.utils.clamp(-16, 16, v / -220), duration: .3, overwrite: true, onComplete: () => { gsap.to("[data-skew]", { skewX: 0, duration: .9, ease: "power3.out" }); } });
        tapes.forEach((tw) => { tw.timeScale(1 + Math.min(6, Math.abs(v) / 500)); gsap.to(tw, { timeScale: 1, duration: 1.2, delay: .1, overwrite: true }); });
      },
    });
  }, { scope: ref, dependencies: [motion], revertOnUpdate: true });

  return (
    <div ref={ref} data-marq="" aria-hidden="true" style={{ position: "relative", zIndex: 4, marginTop: -28, borderRadius: "32px 32px 0 0", background: "#14120f", height: "clamp(220px,24vw,320px)", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: "-5%", right: "-5%", top: "26%", transform: "rotate(-4deg)", background: "var(--red)", color: "#14120f", padding: "18px 0" }}>
        <div data-skew="" style={{ overflow: "hidden" }}>
          <div data-tape="" style={{ display: "flex", width: "max-content" }}>
            {tapeA.map((t, i) => (
              <span key={i} className="disp" style={{ display: "flex", alignItems: "center", gap: 28, paddingRight: 28, fontSize: "clamp(28px,3.4vw,52px)", lineHeight: 1, whiteSpace: "nowrap" }}>
                {t}<span className="serif" style={{ fontSize: ".9em" }}>✳</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: "-5%", right: "-5%", top: "56%", transform: "rotate(3deg)", background: "var(--must)", color: "#14120f", padding: "14px 0" }}>
        <div data-skew="" style={{ overflow: "hidden" }}>
          <div data-tape="" data-rev="" style={{ display: "flex", width: "max-content" }}>
            {tapeB.map((t, i) => (
              <span key={i} className="mono" style={{ display: "flex", alignItems: "center", gap: 24, paddingRight: 24, fontSize: "clamp(14px,1.4vw,20px)", fontWeight: 500, whiteSpace: "nowrap" }}>
                {t}<span>→</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
