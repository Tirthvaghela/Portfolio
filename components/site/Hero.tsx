"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, isMobileNow } from "@/lib/gsap";
import { MOTION_KEY } from "@/content/site";
import { bricolage } from "@/app/fonts";
import { CLAIMS } from "@/content/projects";
import { RED, TEAL, MUST, INK } from "@/content/palette";
import { useSite } from "./SiteProvider";
import s from "./Hero.module.css";

const VS = "attribute vec2 p;varying vec2 vUv;void main(){vUv=p*.5+.5;gl_Position=vec4(p,0.,1.);}";
/* Fragment shader — verbatim from the reference's initHeroGL(). */
const FS = `precision highp float;
uniform sampler2D uTex;uniform vec2 uRes;uniform float uT;uniform float uZoom;uniform vec2 uFocus;uniform float uIntro;uniform float uWarp;uniform float uFill;uniform vec3 uP[16];
varying vec2 vUv;
float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
void main(){
  vec2 asp=vec2(uRes.x/uRes.y,1.);
  vec2 off=vec2(0.);float s=0.;
  for(int i=0;i<16;i++){vec3 q=uP[i];vec2 d=(vUv-q.xy)*asp;float l=length(d);float k=q.z*exp(-l*l*22.);off+=normalize(d+1e-5)*k*.05/asp+vec2(sin(l*46.-uT*7.),cos(l*46.-uT*7.))*k*.01;s+=k;}
  off+=vec2(sin(vUv.y*12.+uT*1.2),cos(vUv.x*9.+uT*.9))*(.0022+uWarp*.02);
  float it=1.-uIntro;off.y+=it*it*.35*(.5+.5*sin(vUv.x*20.));off.x+=it*.05*sin(vUv.y*30.+uT*3.);
  vec2 uv=uFocus+(vUv-uFocus)/uZoom+off/uZoom;
  float ca=.0035+s*.028+uWarp*.02+it*.04;
  float r=texture2D(uTex,uv+vec2(ca,0.)).a;float g=texture2D(uTex,uv).a;float b=texture2D(uTex,uv-vec2(ca,ca*.4)).a;
  vec3 col=vec3(.078,.071,.059);
  col=mix(col,vec3(.86,.34,.25),clamp(r-g,0.,1.));
  col=mix(col,vec3(.17,.52,.48),clamp(b-g,0.,1.));
  col=mix(col,vec3(.937,.914,.863),g);
  col+=(h(vUv*uRes+fract(uT)*91.)-.5)*.07*(1.-uFill);
  col=mix(col,vec3(.937,.914,.863),uFill);
  gl_FragColor=vec4(col,1.);
}`;

let loaderPlayed = false;

