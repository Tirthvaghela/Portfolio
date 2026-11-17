/** Site-wide content — every string here is copied verbatim from the v8 reference. */
import { MUST, PAPER } from "./palette";

/** Résumé link, versioned by the PDF's fingerprint (set in next.config.ts) so updates show immediately. */
const RESUME = `/TV_Resume.pdf?v=${process.env.NEXT_PUBLIC_RESUME_V ?? "1"}`;

export const SITE = {
  name: "Tirth Vaghela",
  url: "https://tirthvaghela.in",
  email: "vaghelatirth719@gmail.com",
  github: "https://github.com/Tirthvaghela",
  linkedin: "https://www.linkedin.com/in/tirthvaghela/",
  collaborator: "https://www.linkedin.com/in/dhruv-sadrawala22/",
  resume: RESUME,
  githubChart: "https://ghchart.rshah.org/2a7a6f/Tirthvaghela",
  location: "Ahmedabad, Gujarat, India",
};


export const SECTIONS: [string, string][] = [['about','About'],['key','Key projects'],['work','Work'],['systems','Systems'],['skills','Skills'],['experience','Experience'],['contact','Contact']];

export const LEAD = "I'm in Semester 9 of the integrated MSc IT programme at GLS University, Ahmedabad. The BSc IT half finished in 2025 with First Class with Distinction.";

export const STATS = [{ n: 8, label: 'Projects shipped' }, { n: 5, label: 'Tech stacks' }, { n: 2, label: 'Internships' }, { n: 4, label: 'Years building' }];

/** Key projects — VoiceForm copy from the v8 reference; FileFlow AI and ProjectMindAI
 * descriptions, features, stacks and statuses as supplied by Tirth (2026-11-07). */
export type KeyProject = {
  id: "voiceform" | "fileflow" | "projectmind";
  title: string;
  status: string;
  /** Build time in days (shown as "N days to build", like the Work reel). */
  days: number;
  cat: string;
  sub: string;
  desc: string;
  features: string[];
  tech: string[];
  tease?: string;
  /** Public source repository. */
  github: string;
  /** Real application screenshots (files in /public, original pixel size). */
  shots: Shot[];
  /** System flow for the Systems section: [step, how] × 4, plus one highlighted behaviour [tag, text]. */
  pipeline: [string, string][];
  highlight?: [string, string];
};

export type Shot = { src: string; w: number; h: number; caption: string };

export const KEY_PROJECTS: KeyProject[] = [
  {
    id: 'voiceform', title: 'VoiceForm AI', status: 'Completed', days: 90, github: 'https://github.com/Tirthvaghela/VoiceForm.Ai',
    shots: [
      { src: '/voice-form ss/10.review-detected-fields.png', w: 1919, h: 955, caption: 'Reads the real form layout: 25 fields look right, 4 flagged for a check' },
      { src: '/voice-form ss/13.voice-asking-field.png', w: 1919, h: 956, caption: 'Asks for each field by voice, then confirms what it heard' },
      { src: '/voice-form ss/14.form-verification-complete.png', w: 1919, h: 955, caption: 'All 9 answers verified and overlaid onto the original form' },
    ],
    pipeline: [['Add the form', 'Photo, PDF or Google Form link'], ['Detect fields', 'PaddleOCR reads the real layout'], ['Voice interview', 'Gujarati, Hindi or English'], ['Fill the PDF', 'Answers overlaid onto the original']],
    highlight: ['Voice fix', 'Spotted a typo? Say "edit email" and the field is corrected by voice'], cat: 'AI / ML',
    sub: 'Multilingual Voice-to-Form Accessibility Engine',
    desc: 'Point your camera at any paper form. VoiceForm reads its exact layout, holds a real voice conversation with you in Gujarati, Hindi, or English, and hands back a print-ready PDF filled in perfectly — no typing, no OCR guesswork.',
    features: ['Understands arbitrary form layouts — not OCR guesswork, actual document structure.','Holds a real multilingual voice conversation to collect every answer, field by field.','Writes responses back onto the original PDF — pixel-perfect, box by box, font-matched.'],
    tech: ['FastAPI','PaddleOCR','Whisper','Gemini','MongoDB','Next.js'],
    tease: 'You talk. It listens. And then...',
  },
  {
    id: 'fileflow', title: 'FileFlow AI', status: 'Completed', days: 54, github: 'https://github.com/Tirthvaghela/FileFlow',
    shots: [
      { src: '/fileflow ss/dashboard-light.png', w: 1440, h: 2124, caption: 'Dashboard: files organised today, rule matches and recent moves' },
      { src: '/fileflow ss/rules-light.png', w: 1440, h: 2082, caption: 'Rules: the configurable rules that decide where every file goes' },
    ],
    pipeline: [['Watch folders', 'Agent watches Downloads'], ['Match rules', 'Your rules classify each file'], ['Organise', 'Moved to the right folder'], ['Report', 'Activity log and reports']],
    highlight: ['Undo', 'Wrong move? Any automated action can be undone'], cat: 'Automation / RPA',
    sub: 'Your files. On autopilot.',
    desc: 'An RPA-oriented tool that automatically sorts and manages files based on configurable rules, reducing manual file cleanup.',
    features: ['Rule-based file classification across multiple folders.','Undo support for automated actions.','Authenticated dashboard with activity reports.'],
    tech: ['React','Vite','Tailwind CSS','FastAPI','MongoDB','UiPath','Windows agent'],
  },
  {
    id: 'projectmind', title: 'ProjectMindAI', status: 'Completed', days: 45, github: 'https://github.com/Tirthvaghela/ProjectMindAi',
    shots: [
      { src: '/projectmind ss/2.semantic-search-results.png', w: 1440, h: 900, caption: 'Hybrid search: meaning (sentence-transformers) plus keywords (BM25), ranked together' },
      { src: '/projectmind ss/6.project-detail.png', w: 1440, h: 900, caption: 'Project detail: stack, required skills, learning resources and your skill gap' },
    ],
    pipeline: [['Describe it', 'Plain-language project query'], ['Semantic search', 'Sentence-Transformer embeddings'], ['Keyword search', 'BM25 over the same catalogue'], ['Hybrid ranking', 'Meaning + keywords combined']],
    highlight: ['AI assistant', 'Ask follow-up questions; it stays aware of the project context'], cat: 'NLP / Search',
    sub: 'Turn ideas into projects.',
    desc: "Helps navigate and query project content by combining semantic search, keyword search, and an AI assistant that stays aware of the project's context.",
    features: ['Semantic search using sentence-transformer embeddings.','Keyword search using BM25, combined with semantic results.','Project/context-aware AI assistant for querying workspace content.'],
    tech: ['React','Flask','NLP','BM25','Sentence-Transformers'],
  },
];

