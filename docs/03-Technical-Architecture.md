# Technical Architecture

## Tipo de aplicacion

Training App es una aplicacion web estatica.

Archivos principales:

- `index.html`: estructura de interfaz.
- `styles.css`: estilos visuales y layout responsive.
- `app.js`: estado, renderizado, persistencia y eventos.

## Runtime

La app corre directamente en el navegador.

No requiere:

- Backend.
- Build step.
- Dependencias externas.
- Base de datos remota.

## Estado

El estado principal vive en el objeto `state` de `app.js`.

Incluye:

- Configuracion de dias.
- Dia seleccionado.
- Rutinas.
- Sesiones guardadas.
- Progreso del entrenamiento actual.
- Registro temporal de series completadas.

## Persistencia

La persistencia usa `localStorage`.

Claves actuales:

- `training-app-config`
- `training-app-routines`
- `training-app-history`

## Renderizado

El renderizado se realiza mediante funciones que actualizan el DOM con strings HTML y listeners de eventos delegados o directos.

Vistas principales:

- Configuracion inicial.
- Inicio y rutina del dia.
- Entrenamiento activo.
- Resumen de entrenamiento.

## Compatibilidad

La arquitectura favorece cambios pequeños y migraciones defensivas.

Cuando una estructura antigua puede existir en `localStorage`, la app debe:

- Parsear con `try/catch`.
- Validar tipos antes de usar datos.
- Proveer defaults seguros.
- Migrar sin perder datos cuando sea posible.
