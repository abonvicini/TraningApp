# API

## Estado actual

Training App no expone una API HTTP ni consume servicios externos.

La app trabaja completamente en el navegador.

## Interfaces internas relevantes

Aunque no existe API publica, hay contratos internos importantes:

### Persistencia

- `localStorage.getItem(...)`
- `localStorage.setItem(...)`

Claves:

- `training-app-config`
- `training-app-routines`
- `training-app-history`

### Funciones de carga

- `loadConfig()`
- `loadRoutines(trainingDayCount)`
- `loadSessions(trainingDayCount)`

### Funciones de guardado

- `saveConfig()`
- `saveRoutines()`
- `saveSessions()`

### Renderizado

- `renderDaySelector()`
- `renderPlan()`
- `renderWorkout()`
- `renderTrainingProgressCard()`
- `getLastSessionWeightReference(exerciseName, setIndex)`
- `useLastSessionWeightReference()`
- `openWeightModal()`
- `saveWeightModalValue()`
- `adjustWeightModalValue(step)`
- `renderSummary()`
- `renderSavedSessions()`

## Futuras APIs posibles

Si la app incorpora backend o sincronizacion, esta documentacion debe actualizarse con:

- Endpoints.
- Autenticacion.
- Modelos de request/response.
- Manejo de errores.
- Versionado.
