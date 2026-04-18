# Feature Plan: Core Loop

## Feature Intent

Create the smallest complete care loop: the user names one pet, watches three stats, and uses Feed, Play, and Rest to respond to passive decay.

## User Flow

1. User opens the app.
2. User enters a pet name or leaves the field blank.
3. App creates one pet. Blank name becomes `Mochi`.
4. App displays Hunger, Happiness, Energy, current state, message, and action buttons.
5. Every 10 seconds while open, the app applies one tick.
6. User clicks Feed, Play, or Rest to change stats.
7. App saves the pet after creation, each action, and each tick.

## Dependencies

- Depends on `specs/mission.md` for scope boundaries.
- Depends on `specs/tech-stack.md` for localStorage and test approach.
- Pet state and evolution features depend on this core loop.

## Edge Cases

- Blank pet name becomes `Mochi`.
- Stats never go below 0 or above 100.
- Unknown actions throw an error in the logic module.
- Reload restores saved state.
- Elapsed reload ticks use the same 10-second interval and cap at 12 ticks.

## Out of Scope

- Multiple pets.
- Multiple users.
- Additional actions.
- Inventory.
- Currency.
- Mini-games.
