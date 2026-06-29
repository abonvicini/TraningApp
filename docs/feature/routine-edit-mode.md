# Modo Editar para acciones de rutina

## Resumen

Se implemento un modo `Editar` para habilitar las acciones `Subir`, `Bajar` y `Quitar` dentro de la rutina seleccionada.

Version asignada: `v0.6.0-beta`.

## Archivos modificados

### `index.html`

Se agrego el boton general `Editar` en el encabezado del panel de rutina seleccionada.

### `app.js`

Se agrego la logica para:

- Guardar el estado local `isEditingRoutine`.
- Alternar el modo de edicion con el boton `Editar`.
- Cambiar el texto del boton a `Listo` cuando el modo esta activo.
- Deshabilitar `Subir`, `Bajar` y `Quitar` cuando el modo edicion esta apagado.
- Mantener deshabilitado `Subir` en el primer ejercicio.
- Mantener deshabilitado `Bajar` en el ultimo ejercicio.
- Bloquear acciones de mover o quitar si el modo edicion no esta activo.
- Salir del modo edicion al cambiar de dia o vaciar la rutina.

### `styles.css`

Se agrego un contenedor de acciones para el encabezado del panel y se ajusto el hover de botones deshabilitados.

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
- `docs/feature/reorder-exercises.md`

## Estructura de datos

No se cambio el modelo de datos persistido.

El modo edicion vive solo en memoria dentro de `state.isEditingRoutine` y no se guarda en `localStorage`.

## Decisiones relevantes

La app mantiene visibles las acciones por ejercicio, pero las deja deshabilitadas hasta que el usuario active `Editar`.

Motivos:

- Evita cambios accidentales en la rutina.
- Mantiene claro que esas acciones existen.
- No agrega pasos extra al almacenamiento.
- Conserva el comportamiento actual de confirmacion para `Quitar`.

## Comportamiento esperado

- Si la rutina no tiene ejercicios, `Editar` queda deshabilitado.
- Al tocar `Editar`, las acciones `Subir`, `Bajar` y `Quitar` quedan habilitadas segun corresponda.
- Al tocar `Listo`, las acciones vuelven a quedar deshabilitadas.
- `Subir` sigue deshabilitado en el primer ejercicio.
- `Bajar` sigue deshabilitado en el ultimo ejercicio.
- Cambiar de dia cierra el modo edicion.
- Vaciar el dia cierra el modo edicion.

## Prueba manual recomendada

1. Abrir un dia con al menos dos ejercicios.
2. Confirmar que `Subir`, `Bajar` y `Quitar` aparecen deshabilitados.
3. Presionar `Editar`.
4. Confirmar que el boton cambia a `Listo`.
5. Confirmar que `Bajar` funciona en el primer ejercicio.
6. Confirmar que `Subir` funciona en un ejercicio que no sea el primero.
7. Presionar `Listo`.
8. Confirmar que las acciones vuelven a quedar deshabilitadas.
9. Cambiar de dia y confirmar que el modo edicion queda apagado.
