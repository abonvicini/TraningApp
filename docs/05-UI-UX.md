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
- Iniciar entrenamiento.
- Cargar rutina desde el CTA principal cuando el dia seleccionado esta vacio.

### Rutinas

Permite:

- Cambiar la cantidad de dias de entrenamiento.
- Seleccionar dia.
- Ver rutina cargada.
- Agregar ejercicios.
- Activar un modo `Editar` para habilitar acciones sobre ejercicios.

### Historial

Permite:

- Seleccionar dia.
- Ver entrenamientos recientes.
- Ver cada entrenamiento colapsado por fecha y hora.
- Desplegar un entrenamiento al tocarlo para revisar el detalle completo.
- Borrar un entrenamiento individual desde su detalle.
- Deshacer el borrado individual de un entrenamiento desde un toast inferior durante 10 segundos.
- Borrar el historial del dia seleccionado.

La vista principal debe usar un footer de navegacion con tres accesos: `Home`, `Rutinas` e `Historial`. La pestaña activa debe destacarse de forma sutil con el color naranja de la app.

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

Las repeticiones realizadas deben mantener una visualizacion compacta en la tarjeta principal y poder ajustarse desde un modal al tocar `Reps` o el numero. Ese modal debe usar botones tactiles para sumar o restar reps sin abrir el teclado del telefono.

Los controles de ajuste de peso deben mostrarse en pares equivalentes, con el decremento a la izquierda del incremento.

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

Los entrenamientos guardados deben mostrarse compactos por defecto, dejando visible fecha y hora. El detalle de ejercicios y series debe aparecer solo cuando el usuario toca el entrenamiento.

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
