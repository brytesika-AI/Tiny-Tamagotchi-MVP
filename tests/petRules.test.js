import test from "node:test";
import assert from "node:assert/strict";
import {
  RULES,
  STATES,
  applyAction,
  applyOfflineCatchUp,
  applyPassiveTick,
  clampVital,
  createPet,
  getCareBrief,
  getVitalVerdict,
  normalizePet
} from "../src/petRules.js";

test("creates a default pet with the required starting values", () => {
  const pet = createPet("   ", 1000);

  assert.equal(pet.name, "Mochi");
  assert.equal(pet.hunger, 76);
  assert.equal(pet.happiness, 74);
  assert.equal(pet.energy, 78);
  assert.equal(pet.state, STATES.NORMAL);
  assert.equal(pet.healthyTicks, 0);
  assert.equal(pet.evolved, false);
});

test("clamps vitals to the documented 0 to 100 range", () => {
  assert.equal(clampVital(-20), 0);
  assert.equal(clampVital(44.6), 45);
  assert.equal(clampVital(140), 100);
});

test("applies Feed, Play, and Rest deltas", () => {
  const start = createPet("Pip", 1000);
  const fed = applyAction(start, "feed", 2000);
  const played = applyAction(start, "play", 2000);
  const rested = applyAction(start, "rest", 2000);

  assert.equal(fed.hunger, 94);
  assert.equal(fed.happiness, 78);
  assert.equal(fed.energy, 74);
  assert.equal(played.hunger, 70);
  assert.equal(played.happiness, 90);
  assert.equal(played.energy, 68);
  assert.equal(rested.hunger, 73);
  assert.equal(rested.happiness, 70);
  assert.equal(rested.energy, 100);
});

test("passive tick decays all vitals by the documented amounts", () => {
  const pet = applyPassiveTick(createPet("Pip", 1000), 11_000);

  assert.equal(pet.hunger, 72);
  assert.equal(pet.happiness, 71);
  assert.equal(pet.energy, 73);
});

test("pet becomes Sick when any vital is at or below the sick threshold", () => {
  const sick = normalizePet({
    ...createPet("Pip"),
    hunger: RULES.sickThreshold,
    happiness: 90,
    energy: 90
  });

  assert.equal(sick.state, STATES.SICK);
});

test("Sick pet recovers to Normal when all vitals reach the recovery threshold", () => {
  let pet = normalizePet({
    ...createPet("Pip"),
    hunger: 20,
    happiness: 90,
    energy: 90
  });

  pet = normalizePet({
    ...pet,
    hunger: RULES.recoveryThreshold,
    happiness: RULES.recoveryThreshold,
    energy: RULES.recoveryThreshold
  });

  assert.equal(pet.state, STATES.NORMAL);
});

test("pet evolves after three high-care passive ticks", () => {
  let pet = normalizePet({
    ...createPet("Pip"),
    hunger: 100,
    happiness: 100,
    energy: 100
  });

  pet = applyPassiveTick(pet, 10_000);
  pet = applyPassiveTick(pet, 20_000);
  pet = applyPassiveTick(pet, 30_000);

  assert.equal(pet.evolved, true);
  assert.equal(pet.state, STATES.EVOLVED);
});

test("evolved pet can become Sick and recover to Evolved", () => {
  let pet = normalizePet({
    ...createPet("Pip"),
    evolved: true,
    state: STATES.EVOLVED,
    hunger: 19,
    happiness: 90,
    energy: 90
  });

  assert.equal(pet.state, STATES.SICK);

  pet = normalizePet({
    ...pet,
    hunger: 45,
    happiness: 45,
    energy: 45
  });

  assert.equal(pet.state, STATES.EVOLVED);
});

test("repeated actions trigger documented Easter eggs", () => {
  let pet = createPet("Pip");

  pet = applyAction(pet, "feed");
  pet = applyAction(pet, "feed");
  pet = applyAction(pet, "feed");
  assert.match(pet.reaction, /secret crumb stash/);

  pet = applyAction(pet, "play");
  pet = applyAction(pet, "play");
  pet = applyAction(pet, "play");
  assert.match(pet.reaction, /cardboard rocket/);

  pet = applyAction(pet, "rest");
  pet = applyAction(pet, "rest");
  pet = applyAction(pet, "rest");
  assert.match(pet.reaction, /tiny clouds/);
});

test("Codex name produces the special first reaction", () => {
  const pet = createPet("Codex");
  assert.match(pet.reaction, /reads the spec/);
});

test("offline catch-up applies elapsed ticks and caps long absences", () => {
  const pet = createPet("Pip", 0);
  const twoTicks = applyOfflineCatchUp(pet, RULES.tickMs * 2);
  const capped = applyOfflineCatchUp(pet, RULES.tickMs * 30);

  assert.equal(twoTicks.hunger, 68);
  assert.equal(twoTicks.happiness, 68);
  assert.equal(twoTicks.energy, 68);
  assert.equal(capped.hunger, 28);
  assert.equal(capped.happiness, 38);
  assert.equal(capped.energy, 18);
});

test("vital verdicts use governance status thresholds only", () => {
  assert.deepEqual(getVitalVerdict(20), { level: "critical", label: "FAILED" });
  assert.deepEqual(getVitalVerdict(44), { level: "warning", label: "PARTIAL" });
  assert.deepEqual(getVitalVerdict(45), { level: "compliant", label: "PASSED" });
});

test("care brief recommends the action for the weakest vital", () => {
  const pet = normalizePet({
    ...createPet("Pip"),
    hunger: 70,
    happiness: 30,
    energy: 68
  });

  const brief = getCareBrief(pet);

  assert.equal(brief.action, "Play");
  assert.match(brief.message, /Happiness/);
});
