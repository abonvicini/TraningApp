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

## Rechazar pesos fuera de incrementos de 0.25 kg

La app rechaza pesos como `7.55` o `7.555` en lugar de redondearlos.

Motivo:

- Redondear podria guardar un peso distinto al ingresado por el usuario.
- La precision basada en `0.25 kg` permite soportar cuartos de kilo sin guardar valores ambiguos.

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

## Crear una libreria de componentes en Storybook en paralelo

Contexto:

La app actual sigue siendo una aplicacion estatica en HTML, CSS y JavaScript plano. La migracion a React no es necesaria de forma inmediata, pero conviene preparar componentes reutilizables antes de encarar una migracion completa.

Decision:

Se decide crear una libreria de componentes en Storybook en paralelo al desarrollo de la app estatica actual.

La app estatica continuara recibiendo mejoras funcionales y correcciones de UX mientras Storybook se utiliza como entorno de exploracion, validacion y documentacion de componentes reutilizables.

Motivo:

- Preparar una futura migracion a React con menor riesgo.
- Definir componentes, variantes, estados visuales y patrones de interaccion antes de reemplazar pantallas completas.
- Validar decisiones de UI sin bloquear el avance funcional de la app actual.
- Evitar una reescritura grande sin componentes previamente probados.

Consecuencias:

- Storybook no reemplaza inmediatamente la app actual.
- La app estatica sigue siendo el producto funcional principal.
- La libreria de componentes puede madurar de forma incremental.
- Cuando la libreria alcance un estado suficientemente maduro, se podra iniciar una migracion progresiva hacia React usando componentes ya validados.

## Implementar `TrainingProgressCard` primero en la app estatica

Contexto:

La pantalla de entrenamiento necesita priorizar informacion critica: serie actual, peso anterior, repeticiones objetivo y peso actual. Aunque existe la decision de crear Storybook en paralelo, la app estatica sigue siendo el producto funcional principal.

Decision:

Se implementa `TrainingProgressCard` dentro de la app estatica actual como una combinacion de markup semantico, clases CSS y la funcion `renderTrainingProgressCard()`.

Motivo:

- Entregar valor inmediato en el flujo de entrenamiento.
- Probar jerarquia visual y estados reales antes de llevar el patron a Storybook.
- Mantener el componente alineado con la arquitectura actual sin introducir React prematuramente.

Consecuencias:

- El componente queda listo como referencia para una futura historia de Storybook.
- La pantalla de entrenamiento reduce ruido visual y concentra informacion prioritaria.
- Cuando exista la libreria React, este patron debera migrarse como componente formal con props equivalentes.

## Iniciar usuarios nuevos sin rutina precargada

Contexto:

La app tenia una rutina de ejemplo precargada en `day1` para usuarios sin datos en `localStorage`. Aunque facilitaba probar la app, podia interpretarse como contenido real y romper la claridad del primer uso.

Decision:

Cuando no existe `training-app-routines` en `localStorage`, la app crea todos los dias de entrenamiento vacios.

Motivo:

- Evitar que el usuario nuevo confunda una rutina demo con su rutina real.
- Mantener una experiencia inicial neutral.
- Preparar mejor el flujo futuro de importar rutina e historial.

Consecuencias:

- El usuario nuevo debe cargar o importar su rutina antes de iniciar un entrenamiento.
- Los datos existentes en `localStorage` no se modifican.
- Si el contenido guardado de rutinas no puede parsearse, la app vuelve a un estado vacio en lugar de restaurar una rutina demo.

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

## Reemplazar la entrada libre de peso por controles tactiles

Contexto:

Durante el entrenamiento en telefono, tocar el campo numerico de peso abre el teclado del dispositivo y agrega friccion al registro de series.

Decision:

La app usa un display de peso y botones tactiles para ajustar el valor con incrementos de `0.25`, `0.5` y `2.5`, ademas de una accion `Sin peso`. El input de peso queda oculto como almacenamiento interno del valor antes de confirmar la serie.

Motivo:

- Evita abrir el teclado del telefono durante el flujo principal de entrenamiento.
- Mantiene la compatibilidad con el guardado existente de pesos enteros, decimales y `Sin peso`.
- Genera valores validos en incrementos de `0.25 kg` sin depender de correcciones posteriores.

Consecuencias:

- El usuario ya no escribe el peso manualmente durante el entrenamiento.
- Los valores `0.25`, `7.5`, `22.5` y otros incrementos de cuarto o medio kilo se pueden registrar con los botones.
- La validacion existente sigue actuando como respaldo antes de guardar.
- El HTML referencia los assets con la version beta para reducir riesgo de cache en la app estatica.

## Prevenir zoom accidental solo en controles tactiles de peso

Contexto:

Al tocar repetidamente los botones `+/-` del selector de peso en navegadores moviles, el navegador puede interpretar la accion como doble tap y aplicar zoom accidental.

