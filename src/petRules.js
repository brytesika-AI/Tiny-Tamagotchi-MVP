export const STORAGE_KEY = "tiny-tamagotchi-state-v1";

export const STATES = {
  NORMAL: "Normal",
  SICK: "Sick",
  EVOLVED: "Evolved"
};

export const RULES = {
  tickMs: 10_000,
  maxCatchUpTicks: 12,
  sickThreshold: 20,
  recoveryThreshold: 45,
  evolutionThreshold: 80,
  evolutionTicks: 3,
  initial: {
    hunger: 76,
    happiness: 74,
    energy: 78
  },
  decay: {
    hunger: -4,
    happiness: -3,
    energy: -5
  },
  actions: {
    feed: {
      hunger: 18,
      happiness: 4,
      energy: -4
    },
    play: {
      hunger: -6,
      happiness: 16,
      energy: -10
    },
    rest: {
      hunger: -3,
      happiness: -4,
      energy: 22
    }
  }
};

const DEFAULT_REACTION = "Mochi wiggles hello.";

export function clampVital(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function createPet(name = "", now = Date.now()) {
  const trimmedName = name.trim() || "Mochi";
  return {
    name: trimmedName,
    hunger: RULES.initial.hunger,
    happiness: RULES.initial.happiness,
    energy: RULES.initial.energy,
    state: STATES.NORMAL,
    healthyTicks: 0,
    evolved: false,
    lastUpdated: now,
    reaction: trimmedName.toLowerCase() === "codex"
      ? "Codex reads the spec, nods solemnly, and squeaks ready."
      : DEFAULT_REACTION.replace("Mochi", trimmedName),
    actionCounts: {
      feed: 0,
      play: 0,
      rest: 0
    }
  };
}

export function normalizePet(raw, now = Date.now()) {
  if (!raw || typeof raw !== "object") {
    return createPet("", now);
  }

  const pet = {
    ...createPet(String(raw.name || ""), now),
    ...raw,
    name: String(raw.name || "Mochi").trim() || "Mochi",
    hunger: clampVital(Number(raw.hunger ?? RULES.initial.hunger)),
    happiness: clampVital(Number(raw.happiness ?? RULES.initial.happiness)),
    energy: clampVital(Number(raw.energy ?? RULES.initial.energy)),
    healthyTicks: Math.max(0, Math.round(Number(raw.healthyTicks ?? 0))),
    evolved: Boolean(raw.evolved),
    lastUpdated: Number(raw.lastUpdated || now),
    reaction: String(raw.reaction || DEFAULT_REACTION),
    actionCounts: {
      feed: Math.max(0, Number(raw.actionCounts?.feed || 0)),
      play: Math.max(0, Number(raw.actionCounts?.play || 0)),
      rest: Math.max(0, Number(raw.actionCounts?.rest || 0))
    }
  };

  return recalculateState(pet, { passiveTick: false });
}

export function applyAction(pet, action, now = Date.now()) {
  const delta = RULES.actions[action];
  if (!delta) {
    throw new Error(`Unknown action: ${action}`);
  }

  const next = {
    ...pet,
    hunger: clampVital(pet.hunger + delta.hunger),
    happiness: clampVital(pet.happiness + delta.happiness),
    energy: clampVital(pet.energy + delta.energy),
    lastUpdated: now,
    actionCounts: {
      ...pet.actionCounts,
      [action]: (pet.actionCounts?.[action] || 0) + 1
    }
  };

  const recalculated = recalculateState(next, { passiveTick: false });
  return {
    ...recalculated,
    reaction: reactionFor(recalculated, action)
  };
}

export function applyPassiveTick(pet, now = Date.now()) {
  const next = {
    ...pet,
    hunger: clampVital(pet.hunger + RULES.decay.hunger),
    happiness: clampVital(pet.happiness + RULES.decay.happiness),
    energy: clampVital(pet.energy + RULES.decay.energy),
    lastUpdated: now
  };

  const recalculated = recalculateState(next, { passiveTick: true });
  if (recalculated.state === STATES.SICK) {
    return {
      ...recalculated,
      reaction: `${recalculated.name} feels wobbly and needs care.`
    };
  }
  if (recalculated.evolved && !pet.evolved) {
    return {
      ...recalculated,
      reaction: `${recalculated.name} sparkles into a tiny grown-up legend.`
    };
  }
  return recalculated;
}

export function applyOfflineCatchUp(pet, now = Date.now()) {
  const elapsed = Math.max(0, now - pet.lastUpdated);
  const ticks = Math.min(
    RULES.maxCatchUpTicks,
    Math.floor(elapsed / RULES.tickMs)
  );

  let next = { ...pet };
  for (let index = 0; index < ticks; index += 1) {
    next = applyPassiveTick(next, pet.lastUpdated + RULES.tickMs * (index + 1));
  }

  return {
    ...next,
    lastUpdated: now
  };
}

export function getVitalVerdict(value) {
  if (value <= RULES.sickThreshold) {
    return { level: "critical", label: "FAILED" };
  }
  if (value < RULES.recoveryThreshold) {
    return { level: "warning", label: "PARTIAL" };
  }
  return { level: "compliant", label: "PASSED" };
}

export function getCareBrief(pet) {
  const vitals = [
    { key: "hunger", label: "Hunger", value: pet.hunger, action: "Feed" },
    { key: "happiness", label: "Happiness", value: pet.happiness, action: "Play" },
    { key: "energy", label: "Energy", value: pet.energy, action: "Rest" }
  ].sort((a, b) => a.value - b.value);

  const weakest = vitals[0];
  if (pet.state === STATES.SICK) {
    return {
      action: weakest.action,
      message: `${weakest.label} is the weakest vital. Use ${weakest.action} until every vital is at least ${RULES.recoveryThreshold}.`
    };
  }

  if (vitals.every((vital) => vital.value >= RULES.evolutionThreshold)) {
    return {
      action: "Monitor",
      message: `All vitals are evolution-ready. Hold this rhythm for ${RULES.evolutionTicks} passive ticks.`
    };
  }

  if (weakest.value < RULES.recoveryThreshold) {
    return {
      action: weakest.action,
      message: `${weakest.label} needs attention before the pet slips into Sick state.`
    };
  }

  return {
    action: weakest.action,
    message: `${weakest.label} is lowest. A timely ${weakest.action} keeps the care streak alive.`
  };
}

export function getMemoryCapsule(pet) {
  const counts = {
    feed: Number(pet.actionCounts?.feed || 0),
    play: Number(pet.actionCounts?.play || 0),
    rest: Number(pet.actionCounts?.rest || 0)
  };
  const totalCare = counts.feed + counts.play + counts.rest;
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const [topAction, topCount] = sorted[0];

  if (totalCare === 0) {
    return {
      ritual: "First greeting",
      summary: `${pet.name} has no care memory yet. The first action will become part of the ritual.`,
      counts,
      totalCare
    };
  }

  const rituals = {
    feed: "Calabash snack keeper",
    play: "Courtyard rhythm runner",
    rest: "Baobab dream listener"
  };

  const actionLabel = {
    feed: "feeding",
    play: "play",
    rest: "rest"
  };

  const ritual = topCount >= 3 ? rituals[topAction] : "Balanced care apprentice";

  return {
    ritual,
    summary: `${pet.name} remembers ${totalCare} care moments. ${actionLabel[topAction]} is the strongest pattern.`,
    counts,
    totalCare
  };
}

export function getStructuredCareCard(pet) {
  return {
    schema: "tiny-tamagotchi-care-card-v1",
    constraints: {
      singlePet: true,
      allowedActions: ["Feed", "Play", "Rest"],
      noDeath: true,
      noInventory: true
    },
    care: getCareBrief(pet),
    memory: getMemoryCapsule(pet),
    verdicts: {
      hunger: getVitalVerdict(pet.hunger),
      happiness: getVitalVerdict(pet.happiness),
      energy: getVitalVerdict(pet.energy)
    }
  };
}

export function recalculateState(pet, { passiveTick }) {
  const isSick = [pet.hunger, pet.happiness, pet.energy].some(
    (vital) => vital <= RULES.sickThreshold
  );

  if (isSick) {
    return {
      ...pet,
      state: STATES.SICK,
      healthyTicks: 0
    };
  }

  const recoveredState = pet.evolved ? STATES.EVOLVED : STATES.NORMAL;
  const isHighCare = [pet.hunger, pet.happiness, pet.energy].every(
    (vital) => vital >= RULES.evolutionThreshold
  );

  const healthyTicks = passiveTick
    ? (isHighCare ? pet.healthyTicks + 1 : 0)
    : pet.healthyTicks;

  if (pet.evolved || healthyTicks >= RULES.evolutionTicks) {
    return {
      ...pet,
      evolved: true,
      state: STATES.EVOLVED,
      healthyTicks
    };
  }

  const isRecovered = [pet.hunger, pet.happiness, pet.energy].every(
    (vital) => vital >= RULES.recoveryThreshold
  );

  return {
    ...pet,
    state: isRecovered ? recoveredState : pet.state === STATES.SICK ? STATES.SICK : STATES.NORMAL,
    healthyTicks
  };
}

function reactionFor(pet, action) {
  const count = pet.actionCounts[action] || 0;

  if (pet.state === STATES.SICK) {
    return `${pet.name} accepts the care, but still needs gentler attention.`;
  }

  if (action === "feed" && count >= 3) {
    return `${pet.name} reveals a secret crumb stash behind the moon pillow.`;
  }
  if (action === "play" && count >= 3) {
    return `${pet.name} launches a cardboard rocket across the room.`;
  }
  if (action === "rest" && count >= 3) {
    return `${pet.name} dreams of tiny clouds wearing little boots.`;
  }

  const reactions = {
    feed: `${pet.name} crunches snacks and saves one crumb for later.`,
    play: `${pet.name} bounces twice, then invents a toy parade.`,
    rest: `${pet.name} curls under a blanket and hums softly.`
  };

  return reactions[action];
}
