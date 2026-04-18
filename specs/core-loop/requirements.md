# Requirements: Core Loop

## Functional Requirements

- The app must support exactly one pet.
- The user may name the pet.
- Blank or whitespace-only name must become `Mochi`.
- The app must display Hunger, Happiness, Energy, state, and a personality message.
- The app must provide exactly three actions: Feed, Play, Rest.

## Stats

- Stats are integers from 0 to 100 inclusive.
- Initial stats:
  - Hunger: 80
  - Happiness: 80
  - Energy: 80
- Every stat update must be clamped to 0 through 100.

## Tick Algorithm

- Tick interval: 10 seconds.
- Each tick while the app is open:
  - Hunger decreases by 8.
  - Happiness decreases by 6.
  - Energy decreases by 5.
- Tick decay continues in every state, including Sick.

## Action Effects

Feed:

- Hunger +25.
- Happiness +2.
- Energy unchanged.

Play:

- Happiness +20.
- Energy -10.
- Hunger -5.

Rest:

- Energy +30.
- Happiness -2.
- Hunger unchanged.

Each action increments `totalActions` by 1 and increments its own `actionCounts` entry.

## Persistence Rules

- Persist pet name, stats, state, action count, evolution status, counters, message, and last update timestamp in localStorage.
- On refresh, restore the saved pet.
- On reload, apply elapsed tick decay deterministically using 10-second ticks.
- Maximum reload catch-up is 12 ticks.

## Failure and Edge Handling

- Invalid saved stats are clamped.
- Invalid saved state falls back to Normal.
- Missing saved fields are filled with defaults.
- Unknown action names throw an error in the rule module.
