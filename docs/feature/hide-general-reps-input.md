# Ocultar input general de reps por serie

Version asignada: `v0.20.0-beta`

## Objetivo

Evitar que el formulario de carga de rutina muestre dos formas de cargar repeticiones al mismo tiempo cuando el usuario selecciona `Diferentes reps por serie`.

## Archivos modificados

- `index.html`: agrega un identificador al grid de campos del formulario y actualiza referencias versionadas de assets.
- `app.js`: oculta y deshabilita el input general de reps cuando se usan reps por serie.
- `styles.css`: permite que el grid del formulario pase a una sola columna cuando el input general queda oculto.
- `README.md`: actualiza la version actual.
- `docs/01-Product-Vision.md`: actualiza la version del producto.
- `docs/02-Functional-Requirements.md`: documenta el comportamiento esperado del formulario.
- `docs/05-UI-UX.md`: documenta el criterio visual del formulario.
- `docs/06-Roadmap.md`: registra la mejora como parte de la version actual.
- `docs/07-Backlog.md`: mueve la mejora a completadas.
- `CHANGELOG.md`: registra `v0.20.0-beta`.

## Cambios realizados

- Al activar `Diferentes reps por serie`, el campo general `Reps` se oculta.
- El input general de reps queda deshabilitado mientras esta oculto para evitar que participe del formulario.
- El campo `Series` pasa a ocupar todo el ancho del grid en ese modo.
- Los inputs de reps por serie siguen tomando como valor inicial el valor general previo cuando se generan.
- Al desactivar `Diferentes reps por serie`, el formulario vuelve al modo de reps generales.

## Validaciones agregadas o cambiadas

- El input general de reps deja de ser requerido cuando se usan reps por serie.
- El input general de reps queda deshabilitado cuando esta oculto.
- Se mantiene la validacion existente de reps por serie: valores numericos, finitos y mayores o iguales a 1.

## Impacto en modelo de datos

No hay cambios en el modelo de datos ni migraciones.

Las rutinas siguen guardandose con:

- `reps` para ejercicios con repeticiones generales.
- `repsBySet` para ejercicios con repeticiones diferentes por serie.

## Pruebas manuales sugeridas

1. Ir a `Rutinas`.
2. En `Cargar ejercicio`, verificar que por defecto se muestran `Series` y `Reps`.
3. Activar `Diferentes reps por serie`.
4. Verificar que el input general `Reps` desaparece.
5. Verificar que `Series` ocupa el ancho disponible.
6. Verificar que aparecen los inputs `Serie 1`, `Serie 2`, etc.
7. Cargar un ejercicio con reps por serie.
8. Verificar que la rutina muestra las reps por serie correctamente.
9. Desactivar `Diferentes reps por serie` y verificar que vuelve a aparecer el input general `Reps`.

## Mejoras futuras relacionadas

- No se identificaron mejoras futuras adicionales durante esta implementacion.
