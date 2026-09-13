# Mostrar todos los entrenamientos del historial por dia

Version asignada: `v0.27.0-beta`

## Objetivo

Permitir que la vista `Historial` muestre todos los entrenamientos disponibles del dia seleccionado y evitar que la app recorte automaticamente el historial guardado.

## Archivos modificados

- `app.js`
- `index.html`
- `README.md`
- `docs/01-Product-Vision.md`
- `docs/02-Functional-Requirements.md`
- `docs/04-Database-Design.md`
- `docs/05-UI-UX.md`
- `docs/06-Roadmap.md`
- `docs/07-Backlog.md`
- `docs/feature/edit-session-datetime.md`
- `CHANGELOG.md`

## Cambios realizados

- Se elimino el recorte visual `.slice(0, 5)` del render del historial.
- Se elimino el recorte global `.slice(0, 100)` al guardar una sesion finalizada.
- La vista de historial ahora filtra por dia seleccionado y renderiza todos los registros disponibles para ese dia.
- Se actualizaron los documentos que mencionaban el limite o el concepto de historial completo como pendiente.
- Se actualizaron las referencias de version a `v0.27.0-beta`.

## Validaciones

- No se agregan validaciones nuevas de datos.
- La lista sigue filtrando por `state.selectedDay`.
- Los entrenamientos siguen mostrandose colapsados por defecto.
- La accion de borrar todo el historial del dia sigue usando la lista completa de sesiones guardadas para ese dia.

## Impacto en modelo de datos

No hay cambios en la forma de cada registro dentro de `training-app-history`.

La mejora deja de recortar artificialmente el array de sesiones desde la app. La capacidad real queda limitada por `localStorage` del navegador.

## Pruebas realizadas

- `node --check app.js`
- `git diff --check`

## Prueba manual sugerida

1. Abrir la app.
2. Generar o tener mas de 5 entrenamientos guardados para el mismo dia.
3. Ir a `Historial`.
4. Seleccionar ese dia.
5. Confirmar que se muestran todos los entrenamientos disponibles del dia.
6. Desplegar varios registros y confirmar que el detalle sigue funcionando.
7. Borrar un entrenamiento individual y confirmar que la lista se actualiza.
8. Finalizar nuevos entrenamientos y confirmar que no se eliminan automaticamente registros anteriores por superar 100 sesiones.
9. Usar `Borrar historial` y confirmar que borra todos los entrenamientos del dia.

## Mejoras futuras relacionadas

- Agregar filtros por fecha.
- Agregar busqueda por ejercicio.
- Agregar ordenamiento del historial.
