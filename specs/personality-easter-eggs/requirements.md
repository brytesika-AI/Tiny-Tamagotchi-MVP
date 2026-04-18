# Requirements: Personality and Easter Eggs

## Message Area

- The UI must show one current personality message.
- The message must update after care actions and important state transitions.

## Deterministic Messages

Initial message:

- `{name} is ready for care.`

Default action messages:

- Feed: `{name} crunches happily.`
- Play: `{name} bounces with bright eyes.`
- Rest: `{name} tucks into a warm nap.`

Special messages:

- Very high happiness: if Happiness is at least 95 after an action, show `{name} does a tiny victory dance.`
- Low energy: if Energy is 20 or below after an action, show `{name} yawns and asks for a quiet rest.`
- Repeated Feed: after 3 or more Feed actions, show `{name} reveals a secret snack stash.`
- First evolution: when evolution triggers, show `{name} evolves for the first time and glows with pride.`
- Sick care: while Sick after an action, show `{name} accepts care, but recovery needs two healthy ticks.`

## Priority

When action message conditions overlap, use this order:

1. Sick care.
2. Very high happiness.
3. Low energy.
4. Repeated Feed.
5. Default action message.

## Scope Boundary

Personality messages must not:

- Add actions.
- Add inventory.
- Add currency.
- Change stat rules.
- Change state transitions.
- Create random or untestable behavior.
