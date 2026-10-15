# Persistencia del entrenamiento activo

Version asignada: `v0.30.0-beta`

## Objetivo

Evitar que el usuario pierda el entrenamiento en curso cuando cambia de aplicacion, bloquea el telefono o el navegador suspende o recarga la pestaña.

## Archivos modificados

- `app.js`
- `index.html`
- `README.md`
- `docs/01-Product-Vision.md`
- `docs/02-Functional-Requirements.md`
- `docs/03-Technical-Architecture.md`
- `docs/04-Database-Design.md`
- `docs/06-Roadmap.md`
- `docs/07-Backlog.md`
- `docs/08-Development-Decisions.md`
- `CHANGELOG.md`

## Cambios realizados

- Se agregó la clave local `training-app-active-workout` para el borrador de la sesión activa.
- Se guarda el plan de entrenamiento, ejercicio y serie actuales, log de series completadas y valores temporales de peso, reps y nota.
- El borrador se actualiza después de cambios relevantes y al pasar la pestaña a estado oculto.
- Al cargar la app, si existe un borrador válido, se restaura directamente el modo entrenamiento.
- El botón de salida, el reinicio y la finalización del entrenamiento eliminan el borrador.

## Compatibilidad y validaciones

- El historial final (`training-app-history`) no cambia.
- Los historiales y rutinas existentes siguen funcionando.
- Los borradores inválidos se descartan de forma defensiva.
- La restauración conserva los valores de la serie actual que todavía no fueron completados.

## Pruebas realizadas

- `node --check app.js`
- `git diff --check`

## Prueba manual sugerida

1. Iniciar un entrenamiento.
2. Avanzar una o más series.
3. Cambiar el peso, reps o nota de la serie actual.
4. Cambiar de aplicación o recargar la pestaña.
5. Confirmar que la app vuelve al modo entrenamiento en el mismo ejercicio y serie.
6. Confirmar que las series completadas y los valores pendientes se conservan.
7. Usar el botón de salida y confirmar que, al abrir nuevamente la app, vuelve a `Home` sin recuperar el entrenamiento.
8. Finalizar un entrenamiento y confirmar que el borrador desaparece y el historial guarda la sesión.

## Mejoras futuras relacionadas

- Mostrar un aviso opcional indicando que existe un entrenamiento pendiente para recuperar.
- Permitir descartar el entrenamiento recuperado desde una acción explícita dentro del modo entrenamiento.
