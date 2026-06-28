# Revision de backlog

## Resumen

Se actualizo el backlog del proyecto para reflejar un estado priorizado de trabajo.

La revision organiza las tareas en:

- Alta prioridad.
- Prioridad media.
- Completadas.

Version asignada: `v0.2.0-beta`.

## Archivos modificados

### `docs/07-Backlog.md`

Se reemplazo la organizacion anterior por secciones de prioridad.

Alta prioridad:

- Volver a la serie anterior durante el entrenamiento para corregir el peso.
- Editar el nombre de un ejercicio.
- Editar el nombre de los ejercicios antes de comenzar el entrenamiento.
- Reordenar ejercicios dentro de un dia de entrenamiento.
- Modificar las repeticiones realizadas durante el entrenamiento sin alterar la rutina base.
- Historial completo con filtros, busqueda y ordenamiento.

Prioridad media:

- Migracion a React.
- Backend.
- Base de datos.
- Sistema de autenticacion.

Completadas:

- Soporte para pesos decimales.

Nota: `Editar fecha y hora del historial` no se incluyo en el backlog pendiente porque ya fue implementado y mergeado a `main`.

### `CHANGELOG.md`

Se registro la revision de backlog dentro de `v0.2.0-beta`.

### `docs/09-Changelog.md`

Se agrego la revision de backlog como cambio documentado.

### Version beta

Se actualizo la version actual de `v0.1.0-beta` a `v0.2.0-beta` y se documento la regla de incrementar la version beta por cada mejora.

## Estructura de datos

No se realizaron cambios en la estructura de datos de la app.

## Decisiones relevantes

Se priorizo mantener el backlog simple y accionable, agrupado por urgencia en lugar de por dominio funcional.

Tambien se definio que cada mejora incrementa la version beta del proyecto para mantener trazabilidad de cambios durante la etapa beta.

## Prueba manual recomendada

1. Abrir `docs/07-Backlog.md`.
2. Confirmar que existen las secciones `Alta prioridad`, `Prioridad media` y `Completadas`.
3. Confirmar que las tareas indicadas aparecen en la seccion correspondiente.

## Mejora adicional detectada

En una futura iteracion podria agregarse estado por item, por ejemplo `pendiente`, `en progreso`, `bloqueada` o `completada`, para evitar ambiguedades cuando una tarea ya fue implementada pero sigue apareciendo como prioridad de seguimiento.
