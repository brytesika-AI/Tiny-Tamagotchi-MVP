# Feature Plan: Core Pet Loop

## Feature Summary

The core pet loop makes the pet feel alive through passive decay, simple care actions, visible states, and personality reactions.

## Course-Inspired Planning Model

This plan follows the DeepLearning.AI course pattern of grouping work into independently implementable task groups. Each group can be handed to a coding agent with the constitution documents already in place.

## Task Groups

### Group 1: Constitution Alignment

1. Confirm `specs/mission.md` defines audience, product mission, constraints, and success criteria.
2. Confirm `specs/tech-stack.md` defines runtime, architecture, persistence, accessibility, Cloudflare deployment, and brand rules.
3. Confirm `specs/roadmap.md` keeps the MVP scope focused and lists deferred work.

### Group 2: Deterministic Pet Rules

4. Implement all stat thresholds, action deltas, state transitions, recovery, evolution, verdicts, and memory rules in `src/petRules.js`.
5. Keep UI code from duplicating thresholds.
6. Export pure functions for tests and Cloudflare Pages Functions.

### Group 3: Browser Experience

7. Implement naming, vitals, action buttons, state visuals, reactions, care intelligence, Hermes memory, and reset flow in `index.html`, `styles.css`, and `src/app.js`.
8. Persist one pet locally with `localStorage`.
9. Keep the experience single-page and single-user.

### Group 4: Cloudflare Edge API

10. Implement `GET /api/health`.
11. Implement `POST /api/care-brief`.
12. Return structured JSON that mirrors the same care logic used in the browser.

### Group 5: Validation

13. Implement automated tests for pet rules, verdicts, care guidance, Hermes memory, and structured care cards.
14. Document manual browser, branding, persistence, and Cloudflare checks.
15. Deploy only after tests pass.

## User Flow

1. The user opens the page.
2. If no saved pet exists, the user enters a pet name or accepts the default name, "Mochi".
3. The app creates a pet with healthy starting vitals.
4. Every 10 seconds, Hunger, Happiness, and Energy decrease.
5. The user presses Feed, Play, or Rest to replenish specific needs.
6. If any vital remains critically low, the pet becomes Sick.
7. If the user restores all vitals above the recovery threshold, the pet returns to Normal.
8. If the user keeps all vitals high for three passive ticks, the pet evolves once.
9. The app shows a care-intelligence brief recommending the next best action.
10. The app shows a Hermes-inspired memory ritual from previous Feed, Play, and Rest actions.
11. The app saves the pet after every tick and action.

## State Lifecycle

- New pet starts in Normal.
- Normal can become Sick through neglect.
- Sick can recover to Normal through care.
- Normal can become Evolved through consistent high care.
- Evolved can still become Sick if neglected.
- A Sick evolved pet recovers back to Evolved when healthy again.
- There is no permanent death.

## Implementation Notes

- All core thresholds must be centralized in `src/petRules.js`.
- UI code must call exported rule functions rather than duplicating thresholds.
- Timed decay must be catch-up aware. If the browser was closed, elapsed time creates the correct number of missed ticks, capped to avoid punishing long absences.
- Reactions should be deterministic enough to test where practical, with playful messages selected by the action and resulting state.
- Care guidance must be derived from the same rule module as state transitions.
- Hermes-inspired memory must be derived from local action counts only.
- Structured care cards must include constraints proving the app remains inside the competition scope.
- African-inspired visual patterning must be decorative only and must not introduce extra mechanics.
