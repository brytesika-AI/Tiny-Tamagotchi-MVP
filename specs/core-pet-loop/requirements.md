# Requirements: Core Pet Loop

## Constants

- Vitals are integers from 0 to 100.
- Passive tick interval: 10 seconds.
- Maximum offline catch-up ticks: 12.
- Decay per tick:
  - Hunger: -4.
  - Happiness: -3.
  - Energy: -5.
- Sick threshold: any vital at or below 20 after a tick or action.
- Recovery threshold: all vitals at or above 45.
- Evolution threshold: all vitals at or above 80 for 3 consecutive passive ticks while not Sick.

## Initial Pet

A new pet must start with:

- `name`: user-provided trimmed name, or `Mochi` when blank.
- `hunger`: 76.
- `happiness`: 74.
- `energy`: 78.
- `state`: `Normal`.
- `healthyTicks`: 0.
- `evolved`: false.
- `actionCounts.feed`: 0.
- `actionCounts.play`: 0.
- `actionCounts.rest`: 0.

## Actions

### Feed

- Hunger +18.
- Happiness +4.
- Energy -4.
- Feed action count +1.
- Reaction should mention food, snacks, or crumbs.

### Play

- Happiness +16.
- Energy -10.
- Hunger -6.
- Play action count +1.
- Reaction should mention play, zooming, bouncing, or a toy.

### Rest

- Energy +22.
- Happiness -4.
- Hunger -3.
- Rest action count +1.
- Reaction should mention sleep, blankets, naps, or dreams.

All action results must be clamped to the 0 to 100 range.

## Passive Tick

On each tick:

- Hunger decreases by 4.
- Happiness decreases by 3.
- Energy decreases by 5.
- Vitals are clamped to 0 to 100.
- `lastUpdated` is set to the tick time.
- State is recalculated after vitals change.

## State Rules

- If any vital is at or below 20, visible state is `Sick`.
- If state is Sick and all vitals are at or above 45, visible state becomes:
  - `Evolved` when `evolved` is true.
  - `Normal` when `evolved` is false.
- If not Sick and all vitals are at or above 80 after a passive tick, `healthyTicks` increases by 1.
- If not Sick and any vital is below 80 after a passive tick, `healthyTicks` resets to 0.
- When `healthyTicks` reaches 3, `evolved` becomes true and visible state becomes `Evolved`.
- Evolved status is permanent, but Evolved pets can temporarily display Sick while neglected.
- No state transition can create permanent death.

## Easter Eggs

- After three Feed actions, one reaction must mention a secret crumb stash.
- After three Play actions, one reaction must mention a cardboard rocket.
- After three Rest actions, one reaction must mention tiny cloud dreams.
- Naming the pet `Codex` must produce a special first reaction about reading the spec.

