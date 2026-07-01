# Prevencion de zoom accidental en botones de peso

Fecha: 2026-06-30

Version asignada: `v0.10.0-beta`

## Objetivo

Evitar que el navegador haga zoom accidental cuando el usuario toca repetidamente los botones `+/-` del selector de peso durante el entrenamiento.

## Cambio implementado

Se agrego una prevencion acotada al selector tactil de peso:

- `touch-action: manipulation` en el contenedor de controles y en los botones.
- `user-select: none` en los botones de peso.
- Prevencion del comportamiento por defecto de `dblclick` dentro del selector.

## Archivos modificados

- `index.html`
- `styles.css`
- `app.js`
- `README.md`
- `CHANGELOG.md`
- `docs/01-Product-Vision.md`
- `docs/02-Functional-Requirements.md`
- `docs/05-UI-UX.md`
- `docs/06-Roadmap.md`
- `docs/07-Backlog.md`
- `docs/08-Development-Decisions.md`

## Decision de accesibilidad

No se modifico el viewport con `user-scalable=no` porque bloquearia el zoom general del navegador y afectaria accesibilidad.

La solucion queda limitada a los botones de peso, que son el punto donde los taps repetidos forman parte del uso normal.

## Validaciones

- El selector mantiene el flujo de registro de peso existente.
- El cambio no modifica el modelo de datos ni el contenido guardado en `localStorage`.
- La mejora fue movida de pendientes a completadas en el backlog.

## Prueba manual sugerida

1. Abrir la app en un navegador movil.
2. Iniciar un entrenamiento.
3. Tocar repetidamente `+0.5`, `+2.5`, `-0.5` y `-2.5`.
4. Verificar que el peso cambia correctamente.
5. Verificar que la pagina no hace zoom accidental por doble tap.
6. Verificar que el zoom general del navegador sigue disponible fuera del selector.