/** Hero sentence: "I build software that …" — each phrase links to its Key project panel. */
export const KEY_CLAIMS: [string, string][] = [
  ['fills paper forms by voice', 'voiceform'],
  ['sorts your files on autopilot', 'fileflow'],
  ['turns ideas into projects', 'projectmind'],
];

/** WeIntern internship: two weeks of assignments, then the team minor project. Every line is taken
 *  from the linked READMEs; the fictional businesses are labelled as such (`note`). No dates given. */
export type BuildTask = {
  title: string;
  /** One-line summary. */
  desc: string;
  /** Short label for demo content, e.g. "Fictional studio". */
  note?: string;
  points: string[];
  tech: string[];
  readme: string;
  live?: string;
  shot?: Shot;
};
export type BuildStage = { id: string; n: string; label: string; week: string; title: string; tasks: BuildTask[] };

const W1 = 'https://github.com/Tirthvaghela/week1-assignments/blob/master';
const W2 = 'https://github.com/Tirthvaghela/week2-assignment/blob/main';

export const WEINTERN = {
  company: 'WeIntern',
  role: 'Full-stack web development intern',
  status: 'Current',
  headline: ['Every build', 'started with', 'a task.'],
  lede: 'Two weeks of assignments, six builds, and one team project taken live.',
  stages: [
    {
      id: 'learn', n: '01', label: 'Learn', week: 'Week 01', title: 'Frontend foundations',
      tasks: [
        { title: 'Personal portfolio', desc: 'A responsive six-page portfolio: Home, About, Projects, Skills, Resume and Contact.',
          points: ['Semantic HTML structure', 'Projects with a category filter', 'Responsive navigation', 'Contact form validation', 'Dark and light theme switch', 'Accessibility and reduced-motion support'],
          tech: ['HTML5', 'CSS3', 'JavaScript'], readme: `${W1}/portfolio-website/README.md`, live: 'https://tirth-portfolio-website.vercel.app' },
        { title: 'AURA Studio', note: 'Fictional studio', desc: 'Landing page for an invented architecture and interior design studio.',
          points: ['Editorial, architecture-inspired layout', 'CSS Grid and Flexbox', 'Interactive services accordion', 'Stacked project panels and viewer', 'Scroll word reveal and number counters', 'Validated contact form'],
          tech: ['HTML5', 'CSS3', 'JavaScript'], readme: `${W1}/business-landing-page/README.md`, live: 'https://aura-studio-khaki.vercel.app' },
        { title: 'Nimbus', note: 'Static demo data', desc: 'A fictional analytics product site, built to show CSS layout and animation.',
          points: ['Flexbox and CSS Grid', 'Responsive dashboard layout', 'Transitions and transforms', 'Keyframe animation', 'Semantic, accessible markup'],
          tech: ['HTML5', 'CSS3'], readme: `${W1}/css-challenge/README.md`, live: 'https://nimbus-css-challenge.vercel.app' },
      ],
    },
    {
      id: 'build', n: '02', label: 'Build', week: 'Week 02', title: 'Functional applications',
      tasks: [
        { title: 'Larkfield Systems', note: 'Fictional company', desc: 'A four-page website for an invented managed IT support provider.',
          points: ['Home, About, Services and Contact', 'Responsive navigation and mobile menu', 'Six numbered features, four-step onboarding', 'Service cards and plans', 'Client-side form validation'],
          tech: ['HTML5', 'CSS3', 'JavaScript'], readme: `${W2}/task-1-company-website/README.md`, live: 'https://larkfield-systems.vercel.app' },
        { title: 'Employee Management · Flask', desc: 'A full-stack CRUD app: a React frontend on a Flask REST API, with records stored in MongoDB.',
          points: ['Create, edit and delete employees', 'Department filter, search, sort and pages', 'Headcount and payroll summaries', 'Validation in the API and the database'],
          tech: ['React 19', 'Vite', 'Flask 3', 'MongoDB', 'PyMongo', 'pytest'], readme: `${W2}/task-2-employee-management/README.md`,
          live: 'https://employee-management-app-theta-ivory.vercel.app',
          shot: { src: '/weintern/employee-management-dashboard.png', w: 1440, h: 900, caption: 'Employee Management dashboard (demo records)' } },
        { title: 'Harbor Auth', desc: 'Registration and login with a protected dashboard and expiring sessions.',
          points: ['Log in with email or username', 'bcrypt password hashing', 'JWT in an HttpOnly cookie', 'Protected dashboard, logout and session expiry', 'Validation, sanitization, password strength meter'],
          tech: ['React 19', 'React Router', 'Flask 3', 'MongoDB', 'bcrypt', 'PyJWT'], readme: `${W2}/task-3-authentication-system/README.md`,
          live: 'https://harbor-auth-system.vercel.app',
          shot: { src: '/weintern/harbor-dashboard.png', w: 1440, h: 900, caption: 'Harbor protected dashboard (demo account)' } },
      ],
    },
  ] as BuildStage[],
};

