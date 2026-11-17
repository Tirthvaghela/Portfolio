/**
 * Illustrated project covers (800×500, v8 palette). Each one draws what the project
 * actually does, from its own description — they are illustrations, not screenshots,
 * so there are no invented numbers, metrics or user data in them.
 */
import { RED, TEAL, MUST, INK, PAPER } from "@/content/palette";
import s from "./Cover.module.css";

const BG = "#221f1a";
const LINE = "rgba(239,233,220,.14)";
const NAVY = "#1f2b4d"; // GLS portal's own navy/gold design system
const GOLD = "#c9a227";
const mono = { fontFamily: "var(--mono)", letterSpacing: ".06em" } as const;
const disp = { fontFamily: "var(--display)", fontWeight: 800, fontStretch: "75%" } as const;

function Tag({ x, y, text, bg = MUST, fg = INK, w }: { x: number; y: number; text: string; bg?: string; fg?: string; w?: number }) {
  const width = w ?? text.length * 8.4 + 18;
  return (
    <g>
      <rect x={x} y={y} width={width} height={22} rx={11} fill={bg} />
      <text x={x + width / 2} y={y + 15} textAnchor="middle" fontSize={11} fill={fg} style={mono}>{text.toUpperCase()}</text>
    </g>
  );
}

function Lines({ x, y, w, n, gap = 14, color = LINE, h = 6 }: { x: number; y: number; w: number[] | number; n: number; gap?: number; color?: string; h?: number }) {
  return <>{Array.from({ length: n }, (_, i) => <rect key={i} x={x} y={y + i * gap} width={Array.isArray(w) ? w[i % w.length] : w} height={h} rx={h / 2} fill={color} />)}</>;
}

function Grid() {
  return (
    <g opacity={.5}>
      {Array.from({ length: 17 }, (_, i) => <line key={`v${i}`} x1={i * 50} y1={0} x2={i * 50} y2={500} stroke="rgba(239,233,220,.04)" />)}
      {Array.from({ length: 11 }, (_, i) => <line key={`h${i}`} x1={0} y1={i * 50} x2={800} y2={i * 50} stroke="rgba(239,233,220,.04)" />)}
    </g>
  );
}

/* 01 Urban Signal — intersection, detections, signal, lane density, ambulance priority */
function UrbanSignal() {
  const car = (x: number, y: number, w: number, h: number, c: string) => <rect x={x} y={y} width={w} height={h} rx={6} fill={c} />;
  const box = (x: number, y: number, w: number, h: number, c = MUST) => <rect x={x} y={y} width={w} height={h} fill="none" stroke={c} strokeWidth={2.5} strokeDasharray="8 5" />;
  return (
    <>
      <rect x={0} y={190} width={800} height={120} fill="#2e2a24" />
      <rect x={330} y={0} width={140} height={500} fill="#2e2a24" />
      <rect x={330} y={190} width={140} height={120} fill="#34302a" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={i} x={i * 50 + 6} y={248} width={26} height={4} fill="rgba(239,233,220,.35)" />)}
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={`r${i}`} x={490 + i * 52} y={248} width={26} height={4} fill="rgba(239,233,220,.35)" />)}
      {[0, 1, 2, 3].map((i) => <rect key={`t${i}`} x={398} y={i * 48 + 6} width={4} height={24} fill="rgba(239,233,220,.35)" />)}
      {[0, 1, 2, 3].map((i) => <rect key={`b${i}`} x={398} y={326 + i * 48} width={4} height={24} fill="rgba(239,233,220,.35)" />)}
      {/* zebra */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={`z${i}`} x={338 + i * 19} y={170} width={10} height={16} fill="rgba(239,233,220,.5)" />)}
      {car(150, 205, 74, 34, PAPER)}{box(140, 196, 94, 52)}<Tag x={140} y={172} text="car" />
      {car(40, 260, 110, 38, TEAL)}{box(30, 252, 130, 54)}<Tag x={30} y={310} text="bus" />
      {car(560, 262, 74, 34, PAPER)}{box(550, 254, 94, 50)}
      {car(410, 360, 40, 70, RED)}<rect x={423} y={385} width={14} height={4} fill={PAPER} /><rect x={428} y={380} width={4} height={14} fill={PAPER} />
      <g className={s.pulse}>{box(398, 350, 64, 90, RED)}</g><Tag x={470} y={384} text="priority" bg={RED} />
      {/* signal head */}
      <rect x={640} y={40} width={70} height={168} rx={20} fill={INK} stroke={LINE} />
      <circle cx={675} cy={78} r={20} fill={RED} opacity={.25} />
      <circle cx={675} cy={124} r={20} fill={MUST} opacity={.25} />
      <circle className={s.blink} cx={675} cy={170} r={20} fill={TEAL} />
      {/* lane density */}
      <rect x={30} y={36} width={200} height={124} rx={16} fill={INK} />
      <text x={46} y={62} fontSize={11} fill={PAPER} opacity={.6} style={mono}>LANE DENSITY</text>
      {[["N", 52], ["E", 78], ["S", 34], ["W", 62]].map(([l, v], i) => (
        <g key={l as string}>
          <rect x={48 + i * 44} y={142 - (v as number)} width={26} height={v as number} rx={4} fill={i === 1 ? MUST : PAPER} opacity={i === 1 ? 1 : .55} />
          <text x={61 + i * 44} y={156} textAnchor="middle" fontSize={10} fill={PAPER} opacity={.6} style={mono}>{l as string}</text>
        </g>
      ))}
    </>
  );
}

