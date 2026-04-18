# Tech Stack

## Runtime

- Static HTML.
- CSS.
- JavaScript ES modules.
- Browser `localStorage` for one-device persistence.
- Node.js built-in test runner for validation.

## Rationale

The challenge evaluates spec quality and spec-to-implementation consistency. A dependency-free static app keeps the code easy to inspect, run, and validate without setup risk.

## Architecture

- `index.html` defines the app shell and accessible controls.
- `styles.css` defines the visual presentation.
- `src/petRules.js` contains deterministic domain rules.
- `src/app.js` connects domain rules to the browser, timers, rendering, and persistence.
- `tests/petRules.test.js` validates the rule module.
- `assets/*.svg` contains pet visual assets.

## Persistence

The app stores one pet record in `localStorage` under the key `tiny-tamagotchi-state-v1`.

Stored fields:

- `name`
- `hunger`
- `happiness`
- `energy`
- `state`
- `healthyTicks`
- `evolved`
- `lastUpdated`
- `reaction`
- `actionCounts`

## Accessibility

- Buttons use native button elements.
- Vitals use semantic progress bars.
- Important changes are announced in an `aria-live` region.
- The visual state is also represented in text, not color alone.

