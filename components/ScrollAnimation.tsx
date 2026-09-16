"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { completeIntro, onIntroComplete } from "@/lib/introSignal";
import { WordRotate } from "@/components/ui/word-rotate";
import { Highlighter } from "@/components/ui/highlighter";

/** Welcome (English) → Hindi → Gujarati → four more scripts, in that order. */
const GREETING_WORDS = ["Welcome", "नमस्ते", "સુસ્વાગતમ્", "Bonjour", "Hola", "Ciao", "こんにちは", "안녕하세요"];

const FRAME_COUNT = 240;
const SCROLL_VH = 500;
/** Frames play across this fraction of the scroll range; the rest is the reveal crossfade. */
const FRAME_PHASE = 0.8;

/** Desktop frames are 16:9; mobile frames are a separate 9:16-shot set so neither needs cropping. */
const framePath = (i: number, mobile: boolean) =>
  `/${mobile ? "intro-sequence-mobile" : "intro-sequence"}/frame-${String(i).padStart(3, "0")}.webp`;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
/** Symmetric ease — makes the crossfade read as gradual instead of front-loaded like a UI-snap curve would. */
const smoothstep = (t: number) => t * t * (3 - 2 * t);

export default function ScrollAnimation() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
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
    // that (~19.5:9), so pure cover-fit would crop the logo's sides — contain
    // guarantees it's fully visible there. Desktop's source matches its viewports
    // closely enough that edge-to-edge cover is the better look.
    //
    // Pure contain leaves a visibly large empty margin (~9% of viewport height per
    // side at typical phone widths), because contain sizes for the frame's own
    // rectangle, not the logo drawn inside it — and measuring the actual pixels
    // across all 240 mobile frames, the logo itself never exceeds 88% of the
    // frame's width or 50.3% of its height. That means the true safe scale (where
    // the *logo*, not the frame, would just touch an edge) is contain-scale * 1.13,
    // not contain-scale * 1.0. MOBILE_SAFE_ZOOM uses 1.08 to fill most of that
    // headroom while keeping a buffer for measurement/anti-aliasing slack.
    const MOBILE_SAFE_ZOOM = 1.08;
    const scale = isMobileRef.current
      ? Math.min(cw / img.naturalWidth, ch / img.naturalHeight) * MOBILE_SAFE_ZOOM
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

    // The first ~10 frames are genuinely blank (the logo hasn't animated in yet —
    // motion-blurred fragments only start appearing around frameProgress 0.06), so
    // there's a short, real window to greet before anything else is on screen. Fully
    // visible from the very start (progress 0) — no fade-in ramp, since a delayed
    // appearance would mean the greeting isn't there for the first instant of scroll.
    const greetingFade = 1 - clamp01((frameProgress - 0.02) / 0.025);
    if (greetingRef.current) {
      greetingRef.current.style.opacity = String(greetingFade);
      // A scroll-driven scale-in (not a timed animation) gives the block real physical
      // weight on entry instead of just a flat fade, matching the same directness as
      // everything else this intro does — snap to the current scroll position, no easing
      // that runs on its own once you stop scrolling.
      const scale = 0.8 + 0.2 * greetingFade;
      greetingRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

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

  // Belt-and-suspenders for mobile Chrome/Safari: their address bar animates in/out
  // during a scroll gesture, and the fixed overlay's layout can lag a frame or two
  // behind that live viewport change, briefly exposing real page background at the
  // edge. Matching body's own background to the overlay's for the intro's duration
  // means that gap — even if it can't be fully eliminated — is invisible either way.
  useEffect(() => {
    if (skip) return;
    document.body.style.backgroundColor = "#e8e6e7";
    const unsubscribe = onIntroComplete(() => {
      document.body.style.backgroundColor = "";
    });
    return () => {
      unsubscribe();
      document.body.style.backgroundColor = "";
    };
  }, [skip]);

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
          <div ref={greetingRef} className="intro-greeting">
            <WordRotate words={GREETING_WORDS} duration={2400} className="intro-greeting-word" />
            <p className="intro-greeting-hint">
              Please{" "}
              <Highlighter action="underline" color="#2563EB" strokeWidth={1.5} animationDuration={700} iterations={1} padding={2} isView>
                scroll down
              </Highlighter>
            </p>
          </div>
        </div>
      )}

      <style>{`
        .intro-overlay {
          /* inset:0 (not width/height:100vw/vh) so this always fills whatever the
             browser's CURRENT visible viewport is — mobile browsers resize that as
             their toolbar shows/hides mid-scroll, and a fixed vh/svh value doesn't
             track that live, leaving a strip of the page's own --bg exposed below. */
          position: fixed; inset: 0;
          z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          /* Matches the frame footage's own baked-in background exactly (not var(--bg),
             which is close but not identical) so the canvas's transparent letterbox
             margin is invisible against the drawn frame instead of showing a seam. */
          background: #e8e6e7; overflow: hidden;
        }
        .intro-canvas {
          width: 100%; height: 100%; display: block;
          opacity: 0; transition: opacity 0.6s var(--ease-out);
        }
        .intro-canvas.is-ready { opacity: 1; }
        .intro-greeting {
          position: absolute; left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          display: flex; flex-direction: column; align-items: center; gap: var(--space-md);
        }
        .intro-greeting-word {
          display: inline-block;
          font-family: var(--font-mono-face); font-weight: 700; text-transform: uppercase;
          font-size: clamp(2.4rem, 14vw, 5rem); letter-spacing: -0.01em; line-height: 0.95;
          background: var(--accent); color: var(--accent-ink);
          padding: 0.05em 0.3em; box-decoration-break: clone; -webkit-box-decoration-break: clone;
          box-shadow: 8px 8px 0 0 var(--text);
        }
        .intro-greeting-hint {
          /* rough-notation positions its underline SVG absolutely relative to the
             nearest positioned ancestor of the annotated span — without this, it
             falls back to .intro-greeting further up the tree and lands offset. */
          position: relative;
          display: block; white-space: nowrap;
          font-family: var(--font-mono-face); font-size: 12px; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted);
        }
      `}</style>
    </>
  );
}