/** WeIntern minor project (Team 01). Status follows the README: live, with deployment QA still open.
 *  Only two public actions: the live app and the repository (no API links). */
export const HELP_DESK = {
  title: 'Help Desk',
  sub: 'Customer support ticket system',
  kicker: 'WeIntern · Team 01 · MERN',
  status: 'Live on Vercel',
  statusNote: 'Deployment QA in progress',
  desc: 'A MERN app where customers raise support tickets and follow them, agents work a shared queue, and admins run users, categories and ticket volume.',
  live: 'https://help-desk-web-app.vercel.app/',
  repo: 'https://github.com/Tirthvaghela/help-desk',
  role: 'Team leader · Backend integration, admin backend & DevOps',
  stack: [['Frontend', 'React 19 · Vite · React Router · Tailwind CSS'], ['Backend', 'Node.js · Express 5 · Mongoose · JWT'], ['Data', 'MongoDB · MongoDB Atlas'], ['DevOps', 'GitHub Actions · Vercel · Resend']] as [string, string][],
  /** How it works: one ticket's path. Each stage pairs a lifecycle status with who acts on it. */
  flow: [
    { status: 'Open', who: 'Customer', title: 'Create a support request',
      steps: ['Signs in and creates a ticket', 'Picks a category, describes the issue', 'Tracks its status and the conversation'] },
    { status: 'In progress', who: 'Support agent', title: 'Claim it and reply',
      steps: ['Works the queue with filters and search', 'Claims the ticket, sets its priority', 'Replies to the customer in the thread'] },
    { status: 'Resolved', who: 'Support agent', title: 'Close the loop',
      steps: ['Moves the status forward to Resolved', 'Customer is notified in the app and by email', 'Every change stays in the status history'] },
  ],
  admin: { who: 'Admin', title: 'Run the support system', steps: ['Manages users: roles and activation', 'Manages ticket categories', 'Reviews ticket volume, statistics and reports'] },
  team: [
    { name: 'Tirth Vaghela', lead: true, side: 'Backend', role: 'Backend integration, admin backend & DevOps', github: 'https://github.com/Tirthvaghela',
      points: ['Backend architecture and API integration', 'Admin backend APIs', 'Shared database and API coordination', 'Integration across customer, agent and admin modules', 'Integration testing and deployment coordination'] },
    { name: 'Mimansa Patle', side: 'Frontend', role: 'Customer frontend & landing page', github: 'https://github.com/MimansaPatle',
      points: ['Landing page', 'Sign-up and login', 'Customer dashboard', 'Create-ticket form and ticket history', 'Loading, validation and error states'] },
    { name: 'Swatismita Parija', side: 'Backend', role: 'Tickets & authentication', github: 'https://github.com/Swatismita05',
      points: ['Authentication and JWT', 'User, Ticket and Category models', 'Ticket creation', 'Customer ticket history', 'Ticket ownership and access checks'] },
    { name: 'Shwetaleena Kundu', side: 'Frontend', role: 'Agent / admin frontend', github: 'https://github.com/Shwetaleena-Kundu',
      points: ['Agent dashboard', 'Ticket filters and replies', 'Ticket assignment and status updates', 'Admin user and category screens'] },
    { name: 'Ayushi Rathi', side: 'Backend', role: 'Agent workflow & conversations', github: 'https://github.com/Ayushiiiii13',
      points: ['Agent ticket queue', 'Search and filters', 'Ticket assignment and status transitions', 'Replies and conversations', 'Ticket history and admin summaries'] },
  ] as { name: string; lead?: boolean; side: string; role: string; github: string; points: string[] }[],
};