/* 02 EventEase — event calendar, RSVP ticket, capacity ring, roles */
function EventEase() {
  return (
    <>
      <rect x={40} y={40} width={420} height={420} rx={24} fill={PAPER} />
      <text x={70} y={92} fontSize={34} fill={INK} style={disp}>EVENTS</text>
      <rect x={340} y={68} width={92} height={30} rx={15} fill={INK} /><text x={386} y={88} textAnchor="middle" fontSize={11} fill={PAPER} style={mono}>THIS MONTH</text>
      {Array.from({ length: 35 }, (_, i) => {
        const c = i % 7, r = Math.floor(i / 7);
        const hot = [3, 9, 17, 24, 30].includes(i), red = i === 17;
        return <rect key={i} x={70 + c * 52} y={124 + r * 62} width={42} height={50} rx={10} fill={red ? RED : hot ? MUST : "rgba(20,18,15,.07)"} />;
      })}
      <g className={s.drift}>
        <path d="M520 110 h220 a16 16 0 0 1 16 16 v70 a18 18 0 0 0 0 36 v70 a16 16 0 0 1 -16 16 h-220 a16 16 0 0 1 -16 -16 v-70 a18 18 0 0 0 0 -36 v-70 a16 16 0 0 1 16 -16z" fill={TEAL} />
        <line x1={540} y1={214} x2={720} y2={214} stroke={PAPER} strokeDasharray="6 6" opacity={.5} />
        <text x={540} y={160} fontSize={40} fill={PAPER} style={disp}>RSVP</text>
        <text x={540} y={186} fontSize={11} fill={PAPER} opacity={.8} style={mono}>ADMIN · STUDENT</text>
        <circle cx={600} cy={268} r={30} fill="none" stroke="rgba(239,233,220,.25)" strokeWidth={10} />
        <circle cx={600} cy={268} r={30} fill="none" stroke={MUST} strokeWidth={10} strokeDasharray="140 189" transform="rotate(-90 600 268)" strokeLinecap="round" />
        <text x={646} y={264} fontSize={11} fill={PAPER} style={mono}>CAPACITY</text>
        <text x={646} y={282} fontSize={11} fill={PAPER} opacity={.7} style={mono}>LIVE</text>
      </g>
      {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={540 + i * 30} cy={400} r={18} fill={[RED, MUST, PAPER, TEAL, PAPER][i]} stroke={BG} strokeWidth={4} />)}
      <text x={700} y={405} fontSize={11} fill={PAPER} opacity={.7} style={mono}>GOING</text>
    </>
  );
}

