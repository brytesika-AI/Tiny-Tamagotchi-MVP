# Roadmap

## Milestone 1: Constitution Documents

Define project mission, audience, constraints, non-goals, success criteria, stack, persistence, testing approach, and intentional tradeoffs.

Files:

- `specs/mission.md`
- `specs/roadmap.md`
- `specs/tech-stack.md`

## Milestone 2: Core Loop

Build the smallest playable loop:

- Name one pet.
- Display Hunger, Happiness, and Energy.
- Provide Feed, Play, and Rest.
- Apply one passive tick every 10 seconds.
- Clamp all stats to 0 through 100.

Feature docs:

- `specs/core-loop/feature-plan.md`
- `specs/core-loop/requirements.md`
- `specs/core-loop/validation.md`

## Milestone 3: Pet State System

Add Normal and Sick behavior:

- Track 3 consecutive low-stat ticks.
- Enter Sick when any stat is below 20 for 3 consecutive ticks.
- Continue normal tick decay while Sick.
- Recover to Normal when all stats are above 40 for 2 consecutive ticks.

Feature docs:

- `specs/pet-state-system/feature-plan.md`
- `specs/pet-state-system/requirements.md`
- `specs/pet-state-system/validation.md`

## Milestone 4: Evolution System

Add one-time evolution:

- Require pet not Sick.
- Require average stats at least 70 for 5 consecutive ticks.
- Require at least 8 total care actions.
- Allow evolution only once.

Feature docs:

- `specs/evolution-system/feature-plan.md`
- `specs/evolution-system/requirements.md`
- `specs/evolution-system/validation.md`

## Milestone 5: Personality and Easter Eggs

Add small deterministic personality reactions without expanding scope:

- High happiness reaction.
- Low energy reaction.
- Repeated Feed reaction.
- First evolution reaction.

Feature docs:

- `specs/personality-easter-eggs/feature-plan.md`
- `specs/personality-easter-eggs/requirements.md`
- `specs/personality-easter-eggs/validation.md`

## Deferred Intentionally

- Accounts and cloud sync.
- Backend persistence.
- Multiple pets.
- Additional stats.
- More actions.
- Inventory or currency.
- Mini-games.
- Notifications.
- Permanent death.
- Branching evolutions.
