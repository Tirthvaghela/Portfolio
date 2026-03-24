export const personalInfo = {
  name: "Tirth Vaghela",
  title: "Full-Stack Developer",
  subtitle: "MSc IT Student @ GLS University",
  email: "vaghelatirth719@gmail.com",
  location: "Ahmedabad, Gujarat, India",
  github: "https://github.com/Tirthvaghela",
  linkedin: "https://www.linkedin.com/in/tirthvaghela/",
  summary:
    "Motivated IMSC IT student at GLS University with strong skills in full-stack web development. Experienced in building modern web applications using Python, Django, Next.js, React, and databases like MySQL and MongoDB. Passionate about developing scalable applications and continuously learning new technologies.",
};

export const skills = {
  "Programming Languages": ["Python", "JavaScript", "TypeScript", "SQL"],
  "Frontend": ["React", "Next.js", "HTML", "CSS", "Tailwind CSS", "Flutter"],
  "Backend": ["Django", "Flask", "Node.js", "FastAPI", "REST APIs"],
  "Databases": ["MySQL", "MongoDB", "SQLite"],
  "AI / ML": ["YOLOv4", "YOLOv8", "OpenCV", "DeepFace", "ArcFace"],
  "Tools": ["Git", "GitHub", "VS Code", "Kiro", "Vercel"],
};

export const experience = [
  {
    company: "Prodigy InfoTech",
    role: "Full-Stack Web Development Intern",
    type: "Remote",
    period: "02/2026",
    points: [
      "Task 1 — Built a production-ready enterprise authentication system using Django REST Framework and React with JWT, 2FA (TOTP), session management, audit logging, and role-based access control.",
      "Task 2 — Developed a full-featured MERN stack Employee Management System with JWT auth, profile picture upload, advanced search/filtering, CSV/PDF export, and a professional Electrox Design System UI.",
      "Task 3 — Created a PHP + MySQL e-commerce platform (Local Pantry) with product catalog, shopping cart, wishlist, order tracking, admin dashboard, and inventory analytics.",
      "Task 4 — Built Vois, a full-stack social media platform using React, FastAPI, and MongoDB with JWT auth, post/like/comment system, follow system, trending analytics, and responsive glassmorphism UI.",
    ],
  },
];

export const education = [
  {
    institution: "GLS University",
    degree: "Master of Science in Information Technology (MSc IT)",
    note: "Integrated Master's — Currently in Semester 8",
    period: "2025 – 2027",
    status: "Pursuing",
  },
  {
    institution: "GLS University",
    degree: "Bachelor of Science in Information Technology (BSc IT)",
    note: "Completed as part of IMSC IT integrated program",
    period: "2022 – 2025",
    status: "Completed",
  },
];

