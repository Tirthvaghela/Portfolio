"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { completeIntro } from "@/lib/introSignal";

const FRAME_COUNT = 240;
const SCROLL_VH = 500;
/** Frames play across this fraction of the scroll range; the rest is the reveal crossfade. */
const FRAME_PHASE = 0.8;

/** Desktop frames are 16:9; mobile frames are a separate 9:16-shot set so neither needs cropping. */
const framePath = (i: number, mobile: boolean) =>
  `/${mobile ? "intro-sequence-mobile" : "intro-sequence"}/frame-${String(i).padStart(3, "0")}.jpg`;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
/** Symmetric ease — makes the crossfade read as gradual instead of front-loaded like a UI-snap curve would. */
const smoothstep = (t: number) => t * t * (3 - 2 * t);

export default function ScrollAnimation() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const heroTriggeredRef = useRef(false);
  const isMobileRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [skip, setSkip] = useState(false);

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start start", "end start"],
  });

  const draw = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cw = canvas.width;
    const ch = canvas.height;
    // The mobile set is a clean 9:16 shoot, but real phone screens run taller than
    // that (~19.5:9), so cover-fit would still crop the logo's sides — contain
    // guarantees it's fully visible there. Desktop's source matches its viewports
    // closely enough that edge-to-edge cover is the better look.
    const scale = isMobileRef.current
      ? Math.min(cw / img.naturalWidth, ch / img.naturalHeight)
      : Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  };

  // Every value here is a pure function of the current scroll position, computed the
  // same way whether the user is scrolling down or back up — nothing is latched, so
  // scrolling back always shows the reverse of exactly what scrolling forward showed.
  const applyProgress = (progress: number) => {
    const frameProgress = Math.min(1, progress / FRAME_PHASE);
    const index = Math.round(frameProgress * (FRAME_COUNT - 1));
    if (index !== frameRef.current) {
      frameRef.current = index;
      draw(index);
    }

    const hintFade = 1 - clamp01((frameProgress - 0.92) / 0.08);
    if (hintRef.current) hintRef.current.style.opacity = String(hintFade);

    const revealRaw = clamp01((progress - FRAME_PHASE) / (1 - FRAME_PHASE));
    const revealFade = 1 - smoothstep(revealRaw);
    if (overlayRef.current) {
      overlayRef.current.style.opacity = String(revealFade);
      // Wider than the opacity's own near-zero point on purpose: mobile rubber-band/
      // overscroll bounce can nudge progress back a hair right after landing on Hero,
      // which at a 0.02 cutoff was enough to silently flip this fixed, full-screen,
      // z-index:9999 overlay back to pointer-events:auto — invisible but still eating
      // every click on the navbar underneath. This hysteresis absorbs that jitter
      // while still re-arming for a genuine, deliberate scroll back into the intro.
      overlayRef.current.style.pointerEvents = revealFade <= 0.08 ? "none" : "auto";
    }

    // Hero's entrance plays once, the first time the intro is substantially gone.
    // It never replays on subsequent back-and-forth scrolling near the boundary.
    if (revealFade <= 0.02 && !heroTriggeredRef.current) {
      heroTriggeredRef.current = true;
      completeIntro();
    }
  };

  // Preload frames. The mobile/desktop set is decided once, from the viewport at
  // mount — this mirrors how the rest of the site's breakpoint (768px) behaves and
  // avoids reloading 240 images mid-session over a resize.
  useEffect(() => {
    let cancelled = false;
    let loaded = 0;
    const images: HTMLImageElement[] = [];
    const mobile = window.innerWidth <= 768;
    isMobileRef.current = mobile;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i, mobile);
      img.onload = () => {
        loaded += 1;
        if (i === 1) draw(0);
        if (loaded === FRAME_COUNT && !cancelled) setReady(true);
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, []);

  // Canvas sizing, always full viewport.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      draw(frameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [ready]);

  // Respect reduced-motion: skip the intro takeover entirely.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const reduced = mq.matches;
      setSkip(reduced);
      if (reduced && !heroTriggeredRef.current) {
        heroTriggeredRef.current = true;
        completeIntro();
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!skip) applyProgress(progress);
  });

  // Sync visuals to the real scroll position once loaded (handles reloads mid-page).
  useEffect(() => {
    if (ready && !skip) applyProgress(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, skip]);

  return (
    <>
      <div ref={spacerRef} style={{ height: skip ? 0 : `${SCROLL_VH}vh` }} aria-hidden="true" />
      {!skip && (
        <div ref={overlayRef} className="intro-overlay" aria-hidden="true">
          <canvas ref={canvasRef} className={`intro-canvas ${ready ? "is-ready" : ""}`} />
          <div ref={hintRef} className="intro-scroll-hint">
            <span>Scroll</span>
          </div>
        </div>
      )}

      <style>{`
        .intro-overlay {
          position: fixed; top: 0; left: 0; width: 100vw;
          height: 100vh; height: 100svh;
          z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          background: var(--bg); overflow: hidden;
        }
        .intro-canvas {
          width: 100%; height: 100%; display: block;
          opacity: 0; transition: opacity 0.6s var(--ease-out);
        }
        .intro-canvas.is-ready { opacity: 1; }
        .intro-scroll-hint {
          position: absolute; left: 50%; bottom: var(--space-xl);
          transform: translateX(-50%);
        }
        .intro-scroll-hint span {
          display: block;
          font-family: var(--font-mono); font-size: 12px; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase; color: var(--text-muted);
          animation: intro-hint-in 0.6s var(--ease-out) both;
        }
        @keyframes intro-hint-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .intro-scroll-hint span { animation: none; opacity: 1; }
        }
      `}</style>
    </>
  );
}
