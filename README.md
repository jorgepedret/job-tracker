# Job Tracker CRUD

A minimal full‑stack app that tracks job applications. Built with React, Node/Express, and SQL. Demonstrates forms, validation, REST APIs, and relational modeling.

## Demo
- Web: <your Vercel/Netlify URL>
- API: <your Render/Fly URL>

## Stack
- React 18, Vite, React Query, React Router, Tailwind
- Node 20, Express, Zod
- Prisma, SQLite or Postgres
- Jest, React Testing Library, Supertest
- TypeScript (optional but recommended)

## Quickstart
1. Prereqs: Node 20+, pnpm, Docker (if using Postgres)
2. Install: `pnpm i`
3. Env: `cp apps/api/.env.example apps/api/.env` and set `DATABASE_URL`
4. DB: `pnpm -w prisma migrate dev && pnpm -w prisma db seed`
5. Dev: `pnpm -r dev` (runs web and api)

## API
- `GET /api/jobs?status=open&page=1`
- `POST /api/jobs`
- `PUT /api/jobs/:id`
- `DELETE /api/jobs/:id`
- `GET /api/applications?jobId=...`

## Data model (Prisma)
See `apps/api/prisma/schema.prisma`.

## Scripts
- `pnpm -w dev`
- `pnpm -w test`
- `pnpm -w lint`

## Tests
- api: `apps/api/tests/*.test.ts`
- web: `apps/web/src/__tests__/*`

## Decisions
- Zod for symmetric client/server validation
- React Query for server state
- Pagination for realism

## Roadmap
- OAuth, file uploads, TS strict mode

## License
MIT