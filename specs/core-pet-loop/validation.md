# Validation: Core Pet Loop

## Automated Validation

Run:

```bash
npm test
```

The automated suite must verify:

- New pet defaults and blank-name fallback from `requirements.md`.
- Vital clamping from the 0 to 100 rule.
- Feed, Play, and Rest stat deltas from `requirements.md`.
- Passive tick decay from `requirements.md`.
- Sick transition when any vital is at or below 20.
- Recovery transition when all vitals are at or above 45.
- Evolution after three high-care passive ticks.
- Evolved pets can become Sick and recover to Evolved.
- Easter eggs for repeated actions.
- Offline catch-up applies elapsed ticks and caps at 12.
- Vital verdict labels from the documented governance thresholds.
- Care-intelligence recommendation from the weakest vital.

## Manual Smoke Test

1. Open `index.html`.
2. Enter a pet name and start the pet.
3. Confirm Hunger, Happiness, and Energy appear as 0 to 100 meters.
4. Click Feed and confirm Hunger increases.
5. Click Play and confirm Happiness increases while Energy decreases.
6. Click Rest and confirm Energy increases.
7. Wait at least 10 seconds and confirm vitals decrease without clicking.

## Manual User Flow Test

1. Start a pet named `Codex`.
2. Confirm the first reaction references reading the spec.
3. Use care actions until all vitals are at least 80.
4. Keep vitals high for three passive ticks.
5. Confirm the pet enters Evolved state and displays evolved visuals.
6. Let or force vitals down until one vital reaches 20 or below.
7. Confirm the pet displays Sick state.
8. Restore all vitals to at least 45.
9. Confirm the pet recovers without permanent death.
10. Refresh the page and confirm the pet persists.
11. Confirm the care-intelligence panel recommends Feed, Play, Rest, or Monitor from the current vitals.
12. Confirm the app stays dark-only with Obsidian as the page background.
13. Confirm the interface uses gold, rust, white, slate, amber, mist, and surface colors according to `tech-stack.md`.
14. Confirm governance status colors appear only on vital verdicts.

## Validation Traceability

Every automated test maps to a rule in `requirements.md`. Manual tests cover browser rendering, persistence, and the user-visible care loop described in `feature-plan.md`.
