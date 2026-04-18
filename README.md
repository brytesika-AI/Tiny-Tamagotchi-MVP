# Tiny Tamagotchi MVP

A spec-driven tiny virtual pet for the DeepLearning.AI 7-Day Challenge, styled as a dark-only African-inspired care dashboard.

## What To Review

- `specs/mission.md`
- `specs/roadmap.md`
- `specs/tech-stack.md`
- `specs/core-pet-loop/feature-plan.md`
- `specs/core-pet-loop/requirements.md`
- `specs/core-pet-loop/validation.md`

## Brand Direction

- Dark-only Obsidian background.
- Sovereign Gold emphasis.
- Resilience Rust actions.
- Executive White text.
- African-inspired geometric patterning across the pet stage and sprites.
- Governance status colors only for vital verdicts.

## Run Locally

Start the local static server:

```bash
npm start
```

Then open `http://localhost:4173`.

Run the validation suite:

```bash
npm test
```

Deploy to Cloudflare Pages:

```bash
npm run deploy:cloudflare
```

The app is intentionally dependency-free: HTML, CSS, browser JavaScript, and Node's built-in test runner.

## Cloudflare APIs

- `GET /api/health` confirms the app is running on Cloudflare Pages Functions.
- `POST /api/care-brief` returns the next care recommendation from the submitted pet vitals.
