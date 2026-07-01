# UI / UX

## Principios

- La experiencia debe ser rapida durante el entrenamiento.
- Los controles deben ser claros y faciles de tocar en mobile.
- La app debe priorizar informacion util sobre decoracion.
- Las acciones destructivas deben pedir confirmacion.

## Vistas

### Configuracion

Permite definir la cantidad de dias de entrenamiento.

### Inicio

Permite:

- Seleccionar dia.
- Ver rutina cargada.
- Agregar ejercicios.
- Activar un modo `Editar` para habilitar acciones sobre ejercicios.
- Ver historial reciente.
- Iniciar entrenamiento.

### Entrenamiento

Debe concentrar la atencion en:

- Ejercicio actual.
- Serie actual.
- Peso anterior.
- Repeticiones objetivo.
- Peso utilizado.
- Avance de la sesion.

El titulo del ejercicio y el indicador de serie en curso deben mantenerse compactos para no saturar visualmente el entrenamiento.

La serie actual, las repeticiones y los pesos deben poder leerse en una tarjeta principal de alto contraste, con jerarquia clara y sin cards internas.

La carga de peso en modo entrenamiento debe priorizar controles tactiles para evitar que el teclado del telefono interrumpa el flujo.

Los taps repetidos sobre controles de peso no deben generar zoom accidental del navegador ni saltos visuales.

Al avanzar entre series del mismo ejercicio, el peso anterior debe mantenerse precargado para reducir interacciones repetitivas.

### Resumen

Muestra el registro final del entrenamiento y permite volver al inicio.

## Formularios

- Usar inputs numericos para series y reps.
- Usar controles tactiles para el peso durante el entrenamiento.
- Usar `date` y `time` cuando se editen fechas.
- Mantener labels visibles.
- Evitar flujos largos para acciones frecuentes.

## Historial

El historial debe permitir revisar entrenamientos recientes sin distraer del armado de rutina.

Mejoras futuras posibles:

- Historial completo.
- Filtros por fecha.
- Busqueda por ejercicio.
- Comparacion de pesos por ejercicio.

## Mobile

La app debe funcionar bien en pantallas angostas:

- Botones a ancho completo cuando corresponda.
- Grillas que pasen a una columna.
- Texto sin superposiciones.
- Formularios compactos y legibles.
