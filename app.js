const STORAGE_KEY = "training-app-routines";
const HISTORY_STORAGE_KEY = "training-app-history";
const CONFIG_STORAGE_KEY = "training-app-config";
const DEFAULT_TRAINING_DAY_COUNT = 4;
const MAX_TRAINING_DAYS = 7;
const legacyDayOrder = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

const defaultRoutines = {
  day1: [
    { name: "Sentadilla", sets: 4, reps: 8 },
    { name: "Press de banca", sets: 4, reps: 10 },
    { name: "Remo con barra", sets: 3, reps: 10 },
    { name: "Peso muerto rumano", sets: 3, reps: 12 },
  ],
  day2: [],
  day3: [],
  day4: [],
};

const savedConfig = loadConfig();

const state = {
  hasConfiguredTrainingDays: Boolean(savedConfig),
  trainingDayCount: savedConfig?.trainingDayCount ?? DEFAULT_TRAINING_DAY_COUNT,
  selectedDay: "day1",
  routines: loadRoutines(savedConfig?.trainingDayCount ?? DEFAULT_TRAINING_DAY_COUNT),
  sessions: loadSessions(savedConfig?.trainingDayCount ?? DEFAULT_TRAINING_DAY_COUNT),
  workoutPlan: [],
  exerciseIndex: 0,
  setIndex: 0,
  log: [],
  currentSessionSaved: false,
  editingSessionIndex: null,
  isEditingRoutine: false,
};

const setupView = document.querySelector("#setupView");
const setupForm = document.querySelector("#setupForm");
const setupDaysInput = document.querySelector("#setupDaysInput");
const homeView = document.querySelector("#homeView");
const workoutView = document.querySelector("#workoutView");
const summaryView = document.querySelector("#summaryView");
const selectedDayLabel = document.querySelector("#selectedDayLabel");
const daySelector = document.querySelector("#daySelector");
const routineTitle = document.querySelector("#routineTitle");
const planList = document.querySelector("#planList");
const startButton = document.querySelector("#startButton");
const trainingDaysForm = document.querySelector("#trainingDaysForm");
const trainingDaysInput = document.querySelector("#trainingDaysInput");
const backButton = document.querySelector("#backButton");
const restartButton = document.querySelector("#restartButton");
const completeSetButton = document.querySelector("#completeSetButton");
const previousSetButton = document.querySelector("#previousSetButton");
const editRoutineButton = document.querySelector("#editRoutineButton");
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
const previousWeightDisplay = document.querySelector("#previousWeightDisplay");
const weightInput = document.querySelector("#weightInput");
const weightDisplay = document.querySelector("#weightDisplay");
const weightControls = document.querySelector(".weight-controls");
const clearWeightButton = document.querySelector("#clearWeightButton");
const setHistory = document.querySelector("#setHistory");
const progressFill = document.querySelector("#progressFill");
const summaryText = document.querySelector("#summaryText");
const summaryLog = document.querySelector("#summaryLog");
const savedSessionsList = document.querySelector("#savedSessionsList");

function loadConfig() {
  const saved = localStorage.getItem(CONFIG_STORAGE_KEY);

  if (!saved) {
    return null;
  }

  try {
    const config = JSON.parse(saved);
    const trainingDayCount = clampTrainingDayCount(config.trainingDayCount);
    return { trainingDayCount };
  } catch {
    return null;
  }
}

function saveConfig() {
  localStorage.setItem(
    CONFIG_STORAGE_KEY,
    JSON.stringify({ trainingDayCount: state.trainingDayCount }),
  );
}

function clampTrainingDayCount(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return DEFAULT_TRAINING_DAY_COUNT;
  }

  return Math.min(Math.max(Math.round(number), 1), MAX_TRAINING_DAYS);
}

function loadRoutines(trainingDayCount) {
  const saved = localStorage.getItem(STORAGE_KEY);
  const emptyRoutines = createEmptyRoutines(trainingDayCount);

  if (!saved) {
    return ensureRoutinesForTrainingDays(cloneRoutines(defaultRoutines), trainingDayCount);
  }

  try {
    const parsed = JSON.parse(saved);
    const migrated = hasLegacyRoutineKeys(parsed) ? migrateLegacyRoutines(parsed) : parsed;
    return ensureRoutinesForTrainingDays({ ...emptyRoutines, ...migrated }, trainingDayCount);
  } catch {
    return ensureRoutinesForTrainingDays(cloneRoutines(defaultRoutines), trainingDayCount);
  }
}

function cloneRoutines(routines) {
  return JSON.parse(JSON.stringify(routines));
}

