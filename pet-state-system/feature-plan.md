# Feature Plan: Pet State System

## Feature Intent

Make neglect visible without adding death. The pet can become Sick after sustained low stats and can recover through care.

## User Flow

1. User neglects or under-cares for the pet.
2. A stat falls below 20.
3. If any stat remains below 20 for 3 consecutive ticks, the pet becomes Sick.
4. While Sick, the pet keeps losing stats each tick.
5. User restores all stats above 40.
6. After 2 consecutive healthy ticks, the pet returns to Normal.

## Dependencies

- Depends on core-loop stats, tick decay, actions, clamping, and persistence.
- Evolution must not trigger while the pet is Sick.

## Edge Cases

- A stat exactly 20 does not count as below 20.
- All stats must be above 40 for recovery; exactly 40 is not enough.
- Recovery requires 2 consecutive ticks.
- If any stat is not above 40 during recovery, the recovery counter resets to 0.

## Out of Scope

- Permanent death.
- Medicine items.
- Multiple sickness types.
- Random sickness.
- Notifications.
