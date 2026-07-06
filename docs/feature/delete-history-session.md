# Borrado individual de entrenamientos del historial

Version asignada: `v0.18.0-beta`

## Objetivo

Permitir borrar un entrenamiento puntual del historial sin eliminar todos los entrenamientos del dia seleccionado.

## Archivos modificados

- `app.js`: agrega la accion de borrado individual y la persistencia del historial actualizado.
- `styles.css`: agrega layout para acciones dentro del detalle del entrenamiento.
- `index.html`: actualiza referencias versionadas de assets a `v0.18.0-beta`.
- `README.md`: actualiza la version actual.
- `docs/01-Product-Vision.md`: actualiza la version del producto.
- `docs/02-Functional-Requirements.md`: documenta el borrado individual del historial.
- `docs/05-UI-UX.md`: documenta la accion desde el detalle del entrenamiento.
- `docs/06-Roadmap.md`: registra la mejora en la version actual.
- `docs/07-Backlog.md`: mueve la mejora a completadas.
- `docs/08-Development-Decisions.md`: documenta la decision de no cambiar el modelo de historial.
- `CHANGELOG.md`: registra `v0.18.0-beta`.

## Cambios realizados

- Cada entrenamiento desplegado del historial muestra acciones `Editar` y `Borrar`.
- `Borrar` pide confirmacion antes de eliminar la sesion.
- Al confirmar, se elimina solo el entrenamiento seleccionado del array `state.sessions`.
- El historial actualizado se persiste en `training-app-history`.
- La opcion existente `Borrar historial` sigue eliminando todos los entrenamientos del dia seleccionado.

## Validaciones agregadas o cambiadas

- Si el indice de sesion no existe, no se realiza ningun cambio.
- Si el usuario cancela la confirmacion, no se borra nada.
- Luego de borrar una sesion, se limpian `editingSessionIndex` y `expandedSessionIndexes` para evitar estados visuales asociados a indices antiguos.

## Impacto en modelo de datos

No hay cambios en el modelo de datos ni migraciones.

La estructura de `training-app-history` se mantiene igual; solo se elimina un elemento del array cuando el usuario confirma.

## Pruebas manuales sugeridas

1. Ir a `Historial`.
2. Seleccionar un dia con entrenamientos guardados.
3. Desplegar un entrenamiento.
4. Tocar `Borrar`.
5. Cancelar la confirmacion y verificar que el entrenamiento sigue visible.
6. Tocar `Borrar` nuevamente y confirmar.
7. Verificar que solo desaparece ese entrenamiento.
8. Verificar que otros entrenamientos del mismo dia siguen visibles.
9. Verificar que `Borrar historial` sigue borrando todos los entrenamientos del dia.

## Mejoras futuras relacionadas

- Agregar deshacer luego de borrar un entrenamiento.
- Agregar filtros, busqueda y ordenamiento al historial.
