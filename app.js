const STORAGE_KEY = "training-app-routines";
const HISTORY_STORAGE_KEY = "training-app-history";

const defaultRoutines = {
  lunes: [
    { name: "Sentadilla", sets: 4, reps: 8 },
    { name: "Press de banca", sets: 4, reps: 10 },
    { name: "Remo con barra", sets: 3, reps: 10 },
    { name: "Peso muerto rumano", sets: 3, reps: 12 },
  ],
  martes: [],
  miercoles: [],
  jueves: [],
  viernes: [],
  sabado: [],
  domingo: [],
};

const dayNames = {
  lunes: "Lunes",
  martes: "Martes",
  miercoles: "Miercoles",
  jueves: "Jueves",
  viernes: "Viernes",
  sabado: "Sabado",
  domingo: "Domingo",
};

const state = {
  selectedDay: "lunes",
  routines: loadRoutines(),
  sessions: loadSessions(),
  workoutPlan: [],
  exerciseIndex: 0,
  setIndex: 0,
  log: [],
  currentSessionSaved: false,
};

const homeView = document.querySelector("#homeView");
const workoutView = document.querySelector("#workoutView");
const summaryView = document.querySelector("#summaryView");
const selectedDayLabel = document.querySelector("#selectedDayLabel");
const daySelector = document.querySelector("#daySelector");
const routineTitle = document.querySelector("#routineTitle");
const planList = document.querySelector("#planList");
const startButton = document.querySelector("#startButton");
const backButton = document.querySelector("#backButton");
const restartButton = document.querySelector("#restartButton");
const completeSetButton = document.querySelector("#completeSetButton");
const clearDayButton = document.querySelector("#clearDayButton");
const clearHistoryButton = document.querySelector("#clearHistoryButton");
const exerciseForm = document.querySelector("#exerciseForm");
const exerciseInput = document.querySelector("#exerciseInput");
const setsInput = document.querySelector("#setsInput");
const repsInput = document.querySelector("#repsInput");
const singleRepsField = document.querySelector("#singleRepsField");
const variableRepsToggle = document.querySelector("#variableRepsToggle");
const setRepsFields = document.querySelector("#setRepsFields");
const exerciseCounter = document.querySelector("#exerciseCounter");
const exerciseName = document.querySelector("#exerciseName");
const setCounter = document.querySelector("#setCounter");
const repTarget = document.querySelector("#repTarget");
const setsRemaining = document.querySelector("#setsRemaining");
const weightInput = document.querySelector("#weightInput");
const setHistory = document.querySelector("#setHistory");
const progressFill = document.querySelector("#progressFill");
const summaryText = document.querySelector("#summaryText");
const summaryLog = document.querySelector("#summaryLog");
const savedSessionsList = document.querySelector("#savedSessionsList");

function loadRoutines() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return cloneRoutines(defaultRoutines);
  }

  try {
    return { ...cloneRoutines(defaultRoutines), ...JSON.parse(saved) };
  } catch {
    return cloneRoutines(defaultRoutines);
  }
}

function cloneRoutines(routines) {
  return JSON.parse(JSON.stringify(routines));
}

function saveRoutines() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.routines));
}

function loadSessions() {
  const saved = localStorage.getItem(HISTORY_STORAGE_KEY);

  if (!saved) {
    return [];
  }

  try {
    const sessions = JSON.parse(saved);
    return Array.isArray(sessions) ? sessions : [];
  } catch {
    return [];
  }
}

function saveSessions() {
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(state.sessions));
}

function getSelectedRoutine() {
  return state.routines[state.selectedDay] ?? [];
}

function renderDaySelector() {
  daySelector.innerHTML = Object.entries(dayNames)
    .map(
      ([dayKey, dayLabel]) => `
        <button class="day-button${state.selectedDay === dayKey ? " is-active" : ""}" type="button" data-day="${dayKey}">
          ${dayLabel.slice(0, 3)}
        </button>
      `,
    )
    .join("");
}

function renderPlan() {
  const routine = getSelectedRoutine();
  selectedDayLabel.textContent = `Entrenamiento de ${dayNames[state.selectedDay]}`;
  routineTitle.textContent = dayNames[state.selectedDay];
  clearDayButton.disabled = routine.length === 0;
  startButton.disabled = routine.length === 0;
  renderSavedSessions();

  if (routine.length === 0) {
    planList.innerHTML = `<li class="empty-state">Todavia no hay ejercicios cargados para este dia.</li>`;
    return;
  }

  planList.innerHTML = routine
    .map(
      (exercise, index) => `
        <li>
          <div>
            <strong>${escapeHtml(exercise.name)}</strong>
            <span>${getExerciseRepsLabel(exercise)}</span>
          </div>
          <button class="remove-action" type="button" data-remove-index="${index}" aria-label="Quitar ${escapeHtml(exercise.name)}">
            Quitar
          </button>
        </li>
      `,
    )
    .join("");
}

