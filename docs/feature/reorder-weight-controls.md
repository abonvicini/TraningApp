# Reordenar controles tactiles de peso

Version asignada: `v0.14.0-beta`

## Objetivo

Mejorar la lectura y el uso de los botones tactiles de peso en modo entrenamiento, agrupando cada decremento junto a su incremento equivalente.

## Cambios realizados

- Se reordeno el selector tactil para mostrar primero la opcion `Sin peso`.
- Se agregaron los controles `-0.25` y `+0.25` entre `Sin peso` y los pasos de `0.5`.
- Se reordeno el selector tactil para mostrar `-0.5` a la izquierda de `+0.5`.
- Se reordeno el selector tactil para mostrar `-2.5` a la izquierda de `+2.5`.
- En mobile, `Sin peso` queda en una fila propia arriba de los pares de ajuste.
- La precision interna del peso se amplio a incrementos de `0.25 kg` para preservar valores como `0.25` sin redondearlos a decimas.

## Archivos modificados

- `index.html`: actualiza el orden de los botones y las versiones cacheadas de assets.
- `styles.css`: ajusta la grilla mobile para que `Sin peso` no interrumpa los pares de ajuste.
- `app.js`: ajusta el formateo, la validacion y el redondeo interno del peso para soportar pasos de `0.25 kg`.
- `README.md`: actualiza la version actual.
- `docs/01-Product-Vision.md`: actualiza la version actual del producto.
- `docs/02-Functional-Requirements.md`: documenta el criterio funcional de agrupacion.
- `docs/05-UI-UX.md`: documenta el criterio visual de pares equivalentes.
- `docs/06-Roadmap.md`: actualiza la version actual y agrega la mejora implementada.
- `docs/07-Backlog.md`: registra la mejora como completada.
- `CHANGELOG.md`: registra `v0.14.0-beta`.

## Validaciones

- La logica de calculo del peso redondea internamente a 2 decimales para evitar errores de punto flotante.
- No se modifica el modelo de datos.
- No se modifica `localStorage`.
- Los botones conservan el mecanismo `data-weight-step`.
- La validacion acepta pesos no negativos en incrementos de `0.25 kg`.

## Como probar manualmente

1. Abrir la app en modo entrenamiento.
2. Verificar que los controles de peso se muestren como `Sin peso`, `-0.25`, `+0.25`, `-0.5`, `+0.5`, `-2.5` y `+2.5`.
3. Tocar `+0.25` y confirmar que el display muestra `0,25 kg`.
4. Tocar `-0.25` y confirmar que el peso vuelve a `Sin peso` o `0 kg` segun el estado previo.
5. Tocar `-0.5` y `+0.5` para confirmar que ajustan el peso en ese valor.
6. Tocar `-2.5` y `+2.5` para confirmar que ajustan el peso en ese valor.
7. Tocar `Sin peso` y verificar que el peso vuelve a mostrarse como `Sin peso`.
