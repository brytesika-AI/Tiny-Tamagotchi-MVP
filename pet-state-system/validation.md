# Validation: Pet State System

## Automated Tests

Run:

```bash
npm test
```

Required automated coverage:

- Sick does not trigger from only 1 or 2 low ticks.
- Sick triggers on the 3rd consecutive tick with any stat below 20.
- Sick tick decay continues.
- Recovery requires all stats above 40 for 2 consecutive ticks.
- Recovery returns state to Normal.
- Recovery counter resets if any stat is not above 40.

## Manual Tests

Smoke test:

1. Use the UI until one stat is very low.
2. Wait for the low stat to persist across ticks.
3. Confirm the pet becomes Sick and the visual/message changes.

Recovery test:

1. While Sick, use Feed, Play, and Rest until all stats are above 40.
2. Wait for 2 ticks.
3. Confirm the state returns to Normal.

## Negative or Edge Test

- Confirm a stat at exactly 20 does not count as below 20.
- Confirm a stat at exactly 40 does not count as above 40 for recovery.

## Acceptance Criteria

- Sickness and recovery are deterministic.
- No death state appears.
- The UI never introduces extra actions.
