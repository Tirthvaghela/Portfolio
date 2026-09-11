"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { completeIntro } from "@/lib/introSignal";

const FRAME_COUNT = 240;
const SCROLL_VH = 500;
/** Frames play across this fraction of the scroll range; the rest is the reveal crossfade. */
const FRAME_PHASE = 0.8;

const framePath = (i: number) => `/intro-sequence/frame-${String(i).padStart(3, "0")}.jpg`;
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
    // Portrait/mobile viewports are far narrower than the source frames, so covering
    // the canvas (scaling to the larger ratio) would crop the logo off both edges.
    // Contain (the smaller ratio) keeps the whole frame visible there; wide/desktop
    // viewports keep the immersive edge-to-edge cover fit.
    const isPortrait = ch > cw;
    const scale = isPortrait
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
      overlayRef.current.style.pointerEvents = revealFade <= 0.02 ? "none" : "auto";
    }

    // Hero's entrance plays once, the first time the intro is substantially gone.
    // It never replays on subsequent back-and-forth scrolling near the boundary.
    if (revealFade <= 0.02 && !heroTriggeredRef.current) {
      heroTriggeredRef.current = true;
      completeIntro();
    }
  };

  // Preload frames.
  useEffect(() => {
    let cancelled = false;
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i);
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
