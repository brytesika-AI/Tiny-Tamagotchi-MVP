# Mission

## Mission

Tiny Tamagotchi MVP is a tiny browser-based virtual pet built to demonstrate spec-driven development. The goal is not to build the largest game; the goal is to make the specification precise enough that a coding agent can implement the app without inventing hidden rules.

The app lets one user care for one named pet by watching three stats, choosing three actions, and responding to clear state changes.

## Audience

- DeepLearning.AI challenge judges who will primarily review the specification quality.
- Learners studying how specs guide coding agents.
- A demo viewer who should understand the care loop in 1 to 2 minutes.

## Constraints

- One browser user.
- One pet.
- One pet name.
- Three stats only: Hunger, Happiness, Energy.
- Three actions only: Feed, Play, Rest.
- Three visible states only: Normal, Sick, Evolved.
- One recovery path from Sick to Normal.
- One evolution path.
- Local browser persistence only.
- Deterministic rules that are testable without the UI.

## Non-Goals

- No authentication.
- No multiple users.
- No multiple pets.
- No inventory.
- No currency.
- No social features.
- No notifications.
- No permanent death.
- No mini-games.
- No admin features.
- No complex evolution tree.
- No required backend service.

## Success Criteria

- The documentation structure matches the required challenge structure.
- Every threshold, decay rule, action effect, state transition, persistence rule, and edge case is specified.
- The implementation follows the specification exactly.
- Automated tests validate core game logic.
- Manual validation checklists cover user-facing flows.
- The app is small, polished, and easy to review.
- The README lets judges quickly understand scope, run the app, run tests, and map specs to implementation.