Decision:

La app aplica `touch-action: manipulation` y `user-select: none` solo sobre el contenedor y botones del selector de peso. Ademas, previene el comportamiento por defecto del evento `dblclick` dentro de ese control.

Motivo:

- Evita zoom accidental durante una accion repetitiva del entrenamiento.
- Mantiene el zoom accesible general del navegador porque no se usa `user-scalable=no` en el viewport.
- Limita el cambio al area donde aparece el problema.

Consecuencias:

- Los taps repetidos en los botones de peso no deberian disparar zoom accidental.
- El resto de la app conserva el comportamiento normal de zoom del navegador.
- La solucion depende de soporte moderno de `touch-action`, con respaldo parcial mediante `dblclick`.

## Precargar peso solo entre series del mismo ejercicio

Contexto:

Durante un entrenamiento, la mayoria de las series consecutivas de un mismo ejercicio usan el mismo peso o un peso cercano. Volver a cargarlo en cada serie genera interacciones repetitivas.

Decision:

Al confirmar una serie, la siguiente serie del mismo ejercicio se renderiza con el peso recien registrado. Cuando la app avanza a otro ejercicio, el selector vuelve a `Sin peso`.

Motivo:

- Reduce taps durante el entrenamiento sin asumir pesos entre ejercicios distintos.
- Mantiene el comportamiento existente para la primera serie de cada ejercicio.
- Reutiliza el valor ya validado por `parseWeightInput()`.

Consecuencias:

- El usuario puede confirmar rapidamente series consecutivas con el mismo peso.
- Si la serie anterior fue `Sin peso`, la siguiente serie del mismo ejercicio tambien inicia como `Sin peso`.
- No se modifica el modelo de datos ni el historial guardado.

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

## Usar un modo de edicion local para acciones de rutina

Contexto:

Las acciones `Subir`, `Bajar` y `Quitar` modifican la rutina del dia seleccionado. Tenerlas activas todo el tiempo aumenta el riesgo de cambios accidentales.

Decision:

La app usa `state.isEditingRoutine` para controlar un modo de edicion de interfaz. El boton `Editar` alterna ese modo y las acciones de cada ejercicio solo se habilitan cuando esta activo.

Motivo:

- Reduce acciones accidentales sobre la rutina.
- Mantiene visibles las opciones disponibles sin permitirlas fuera del modo edicion.
- No agrega cambios al modelo persistido.
- Permite volver automaticamente al modo normal al cambiar de dia o vaciar la rutina.

Consecuencias:

- El estado de edicion no se guarda en `localStorage`.
- La rutina sigue usando la misma estructura de datos.
- Las acciones destructivas conservan confirmacion antes de eliminar ejercicios.

## Guardar reps realizadas solo en el log de sesion

Contexto:

Durante un entrenamiento, el usuario puede realizar una cantidad de repeticiones distinta a la definida en la rutina base. Esa diferencia debe quedar registrada como parte del entrenamiento realizado, sin alterar la planificacion.

Decision:

La app mantiene las repeticiones objetivo en `training-app-routines` y guarda las repeticiones realizadas solo dentro de `state.log`, que luego se persiste en `training-app-history`.

Motivo:

- Evita modificar la rutina base por una variacion puntual.
- Reutiliza el modelo existente de sets completados, que ya guarda `reps` y `weight`.
- Permite que el proximo entrenamiento vuelva a iniciar con las reps objetivo originales.

Consecuencias:

- El historial refleja las repeticiones realmente realizadas.
- La rutina configurada conserva sus valores objetivo.
- No se requiere migracion de `localStorage`.

## Separar la vista principal con navegacion de footer

Contexto:

La pantalla principal acumulaba bienvenida, configuracion de rutina, edicion de ejercicios e historial en una sola vista. Eso hacia que algunas acciones compitieran visualmente y obligaba al usuario a escanear demasiado contenido para tareas simples.

Decision:

La app separa la vista principal en tres secciones locales: `Home`, `Rutinas` e `Historial`. La navegacion se resuelve con un footer interactivo visible solo en la vista principal. El estado `state.selectedDay` se comparte entre las tres secciones y la pestaña activa no se persiste en `localStorage`.

Motivo:

- Reduce ruido visual sin cambiar el modelo de datos.
- Mantiene acceso rapido al selector de dias en cada seccion.
- Evita mostrar navegacion durante entrenamiento activo, configuracion inicial o resumen.
- Mantiene el arranque siempre en `Home`, que es el flujo mas predecible.

Consecuencias:

- No hay migracion de datos.
- `Rutinas` concentra configuracion y edicion.
- `Historial` concentra entrenamientos guardados.
- Cambiar el dia en cualquier seccion actualiza las otras secciones inmediatamente.