export const projects = [
  {
    id: 1,
    title: "Urban Signal",
    subtitle: "Intelligent Traffic Management System",
    tech: ["Next.js", "TypeScript", "Flask", "OpenCV", "YOLOv4", "MySQL"],
    description:
      "AI-powered traffic management system analyzing real-time camera feeds to optimize signal timing with emergency vehicle detection.",
    points: [
      "Developed AI-powered traffic management system analyzing real-time camera feeds to optimize signal timing.",
      "Implemented vehicle detection and classification using YOLOv4 and OpenCV.",
      "Designed dynamic signal timing algorithm based on traffic density across multiple lanes.",
      "Integrated emergency vehicle detection to prioritize ambulance lanes automatically.",
    ],
    github: "https://github.com/Tirthvaghela/Urban_Signal",
    category: "AI / ML",
    color: "#6366f1",
  },
  {
    id: 2,
    title: "EventEase",
    subtitle: "Event Management Platform",
    tech: ["Django", "Django REST Framework", "SQLite"],
    description:
      "Web-based event management system for colleges with admin and student roles, RSVP system, and real-time capacity tracking.",
    points: [
      "Built a web-based event management system for colleges with admin and student roles.",
      "Implemented RSVP system with real-time capacity tracking and event status updates.",
      "Developed REST APIs and email notification system for event updates.",
      "Enabled role-based authentication and multi-college support.",
    ],
    github: "https://github.com/Tirthvaghela/EventEase",
    category: "Web",
    color: "#10b981",
  },
  {
    id: 3,
    title: "FreshVault",
    subtitle: "Local Pantry E-Commerce Platform",
    tech: ["PHP", "MySQL", "Tailwind CSS"],
    description:
      "Full-featured e-commerce platform for local grocery businesses with product management, cart, wishlist, and admin dashboard.",
    points: [
      "Developed a full-featured e-commerce platform for local grocery businesses.",
      "Implemented product management, shopping cart, wishlist, and order tracking system.",
      "Built admin dashboard for inventory, orders, and analytics management.",
      "Designed responsive UI using Tailwind CSS.",
    ],
    github: "https://github.com/Tirthvaghela/FreshValut",
    category: "Web",
    color: "#f59e0b",
  },
  {
    id: 4,
    title: "Vois",
    subtitle: "Social Media Platform",
    tech: ["React", "FastAPI", "MongoDB", "JWT"],
    description:
      "Full-stack social media platform with posts, likes, comments, follow system, and JWT-based authentication.",
    points: [
      "Developed a full-stack social media platform with posts, likes, comments, and follow system.",
      "Implemented JWT-based authentication and secure password hashing.",
      "Built REST APIs for user management, feed generation, and analytics features.",
      "Designed responsive UI using React, Vite, and TailwindCSS.",
    ],
    github: "https://github.com/Tirthvaghela/Vois",
    category: "Full-Stack",
    color: "#ec4899",
  },
  {
    id: 5,
    title: "Electrox-Mobile",
    subtitle: "Mobile Digital Voting Platform",
    tech: ["Flutter", "Node.js", "Express", "MongoDB", "JWT"],
    description:
      "Full-stack mobile voting application with role-based access for Admin, Organizer, Candidate, and Voter.",
    points: [
      "Developed a full-stack mobile voting application with role-based access (Admin, Organizer, Candidate, Voter).",
      "Built secure backend APIs using Node.js and Express with JWT authentication and MongoDB.",
      "Implemented election lifecycle management including vote casting, result tracking, and audit logging.",
      "Integrated email notifications, deep linking, and real-time updates for election activities.",
    ],
    github: "https://github.com/Tirthvaghela/Electrox-Mobile",
    category: "Mobile",
    color: "#3b82f6",
  },
  {
    id: 6,
    title: "RIGS",
    subtitle: "Roadside Intelligent Governance System",
    tech: ["React", "Node.js", "MongoDB", "YOLOv8", "OpenCV"],
    description:
      "AI-based system for helmet detection and automated e-challan generation with license plate recognition.",
    points: [
      "Developed an AI-based system for helmet detection and automated e-challan generation.",
      "Integrated YOLOv8 and OCR for license plate recognition and violation detection.",
      "Built real-time dashboard for monitoring traffic violations and analytics.",
      "Implemented automated email system for sending challans to vehicle owners.",
    ],
    github: "https://github.com/Tirthvaghela/RIGS",
    category: "AI / ML",
    color: "#ef4444",
  },
  {
    id: 7,
    title: "Wedding Face Finder",
    subtitle: "AI Photo Search System",
    tech: ["Flask", "DeepFace", "ArcFace", "RetinaFace"],
    description:
      "AI-powered face recognition system to find users in large photo collections using DeepFace and ArcFace.",
    points: [
      "Developed AI-powered face recognition system to find users in photo collections.",
      "Implemented face detection and similarity matching using DeepFace and ArcFace.",
      "Built webcam capture interface and automated photo matching pipeline.",
      "Enabled batch download and adaptive matching for accurate results.",
    ],
    github: "https://github.com/Tirthvaghela/Wedding-Face-Finder",
    category: "AI / ML",
    color: "#8b5cf6",
  },
  {
    id: 8,
    title: "Electrox Web",
    subtitle: "Secure Digital Voting Platform",
    tech: ["React", "Flask", "MongoDB", "JWT"],
    description:
      "Secure role-based online voting system with JWT authentication, bcrypt hashing, and election analytics.",
    points: [
      "Built a secure role-based online voting system with Admin, Organizer, Candidate, and Voter roles.",
      "Implemented JWT authentication and bcrypt password hashing for security.",
      "Developed election creation, vote casting, and result analytics features.",
      "Integrated email notifications and audit logging system.",
    ],
    github: "https://github.com/Tirthvaghela/Electrox",
    category: "Full-Stack",
    color: "#06b6d4",
  },
];
