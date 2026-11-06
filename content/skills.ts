import { RED, TEAL, MUST, INK, PAPER } from "./palette";

/** Skill groups: [label, items, ring colour, ink] — verbatim from the v8 reference. */
export const SKILLS: [string, string[], string, string][] = [['Programming Languages', ['Python','JavaScript','TypeScript','SQL'], RED, INK], ['Frontend', ['React','Next.js','HTML','CSS','Tailwind CSS','Flutter'], TEAL, PAPER], ['Backend', ['Django','Flask','Node.js','FastAPI','REST APIs'], MUST, INK], ['Databases', ['MySQL','MongoDB','SQLite'], INK, PAPER], ['AI / ML', ['YOLOv4','YOLOv8','OpenCV','DeepFace','ArcFace'], RED, INK], ['Tools', ['Git','GitHub','VS Code','Vercel'], TEAL, PAPER]];
/** Ring order for the orbit (index into SKILLS, inner → outer). */
export const RING_ORDER = [3, 0, 5, 2, 4, 1];
