# Architect Plan — 1Touch Development Enterprise Website

## Scope Summary
Build a real monorepo full-stack app with:
- `apps/frontend`: Next.js App Router + TypeScript + Tailwind
- `apps/backend`: Express + TypeScript REST API
- `database/schema.sql`: PostgreSQL schema + idempotent seeds

Primary business goal: premium enterprise consulting website for **1Touch Development** with credible AI/ML/Data Intelligence positioning, strong SEO, and production-grade lead capture.

---

## 1) Target Repository Shape

```txt
apps/
  frontend/
    app/
    components/
    lib/
    public/
  backend/
    src/
      server.ts
      routes/
      middleware/
      db/
      content/
database/
  schema.sql
```

### Frontend env contract
- `NEXT_PUBLIC_API_URL` = public base URL of Express API
- No hardcoded localhost anywhere in frontend data fetching or forms

### Backend env contract
- `PORT` = API listen port
- `DATABASE_URL` = PostgreSQL connection string
- optional: `FRONTEND_ORIGIN` for CORS allowlist
- optional auth secret for admin/session signing if implemented as JWT/cookie (`AUTH_SECRET`)

---

## 2) Frontend Plan

### Global UX / brand system
Implement a premium enterprise visual system:
- deep navy / graphite / black foundation
- white / light-grey content sections
- electric blue + cyan accents, minimal purple
- large executive typography, generous spacing, sharp grid layouts
- sticky header, alternating dark/light sections
- subtle motion only: fade/slide reveal, counter animations, restrained parallax, animated network-node hero background

### Shared components
Create reusable components before page assembly:
- `Header` with sticky nav and CTA
- `Footer` with quick links, legal/privacy, LinkedIn, newsletter form
- `Hero` with animated network background
- `SectionIntro`
- `StatCounter`
- `LogoStrip` / Trusted Technologies band
- `CardGrid`, `ServiceCard`, `IndustryCard`, `SolutionCard`
- `ProcessTimeline`
- `TechStackGrid`
- `FeaturedInsightCard`
- `ContactForm`
- `NewsletterForm`
- `CTASection`
- `PageHero`
- `RichTextArticle`

### Page map
#### `/` Home
Sections:
1. Hero: “Enterprise AI. Built for Real Business.”
2. CTAs: Book Consultation / Explore Services
3. Trusted Technologies logos
4. Services grid preview
5. Industries preview
6. Why Choose 1Touch
7. Delivery process: Discovery → Strategy → Architecture → Development → Deployment → Optimization
8. Technology stack band
9. Featured solutions
10. Technology licensing teaser
11. Insights preview (latest 3)
12. Contact/lead capture

#### `/services`
- 14 service detail cards/sections
- each item includes: overview, business value, core technologies, relevant industries, benefits, typical projects
- allow anchor navigation for executive scanning

#### `/industries`
- 16 industry cards
- each card includes: common business problems, AI opportunities, recommended solutions, example applications

#### `/solutions`
- dedicated solution cards for:
  - AI Agents
  - Enterprise Search
  - Computer Vision
  - Predictive Analytics
  - Recommendation Engines
  - Business Automation
  - Document Intelligence
  - Knowledge Systems
  - Decision Intelligence

#### `/technology-licensing`
- licensing models: platform, API, white-label, enterprise integrations, custom licensing, support
- strong enterprise procurement / partnership framing

#### `/insights`
- blog index pulled from backend
- filter/sort ready structure, even if initial release is simple list

#### `/insights/[slug]`
- article detail page pulled from backend by slug
- SEO metadata per article

#### `/about`
- mission, vision, engineering philosophy, AI-first delivery, enterprise execution model, leadership positioning, technology partners

#### `/contact`
- consultation form posting to backend
- business email, LinkedIn, office locations, call booking CTA

