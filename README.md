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

## Hermes-Inspired Twist

The app borrows safe ideas from the Ollama Hermes Agent docs: structured care cards and cross-session memory. It does not add messaging, autonomy, multiple users, inventories, or notifications.

- The browser shows a local Hermes memory ritual based on Feed, Play, and Rest history.
- `POST /api/care-brief` returns a structured `tiny-tamagotchi-care-card-v1` response.

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
- `POST /api/care-brief` returns the structured care card from the submitted pet vitals.
