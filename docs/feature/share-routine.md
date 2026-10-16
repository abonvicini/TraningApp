# Compartir rutina sin instalar la app

Version asignada: `v0.32.0-beta`

## Objetivo

Permitir que el usuario comparta la rutina del dia seleccionado con otra persona aunque no tenga Training App.

## Cambios realizados

- Se agrega `Compartir rutina` en la seccion `Rutinas`.
- La rutina se transforma en texto con dia, ejercicios, series y repeticiones.
- Se usa el menu nativo del dispositivo mediante `navigator.share` cuando esta disponible.
- Se agrega fallback al portapapeles y, si tampoco esta disponible, a una descarga `.txt`.
- Una rutina vacia informa al usuario y no genera un archivo.

## Impacto en datos

La funcionalidad es de solo lectura. No modifica rutinas, historial, entrenamiento activo ni claves de `localStorage`.

## Pruebas manuales

1. Ir a `Rutinas` y seleccionar un dia con ejercicios.
2. Pulsar `Compartir rutina`.
3. En un dispositivo compatible, confirmar que se abre el menu nativo de compartir.
4. En un navegador sin `navigator.share`, confirmar que la rutina se copia al portapapeles.
5. Si el portapapeles no esta disponible, confirmar que se descarga un archivo `.txt` legible.
6. Seleccionar un dia vacio y confirmar que se muestra un aviso sin modificar datos.

## Mejora futura

Compartir un resumen legible del historial sin convertirlo en un respaldo tecnico.