/* 03 Vois — feed posts, likes, follow graph, trending */
function Vois() {
  const post = (x: number, y: number, c: string, liked = false) => (
    <g>
      <rect x={x} y={y} width={300} height={120} rx={20} fill={PAPER} />
      <circle cx={x + 34} cy={y + 34} r={16} fill={c} />
      <Lines x={x + 60} y={y + 24} w={[120, 80]} n={2} gap={14} color="rgba(20,18,15,.35)" />
      <Lines x={x + 22} y={y + 66} w={[250, 200]} n={2} gap={14} color="rgba(20,18,15,.14)" />
      <path className={liked ? s.beat : undefined} transform={`translate(${x + 240} ${y + 92})`} d="M0 6 C0 0 8 -2 10 4 C12 -2 20 0 20 6 C20 13 10 18 10 18 C10 18 0 13 0 6Z" fill={liked ? RED : "rgba(20,18,15,.25)"} />
    </g>
  );
  return (
    <>
      {post(60, 60, RED, true)}{post(100, 200, TEAL)}{post(60, 340, MUST)}
      {/* follow graph */}
      {[[560, 120], [700, 170], [620, 260], [740, 320], [560, 380]].map(([x, y], i, a) => (
        <g key={i}>{i > 0 && <line x1={a[0][0]} y1={a[0][1]} x2={x} y2={y} stroke={LINE} strokeWidth={2} />}{i === 2 && <line x1={x} y1={y} x2={a[3][0]} y2={a[3][1]} stroke={LINE} strokeWidth={2} />}</g>
      ))}
      {[[560, 120, RED], [700, 170, PAPER], [620, 260, MUST], [740, 320, TEAL], [560, 380, PAPER]].map(([x, y, c], i) => <circle key={i} cx={x as number} cy={y as number} r={i === 0 ? 26 : 16} fill={c as string} />)}
      <Tag x={520} y={60} text="follow" bg={PAPER} />
      <rect x={470} y={420} width={300} height={50} rx={14} fill={INK} />
      <text x={488} y={450} fontSize={11} fill={MUST} style={mono}>TRENDING</text>
      <polyline points="580,455 610,446 640,450 670,436 700,440 730,426 755,430" fill="none" stroke={MUST} strokeWidth={3} strokeLinejoin="round" />
    </>
  );
}

/* 04 RIGS — rider, helmet check, plate OCR, e-challan */
function Rigs() {
  return (
    <>
      <rect x={0} y={400} width={800} height={100} fill="#2e2a24" />
      {/* bike + rider */}
      <circle cx={190} cy={390} r={52} fill="none" stroke={PAPER} strokeWidth={14} />
      <circle cx={420} cy={390} r={52} fill="none" stroke={PAPER} strokeWidth={14} />
      <path d="M190 390 L260 300 L360 300 L420 390" fill="none" stroke={TEAL} strokeWidth={14} strokeLinejoin="round" />
      <path d="M250 300 L300 250 L380 260 L400 300 Z" fill={TEAL} />
      <path d="M300 250 L270 170 L330 160 L360 250 Z" fill={RED} />
      <circle cx={300} cy={128} r={30} fill={PAPER} />
      <path d="M300 180 L380 220" stroke={RED} strokeWidth={14} strokeLinecap="round" />
      <rect x={400} y={318} width={74} height={32} rx={4} fill={PAPER} />
      <text x={437} y={340} textAnchor="middle" fontSize={13} fill={INK} style={mono}>GJ ·· ··</text>
      {/* detections */}
      <rect x={258} y={88} width={84} height={84} fill="none" stroke={RED} strokeWidth={3} strokeDasharray="9 5" />
      <Tag x={258} y={62} text="no helmet" bg={RED} />
      <rect x={392} y={310} width={90} height={48} fill="none" stroke={MUST} strokeWidth={3} strokeDasharray="9 5" />
      <Tag x={492} y={322} text="ocr" />
      {/* scan line */}
      <g className={s.scan}><rect x={150} y={70} width={360} height={3} fill={MUST} opacity={.8} /></g>
      {/* challan */}
      <g transform="translate(600 120)">
        <rect width={160} height={110} rx={14} fill={PAPER} />
        <path d="M0 14 L80 66 L160 14" fill="none" stroke={INK} strokeWidth={3} />
        <text x={80} y={140} textAnchor="middle" fontSize={11} fill={PAPER} style={mono}>E-CHALLAN</text>
      </g>
      <path d="M520 175 C 560 175, 560 175, 590 175" stroke={MUST} strokeWidth={3} strokeDasharray="6 6" fill="none" />
      <path d="M582 167 L594 175 L582 183" fill="none" stroke={MUST} strokeWidth={3} />
    </>
  );
}

/* 05 FreshVault — the storefront itself: catalog grid (wishlist hearts, add-to-cart), the cart
   drawer and the admin analytics card. Placeholder bars stand in for prices and figures — no
   invented numbers. Looping details sit on inner groups so CSS animation never overrides a
   positioning transform. */
