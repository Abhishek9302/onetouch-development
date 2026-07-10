# 1Touch Development

Premium enterprise website and API platform for **1Touch Development**, an AI/ML/Data Intelligence consulting firm positioned around a simple promise: **we solve difficult business problems using AI**.

## What was built for ABH-11

This ticket delivers a full-stack monorepo with:

- **Next.js 14 + TypeScript frontend** for the public marketing experience
- **Express + TypeScript backend** serving health, content, contact, and newsletter APIs
- **PostgreSQL schema + seed data** for services, industries, solutions, insights, contacts, and subscribers
- **Enterprise visual system** using deep navy / graphite / electric blue styling, strong typography, generous whitespace, and subtle motion
- **Section-driven navigation** for Home, Services, Industries, Solutions, Insights, About, and Contact, plus a dedicated Technology Licensing section/teaser in the experience

## Experience overview

The frontend includes:

- Sticky header with responsive navigation
- Hero section with animated network canvas and executive-focused messaging
- Trusted technology logo strip
- Services overview with seeded enterprise service catalog
- Industry coverage section spanning 16 sectors
- Why Choose 1Touch and delivery process sections
- Featured solutions section
- Technology licensing callout
- Insights preview backed by the API
- About section covering mission, vision, philosophy, and delivery posture
- Contact form wired to the backend
- Footer newsletter signup wired to the backend

## Repository structure

```text
.
├── app/                # Next.js App Router frontend
├── components/         # Shared React UI components
├── src/                # Frontend API client + shared TS types
├── backend/            # Express API server
├── database/           # PostgreSQL schema + seed data
└── docs/               # Delivery and implementation notes
```

## Data seeded in the database

`database/schema.sql` bootstraps the schema and seeds:

- **14 services**
- **16 industries**
- **9 solutions**
- **6 insight articles**

The backend runs schema initialization on boot via `initSchema()`.

## Environment variables

### Frontend (`.env.local` at repo root)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Backend (`backend/.env`)

```env
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/onetouch
FRONTEND_URL=http://localhost:3000
JWT_SECRET=change-me-for-production
```

## Setup

Install dependencies in both workspaces:

```bash
npm install
cd backend && npm install
```

## Running locally

### 1) Start PostgreSQL

Make sure `DATABASE_URL` points at a reachable PostgreSQL instance.

### 2) Start the backend

```bash
cd backend
npm run dev
```

Backend starts on `process.env.PORT` and applies `database/schema.sql` automatically.

### 3) Start the frontend

In a second terminal:

```bash
npm run dev
```

Frontend starts on port 3000 by default and reads `NEXT_PUBLIC_API_URL` for all API calls.

## Build for production

### Frontend

```bash
npm run build
npm start
```

### Backend

```bash
cd backend
npm run build
npm start
```

## API surface

### Health

- `GET /health` — returns service status plus database connectivity

### Contact and newsletter

- `POST /api/contact` — consultation request form submission
- `POST /api/newsletter` — newsletter subscription

### Content APIs

- `GET /api/services`
- `GET /api/services/:slug`
- `GET /api/industries`
- `GET /api/industries/:slug`
- `GET /api/solutions`
- `GET /api/solutions/:slug`
- `GET /api/insights`
- `GET /api/insights/:slug`

### Auth utilities present in backend

- `POST /auth/signup`
- `POST /auth/login`

## Release notes

- Documentation for this handoff lives in `docs/IMPLEMENTATION_NOTES.md`
- Ticket changelog entry lives in `CHANGELOG.md`

## Deployment checklist

- Set frontend and backend environment variables
- Provision PostgreSQL and confirm `DATABASE_URL`
- Start backend first so schema/seed initialization can run
- Start frontend with `NEXT_PUBLIC_API_URL` pointing to the deployed API
- Smoke test:
  - `GET /health`
  - contact form submission
  - newsletter signup
  - services / industries / solutions / insights API responses
