# Tirth Vaghela — Portfolio

> **Live:** [tirthvaghela.in](https://tirthvaghela.in)

Personal portfolio of **Tirth Vaghela**, a full-stack developer and MSc IT student at GLS University, Ahmedabad. It's a single long page built with Next.js and GSAP, with a WebGL hero, scroll-driven sections, and a contact form that delivers through Formspree.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | CSS Modules + a small global stylesheet (`app/globals.css`) |
| Motion | GSAP 3 + ScrollTrigger via `@gsap/react` (`useGSAP`); one shared `gsap.ticker` loop |
| Hero | Raw WebGL1 fragment shader (the liquid "TIRTH VAGHELA" name) |
| Fonts | `next/font/google`: Bricolage Grotesque (variable, `wght` + `wdth` axes), Instrument Serif, JetBrains Mono |
| Contact form | [Formspree](https://formspree.io) |
| Visitor counter | Upstash Redis via `/api/visits` |
| Hosting | Vercel (+ Vercel Analytics) |

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
```

### Environment variables

Only the visitor counter needs them. Without them the site works and the footer simply hides the count.

| Variable | Purpose |
|---|---|
| `STORAGE_REDIS_REST_URL` or `KV_REST_API_URL` | Upstash Redis REST URL |
| `STORAGE_REDIS_REST_TOKEN` or `KV_REST_API_TOKEN` | Upstash Redis REST token |

## Project structure

```
app/
  layout.tsx            fonts, metadata/SEO, JSON-LD, motion boot script
  page.tsx              renders <Site />
  globals.css           design tokens + shared type classes
  projects/[slug]/      standalone case-study page per project
  api/visits/           visitor counter (Redis INCR)
  opengraph-image.tsx   share card for WhatsApp / LinkedIn / X
  icon.tsx, apple-icon.tsx, manifest.ts, sitemap.ts, robots.ts
  og/                   static fonts used only by the share card and icons
components/site/        every section, one component + CSS Module each
  Hero.tsx              loader, WebGL name, scroll dive
  KeyProjects.tsx       VoiceForm AI, FileFlow AI, ProjectMindAI
  Work.tsx              pinned horizontal project reel + filters/search
  Cover.tsx             illustrated project covers (SVG)
  Systems.tsx, Skills.tsx, Experience.tsx, Contact.tsx, Footer.tsx, …
  ScrollMotion.tsx      page-wide reveals, sheet scaling, counters
  Micro.tsx             cursor, magnetic buttons, text scramble
content/                all text and data, separate from the UI
  site.ts               links, key projects, education, courses, contact channels
  projects.ts           the 9 projects in the Work reel
  skills.ts             skill groups for the orbit
  palette.ts            colour constants
lib/gsap.ts             GSAP + ScrollTrigger registration, breakpoints
```

## Editing content

All copy lives in `content/`, so most updates don't touch a component.

- **Add or edit a project:** `content/projects.ts`. Each project can take an optional `image` (a path under `public/`); if it's set, that screenshot replaces the illustrated cover. Add the matching URL slug to `SLUGS` in the same file.
- **Key projects:** `KEY_PROJECTS` in `content/site.ts`.
- **Contact form endpoint:** `SITE.formspree` in `content/site.ts`.
- **Résumé / certificates:** replace the PDFs in `public/` (keep the file names, or update the links in `content/site.ts`).

## Motion and accessibility

- Animation follows the visitor's system setting: with **reduce motion** turned on there's no loader, pinning or scrubbing, and every section is visible and static.
- Keyboard: skip link, focus-trapped project dialog (← / → to switch projects, Esc to close), focus-trapped mobile menu, visible focus rings.
- Mobile gets touch-adapted versions of every animation (touch ripples on the hero, stacked reel with tilt/parallax, pinned compact skills orbit, vertical pipeline).

## Deploying

Push to `main` and Vercel builds and deploys automatically. Set the Redis variables above in the Vercel project for the visitor counter.
