"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { GLYPHS } from "@/content/site";
import { MUST } from "@/content/palette";
import { useSite } from "./SiteProvider";

type Scr = HTMLElement & { _s?: boolean };

function scramble(el: Scr) {
  if (el._s) return; el._s = true;
  const orig = el.getAttribute("data-text") || el.textContent || ""; el.setAttribute("data-text", orig);
  let f = 0; const total = orig.length * 2 + 8;
  const tick = () => {
    el.textContent = orig.split("").map((ch, i) => ch === " " ? " " : (i < f / 2 - 3 ? ch : GLYPHS[Math.random() * GLYPHS.length | 0])).join("");
    if (++f <= total) requestAnimationFrame(tick); else { el.textContent = orig; el._s = false; }
  };
  tick();
}

/**
 * Micro-interactions: cursor follower (+ "Open" disc over [data-cursor]), magnetic buttons,
 * reel-cover tilt toward the pointer, and text scramble — hover on fine pointers; on touch,
 * scramble fires on tap and buttons get a press scale. All off when Motion is off.
 */
export default function Micro() {
  const { motion, fine } = useSite();
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!motion) return;
    const c = cursorRef.current;
    const ring = c?.querySelector<HTMLElement>("[data-cur-ring]"), label = c?.querySelector<HTMLElement>("[data-cur-label]");
    let qx: ((v: number) => void) | null = null, qy: ((v: number) => void) | null = null;
    let lastMag: HTMLElement | null = null, lastTilt: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      if (!fine || e.pointerType !== "mouse") return;
      if (c) {
        if (!qx) { qx = gsap.quickTo(c, "x", { duration: .45, ease: "power3" }); qy = gsap.quickTo(c, "y", { duration: .45, ease: "power3" }); }
        qx(e.clientX); qy!(e.clientY);
      }
      const t = e.target as Element;
      const m = t.closest?.<HTMLElement>("[data-magnetic]");
      if (m) { const b = m.getBoundingClientRect(); gsap.to(m, { x: (e.clientX - b.left - b.width / 2) * .3, y: (e.clientY - b.top - b.height / 2) * .3, duration: .4, ease: "power3.out" }); lastMag = m; }
      else if (lastMag) { gsap.to(lastMag, { x: 0, y: 0, duration: .9, ease: "elastic.out(1,.35)" }); lastMag = null; }
      const box = t.closest?.<HTMLElement>("[data-panel]");
      const tilt = box?.querySelector<HTMLElement>("[data-tilt]");
      if (box && tilt && matchMedia("(min-width: 900px)").matches) {
        const b = box.getBoundingClientRect();
        gsap.to(tilt, { rotateY: ((e.clientX - b.left) / b.width - .5) * 14, rotateX: -((e.clientY - b.top) / b.height - .5) * 10, duration: .6, ease: "power3.out" });
        if (lastTilt && lastTilt !== tilt) gsap.to(lastTilt, { rotateY: 0, rotateX: 0, duration: 1 });
        lastTilt = tilt;
      } else if (lastTilt) { gsap.to(lastTilt, { rotateY: 0, rotateX: 0, duration: 1, ease: "power3.out" }); lastTilt = null; }
    };

    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (e.type === "pointerover") { const sc = (e.target as Element).closest?.<Scr>("[data-scramble]"); if (sc) scramble(sc); }
      if (!ring || !label || !fine) return;
      const el = (e.type === "pointerover" ? e.target : e.relatedTarget) as Element | null;
      const act = el?.closest?.("a,button,input,textarea");
      const lab = !act && el?.closest?.("[data-cursor]");
      let size = 36, bg = "transparent", txt = "";
      if (lab) { size = 96; bg = MUST; txt = lab.getAttribute("data-cursor") || ""; } else if (act) { size = 64; bg = "rgba(233,196,92,.18)"; }
      Object.assign(ring.style, { width: size + "px", height: size + "px", left: -size / 2 + "px", top: -size / 2 + "px", background: bg });
      label.textContent = txt;
    };

    // Touch: scramble on tap, press scale on buttons/links.
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const t = e.target as Element;
      const sc = t.closest?.<Scr>("[data-scramble]"); if (sc) scramble(sc);
      const btn = t.closest?.<HTMLElement>("[data-magnetic], button");
      if (btn && !btn.closest("[data-panel]")) gsap.to(btn, { scale: .94, duration: .15, ease: "power2.out" });
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const btn = (e.target as Element).closest?.<HTMLElement>("[data-magnetic], button");
      if (btn) gsap.to(btn, { scale: 1, duration: .6, ease: "elastic.out(1,.4)" });
    };

    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOver);
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointercancel", onUp, { passive: true });
    return () => {
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver); document.removeEventListener("pointerout", onOver);
      document.removeEventListener("pointerdown", onDown); document.removeEventListener("pointerup", onUp); document.removeEventListener("pointercancel", onUp);
      if (lastMag) gsap.set(lastMag, { x: 0, y: 0 });
      if (lastTilt) gsap.set(lastTilt, { rotateY: 0, rotateX: 0 });
    };
  }, [motion, fine]);

  return (
    <div ref={cursorRef} aria-hidden="true" style={{ position: "fixed", left: 0, top: 0, zIndex: 200, pointerEvents: "none", display: fine && motion ? "block" : "none", width: 0, height: 0 }}>
      <div data-cur-ring="" style={{ position: "absolute", left: -18, top: -18, width: 36, height: 36, borderRadius: "50%", border: "1.5px solid var(--must)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "width .35s var(--ease),height .35s var(--ease),left .35s var(--ease),top .35s var(--ease),background .3s" }}>
        <span data-cur-label="" className="mono" style={{ fontWeight: 500, color: "#14120f" }} />
      </div>
    </div>
  );
}
