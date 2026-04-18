# Validation: Personality and Easter Eggs

## Automated Tests

Run:

```bash
npm test
```

Required automated coverage:

- Very high happiness message.
- Low energy message.
- Repeated Feed message.
- First evolution message.
- Message behavior remains deterministic.

## Manual Tests

Smoke test:

1. Create a pet.
2. Click Play until Happiness is very high.
3. Confirm the victory dance message appears.
4. Click Feed at least 3 times.
5. Confirm the snack stash message appears when priority allows.

User-flow test:

1. Trigger evolution.
2. Confirm the first evolution message appears.
3. Confirm no new actions, inventory, currency, or mini-game appears.

## Negative or Edge Test

- Confirm messages do not unlock or imply extra mechanics.

## Acceptance Criteria

- Messages add personality only.
- All messages are deterministic and testable.
