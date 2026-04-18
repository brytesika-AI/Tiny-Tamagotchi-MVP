# Mission

## Product Mission

Tiny Tamagotchi is a single-player browser pet that teaches a short, satisfying care loop: notice changing vitals, choose one of three care actions, and watch the pet react through visible states.

The project mission is not to build a large game. The primary goal is to produce a complete, scoped, implementation-ready specification that a coding agent can follow without inventing hidden rules.

The visual mission is to make the app feel distinct and personally owned through a dark-only African-inspired brand system: Obsidian foundation, Sovereign Gold emphasis, Resilience Rust actions, Executive White text, and geometric patterning influenced by African textile and mural rhythms.

## Audience

- Challenge evaluators reviewing whether the specification is clear, testable, and internally consistent.
- Learners practicing spec-driven development with coding agents.
- A casual player who wants a pet that responds quickly within a short demo.

## Scope Constraints

The app must include:

- One named pet.
- One local user in one browser.
- Three vitals from 0 to 100: Hunger, Happiness, and Energy.
- Three actions: Feed, Play, and Rest.
- Three states: Normal, Sick, and Evolved.
- One recovery path from Sick back to Normal.
- One evolution path from Normal to Evolved.
- Small personality reactions or Easter eggs.

The app must not include:

- Authentication.
- Multiple users.
- Multiple pets.
- Inventories, currencies, stores, or unlock economies.
- Mini-games.
- Social features.
- Notifications outside the page.
- Admin features.
- Multiple evolution branches.
- Permanent death.

## Success Criteria

- A user can name the pet and immediately begin caring for it.
- Vitals visibly decrease over time without user action.
- Feed, Play, and Rest change vitals according to documented rules.
- The pet becomes Sick when neglected according to documented thresholds.
- The pet can recover from Sick without reset or death.
- The pet can evolve once when consistently well cared for.
- The implementation uses the same thresholds, actions, and state lifecycle as the feature requirements.
- The interface shows a care-intelligence brief that recommends the next useful action from the current vitals.
- The interface follows the dark-only brand palette without light-mode fallback.
- Automated tests cover the core pet rules.
- Manual validation covers the complete browser flow.
