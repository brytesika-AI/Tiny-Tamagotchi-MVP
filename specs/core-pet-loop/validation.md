# Validation: Core Pet Loop

## Definition of Done

All of the following must be true before submission:

- Constitution documents exist: `specs/mission.md`, `specs/roadmap.md`, and `specs/tech-stack.md`.
- Feature documents exist: `specs/core-pet-loop/feature-plan.md`, `requirements.md`, and `validation.md`.
- Requirements include Scope, Out of Scope, Decisions, Context, constants, actions, states, care intelligence, Hermes-inspired memory, Cloudflare API rules, and brand rules.
- Automated tests pass.
- Manual browser flow confirms naming, actions, passive tick, sick recovery, evolution, persistence, branding, and Cloudflare edge status.
- Cloudflare Pages deployment is live.
- Governance colors are used only for vital verdicts.

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
- Hermes-inspired memory ritual from local action counts.
- Structured care card includes care, memory, verdicts, and scope constraints.
- Cloudflare API endpoints return JSON and reuse the same care recommendation rules.

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
15. On Cloudflare Pages, open `/api/health` and confirm it returns `ok: true`.
16. On Cloudflare Pages, submit pet vitals to `/api/care-brief` and confirm the structured card includes `tiny-tamagotchi-care-card-v1`.
17. Use Feed, Play, or Rest at least three times and confirm Hermes memory changes to a personality ritual without adding new mechanics.

## Validation Traceability

Every automated test maps to a rule in `requirements.md`. Manual tests cover browser rendering, persistence, and the user-visible care loop described in `feature-plan.md`.

## Traceability Checklist

| Spec Item | Implementation | Validation |
| --- | --- | --- |
| Initial vitals | `createPet` in `src/petRules.js` | `creates a default pet` test |
| Action deltas | `applyAction` in `src/petRules.js` | `applies Feed, Play, and Rest deltas` test |
| Passive decay | `applyPassiveTick` in `src/petRules.js` | `passive tick decays` test |
| Sick recovery | `recalculateState` in `src/petRules.js` | `Sick pet recovers` test |
| Evolution | `recalculateState` in `src/petRules.js` | `pet evolves after three high-care passive ticks` test |
| Brand palette | `styles.css` and SVG assets | Manual brand checks |
| Care intelligence | `getCareBrief` in `src/petRules.js` | `care brief recommends` test |
| Hermes memory | `getMemoryCapsule` in `src/petRules.js` | `memory capsule summarizes` test |
| Structured Cloudflare card | `functions/api/care-brief.js` | `structured care card exposes` test and manual API check |
