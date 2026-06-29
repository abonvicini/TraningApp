# Development Decisions

## Usar aplicacion estatica

La app se mantiene como HTML, CSS y JavaScript plano para reducir friccion.

Motivos:

- No requiere build.
- Es facil de correr localmente.
- Es suficiente para el alcance actual.

## Usar `localStorage`

La persistencia local simplifica el producto inicial.

Motivos:

- No requiere backend.
- Mantiene los datos privados en el navegador.
- Permite iterar rapido.

Trade-off:

- No hay sincronizacion entre dispositivos.
- El usuario puede perder datos si limpia el navegador.

## Rechazar pesos con mas de 1 decimal

La app rechaza pesos como `7.55` en lugar de redondearlos.

Motivo:

- Redondear podria guardar un peso distinto al ingresado por el usuario.

## Documentar cada mejora

Cada mejora debe incluir un informe en `docs/feature/{mejora}.md`.

Motivo:

- Mantener contexto historico junto al codigo.
- Facilitar futuras iteraciones.
- Reducir perdida de decisiones de producto y tecnica.

## Mantener codigo y documentacion sincronizados en cada Pull Request

Contexto:

Cada cambio puede afectar requisitos, roadmap, backlog, decisiones o changelog. Si esa actualizacion queda fuera del flujo de implementacion o queda para otro Pull Request, el repositorio pierde contexto y la documentacion se desactualiza.

Decision:

Toda nueva funcionalidad, refactorizacion importante o cambio de comportamiento debe incluir la documentacion afectada dentro del mismo Pull Request. Al finalizar cualquier implementacion, se debe revisar si corresponde actualizar `README.md`, `docs/02-Functional-Requirements.md`, `docs/06-Roadmap.md`, `docs/07-Backlog.md`, `docs/08-Development-Decisions.md` y `CHANGELOG.md`.

Motivo:

- Evitar funcionalidades implementadas sin documentar.
- Evitar Pull Requests que separen codigo y contexto tecnico.
- Mantener el backlog y roadmap alineados con el estado real.
- Registrar decisiones tecnicas importantes cerca del codigo.
- Facilitar revisiones y futuras iteraciones.

Consecuencias:

- Cada implementacion tiene una pequena etapa de cierre documental.
- Se actualizan solo los documentos afectados para evitar ruido.
- Las ideas futuras detectadas durante el trabajo quedan en backlog, no en memoria de chat.
- Ningun Pull Request se considera terminado hasta que codigo y documentacion esten sincronizados.

## Incrementar la version beta por cada mejora

Contexto:

El proyecto se encuentra en etapa beta y cada mejora debe poder identificarse en la documentacion y el changelog.

Decision:

Cada mejora incrementa la version beta del proyecto. La version actual debe reflejarse en `README.md`, `docs/01-Product-Vision.md`, `docs/06-Roadmap.md`, `CHANGELOG.md`, `docs/09-Changelog.md` y el informe de la mejora cuando corresponda.

Motivo:

- Dar trazabilidad a cada mejora.
- Evitar que cambios documentales o funcionales queden sin version asociada.
- Facilitar seguimiento de releases beta.

Consecuencias:

- Cada Pull Request de mejora debe incluir revision de version.
- El changelog debe agrupar correctamente los cambios bajo la beta correspondiente.
- Las mejoras sin cambio de version no se consideran listas.

## Usar `CHANGELOG.md` como fuente principal

Contexto:

El proyecto tiene documentacion modular en `docs/` y tambien un changelog raiz. Mantener dos changelogs completos puede generar duplicacion y contradicciones.

Decision:

`CHANGELOG.md` es la fuente principal de cambios. `docs/09-Changelog.md` debe funcionar como referencia o indice hacia el changelog raiz, no como changelog paralelo.

Motivo:

- Evitar duplicacion de entradas.
- Mantener una unica fuente de verdad para versiones, mejoras y referencias a Pull Requests.
- Reducir el riesgo de contradicciones entre documentos.

Consecuencias:

- Toda entrada nueva de changelog se agrega en `CHANGELOG.md`.
- `docs/09-Changelog.md` debe mantenerse breve y apuntar al archivo raiz.

## Corregir la serie anterior removiendo el ultimo registro

Contexto:

Durante un entrenamiento, el usuario puede registrar un peso incorrecto y necesitar volver a la serie anterior para corregirlo.

Decision:

La correccion vuelve al ultimo set registrado quitandolo temporalmente de `state.log`, reposiciona `exerciseIndex` y `setIndex`, y precarga el peso anterior en el input para que el usuario lo confirme nuevamente.

Motivo:

- Evita duplicar series en el registro de la sesion.
- Mantiene intacta la rutina base.
- Reutiliza el flujo existente de validacion y guardado de peso.

Consecuencias:

- La accion solo aplica durante el entrenamiento activo.
- La correccion modifica solo el log temporal de la sesion actual.
- El resumen y el historial reciben una unica version corregida de la serie.

## Reordenar ejercicios modificando el array del dia seleccionado

Contexto:

El usuario necesita cambiar el orden de los ejercicios cargados dentro de un dia de entrenamiento sin recrear la rutina.

Decision:

La app reordena ejercicios moviendo el item dentro del array de `state.routines[state.selectedDay]` y guarda inmediatamente el resultado con `saveRoutines()`.

Motivo:

- Mantiene el modelo de datos existente.
- Evita migraciones innecesarias en `localStorage`.
- Conserva todos los datos del ejercicio sin recrearlo.
- Hace que el nuevo orden sea el que se usa al iniciar el proximo entrenamiento.

Consecuencias:

- La mejora no afecta historiales ya guardados.
- El orden se persiste por dia de entrenamiento.
- Los controles de subir y bajar se deshabilitan en los extremos de la lista.
