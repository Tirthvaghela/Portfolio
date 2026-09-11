"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  /** Reveal through a rising clip boundary in addition to the fade — reserved for major headings. */
  clip?: boolean;
}

export default function FadeIn({ children, delay = 0, direction = "up", clip = false }: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  const offset = reduceMotion || direction === "none" ? {} : direction === "left" ? { x: -24 } : direction === "right" ? { x: 24 } : { y: 20 };
  const clipOffset = clip && !reduceMotion ? { clipPath: "inset(0 0 100% 0)" } : {};

  const variants = {
    hidden: { opacity: 0, ...offset, ...clipOffset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      ...(clip ? { clipPath: "inset(0 0 0% 0)" } : {}),
      transition: reduceMotion
        ? { duration: 0.12 }
        : { duration: clip ? 0.5 : 0.32, delay, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={variants}>
      {children}
    </motion.div>
  );
}
