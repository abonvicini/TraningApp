# Reordenar ejercicios dentro de un dia

## Resumen

Se implemento la posibilidad de cambiar el orden de los ejercicios cargados dentro de un dia de entrenamiento.

Version asignada: `v0.5.0-beta`.

## Archivos modificados

### `app.js`

Se agrego la logica para:

- Mostrar acciones `Subir` y `Bajar` en cada ejercicio de la rutina seleccionada.
- Deshabilitar `Subir` en el primer ejercicio.
- Deshabilitar `Bajar` en el ultimo ejercicio.
- Mover el ejercicio dentro del array del dia seleccionado.
- Guardar inmediatamente el nuevo orden en `localStorage`.
- Volver a renderizar la rutina con el orden actualizado.

### `styles.css`

Se agregaron estilos para agrupar las acciones de cada ejercicio y mantener los controles legibles en desktop y mobile.

### Documentacion sincronizada

Se actualizaron:

- `README.md`
- `docs/01-Product-Vision.md`
- `docs/02-Functional-Requirements.md`
- `docs/05-UI-UX.md`
- `docs/06-Roadmap.md`
- `docs/07-Backlog.md`
- `docs/08-Development-Decisions.md`
- `CHANGELOG.md`

## Estructura de datos

No se cambio el modelo de datos.

La mejora reutiliza el array existente de ejercicios dentro de `state.routines[state.selectedDay]`. Al reordenar, se mueve el objeto del ejercicio dentro del mismo array y se guarda la rutina completa con la estructura actual.

## Decisiones relevantes

La app reordena con acciones explicitas `Subir` y `Bajar` en lugar de drag and drop.

Motivos:

- Es mas simple de usar en pantallas tactiles.
- No requiere dependencias externas.
- Reduce riesgo de errores accidentales.
- Mantiene la implementacion alineada con la arquitectura actual de HTML, CSS y JavaScript plano.

## Comportamiento esperado

- El usuario puede subir un ejercicio si no es el primero.
- El usuario puede bajar un ejercicio si no es el ultimo.
- El nuevo orden queda visible inmediatamente.
- El nuevo orden queda guardado en `localStorage`.
- Al iniciar un entrenamiento, se usa el orden actualizado.
- Los historiales ya guardados no se modifican.

## Prueba manual recomendada

1. Abrir un dia con al menos tres ejercicios.
2. Presionar `Bajar` en el primer ejercicio.
3. Confirmar que pasa a la segunda posicion.
4. Presionar `Subir` en ese mismo ejercicio.
5. Confirmar que vuelve a la primera posicion.
6. Recargar la pagina.
7. Confirmar que el orden persiste.
8. Iniciar un entrenamiento y confirmar que los ejercicios aparecen en el orden actualizado.

## Mejora adicional detectada

En una futura iteracion podria agregarse reordenamiento por arrastrar y soltar como alternativa avanzada.

El modo de edicion general para habilitar las acciones `Subir`, `Bajar` y `Quitar` se implemento posteriormente en `v0.6.0-beta`.

No se implemento el reordenamiento por arrastrar y soltar en esta version para mantener el cambio simple, accesible y sin dependencias.
