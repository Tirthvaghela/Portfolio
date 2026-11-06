import Image from "next/image";
import type { Project } from "@/content/projects";
import { RED, MUST, TEAL } from "@/content/palette";
import { SITE, pad } from "@/content/site";
import Cover from "./Cover";
import s from "./Dialog.module.css";

/** Project case content — shared by the dialog and the /projects/[slug] pages. */
export default function CaseBody({ p, i, rule, titleId, as: H = "h2" }: { p: Project; i: number; rule: string; titleId: string; as?: "h1" | "h2" }) {
  return (
    <div className={s.body}>
      <div data-dlg-in="" className={s.head}>
        <div className={`${s.chips} mono`}>
          <span>{p.cat}</span>
          {p.days ? <span>{p.days} days to build</span> : null}
        </div>
        <H id={titleId} className={s.title}>{p.title}</H>
        <p className={`${s.sub} serif`}>{p.sub}</p>
      </div>
      <div data-dlg-in="" className={s.shot}>
        <div className={s.chrome}><i style={{ background: RED }} /><i style={{ background: MUST }} /><i style={{ background: TEAL }} /></div>
        <div className={s.shotBody}>
          {p.image
            ? <Image src={p.image} alt={`${p.title} screenshot`} fill sizes="100vw" />
            : <Cover i={i} title={p.title} />}
        </div>
      </div>
      <div data-dlg-in="" className={s.cols}>
        <div className={s.colA}>
          <p className={s.desc}>{p.desc}</p>
          <div className={s.stack}>{p.stack.map((t) => <span key={t}>{t}</span>)}</div>
          {p.collab ? <span className={s.with}>Built with <a href={SITE.collaborator} target="_blank" rel="noopener noreferrer">Dhruv Sadrawala</a></span> : null}
          <div className={s.links}>
            {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className={`${s.ink} mono`}>View code on GitHub ↗</a>}
            {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className={`${s.line} mono`}>Live demo ↗</a>}
          </div>
        </div>
        <div className={s.colB}>
          <span className="mono">What I built</span>
          <ol className={s.points}>
            {p.points.map((t, k) => (
              <li key={k} style={{ borderTopColor: rule }}><span className="serif">{pad(k + 1)}</span><span>{t}</span></li>
            ))}
          </ol>
        </div>
      </div>
      {p.pipeline && (
        <div data-dlg-in="" className={s.flow}>
          <span className="mono">System flow</span>
          <ol>
            {p.pipeline.map((x, k) => (
              <li key={k}><span className={s.flowN}>{pad(k + 1)}</span><span className={s.flowL}>{x[0]}</span><span className={s.flowNote}>{x[1]}</span></li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
