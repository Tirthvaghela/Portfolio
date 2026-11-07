/** Site-wide content — every string here is copied verbatim from the v8 reference. */
import { MUST, PAPER } from "./palette";

export const SITE = {
  name: "Tirth Vaghela",
  url: "https://tirthvaghela.in",
  email: "vaghelatirth719@gmail.com",
  /** Formspree form that delivers contact-form messages to the inbox above. */
  formspree: "https://formspree.io/f/xqeygzoo",
  github: "https://github.com/Tirthvaghela",
  linkedin: "https://www.linkedin.com/in/tirthvaghela/",
  collaborator: "https://www.linkedin.com/in/dhruv-sadrawala22/",
  resume: "/TV_Resume.pdf",
  githubChart: "https://ghchart.rshah.org/2a7a6f/Tirthvaghela",
  location: "Ahmedabad, Gujarat, India",
};

export const MOTION_KEY = "tirthvaghela:motion";

export const SECTIONS: [string, string][] = [['about','About'],['key','Key projects'],['work','Work'],['skills','Skills'],['experience','Experience'],['contact','Contact']];

export const LEAD = "I'm in Semester 9 of the integrated MSc IT programme at GLS University, Ahmedabad. The BSc IT half finished in 2025 with First Class with Distinction.";

export const STATS = [{ n: 8, label: 'Projects shipped' }, { n: 5, label: 'Tech stacks' }, { n: 1, label: 'Internship' }, { n: 4, label: 'Years building' }];

export const TASKS = ['Built a production-ready enterprise authentication system using Django REST Framework and React with JWT, 2FA (TOTP), session management, audit logging, and role-based access control.','Developed a full-featured MERN stack Employee Management System with JWT auth, profile picture upload, advanced search/filtering, CSV/PDF export, and a professional Electrox Design System UI.','Created a PHP + MySQL e-commerce platform (Local Pantry) with product catalog, shopping cart, wishlist, order tracking, admin dashboard, and inventory analytics.','Built Vois, a full-stack social media platform using React, FastAPI, and MongoDB with JWT auth, post/like/comment system, follow system, trending analytics, and responsive glassmorphism UI.'];

/** Key projects — VoiceForm copy from the v8 reference; FileFlow AI and ProjectMindAI
 * descriptions, features, stacks and statuses as supplied by Tirth (2026-11-07). */
export type KeyProject = {
  id: "voiceform" | "fileflow" | "projectmind";
  title: string;
  status: string;
  cat: string;
  sub: string;
  desc: string;
  features: string[];
  tech: string[];
  tease?: string;
};

export const KEY_PROJECTS: KeyProject[] = [
  {
    id: 'voiceform', title: 'VoiceForm AI', status: 'Coming soon', cat: 'AI / ML',
    sub: 'Multilingual Voice-to-Form Accessibility Engine',
    desc: 'Point your camera at any paper form. VoiceForm reads its exact layout, holds a real voice conversation with you in Gujarati, Hindi, or English, and hands back a print-ready PDF filled in perfectly — no typing, no OCR guesswork.',
    features: ['Understands arbitrary form layouts — not OCR guesswork, actual document structure.','Holds a real multilingual voice conversation to collect every answer, field by field.','Writes responses back onto the original PDF — pixel-perfect, box by box, font-matched.'],
    tech: ['FastAPI','PaddleOCR','Whisper','Gemini','MongoDB','Next.js'],
    tease: 'You talk. It listens. And then...',
  },
  {
    id: 'fileflow', title: 'FileFlow AI', status: 'Active / In development', cat: 'Automation / RPA',
    sub: 'Your files. On autopilot.',
    desc: 'An RPA-oriented tool that automatically sorts and manages files based on configurable rules, reducing manual file cleanup.',
    features: ['Rule-based file classification across multiple folders.','Undo support for automated actions.','Authenticated dashboard with activity reports.'],
    tech: ['React','Vite','Tailwind CSS','FastAPI','MongoDB','UiPath','Windows agent'],
  },
  {
    id: 'projectmind', title: 'ProjectMindAI', status: 'Completed', cat: 'NLP / Search',
    sub: 'Turn ideas into projects.',
    desc: "Helps navigate and query project content by combining semantic search, keyword search, and an AI assistant that stays aware of the project's context.",
    features: ['Semantic search using sentence-transformer embeddings.','Keyword search using BM25, combined with semantic results.','Project/context-aware AI assistant for querying workspace content.'],
    tech: ['React','Flask','NLP','BM25','Sentence-Transformers'],
  },
];

export const EDUCATION = [
  { years: '2025 – 2027', status: 'Pursuing', chipBg: MUST, degree: 'Master of Science in Information Technology (MSc IT)', note: "Integrated Master's — Currently in Semester 9", cgpa: '' },
  { years: '2022 – 2025', status: 'Completed', chipBg: PAPER, degree: 'Bachelor of Science in Information Technology (BSc IT)', note: 'Completed as part of IMSC IT integrated program', cgpa: 'CGPA 7.64 · First Class with Distinction' },
];

export const COURSES = [
  { title: 'Claude Code in Action', meta: 'Anthropic · Mar 2026', links: [{ label: 'Certificate', href: '/claude-code-certificate.pdf' }] },
  { title: 'Master MongoDB Database Design', meta: 'Udemy · Compass + Mongosh + PyMongo · Feb 2026', links: [{ label: 'Certificate', href: '/mongodb-udemy.pdf' }] },
  { title: 'Developing Front-End Apps with React', meta: 'IBM — Coursera · 4 modules · 2026', links: [{ label: 'Certificate', href: '/ibm-react-certificate.pdf' }, { label: 'Badge', href: 'https://www.credly.com/badges/89cb78a8-a849-4529-99f6-70603ec5349c/public_url' }] },
];

export const CHANNELS = [
  { label: 'Email', value: 'vaghelatirth719@gmail.com', href: 'mailto:vaghelatirth719@gmail.com', target: '_self' },
  { label: 'GitHub', value: '@Tirthvaghela', href: 'https://github.com/Tirthvaghela', target: '_blank' },
  { label: 'LinkedIn', value: 'in/tirthvaghela', href: 'https://www.linkedin.com/in/tirthvaghela/', target: '_blank' },
  { label: 'Résumé', value: 'TV_Resume.pdf', href: '/TV_Resume.pdf', target: '_blank' },
];

export const pad = (n: number) => String(n).padStart(2, '0');
export const fmtTime = () => { try { return new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }).format(new Date()); } catch { return ''; } };
export const GLYPHS = '!<>-_\\/[]{}=+*^?#01';
