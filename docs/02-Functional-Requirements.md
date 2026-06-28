# Functional Requirements

## Configuracion inicial

- El usuario puede definir cuantos dias de entrenamiento tiene su semana.
- El rango permitido es de 1 a 7 dias.
- La configuracion se guarda localmente.

## Gestion de rutina

- El usuario puede seleccionar un dia de entrenamiento.
- El usuario puede agregar ejercicios a cada dia.
- Cada ejercicio puede tener una cantidad fija de series y repeticiones.
- Cada ejercicio puede usar repeticiones diferentes por serie.
- El usuario puede quitar ejercicios de un dia.
- El usuario puede vaciar la rutina de un dia.

## Ejecucion de entrenamiento

- El usuario puede iniciar un entrenamiento si el dia seleccionado tiene ejercicios.
- La app muestra el ejercicio actual, serie actual, repeticiones objetivo y series restantes.
- El usuario puede registrar el peso utilizado por serie.
- El peso puede quedar vacio y registrarse como `Sin peso`.
- El peso puede ser entero o decimal con hasta 1 decimal.

## Historial

- Al finalizar un entrenamiento, la app guarda una sesion en historial.
- El historial se guarda en `localStorage`.
- El historial muestra los ultimos entrenamientos por dia.
- El usuario puede editar la fecha y hora de un entrenamiento guardado.
- La edicion de fecha y hora debe actualizar solo `completedAt`, sin modificar ejercicios, series, pesos ni repeticiones.
- El usuario puede cancelar la edicion de fecha y hora sin guardar cambios.
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
