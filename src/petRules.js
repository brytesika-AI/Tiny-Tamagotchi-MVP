export const STORAGE_KEY = "tiny-tamagotchi-state-v2";

export const STATES = {
  NORMAL: "Normal",
  SICK: "Sick",
  EVOLVED: "Evolved"
};

export const ACTIONS = {
  FEED: "feed",
  PLAY: "play",
  REST: "rest"
};

export const RULES = {
  tickMs: 10_000,
  maxCatchUpTicks: 12,
  minStat: 0,
  maxStat: 100,
  sickThresholdExclusive: 20,
  sickRequiredTicks: 3,
  recoveryThresholdExclusive: 40,
  recoveryRequiredTicks: 2,
  evolutionAverageThreshold: 70,
  evolutionRequiredTicks: 5,
  evolutionRequiredActions: 8,
  initial: {
    hunger: 80,
    happiness: 80,
    energy: 80
  },
  decay: {
    hunger: -8,
    happiness: -6,
    energy: -5
  },
  actions: {
    feed: {
      hunger: 25,
      happiness: 2,
      energy: 0
    },
    play: {
      hunger: -5,
      happiness: 20,
      energy: -10
    },
    rest: {
      hunger: 0,
      happiness: -2,
      energy: 30
    }
  }
};

const DEFAULT_NAME = "Mochi";

export function clampStat(value) {
  return Math.max(RULES.minStat, Math.min(RULES.maxStat, Math.round(value)));
}

export function createPet(name = "", now = Date.now()) {
  const petName = normalizeName(name);
  return {
    name: petName,
    hunger: RULES.initial.hunger,
    happiness: RULES.initial.happiness,
    energy: RULES.initial.energy,
    state: STATES.NORMAL,
    sickLowTicks: 0,
    recoveryTicks: 0,
    evolutionHighTicks: 0,
    evolved: false,
    totalActions: 0,
    lastUpdated: now,
    actionCounts: {
      feed: 0,
      play: 0,
      rest: 0
    },
    message: initialMessage(petName)
  };
}

export function normalizePet(raw, now = Date.now()) {
  if (!raw || typeof raw !== "object") {
    return createPet("", now);
  }

  const base = createPet(String(raw.name || DEFAULT_NAME), now);
  const state = Object.values(STATES).includes(raw.state) ? raw.state : STATES.NORMAL;
  const actionCounts = {
    feed: nonNegativeInteger(raw.actionCounts?.feed),
    play: nonNegativeInteger(raw.actionCounts?.play),
    rest: nonNegativeInteger(raw.actionCounts?.rest)
  };
  const derivedTotal = actionCounts.feed + actionCounts.play + actionCounts.rest;

  return {
    ...base,
    name: normalizeName(raw.name),
    hunger: clampStat(Number(raw.hunger ?? RULES.initial.hunger)),
    happiness: clampStat(Number(raw.happiness ?? RULES.initial.happiness)),
    energy: clampStat(Number(raw.energy ?? RULES.initial.energy)),
    state,
    sickLowTicks: nonNegativeInteger(raw.sickLowTicks),
    recoveryTicks: nonNegativeInteger(raw.recoveryTicks),
    evolutionHighTicks: nonNegativeInteger(raw.evolutionHighTicks),
    evolved: Boolean(raw.evolved),
    totalActions: nonNegativeInteger(raw.totalActions ?? derivedTotal),
    lastUpdated: Number(raw.lastUpdated || now),
    actionCounts,
    message: String(raw.message || base.message)
  };
}

export function applyAction(pet, action, now = Date.now()) {
  const delta = RULES.actions[action];
  if (!delta) {
    throw new Error(`Unknown action: ${action}`);
  }

  const next = {
    ...pet,
    hunger: clampStat(pet.hunger + delta.hunger),
    happiness: clampStat(pet.happiness + delta.happiness),
    energy: clampStat(pet.energy + delta.energy),
    totalActions: pet.totalActions + 1,
    lastUpdated: now,
    actionCounts: {
      ...pet.actionCounts,
      [action]: (pet.actionCounts?.[action] || 0) + 1
    }
  };

  return {
    ...next,
    message: messageFor(next, action)
  };
}

