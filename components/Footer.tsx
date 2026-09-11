"use client";
import { useEffect, useState } from "react";

export default function Footer() {
  const [visitors, setVisitors] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visits")
      .then((r) => r.json())
      .then((d) => { if (d.count) setVisitors(d.count); })
      .catch(() => {});
  }, []);

  const links = ["About", "Skills", "Projects", "Experience", "Contact"];

  return (
    <footer className="foot">
      <div className="foot-top">
        <span className="foot-mark">
          TV<span style={{ color: "var(--accent)" }}>.</span>
          <svg className="foot-mark-signal" width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden>
            <rect x="0.5" y="8" width="3" height="5.5" fill="var(--accent)" />
            <rect x="6.5" y="4.5" width="3" height="9" fill="var(--accent)" />
            <rect x="12.5" y="0.5" width="3" height="13" fill="var(--accent)" />
          </svg>
        </span>
        <nav aria-label="Footer" className="foot-links">
          {links.map((l) => (
            <button key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}>
              {l.toUpperCase()}
            </button>
          ))}
        </nav>
      </div>
      <div className="foot-bottom">
        <span>© {new Date().getFullYear()} TIRTH VAGHELA — AHMEDABAD, INDIA</span>
        {visitors !== null && <span>VISITOR #{visitors}</span>}
      </div>

      <style>{`
        .foot { background: var(--footer-bg); border-top: var(--bw-lg) solid var(--accent); padding: var(--space-xl) 5% var(--space-lg); }
        .foot-top { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-lg); padding-bottom: var(--space-lg); border-bottom: 1.5px solid var(--footer-text); }
        .foot-mark { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-display); font-weight: 800; font-size: 26px; letter-spacing: -0.01em; color: #fff; }
        .foot-mark-signal { flex-shrink: 0; }
        .foot-links { display: flex; gap: var(--space-lg); flex-wrap: wrap; }
        .foot-links button {
          position: relative; background: none; border: none; color: var(--footer-text); cursor: pointer;
          font-family: var(--font-mono); font-size: 12px; font-weight: 700; letter-spacing: 0.06em;
          transition: color var(--dur-short) var(--ease-out); min-height: 44px;
        }
        .foot-links button:hover { color: #fff; }
        @media (hover: hover) and (pointer: fine) {
          .foot-links button::after {
            content: ""; position: absolute; left: 0; right: 0; bottom: 14px; height: 1.5px;
            background: var(--accent); transform: scaleX(0); transform-origin: left center;
            transition: transform var(--dur-short) var(--ease-out);
          }
          .foot-links button:hover::after { transform: scaleX(1); }
        }
        .foot-bottom {
          display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px;
          margin-top: var(--space-lg); font-family: var(--font-mono); font-size: 11px; color: var(--footer-text); letter-spacing: 0.04em;
        }
        @media (max-width: 640px) {
          .foot-top { flex-direction: column; align-items: center; text-align: center; }
          .foot-links { justify-content: center; flex-wrap: nowrap; gap: 8px; }
          .foot-links button { font-size: 9.5px; }
          .foot-bottom { flex-direction: column; align-items: center; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
