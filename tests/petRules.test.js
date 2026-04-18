import test from "node:test";
import assert from "node:assert/strict";
import {
  RULES,
  STATES,
  ACTIONS,
  applyAction,
  applyElapsedTicks,
  applyTick,
  averageStats,
  clampStat,
  createPet,
  getVitalStatus,
  normalizePet
} from "../src/petRules.js";

test("creates one default pet with specified starting values", () => {
  const pet = createPet("   ", 1000);

  assert.equal(pet.name, "Mochi");
  assert.equal(pet.hunger, 80);
  assert.equal(pet.happiness, 80);
  assert.equal(pet.energy, 80);
  assert.equal(pet.state, STATES.NORMAL);
  assert.equal(pet.totalActions, 0);
  assert.equal(pet.evolved, false);
});

test("clamps stats to the 0 to 100 range", () => {
  assert.equal(clampStat(-1), 0);
  assert.equal(clampStat(50.4), 50);
  assert.equal(clampStat(120), 100);
});

test("applies Feed, Play, and Rest exactly as specified", () => {
  const start = createPet("Pip", 1000);
  const fed = applyAction(start, ACTIONS.FEED, 2000);
  const played = applyAction(start, ACTIONS.PLAY, 2000);
  const rested = applyAction(start, ACTIONS.REST, 2000);

  assert.equal(fed.hunger, 100);
  assert.equal(fed.happiness, 82);
  assert.equal(fed.energy, 80);
  assert.equal(played.hunger, 75);
  assert.equal(played.happiness, 100);
  assert.equal(played.energy, 70);
  assert.equal(rested.hunger, 80);
  assert.equal(rested.happiness, 78);
  assert.equal(rested.energy, 100);
  assert.equal(fed.totalActions, 1);
});

test("tick decays stats by 8 hunger, 6 happiness, and 5 energy", () => {
  const pet = applyTick(createPet("Pip", 1000), 11_000);

  assert.equal(pet.hunger, 72);
  assert.equal(pet.happiness, 74);
  assert.equal(pet.energy, 75);
});

test("Sick triggers only after any stat is below 20 for three consecutive ticks", () => {
  let pet = normalizePet({
    ...createPet("Pip"),
    hunger: 25,
    happiness: 80,
    energy: 80
  });

  pet = applyTick(pet, 10_000);
  assert.equal(pet.hunger, 17);
  assert.equal(pet.sickLowTicks, 1);
  assert.equal(pet.state, STATES.NORMAL);

  pet = applyTick(pet, 20_000);
  assert.equal(pet.sickLowTicks, 2);
  assert.equal(pet.state, STATES.NORMAL);

  pet = applyTick(pet, 30_000);
  assert.equal(pet.sickLowTicks, 3);
  assert.equal(pet.state, STATES.SICK);
});

test("Sick recovery requires all stats above 40 for two consecutive ticks", () => {
  let pet = normalizePet({
    ...createPet("Pip"),
    state: STATES.SICK,
    hunger: 60,
    happiness: 60,
    energy: 60,
    sickLowTicks: 3
  });

  pet = applyTick(pet, 10_000);
  assert.equal(pet.recoveryTicks, 1);
  assert.equal(pet.state, STATES.SICK);

  pet = applyTick(pet, 20_000);
  assert.equal(pet.recoveryTicks, 0);
  assert.equal(pet.state, STATES.NORMAL);
});

test("recovery counter resets if any stat is not above 40", () => {
  let pet = normalizePet({
    ...createPet("Pip"),
    state: STATES.SICK,
    hunger: 55,
    happiness: 47,
    energy: 55,
    recoveryTicks: 1
  });

  pet = applyTick(pet, 10_000);

  assert.equal(pet.happiness, 41);
  assert.equal(pet.recoveryTicks, 0);
  assert.equal(pet.state, STATES.NORMAL);

  pet = normalizePet({
    ...pet,
    state: STATES.SICK,
    hunger: 48,
    happiness: 46,
    energy: 44,
    recoveryTicks: 1
  });
  pet = applyTick(pet, 20_000);

  assert.equal(pet.energy, 39);
  assert.equal(pet.recoveryTicks, 0);
  assert.equal(pet.state, STATES.SICK);
});