export function applyTick(pet, now = Date.now()) {
  const decayed = {
    ...pet,
    hunger: clampStat(pet.hunger + RULES.decay.hunger),
    happiness: clampStat(pet.happiness + RULES.decay.happiness),
    energy: clampStat(pet.energy + RULES.decay.energy),
    lastUpdated: now
  };

  return applyTickStateRules(decayed);
}

export function applyElapsedTicks(pet, now = Date.now()) {
  const elapsed = Math.max(0, now - pet.lastUpdated);
  const ticks = Math.min(RULES.maxCatchUpTicks, Math.floor(elapsed / RULES.tickMs));
  let next = { ...pet };

  for (let index = 0; index < ticks; index += 1) {
    next = applyTick(next, pet.lastUpdated + RULES.tickMs * (index + 1));
  }

  return {
    ...next,
    lastUpdated: now
  };
}

export function averageStats(pet) {
  return Math.round(((pet.hunger + pet.happiness + pet.energy) / 3) * 100) / 100;
}

export function getVitalStatus(value) {
  if (value < RULES.sickThresholdExclusive) {
    return { level: "critical", label: "LOW" };
  }
  if (value <= RULES.recoveryThresholdExclusive) {
    return { level: "warning", label: "WATCH" };
  }
  return { level: "healthy", label: "OK" };
}

function applyTickStateRules(pet) {
  const anyBelowSick = [pet.hunger, pet.happiness, pet.energy].some(
    (value) => value < RULES.sickThresholdExclusive
  );
  const allAboveRecovery = [pet.hunger, pet.happiness, pet.energy].every(
    (value) => value > RULES.recoveryThresholdExclusive
  );
  const averageHighEnough = averageStats(pet) >= RULES.evolutionAverageThreshold;

  let next = { ...pet };

  if (next.state === STATES.SICK) {
    next.sickLowTicks = anyBelowSick ? next.sickLowTicks + 1 : 0;
    next.recoveryTicks = allAboveRecovery ? next.recoveryTicks + 1 : 0;
    next.evolutionHighTicks = 0;

    if (next.recoveryTicks >= RULES.recoveryRequiredTicks) {
      next.state = STATES.NORMAL;
      next.sickLowTicks = 0;
      next.recoveryTicks = 0;
      next.message = `${next.name} has recovered and is steady again.`;
    } else {
      next.message = `${next.name} is sick and needs all stats above ${RULES.recoveryThresholdExclusive}.`;
    }
    return next;
  }

  next.sickLowTicks = anyBelowSick ? next.sickLowTicks + 1 : 0;
  next.recoveryTicks = 0;

  if (next.sickLowTicks >= RULES.sickRequiredTicks) {
    next.state = STATES.SICK;
    next.evolutionHighTicks = 0;
    next.message = `${next.name} is sick after repeated neglect.`;
    return next;
  }

  if (!next.evolved && averageHighEnough && next.totalActions >= RULES.evolutionRequiredActions) {
    next.evolutionHighTicks += 1;
  } else if (!next.evolved) {
    next.evolutionHighTicks = 0;
  }

  if (!next.evolved && next.evolutionHighTicks >= RULES.evolutionRequiredTicks) {
    next.evolved = true;
    next.state = STATES.EVOLVED;
    next.message = `${next.name} evolves for the first time and glows with pride.`;
    return next;
  }

  if (!next.evolved) {
    next.state = STATES.NORMAL;
  }

  if (!next.message) {
    next.message = `${next.name} watches the room carefully.`;
  }

  return next;
}

function messageFor(pet, action) {
  if (pet.state === STATES.SICK) {
    return `${pet.name} accepts care, but recovery needs two healthy ticks.`;
  }

  if (pet.happiness >= 95) {
    return `${pet.name} does a tiny victory dance.`;
  }
  if (pet.energy <= 20) {
    return `${pet.name} yawns and asks for a quiet rest.`;
  }
  if (action === ACTIONS.FEED && pet.actionCounts.feed >= 3) {
    return `${pet.name} reveals a secret snack stash.`;
  }

  const messages = {
    feed: `${pet.name} crunches happily.`,
    play: `${pet.name} bounces with bright eyes.`,
    rest: `${pet.name} tucks into a warm nap.`
  };
  return messages[action];
}

function normalizeName(name) {
  const text = String(name || "").trim();
  return text || DEFAULT_NAME;
}

function initialMessage(name) {
  return `${name} is ready for care.`;
}

function nonNegativeInteger(value) {
  return Math.max(0, Math.round(Number(value || 0)));
}