function FreshVault() {
  const TILE = "#2e2a24";
  const items: [string, React.ReactNode][] = [
    ["Apples", <g key="a"><circle cx={0} cy={6} r={26} fill={RED} /><path d="M2 -20 q12 -12 22 -4 q-12 9 -22 4" fill={TEAL} /></g>],
    ["Carrots", <g key="c"><path d="M-9 -22 L9 -22 L0 34 Z" fill={MUST} /><path d="M-5 -22 l-9 -13 M0 -22 l0 -15 M5 -22 l9 -13" stroke={TEAL} strokeWidth={4.5} strokeLinecap="round" /></g>],
    ["Bread", <g key="b"><rect x={-32} y={-14} width={64} height={40} rx={16} fill={MUST} /><path d="M-15 -6 l6 24 M3 -6 l6 24" stroke={INK} strokeWidth={3} opacity={.3} /></g>],
    ["Milk", <g key="m"><path d="M-17 -10 L0 -26 L17 -10 L17 30 L-17 30 Z" fill={PAPER} /><rect x={-17} y={6} width={34} height={12} fill={TEAL} /></g>],
    ["Greens", <g key="g"><circle cx={-10} cy={6} r={17} fill={TEAL} /><circle cx={10} cy={0} r={19} fill={TEAL} opacity={.8} /><circle cx={0} cy={16} r={15} fill={TEAL} opacity={.6} /></g>],
    ["Eggs", <g key="e"><ellipse cx={-12} cy={6} rx={14} ry={19} fill={PAPER} /><ellipse cx={14} cy={8} rx={14} ry={19} fill={PAPER} opacity={.85} /></g>],
  ];
  const heart = "M0 5 C0 0 7 -2 9 3 C11 -2 18 0 18 5 C18 11 9 16 9 16 C9 16 0 11 0 5Z";
  const cart: [string, string][] = [["Apples", RED], ["Carrots", MUST], ["Milk", PAPER]];
  return (
    <>
      {/* top bar: wordmark + search */}
      <text x={32} y={62} fontSize={30} fill={PAPER} style={disp}>FRESH<tspan fill={MUST}>VAULT</tspan></text>
      <rect x={236} y={38} width={244} height={30} rx={15} fill={TILE} />
      <circle cx={256} cy={53} r={6} fill="none" stroke={PAPER} strokeWidth={2} opacity={.6} />
      <path d="M260.5 57.5 l5 5" stroke={PAPER} strokeWidth={2} strokeLinecap="round" opacity={.6} />
      <rect x={274} y={50} width={120} height={6} rx={3} fill={LINE} />

      {/* catalog: 3 × 2 product tiles */}
      {items.map(([label, art], i) => {
        const x = 32 + (i % 3) * 152, y = 88 + Math.floor(i / 3) * 196;
        const fav = i === 0, adding = i === 1;
        return (
          <g key={label}>
            <rect x={x} y={y} width={140} height={182} rx={18} fill={fav ? PAPER : TILE} />
            <g transform={`translate(${x + 70} ${y + 70})`}>{art}</g>
            <path transform={`translate(${x + 110} ${y + 14})`} d={heart} fill={fav ? RED : "rgba(239,233,220,.2)"} />
            <text x={x + 16} y={y + 136} fontSize={11} fill={fav ? INK : PAPER} style={mono}>{label.toUpperCase()}</text>
            <rect x={x + 16} y={y + 150} width={44} height={7} rx={3.5} fill={fav ? "rgba(20,18,15,.25)" : LINE} />
            <g transform={`translate(${x + 114} ${y + 154})`}>
              <g className={adding ? s.pulse : undefined}>
                <circle r={15} fill={adding ? MUST : fav ? INK : "rgba(239,233,220,.12)"} />
                <path d="M-6 0 h12 M0 -6 v12" stroke={adding ? INK : PAPER} strokeWidth={2.5} strokeLinecap="round" />
              </g>
            </g>
          </g>
        );
      })}

      {/* the item on its way to the cart — routed along the gutters, never across a tile */}
      <path d="M298 270 V277 H478 Q490 277 490 265 V115 Q490 103 498 103" fill="none" stroke={MUST} strokeWidth={2.5} strokeDasharray="5 7" strokeLinecap="round" />
      <path d="M494 97 l8 6 l-8 6" fill="none" stroke={MUST} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

      {/* cart drawer */}
      <rect x={504} y={28} width={264} height={292} rx={24} fill={TEAL} />
      <text x={526} y={62} fontSize={11} fill={PAPER} style={mono}>YOUR CART</text>
      <g transform="translate(742 57)"><g className={s.beat}><circle r={13} fill={RED} /><text y={4.5} textAnchor="middle" fontSize={13} fill={PAPER} style={mono}>3</text></g></g>
      {cart.map(([name, c], i) => {
        const y = 80 + i * 56;
        return (
          <g key={name}>
            <rect x={522} y={y} width={228} height={46} rx={14} fill="rgba(20,18,15,.2)" />
            <circle cx={546} cy={y + 23} r={13} fill={c} />
            <Lines x={568} y={y + 14} w={[84, 50]} n={2} gap={12} color="rgba(239,233,220,.45)" />
            <rect x={680} y={y + 12} width={56} height={22} rx={11} fill="none" stroke={PAPER} strokeWidth={1.5} opacity={.7} />
            <path d={`M690 ${y + 23} h8 M718 ${y + 23} h8 M722 ${y + 19} v8`} stroke={PAPER} strokeWidth={2} strokeLinecap="round" />
          </g>
        );
      })}
      <rect x={522} y={258} width={228} height={44} rx={22} fill={MUST} />
      <text x={636} y={284} textAnchor="middle" fontSize={12} fill={INK} style={mono}>CHECKOUT →</text>

      {/* admin analytics */}
      <rect x={504} y={336} width={264} height={136} rx={22} fill={TILE} />
      <text x={526} y={364} fontSize={11} fill={MUST} style={mono}>ADMIN · ANALYTICS</text>
      {[26, 40, 32, 52, 44, 62, 56, 74].map((h, i) => (
        <rect key={i} x={528 + i * 28} y={452 - h} width={16} height={h} rx={4} fill={i === 7 ? MUST : PAPER} opacity={i === 7 ? 1 : .35} />
      ))}
      <path d="M536 418 L564 404 L592 410 L620 392 L648 398 L676 382 L704 388 L732 368" fill="none" stroke={RED} strokeWidth={2.5} strokeLinejoin="round" />
    </>
  );
}

