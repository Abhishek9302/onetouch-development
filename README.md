# 1Touch Development — Enterprise AI Consulting Platform

A full-stack enterprise website for **1Touch Development**, an AI/ML/Data Intelligence consulting firm.

## Architecture

```
/ (root)          → Next.js 14 frontend (App Router + TypeScript)
backend/          → Express + TypeScript API
database/         → PostgreSQL schema + seed data
```

## Environment Variables

### Frontend (root `.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Backend (`backend/.env`)
```env
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/onetouch
JWT_SECRET=your-secure-jwt-secret-here
FRONTEND_URL=http://localhost:3000
```

## Getting Started

### 1. Database
```bash
# Create PostgreSQL database
createdb onetouch

# Schema is auto-applied on backend startup
# Or apply manually:
psql onetouch < database/schema.sql
```

### 2. Backend
```bash
cd backend
npm install
npm run dev
# API running at http://localhost:4000
```

### 3. Frontend
```bash
# From root
npm install
npm run dev
# App running at http://localhost:3000
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /health | Health check + DB status |
| POST | /auth/signup | Create user account |
| POST | /auth/login | Authenticate, returns JWT |
| POST | /api/contact | Submit consultation request |
| POST | /api/newsletter | Subscribe to newsletter |
| GET | /api/services | List all services |
| GET | /api/services/:slug | Get service by slug |
| GET | /api/industries | List all industries |
| GET | /api/industries/:slug | Get industry by slug |
| GET | /api/solutions | List all solutions |
| GET | /api/solutions/:slug | Get solution by slug |
| GET | /api/insights | List published articles |
| GET | /api/insights/:slug | Get article by slug |

## Pages

- **Home** — Hero, services grid, industries, process, solutions, insights, contact
- **Services** — All 14 AI services with full detail
- **Industries** — 16 industry verticals
- **Solutions** — Pre-built AI solution frameworks
- **Insights** — Blog articles pulled from backend
- **Contact** — Consultation form

## Tech Stack

**Frontend:** Next.js 14, TypeScript, CSS (no framework)
**Backend:** Express, TypeScript, pg (PostgreSQL driver)
**Database:** PostgreSQL
**Auth:** JWT + bcryptjs

## Production Deployment

1. Set `DATABASE_URL` to your production PostgreSQL connection string
2. Set `JWT_SECRET` to a cryptographically secure random string
3. Set `NEXT_PUBLIC_API_URL` to your backend API URL
4. Set `FRONTEND_URL` in backend to your frontend domain for CORS
5. Run `npm run build` in both root and `backend/`
