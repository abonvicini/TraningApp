# Volver a la serie anterior

## Resumen

Se implemento la posibilidad de volver a la serie anterior durante un entrenamiento para corregir el peso registrado.

Version asignada: `v0.4.0-beta`.

## Archivos modificados

### `index.html`

Se agrego el boton `Volver a la serie anterior` dentro del panel de entrenamiento activo.

### `app.js`

Se agrego la logica para:

- Detectar si existe al menos una serie completada.
- Deshabilitar el boton cuando no hay series previas.
- Encontrar la ultima serie registrada en el log temporal.
- Quitar temporalmente esa serie del registro.
- Volver a posicionar el entrenamiento en el ejercicio y serie correspondientes.
- Precargar el peso anterior en el input para corregirlo.
- Reutilizar la validacion existente al guardar nuevamente.

### `styles.css`

Se agrego estilo para que el boton secundario ocupe el ancho completo del panel, igual que la accion principal.

### Documentacion sincronizada

Se actualizaron:

- `README.md`
- `docs/01-Product-Vision.md`
- `docs/02-Functional-Requirements.md`
- `docs/06-Roadmap.md`
- `docs/07-Backlog.md`
- `docs/08-Development-Decisions.md`
- `CHANGELOG.md`

## Estructura de datos

No se cambio el modelo de datos persistido.

La correccion actua sobre `state.log`, que es el registro temporal del entrenamiento activo. Al finalizar la sesion, el historial guarda solo la version corregida.

## Decisiones relevantes

La app corrige la serie anterior quitando el ultimo set registrado y volviendo el cursor del entrenamiento a esa posicion.

Esto evita duplicar registros, mantiene la rutina base intacta y reutiliza el flujo existente de validacion de peso.

## Comportamiento esperado

- El boton esta deshabilitado al iniciar un entrenamiento sin series completadas.
- Al completar una serie, el boton queda disponible.
- Al volver, la app regresa a la serie anterior.
- El peso anterior aparece precargado para correccion.
- Guardar nuevamente reemplaza esa serie dentro del flujo normal.
- La rutina base no se modifica.
- El resumen y el historial muestran solo el valor corregido.

## Prueba manual recomendada

1. Iniciar un entrenamiento.
2. Completar la primera serie con un peso.
3. Presionar `Volver a la serie anterior`.
4. Confirmar que la app vuelve a esa serie y precarga el peso anterior.
5. Cambiar el peso y continuar.
6. Finalizar el entrenamiento.
7. Confirmar que el resumen muestra solo el peso corregido.

## Mejora adicional detectada

En una futura iteracion podria permitirse editar cualquier serie ya completada desde la lista de `Completado`, no solo la ultima serie registrada.

Esta mejora futura quedo registrada en `docs/07-Backlog.md`.