/* 06 Electrox-Mobile — ballot on a phone, 4 roles, audit log */
function ElectroxMobile() {
  return (
    <>
      <rect x={290} y={20} width={220} height={460} rx={36} fill={INK} stroke={PAPER} strokeWidth={4} />
      <rect x={360} y={36} width={80} height={10} rx={5} fill={PAPER} opacity={.4} />
      <text x={314} y={96} fontSize={30} fill={PAPER} style={disp}>CAST VOTE</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={312} y={118 + i * 74} width={176} height={60} rx={14} fill={i === 1 ? MUST : "#2e2a24"} />
          <circle cx={340} cy={148 + i * 74} r={12} fill="none" stroke={i === 1 ? INK : PAPER} strokeWidth={3} />
          {i === 1 && <path className={s.pulse} d="M334 222 l5 6 l10 -12" fill="none" stroke={INK} strokeWidth={3} />}
          <Lines x={364} y={140 + i * 74} w={[96, 60]} n={2} gap={12} color={i === 1 ? "rgba(20,18,15,.45)" : LINE} />
        </g>
      ))}
      <rect x={312} y={350} width={176} height={52} rx={26} fill={RED} />
      <text x={400} y={381} textAnchor="middle" fontSize={12} fill={INK} style={mono}>SUBMIT BALLOT</text>
      {["Admin", "Organizer", "Candidate", "Voter"].map((r, i) => <Tag key={r} x={40} y={110 + i * 46} text={r} bg={i === 3 ? MUST : PAPER} />)}
      <text x={40} y={92} fontSize={11} fill={PAPER} opacity={.6} style={mono}>ROLES</text>
      <rect x={560} y={100} width={200} height={260} rx={20} fill="#2e2a24" />
      <text x={580} y={130} fontSize={11} fill={MUST} style={mono}>AUDIT LOG</text>
      {[0, 1, 2, 3, 4, 5].map((i) => <g key={i}><circle cx={586} cy={160 + i * 32} r={5} fill={i === 0 ? MUST : PAPER} opacity={i === 0 ? 1 : .5} /><rect x={600} y={156 + i * 32} width={[130, 100, 140, 90, 120, 110][i]} height={8} rx={4} fill={LINE} /></g>)}
    </>
  );
}

