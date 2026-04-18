import {
  STORAGE_KEY,
  STATES,
  applyAction,
  applyElapsedTicks,
  applyTick,
  createPet,
  averageStats,
  getVitalStatus,
  normalizePet
} from "./petRules.js";

const setup = document.querySelector("#setup");
const game = document.querySelector("#game");
const form = document.querySelector("#name-form");
const nameInput = document.querySelector("#pet-name");
const stage = document.querySelector("#pet-stage");
const petTitle = document.querySelector("#pet-title");
const stateLabel = document.querySelector("#state-label");
const petSprite = document.querySelector("#pet-sprite");
const reaction = document.querySelector("#reaction");
const resetButton = document.querySelector("#reset");
const sickTicks = document.querySelector("#sick-ticks");
const recoveryTicks = document.querySelector("#recovery-ticks");
const evolutionTicks = document.querySelector("#evolution-ticks");
const totalActions = document.querySelector("#total-actions");
const averageValue = document.querySelector("#average-value");

const meters = {
  hunger: document.querySelector("#hunger-meter"),
  happiness: document.querySelector("#happiness-meter"),
  energy: document.querySelector("#energy-meter")
};

const values = {
  hunger: document.querySelector("#hunger-value"),
  happiness: document.querySelector("#happiness-value"),
  energy: document.querySelector("#energy-value")
};

const verdicts = {
  hunger: document.querySelector("#hunger-verdict"),
  happiness: document.querySelector("#happiness-verdict"),
  energy: document.querySelector("#energy-verdict")
};

let pet = loadPet();
let timerId;

if (pet) {
  pet = applyElapsedTicks(pet);
  savePet();
  showGame();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  pet = createPet(nameInput.value);
  savePet();
  showGame();
});

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    pet = applyAction(pet, button.dataset.action);
    savePet();
    render();
  });
});

resetButton.addEventListener("click", () => {
  window.localStorage.removeItem(STORAGE_KEY);
  pet = null;
  window.clearInterval(timerId);
  setup.classList.remove("hidden");
  game.classList.add("hidden");
  nameInput.focus();
});

function showGame() {
  setup.classList.add("hidden");
  game.classList.remove("hidden");
  render();
  window.clearInterval(timerId);
  timerId = window.setInterval(() => {
    pet = applyTick(pet);
    savePet();
    render();
  }, 10_000);
}

function render() {
  petTitle.textContent = pet.name;
  stateLabel.textContent = pet.state;
  reaction.textContent = pet.message;
  sickTicks.textContent = Math.min(pet.sickLowTicks, 3);
  recoveryTicks.textContent = Math.min(pet.recoveryTicks, 2);
  evolutionTicks.textContent = Math.min(pet.evolutionHighTicks, 5);
  totalActions.textContent = pet.totalActions;
  averageValue.textContent = averageStats(pet).toFixed(1);
  stage.dataset.state = pet.state;

  for (const vital of ["hunger", "happiness", "energy"]) {
    const status = getVitalStatus(pet[vital]);
    meters[vital].value = pet[vital];
    meters[vital].dataset.verdict = status.level;
    values[vital].textContent = pet[vital];
    verdicts[vital].textContent = status.label;
    verdicts[vital].dataset.verdict = status.level;
  }

  const sprite = {
    [STATES.NORMAL]: "assets/pet-normal.svg",
    [STATES.SICK]: "assets/pet-sick.svg",
    [STATES.EVOLVED]: "assets/pet-evolved.svg"
  }[pet.state];

  petSprite.src = sprite;
  petSprite.alt = `${pet.name}, currently ${pet.state}`;
}

function loadPet() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? normalizePet(JSON.parse(saved)) : null;
  } catch {
    return null;
  }
}

function savePet() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pet));
}
