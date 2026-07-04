# Modal de reps solo con botones

Version asignada: `v0.15.1-beta`

## Objetivo

Evitar que el teclado del telefono se abra al modificar las repeticiones realizadas durante el entrenamiento.

## Archivos modificados

- `index.html`: reemplaza el input numerico del modal por un valor de solo lectura.
- `styles.css`: actualiza el estilo del valor central del modal y elimina estilos de input/spinners.
- `app.js`: ajusta la logica del modal para cambiar reps solo con botones `-` y `+`.
- `README.md`: actualiza la version actual.
- `docs/01-Product-Vision.md`: actualiza la version actual del producto.
- `docs/05-UI-UX.md`: documenta que el modal de reps no debe abrir el teclado del telefono.
- `docs/06-Roadmap.md`: registra la mejora como parte de la version actual.
- `docs/feature/edit-workout-reps.md`: sincroniza el informe anterior con el flujo final del modal.
- `CHANGELOG.md`: registra `v0.15.1-beta`.

## Cambios realizados

- El modal muestra el valor de reps como texto de solo lectura.
- La tarjeta muestra un lapiz pequeno junto al label `Reps` para indicar de forma sutil que el valor es editable.
- Los botones `-` y `+` son la unica forma de modificar el valor.
- El boton `-` se deshabilita cuando el valor llega a `1`.
- La accion `Guardar` conserva el comportamiento existente: actualiza las reps de la serie actual.
- La rutina base no se modifica.

## Validaciones agregadas o mantenidas

- No se puede bajar de `1` repeticion.
- No se permiten valores negativos.
- No se permiten decimales.
- No se permite escritura manual dentro del modal.

## Impacto en modelo de datos

No hay cambios en el modelo de datos ni migraciones.

- `training-app-routines` se mantiene intacto.
- `training-app-history` sigue guardando las reps realizadas cuando se completa la serie.

## Pruebas manuales realizadas

1. Abrir un entrenamiento.
2. Tocar `Reps` o el numero de reps.
3. Confirmar que el label `Reps` muestra un lapiz pequeno como pista visual.
4. Confirmar que el modal no muestra input editable.
5. Sumar reps con `+`.
6. Restar reps con `-`.
7. Confirmar que `-` queda deshabilitado en `1`.
8. Guardar y completar la serie.
9. Verificar que `Completado` muestra las reps modificadas.
