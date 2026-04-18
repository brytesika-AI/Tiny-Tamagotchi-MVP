# Tech Stack

## Chosen Stack

- Plain HTML.
- CSS.
- JavaScript ES modules.
- Node.js built-in test runner.
- Browser `localStorage`.
- Tiny local static server for convenient local review.

## Why This Stack

The challenge rewards clear specifications and implementation consistency, not framework complexity. A dependency-free single-page app keeps the system easy for judges to inspect and easy for tests to validate.

## Files and Responsibilities

- `index.html`: app shell, accessible controls, visible counters, and vitals.
- `styles.css`: visual presentation.
- `src/app.js`: browser event handling, rendering, timer, and localStorage integration.
- `src/petRules.js`: deterministic game logic.
- `tests/petRules.test.js`: automated tests for core rules.
- `server.js`: local static server.
- `assets/*.svg`: pet visuals for Normal, Sick, and Evolved.

## Persistence Approach

The app stores one pet record in `localStorage` under `tiny-tamagotchi-state-v2`.

Persisted fields:

- `name`
- `hunger`
- `happiness`
- `energy`
- `state`
- `sickLowTicks`
- `recoveryTicks`
- `evolutionHighTicks`
- `evolved`
- `totalActions`
- `lastUpdated`
- `actionCounts`
- `message`

On reload, the app restores the saved record, normalizes invalid values, and applies elapsed ticks using the same 10-second tick interval. Catch-up is capped at 12 ticks to keep reload behavior conservative and deterministic.

## Testing Approach

Automated tests use Node's built-in test runner and import `src/petRules.js` directly. Manual validation checklists live in the feature validation documents.

Validation has two levels:

- Automated unit tests for deterministic logic.
- Manual user-flow tests for browser behavior, persistence, and visual clarity.

## Tradeoffs

- No framework keeps setup small, but UI structure is manual.
- localStorage is enough for one browser user, but it is not cloud sync.
- Deterministic messages are less surprising than AI-generated text, but easier to validate and safer for the rubric.
- Offline catch-up is capped, which favors predictable demos over strict real-time simulation.
