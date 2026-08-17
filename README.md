# Portfolio

Personal portfolio site — Experience, Skills, Projects, and Resume — built with
React, Vite, TypeScript, and Tailwind CSS v4.

## Features

- Client-side routed pages: Home, Experience, Skills, Projects (with individual
  project detail pages), and Resume
- Dark/light theme toggle, persisted across visits, with no flash-of-wrong-theme
  on load
- Content (experience, projects, skills, résumé metadata) is authored as local
  JSON, accessed through a small `ContentService` abstraction — swapping in a
  real backend API later only touches that one file, no component changes
- Tech-brand icons on the Skills page, animated stat counters, and an inline
  résumé PDF preview on the Resume page

## Getting started

```bash
npm install
npm run dev
```

Opens the Vite dev server with hot module reload.

## Scripts

```bash
npm run dev            # start the dev server
npm run build           # type-check (tsc) then produce a production build in dist/
npm run preview         # serve the production build locally
npm run lint             # oxlint
npm run format           # prettier --write .
npm run format:check     # prettier --check .
```

`npm run lint` and `npm run format:check` should both be clean before
committing.

## Environment variables

Copy `.env.example` to `.env` and fill in the values as needed. `.env` is
gitignored and never committed.

## Content

Site content lives in `src/data/*.json` (experience, projects, skills, profile,
résumé metadata) and is accessed only through `src/services/contentService.ts`
— components never import the JSON files directly. The résumé PDF itself is
served from `public/resume/`.

## Docker

The included `Dockerfile` is multi-stage:

```bash
# Production build served by nginx
docker build --target serve -t portfolio .
docker run -p 8080:80 portfolio
```

Site available at `http://localhost:8080`.

A `dev` stage is also available for a containerized hot-reload dev server:

```bash
docker build --target dev -t portfolio-dev .
docker run -p 5173:5173 -v "$(pwd)":/app -v /app/node_modules portfolio-dev
```

Site available at `http://localhost:5173`, with source bind-mounted for HMR.

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · react-router-dom · Framer
Motion · react-icons · lucide-react
