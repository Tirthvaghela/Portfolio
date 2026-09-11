"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const links = ["About", "Skills", "Projects", "Experience", "Contact"];
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("About");
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const total = document.documentElement.scrollHeight - window.innerHeight;
          setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
          setScrolled(window.scrollY > 8);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: "-100px 0px -70% 0px", threshold: 0 };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActive(id.charAt(0).toUpperCase() + id.slice(1));
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    links.forEach((link) => {
      const el = document.getElementById(link.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (id: string) => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>

      <header className="slab" data-scrolled={scrolled}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="slab-mark" aria-label="Back to top">
          TV<span style={{ color: "var(--accent)" }}>.</span>
        </button>

        <nav aria-label="Primary" className="slab-links">
          <ul>
            {links.map((l) => (
              <li key={l} className="slab-link-item">
                <button onClick={() => handleNav(l)} data-active={active === l} aria-current={active === l ? "true" : undefined}>
                  {l}
                </button>
                {active === l && (
                  <motion.span
                    layoutId="nav-underline"
                    className="slab-underline"
                    transition={{ duration: 0.28, ease: EASE }}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="slab-actions">
          <button onClick={toggle} aria-label="Toggle theme" className="slab-icon-btn">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                className="slab-icon-swap"
                initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <a href="/TV_Resume.pdf" download className="slab-cta">Résumé</a>
        </div>

        <button onClick={() => setOpen(!open)} className="slab-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="slab-progress" style={{ width: `${progress}%` }} />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="slab-sheet"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <ul>
              {links.map((l, i) => (
                <motion.li
                  key={l}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22, delay: 0.04 * i, ease: EASE }}
                >
                  <button onClick={() => handleNav(l)} data-active={active === l} aria-current={active === l ? "true" : undefined}>
                    {l}
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="slab-sheet-foot">
              <button onClick={toggle} className="slab-sheet-action">
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />} {theme === "dark" ? "LIGHT MODE" : "DARK MODE"}
              </button>
              <a href="/TV_Resume.pdf" download className="slab-sheet-action">RÉSUMÉ</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .skip-link {
          position: fixed; top: -100px; left: var(--space-md); z-index: 500;
          background: var(--text); color: var(--bg); padding: 10px 18px;
          font-size: 13px; font-weight: 700; text-decoration: none;
          transition: top var(--dur-short) var(--ease-out);
        }
        .skip-link:focus { top: var(--space-md); }

        .slab {
          position: fixed; top: 0; left: 0; right: 0; height: var(--nav-h); z-index: 200;
          display: flex; align-items: center; gap: var(--space-lg);
          padding: 0 5%; background: var(--nav-bg); border-bottom: var(--bw) solid var(--text);
          transition: box-shadow var(--dur-med) var(--ease-out);
        }
        .slab[data-scrolled="true"] { box-shadow: 0 4px 0 0 var(--border); }
        .slab-mark {
          background: none; border: none; cursor: pointer; color: var(--text);
          font-family: var(--font-display); font-weight: 800; font-size: 22px; letter-spacing: -0.5px;
          flex-shrink: 0;
        }
        .slab-links { margin-left: var(--space-lg); flex: 1; min-width: 0; }
        .slab-links ul { display: flex; gap: var(--space-lg); list-style: none; flex-wrap: wrap; }
        .slab-link-item { position: relative; }
        .slab-links button {
          position: relative; background: none; border: none; cursor: pointer; padding: 4px 0;
          font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--text-faint); border-bottom: 3px solid transparent;
          transition: color var(--dur-short) var(--ease-out);
        }
        .slab-links button:hover { color: var(--text); }
        .slab-links button[data-active="true"] { color: var(--text); }
        .slab-underline { position: absolute; left: 0; right: 0; bottom: -3px; height: 3px; background: var(--accent); }
        @media (hover: hover) and (pointer: fine) {
          .slab-links button:not([data-active="true"])::after {
            content: ""; position: absolute; left: 0; right: 0; bottom: -3px; height: 3px;
            background: var(--border); transform: scaleX(0); transform-origin: left center;
            transition: transform var(--dur-short) var(--ease-out);
          }
          .slab-links button:not([data-active="true"]):hover::after { transform: scaleX(1); }
        }
        .slab-actions { display: flex; align-items: center; gap: var(--space-sm); flex-shrink: 0; }
        .slab-icon-btn {
          width: 38px; height: 38px; border: var(--bw) solid var(--text); background: var(--bg);
          display: flex; align-items: center; justify-content: center; color: var(--text); cursor: pointer;
          overflow: hidden;
          transition: background-color var(--dur-short) var(--ease-out), color var(--dur-short) var(--ease-out);
        }
        .slab-icon-btn:hover { background: var(--text); color: var(--bg); }
        .slab-icon-swap { display: flex; align-items: center; justify-content: center; }
        .slab-cta {
          background: var(--accent); color: var(--accent-ink); border: var(--bw) solid var(--text);
          padding: 9px 20px; font-size: 13px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase;
          text-decoration: none; white-space: nowrap;
          transition: transform var(--dur-short) var(--ease-out), box-shadow var(--dur-short) var(--ease-out);
        }
        .slab-cta:hover { transform: translate(-2px, -2px); box-shadow: var(--shadow-hard-sm); }
        .slab-cta:active { transform: translate(0, 0); box-shadow: none; }
        .slab-toggle { display: none; background: none; border: none; cursor: pointer; color: var(--text); }
        .slab-progress { position: absolute; left: 0; bottom: -3px; height: 3px; background: var(--accent); transition: width 0.1s linear; }

        .slab-sheet {
          display: none;
        }

        @media (max-width: 860px) {
          .slab-links, .slab-actions { display: none; }
          .slab-toggle { display: flex; align-items: center; justify-content: center; margin-left: auto; width: 40px; height: 40px; }
          .slab-sheet {
            display: block; position: fixed; inset: var(--nav-h) 0 0 0; z-index: 199;
            background: var(--bg); padding: var(--space-xl) 6%; overflow-y: auto;
          }
          .slab-sheet ul { list-style: none; }
          .slab-sheet button[data-active] {
            display: block; width: 100%; text-align: left; background: none; border: none;
            font-family: var(--font-display); font-size: 15vw; font-weight: 800; letter-spacing: -0.02em;
            text-transform: uppercase; line-height: 1.05;
            padding: 14px 0; border-bottom: var(--bw) solid var(--text);
            color: var(--text-faint); cursor: pointer;
          }
          .slab-sheet button[data-active="true"] { color: var(--text); }
          .slab-sheet-foot { margin-top: var(--space-2xl); display: flex; flex-direction: column; gap: var(--space-md); }
          .slab-sheet-action {
            display: flex; align-items: center; gap: var(--space-sm); min-height: 44px;
            background: none; border: none; color: var(--text-muted); font-size: 14px; font-weight: 700;
            letter-spacing: 0.04em; text-decoration: none; cursor: pointer;
          }
        }
      `}</style>
    </>
  );
}