/** Prodigy InfoTech internship — dates, certificate, LOR and quote unchanged from the previous card;
 *  the four builds come from each repository's README. Repositories only: none has a live demo. */
export const PRODIGY = {
  company: 'Prodigy InfoTech',
  role: 'Full-stack web development intern',
  where: 'Remote',
  dates: 'Feb 2026 – Mar 2026',
  certificate: '/Certificate.pdf',
  lor: '/lor.pdf',
  quote: 'His attention to detail, creativity, and willingness to go the extra mile set him apart from his peers.',
  quoteBy: 'Deven Chopra, Software Engineering Manager at Prodigy InfoTech',
  projects: [
    { title: 'Prodigy Auth', kind: 'Authentication', tone: 'teal', motif: ['JWT', 'TOTP', 'RBAC'], desc: 'An authentication and user-management system built with Django REST Framework and React.',
      points: ['JWT auth and TOTP two-factor with QR and backup codes', 'Session management, account locking and audit logs', 'Role-based access control and an admin dashboard'],
      tech: ['Django 5.1', 'DRF', 'SimpleJWT', 'PyOTP', 'SQLite', 'React'], repo: 'https://github.com/Tirthvaghela/PRODIGY_FS_TASK01' },
    { title: 'Employee Management · MERN', kind: 'HR system', tone: 'must', motif: ['CRUD', 'CSV', 'PDF'], desc: 'A MERN employee management app with Admin and HR roles.',
      points: ['Employee CRUD with profile picture uploads', 'Search, filters and CSV / PDF export', 'Dashboard statistics and department analytics'],
      tech: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'React'], repo: 'https://github.com/Tirthvaghela/PRODIGY-FS-TASK02' },
    { title: 'FreshValut — Local Pantry', kind: 'E-commerce', tone: 'red', motif: ['Cart', 'Order', 'Track'], desc: 'A PHP e-commerce platform for local grocery stores and small businesses.',
      points: ['Catalog, search, cart, wishlist and order tracking', 'Product, inventory and order management', 'Admin dashboard with sales analytics and reports'],
      tech: ['PHP', 'MySQL', 'Tailwind CSS', 'AJAX'], repo: 'https://github.com/Tirthvaghela/FreshValut' },
    { title: 'Vois', kind: 'Social platform', tone: 'paper', motif: ['Posts', 'Stories', 'DMs'], desc: 'A full-stack social media app with posts, stories and direct messages.',
      points: ['Posts with media carousels, 24-hour stories', 'Nested comments, messaging and notifications', 'Follow system, hashtags, search and explore'],
      tech: ['React 18', 'Vite', 'Tailwind CSS', 'FastAPI', 'MongoDB', 'PyJWT'], repo: 'https://github.com/Tirthvaghela/Vois' },
  ],
};

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
  { label: 'Résumé', value: 'TV_Resume.pdf', href: RESUME, target: '_blank' },
];

export const pad = (n: number) => String(n).padStart(2, '0');
export const fmtTime = () => { try { return new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }).format(new Date()); } catch { return ''; } };
export const GLYPHS = '!<>-_\\/[]{}=+*^?#01';
