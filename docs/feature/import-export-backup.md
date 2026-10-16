# Importacion y exportacion de datos

Version asignada: `v0.31.0-beta`

## Objetivo

Permitir que el usuario respalde y recupere su configuracion, rutinas e historial sin depender de un backend.

## Archivos modificados

- `app.js`
- `index.html`
- `styles.css`
- `README.md`
- `docs/01-Product-Vision.md`
- `docs/02-Functional-Requirements.md`
- `docs/03-Technical-Architecture.md`
- `docs/04-Database-Design.md`
- `docs/06-Roadmap.md`
- `docs/07-Backlog.md`
- `docs/08-Development-Decisions.md`
- `docs/10-API.md`
- `CHANGELOG.md`

## Cambios realizados

- Se agrega exportacion de rutinas, configuracion e historial en un JSON versionado.
- Se agrega importacion desde la pantalla inicial y desde Rutinas.
- Se valida el formato, version, dias, ejercicios y sesiones antes de escribir datos.
- Se muestra un resumen y se solicita confirmacion antes de reemplazar rutinas e historial.
- El entrenamiento activo no se incluye en el respaldo.
- Se mantiene el almacenamiento existente en `localStorage`.

## Validaciones y decisiones

- El formato aceptado es `training-app-backup` version `1`.
- Los datos invalidos se rechazan sin modificar el almacenamiento actual.
- La importacion reemplaza el conjunto completo para evitar duplicar sesiones.
- Los registros antiguos de peso y sesiones se conservan mediante la normalizacion existente.

## Pruebas manuales

1. Configurar una rutina con al menos un ejercicio y registrar un entrenamiento.
2. Ir a `Rutinas` y pulsar `Exportar`.
3. Confirmar que se descarga un archivo `.json`.
4. Borrar o modificar los datos locales.
5. Pulsar `Importar`, seleccionar el archivo y confirmar el resumen.
6. Confirmar que vuelven la rutina y el historial.
7. Probar la importacion durante la configuracion inicial.
8. Seleccionar un archivo JSON invalido y confirmar que se rechaza sin perder los datos actuales.

## Mejoras futuras

- Fusionar respaldos con deteccion de duplicados.
