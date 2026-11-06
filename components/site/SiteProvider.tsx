"use client";
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { MOTION_KEY, fmtTime } from "@/content/site";

type Ctx = {
  motion: boolean;
  toggleMotion: () => void;
  fine: boolean;
  time: string;
  dialog: number;
  openProject: (i: number) => void;
  setDialog: (i: number) => void;
  returnFocus: () => void;
  navOpen: boolean;
  setNavOpen: (v: boolean) => void;
  loader: boolean;
  setLoader: (v: boolean) => void;
};

const SiteCtx = createContext<Ctx | null>(null);
export const useSite = () => {
  const c = useContext(SiteCtx);
  if (!c) throw new Error("useSite outside SiteProvider");
  return c;
};

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function SiteProvider({ children }: { children: React.ReactNode }) {
  // Server render assumes motion on (+ loader); the <head> boot script has already set
  // html[data-motion] and CSS hides the loader when off, so there is no visible flash.
  const [motion, setMotion] = useState(true);
  const [loader, setLoader] = useState(true);
  const [fine, setFine] = useState(false);
  const [time, setTime] = useState(fmtTime);
  const [dialog, setDialog] = useState(-1);
  const [navOpen, setNavOpen] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);

  useIsoLayoutEffect(() => {
    const on = document.documentElement.getAttribute("data-motion") !== "off";
    setMotion(on);
    if (!on) setLoader(false);
    const mq = matchMedia("(pointer: fine)");
    setFine(mq.matches);
    const onMq = () => setFine(mq.matches);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  // Live IST clock, refreshed every 20s.
  useEffect(() => {
    const first = setTimeout(() => setTime(fmtTime()), 0);
    const id = setInterval(() => setTime(fmtTime()), 20000);
    return () => { clearTimeout(first); clearInterval(id); };
  }, []);

  // Body scroll lock while the loader, menu or dialog is up.
  useEffect(() => {
    document.body.style.overflow = navOpen || dialog >= 0 || loader ? "hidden" : "";
    if (!loader) document.documentElement.removeAttribute("data-loading");
  }, [navOpen, dialog, loader]);

  const toggleMotion = useCallback(() => {
    setMotion((m) => {
      const next = !m;
      try { localStorage.setItem(MOTION_KEY, next ? "on" : "off"); } catch {}
      document.documentElement.setAttribute("data-motion", next ? "on" : "off");
      return next;
    });
    setLoader(false);
  }, []);

  const openProject = useCallback((i: number) => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setDialog(i);
  }, []);

  const returnFocus = useCallback(() => {
    lastFocus.current?.focus?.({ preventScroll: true });
  }, []);

  return (
    <SiteCtx.Provider value={{ motion, toggleMotion, fine, time, dialog, openProject, setDialog, returnFocus, navOpen, setNavOpen, loader, setLoader }}>
      {children}
    </SiteCtx.Provider>
  );
}
