# Header y footer fijos en modo entrenamiento

Version asignada: `v0.24.0-beta`

Fecha: 2026-07-19

## Objetivo

Mantener siempre visibles el contexto del entrenamiento y las acciones principales de serie mediante un header y footer fijos en modo entrenamiento.

## Archivos modificados

- `index.html`
- `styles.css`
- `README.md`
- `CHANGELOG.md`
- `docs/01-Product-Vision.md`
- `docs/02-Functional-Requirements.md`
- `docs/05-UI-UX.md`
- `docs/06-Roadmap.md`
- `docs/07-Backlog.md`
- `docs/08-Development-Decisions.md`

## Cambios realizados

- El header de entrenamiento queda fijo en la parte superior.
- El header mantiene el boton de volver, el dia/ejercicio actual y el nombre del ejercicio.
- Las acciones de serie se movieron a un footer fijo inferior.
- `Volver a la serie anterior` se representa con una flecha izquierda.
- `Aceptar peso y continuar` se representa con una flecha derecha.
- Los botones conservan sus `id` originales para no modificar la logica de eventos existente.
- Se agrego padding superior e inferior al modo entrenamiento para evitar que el contenido quede tapado por header o footer.

## Validaciones agregadas o mantenidas

- No se agregan validaciones de datos.
- Se mantienen los `aria-label` de las acciones para que los botones con iconos sigan teniendo nombre accesible.
- Se conserva la habilitacion/deshabilitacion existente de `previousSetButton`.

## Impacto en modelo de datos

No hay cambios en estructura de datos ni persistencia.

- `training-app-routines` no se modifica.
- `training-app-history` no se modifica.
- El cambio es de layout y presentacion.

## Pruebas realizadas

- `node --check app.js`
- `git diff --check`
- Prueba en la app local desde Codex Browser en `http://127.0.0.1:4180/`.
- Verificacion DOM/CSS en modo entrenamiento:
  - assets cargados como `v0.24.0-beta`;
  - header con `position: fixed`;
  - footer con `position: fixed`;
  - contenido con padding superior e inferior para evitar solapamientos;
  - flecha izquierda inicialmente deshabilitada;
  - flecha derecha disponible.
- Prueba funcional desde Codex Browser:
  - flecha derecha avanza a la siguiente serie/ejercicio;
  - flecha izquierda vuelve a la serie anterior;
  - la flecha izquierda vuelve a deshabilitarse cuando no hay series completadas.

## Prueba manual sugerida

1. Abrir la app e iniciar un entrenamiento.
2. Verificar que el header queda visible arriba con boton de volver, dia/ejercicio y nombre del ejercicio.
3. Verificar que el footer queda visible abajo con flecha izquierda y flecha derecha.
4. Tocar la flecha derecha y confirmar que avanza/completa la serie.
5. Tocar la flecha izquierda luego de completar una serie y confirmar que vuelve a la serie anterior.
6. Desplazarse en la pantalla y confirmar que header y footer no tapan informacion importante.

## Mejoras futuras relacionadas

- Evaluar zonas seguras adicionales para dispositivos con barras de navegacion o notch usando `env(safe-area-inset-*)`.
