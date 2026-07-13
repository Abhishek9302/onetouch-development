# 1touch.ai

Enterprise AI/ML consulting website — services, industries, solutions, technology licensing, and contact.

## Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript
- **Backend (optional):** Express + PostgreSQL for contact/newsletter and CMS content
- Site works **fully offline / without API** via static content fallbacks

## Brand

- Site name: **1touch.ai**
- Contact: `hello@1touch.ai` (update in `src/content.ts` when real details land)

## Develop

```bash
npm install
npm run dev
```

Optional API:

```bash
export NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Landing |
| `/services` | 14 AI service lines |
| `/industries` | 16 industries (Football, Finance, …) |
| `/solutions` | Pre-built AI solutions |
| `/licensing` | Technology licensing |
| `/insights` | Articles |
| `/about` | Company |
| `/contact` | Contact for pricing / details |

## Deploy

Static-friendly Next.js app. Set `NEXT_PUBLIC_API_URL` only if backend is live; otherwise contact form falls back to mailto.
