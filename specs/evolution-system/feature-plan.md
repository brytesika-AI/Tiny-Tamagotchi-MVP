# Feature Plan: Evolution System

## Feature Intent

Reward sustained care with one clear Evolved state without creating complex evolution branches.

## User Flow

1. User cares for the pet with at least 8 total actions.
2. User keeps the average of Hunger, Happiness, and Energy at least 70.
3. If the pet is not Sick and the average stays at least 70 for 5 consecutive ticks, the pet evolves.
4. Evolution changes the visible state and pet visual.
5. Evolution happens only once.

## Dependencies

- Depends on core-loop stats, tick decay, and total action count.
- Depends on pet-state-system because Sick blocks evolution.

## Edge Cases

- Average 69.99 does not qualify.
- Average exactly 70 qualifies.
- Fewer than 8 total actions blocks evolution.
- Sick blocks evolution even if the average is high.
- Once `evolved` is true, the pet cannot evolve again.

## Out of Scope

- Multiple evolutions.
- Branching forms.
- Evolution items.
- Permanent stat boosts.