function getExerciseRepsLabel(exercise) {
  if (Array.isArray(exercise.repsBySet) && exercise.repsBySet.length > 0) {
    return exercise.repsBySet.map((reps, index) => `S${index + 1}: ${reps} reps`).join(" - ");
  }

  return `${exercise.sets} series x ${exercise.reps} repeticiones`;
}

function getRepsForSet(exercise, setIndex) {
  if (Array.isArray(exercise.repsBySet) && exercise.repsBySet[setIndex] !== undefined) {
    return exercise.repsBySet[setIndex];
  }

  return exercise.reps;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderSavedSessions() {
  const sessionsForDay = state.sessions
    .filter((session) => session.day === state.selectedDay)
    .slice(0, 5);

  clearHistoryButton.disabled = sessionsForDay.length === 0;

  if (sessionsForDay.length === 0) {
    savedSessionsList.innerHTML = `<p class="empty-history">Todavia no hay entrenamientos guardados para este dia.</p>`;
    return;
  }

  savedSessionsList.innerHTML = sessionsForDay
    .map(
      (session) => `
        <article class="saved-session">
          <div class="saved-session-header">
            <strong>${formatSessionDate(session.completedAt)}</strong>
            <span>${session.totalSets} series</span>
          </div>
          <ul>
            ${session.exercises
              .map(
                (exercise) => `
                  <li>
                    <strong>${escapeHtml(exercise.name)}</strong>
                    <span>${exercise.sets
                      .map((set, index) => formatLoggedSet(set, index))
                      .join(" - ")}</span>
                  </li>
                `,
              )
              .join("")}
          </ul>
        </article>
      `,
    )
    .join("");
}

function formatSessionDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Fecha no disponible";
  }

  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function showView(view) {
  homeView.classList.toggle("is-hidden", view !== "home");
  workoutView.classList.toggle("is-hidden", view !== "workout");
  summaryView.classList.toggle("is-hidden", view !== "summary");
}

function resetWorkout() {
  state.workoutPlan = getSelectedRoutine().map((exercise) => ({ ...exercise }));
  state.exerciseIndex = 0;
  state.setIndex = 0;
  state.currentSessionSaved = false;
  state.log = state.workoutPlan.map((exercise) => ({
    name: exercise.name,
    repsBySet: Array.isArray(exercise.repsBySet) ? [...exercise.repsBySet] : undefined,
    reps: exercise.reps,
    sets: [],
  }));
}

function getTotalSets() {
  return state.workoutPlan.reduce((total, exercise) => total + exercise.sets, 0);
}

function getCompletedSets() {
  return state.log.reduce((total, exercise) => total + exercise.sets.length, 0);
}

function renderWorkout() {
  const exercise = state.workoutPlan[state.exerciseIndex];
  const completedForExercise = state.log[state.exerciseIndex].sets;
  const currentSet = state.setIndex + 1;

  exerciseCounter.textContent = `${dayNames[state.selectedDay]} - ejercicio ${state.exerciseIndex + 1} de ${state.workoutPlan.length}`;
  exerciseName.textContent = exercise.name;
  setCounter.textContent = `${currentSet} / ${exercise.sets}`;
  repTarget.textContent = getRepsForSet(exercise, state.setIndex);
  setsRemaining.textContent = Math.max(exercise.sets - currentSet, 0);
  progressFill.style.width = `${(getCompletedSets() / getTotalSets()) * 100}%`;
  setHistory.innerHTML = completedForExercise
    .map((set, index) => `<li>${formatLoggedSet(set, index)}</li>`)
    .join("");
  weightInput.value = "";
  weightInput.focus();
}

function formatWeight(weight) {
  if (weight === "") {
    return "sin peso";
  }

  return `${Number(weight).toLocaleString("es-AR")} kg`;
}

function formatLoggedSet(set, index) {
  if (set && typeof set === "object") {
    return `S${index + 1}: ${set.reps} reps - ${formatWeight(set.weight)}`;
  }

  return `S${index + 1}: ${formatWeight(set)}`;
}

function completeSet() {
  const exercise = state.workoutPlan[state.exerciseIndex];
  const weight = weightInput.value.trim();

  state.log[state.exerciseIndex].sets.push({
    reps: getRepsForSet(exercise, state.setIndex),
    weight,
  });
  state.setIndex += 1;

  if (state.setIndex >= exercise.sets) {
    state.exerciseIndex += 1;
    state.setIndex = 0;
  }

  if (state.exerciseIndex >= state.workoutPlan.length) {
    renderSummary();
    showView("summary");
    return;
  }

  renderWorkout();
}

