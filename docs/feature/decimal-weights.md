# Soporte para pesos decimales

## Resumen

La app permite registrar pesos enteros y decimales con hasta 1 decimal en cada serie de entrenamiento.

La mejora acepta valores como `2`, `2.5`, `7.5` y `22.5 kg`, mantiene el comportamiento de campo vacio como `Sin peso`, y conserva la visualizacion de registros antiguos guardados en `localStorage`.

## Archivos modificados

### `index.html`

Se ajusto el input de peso utilizado:

- Antes: `step="0.5"`
- Ahora: `step="0.1"`

Esto permite que el control HTML acepte incrementos de un decimal.

### `app.js`

Se actualizaron tres areas del flujo:

- Validacion del peso ingresado antes de registrar la serie.
- Normalizacion y guardado del peso decimal.
- Formateo visual de pesos en resumen e historial.

## Validaciones

La funcion `parseWeightInput(value)` centraliza la validacion del peso.

Reglas aplicadas:

- Se aceptan numeros enteros positivos.
- Se aceptan numeros decimales positivos con hasta 1 decimal.
- Se acepta el campo vacio y se guarda como `Sin peso`.
- Se rechazan valores negativos.
- Se rechazan valores con mas de 1 decimal.
- Se rechazan valores no numericos o formatos ambiguos.
- Se acepta coma decimal como entrada del usuario, normalizandola a punto antes de guardar.

Ejemplos aceptados:

- `2`
- `2.5`
- `7.5`
- `22.5`
- Campo vacio

Ejemplos rechazados:

- `7.55`
- `-1`
- `abc`
- `1e2`

## Decision sobre valores con mas de 1 decimal

Para valores como `7.55`, la app rechaza el ingreso en lugar de redondearlo.

Motivo: redondear podria guardar un peso distinto al que ingreso el usuario. Para registros de entrenamiento, es mas seguro pedir correccion explicita y evitar alterar el dato.

Esta decision esta documentada con un comentario en el codigo.

## Guardado en historial

Antes, el peso se guardaba como texto tomado directamente del input.

Ahora:

- Si el campo esta vacio, se guarda `""` para mantener el comportamiento existente.
- Si el campo tiene un peso valido, se guarda como numero.
- Los registros nuevos con decimales se guardan correctamente en `localStorage`.
- Los registros viejos siguen funcionando porque el formateo sigue aceptando strings, numeros, vacio, `null` y `undefined`.

## Visualizacion en historial y resumen

`formatWeight(weight)` muestra correctamente pesos decimales con hasta 1 decimal.

Ejemplos:

- `7.5` se muestra como `7,5 kg` en formato regional `es-AR`.
- `22.5` se muestra como `22,5 kg`.
- Campo vacio, `null` o `undefined` se muestra como `Sin peso`.
- Registros antiguos no numericos se muestran sin romper la pantalla.

## Comportamiento esperado

- Se puede registrar una serie con `7.5 kg`.
- Se puede registrar una serie con `22.5 kg`.
- Si se ingresa `7.55`, la app muestra un error y no avanza de serie.
- Si se deja el campo vacio, la serie se registra como `Sin peso`.
- El resumen del entrenamiento muestra pesos decimales correctamente.
- El historial de entrenamientos muestra pesos decimales correctamente.
- Los entrenamientos antiguos siguen visualizandose.

## Prueba manual recomendada

1. Abrir la app.
2. Seleccionar una rutina con ejercicios cargados.
3. Iniciar el entrenamiento.
4. En una serie, ingresar `7.5` y continuar.
5. En otra serie, ingresar `22.5` y continuar.
6. En otra serie, dejar el campo vacio y continuar.
7. Intentar ingresar `7.55`.
8. Confirmar que la app rechaza `7.55` y no avanza.
9. Finalizar el entrenamiento.
10. Revisar el resumen y el historial.

Resultado esperado:

- `7.5` y `22.5` quedan registrados y visibles como pesos decimales.
- El campo vacio aparece como `Sin peso`.
- `7.55` no queda registrado.
- El historial anterior sigue cargando sin errores.

## Notas tecnicas

La app es estatica y usa `localStorage` para persistencia local. No se agregaron dependencias ni cambios de estructura.
