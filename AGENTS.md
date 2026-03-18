# Agent Guide — Holosearth Academy

## Project Overview
Website for **holosearthacademy.org**. Static site built with Nuxt and Tailwind CSS, hosted on AWS Amplify.

## Tech Stack
- **Nuxt 4** (`^4.3.0`) — Vue meta-framework
- **Tailwind CSS 4** (`^4.1.18`) — via `@tailwindcss/vite` Vite plugin (not PostCSS)
- **Vue 3** (`^3.5.27`)
- **TypeScript** — Nuxt auto-generates tsconfig references in `.nuxt/`

## Architecture Decisions

### SSR enabled for static pre-rendering
- `ssr: true` in `nuxt.config.ts` — pages are pre-rendered to full HTML at build time
- `nitro: { preset: 'static' }` — static site generation (SSG)
- No server routes, no server middleware, no server components
- `npm run generate` produces a fully static site in `.output/public` with pre-rendered HTML per route

### Tailwind CSS 4 via Vite Plugin
- Tailwind is loaded as a Vite plugin (`@tailwindcss/vite`), not via PostCSS
- CSS entry point: `app/assets/css/main.css` with `@import "tailwindcss"`
- **No non-Tailwind CSS allowed** — style everything with Tailwind utility classes

### AWS Amplify Hosting
- `amplify.yml` at project root configures the build pipeline
- Build command: `npm run generate`
- Artifacts directory: `.output/public`
- Amplify serves the static files; no server runtime needed
- **Deployment is triggered automatically by pushing to the `deploy` branch**
- For SPA routing, configure custom redirect rules in Amplify Console:
  `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/> → /index.html (200)`

## Project Structure
```
holosearth-academy/
├── app/
│   ├── app.vue                  # Root component
│   ├── assets/css/main.css      # Tailwind entry point
│   └── pages/
│       └── index.vue            # Home page
├── public/                      # Static assets (favicon, images, etc.)
├── nuxt.config.ts               # Nuxt configuration
├── tsconfig.json                # TypeScript config (Nuxt-managed refs)
├── amplify.yml                  # AWS Amplify build spec
├── package.json
└── AGENTS.md                    # This file
```

## Commands
```bash
npm run dev        # Start dev server (localhost:3000)
npm run generate   # Build static site → .output/public
npm run preview    # Preview the generated static site locally
npm run build      # Build (used by Amplify)
```

## Setup From Scratch
These are the steps that were used to create this project:

1. Created project directory and `package.json` with Nuxt 4, Vue 3, Tailwind CSS 4
2. Created `nuxt.config.ts` with `ssr: true`, `nitro: { preset: 'static' }`, Tailwind Vite plugin
3. Created `app/assets/css/main.css` with `@import "tailwindcss"`
4. Created `app/app.vue` with `<NuxtPage />`
5. Created `app/pages/index.vue` as blank home page
6. Created `tsconfig.json` with Nuxt-managed references
7. Created `amplify.yml` for AWS Amplify static site deployment
8. Created `.gitignore` for Nuxt/node/env/IDE files
9. Ran `npm install` to install dependencies
10. Ran `npx nuxt prepare` to generate `.nuxt/` type stubs

## Adding Pages
Place `.vue` files in `app/pages/`. Nuxt auto-generates routes from the file structure:
- `app/pages/index.vue` → `/`
- `app/pages/about.vue` → `/about`
- `app/pages/courses/index.vue` → `/courses`
- `app/pages/courses/[id].vue` → `/courses/:id`

## Typography
- **Default body text**: `text-xl lg:text-2xl` (20px mobile / 24px desktop), `font-roboto font-normal leading-relaxed`
- Use this size for standard paragraph / descriptive text across the site

## Workflow Rules
- **Never commit or deploy unless explicitly asked.** Do not run `git commit`, `git push`, or any deploy commands unless the user specifically requests it.

## Environment Variables
Use `runtimeConfig.public` in `nuxt.config.ts` for client-side env vars (prefixed with `NUXT_PUBLIC_`).
Create `.env` for local dev values and `.env.production` for production values.
