# ABH-11: Onetouch-development

Build a premium enterprise website for "1Touch Development", an AI/ML/Data Intelligence consulting firm. Positioning: credible, Fortune-500-grade, "We solve difficult business problems using AI." Design inspiration: Palantir, Databricks, Snowflake, Scale AI. NOT a consumer AI/chatbot look.



STACK (must be full-stack, standard monorepo apps/frontend + apps/backend + database/schema.sql):

\- Frontend: Next.js (App Router) + TypeScript + Tailwind CSS. Reads NEXT\_PUBLIC\_API\_URL for the backend base URL (no hardcoded localhost). SEO-optimized, fully responsive, accessible, 95+ Lighthouse, subtle professional animations (fade/slide/parallax, animated network nodes, number counters). Sticky header, alternating light/dark sections, grid card layouts.

\- Backend: Express + TypeScript API. Reads process.env.PORT and process.env.DATABASE\_URL. Exposes GET /health returning db status. On boot runs initSchema() applying database/schema.sql (idempotent: CREATE TABLE IF NOT EXISTS, INSERT ... ON CONFLICT). Endpoints: POST /api/contact (consultation form -> contacts table), POST /api/newsletter (-> subscribers table), GET /api/insights + GET /api/insights/:slug (blog articles), GET /api/services, GET /api/industries, GET /api/solutions. Validate inputs, CORS enabled for the frontend origin.

\- Database: PostgreSQL. Tables: contacts, subscribers, insights (articles), services, industries, solutions. Seed services/industries/solutions/insights with real enterprise content.



COLORS: deep navy, dark graphite, black; white/light grey; accent electric blue + cyan; very limited purple; no rainbow gradients, no neon, no cyberpunk. Typography: professional, large headings, lots of whitespace, no playful fonts.



PAGES (each in the nav): Home, Services, Industries, Solutions, Technology Licensing, Insights, About, Contact.

\- Home: hero ("Enterprise AI. Built for Real Business." + CTAs Book Consultation / Explore Services, animated network background), Trusted Technologies logos (AWS, Azure, GCP, OpenAI, Anthropic, Databricks, Snowflake, Python, TensorFlow, PyTorch, LangChain, MCP), Services grid, Industries cards, Why Choose 1Touch, Process (Discovery→Strategy→Architecture→Development→Deployment→Optimization), Technology Stack, Featured Solutions, Technology Licensing teaser, Insights preview, Contact.

\- Services page: each of the 14 services (AI Strategy & Consulting, Machine Learning, Generative AI, LLM Development, Computer Vision, AI Agents, Multi-Agent Systems, Automation, Data Engineering, Business Intelligence, Predictive Analytics, Custom AI Software, Technology Licensing, Enterprise Integration) with overview, business value, technologies, industries, benefits, typical projects.

\- Industries page: 16 industries (Football, Finance, Healthcare, Retail, Manufacturing, Insurance, Government, Education, Logistics, Energy, Telecommunications, Media, Real Estate, Construction, Mining, Agriculture), each a card with problems, AI opportunities, solutions, example applications.

\- Solutions page: AI Agents, Enterprise Search, Computer Vision, Predictive Analytics, Recommendation Engines, Business Automation, Document Intelligence, Knowledge Systems, Decision Intelligence.

\- Technology Licensing page: platform licensing, API licensing, white-label software, enterprise integrations, custom licensing, support.

\- Insights: modern blog list + article pages, pulled from the backend.

\- About: mission, vision, engineering philosophy, AI-first, enterprise delivery, global consulting, leadership, technology partners.

\- Contact: consultation form (posts to /api/contact), business email, LinkedIn, office locations, call booking.

\- Footer: quick links (Services, Industries), Legal, Privacy, LinkedIn, copyright, newsletter signup (posts to /api/newsletter).



Tone: professional, executive, confident, engineering/outcome-focused. No exaggerated claims. Production-ready.


---
## FULL-STACK TECH CONTRACT (mandatory unless the request is explicitly frontend/static-only)

Deliver a REAL, wired-together full-stack app — buttons and forms MUST perform real actions that persist to a database via a backend API. Do NOT ship a static frontend with mocked data.

**Repository layout (monorepo):**
- **Frontend** (repo root): Next.js 14 App Router + TypeScript. The UI is a client app that fetches live data from the backend using `process.env.NEXT_PUBLIC_API_URL`.
- **Backend** (`backend/`): Node.js + Express + TypeScript using the `pg` driver. Reads `process.env.DATABASE_URL` and `process.env.PORT` (default 4000). Exposes `GET /health`, full CRUD REST endpoints for the domain, and auth (`POST /auth/signup`, `POST /auth/login` returning a JWT). `backend/package.json` must define scripts `build` (tsc), `start` (node dist/index.js) and `main` = `dist/index.js`.
- **Database** (`database/schema.sql`): `CREATE TABLE IF NOT EXISTS` statements for a `users` table (email UNIQUE + password_hash) and all domain tables. This file is auto-applied by the deploy pipeline.

**Wiring rules:**
- Frontend → Backend over HTTP via `NEXT_PUBLIC_API_URL` (the deploy pipeline injects this automatically).
- Backend → Database via `DATABASE_URL` (the deploy pipeline injects this automatically). Use parameterized queries. Enable Postgres SSL when the URL points at RDS/AWS.
- Keep imports/exports consistent so every `npm run build` succeeds for both apps.
