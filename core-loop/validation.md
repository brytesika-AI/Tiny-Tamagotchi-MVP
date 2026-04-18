# Validation: Core Loop

## Automated Tests

Run:

```bash
npm test
```

Required automated coverage:

- Default pet starts at 80/80/80 and Normal.
- Blank name becomes `Mochi`.
- Stats clamp to 0 through 100.
- Feed, Play, and Rest match the documented action effects.
- Tick decay matches -8, -6, and -5.
- Reload catch-up applies elapsed ticks and caps at 12.
- Persistence normalization handles invalid saved values.

## Manual Tests

Smoke test:

1. Run `npm start`.
2. Open `http://localhost:4173`.
3. Create a pet.
4. Confirm the three vitals show 80.
5. Click Feed, Play, and Rest.
6. Confirm visible stats update.

User-flow test:

1. Create a named pet.
2. Wait at least 10 seconds.
3. Confirm stats decay.
4. Refresh the page.
5. Confirm the same pet name and stats are restored.

## Negative or Edge Test

- Enter a blank name and confirm the pet is named `Mochi`.

## Acceptance Criteria

- All automated tests pass.
- Manual smoke and user-flow tests pass.
- The UI still shows only one pet and three allowed actions.