export default function Hero() {
  const { motion, fine, time, loader, setLoader, openProject } = useSite();
  const scope = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const hfx = useRef({ intro: 1 });
  // While the loader fully covers the hero, the shader only needs one frame; the per-frame
  // loop starts the moment the loader's columns begin to wipe away.
  const covered = useRef(true);
  const motionRef = useRef(motion);
  const fineRef = useRef(fine);
  const [glOk, setGlOk] = useState(true);
  useEffect(() => { motionRef.current = motion; fineRef.current = fine; }, [motion, fine]);

  /* Loader → hero intro (one timeline, exactly the reference's ordering). */
  useGSAP(() => {
    if (!motion) { hfx.current.intro = 1; covered.current = false; return; }
    // Returning visitors (flag set by the boot script) skip the loader entirely.
    const returning = document.documentElement.hasAttribute("data-noloader");
    if (returning && loader) setLoader(false);
    const runLoader = loader && !loaderPlayed && !returning;
    const tl = gsap.timeline();
    let safety: ReturnType<typeof setTimeout> | undefined;
    if (runLoader) {
      loaderPlayed = true;
      try { localStorage.setItem(`${MOTION_KEY}:seen`, "1"); } catch {}
      // Phones get the same sequence at roughly half length (~1.7s instead of ~3.4s).
      const k = isMobileNow() ? .5 : 1;
      safety = setTimeout(() => { if (tl.progress() < 1) tl.progress(1); setLoader(false); }, 4200 * k);
      const o = { v: 0 };
      tl.to(o, { v: 100, duration: 1.6 * k, ease: "power3.inOut", onUpdate: () => { if (countRef.current) countRef.current.textContent = String(Math.round(o.v)).padStart(3, "0"); } });
      tl.to("[data-lt]", { yPercent: -110, duration: .5 * k, ease: "power3.in", stagger: .04 * k });
      tl.to("[data-lbg]", { opacity: 0, duration: .01 });
      tl.call(() => { covered.current = false; });
      tl.to("[data-lc]", { yPercent: -100, duration: 1 * k, ease: "expo.inOut", stagger: .07 * k });
      tl.add(() => setLoader(false));
    }
    if (!runLoader) covered.current = false;
    const at = runLoader ? `-=${.75 * (isMobileNow() ? .5 : 1)}` : 0;
    tl.fromTo(hfx.current, { intro: 0 }, { intro: 1, duration: 2.2, ease: "expo.out" }, at);
    tl.from("[data-hov]", { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: .1 }, "<0.6");
    return () => { if (safety) clearTimeout(safety); };
  }, { scope, dependencies: [motion], revertOnUpdate: true });

  /* WebGL liquid name — port of initHeroGL(). */
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const gl = cv.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) { setGlOk(false); return; }
    const sh = (t: number, src: string) => {
      const o = gl.createShader(t)!; gl.shaderSource(o, src); gl.compileShader(o);
      if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(o);
      return o;
    };
    let pr: WebGLProgram;
    try {
      pr = gl.createProgram()!; gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
    } catch (e) { console.warn(e); setGlOk(false); return; }
    gl.useProgram(pr);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(pr, n);
    const u = { res: U("uRes"), t: U("uT"), zoom: U("uZoom"), focus: U("uFocus"), intro: U("uIntro"), warp: U("uWarp"), fill: U("uFill"), p: U("uP") };
    const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    const tc = document.createElement("canvas"), tx = tc.getContext("2d", { willReadFrequently: true })!;
    const FF = bricolage.style.fontFamily;
    const focus = [.5, .5];
    let dirty = true;

    const draw = () => {
      // Desktop DPR max 2; mobile capped at 1.5.
      const cap = matchMedia("(max-width: 899px)").matches || !fineRef.current ? 1.5 : 2;
      const dpr = Math.min(cap, devicePixelRatio || 1), W = Math.max(1, Math.round(cv.clientWidth * dpr)), H = Math.max(1, Math.round(cv.clientHeight * dpr));
      cv.width = W; cv.height = H; tc.width = W; tc.height = H; gl.viewport(0, 0, W, H);
      tx.clearRect(0, 0, W, H); tx.fillStyle = "#fff"; tx.textBaseline = "alphabetic";
      try { (tx as CanvasRenderingContext2D & { fontStretch: string }).fontStretch = "condensed"; } catch {}
      const pad = W * (W < 700 * dpr ? .045 : .03), lines = ["TIRTH", "VAGHELA"];
      tx.font = `800 100px ${FF}`;
      let sizes = lines.map((l) => 100 * (W - pad * 2) / tx.measureText(l).width);
      const total = sizes.reduce((a, b) => a + b * .8, 0), maxH = H * (W < 700 * dpr ? .5 : .66), k = Math.min(1, maxH / total);
      sizes = sizes.map((sz) => sz * k);
      let y = H * .5 - (sizes[0] * .8 + sizes[1] * .8) / 2 - H * .03;
      lines.forEach((l, i) => { tx.font = `800 ${sizes[i]}px ${FF}`; const w = tx.measureText(l).width; y += sizes[i] * .8; tx.fillText(l, (W - w) / 2, y); });
      gl.bindTexture(gl.TEXTURE_2D, tex); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tc);
      // Auto-find a focus point inside the first letter's ink for the scroll dive.
      // Same search as the reference, but only the pixels it can reach are read back
      // (a full-viewport getImageData at 2× DPR was the biggest main-thread cost).
      const cx = Math.round(W / 2), cy = Math.round(H * .5 - sizes[1] * .4), R = Math.ceil(Math.min(W, H) * .25) + 1;
      const x0 = Math.max(0, cx - R), y0 = Math.max(0, cy - R), rw = Math.min(W, cx + R + 1) - x0, rh = Math.min(H, cy + R + 1) - y0;
      const d = tx.getImageData(x0, y0, Math.max(1, rw), Math.max(1, rh)).data;
      let best: number[] | null = null;
      for (let r = 0; r < Math.min(W, H) * .25 && !best; r += 3) for (let a = 0; a < 6.283 && !best; a += .25) {
        const x = Math.round(cx + Math.cos(a) * r), yy = Math.round(cy + Math.sin(a) * r);
        if (x >= 0 && yy >= 0 && x < W && yy < H && d[((yy - y0) * rw + (x - x0)) * 4 + 3] > 200) best = [x, yy];
      }
      if (best) {
        // Centre the focus inside the letter's stroke (not on its edge), so the dive lands
        // on solid letter instead of a half-ink, half-fringe blur.
        const ink = (x: number, y: number) => x >= x0 && y >= y0 && x < x0 + rw && y < y0 + rh && d[((y - y0) * rw + (x - x0)) * 4 + 3] > 200;
        const run = (x: number, y: number, dx: number, dy: number) => { let a = 0, b = 0; while (ink(x - (a + 1) * dx, y - (a + 1) * dy)) a++; while (ink(x + (b + 1) * dx, y + (b + 1) * dy)) b++; return (b - a) / 2; };
        let [bx, by] = best;
        bx = Math.round(bx + run(bx, by, 1, 0));
        by = Math.round(by + run(bx, by, 0, 1));
        bx = Math.round(bx + run(bx, by, 1, 0));
        if (ink(bx, by)) best = [bx, by];
        focus[0] = best[0] / W; focus[1] = 1 - best[1] / H;
      }
      gl.uniform2f(u.res, W, H);
      dirty = true;
    };

    const pts = new Float32Array(48); let head = 0; let last: number[] | null = null;
    const push = (x: number, y: number, z: number) => { pts[head * 3] = x; pts[head * 3 + 1] = y; pts[head * 3 + 2] = z; head = (head + 1) % 16; };
    const box = cv.parentElement!;
    const at = (cx: number, cy: number) => { const b = box.getBoundingClientRect(); return [(cx - b.left) / b.width, 1 - (cy - b.top) / b.height]; };
    const moveTo = (cx: number, cy: number) => {
      const [x, y] = at(cx, cy); if (x < 0 || x > 1 || y < 0 || y > 1) return;
      const sp = last ? Math.hypot(x - last[0], y - last[1]) : 0; last = [x, y];
      if (motionRef.current) push(x, y, Math.min(1.6, .25 + sp * 28));
    };
    const move = (e: PointerEvent) => moveTo(e.clientX, e.clientY);
    // Touch: the browser takes the pointer for vertical panning, so follow touchmove too.
    const tmove = (e: TouchEvent) => { const t = e.touches[0]; if (t) moveTo(t.clientX, t.clientY); };
    const click = (e: PointerEvent) => {
      if ((e.target as Element).closest?.("a,button")) return;
      if (!motionRef.current) return;
      const [x, y] = at(e.clientX, e.clientY);
      for (let i = 0; i < 3; i++) push(x, y, 2.6);
    };
    addEventListener("pointermove", move, { passive: true });
    box.addEventListener("touchmove", tmove, { passive: true });
    box.addEventListener("pointerdown", click);
    // Coalesce redraw requests (initial ResizeObserver tick + font load) into one per frame.
    let drawQueued = 0;
    const queueDraw = () => { if (!drawQueued) drawQueued = requestAnimationFrame(() => { drawQueued = 0; draw(); }); };
    const ro = new ResizeObserver(queueDraw); ro.observe(cv);
    const ready = document.fonts?.load ? document.fonts.load(`800 100px ${FF}`) : Promise.resolve();
    ready.then(queueDraw, queueDraw);

    let idle = 0, frozenT = -1, lastMotion = motionRef.current;
    const hovs = () => Array.from(document.querySelectorAll<HTMLElement & { _o?: string }>("[data-hov]"));
    let hovEls = hovs();
    const loop = (time: number) => {
      if (document.hidden) return;
      const t = time * 1000;
      const sec = heroRef.current; if (!sec) return;
      const r = sec.getBoundingClientRect(); if (r.bottom < 0) return; // scrolled past → stop rendering
      const motionOn = motionRef.current;
      if (motionOn !== lastMotion) { lastMotion = motionOn; dirty = true; hovEls = hovs(); }
      if (!motionOn) {
        // Static frame: zero ripples, no dive, frozen time.
        if (!dirty) return;
        pts.fill(0); if (frozenT < 0) frozenT = t * .001;
        hovEls.forEach((el) => { if (el._o !== "1") { el._o = "1"; el.style.opacity = "1"; } });
        gl.uniform1f(u.t, frozenT); gl.uniform1f(u.zoom, 1); gl.uniform2f(u.focus, focus[0], focus[1]);
        gl.uniform1f(u.intro, 1); gl.uniform1f(u.warp, 0); gl.uniform1f(u.fill, 0); gl.uniform3fv(u.p, pts);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); dirty = false;
        return;
      }
      frozenT = -1;
      if (covered.current) { if (!dirty) return; dirty = false; }
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      for (let i = 0; i < 16; i++) pts[i * 3 + 2] *= .93;
      // Idle (and always on touch): a ripple drifts along a Lissajous path.
      if (!fineRef.current || !last) { idle += .016; if ((t | 0) % 3 === 0) push(.5 + .34 * Math.sin(idle * .9), .5 + .22 * Math.sin(idle * 1.7), .45); }
      const zoom = 1 + Math.pow(Math.max(0, (p - .12) / .88), 3) * 90; // reference: × 70; a little deeper so the letter fills the screen
      const ho = String(Math.max(0, 1 - p / .18));
      hovEls.forEach((el) => { if (el._o !== ho) { el._o = ho; el.style.opacity = ho; } });
      gl.uniform1f(u.t, t * .001); gl.uniform1f(u.zoom, zoom); gl.uniform2f(u.focus, focus[0], focus[1]);
      // End of the dive settles to pure paper (#efe9dc), matching the About sheet that rises next.
      const fk = Math.min(1, Math.max(0, (p - .72) / .18)), fill = fk * fk * (3 - 2 * fk); // fully paper by 90%, a beat before About rises
      gl.uniform1f(u.intro, hfx.current.intro); gl.uniform1f(u.warp, p * .6); gl.uniform1f(u.fill, fill); gl.uniform3fv(u.p, pts);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    gsap.ticker.add(loop);
    const onVis = () => { dirty = true; };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      gsap.ticker.remove(loop); ro.disconnect(); cancelAnimationFrame(drawQueued);
      removeEventListener("pointermove", move); box.removeEventListener("touchmove", tmove); box.removeEventListener("pointerdown", click);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div ref={scope}>
      {loader && (
        <div className={s.loader} aria-hidden="true">
          <div className={s.cols}>
            <div data-lc="" style={{ background: RED }} /><div data-lc="" style={{ background: INK }} /><div data-lc="" style={{ background: TEAL }} /><div data-lc="" style={{ background: INK }} /><div data-lc="" style={{ background: MUST }} />
          </div>
          <div data-lbg="" className={s.lbg}>
            <div className={`${s.lTop} mono`}><span data-lt="">TV.</span><span data-lt="">Ahmedabad, IN</span></div>
            <div className={s.lBottom}>
              <div style={{ overflow: "hidden" }}><div data-lt="" className={`${s.welcome} serif`}>Welcome</div></div>
              <div style={{ overflow: "hidden" }}><div data-lt="" className={s.count}><span ref={countRef}>000</span></div></div>
            </div>
          </div>
        </div>
      )}

      <section id="top" ref={heroRef} aria-label="Introduction" className={s.hero}>
        <div className={s.stage}>
          <canvas ref={canvasRef} data-hgl="" aria-hidden="true" className={s.canvas} />
          <h1 className={s.fallback} style={{ opacity: glOk ? 0 : 1 }}>Tirth<br />Vaghela</h1>
          <div data-hov="" className={`${s.topbar} mono`}>
            <span>Ahmedabad, Gujarat, India</span>
            <span className={s.open}><span className={s.dot} />Open to work</span>
            <span className={s.deskOnly} suppressHydrationWarning>{time} IST</span>
          </div>
          <div data-hov="" className={s.bottom}>
            <div className={s.roleCol}>
              <span className={`${s.chips} mono11`}><span className={s.chipRed}>Designer</span><span className={s.chipLine}>Full-Stack Developer</span></span>
              <span className={`${s.stackLine} mono11`}>React · Next.js · Django · Flask · Python</span>
            </div>
            <p className={s.claim}>
              I build software that{" "}
              {CLAIMS.map(([text, i], k) => (
                <span key={text}>
                  <a href="#work" data-cursor="Open" className={s.claimLink} onClick={(e) => { e.preventDefault(); openProject(i); }}>{text}</a>
                  <sup>{k + 1}</sup>
                  {k < CLAIMS.length - 2 ? ", " : k === CLAIMS.length - 2 ? " and " : "."}
                </span>
              ))}
            </p>
            <div className={s.ctas}>
              <a href="#work" data-magnetic="" className={`${s.ctaFill} mono`} style={{ fontSize: 13 }}>View projects ↓</a>
              <a href="#contact" data-magnetic="" className={`${s.ctaLine} mono`} style={{ fontSize: 13 }}>Contact</a>
            </div>
          </div>
          {fine && motion && <span data-hov="" className={`${s.hint} mono11`}>Move · Click · Scroll</span>}
        </div>
      </section>
    </div>
  );
}
