const fields = {
  primary: document.querySelector("#primary"),
  secondary: document.querySelector("#secondary"),
  accent: document.querySelector("#accent"),
  align: document.querySelector("#align"),
  animationMs: document.querySelector("#animationMs")
};

const statusBadge = document.querySelector("#statusBadge");
const animationValue = document.querySelector("#animationValue");
let state = {};

async function loadState() {
  const response = await fetch("/api/state");
  state = await response.json();
  renderForm();
}

function renderForm() {
  for (const [key, element] of Object.entries(fields)) {
    element.value = state[key] ?? "";
  }
  animationValue.value = `${state.animationMs} ms`;
  statusBadge.textContent = state.visible ? "PROGRAM" : "PREVIEW";
  statusBadge.className = `badge ${state.visible ? "program" : "preview"}`;
}

async function update(patch) {
  state = { ...state, ...patch };
  renderForm();
  const response = await fetch("/api/state", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state)
  });
  if (!response.ok) {
    console.error("No se pudo actualizar el estado.");
  }
}

for (const [key, element] of Object.entries(fields)) {
  element.addEventListener("input", () => {
    const value = key === "animationMs"
      ? Number(element.value)
      : element.value;
    update({ [key]: value });
  });
}

document.querySelector("#takeIn").addEventListener("click", () => update({ visible: true }));
document.querySelector("#takeOut").addEventListener("click", () => update({ visible: false }));

loadState();
