# Edicion de series completadas

Version asignada: `v0.29.0-beta`

## Objetivo

Permitir corregir una serie ya completada durante el entrenamiento activo desde la lista `Completado`, sin modificar la rutina base ni obligar al usuario a retroceder serie por serie.

## Archivos modificados

- `index.html`
- `styles.css`
- `app.js`
- `README.md`
- `docs/01-Product-Vision.md`
- `docs/02-Functional-Requirements.md`
- `docs/05-UI-UX.md`
- `docs/06-Roadmap.md`
- `docs/07-Backlog.md`
- `docs/08-Development-Decisions.md`
- `CHANGELOG.md`

## Cambios realizados

- Cada item de `Completado` se renderiza como una accion editable.
- Se agrego un modal `Editar serie` para corregir:
  - Reps realizadas.
  - Peso utilizado.
  - Observacion de la serie.
- Al guardar, se actualiza solo la serie correspondiente dentro de `state.log`.
- Se conserva el valor actual de la serie en curso al re-renderizar.
- Al finalizar el entrenamiento, el historial persiste la version corregida.

## Validaciones agregadas

- Las reps se mantienen como numeros enteros mayores o iguales a 1.
- El peso se ajusta con los mismos pasos tactiles de `0.25`, `0.5`, `2.5` y `10 kg`.
- El peso no puede quedar negativo.
- La observacion se normaliza con `trim()` y se omite si queda vacia.
- Se evita zoom accidental por doble tap en los botones de peso del nuevo modal.

## Impacto en modelo de datos

No cambia el modelo persistido.

La mejora edita `state.log`, que es el registro temporal de la sesion activa. Al finalizar, `training-app-history` recibe la misma estructura ya existente para series realizadas:

```json
{
  "reps": 8,
  "weight": 35,
  "note": "Molestia leve en hombro derecho"
}
```

No se modifica `training-app-routines`.

## Pruebas realizadas

- `node --check app.js`
- `git diff --check`

## Prueba manual sugerida

1. Abrir la app e iniciar un entrenamiento con al menos dos series.
2. Completar una serie.
3. En `Completado`, tocar la serie registrada.
4. Cambiar reps, peso y nota desde el modal.
5. Guardar.
6. Confirmar que `Completado` muestra los datos corregidos.
7. Completar el entrenamiento.
8. Confirmar que el resumen muestra la serie corregida.
9. Volver al historial y confirmar que la sesion guardada conserva la correccion.
10. Iniciar nuevamente la rutina y confirmar que la rutina base mantiene las reps objetivo originales.

## Mejoras futuras relacionadas

- Permitir editar series desde un entrenamiento ya guardado en historial.
