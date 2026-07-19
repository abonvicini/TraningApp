# CTA principal de Home cerca del footer

Version asignada: `v0.25.0-beta`

Fecha: 2026-07-19

## Objetivo

Mejorar la ergonomia de Home en mobile ubicando el boton principal cerca del footer, para que quede mas accesible al pulgar derecho sin cambiar su tamano ni comportamiento.

## Archivos modificados

- `index.html`
- `styles.css`
- `README.md`
- `CHANGELOG.md`
- `docs/01-Product-Vision.md`
- `docs/05-UI-UX.md`
- `docs/06-Roadmap.md`
- `docs/07-Backlog.md`

## Cambios realizados

- Se agrego la clase `home-start-action` al boton `startButton`.
- `home-content` ahora usa una altura minima ligada al viewport para permitir que el CTA baje hacia el footer.
- `home-start-action` usa `margin-top: auto` para empujar el boton hacia la parte inferior de la tarjeta.
- Se mantuvo el mismo boton, texto, `id` y comportamiento existente.

## Validaciones agregadas o mantenidas

- No se agregan validaciones de datos.
- Se mantiene la logica actual que cambia el texto del CTA a `Cargar rutina` cuando el dia no tiene ejercicios.
- Se mantiene el mismo tamano visual del boton al reutilizar `primary-action`.

## Impacto en modelo de datos

No hay cambios en estructura de datos ni persistencia.

## Pruebas realizadas

- `node --check app.js`
- `git diff --check`
- Prueba en la app local desde Codex Browser en `http://127.0.0.1:4180/`.
- Verificacion DOM/CSS en Home:
  - assets cargados como `v0.25.0-beta`;
  - CTA mantiene `54px` de alto;
  - CTA queda ubicado cerca del footer, con una distancia aproximada de `71px` en el viewport probado;
  - `margin-top: auto` queda aplicado al boton dentro de `home-content`.

## Prueba manual sugerida

1. Abrir la app en Home desde mobile o viewport estrecho.
2. Confirmar que el CTA principal aparece mas abajo, cerca del footer.
3. Confirmar que el boton mantiene el mismo tamano visual.
4. Tocar `Comenzar entrenamiento` en un dia con rutina y verificar que inicia el entrenamiento.
5. Seleccionar un dia sin rutina y confirmar que el CTA sigue mostrando `Cargar rutina` y navega a `Rutinas`.

## Mejoras futuras relacionadas

- Evaluar una zona de accion inferior comun para CTAs principales en todas las pantallas de primer nivel.