/* 07 Wedding Face Finder — selfie → face grid → match */
function WeddingFaceFinder() {
  const face = (x: number, y: number, k: number) => (
    <g>
      <circle cx={x} cy={y - 8} r={13} fill={[PAPER, MUST, TEAL, RED][k % 4]} />
      <path d={`M${x - 22} ${y + 28} a22 18 0 0 1 44 0`} fill={[PAPER, MUST, TEAL, RED][k % 4]} opacity={.75} />
    </g>
  );
  return (
    <>
      <circle cx={130} cy={250} r={86} fill={PAPER} />
      <circle cx={130} cy={226} r={30} fill={INK} /><path d="M78 300 a52 40 0 0 1 104 0" fill={INK} />
      <circle cx={130} cy={250} r={98} fill="none" stroke={MUST} strokeWidth={3} strokeDasharray="10 8" />
      <text x={130} y={378} textAnchor="middle" fontSize={11} fill={PAPER} opacity={.7} style={mono}>YOUR FACE</text>
      <path d="M240 250 h70" stroke={MUST} strokeWidth={3} strokeDasharray="6 6" /><path d="M302 242 l10 8 l-10 8" fill="none" stroke={MUST} strokeWidth={3} />
      {Array.from({ length: 12 }, (_, i) => {
        const c = i % 4, r = Math.floor(i / 4), x = 340 + c * 112, y = 40 + r * 142;
        return (
          <g key={i}>
            <rect x={x} y={y} width={100} height={128} rx={12} fill="#2e2a24" />
            {face(x + 34, y + 70, i)}{face(x + 68, y + 76, i + 1)}
          </g>
        );
      })}
      <g className={s.pulse}><rect x={334} y={176} width={112} height={140} rx={16} fill="none" stroke={MUST} strokeWidth={4} /></g>
      <Tag x={358} y={322} text="match" />
    </>
  );
}

/* 08 Electrox Web — ballot box, roles, results */
function ElectroxWeb() {
  return (
    <>
      <rect x={60} y={40} width={680} height={40} rx={20} fill="#2e2a24" />
      {["Admin", "Organizer", "Candidate", "Voter"].map((r, i) => <Tag key={r} x={76 + i * 128} y={49} text={r} bg={i === 0 ? RED : PAPER} />)}
      <g className={s.drift}>
        <rect x={232} y={130} width={120} height={150} rx={8} fill={PAPER} transform="rotate(-8 292 205)" />
        <path d="M262 190 l18 22 l36 -44" transform="rotate(-8 292 205)" fill="none" stroke={RED} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <path d="M140 250 L440 250 L470 440 L110 440 Z" fill={TEAL} />
      <rect x={200} y={240} width={180} height={14} rx={7} fill={INK} />
      <text x={290} y={360} textAnchor="middle" fontSize={44} fill={PAPER} style={disp}>VOTE</text>
      <text x={290} y={390} textAnchor="middle" fontSize={11} fill={PAPER} opacity={.8} style={mono}>JWT · BCRYPT · AUDIT</text>
      <rect x={520} y={130} width={230} height={310} rx={20} fill={PAPER} />
      <text x={540} y={162} fontSize={11} fill={INK} style={mono}>RESULTS</text>
      {[150, 96, 120, 60].map((w, i) => <g key={i}><rect x={540} y={186 + i * 58} width={190} height={30} rx={8} fill="rgba(20,18,15,.07)" /><rect x={540} y={186 + i * 58} width={w} height={30} rx={8} fill={[MUST, TEAL, RED, INK][i]} /></g>)}
    </>
  );
}

/* 09 GLS University Student Portal — digital ID (navy/gold), schedule day picker */
function GlsPortal() {
  return (
    <>
      <g transform="rotate(-7 300 250)">
        <rect x={110} y={90} width={380} height={240} rx={22} fill={NAVY} />
        <rect x={110} y={90} width={380} height={56} rx={22} fill={GOLD} />
        <rect x={110} y={120} width={380} height={26} fill={GOLD} />
        <text x={134} y={126} fontSize={20} fill={NAVY} style={disp}>GLS UNIVERSITY</text>
        <text x={466} y={124} textAnchor="end" fontSize={10} fill={NAVY} style={mono}>DIGITAL ID</text>
        <rect x={134} y={168} width={92} height={112} rx={12} fill="rgba(239,233,220,.12)" />
        <circle cx={180} cy={208} r={22} fill={PAPER} opacity={.8} /><path d="M146 266 a34 26 0 0 1 68 0" fill={PAPER} opacity={.8} />
        <Lines x={248} y={176} w={[180, 120, 150]} n={3} gap={22} color="rgba(239,233,220,.35)" h={8} />
        {Array.from({ length: 26 }, (_, i) => <rect key={i} x={248 + i * 8} y={262} width={i % 3 ? 3 : 5} height={30} fill={GOLD} />)}
      </g>
      <rect x={540} y={70} width={220} height={360} rx={30} fill={PAPER} />
      <text x={562} y={112} fontSize={26} fill={INK} style={disp}>SCHEDULE</text>
      {["M", "T", "W", "T", "F", "S"].map((d, i) => (
        <g key={i}>
          <circle className={i === 2 ? s.pulse : undefined} cx={574 + i * 34} cy={146} r={14} fill={i === 2 ? NAVY : "rgba(20,18,15,.08)"} />
          <text x={574 + i * 34} y={150} textAnchor="middle" fontSize={11} fill={i === 2 ? GOLD : INK} style={mono}>{d}</text>
        </g>
      ))}
      {[0, 1, 2, 3].map((i) => <g key={i}><rect x={560} y={182 + i * 56} width={180} height={44} rx={12} fill={i === 0 ? GOLD : "rgba(20,18,15,.06)"} /><rect x={574} y={196 + i * 56} width={[90, 120, 70, 100][i]} height={8} rx={4} fill={i === 0 ? NAVY : "rgba(20,18,15,.25)"} /></g>)}
    </>
  );
}