function createEmptyRoutines(trainingDayCount) {
  return Array.from({ length: trainingDayCount }, (_, index) => [`day${index + 1}`, []]).reduce(
    (routines, [key, value]) => ({ ...routines, [key]: value }),
    {},
  );
}

function ensureRoutinesForTrainingDays(routines, trainingDayCount) {
  const nextRoutines = { ...routines };

  for (let index = 1; index <= trainingDayCount; index += 1) {
    nextRoutines[`day${index}`] = Array.isArray(routines[`day${index}`]) ? routines[`day${index}`] : [];
  }

  return nextRoutines;
}

function hasLegacyRoutineKeys(routines) {
  return legacyDayOrder.some((day) => Object.prototype.hasOwnProperty.call(routines, day));
}

function migrateLegacyRoutines(routines) {
  const migrated = {};

  legacyDayOrder.forEach((legacyDay, index) => {
    if (Array.isArray(routines[legacyDay])) {
      migrated[`day${index + 1}`] = routines[legacyDay];
    }
  });

  return { ...routines, ...migrated };
}

function saveRoutines() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.routines));
}

function loadSessions(trainingDayCount) {
  const saved = localStorage.getItem(HISTORY_STORAGE_KEY);

  if (!saved) {
    return [];
  }

  try {
    const sessions = JSON.parse(saved);
    return Array.isArray(sessions) ? migrateLegacySessions(sessions, trainingDayCount) : [];
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

function getDayLabel(dayKey) {
  return `Dia ${getDayNumber(dayKey)}`;
}

function getDayNumber(dayKey) {
  return Number(String(dayKey).replace("day", "")) || 1;
}

function getTrainingDayKeys() {
  return Array.from({ length: state.trainingDayCount }, (_, index) => `day${index + 1}`);
}

function renderDaySelector() {
  daySelector.innerHTML = getTrainingDayKeys()
    .map(
      (dayKey) => `
        <button class="day-button${state.selectedDay === dayKey ? " is-active" : ""}" type="button" data-day="${dayKey}">
          ${getDayLabel(dayKey)}
        </button>
      `,
    )
    .join("");
}

function renderPlan() {
  const routine = getSelectedRoutine();
  selectedDayLabel.textContent = `Entrenamiento - ${getDayLabel(state.selectedDay)}`;
  routineTitle.textContent = getDayLabel(state.selectedDay);
  trainingDaysInput.value = state.trainingDayCount;
  setupDaysInput.value = state.trainingDayCount;
  state.isEditingRoutine = routine.length > 0 && state.isEditingRoutine;
  editRoutineButton.disabled = routine.length === 0;
  editRoutineButton.textContent = state.isEditingRoutine ? "Listo" : "Editar";
  editRoutineButton.setAttribute("aria-pressed", String(state.isEditingRoutine));
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
          <div class="plan-actions" role="group" aria-label="Acciones para ${escapeHtml(exercise.name)}">
            <button class="reorder-action" type="button" data-move-index="${index}" data-move-direction="up" ${!state.isEditingRoutine || index === 0 ? "disabled" : ""} aria-label="Subir ${escapeHtml(exercise.name)}">
              Subir
            </button>
            <button class="reorder-action" type="button" data-move-index="${index}" data-move-direction="down" ${!state.isEditingRoutine || index === routine.length - 1 ? "disabled" : ""} aria-label="Bajar ${escapeHtml(exercise.name)}">
              Bajar
            </button>
            <button class="remove-action" type="button" data-remove-index="${index}" ${!state.isEditingRoutine ? "disabled" : ""} aria-label="Quitar ${escapeHtml(exercise.name)}">
              Quitar
            </button>
          </div>
        </li>
      `,
    )
    .join("");
}

function getExerciseRepsLabel(exercise) {
  if (Array.isArray(exercise.repsBySet) && exercise.repsBySet.length > 0) {
    return exercise.repsBySet
      .map((reps, index) => `S${index + 1}: ${escapeHtml(reps)} reps`)
      .join(" - ");
  }

  return `${escapeHtml(exercise.sets)} series x ${escapeHtml(exercise.reps)} repeticiones`;
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
    .map((session, index) => ({ session, index }))
    .filter(({ session }) => session.day === state.selectedDay)
    .slice(0, 5);

  clearHistoryButton.disabled = sessionsForDay.length === 0;

  if (sessionsForDay.length === 0) {
    savedSessionsList.innerHTML = `<p class="empty-history">Todavia no hay entrenamientos guardados para este dia.</p>`;
    return;
  }

  savedSessionsList.innerHTML = sessionsForDay
    .map(
      ({ session, index }) => `
        <article class="saved-session">
          <div class="saved-session-header">
            <div>
              <strong>${formatSessionDate(session.completedAt)}</strong>
              <span>${session.totalSets} series</span>
            </div>
            <button class="secondary-action" type="button" data-edit-session-index="${index}">Editar</button>
          </div>
          ${state.editingSessionIndex === index ? renderSessionDateTimeForm(session, index) : ""}
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

function renderSessionDateTimeForm(session, index) {
  return `
    <form class="session-edit-form" data-session-edit-index="${index}">
      <label>
        <span>Fecha</span>
        <input type="date" name="sessionDate" required value="${getSessionDateInputValue(session.completedAt)}" />
      </label>
      <label>
        <span>Hora</span>
        <input type="time" name="sessionTime" required value="${getSessionTimeInputValue(session.completedAt)}" />
      </label>
      <div class="session-edit-actions">
        <button class="secondary-action" type="button" data-cancel-session-edit>Cancelar</button>
        <button class="primary-action" type="submit">Guardar</button>
      </div>
    </form>
  `;
}

function getValidSessionDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function getSessionDateInputValue(value) {
  const date = getValidSessionDate(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getSessionTimeInputValue(value) {
  const date = getValidSessionDate(value);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function updateSessionDateTime(index, dateValue, timeValue) {
  const session = state.sessions[index];

  if (!session || !dateValue || !timeValue) {
    return false;
  }

  const nextCompletedAt = new Date(`${dateValue}T${timeValue}`);

  if (Number.isNaN(nextCompletedAt.getTime())) {
    return false;
  }

  state.sessions[index] = {
    ...session,
    completedAt: nextCompletedAt.toISOString(),
  };
  state.editingSessionIndex = null;
  saveSessions();
  renderSavedSessions();
  return true;
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
  setupView.classList.toggle("is-hidden", view !== "setup");
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

function renderTrainingProgressCard({ currentSet, totalSets, previousWeight, currentWeight, targetReps }) {
  setCounter.textContent = `${currentSet} / ${totalSets}`;
  previousWeightDisplay.textContent = formatPreviousWeight(previousWeight);
  repTarget.textContent = targetReps;
  setWeightInputValue(currentWeight);
}

function renderWorkout(weightValue = "") {
  const exercise = state.workoutPlan[state.exerciseIndex];
  const completedForExercise = state.log[state.exerciseIndex].sets;
  const currentSet = state.setIndex + 1;

  exerciseCounter.textContent = `${getDayLabel(state.selectedDay)} - ejercicio ${state.exerciseIndex + 1} de ${state.workoutPlan.length}`;
  exerciseName.textContent = exercise.name;
  progressFill.style.width = `${(getCompletedSets() / getTotalSets()) * 100}%`;
  setHistory.innerHTML = completedForExercise
    .map((set, index) => `<li>${formatLoggedSet(set, index)}</li>`)
    .join("");
  previousSetButton.disabled = getCompletedSets() === 0;
  renderTrainingProgressCard({
    currentSet,
    totalSets: exercise.sets,
    previousWeight: completedForExercise[completedForExercise.length - 1]?.weight,
    currentWeight: weightValue,
    targetReps: getRepsForSet(exercise, state.setIndex),
  });
}

function formatWeight(weight) {
  if (weight === "" || weight === null || weight === undefined) {
    return "Sin peso";
  }

  const numericWeight = Number(weight);

  if (!Number.isFinite(numericWeight)) {
    return escapeHtml(weight);
  }

  return `${numericWeight.toLocaleString("es-AR", { maximumFractionDigits: 1 })} kg`;
}

function formatPreviousWeight(weight) {
  if (weight === "" || weight === null || weight === undefined) {
    return "—";
  }

  return formatWeight(weight);
}

function formatLoggedSet(set, index) {
  if (set && typeof set === "object") {
    return `S${index + 1}: ${escapeHtml(set.reps)} reps - ${formatWeight(set.weight)}`;
  }

  return `S${index + 1}: ${formatWeight(set)}`;
}

function completeSet() {
  const exercise = state.workoutPlan[state.exerciseIndex];
  const weight = parseWeightInput(weightInput.value);

  if (weight === null) {
    weightInput.reportValidity();
    return;
  }

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

  renderWorkout(state.setIndex === 0 ? "" : getWeightInputValue(weight));
}

function getWeightInputValue(weight) {
  if (weight === "" || weight === null || weight === undefined) {
    return "";
  }

  return String(weight).replace(",", ".");
}

function formatWeightInputValue(weight) {
  const numericWeight = Number(String(weight).replace(",", "."));

  if (!Number.isFinite(numericWeight)) {
    return "";
  }

  return numericWeight.toFixed(1).replace(/\.0$/, "");
}

function setWeightInputValue(weight) {
  weightInput.value = weight === "" || weight === null || weight === undefined ? "" : formatWeightInputValue(weight);
  weightInput.setCustomValidity("");
  renderWeightSelector();
}

function renderWeightSelector() {
  const hasWeight = weightInput.value !== "";
  const currentWeight = hasWeight ? Number(weightInput.value) : 0;

  weightDisplay.textContent = hasWeight ? formatWeight(weightInput.value) : "Sin peso";
  clearWeightButton.disabled = !hasWeight;

  weightControls.querySelectorAll("[data-weight-step]").forEach((button) => {
    const step = Number(button.dataset.weightStep);
    button.disabled = step < 0 && currentWeight <= 0;
  });
}

function adjustWeight(step) {
  const currentWeight = weightInput.value === "" ? 0 : Number(weightInput.value);
  const nextWeight = Math.max(0, Math.round((currentWeight + step) * 10) / 10);

  setWeightInputValue(nextWeight);
}

function getLastCompletedSetPosition() {
  for (let exerciseIndex = state.log.length - 1; exerciseIndex >= 0; exerciseIndex -= 1) {
    const completedSets = state.log[exerciseIndex].sets;

    if (completedSets.length > 0) {
      return {
        exerciseIndex,
        setIndex: completedSets.length - 1,
      };
    }
  }

  return null;
}

function goToPreviousSet() {
  const previousSetPosition = getLastCompletedSetPosition();

  if (!previousSetPosition) {
    return;
  }

  const completedSets = state.log[previousSetPosition.exerciseIndex].sets;
  const previousSet = completedSets.pop();
  state.exerciseIndex = previousSetPosition.exerciseIndex;
  state.setIndex = previousSetPosition.setIndex;
  renderWorkout(getWeightInputValue(previousSet?.weight));
}

function parseWeightInput(value) {
  const normalizedValue = value.trim().replace(",", ".");

  weightInput.setCustomValidity("");

  if (normalizedValue === "") {
    return "";
  }

  // Rechazamos mas de 1 decimal en vez de redondear para no guardar un peso distinto al que ingreso el usuario.
  if (!/^\d+(\.\d{1})?$/.test(normalizedValue)) {
    weightInput.setCustomValidity("Ingresa un peso positivo con hasta 1 decimal.");
    return null;
  }

  const weight = Number(normalizedValue);

  if (!Number.isFinite(weight) || weight < 0) {
    weightInput.setCustomValidity("Ingresa un peso positivo con hasta 1 decimal.");
    return null;
  }

  return weight;
}

function renderSummary() {
  saveCompletedSession();
  progressFill.style.width = "100%";
  summaryText.textContent = `Completaste ${getTotalSets()} series en ${state.workoutPlan.length} ejercicios de ${getDayLabel(state.selectedDay)}.`;
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
    dayName: getDayLabel(state.selectedDay),
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

function moveExercise(index, direction) {
  if (!state.isEditingRoutine) {
    return;
  }

  const routine = state.routines[state.selectedDay];
  const nextIndex = direction === "up" ? index - 1 : index + 1;

  if (!routine || nextIndex < 0 || nextIndex >= routine.length) {
    return;
  }

  const [exercise] = routine.splice(index, 1);
  routine.splice(nextIndex, 0, exercise);
  saveRoutines();
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

function migrateLegacySessions(sessions, trainingDayCount) {
  return sessions
    .map((session) => {
      const legacyIndex = legacyDayOrder.indexOf(session.day);

      if (legacyIndex === -1) {
        return session;
      }

      const dayNumber = legacyIndex + 1;

      return {
        ...session,
        day: `day${dayNumber}`,
        dayName: `Dia ${dayNumber}`,
      };
    });
}

function applyTrainingDayCount(value) {
  const trainingDayCount = clampTrainingDayCount(value);
  state.trainingDayCount = trainingDayCount;
  state.hasConfiguredTrainingDays = true;
  state.routines = ensureRoutinesForTrainingDays(state.routines, trainingDayCount);
  state.isEditingRoutine = false;

  if (getDayNumber(state.selectedDay) > trainingDayCount) {
    state.selectedDay = "day1";
  }

  saveConfig();
  saveRoutines();
  saveSessions();
  renderDaySelector();
  renderPlan();
  showView("home");
}

startButton.addEventListener("click", startWorkout);
completeSetButton.addEventListener("click", completeSet);
previousSetButton.addEventListener("click", goToPreviousSet);
editRoutineButton.addEventListener("click", () => {
  if (getSelectedRoutine().length === 0) {
    return;
  }

  state.isEditingRoutine = !state.isEditingRoutine;
  renderPlan();
});
exerciseForm.addEventListener("submit", addExercise);
setupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  applyTrainingDayCount(setupDaysInput.value);
});
trainingDaysForm.addEventListener("submit", (event) => {
  event.preventDefault();
  applyTrainingDayCount(trainingDaysInput.value);
});
setsInput.addEventListener("input", () => {
  if (variableRepsToggle.checked) {
    renderSetRepsFields();
  }
});
variableRepsToggle.addEventListener("change", renderExerciseFormMode);
clearDayButton.addEventListener("click", () => {
  const confirmed = window.confirm(`Seguro que queres vaciar ${getDayLabel(state.selectedDay)}?`);

  if (!confirmed) {
    return;
  }

  state.routines[state.selectedDay] = [];
  state.isEditingRoutine = false;
  saveRoutines();
  renderPlan();
});
clearHistoryButton.addEventListener("click", () => {
  const confirmed = window.confirm(`Seguro que queres borrar el historial de ${getDayLabel(state.selectedDay)}?`);

  if (!confirmed) {
    return;
  }

  state.sessions = state.sessions.filter((session) => session.day !== state.selectedDay);
  state.editingSessionIndex = null;
  saveSessions();
  renderSavedSessions();
});
daySelector.addEventListener("click", (event) => {
  const day = event.target.dataset.day;

  if (!day) {
    return;
  }

  state.selectedDay = day;
  state.editingSessionIndex = null;
  state.isEditingRoutine = false;
  renderDaySelector();
  renderPlan();
});
savedSessionsList.addEventListener("click", (event) => {
  const editSessionIndex = event.target.dataset.editSessionIndex;

  if (editSessionIndex !== undefined) {
    state.editingSessionIndex = Number(editSessionIndex);
    renderSavedSessions();
    return;
  }

  if (event.target.dataset.cancelSessionEdit !== undefined) {
    state.editingSessionIndex = null;
    renderSavedSessions();
  }
});
savedSessionsList.addEventListener("submit", (event) => {
  const form = event.target;

  if (!form.matches("[data-session-edit-index]")) {
    return;
  }

  event.preventDefault();

  const saved = updateSessionDateTime(
    Number(form.dataset.sessionEditIndex),
    form.elements.sessionDate.value,
    form.elements.sessionTime.value,
  );

  if (!saved) {
    form.reportValidity();
  }
});
planList.addEventListener("click", (event) => {
  const moveIndex = event.target.dataset.moveIndex;

  if (moveIndex !== undefined) {
    moveExercise(Number(moveIndex), event.target.dataset.moveDirection);
    return;
  }

  const removeIndex = event.target.dataset.removeIndex;

  if (removeIndex === undefined) {
    return;
  }

  if (!state.isEditingRoutine) {
    return;
  }

  const exercise = state.routines[state.selectedDay][Number(removeIndex)];
  const exerciseName = exercise?.name ? ` "${exercise.name}"` : "";
  const confirmed = window.confirm(`Seguro que queres quitar${exerciseName}?`);

  if (!confirmed) {
    return;
  }

  state.routines[state.selectedDay].splice(Number(removeIndex), 1);
  saveRoutines();
  renderPlan();
});
backButton.addEventListener("click", () => {
  if (getCompletedSets() > 0) {
    const confirmed = window.confirm("Seguro que queres salir? Se va a descartar el progreso de este entrenamiento.");

    if (!confirmed) {
      return;
    }
  }

  renderPlan();
  showView("home");
});
restartButton.addEventListener("click", () => {
  renderPlan();
  showView("home");
});
weightControls.addEventListener("click", (event) => {
  const clickedElement = event.target instanceof Element ? event.target : event.target.parentElement;
  const stepButton = clickedElement?.closest("[data-weight-step]");

  if (stepButton) {
    adjustWeight(Number(stepButton.dataset.weightStep));
    return;
  }

  if (clickedElement === clearWeightButton) {
    setWeightInputValue("");
  }
});
weightControls.addEventListener("dblclick", (event) => {
  event.preventDefault();
});

renderDaySelector();
renderExerciseFormMode();
renderPlan();
showView(state.hasConfiguredTrainingDays ? "home" : "setup");
