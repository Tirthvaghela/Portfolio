"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Mobile = narrower than 900px or shorter than 680px (same split as the reference's gsap.matchMedia). */
export const DESKTOP_MQ = "(min-width: 900px) and (min-height: 680px)";
export const MOBILE_MQ = "(max-width: 899px), (max-height: 679px)";
export const isMobileNow = () => typeof window !== "undefined" && window.matchMedia(MOBILE_MQ).matches;

export { gsap, ScrollTrigger, useGSAP };
