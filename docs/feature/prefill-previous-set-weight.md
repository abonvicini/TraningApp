# Precarga de peso entre series

Fecha: 2026-07-01

Version asignada: `v0.11.0-beta`

## Objetivo

Reducir interacciones durante el entrenamiento precargando el peso usado en la serie anterior cuando el usuario inicia una nueva serie del mismo ejercicio.

## Cambio implementado

Al confirmar una serie, la app evalua si la siguiente serie pertenece al mismo ejercicio:

- Si sigue en el mismo ejercicio, precarga el peso recien registrado.
- Si avanza a otro ejercicio, vuelve a iniciar el selector como `Sin peso`.

## Archivos modificados

- `index.html`
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

- La precarga reutiliza el peso validado al confirmar la serie.
- `Sin peso` sigue representandose como valor vacio.
- El cambio no modifica la estructura de datos ni el historial guardado en `localStorage`.
- Al cambiar de ejercicio, el peso no se hereda para evitar asumir cargas entre ejercicios distintos.

## Decision tecnica

La precarga se limita a series consecutivas del mismo ejercicio. Esto reduce friccion en el caso mas comun sin introducir datos sugeridos entre ejercicios diferentes.

## Prueba manual sugerida

1. Iniciar un entrenamiento con un ejercicio de varias series.
2. En la primera serie, cargar `40 kg` o cualquier peso con el selector.
3. Confirmar la serie.
4. Verificar que la segunda serie inicia con el mismo peso precargado.
5. Cambiar el peso en la segunda serie y confirmar.
6. Verificar que la tercera serie inicia con el nuevo peso.
7. Completar la ultima serie del ejercicio y verificar que el siguiente ejercicio inicia como `Sin peso`.
