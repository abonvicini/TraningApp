# Modal tactil para editar peso actual

Version asignada: `v0.23.0-beta`

Fecha: 2026-07-19

## Objetivo

Limpiar la pantalla de entrenamiento moviendo los controles tactiles de peso a un modal accesible desde `Peso actual`, manteniendo la experiencia sin teclado del telefono.

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
- `docs/feature/touch-weight-selector.md`

## Cambios realizados

- `Peso actual` dentro de la tarjeta de entrenamiento pasa a ser un boton con indicador visual de edicion.
- Se agrega un modal `Editar peso` con:
  - valor actual del peso;
  - accion `Sin peso`;
  - botones `-0.25`, `+0.25`, `-0.5`, `+0.5`, `-2.5`, `+2.5`, `-10` y `+10`;
  - acciones `Cancelar` y `Guardar`.
- Los controles visibles de peso se retiran del cuerpo principal de la pantalla de entrenamiento.
- El modal mantiene un valor temporal para que cancelar no modifique el peso de la serie.
- Al guardar, el valor temporal se copia al input interno usado por el flujo existente de completar serie.

## Validaciones agregadas o mantenidas

- No se permite bajar de `0 kg`; los botones negativos se deshabilitan cuando corresponde.
- `Sin peso` sigue guardando el valor vacio para mantener el comportamiento actual.
- Los incrementos disponibles generan valores compatibles con la validacion existente de `0.25 kg`.
- La validacion previa a completar serie sigue rechazando pesos invalidos si existieran.

## Impacto en modelo de datos

No hay cambios en la estructura de datos.

- `training-app-routines` no se modifica.
- `training-app-history` conserva el mismo formato de pesos.
- El estado temporal del modal no se persiste.

## Pruebas realizadas

- `node --check app.js`
- `git diff --check`
- Verificacion estructural de `index.html` para confirmar que existen `weightModal`, `openWeightModalButton`, `saveWeightModalButton`, `cancelWeightModalButton` y assets `v0.23.0-beta`.
- Verificacion por servidor local con `curl` para confirmar que el HTML y JS servidos corresponden a la version nueva.

El navegador integrado rechazo la recarga/interaccion de `http://127.0.0.1:4180/` por politica de la herramienta, por lo que la validacion manual visual queda para ejecutar en la app local.

## Prueba manual sugerida

1. Abrir entrenamiento y tocar `Peso actual`.
2. Confirmar que el modal muestra el peso actual o `Sin peso`.
3. Sumar peso con `+2.5` o `+10`, guardar y verificar que la tarjeta muestra el nuevo peso.
4. Abrir de nuevo el modal, cambiar el valor y cancelar para verificar que la tarjeta conserva el peso anterior.
5. Usar `Sin peso`, guardar y completar una serie para verificar que se registra como `Sin peso`.

## Mejoras futuras relacionadas

- Evaluar incrementos configurables por usuario para adaptar el selector a discos disponibles en cada gimnasio.
