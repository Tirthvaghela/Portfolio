"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Section reveal — 100% scroll-progress driven, nothing else.
 *
 * One `scrollYProgress` from `useScroll`, spanning exactly one viewport
 * height: 0 the instant the section's top edge touches the viewport's bottom
 * edge (deterministic scroll position — targetTop - viewportHeight — not
 * "has intersected"), 1 once that same edge reaches the viewport's top
 * (targetTop). That raw value is then rescaled by `windowFraction` before
 * being fed to `useTransform`: a section shorter than one viewport height
 * would otherwise still be showing a residual clip/fade well after all of
 * its own content is already sitting fully inside the viewport (this is
 * exactly what was slicing through the Contact button — its panel is ~625px
 * tall against a ~950px viewport, so at the point the panel had "naturally"
 * finished arriving, the raw progress driven by a full viewport-height
 * window was still short of 1). Rescaling makes the reveal complete after
 * exactly `min(viewportHeight, sectionHeight)` of scroll instead of always a
 * full viewport height, while a section taller than the viewport is
 * unaffected (fraction is 1, no rescale). Opacity/position/clip are direct
 * `useTransform`s of that single rescaled value, bound via `style` — no
 * separate exit timeline, no phase state, no IntersectionObserver. Scrolling
 * back up runs the exact same map backward because it's the same value read
 * at a different scroll position, not a second animation.
 */
export default function SectionPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(48);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [windowFraction, setWindowFraction] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px)");
    const apply = () => setOffset(mq.matches ? 22 : 48);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // framer-motion's own useReducedMotion() queries matchMedia("(prefers-reduced-motion)")
  // in boolean context, which reports true regardless of the user's actual preference —
  // check the real query directly instead.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Static layout measurement only (offsetHeight ignores the transform this component
  // itself applies, so it can't be thrown off by its own animation).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWindowFraction(Math.min(1, el.offsetHeight / window.innerHeight));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const progress = useTransform(scrollYProgress, (v) => Math.min(1, v / windowFraction));

  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const y = useTransform(progress, [0, 1], [offset, 0]);
  const clipPercent = useTransform(progress, [0, 1], [100, 0]);
  const clipPath = useTransform(clipPercent, (v) => `inset(0 0 ${v}% 0)`);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ opacity, y, clipPath }}>
      {children}
    </motion.div>
  );
}