/* Key: VoiceForm AI — paper form → voice conversation (GU/HI/EN) → filled PDF */
function VoiceForm() {
  return (
    <>
      <g transform="rotate(-4 170 250)">
        <rect x={60} y={60} width={220} height={300} rx={10} fill={PAPER} />
        <text x={82} y={96} fontSize={11} fill={INK} opacity={.6} style={mono}>PAPER FORM</text>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={82} y={116 + i * 46} width={70} height={7} rx={3} fill="rgba(20,18,15,.35)" />
            <rect x={82} y={130 + i * 46} width={176} height={20} rx={4} fill="none" stroke="rgba(20,18,15,.35)" strokeWidth={1.5} />
            {i < 2 && <rect x={88} y={137 + i * 46} width={[120, 90][i]} height={6} rx={3} fill={TEAL} />}
          </g>
        ))}
      </g>
      {/* voice */}
      <circle cx={400} cy={230} r={58} fill={MUST} />
      <rect x={386} y={196} width={28} height={48} rx={14} fill={INK} />
      <path d="M374 232 a26 26 0 0 0 52 0 M400 258 v14" fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <g className={s.pulse}>
        {[-1, 1].map((d) => [0, 1, 2].map((k) => <rect key={`${d}${k}`} x={400 + d * (78 + k * 18) - 3} y={230 - [16, 26, 12][k]} width={6} height={[32, 52, 24][k]} rx={3} fill={MUST} />))}
      </g>
      {["GU", "HI", "EN"].map((l, i) => <Tag key={l} x={346 + i * 40} y={318} text={l} bg={i === 0 ? RED : PAPER} w={34} />)}
      <path d="M470 250 h40" stroke={MUST} strokeWidth={3} strokeDasharray="6 6" /><path d="M502 242 l10 8 l-10 8" fill="none" stroke={MUST} strokeWidth={3} />
      {/* filled PDF */}
      <g className={s.drift}>
        <rect x={540} y={70} width={210} height={290} rx={10} fill={PAPER} />
        <path d="M710 70 h40 v40 z" fill={RED} />
        <text x={560} y={104} fontSize={11} fill={INK} opacity={.6} style={mono}>FILLED · PDF</text>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={560} y={122 + i * 44} width={170} height={20} rx={4} fill="none" stroke="rgba(20,18,15,.35)" strokeWidth={1.5} />
            <rect x={566} y={129 + i * 44} width={[130, 100, 140, 80, 120][i]} height={6} rx={3} fill={INK} />
          </g>
        ))}
      </g>
      <text x={645} y={400} textAnchor="middle" fontSize={11} fill={PAPER} opacity={.7} style={mono}>PRINT-READY</text>
    </>
  );
}

