# Feature Plan: Core Pet Loop

## Feature Summary

The core pet loop makes the pet feel alive through passive decay, simple care actions, visible states, and personality reactions.

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
10. The app saves the pet after every tick and action.

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
- African-inspired visual patterning must be decorative only and must not introduce extra mechanics.