test("evolution requires average at least 70 for five ticks and at least eight actions", () => {
  let pet = normalizePet({
    ...createPet("Pip"),
    hunger: 100,
    happiness: 100,
    energy: 100,
    totalActions: 7
  });

  for (let index = 0; index < 5; index += 1) {
    pet = applyTick(pet, index * 10_000);
  }
  assert.equal(pet.evolved, false);
  assert.equal(pet.state, STATES.NORMAL);

  pet = normalizePet({
    ...pet,
    hunger: 100,
    happiness: 100,
    energy: 100,
    totalActions: 8,
    evolutionHighTicks: 0
  });

  for (let index = 0; index < 5; index += 1) {
    pet = normalizePet({
      ...pet,
      hunger: 100,
      happiness: 100,
      energy: 100
    });
    pet = applyTick(pet, 60_000 + index * 10_000);
  }

  assert.equal(pet.evolved, true);
  assert.equal(pet.state, STATES.EVOLVED);
});

test("evolution happens only once", () => {
  let pet = normalizePet({
    ...createPet("Pip"),
    state: STATES.EVOLVED,
    evolved: true,
    hunger: 100,
    happiness: 100,
    energy: 100,
    totalActions: 20,
    evolutionHighTicks: 5
  });

  pet = applyTick(pet, 10_000);

  assert.equal(pet.evolved, true);
  assert.equal(pet.state, STATES.EVOLVED);
  assert.equal(pet.evolutionHighTicks, 5);
});

test("elapsed tick catch-up is deterministic and capped", () => {
  const pet = createPet("Pip", 0);
  const twoTicks = applyElapsedTicks(pet, RULES.tickMs * 2);
  const capped = applyElapsedTicks(pet, RULES.tickMs * 30);

  assert.equal(twoTicks.hunger, 64);
  assert.equal(twoTicks.happiness, 68);
  assert.equal(twoTicks.energy, 70);
  assert.equal(capped.hunger, 0);
  assert.equal(capped.happiness, 8);
  assert.equal(capped.energy, 20);
});

test("personality messages cover high happiness, low energy, repeated feed, and first evolution", () => {
  let pet = createPet("Pip");

  pet = applyAction(pet, ACTIONS.PLAY);
  assert.match(pet.message, /victory dance/);

  pet = normalizePet({ ...createPet("Pip"), happiness: 50, energy: 15 });
  pet = applyAction(pet, ACTIONS.FEED);
  assert.match(pet.message, /quiet rest/);

  pet = createPet("Pip");
  pet = applyAction(pet, ACTIONS.FEED);
  pet = applyAction(pet, ACTIONS.FEED);
  pet = applyAction(pet, ACTIONS.FEED);
  assert.match(pet.message, /secret snack stash/);

  pet = normalizePet({
    ...pet,
    hunger: 100,
    happiness: 100,
    energy: 100,
    totalActions: 8,
    evolutionHighTicks: 4
  });
  pet = applyTick(pet);
  assert.match(pet.message, /evolves for the first time/);
});

test("persistence normalization restores saved state safely", () => {
  const pet = normalizePet({
    name: "  Zuri  ",
    hunger: 120,
    happiness: -10,
    energy: 55,
    state: "Unexpected",
    totalActions: 2,
    evolved: true,
    actionCounts: { feed: 1, play: 1, rest: 0 }
  });

  assert.equal(pet.name, "Zuri");
  assert.equal(pet.hunger, 100);
  assert.equal(pet.happiness, 0);
  assert.equal(pet.energy, 55);
  assert.equal(pet.state, STATES.NORMAL);
  assert.equal(pet.evolved, true);
  assert.equal(pet.totalActions, 2);
});

test("average and visible vital statuses are deterministic", () => {
  const pet = normalizePet({ ...createPet("Pip"), hunger: 70, happiness: 80, energy: 90 });

  assert.equal(averageStats(pet), 80);
  assert.deepEqual(getVitalStatus(19), { level: "critical", label: "LOW" });
  assert.deepEqual(getVitalStatus(40), { level: "warning", label: "WATCH" });
  assert.deepEqual(getVitalStatus(41), { level: "healthy", label: "OK" });
});
