# Requirements: Pet State System

## States

The only visible states are:

- Normal
- Sick
- Evolved

New pets start in Normal.

## Sick Trigger

- Track `sickLowTicks`.
- On each tick, check whether any stat is below 20.
- If any stat is below 20, increment `sickLowTicks`.
- If no stat is below 20, reset `sickLowTicks` to 0.
- Enter Sick when `sickLowTicks` reaches 3.
- Sick trigger is based on consecutive ticks, not a single low value.

## Sick Behavior

- While Sick, the pet visual and message must clearly change.
- Tick penalties continue as normal.
- Feed, Play, and Rest remain available.
- No permanent death can occur.

## Recovery Path

- Track `recoveryTicks` only while Sick.
- On each Sick tick, check whether all three stats are above 40.
- If all stats are above 40, increment `recoveryTicks`.
- If any stat is 40 or below, reset `recoveryTicks` to 0.
- Recover from Sick when `recoveryTicks` reaches 2.
- Recovery returns state to Normal.

## Persistence

Persist:

- `state`
- `sickLowTicks`
- `recoveryTicks`

Saved counters must restore on reload.