### Frontend data layer
Create a small API client in `apps/frontend/lib/api.ts`:
- reads `process.env.NEXT_PUBLIC_API_URL`
- typed fetch helpers for:
  - `getServices()`
  - `getIndustries()`
  - `getSolutions()`
  - `getInsights()`
  - `getInsight(slug)`
  - `postContact(payload)`
  - `postNewsletter(payload)`
- server components for read-heavy pages where possible
- client components only for animated UI, forms, counters, and progressive interactions

### SEO / accessibility plan
- route metadata per page
- article metadata for insights detail pages
- semantic headings and landmarks
- high contrast, keyboard-safe nav/forms
- optimized image/logo handling
- minimize JS on marketing pages to protect Lighthouse score

---

## 3) Backend Plan

### Core server responsibilities
Express API should:
- read `PORT` and `DATABASE_URL`
- connect to Postgres through a shared db module
- run `initSchema()` at boot, applying `database/schema.sql`
- expose `GET /health` with API status + DB connectivity result
- enable CORS for configured frontend origin
- validate request payloads for all POST routes

### Route plan
#### Health
- `GET /health`
  - returns `{ ok: true, database: "up" | "down" }`

#### Public content routes
- `GET /api/services`
- `GET /api/industries`
- `GET /api/solutions`
- `GET /api/insights`
- `GET /api/insights/:slug`

These serve database-backed enterprise content, not frontend-hardcoded arrays.

#### Lead capture routes
- `POST /api/contact`
  - validates name, email, company, role/title, challenge/project summary, optional phone/budget/timeline
  - inserts into `contacts`
  - returns success confirmation and generated id

- `POST /api/newsletter`
  - validates email
  - inserts/upserts into `subscribers`
  - prevents duplicates with unique constraint on email

### Auth plan (required full-stack foundation)
Even though the public site is mostly read-only, include minimal admin auth groundwork so the backend is a real enterprise app rather than a static brochure API.

Recommended auth foundation:
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

Purpose:
- support future protected content/admin workflows
- secure later CMS-style management of insights/services without redesigning the API

Implementation direction for Grunt:
- keep v1 auth minimal and backend-only
- use `admin_users` + `admin_sessions` tables
- hashed passwords
- signed HTTP-only cookie session or signed JWT cookie
- protect future admin routes with auth middleware, even if initial release ships only public GET routes

### Backend modules
Suggested backend folders:
- `db/connection.ts` — pg pool creation from `DATABASE_URL`
- `db/initSchema.ts` — reads/applies `database/schema.sql`
- `middleware/cors.ts`
- `middleware/errorHandler.ts`
- `middleware/validate.ts`
- `middleware/auth.ts`
- `routes/health.ts`
- `routes/contact.ts`
- `routes/newsletter.ts`
- `routes/services.ts`
- `routes/industries.ts`
- `routes/solutions.ts`
- `routes/insights.ts`
- `routes/auth.ts`

---

## 4) Database Plan

Use PostgreSQL with idempotent DDL/DML in `database/schema.sql`.

### Required tables
#### `contacts`
Columns:
- `id` UUID PK
- `name` text
- `email` text
- `company` text
- `title` text
- `phone` text nullable
- `budget_range` text nullable
- `timeline` text nullable
- `message` text
- `created_at` timestamptz default now()

#### `subscribers`
Columns:
- `id` UUID PK
- `email` text unique
- `status` text default `active`
- `created_at` timestamptz default now()

#### `insights`
Columns:
- `id` UUID PK
- `slug` text unique
- `title` text
- `excerpt` text
- `cover_image_url` text nullable
- `category` text
- `author_name` text
- `published_at` timestamptz
- `read_time_minutes` int
- `body_markdown` text
- `is_featured` boolean default false
- `created_at` timestamptz default now()
- `updated_at` timestamptz default now()

#### `services`
Columns:
- `id` UUID PK
- `slug` text unique
- `name` text
- `summary` text
- `business_value` text
- `technologies` text[]
- `industries` text[]
- `benefits` text[]
- `typical_projects` text[]
- `sort_order` int

