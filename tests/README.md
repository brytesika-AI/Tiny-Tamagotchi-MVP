# Tests

The automated test suite validates the deterministic game rules documented in the feature specifications.

## Run

```bash
npm test
```

## Coverage Focus

- Initial pet state.
- Stat clamping.
- Feed, Play, and Rest effects.
- Passive tick decay.
- Sick transition after 3 consecutive low ticks.
- Recovery after 2 consecutive healthy ticks.
- Evolution after 5 qualifying ticks and 8 care actions.
- One-time evolution.
- Deterministic reload catch-up.
- Personality and easter-egg messages.
- Persistence normalization.

Manual validation checklists live in each feature `validation.md` file.
