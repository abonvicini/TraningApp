# Navegacion principal por secciones

Version asignada: `v0.16.0-beta`

## Objetivo

Separar la vista principal de la app en secciones claras para reducir ruido visual y facilitar el acceso rapido a las tareas principales.

## Archivos modificados

- `index.html`: reestructura la vista principal en `Home`, `Rutinas` e `Historial`, y agrega el footer interactivo.
- `styles.css`: agrega estilos del layout seccionado y del footer de navegacion.
- `app.js`: agrega estado de seccion activa, sincroniza los selectores de dia y controla la navegacion del footer.
- `README.md`: actualiza la version actual.
- `docs/01-Product-Vision.md`: actualiza la version actual del producto.
- `docs/02-Functional-Requirements.md`: documenta la navegacion principal.
- `docs/03-Technical-Architecture.md`: actualiza las vistas principales y el estado de seccion activa.
- `docs/05-UI-UX.md`: describe las tres secciones y el footer.
- `docs/06-Roadmap.md`: registra la mejora como parte de la version actual.
- `docs/08-Development-Decisions.md`: documenta la decision de separar la vista principal sin persistir pestaña activa.
- `CHANGELOG.md`: registra `v0.16.0-beta`.

## Cambios realizados

- `Home` contiene bienvenida, selector de dia y boton para comenzar entrenamiento.
- Cuando el dia seleccionado no tiene rutina cargada, el boton de `Home` cambia a `Cargar rutina` y abre la seccion `Rutinas`.
- `Rutinas` contiene cambio de cantidad de dias, selector de dia, rutina seleccionada y edicion de ejercicios.
- `Rutinas` agrega un encabezado principal con el mismo estilo visual de los titulos secundarios de seccion, y muestra el dia seleccionado debajo de ese encabezado.
- `Rutinas` ajusta el espaciado del selector de dias para mantener consistencia visual con las demas secciones.
- `Historial` contiene selector de dia e historial del dia seleccionado.
- El footer permite cambiar entre `Home`, `Rutinas` e `Historial`.
- El footer usa iconos SVG simples y marca la seccion activa con el color naranja principal de la app.
- El selector de dias esta disponible en cada seccion y comparte el mismo `state.selectedDay`.
- El footer no se muestra durante configuracion inicial, entrenamiento activo ni resumen.

## Validaciones

- No se cambia el modelo de datos.
- No se modifica la logica principal del entrenamiento.
- El dia seleccionado se mantiene sincronizado entre secciones.
- Al iniciar la app, la seccion activa vuelve a ser `Home`.
- Un dia sin ejercicios no bloquea el CTA principal de `Home`; guia al usuario a cargar la rutina.

## Impacto en modelo de datos

No hay cambios en `localStorage` ni migraciones.

## Pruebas manuales sugeridas

1. Abrir la app y verificar que inicia en `Home`.
2. Cambiar de dia en `Home`.
3. Ir a `Rutinas` y verificar que el mismo dia queda seleccionado.
4. Ir a `Historial` y verificar que el mismo dia queda seleccionado.
5. Cambiar de dia desde `Historial` y volver a `Rutinas`.
6. Confirmar que el footer no aparece en modo entrenamiento.
7. Confirmar que el footer no aparece en el resumen luego de finalizar un entrenamiento.
8. Seleccionar un dia sin ejercicios en `Home` y confirmar que el CTA dice `Cargar rutina`.
9. Tocar `Cargar rutina` y confirmar que abre la seccion `Rutinas`.
10. Seleccionar un dia con ejercicios y confirmar que el CTA vuelve a decir `Comenzar entrenamiento`.
