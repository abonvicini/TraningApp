# Functional Requirements

## Configuracion inicial

- El usuario puede definir cuantos dias de entrenamiento tiene su semana.
- El rango permitido es de 1 a 7 dias.
- La configuracion se guarda localmente.
- En el primer uso, los dias de entrenamiento deben iniciar sin ejercicios precargados.

## Gestion de rutina

- El usuario puede seleccionar un dia de entrenamiento.
- El usuario puede agregar ejercicios a cada dia.
- Cada ejercicio puede tener una cantidad fija de series y repeticiones.
- Cada ejercicio puede usar repeticiones diferentes por serie.
- Al cargar una rutina con repeticiones diferentes por serie, el formulario debe ocultar el input general de reps.
- El usuario puede quitar ejercicios de un dia.
- El usuario puede reordenar ejercicios dentro de un dia.
- El usuario puede habilitar las acciones de edicion de rutina mediante un boton general `Editar`.
- El usuario puede vaciar la rutina de un dia.

## Navegacion principal

- La app debe separar la vista principal en secciones `Home`, `Rutinas` e `Historial`.
- La navegacion entre esas secciones debe estar disponible desde un footer interactivo.
- El footer no debe mostrarse durante configuracion inicial, entrenamiento activo ni resumen de entrenamiento.
- Cada seccion principal puede mostrar el selector de dias para acceso rapido.
- El dia seleccionado debe compartirse entre `Home`, `Rutinas` e `Historial`.
- Si el dia seleccionado no tiene rutina cargada, el CTA de `Home` debe cambiar a `Cargar rutina` y llevar a `Rutinas`.

## Ejecucion de entrenamiento

- El usuario puede iniciar un entrenamiento si el dia seleccionado tiene ejercicios.
- La app muestra el ejercicio actual, serie actual, repeticiones objetivo y series restantes.
- En modo entrenamiento, el header debe permanecer fijo y mostrar la accion de volver, el dia/ejercicio actual y el nombre del ejercicio.
- La app muestra una tarjeta de progreso con serie actual, peso usado en la ultima sesion compatible, repeticiones objetivo y peso actual.
- `Peso actual` y `Ultima sesion` deben diferenciarse visualmente para que el usuario identifique cual es el dato activo que se va a registrar.
- El usuario puede registrar el peso utilizado por serie.
- El peso puede quedar vacio y registrarse como `Sin peso`.
- El peso puede ser entero o decimal en incrementos de `0.25 kg`.
- El usuario puede tocar `Peso actual` y ajustar el peso desde un modal con controles tactiles, sin abrir el teclado del telefono.
- Los cambios de peso hechos en el modal se aplican solo al confirmar con `Guardar`; al cancelar, se conserva el peso previo.
- Los controles tactiles de peso deben agrupar cada decremento junto a su incremento equivalente.
- Los controles tactiles de peso deben evitar zoom accidental por doble tap o taps repetidos.
- El usuario puede modificar las repeticiones realizadas de la serie actual durante el entrenamiento.
- Modificar las repeticiones realizadas durante el entrenamiento no debe alterar la rutina base.
- Al iniciar una nueva serie del mismo ejercicio, el peso debe precargarse con el valor usado en la serie anterior.
- La referencia de ultima sesion debe salir del historial del mismo dia, mismo ejercicio y misma serie.
- El usuario puede tocar la referencia de ultima sesion para usar ese peso como peso actual de la serie en curso.
- El usuario puede volver a la serie anterior durante el entrenamiento para corregir el peso registrado.
- Las acciones de avanzar y volver serie deben estar disponibles en un footer fijo con controles de flecha.
- Al volver a la serie anterior, la app debe corregir el registro de la sesion actual sin alterar la rutina base.

## Historial

- Al finalizar un entrenamiento, la app guarda una sesion en historial.
- El historial se guarda en `localStorage`.
- El historial muestra los ultimos entrenamientos por dia.
- Cada entrenamiento guardado del historial se muestra colapsado inicialmente con fecha y hora.
- Al tocar un entrenamiento del historial, se despliega el detalle completo de ejercicios y series.
- El usuario puede editar la fecha y hora de un entrenamiento guardado.
- La edicion de fecha y hora debe actualizar solo `completedAt`, sin modificar ejercicios, series, pesos ni repeticiones.
- El usuario puede cancelar la edicion de fecha y hora sin guardar cambios.
- El usuario puede borrar individualmente un entrenamiento guardado.
- Luego de borrar un entrenamiento individual, el usuario puede deshacer la accion durante 10 segundos.
- El usuario puede borrar el historial del dia seleccionado.
- Los registros antiguos deben seguir visualizandose correctamente.

## Compatibilidad

- Los cambios funcionales deben evitar romper datos previos de `localStorage`.
- Si una mejora requiere cambiar datos, debe incluir migracion compatible.

## Documentacion por mejora

- Cada mejora debe generar un informe en `docs/feature/{mejora}.md`.
- Al finalizar una implementacion, se deben revisar y actualizar solo los documentos afectados entre:
  - `README.md`
  - `docs/02-Functional-Requirements.md`
  - `docs/06-Roadmap.md`
  - `docs/07-Backlog.md`
  - `docs/08-Development-Decisions.md`
  - `CHANGELOG.md`
- Si la funcionalidad estaba en backlog, debe marcarse como completada o salir de pendientes.
- Las ideas nuevas detectadas durante el trabajo deben registrarse como mejoras futuras sin implementarlas.
- Toda nueva funcionalidad, refactorizacion importante o cambio de comportamiento debe actualizar la documentacion afectada dentro del mismo Pull Request.
- Un Pull Request no se considera terminado si el codigo y la documentacion no estan sincronizados.
