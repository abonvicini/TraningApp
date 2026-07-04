# Redeploy tecnico de GitHub Pages

Version asignada: `v0.14.1-beta`

## Objetivo

Generar una version tecnica para reintentar el deploy de GitHub Pages luego de un fallo transitorio del job `deploy`.

## Cambios realizados

- Se actualizo la version actual del proyecto a `v0.14.1-beta`.
- Se actualizaron las referencias cacheadas de `styles.css` y `app.js`.
- Se corrigio la referencia del Pull Request de `v0.14.0-beta` a `#19`.
- Se registro la version tecnica en el changelog.

## Archivos modificados

- `index.html`: actualiza las query strings de assets a `v0.14.1-beta`.
- `README.md`: actualiza la version actual.
- `docs/01-Product-Vision.md`: actualiza la version actual del producto.
- `docs/06-Roadmap.md`: actualiza la version actual.
- `CHANGELOG.md`: registra `v0.14.1-beta` y corrige la referencia de PR de `v0.14.0-beta`.

## Validaciones

- No se modifica la logica funcional.
- No se modifica el modelo de datos.
- No se modifica `localStorage`.
- No se agregan ni eliminan funcionalidades.

## Como probar manualmente

1. Publicar la version en `main`.
2. Verificar que GitHub Pages ejecute nuevamente el workflow de deploy.
3. Abrir la app publicada y confirmar que carga `styles.css?v=0.14.1-beta` y `app.js?v=0.14.1-beta`.
