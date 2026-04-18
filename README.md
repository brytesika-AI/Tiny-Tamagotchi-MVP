# Tiny Tamagotchi MVP

Spec-driven virtual pet submission for the DeepLearning.AI 7-Day Learner Challenge.

## Project Summary

Tiny Tamagotchi MVP is a small browser app where one user cares for one named pet. The pet has Hunger, Happiness, and Energy stats, three care actions, three visible states, one recovery path, one evolution path, and deterministic personality messages.

The primary artifact is the specification. The app exists to prove that the spec is implementation-ready and internally consistent.

## Why This Is Spec-Driven

The repo is organized around constitution docs and feature specs before implementation details:

- Constitution docs define mission, roadmap, stack, constraints, and tradeoffs.
- Feature docs define intent, user flows, thresholds, algorithms, edge cases, validation, and acceptance criteria.
- The implementation keeps all game rules in `src/petRules.js`.
- Automated tests import the rule module directly and verify the documented mechanics.

## Repo Structure

```text
specs/
  mission.md
  roadmap.md
  tech-stack.md
core-loop/
  feature-plan.md
  requirements.md
  validation.md
pet-state-system/
  feature-plan.md
  requirements.md
  validation.md
evolution-system/
  feature-plan.md
  requirements.md
  validation.md
personality-easter-eggs/
  feature-plan.md
  requirements.md
  validation.md
tests/
  README.md
  petRules.test.js
src/
  app.js
  petRules.js
assets/
  pet-normal.svg
  pet-sick.svg
  pet-evolved.svg
index.html
styles.css
server.js
package.json
```

## Run Locally

```bash
npm start
```

Open:

```text
http://localhost:4173
```

## Run Tests

```bash
npm test
```

The test suite validates initial state, action effects, tick decay, Sick transition, recovery, evolution, persistence normalization, elapsed tick catch-up, and personality messages.

## Spec to Implementation Mapping

| Spec Area | Implementation | Tests |
| --- | --- | --- |
| Core loop | `src/petRules.js`, `src/app.js` | `tests/petRules.test.js` |
| Pet state system | `src/petRules.js` | Sick and recovery tests |
| Evolution system | `src/petRules.js` | Evolution tests |
| Personality/easter eggs | `src/petRules.js`, `src/app.js` | Message tests |
| Persistence | `src/app.js`, `src/petRules.js` | Normalization and elapsed tick tests |

## Challenge Scope Boundaries

Included:

- One user.
- One pet.
- Pet naming.
- Hunger, Happiness, Energy.
- Feed, Play, Rest.
- Normal, Sick, Evolved.
- One recovery path.
- One one-time evolution.
- Small deterministic personality messages.
- Browser localStorage persistence.

Not included:

- Authentication.
- Multiple users.
- Multiple pets.
- Inventory.
- Currency.
- Social features.
- Notifications.
- Permanent death.
- Mini-games.
- Admin features.
- Complex evolutions.
