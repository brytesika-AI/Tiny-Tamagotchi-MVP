# Validation: Evolution System

## Automated Tests

Run:

```bash
npm test
```

Required automated coverage:

- Evolution does not happen with fewer than 8 actions.
- Evolution happens after 5 qualifying ticks with average at least 70 and 8 actions.
- Evolution sets `evolved` to true and state to Evolved.
- Evolution happens only once.
- Average calculation is deterministic.

## Manual Tests

Smoke test:

1. Care for the pet until total actions reaches 8.
2. Keep stats high.
3. Wait through qualifying ticks.
4. Confirm the pet becomes Evolved.

User-flow test:

1. Confirm the state counter shows progress toward 5 high-average ticks.
2. Let the average drop below 70.
3. Confirm the counter resets or stops progressing.

## Negative or Edge Test

- Keep average high with only 7 actions and confirm the pet does not evolve.
- Confirm Sick state blocks evolution.

## Acceptance Criteria

- There is only one evolution.
- There are no branches or extra forms.
- The UI clearly shows Evolved state.