#### `industries`
Columns:
- `id` UUID PK
- `slug` text unique
- `name` text
- `problems` text[]
- `opportunities` text[]
- `solutions` text[]
- `example_applications` text[]
- `sort_order` int

#### `solutions`
Columns:
- `id` UUID PK
- `slug` text unique
- `name` text
- `summary` text
- `capabilities` text[]
- `business_outcomes` text[]
- `enabling_technologies` text[]
- `sort_order` int

### Auth support tables
#### `admin_users`
Columns:
- `id` UUID PK
- `email` text unique
- `password_hash` text
- `full_name` text
- `role` text default `admin`
- `created_at` timestamptz default now()

#### `admin_sessions`
Columns:
- `id` UUID PK
- `user_id` UUID FK `admin_users(id)`
- `session_token_hash` text unique
- `expires_at` timestamptz
- `created_at` timestamptz default now()

### Seed content
`schema.sql` should seed real enterprise content using `INSERT ... ON CONFLICT` for:
- 14 services
- 16 industries
- 9 solutions
- multiple insights/articles
- optional initial admin user only if env-driven bootstrap is acceptable; otherwise leave auth table empty and document setup

Content tone:
- executive, credible, operational
- outcome-focused, no hypey chatbot language
- examples grounded in enterprise workflows, compliance, operations, analytics, automation, forecasting, knowledge retrieval

---

## 5) Frontend ↔ Backend ↔ Database Wiring

### Frontend to backend
- all frontend reads/writes go through `NEXT_PUBLIC_API_URL`
- examples:
  - services page fetches `${NEXT_PUBLIC_API_URL}/api/services`
  - insights detail fetches `${NEXT_PUBLIC_API_URL}/api/insights/:slug`
  - contact form posts to `${NEXT_PUBLIC_API_URL}/api/contact`
  - footer newsletter posts to `${NEXT_PUBLIC_API_URL}/api/newsletter`

### Backend to database
- backend creates pg pool from `process.env.DATABASE_URL`
- `initSchema()` runs on boot against that connection
- route handlers query the seeded relational tables
- `GET /health` should verify an actual DB query, not just process uptime

### Deployment assumptions
- frontend and backend can deploy separately
- CORS should allow the frontend deployment origin only
- frontend can statically optimize some marketing routes while still consuming backend content via runtime fetch

---

## 6) Recommended Execution Order for Grunt

1. Scaffold monorepo directories and shared TypeScript/Tailwind basics
2. Build backend server, DB connection, `initSchema()`, and `GET /health`
3. Author `database/schema.sql` with all tables + idempotent seeds
4. Implement public content endpoints
5. Implement contact + newsletter POST endpoints with validation
6. Add auth foundation endpoints/middleware/tables
7. Build shared frontend shell (layout, header, footer, theme)
8. Build home page sections and reusable cards
9. Build services / industries / solutions / licensing / about / contact pages
10. Build insights listing + article detail pages from API
11. Connect forms to backend using `NEXT_PUBLIC_API_URL`
12. Final polish: responsive tuning, accessibility, SEO metadata, performance/motion refinement

---

## 7) Risks / Guardrails
- Do not turn the site into a consumer chatbot aesthetic
- Do not hardcode content in the frontend if the backend table is meant to own it
- Keep animations subtle and GPU-cheap
- Preserve Lighthouse with server components and minimal client JS
- Treat auth as foundation for admin extensibility, not as visible product feature on day one

---

## 8) Handoff to Next Role
Grunt should implement exactly against this contract:
- monorepo layout under `apps/frontend`, `apps/backend`, `database/schema.sql`
- frontend API base from `NEXT_PUBLIC_API_URL`
- backend DB base from `DATABASE_URL`
- required public endpoints + `GET /health`
- required tables + idempotent seeds
- minimal auth foundation present in backend architecture

ARCHITECT_DONE: plan ready for Grunt.
