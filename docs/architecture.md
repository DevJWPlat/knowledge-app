# Architecture

## Principles

1. Geography is the first category, not the application boundary.
2. Quiz logic belongs outside Vue components.
3. Static reference datasets are version-controlled in packages rather than fetched from an external API on every session.
4. D1 stores mutable user data, progress and quiz history.
5. Social and live multiplayer features are intentionally deferred until the learning loop is stable.

## Workspace layout

```text
apps/
  web/          Vue mobile-first client
  api/          Cloudflare Worker + D1 API

packages/
  shared/       Cross-app types and constants
  quiz-engine/  Category-agnostic quiz/deck logic
  geography/    Geography dataset, aliases and policy
```

Future categories should be introduced as additional packages that feed the same quiz engine rather than adding geography-specific logic to the engine itself.

## Frontend boundaries

Pages compose layouts and feature components. Pages should not own question-generation or mastery algorithms.

API access belongs in `apps/web/src/services` and user/session state belongs in Pinia stores.

## API boundaries

Worker routes should stay thin. Business logic belongs in services and D1 access belongs in repositories as those layers become necessary.

## Static data

Countries, capitals, aliases and geography policy will live under `packages/geography`. This keeps the dataset auditable, testable and version-controlled.

## Database

D1 stores users, per-item/per-skill progress, quiz sessions and raw answer history. Authentication-specific tables will be added once the chosen auth flow is implemented rather than guessed in advance.

## Learning deck behaviour

`packages/quiz-engine` now owns the reusable Fisher-Yates shuffle and deck-building logic. A learning set is built without replacement, so an item cannot appear twice within the same set. Callers can pass recently seen item keys to push those items behind fresh ones before a new set is cut.

The Europe learning UI consumes this package rather than selecting random countries inside a Vue page. The same deck builder can later be used by flags, capitals, history, science or other categories.
