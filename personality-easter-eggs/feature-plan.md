# Feature Plan: Personality and Easter Eggs

## Feature Intent

Give the pet a small deterministic personality without adding new systems.

## User Flow

1. User takes a care action.
2. App shows a short personality message.
3. Certain conditions produce special messages.
4. Messages never change stats or unlock extra mechanics.

## Dependencies

- Depends on core-loop action handling.
- Depends on evolution-system for first evolution message.

## Edge Cases

- If multiple message conditions are true after an action, use this priority:
  1. Sick care message.
  2. Very high happiness.
  3. Low energy.
  4. Repeated Feed.
  5. Default action message.
- Messages must be deterministic.

## Out of Scope

- Random dialogue.
- AI-generated dialogue.
- Chat input.
- Social sharing.
- Extra rewards.