function renderSummary() {
  saveCompletedSession();
  progressFill.style.width = "100%";
  summaryText.textContent = `Completaste ${getTotalSets()} series en ${state.workoutPlan.length} ejercicios de ${dayNames[state.selectedDay]}.`;
  summaryLog.innerHTML = state.log
    .map(
      (exercise) => `
        <article class="summary-exercise">
          <strong>${escapeHtml(exercise.name)}</strong>
          <ul>
            ${exercise.sets
              .map((set, index) => `<li><span>${formatLoggedSet(set, index)}</span></li>`)
              .join("")}
          </ul>
        </article>
      `,
    )
    .join("");
}

function saveCompletedSession() {
  if (state.currentSessionSaved) {
    return;
  }

  const session = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    day: state.selectedDay,
    dayName: dayNames[state.selectedDay],
    completedAt: new Date().toISOString(),
    totalSets: getTotalSets(),
    totalExercises: state.workoutPlan.length,
    exercises: state.log.map((exercise) => ({
      name: exercise.name,
      sets: exercise.sets.map((set) => (set && typeof set === "object" ? { ...set } : set)),
    })),
  };

  state.sessions.unshift(session);
  state.sessions = state.sessions.slice(0, 100);
  state.currentSessionSaved = true;
  saveSessions();
}

function startWorkout() {
  if (getSelectedRoutine().length === 0) {
    return;
  }

  resetWorkout();
  showView("workout");
  renderWorkout();
}

function addExercise(event) {
  event.preventDefault();
  const name = exerciseInput.value.trim();
  const sets = Number(setsInput.value);
  const reps = Number(repsInput.value);
  const repsBySet = getRepsBySetFromForm();

  if (!name || sets < 1 || (!variableRepsToggle.checked && reps < 1) || (variableRepsToggle.checked && !repsBySet)) {
    return;
  }

  const exercise = variableRepsToggle.checked
    ? { name, sets, repsBySet }
    : { name, sets, reps };

  state.routines[state.selectedDay].push(exercise);
  saveRoutines();
  exerciseForm.reset();
  setsInput.value = "3";
  repsInput.value = "10";
  renderExerciseFormMode();
  exerciseInput.focus();
  renderPlan();
}

function getRepsBySetFromForm() {
  const inputs = [...setRepsFields.querySelectorAll("input")];
  const reps = inputs.map((input) => Number(input.value));

  if (reps.length === 0 || reps.some((value) => value < 1 || !Number.isFinite(value))) {
    return null;
  }

  return reps;
}

function renderExerciseFormMode() {
  const useVariableReps = variableRepsToggle.checked;
  singleRepsField.classList.toggle("is-hidden", useVariableReps);
  repsInput.required = !useVariableReps;
  setRepsFields.classList.toggle("is-hidden", !useVariableReps);

  if (useVariableReps) {
    renderSetRepsFields();
  } else {
    setRepsFields.innerHTML = "";
  }
}

function renderSetRepsFields() {
  const setCount = Math.max(Number(setsInput.value), 1);
  const currentValues = [...setRepsFields.querySelectorAll("input")].map((input) => input.value);

  setRepsFields.innerHTML = Array.from({ length: setCount }, (_, index) => {
    const value = currentValues[index] || repsInput.value || "10";

    return `
      <label>
        <span>Serie ${index + 1}</span>
        <input class="set-reps-input" type="number" min="1" step="1" required value="${escapeHtml(value)}" />
      </label>
    `;
  }).join("");
}

startButton.addEventListener("click", startWorkout);
completeSetButton.addEventListener("click", completeSet);
exerciseForm.addEventListener("submit", addExercise);
setsInput.addEventListener("input", () => {
  if (variableRepsToggle.checked) {
    renderSetRepsFields();
  }
});
variableRepsToggle.addEventListener("change", renderExerciseFormMode);
clearDayButton.addEventListener("click", () => {
  state.routines[state.selectedDay] = [];
  saveRoutines();
  renderPlan();
});
clearHistoryButton.addEventListener("click", () => {
  state.sessions = state.sessions.filter((session) => session.day !== state.selectedDay);
  saveSessions();
  renderSavedSessions();
});
daySelector.addEventListener("click", (event) => {
  const day = event.target.dataset.day;

  if (!day) {
    return;
  }

  state.selectedDay = day;
  renderDaySelector();
  renderPlan();
});
planList.addEventListener("click", (event) => {
  const removeIndex = event.target.dataset.removeIndex;

  if (removeIndex === undefined) {
    return;
  }

  state.routines[state.selectedDay].splice(Number(removeIndex), 1);
  saveRoutines();
  renderPlan();
});
backButton.addEventListener("click", () => {
  renderPlan();
  showView("home");
});
restartButton.addEventListener("click", () => {
  renderPlan();
  showView("home");
});
weightInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    completeSet();
  }
});

renderDaySelector();
renderExerciseFormMode();
renderPlan();
