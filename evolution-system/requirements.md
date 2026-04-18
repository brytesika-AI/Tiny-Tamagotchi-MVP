# Requirements: Evolution System

## Evolution Trigger

Evolution may trigger only when all of the following are true:

- Pet is not Sick.
- `evolved` is false.
- Average of Hunger, Happiness, and Energy is at least 70.
- Average condition has held for 5 consecutive ticks.
- `totalActions` is at least 8.

Formula:

```text
average = (hunger + happiness + energy) / 3
```

## Evolution Counter

- Track `evolutionHighTicks`.
- On each non-Sick tick:
  - If average is at least 70 and `totalActions >= 8`, increment `evolutionHighTicks`.
  - Otherwise reset `evolutionHighTicks` to 0.
- When `evolutionHighTicks` reaches 5, set:
  - `evolved = true`
  - `state = Evolved`

## One-Time Rule

- Evolution happens only once.
- If `evolved` is true, the app must not trigger another evolution.

## Sick Interaction

- Sick prevents evolution.
- If the pet becomes Sick, `evolutionHighTicks` resets to 0.
- Recovery from Sick returns state to Normal.
- `evolved` remains persisted as history, but evolution does not repeat.

## Persistence

Persist:

- `evolved`
- `evolutionHighTicks`
- `totalActions`
