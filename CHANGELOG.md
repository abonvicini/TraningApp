# Changelog

## `v0.13.0-beta` - 2026-07-02

### 2026-07-02 - Primer uso sin rutina precargada

- Version: `v0.13.0-beta`.
- Funcionalidad: iniciar la app sin ejercicios precargados para usuarios nuevos.
- Resumen: se elimino la rutina demo de `day1`; cuando no existe rutina en `localStorage`, todos los dias se crean vacios sin afectar datos existentes.
- Pull Request: #18.

## `v0.12.0-beta` - 2026-07-01

### 2026-07-01 - TrainingProgressCard en modo entrenamiento

- Version: `v0.12.0-beta`.
- Funcionalidad: incorporar una tarjeta principal de progreso para la pantalla de entrenamiento.
- Resumen: se agrego `TrainingProgressCard` como componente reutilizable en la arquitectura estatica, mostrando serie actual, peso anterior, repeticiones objetivo y peso actual con jerarquia visual fuerte.
- Pull Request: #17.

## `v0.11.0-beta` - 2026-07-01

### 2026-07-01 - Precarga de peso entre series

- Version: `v0.11.0-beta`.
- Funcionalidad: precargar el peso utilizado en la serie anterior al iniciar una nueva serie del mismo ejercicio.
- Resumen: al confirmar una serie, la siguiente serie del mismo ejercicio hereda el peso registrado; al cambiar de ejercicio, el peso vuelve a `Sin peso`.
- Pull Request: #16.

## `v0.10.0-beta` - 2026-06-30

### 2026-06-30 - Prevencion de zoom accidental en botones de peso

- Version: `v0.10.0-beta`.
- Funcionalidad: evitar zoom del navegador al hacer taps repetidos sobre los botones `+/-` del selector de peso.
- Resumen: se aplico una solucion acotada a los controles de peso con `touch-action: manipulation`, `user-select: none` y prevencion de `dblclick`, manteniendo disponible el zoom accesible general del navegador.
- Pull Request: #15.

## `v0.9.0-beta` - 2026-06-30

### 2026-06-30 - Selector tactil de peso en entrenamiento

- Version: `v0.9.0-beta`.
- Funcionalidad: ajustar el peso usado en cada serie con botones tactiles durante el entrenamiento.
- Resumen: se reemplazo el input numerico visible por un display de peso y controles `-2.5`, `-0.5`, `Sin peso`, `+0.5` y `+2.5`, evitando que el teclado del telefono interrumpa el registro.
- Pull Request: #13.

## `v0.8.0-beta` - 2026-06-29

### 2026-06-29 - Indicador de serie compacto en entrenamiento

- Version: `v0.8.0-beta`.
- Funcionalidad: reducir el tamano visual del indicador de serie en curso en modo entrenamiento.
- Resumen: se ajusto el estilo de `.set-focus strong` para que el contador `1 / 4`, `2 / 4` y similares ocupe menos espacio sin afectar otros textos.
- Pull Request: #12.

## `v0.7.0-beta` - 2026-06-29

### 2026-06-29 - Titulo de ejercicio compacto en entrenamiento

- Version: `v0.7.0-beta`.
- Funcionalidad: reducir el tamano visual del titulo del ejercicio en modo entrenamiento.
- Resumen: se agrego un estilo especifico para el titulo dentro de `session-header`, evitando modificar otros titulos de la app.
- Pull Request: #11.

## `v0.6.0-beta` - 2026-06-28

### 2026-06-28 - Modo Editar para acciones de rutina

- Version: `v0.6.0-beta`.
- Funcionalidad: habilitar las acciones Subir, Bajar y Quitar mediante un boton general `Editar`.
- Resumen: se agrego un modo de edicion para la rutina seleccionada, dejando las acciones de cada ejercicio deshabilitadas hasta que el usuario active `Editar`.
- Pull Request: #10.

## `v0.5.0-beta` - 2026-06-28

### 2026-06-28 - Reordenar ejercicios dentro de un dia

- Version: `v0.5.0-beta`.
- Funcionalidad: reordenar ejercicios dentro de un dia de entrenamiento.
- Resumen: se agregaron acciones para subir o bajar ejercicios en la rutina seleccionada, persistiendo el nuevo orden en `localStorage` sin cambiar el modelo de datos.
- Pull Request: #9.

## `v0.4.0-beta` - 2026-06-28

### 2026-06-28 - Volver a la serie anterior

- Version: `v0.4.0-beta`.
- Funcionalidad: volver a la serie anterior durante el entrenamiento para corregir el peso.
- Resumen: se agrego una accion secundaria en el entrenamiento que permite quitar el ultimo set registrado, volver a esa serie y precargar el peso anterior para corregirlo sin modificar la rutina base.
- Pull Request: #8.

## `v0.3.0-beta` - 2026-06-28

### 2026-06-28 - Auditoria documental del proyecto

- Version: `v0.3.0-beta`.
- Funcionalidad: limpieza y sincronizacion general de documentacion.
- Resumen: se definio `CHANGELOG.md` como fuente principal, se convirtio `docs/09-Changelog.md` en referencia, se alinearon backlog y roadmap, y se documento el estado actual del proyecto.
- Pull Request: #7.

## `v0.2.0-beta` - 2026-06-28

### 2026-06-28 - Revision de backlog

- Version: `v0.2.0-beta`.
- Funcionalidad: reorganizacion del backlog por prioridad.
- Resumen: se actualizo el backlog con secciones de alta prioridad, prioridad media y completadas, y se definio que cada mejora incrementa la version beta del proyecto.
- Pull Request: #6.

## `v0.1.0-beta` - 2026-06-28

### 2026-06-28 - Edicion de fecha y hora en historial

- Version: `v0.1.0-beta`.
- Funcionalidad: edicion de fecha y hora de entrenamientos guardados.
- Resumen: se agrego una accion `Editar` en el historial para modificar fecha y hora, persistiendo solo el campo `completedAt` sin alterar ejercicios, series, pesos ni repeticiones.
- Pull Request: #4.

### 2026-06-28 - Documentacion modular

- Version: `v0.1.0-beta`.
- Funcionalidad: estructura modular de documentacion del proyecto.
- Resumen: se agregaron documentos base en `docs/`, carpeta `docs/images/`, regla de informes por mejora, regla de actualizacion documental al finalizar implementaciones y criterio de PR terminado solo cuando codigo y documentacion estan sincronizados.
- Pull Request: #5.

### 2026-06-28 - Soporte para pesos decimales

- Version: `v0.1.0-beta`.
- Funcionalidad: registro de pesos enteros y decimales con hasta 1 decimal.
- Resumen: se ajusto el input de peso, se agrego validacion para decimales y se mantuvo compatibilidad con historial existente.
- Pull Request: #2.

### 2026-06-28 - Documentacion de pesos decimales

- Version: `v0.1.0-beta`.
- Funcionalidad: informe tecnico de soporte para pesos decimales.
- Resumen: se agrego documentacion en `docs/feature/decimal-weights.md` y reglas base de documentacion por mejora.
- Pull Request: #3.