/* Key: FileFlow AI — rules route files to folders, undo, activity */
function FileFlow() {
  const folder = (x: number, y: number, c: string) => <path d={`M${x} ${y + 6} h22 l8 -8 h40 a6 6 0 0 1 6 6 v38 a6 6 0 0 1 -6 6 h-64 a6 6 0 0 1 -6 -6 z`} fill={c} />;
  return (
    <>
      <rect x={110} y={50} width={580} height={400} rx={22} fill={PAPER} />
      <text x={136} y={88} fontSize={11} fill={INK} opacity={.6} style={mono}>RULES</text>
      <text x={664} y={88} textAnchor="end" fontSize={11} fill={INK} opacity={.6} style={mono}>WATCHING 3 FOLDERS</text>
      {[[RED, ".PDF"], [TEAL, ".JPG"], [MUST, ".ZIP"], [INK, ".DOCX"]].map(([c, ext], i) => (
        <g key={ext}>
          <rect x={136} y={110 + i * 64} width={42} height={50} rx={6} fill="none" stroke={INK} strokeWidth={2.5} />
          <text x={157} y={140 + i * 64} textAnchor="middle" fontSize={9} fill={INK} style={mono}>{ext}</text>
          <rect x={196} y={128 + i * 64} width={[230, 190, 210, 170][i]} height={10} rx={5} fill="rgba(20,18,15,.15)" />
          <g className={i === 1 ? s.pulse : undefined}><path d={`M${450} ${133 + i * 64} h56`} stroke={c} strokeWidth={3} /><path d={`M${500} ${126 + i * 64} l10 7 l-10 7`} fill="none" stroke={c} strokeWidth={3} /></g>
          {folder(528, 112 + i * 64, c)}
          {i < 3 && <line x1={136} y1={170 + i * 64} x2={664} y2={170 + i * 64} stroke="rgba(20,18,15,.1)" />}
        </g>
      ))}
      <rect x={136} y={384} width={110} height={40} rx={20} fill={INK} />
      <text x={191} y={409} textAnchor="middle" fontSize={12} fill={PAPER} style={mono}>← UNDO</text>
      {[14, 26, 18, 34, 22].map((h, i) => <rect key={i} x={540 + i * 14} y={420 - h} width={9} height={h} rx={2} fill={RED} />)}
      <text x={664} y={418} textAnchor="end" fontSize={10} fill={INK} opacity={.6} style={mono}>ACTIVITY</text>
    </>
  );
}

/* Key: ProjectMindAI — semantic + BM25 search, context-aware assistant */
function ProjectMind() {
  return (
    <>
      <rect x={150} y={36} width={500} height={428} rx={22} fill={PAPER} />
      <rect x={176} y={62} width={448} height={50} rx={25} fill="none" stroke={INK} strokeWidth={2.5} />
      <circle cx={204} cy={87} r={9} fill="none" stroke={INK} strokeWidth={2.5} /><path d="M211 94 l7 7" stroke={INK} strokeWidth={2.5} />
      <rect x={228} y={83} width={300} height={8} rx={4} fill="rgba(20,18,15,.3)" />
      <rect className={s.blink} x={532} y={76} width={2} height={22} fill={INK} />
      <rect x={176} y={128} width={104} height={30} rx={15} fill={RED} /><text x={228} y={148} textAnchor="middle" fontSize={11} fill={PAPER} style={mono}>SEMANTIC</text>
      <rect x={290} y={128} width={140} height={30} rx={15} fill="none" stroke={INK} strokeWidth={2} /><text x={360} y={148} textAnchor="middle" fontSize={11} fill={INK} style={mono}>KEYWORD · BM25</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx={186} cy={190 + i * 44} r={8} fill={i === 0 ? RED : "none"} stroke={i === 0 ? RED : INK} strokeWidth={2} />
          <rect x={206} y={186 + i * 44} width={[300, 320, 290][i]} height={8} rx={4} fill="rgba(20,18,15,.25)" />
          <rect x={[560, 596, 578][i]} y={186 + i * 44} width={[64, 28, 46][i]} height={8} rx={4} fill={RED} />
          <line x1={176} y1={210 + i * 44} x2={624} y2={210 + i * 44} stroke="rgba(20,18,15,.1)" />
        </g>
      ))}
      <rect x={176} y={330} width={448} height={110} rx={18} fill={INK} />
      <text x={200} y={360} fontSize={11} fill={RED} style={mono}>AI ASSISTANT · PROJECT CONTEXT</text>
      <rect x={200} y={378} width={380} height={8} rx={4} fill="rgba(239,233,220,.35)" />
      <rect x={200} y={398} width={240} height={8} rx={4} fill="rgba(239,233,220,.35)" />
      <g className={s.pulse}><circle cx={456} cy={402} r={4} fill={MUST} /><circle cx={470} cy={402} r={4} fill={MUST} /><circle cx={484} cy={402} r={4} fill={MUST} /></g>
    </>
  );
}

const ART = [UrbanSignal, EventEase, Vois, Rigs, FreshVault, ElectroxMobile, WeddingFaceFinder, ElectroxWeb, GlsPortal];

const KEY_ART = { voiceform: VoiceForm, fileflow: FileFlow, projectmind: ProjectMind };

export default function Cover({ i, art, title, decorative = false }: { i?: number; art?: keyof typeof KEY_ART; title: string; decorative?: boolean }) {
  const Art = art ? KEY_ART[art] : ART[i ?? -1];
  if (!Art) return null;
  return (
    <svg
      className={s.cover}
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid meet"
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": `${title}: illustrated cover` })}
    >
      <rect width={800} height={500} fill={BG} />
      <Grid />
      <Art />
    </svg>
  );
}
