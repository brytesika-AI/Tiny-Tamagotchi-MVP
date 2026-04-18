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

## Brand System

The app is dark-only. Obsidian `#0D0D0D` is always the page background.

Primary palette:

- Obsidian `#0D0D0D`: page background.
- Sovereign Gold `#C17E24`: accent text and emphasis.
- Resilience Rust `#B94A1A`: buttons and action borders.
- Executive White `#FFFFFF`: body and heading text.

Supporting palette:

- Slate Navy `#1C2333`: input fields and progress tracks.
- Deep Amber `#2A1A0E`: callout backgrounds.
- Steel Mist `#8A9BB0`: labels and captions.
- Surface Dark `#1A1A1A`: lifted cards.

Governance status colors:

- Compliant Green `#3DD68C`: passed vital verdicts.
- Warning Amber `#F5A623`: partial vital verdicts.
- Critical Red `#E84040`: failed vital verdicts.
- Intel Blue `#4A9EE8`: informational verdicts if needed.

Governance status colors must only communicate vital verdicts. They must not be used as decorative background colors or general state decoration.

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
