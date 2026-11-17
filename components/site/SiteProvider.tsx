"use client";
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { fmtTime } from "@/content/site";

type Ctx = {
  motion: boolean;
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
  // "--:--" on the server: the page is prerendered at build time, so a real time here would be the
  // build's clock baked into the HTML. The browser sets the actual IST time before first paint.
  const [time, setTime] = useState("--:--");
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

  // Live IST clock: set before first paint, then ticks exactly on each minute boundary (IST is
  // UTC+5:30, so its minutes turn with UTC's). Re-syncs when the tab comes back into view, since
  // browsers throttle timers in background tabs.
  useIsoLayoutEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      setTime(fmtTime());
      clearTimeout(id);
      id = setTimeout(tick, 60000 - (Date.now() % 60000) + 50);
    };
    const onVis = () => { if (document.visibilityState === "visible") tick(); };
    tick();
    document.addEventListener("visibilitychange", onVis);
    return () => { clearTimeout(id); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  // Body scroll lock while the loader, menu or dialog is up.
  useEffect(() => {
    document.body.style.overflow = navOpen || dialog >= 0 || loader ? "hidden" : "";
    if (!loader) document.documentElement.removeAttribute("data-loading");
  }, [navOpen, dialog, loader]);

  const openProject = useCallback((i: number) => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setDialog(i);
  }, []);

  const returnFocus = useCallback(() => {
    lastFocus.current?.focus?.({ preventScroll: true });
  }, []);

  return (
    <SiteCtx.Provider value={{ motion, fine, time, dialog, openProject, setDialog, returnFocus, navOpen, setNavOpen, loader, setLoader }}>
      {children}
    </SiteCtx.Provider>
  );
}
