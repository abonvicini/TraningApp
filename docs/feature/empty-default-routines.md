# Primer uso sin rutina precargada

Fecha: 2026-07-02

Version asignada: `v0.13.0-beta`

Pull Request: #18

## Objetivo

Evitar que usuarios nuevos vean una rutina demo en `Dia 1`, porque puede confundirse con contenido real y afectar la experiencia inicial.

## Cambio implementado

La app ya no define ejercicios precargados para el primer uso.

Cuando no existe `training-app-routines` en `localStorage`, se crean todos los dias vacios segun la cantidad de dias configurada.

## Archivos modificados

- `index.html`
- `app.js`
- `README.md`
- `CHANGELOG.md`
- `docs/01-Product-Vision.md`
- `docs/02-Functional-Requirements.md`
- `docs/06-Roadmap.md`
- `docs/07-Backlog.md`
- `docs/08-Development-Decisions.md`

## Compatibilidad

- No se eliminan rutinas existentes en `localStorage`.
- Los usuarios con datos guardados mantienen sus rutinas actuales.
- Si no hay datos guardados, la app inicia con rutinas vacias.
- Si el contenido de rutinas guardadas no puede parsearse, la app vuelve a rutinas vacias.

## Decision tecnica

Se elimino la rutina demo porque la claridad del primer uso es mas importante que mostrar una app con contenido de ejemplo. El usuario debera cargar o importar su rutina antes de entrenar.

## Prueba manual sugerida

1. Abrir la app con `localStorage` limpio.
2. Verificar que se muestra la pantalla de configuracion solicitando la cantidad de dias de entrenamiento.
3. Configurar `5` dias de entrenamiento.
4. Verificar que la app abre el inicio con `Dia 1` seleccionado.
5. Verificar que `Dia 1` no tenga ejercicios precargados.
6. Verificar que `Dia 2`, `Dia 3`, `Dia 4` y `Dia 5` tambien esten vacios.
7. Cargar un ejercicio manualmente.
8. Recargar la app y verificar que el ejercicio cargado se conserva.

## Comparacion con comportamiento anterior

Antes de esta mejora, un usuario con configuracion inicial ya guardada podia abrir la app con varios dias configurados y encontrar `Dia 1` con una rutina de ejemplo.

Con esta mejora, para un primer uso real:

- La app solicita la cantidad de dias.
- Al configurar los dias, todos quedan vacios.
- `Dia 1` ya no incluye rutina demo.
