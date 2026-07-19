# Usar peso de ultima sesion

Version asignada: `v0.22.0-beta`

## Objetivo

Permitir que el usuario cargue rapidamente como `Peso actual` el peso mostrado en `Ultima sesion` durante el entrenamiento.

## Archivos modificados

- `index.html`: convierte el bloque `Ultima sesion` en un boton accesible y actualiza referencias versionadas de assets.
- `app.js`: agrega la accion para usar la referencia historica como peso actual.
- `styles.css`: reutiliza el estilo limpio de la tarjeta para que el boton no agregue ruido visual.
- `README.md`: actualiza la version actual.
- `docs/01-Product-Vision.md`: actualiza la version del producto.
- `docs/02-Functional-Requirements.md`: documenta la accion de tocar la referencia.
- `docs/05-UI-UX.md`: documenta el comportamiento esperado en modo entrenamiento.
- `docs/06-Roadmap.md`: registra la mejora como parte de la version actual.
- `docs/07-Backlog.md`: registra la mejora como completada.
- `docs/08-Development-Decisions.md`: actualiza la decision de uso de referencia historica.
- `docs/10-API.md`: registra la funcion interna de uso de referencia.
- `CHANGELOG.md`: registra `v0.22.0-beta`.

## Cambios realizados

- `Ultima sesion` queda como boton dentro de `TrainingProgressCard`.
- Si existe una referencia compatible, tocarla carga ese peso en `Peso actual`.
- Si la referencia historica fue `Sin peso`, tocarla deja `Peso actual` como `Sin peso`.
- Si no hay referencia compatible, el boton queda deshabilitado.
- No se modifica la rutina base.
- No se modifica el historial.
- El peso solo se guarda cuando el usuario completa la serie.

## Validaciones agregadas o cambiadas

- La accion vuelve a consultar la referencia historica antes de aplicarla.
- Si no hay ejercicio activo o referencia compatible, no realiza cambios.
- Se mantiene la validacion existente de peso al completar la serie.

## Impacto en modelo de datos

No hay cambios en el modelo de datos ni migraciones.

La accion solo actualiza el valor temporal del peso actual en la sesion activa.

## Pruebas manuales sugeridas

1. Tener una rutina con al menos un entrenamiento previo guardado en historial.
2. Iniciar nuevamente el mismo dia de entrenamiento.
3. Verificar que `Ultima sesion` muestra el peso historico compatible.
4. Tocar `Ultima sesion`.
5. Verificar que `Peso actual` toma ese valor.
6. Completar la serie y verificar que el historial guarda el peso usado.
7. Probar un dia sin referencia compatible y verificar que `Ultima sesion` muestra `—` y no se puede tocar.

## Mejoras futuras relacionadas

- Mostrar feedback visual breve cuando se aplica el peso de ultima sesion.
