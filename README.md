# Knowledge App

Temporary working name for a mobile-first learning platform. The product is deliberately category-agnostic so geography can be the first subject without becoming an architectural limitation.

## Current milestone

The app now includes:

- Vue 3 + Vite + Pinia + Vue Router + Tailwind CSS frontend
- mobile-first application shell and onboarding/auth UI
- Cloudflare Worker + D1 foundation
- category-agnostic quiz/deck package
- curated, version-controlled Europe geography dataset
- documented geography classification/capital policy
- shuffled Europe learning sets with no repeated country inside a set
- local bundled flag assets via `flag-icons`

Authentication, persisted mastery and scored quizzes are still intentionally deferred to later milestones.

## Workspace layout

```text
apps/
  web/
  api/

packages/
  shared/
  quiz-engine/
  geography/
```

## Local development

Install dependencies from the repository root:

```bash
npm install
```

Start the frontend:

```bash
npm run dev:web
```

Apply the local D1 migration:

```bash
npm run db:migrate:local
```

Start the Worker API in another terminal:

```bash
npm run dev:api
```

Frontend: `http://localhost:5173`

Worker: `http://localhost:8787`

Health endpoint: `http://localhost:8787/api/health`
