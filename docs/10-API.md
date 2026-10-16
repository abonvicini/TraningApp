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

### Respaldo JSON

El archivo exportado usa esta estructura estable:

```json
{
  "format": "training-app-backup",
  "version": 1,
  "exportedAt": "2026-10-16T12:00:00.000Z",
  "config": { "trainingDayCount": 4 },
  "routines": {},
  "history": []
}
```

La version `1` reemplaza `training-app-config`, `training-app-routines` y `training-app-history` despues de validar el archivo y confirmar la accion. No incluye `training-app-active-workout`.

### Compartir rutina

La funcion de compartir genera texto a partir de la rutina del dia seleccionado. No persiste datos y usa este orden de fallback:

1. `navigator.share({ title, text })`.
2. `navigator.clipboard.writeText(text)`.
3. Descarga de un archivo `.txt`.

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
