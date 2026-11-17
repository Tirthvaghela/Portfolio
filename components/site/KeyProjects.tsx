"use client";
import { KEY_PROJECTS, pad } from "@/content/site";
import { RED, TEAL, MUST, INK, PAPER } from "@/content/palette";
import Image from "next/image";
import Cover from "./Cover";
import s from "./KeyProjects.module.css";

type CSSVars = React.CSSProperties & Record<`--${string}`, string>;

/** Panel colours per key project: [background, foreground, rule]. */
const COLORS: Record<string, [string, string, string]> = {
  voiceform: [MUST, INK, "rgba(20,18,15,.18)"],
  fileflow: [TEAL, PAPER, "rgba(239,233,220,.25)"],
  projectmind: [RED, INK, "rgba(20,18,15,.2)"],
};

export default function KeyProjects() {
  return (
    <section id="key" aria-labelledby="key-h" data-sheet="" className={`sheet secPad ${s.key}`}>
      <div data-reveal="" className="secHead mono"><span>(02) Key projects</span><span>{pad(KEY_PROJECTS.length)} projects</span></div>
      <h2 id="key-h" data-lines="" className="h2">
        <span className="mask"><span data-line="">Key</span></span>
        <span className={`mask ${s.l2}`}><span data-line="" className="accent">projects</span></span>
      </h2>

      <div className={s.list}>
        {KEY_PROJECTS.map((p, k) => {
          const [bg, fg, rule] = COLORS[p.id];
          const vars: CSSVars = { "--bg": bg, "--fg": fg, "--rule": rule };
          return (
            <article key={p.id} id={`key-${p.id}`} data-reveal="" className={s.panel} data-flip={k % 2 === 1} style={vars} aria-labelledby={`key-${p.id}-t`}>
              <div className={s.top}>
                <div className={s.info}>
                  <div className={s.meta}>
                    <span className={`${s.num} serif`}>{pad(k + 1)}</span>
                    <span className={`${s.status} mono`}>{p.status}</span>
                    <span className={`${s.days} mono`}>{p.days} days to build</span>
                  </div>
                  <h3 id={`key-${p.id}-t`} className={s.title}><span data-scramble="">{p.title}</span></h3>
                  <span className={`${s.cat} mono`}>{p.cat}</span>
                  <p className={`${s.sub} serif`}>{p.sub}</p>
                  <p className={s.desc}>{p.desc}</p>
                  {p.tease && <p className={s.tease}>{p.tease}</p>}
                  <a href={p.github} target="_blank" rel="noopener noreferrer" data-magnetic="" aria-label={`${p.title} source code on GitHub`} className={`${s.code} mono`}>Source code ↗</a>
                </div>
                <div className={s.coverCol}>
                  <div className={s.card}>
                    <div className={s.chrome}>
                      <i style={{ background: RED }} /><i style={{ background: MUST }} /><i style={{ background: TEAL }} />
                      <span>{p.title}</span>
                    </div>
                    <div className={s.shot}><Cover art={p.id} title={p.title} /></div>
                  </div>
                </div>
              </div>
              <div className={s.bottom}>
                <span className={`${s.label} mono`}>Screens</span>
                <ul data-stagger="" className={s.shots} style={{ "--n": String(p.shots.length) } as CSSVars}>
                  {p.shots.map((sh) => (
                    <li key={sh.src}>
                      <a href={encodeURI(sh.src)} target="_blank" rel="noopener noreferrer" data-cursor="View" className={s.shotLink} aria-label={`${p.title}: ${sh.caption} (open full size)`}>
                        <span className={s.card}>
                          <span className={s.chrome} aria-hidden="true">
                            <i style={{ background: RED }} /><i style={{ background: MUST }} /><i style={{ background: TEAL }} />
                            <span>{p.title}</span>
                          </span>
                          <Image src={encodeURI(sh.src)} alt={`${p.title}: ${sh.caption}`} width={sh.w} height={sh.h} sizes={`(min-width: 900px) ${Math.round(90 / p.shots.length)}vw, 100vw`} className={s.shotImg} />
                        </span>
                      </a>
                      <p className={`${s.shotCap} mono11`}>{sh.caption}</p>
                    </li>
                  ))}
                </ul>
                <span className={`${s.label} mono`}>Key features</span>
                <ol data-stagger="" className={s.features}>
                  {p.features.map((f, i) => (
                    <li key={i}><span className={`${s.fn} serif`}>{pad(i + 1)}</span><span>{f}</span></li>
                  ))}
                </ol>
                <span className={`${s.label} mono`}>Technology</span>
                <ul data-stagger="" className={s.tech}>{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
