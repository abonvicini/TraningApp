# Selector tactil de peso en entrenamiento

Fecha: 2026-06-30

Version asignada: `v0.9.0-beta`

## Objetivo

Mejorar la experiencia de carga de peso en modo entrenamiento evitando que el teclado del telefono se abra al registrar cada serie.

## Cambio implementado

Se reemplazo el input numerico visible de peso por un selector tactil compuesto por:

- `-2.5`
- `-0.5`
- `Sin peso`
- `+0.5`
- `+2.5`

La pantalla muestra el peso seleccionado en un display central. Si no hay peso cargado, muestra `Sin peso`.

El HTML referencia `styles.css` y `app.js` con la version beta para evitar cache de assets entre mejoras.

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

## Validaciones y compatibilidad

- Los botones generan valores no negativos.
- Los incrementos producen pesos con hasta 1 decimal.
- La accion `Sin peso` mantiene el valor vacio para conservar el comportamiento existente.
- La validacion de peso existente sigue funcionando como respaldo antes de guardar.
- No se modifica la estructura de los registros guardados en `localStorage`.
- Los historiales antiguos siguen visualizandose con el formateo existente.
- La referencia versionada de assets reduce el riesgo de que un navegador conserve JavaScript anterior despues de actualizar la app estatica.

## Decision tecnica

Se eligieron botones tactiles en lugar de redondear entradas manuales porque el objetivo principal era eliminar la friccion del teclado en telefono. Al no permitir escritura libre en el flujo principal, la app evita valores invalidos como `7.55` antes de llegar al guardado.

## Prueba manual sugerida

1. Iniciar un entrenamiento.
2. Usar `+2.5` tres veces y verificar que el display muestre `7,5 kg`.
3. Confirmar la serie y verificar que el peso aparezca como `7,5 kg` en `Completado`.
4. Usar `+2.5` nueve veces y verificar que el display permita llegar a `22,5 kg`.
5. Usar `Sin peso` y confirmar una serie para verificar que se registre como `Sin peso`.
6. Volver a la serie anterior y confirmar que se precarga el peso registrado.

## Mejora futura detectada

Permitir configurar incrementos personalizados para el selector de peso.
