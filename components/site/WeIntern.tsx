"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useSite } from "./SiteProvider";
import { HELP_DESK as HD, WEINTERN as WI, pad, type BuildTask } from "@/content/site";
import s from "./WeIntern.module.css";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const STAGES: [string, string, string][] = [["01", "Learn", "learn"], ["02", "Build", "build"], ["03", "Ship", "ship"]];
const BACKEND = HD.team.filter((m) => m.side === "Backend").length;

/**
 * 01 · WeIntern as a three-stage story — Learn (week 1), Build (week 2), Ship together (Help Desk)
 * — joined by a rail that draws with scroll. Help Desk: launch header with a real preview, a
 * "how it works" path where a ticket marker travels Open → In progress → Resolved with scroll
 * (no pin), and an editorial team roster. All content is in the DOM and readable without JS;
 * GSAP only sets start states when motion is on.
 */
export default function WeIntern() {
  const { motion } = useSite();
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    const el = root.current;
    // The first client render assumes motion on; the boot script's attribute is already final.
    if (!motion || !el || document.documentElement.dataset.motion === "off") return;
    const q = gsap.utils.selector(el);
    const one = (sel: string) => q(sel)[0] as HTMLElement | undefined;

    // Stage path: the arrows between 01 → 02 → 03 draw in after each pill.
    const nav = one("[data-nav]");
    if (nav) {
      gsap.timeline({ scrollTrigger: { trigger: nav, start: "top 90%" } })
        .from(q("[data-nav] a"), { y: 16, opacity: 0, duration: .8, ease: "expo.out", stagger: .18 })
        .fromTo(q("[data-arrow]"), { "--a": 0 }, { "--a": 1, duration: .5, ease: "power2.inOut", stagger: .18 }, .2);
    }

    // The rail draws with scroll; each stage's node lights when the rail reaches it.
    const rail = one("[data-rail]");
    if (rail) gsap.fromTo(q("[data-rail-fill]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: rail, start: "top 70%", end: "bottom 70%", scrub: .4 } });
    q("[data-node]").forEach((head) => ScrollTrigger.create({
      trigger: head, start: "top 70%",
      onEnter: () => head.setAttribute("data-on", ""), onLeaveBack: () => head.removeAttribute("data-on"),
    }));

    // Cards rise in per item (stacked phone layouts never animate off-screen) and fill their tick.
    const rise = (items: HTMLElement[], start = "top 88%") => {
      gsap.set(items, { y: 48, opacity: 0 });
      ScrollTrigger.batch(items, {
        start, once: true,
        onEnter: (b) => {
          gsap.to(b, { y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: .12, overwrite: true });
          (b as HTMLElement[]).forEach((c, k) => {
            const tick = c.dataset.task && el.querySelector(`[data-tick="${c.dataset.task}"]`);
            if (tick) gsap.delayedCall(.15 + k * .12, () => tick.setAttribute("data-on", ""));
          });
        },
      });
    };
    rise(q("[data-task]"));

    // Screenshots wipe up from the bottom while the image settles from a slight zoom.
    q("[data-shot]").forEach((shot) => {
      gsap.timeline({ scrollTrigger: { trigger: shot, start: "top 85%" } })
        .fromTo(shot, { clipPath: "inset(100% 0% 0% 0% round 16px)" }, { clipPath: "inset(0% 0% 0% 0% round 16px)", duration: 1.2, ease: "expo.out" })
        .from(shot.querySelector("img"), { scale: 1.12, duration: 1.4, ease: "expo.out" }, 0);
    });

    // Stage 03: the mustard panel opens from the rail, the recap steps in (solo, solo, five people),
    // and "together" pulls its letters in as you scroll through it.
    const ship = one("[data-ship]");
    if (ship) {
      gsap.timeline({ scrollTrigger: { trigger: ship, start: "top 82%" } })
        .from(ship, { clipPath: "inset(0% 100% 0% 0% round 32px)", duration: 1.2, ease: "expo.inOut" })
        .from(q("[data-recap]"), { y: 36, opacity: 0, duration: .9, ease: "expo.out", stagger: .14 }, "-=.35")
        .from(q("[data-fact]"), { y: 14, opacity: 0, duration: .6, ease: "expo.out", stagger: .06 }, "-=.6");
      gsap.fromTo(q("[data-together]"), { letterSpacing: ".42em", opacity: .35 }, { letterSpacing: "-.03em", opacity: 1, ease: "none", scrollTrigger: { trigger: ship, start: "top 80%", end: "top 25%", scrub: .6 } });
    }

    // Ticket stub: the lifecycle lines rise in order, then the "Live" stamp lands.
    const stub = one("[data-stub]");
    if (stub) {
      gsap.timeline({ scrollTrigger: { trigger: stub, start: "top 80%" } })
        .from(stub, { clipPath: "inset(0% 0% 100% 0% round 28px)", duration: 1, ease: "expo.out" })
        .from(q("[data-stub-part]"), { y: 30, opacity: 0, duration: .8, ease: "expo.out", stagger: .09 }, .2)
        .from(q("[data-stamp]"), { scale: 1.6, rotate: -30, opacity: 0, duration: .6, ease: "power4.out" }, "-=.3");
    }

    // Help Desk sheet opens out to full width as it arrives (the site's rounded-sheet motif).
    const hd = one("[data-hd]");
    if (hd) gsap.fromTo(hd, { clipPath: "inset(0% 5% 0% 5% round 32px)" }, { clipPath: "inset(0% 0% 0% 0% round 32px)", ease: "none", scrollTrigger: { trigger: hd, start: "top bottom", end: "top 35%", scrub: true } });

    // How it works: the ticket marker travels with scroll; each stage lights as the ticket reaches it.
    const flow = one("[data-flow]");
    if (flow) {
      const stages = q("[data-stage]");
      const marks = [0, .5, 1];
      const light = (t: number) => stages.forEach((st, i) => st.toggleAttribute("data-on", t >= marks[i] - .02));
      light(0);
      gsap.fromTo(flow, { "--t": 0 }, {
        "--t": 1, ease: "none",
        scrollTrigger: { trigger: flow, start: "top 70%", end: "bottom 75%", scrub: .5, onUpdate: (st) => light(st.progress) },
      });
      const admin = one("[data-admin]");
      if (admin) ScrollTrigger.create({ trigger: admin, start: "top 80%", onEnter: () => admin.setAttribute("data-on", ""), onLeaveBack: () => admin.removeAttribute("data-on") });
    }

    // Team roster: the connecting line draws down, then each member's row rises onto it.
    const roster = one("[data-roster]");
    if (roster) {
      gsap.fromTo(roster, { "--p": 0 }, { "--p": 1, duration: 1.4, ease: "power3.inOut", scrollTrigger: { trigger: roster, start: "top 80%" } });
      const rows = q("[data-member]");
      gsap.set(rows, { y: 32, opacity: 0 });
      ScrollTrigger.batch(rows, { start: "top 90%", once: true, onEnter: (b) => { gsap.to(b, { y: 0, opacity: 1, duration: .9, ease: "expo.out", stagger: .1, overwrite: true }); } });
    }
  }, { scope: root, dependencies: [motion], revertOnUpdate: true });

  const [learn, build] = WI.stages;
  const [band, ...apps] = build.tasks;

  return (
    <div ref={root} className={s.story}>
      {/* Intro */}
      <header className={s.intro}>
        <div className={`${s.introTop} mono`}>
          <span>01 · Work experience · Internship</span>
          <span className={s.now}><i aria-hidden="true" />{WI.status}</span>
        </div>
        <div className={s.introGrid}>
          <div>
            <h3 data-lines="" className={s.company}><span className="mask"><span data-line="">{WI.company}</span></span></h3>
            <p data-reveal="" className={`${s.role} serif`}>{WI.role}</p>
          </div>
          <div>
            <p data-lines="" className={s.headline}>
              {WI.headline.map((l, i) => (
                <span key={l} className="mask"><span data-line="" className={i === WI.headline.length - 1 ? `accent ${s.acc}` : undefined}>{l}</span></span>
              ))}
            </p>
            <p data-reveal="" className={s.lede}>{WI.lede}</p>
          </div>
        </div>
        <ol data-nav="" className={`${s.nav} mono`} aria-label="Internship stages">
          {STAGES.map(([n, label, id], i) => (
            <li key={id} style={{ "--tone": `var(--${["red", "teal", "must"][i]})` } as React.CSSProperties}>
              <a href={`#wi-${id}`}><b>{n}</b> / {label}</a>
              {i < STAGES.length - 1 && <span data-arrow="" className={s.arrow} aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </header>

      <div data-rail="" className={s.journey}>
        <span className={s.rail} aria-hidden="true"><span data-rail-fill="" className={s.railFill} /></span>

        {/* 01 — Learn */}
        <section id="wi-learn" data-tone="learn" className={s.stage} aria-labelledby="wi-learn-h">
          <StageHead n={learn.n} label={learn.label} week={learn.week} title={learn.title} id={learn.id} count={learn.tasks.length} />
          <ol className={s.tasks}>
            {learn.tasks.map((t, i) => (
              <li key={t.title} data-task={`learn-${i}`} className={s.task}>
                <TaskTop i={i} note={t.note} />
                <h5 className={s.taskTitle}>{t.title}</h5>
                <p className={s.taskDesc}>{t.desc}</p>
                <Points t={t} />
                <div className={s.taskFoot}>
                  <span className={`${s.tech} mono11`}>{t.tech.join(" · ")}</span>
                  <span className={s.taskLinks}><LiveDemo t={t} /><Readme t={t} /></span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 02 — Build */}
        <section id="wi-build" data-tone="build" className={s.stage} aria-labelledby="wi-build-h">
          <StageHead n={build.n} label={build.label} week={build.week} title={build.title} id={build.id} count={build.tasks.length} />
          <ol className={s.builds}>
            <li data-task="build-0" className={s.band}>
              <div className={s.bandHead}>
                <TaskTop i={0} note={band.note} />
                <h5 className={s.taskTitle}>{band.title}</h5>
              </div>
              <div className={s.bandBody}>
                <p className={s.taskDesc}>{band.desc}</p>
                <ul className={s.chips}>{band.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
              <div className={s.bandFoot}>
                <span className={`${s.tech} mono11`}>{band.tech.join(" · ")}</span>
                <span className={s.taskLinks}><LiveDemo t={band} /><Readme t={band} /></span>
              </div>
            </li>
            {apps.map((t, k) => (
              <li key={t.title} data-task={`build-${k + 1}`} data-tone={k ? "must" : "teal"} className={s.app}>
                <TaskTop i={k + 1} note={t.note} />
                <h5 className={s.appTitle}>{t.title}</h5>
                <p className={s.taskDesc}>{t.desc}</p>
                {t.shot && <Shot src={t.shot.src} w={t.shot.w} h={t.shot.h} caption={t.shot.caption} sizes="(max-width: 899px) 92vw, 44vw" />}
                <Points t={t} />
                <span className={`${s.tech} mono11`}>{t.tech.join(" · ")}</span>
                <div className={s.appLinks}>
                  {t.live && <a href={t.live} {...ext} data-magnetic="" className={`${s.liveBtn} mono`} aria-label={`${t.title} live demo (opens in a new tab)`}>Live demo ↗</a>}
                  <Readme t={t} />
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 03 — Ship together */}
        <section id="wi-ship" data-tone="ship" className={s.stage} aria-labelledby="wi-ship-h">
          <ShipHead />

          <article data-hd="" className={s.hd} aria-labelledby="hd-title">
            {/* Launch header */}
            <div className={`${s.hdTop} mono`}>
              <span>{HD.kicker}</span>
              <span className={s.live}><i aria-hidden="true" />{HD.status}</span>
            </div>
            <h5 id="hd-title" data-lines="" className={s.hdTitle}><span className="mask"><span data-line="">{HD.title}</span></span></h5>
            <div className={s.launch}>
              <div className={s.launchCopy}>
                <p className={`${s.hdSub} serif`}>{HD.sub}</p>
                <p className={s.hdDesc}>{HD.desc}</p>
                <div className={s.myRole}>
                  <span className="mono11">My role</span>
                  <span className={s.myRoleText}>{HD.role}</span>
                  <span className={s.myRoleNote}>I led the five-member team; every member owned a part of the build (below).</span>
                </div>
                <div className={s.actions}>
                  <a href={HD.live} {...ext} data-magnetic="" className={`${s.demoBtn} mono`} aria-label="Help Desk live demo (opens in a new tab)">
                    <i aria-hidden="true" />Live demo ↗
                  </a>
                  <a href={HD.repo} {...ext} data-magnetic="" className={`${s.repoBtn} mono`} aria-label="Help Desk GitHub repository (opens in a new tab)">GitHub repository ↗</a>
                </div>
                <p className={`${s.qa} mono11`}>{HD.statusNote} · some live checks are still pending</p>
              </div>
              <TicketStub />
            </div>
            <dl className={s.stack}>
              {HD.stack.map(([k, v]) => <div key={k}><dt className="mono11">{k}</dt><dd>{v}</dd></div>)}
            </dl>

            {/* How it works */}
            <div className={s.how}>
              <div className={s.howHead}>
                <span className={`${s.howLabel} mono`}>How it works</span>
                <h6 className={s.howTitle}>One ticket, <span className={`accent ${s.howAcc}`}>three roles.</span></h6>
                <p className={`${s.howSub} serif`}>Follow a ticket from Open to Resolved.</p>
              </div>
              <div data-flow="" className={s.flow}>
                <div className={s.track} aria-hidden="true">
                  <span className={s.trackFill} />
                  {HD.flow.map((f) => <span key={f.status} className={`${s.station} mono11`}>{f.status}</span>)}
                  <span className={`${s.ticket} mono11`}><i />Ticket</span>
                </div>
                <div className={s.stagesWrap}>
                <span className={s.spine} aria-hidden="true"><span className={`${s.ticket} ${s.ticketV} mono11`}><i />Ticket</span></span>
                <ol className={s.stages}>
                  {HD.flow.map((f) => (
                    <li key={f.status} data-stage="" className={s.flowStage}>
                      <span className={`${s.stageStatus} mono11`}>Status: {f.status}</span>
                      <span className={`${s.who} mono`}>{f.n} · {f.who}</span>
                      <span className={s.flowTitle}>{f.title}</span>
                      <ul className={s.steps}>{f.steps.map((p) => <li key={p}>{p}</li>)}</ul>
                    </li>
                  ))}
                </ol>
                </div>
                <div className={s.adminLinks} aria-hidden="true"><i /><i /><i /></div>
                <div data-admin="" className={s.admin}>
                  <div className={s.adminHead}>
                    <span className={`${s.who} mono`}>{HD.admin.n} · {HD.admin.who} · Every stage</span>
                    <span className={s.flowTitle}>{HD.admin.title}</span>
                  </div>
                  <ul className={s.adminSteps}>{HD.admin.steps.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
              </div>
            </div>
          </article>

          {/* Team */}
          <div className={s.team}>
            <aside className={s.teamSide}>
              <span className={`${s.teamLabel} mono`}>The team · {HD.team.length} members</span>
              <h5 data-lines="" className={s.teamTitle}>
                <span className="mask"><span data-line="">Five people,</span></span>
                <span className="mask"><span data-line="" className={`accent ${s.acc}`}>one help desk.</span></span>
              </h5>
              <div className={s.comp} aria-label={`${BACKEND} backend and ${HD.team.length - BACKEND} frontend members`}>
                {HD.team.map((m, i) => (
                  <span key={m.name} data-side={m.side} data-active={active === i ? "" : undefined} className={`${s.seg} mono11`}>{pad(i + 1)}</span>
                ))}
              </div>
              <div className={`${s.legend} mono11`}>
                <span><i data-side="Backend" />Backend · {BACKEND}</span>
                <span><i data-side="Frontend" />Frontend · {HD.team.length - BACKEND}</span>
              </div>
              <p className={`${s.teamNote} serif`}>One shared product, five clearly owned parts.</p>
            </aside>
            <ol data-roster="" className={s.roster}>
              {HD.team.map((m, i) => (
                <li key={m.name} data-member="" data-active={active === i ? "" : undefined} data-lead={m.lead ? "" : undefined}
                  className={s.member} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                  <div className={s.mRow}>
                    <span className={`${s.marker} mono`} aria-hidden="true">{pad(i + 1)}</span>
                    <button type="button" className={`btn ${s.mName}`} onClick={() => setActive(i)} aria-expanded={active === i} aria-controls={`mem-${i}`}>
                      <span className={s.mNameText}>{m.name}</span>
                      <span className={`${s.mRole} serif`}>{m.role}</span>
                    </button>
                    <span className={s.mTags}>
                      {m.lead && <span className={`${s.leadChip} mono11`}>Team leader</span>}
                      <span className={`${s.sideChip} mono11`} data-side={m.side}>{m.side}</span>
                    </span>
                    <a href={m.github} {...ext} className={`${s.gh} mono`} aria-label={`${m.name} on GitHub (opens in a new tab)`}>GitHub ↗</a>
                  </div>
                  <div id={`mem-${i}`} className={s.mMore}>
                    <div className={s.mInner}><ul className={s.mPoints}>{m.points.map((p) => <li key={p}>{p}</li>)}</ul></div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      <p data-lines="" className={s.closing}>
        <span className="mask"><span data-line="">From individual</span></span>
        <span className="mask"><span data-line="">assignments to</span></span>
        <span className="mask"><span data-line="" className={`accent ${s.acc}`}>building together.</span></span>
      </p>
    </div>
  );
}

function StageHead({ n, label, week, title, id, count }: { n: string; label: string; week: string; title: string; id: string; count: number }) {
  return (
    <header data-node="" className={s.stageHead}>
      <span className={s.node} aria-hidden="true" />
      <div className={`${s.stageMeta} mono`}>
        <span>Stage {n} · {week}</span>
        {count > 1 && (
          <span className={s.ticks} aria-hidden="true">
            {Array.from({ length: count }, (_, i) => <span key={i} data-tick={`${id}-${i}`} className={s.tick} />)}
          </span>
        )}
      </div>
      <h4 id={`wi-${id}-h`} data-lines="" className={s.stageTitle}>
        <span className="mask"><span data-line=""><span className={s.stageN}>{n}</span>{label}</span></span>
      </h4>
      <span className={`${s.stageSub} serif`}>{title}</span>
    </header>
  );
}

/** Stage 03 opener: the journey so far (solo → solo → five people) and the facts of the final project.
 *  "together" draws its letters in as the panel scrolls through (see the useGSAP block). */
function ShipHead() {
  const solo = WI.stages.map((st) => st.tasks.length);
  return (
    <header data-node="" data-ship="" className={s.ship}>
      <span className={`${s.node} ${s.shipNode}`} aria-hidden="true" />
      <div className={`${s.shipTop} mono`}>
        <span>Stage 03 · Final minor project</span>
        <span className={s.shipLive}><i aria-hidden="true" />{HD.status}</span>
      </div>
      <h4 id="wi-ship-h" className={s.shipTitle}>
        <span className={s.shipN}>03</span>Ship <span data-together="" className={`accent ${s.together}`}>together</span>
      </h4>
      <p className={`${s.shipSub} serif`}>From solo assignments to one deployed product, built by five.</p>
      <ol className={s.recap} aria-label="The journey so far">
        <li data-recap=""><span className="mono11">Week 01</span><b>{solo[0]} builds</b><span className="serif">Solo · frontend</span></li>
        <li data-recap=""><span className="mono11">Week 02</span><b>{solo[1]} builds</b><span className="serif">Solo · applications</span></li>
        <li data-recap="" data-now=""><span className="mono11">Final project</span><b>1 product</b><span className="serif">{HD.team.length} people · deployed</span></li>
      </ol>
      <ul className={`${s.facts} mono11`} aria-label="My part">
        <li data-fact="">Team leader</li>
        <li data-fact="">{HD.team.length}-member team</li>
        <li data-fact="">Deployed on Vercel</li>
        <li data-fact="">Backend integration · Admin backend · DevOps</li>
      </ul>
    </header>
  );
}

/** The Help Desk "at a glance" as a ticket stub — typography and CSS only (no screenshot): the real
 *  lifecycle, and counts taken from the README (3 roles, 5 members, frontend + API on Vercel). */
function TicketStub() {
  return (
    <div data-stub="" className={s.stub}>
      <div className={s.stubMain}>
        <div className={`${s.stubTop} mono11`}><span>Help Desk · Ticket lifecycle</span><span>Team 01</span></div>
        <ol className={s.stubLife}>
          {HD.flow.map((f, i) => (
            <li key={f.status} data-stub-part=""><span className="mono11">{pad(i + 1)}</span>{f.status}</li>
          ))}
        </ol>
        <span data-stamp="" className={`${s.stamp} mono`} aria-hidden="true">Live</span>
      </div>
      <div className={s.perf} aria-hidden="true" />
      <dl className={s.stubStats}>
        <div data-stub-part=""><dt className="mono11">Roles</dt><dd data-count="3">3</dd></div>
        <div data-stub-part=""><dt className="mono11">Members</dt><dd data-count={String(HD.team.length)}>{HD.team.length}</dd></div>
        <div data-stub-part=""><dt className="mono11">Vercel projects</dt><dd data-count="2">2</dd></div>
      </dl>
    </div>
  );
}

function Shot({ src, w, h, caption, sizes }: { src: string; w: number; h: number; caption: string; sizes: string }) {
  return (
    <figure className={s.figure}>
      <div data-shot="" className={s.shot}>
        <div className={s.chrome} aria-hidden="true"><i /><i /><i /></div>
        <Image src={src} width={w} height={h} alt={caption} sizes={sizes} className={s.shotImg} />
      </div>
      <figcaption className={`${s.cap} mono11`}>{caption}</figcaption>
    </figure>
  );
}

function TaskTop({ i, note }: { i: number; note?: string }) {
  return (
    <div className={`${s.taskTop} mono11`}>
      <span className={s.taskN}>Task {pad(i + 1)}</span>
      {note && <span className={s.note}>{note}</span>}
    </div>
  );
}

function Points({ t }: { t: BuildTask }) {
  return <ul className={s.points} aria-label={`${t.title} features`}>{t.points.map((p) => <li key={p}>{p}</li>)}</ul>;
}

/** Live demo on a dark card (paper pill); only rendered when the README lists a deployed URL. */
function LiveDemo({ t }: { t: BuildTask }) {
  if (!t.live) return null;
  return <a href={t.live} {...ext} data-magnetic="" className={`${s.liveLight} mono`} aria-label={`${t.title} live demo (opens in a new tab)`}>Live demo ↗</a>;
}

function Readme({ t }: { t: BuildTask }) {
  return <a href={t.readme} {...ext} className={`${s.readme} mono`} aria-label={`${t.title} README on GitHub (opens in a new tab)`}>README ↗</a>;
}
