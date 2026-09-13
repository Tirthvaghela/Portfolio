"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, upcomingProjects } from "@/app/data";
import { ArrowUpRight, Lock } from "lucide-react";
import ProjectModal from "./ProjectModal";
import SectionPanel from "./SectionPanel";
import { CategoryIcon, VoiceMark } from "./CategoryIcon";

const categories = ["All", "AI / ML", "Full-Stack", "Web", "Mobile"];
const EASE = [0.16, 1, 0.3, 1] as const;

const rowVariants = {
  hidden: { opacity: 0, x: -20, transition: { duration: 0.16, ease: EASE } },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, delay: Math.min(i, 8) * 0.035, ease: EASE },
  }),
};

export default function Projects() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  const filtered = [...(active === "All" ? projects : projects.filter((p) => p.category === active))]
    .sort((a, b) => Number(b.featured) - Number(a.featured));

  const visibleTeasers = upcomingProjects.filter((p) => active === "All" || active === p.category);

  return (
    <section id="projects" style={{ background: "var(--bg-section)", padding: "var(--space-2xl) 5%" }}>
      <SectionPanel>
        <div className="projects-head">
          <h2 className="projects-heading">PROJECTS</h2>
          <div className="projects-filters" role="group" aria-label="Filter projects by category">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                data-active={active === cat}
                aria-pressed={active === cat}
                className="filter-btn"
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="project-list">
        {visibleTeasers.length > 0 && (
          <div className="teaser-grid">
            <AnimatePresence mode="popLayout">
              {visibleTeasers.map((p) => (
                <motion.div
                  key={`teaser-${p.title}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="teaser-box"
                >
                  <div className="teaser-lock"><Lock size={20} aria-hidden /></div>
                  <h3 className="teaser-title">{p.title}</h3>
                  <span className="teaser-status">
                    <VoiceMark />
                    {p.status}
                  </span>
                  <p className="teaser-tagline">{p.teaserLine}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              variants={rowVariants}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              exit="hidden"
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`View details for ${project.title}`}
              onClick={() => setSelected(project)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(project); } }}
              className="project-row"
            >
              <div className="project-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="project-body">
                <div className="project-head">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-cat">
                    <CategoryIcon category={project.category} />
                    {project.category.toUpperCase()}
                  </span>
                  <ArrowUpRight size={26} className="project-arrow" />
                </div>
                <p className="project-desc">{project.subtitle} — {project.description}</p>
                <div className="project-tech">
                  {project.tech.map((t) => <span key={t} className="tech-tag">{t.toUpperCase()}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        </div>
      </SectionPanel>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />

      <style>{`
        .projects-head { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: var(--space-lg); margin-bottom: var(--space-xl); }
        .projects-heading {
          font-family: var(--font-display); font-weight: 800; text-transform: uppercase;
          font-size: clamp(2rem, 4.2vw, 3.2rem); letter-spacing: -0.01em; line-height: 1; color: var(--text);
        }
        .projects-filters { display: flex; gap: 8px; flex-wrap: wrap; }
        .filter-btn {
          padding: 9px 16px; border: var(--bw) solid var(--text); background: var(--bg);
          color: var(--text); cursor: pointer; font-size: 11px; font-weight: 700; letter-spacing: 0.06em;
          transition: background-color var(--dur-short) var(--ease-out), color var(--dur-short) var(--ease-out), transform var(--dur-short) var(--ease-out), box-shadow var(--dur-short) var(--ease-out);
        }
        .filter-btn[data-active="true"] { background: var(--text); color: var(--bg); }
        @media (hover: hover) and (pointer: fine) {
          .filter-btn:not([data-active="true"]):hover { background: var(--accent); border-color: var(--text); color: var(--accent-ink); transform: translate(-2px, -2px); box-shadow: var(--shadow-hard-sm); }
        }
        .filter-btn:active { transform: translate(0, 0); box-shadow: none; }

        .project-list { border-top: var(--bw) solid var(--text); }
        .project-row {
          display: grid; grid-template-columns: 150px 1fr; gap: var(--space-xl); align-items: start;
          padding: var(--space-xl) 0; border-bottom: var(--bw) solid var(--text); cursor: pointer;
          transition: background-color var(--dur-short) var(--ease-out), color var(--dur-short) var(--ease-out);
        }
        .project-row:hover, .project-row:focus-visible { background: var(--text); color: var(--bg); }
        .project-row:hover .project-cat, .project-row:focus-visible .project-cat { border-color: var(--bg); color: var(--bg); }
        .project-row:hover .tech-tag, .project-row:focus-visible .tech-tag { border-color: var(--bg); color: var(--bg); }
        .project-row:hover .project-desc, .project-row:focus-visible .project-desc { color: var(--bg-alt); }
        .project-row:hover .project-arrow, .project-row:focus-visible .project-arrow { transform: translate(3px, -3px); }
        @media (hover: hover) and (pointer: fine) {
          .project-row:hover .project-num { transform: translateX(4px); }
          .project-row:hover .project-title { transform: translateX(6px); }
        }
        .project-num { font-family: var(--font-mono-face); font-size: clamp(48px, 6vw, 88px); font-weight: 500; line-height: 0.8; color: var(--accent); transition: transform var(--dur-med) var(--ease-out); }
        .project-body { min-width: 0; }
        .project-head { display: flex; align-items: center; gap: var(--space-md); flex-wrap: wrap; margin-bottom: var(--space-sm); }
        .project-title {
          font-family: var(--font-display); font-weight: 800; text-transform: uppercase;
          font-size: clamp(24px, 3.6vw, 40px); letter-spacing: -0.01em; line-height: 1; overflow-wrap: anywhere;
          transition: transform var(--dur-med) var(--ease-out); display: inline-block;
        }
        .project-cat {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: var(--font-mono-face); font-size: 11px; font-weight: 700; letter-spacing: 0.05em;
          border: 1.5px solid currentColor; padding: 3px 10px;
        }
        .project-cat--status { color: var(--accent); border-color: var(--accent); text-transform: uppercase; transition: background-color var(--dur-med) var(--ease-out), color var(--dur-med) var(--ease-out); }
        .project-arrow { margin-left: auto; flex-shrink: 0; transition: transform var(--dur-med) var(--ease-out); }
        .project-desc { font-size: 15px; line-height: 1.7; color: var(--text-muted); margin-bottom: var(--space-md); max-width: 70ch; transition: color var(--dur-short) var(--ease-out); }
        .project-tech { display: flex; flex-wrap: wrap; gap: 8px; }
        .tech-tag { font-family: var(--font-mono-face); font-size: 11px; color: var(--text-muted); border: 1px solid var(--text-muted); padding: 3px 9px; transition: border-color var(--dur-short) var(--ease-out), color var(--dur-short) var(--ease-out); }

        .teaser-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          border-bottom: var(--bw) solid var(--text);
        }
        .teaser-box {
          cursor: default; border-left: var(--bw) solid var(--text);
          padding: var(--space-xl) var(--space-lg); display: flex; flex-direction: column;
          align-items: center; text-align: center; gap: 10px;
          transition: background-color var(--dur-med) var(--ease-out);
        }
        .teaser-box:first-child { border-left: none; }
        .teaser-lock {
          width: 52px; height: 52px; flex-shrink: 0; color: var(--text-faint); margin-bottom: 4px;
          border: 1.5px dashed var(--text-faint); display: flex; align-items: center; justify-content: center;
          transition: border-color var(--dur-med) var(--ease-out), border-style var(--dur-med) var(--ease-out), color var(--dur-med) var(--ease-out);
        }
        .teaser-title {
          font-family: var(--font-display); font-weight: 800; text-transform: uppercase;
          font-size: clamp(20px, 2.4vw, 26px); letter-spacing: -0.01em; line-height: 1.1; color: var(--text);
        }
        .teaser-status {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: var(--font-mono-face); font-size: 11px; font-weight: 700; letter-spacing: 0.05em;
          text-transform: uppercase; color: var(--accent); border: 1.5px solid var(--accent); padding: 3px 10px;
          transition: background-color var(--dur-med) var(--ease-out), color var(--dur-med) var(--ease-out);
        }
        .teaser-tagline { font-size: 14px; color: var(--text-muted); margin-top: 2px; }
        @media (hover: hover) and (pointer: fine) {
          .teaser-box:hover { background: var(--bg-alt); }
          .teaser-box:hover .teaser-lock { border-color: var(--accent); border-style: solid; color: var(--accent); }
          .teaser-box:hover .teaser-status { background: var(--accent); color: var(--accent-ink); }
        }
        @media (max-width: 640px) {
          .project-row { grid-template-columns: 1fr; gap: var(--space-md); }
          .project-num { font-size: 32px; }
          .teaser-grid { grid-template-columns: 1fr; }
          .teaser-box { border-left: none; border-top: var(--bw) solid var(--text); }
          .teaser-box:first-child { border-top: none; }
          .filter-btn { padding: 11px 16px; min-height: 44px; }
        }
      `}</style>
    </section>
  );
}
