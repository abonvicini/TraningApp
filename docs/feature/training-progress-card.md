# TrainingProgressCard

Fecha: 2026-07-01

Version asignada: `v0.12.0-beta`

## Objetivo

Crear una tarjeta principal para modo entrenamiento que permita identificar rapidamente:

- Serie actual.
- Peso anterior.
- Repeticiones objetivo.
- Peso actual.

## Cambio implementado

Se reemplazo el bloque visual anterior de serie, repeticiones y peso por `TrainingProgressCard`.

En la arquitectura estatica actual, el componente queda representado por:

- Markup semantico en `index.html`.
- Clases CSS `training-progress-card`.
- Funcion `renderTrainingProgressCard()` en `app.js`.

## Props equivalentes

El componente toma los mismos datos propuestos para una futura version React:

```ts
interface TrainingProgressCardProps {
  currentSet: number;
  totalSets: number;
  previousWeight?: number | null;
  currentWeight?: number | null;
  targetReps: number;
}
```

En esta version estatica, esos datos se pasan como objeto a `renderTrainingProgressCard()`.

## Archivos modificados

- `index.html`
- `styles.css`
- `app.js`
- `README.md`
- `CHANGELOG.md`
- `docs/01-Product-Vision.md`
- `docs/02-Functional-Requirements.md`
- `docs/05-UI-UX.md`
- `docs/06-Roadmap.md`
- `docs/07-Backlog.md`
- `docs/08-Development-Decisions.md`
- `docs/10-API.md`

## Decisiones de UX

- La serie actual es el elemento visual principal.
- Los datos secundarios usan tres columnas simples.
- No se usan cards internas.
- Los pesos y repeticiones usan el color primario de la app.
- Si no hay peso anterior, se muestra `—`.
- Si no hay peso actual, se muestra `Sin peso`.

## Compatibilidad

- No se modifica el modelo de datos.
- No se modifica `localStorage`.
- El selector tactil de peso sigue funcionando igual.
- La tarjeta funciona como referencia para una futura historia en Storybook.

## Prueba manual sugerida

1. Abrir la app en mobile o viewport angosto.
2. Iniciar un entrenamiento.
3. Verificar que la tarjeta muestre `1 / N` como elemento principal.
4. Verificar que `Peso anterior` muestre `—` en la primera serie.
5. Cargar un peso y confirmar la serie.
6. Verificar que la siguiente serie muestre el peso anterior y el peso actual.
7. Verificar que el layout no se rompa desde 320px de ancho.
