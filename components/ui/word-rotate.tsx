"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AnimatePresence, motion, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

interface WordRotateProps {
  words: string[]
  duration?: number
  motionProps?: MotionProps
  className?: string
  /** Fraction of the viewport width the longest word is allowed to use before
   * its font-size gets scaled down to fit on one line. */
  maxViewportWidthRatio?: number
}

/** Devanagari (Hindi) and Gujarati blocks get their supplied font; every other
 * script (Latin, Japanese, Korean, ...) inherits the caller's font-family and
 * falls back to the browser's own system font for glyphs it can't render. */
const DEVANAGARI_RANGE = /[ऀ-ॿ]/;
const GUJARATI_RANGE = /[઀-૿]/;
function getScriptClassName(word: string): string | undefined {
  if (DEVANAGARI_RANGE.test(word)) return "font-script-hi"
  if (GUJARATI_RANGE.test(word)) return "font-script-gu"
  return undefined
}

export function WordRotate({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -6 },
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  className,
  maxViewportWidthRatio = 0.86,
}: WordRotateProps) {
  const [index, setIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setReducedMotion(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, duration)
    return () => clearInterval(interval)
  }, [words, duration, reducedMotion])

  // Full-width scripts (CJK/Hangul) can be visually wider per-character than
  // Latin words of the same font-size, and unlike Latin they have no spaces to
  // wrap at — the browser instead breaks mid-word onto a second line. Rather
  // than let that happen, measure the word at its natural (CSS-defined) size
  // and shrink the font just enough to keep it on one line.
  const fitToOneLine = () => {
    const el = textRef.current
    if (!el) return
    el.style.fontSize = ""
    const naturalWidth = el.scrollWidth
    const available = window.innerWidth * maxViewportWidthRatio
    if (naturalWidth > available) {
      const baseSize = parseFloat(getComputedStyle(el).fontSize)
      el.style.fontSize = `${baseSize * (available / naturalWidth)}px`
    }
  }

  useLayoutEffect(() => {
    fitToOneLine()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion ? words[0] : words[index]])

  useEffect(() => {
    window.addEventListener("resize", fitToOneLine)
    return () => window.removeEventListener("resize", fitToOneLine)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Reduced motion: no cycling, just the first word, rendered without the
  // slide/fade transition so nothing moves.
  if (reducedMotion) {
    return (
      <div className={cn(className)}>
        <span ref={textRef} className={cn("inline-block whitespace-nowrap", getScriptClassName(words[0]))}>
          {words[0]}
        </span>
      </div>
    )
  }

  return (
    // The shadow/background/padding classes passed in via `className` must live
    // on this outer box, not on the clipped element below it — an element's own
    // `overflow-hidden` clips its own box-shadow too, which would silently erase
    // it. The inner div is only there to mask the slide transition.
    <div className={cn("inline-block", className)}>
      <div className="overflow-hidden" style={{ paddingBlock: "var(--space-2xs, 4px)" }} aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            ref={textRef}
            className={cn("inline-block whitespace-nowrap", getScriptClassName(words[index]))}
            {...motionProps}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="sr-only">{words[0]}</span>
    </div>
  )
}
