# Roadmap

## Version actual: `v0.16.0-beta`

- Soporte para pesos decimales.
- Edicion de fecha y hora de entrenamientos guardados en historial.
- Volver a la serie anterior durante el entrenamiento para corregir el peso.
- Reordenar ejercicios dentro de un dia de entrenamiento.
- Modo `Editar` para habilitar acciones Subir, Bajar y Quitar en la rutina.
- Titulo de ejercicio mas compacto en modo entrenamiento.
- Indicador de serie en curso mas compacto en modo entrenamiento.
- Selector tactil de peso en modo entrenamiento para evitar el teclado del telefono.
- Botones tactiles de peso ordenados en pares de decremento e incremento equivalente, incluyendo pasos de `0.25 kg`.
- Prevencion de zoom accidental por taps repetidos en los botones de peso.
- Precarga del peso de la serie anterior al iniciar una nueva serie del mismo ejercicio.
- Modificacion de repeticiones realizadas durante el entrenamiento sin alterar la rutina base.
- Modal de repeticiones ajustable solo con botones tactiles para evitar abrir el teclado.
- Navegacion principal seccionada en `Home`, `Rutinas` e `Historial` con footer interactivo.
- Componente `TrainingProgressCard` para mostrar serie, peso anterior, reps y peso actual en modo entrenamiento.
- Primer uso sin rutina precargada para que todos los dias inicien vacios.
- Documentacion modular base en `docs/`.
- Revision de backlog por prioridad.
- Auditoria y sincronizacion general de documentacion.

## Corto plazo

- Editar el nombre de ejercicios.
- Historial completo con filtros, busqueda y ordenamiento.
- Permitir borrar individualmente cada entrenamiento guardado en historial, manteniendo tambien la opcion de borrar todo el historial del dia.
- Importar rutina e historial desde la pantalla inicial cuando la app se usa por primera vez.
- Exportar rutina e historial cuando ya existen datos guardados.

## Mediano plazo

- Migracion a React.
- Reordenamiento de ejercicios por arrastrar y soltar.
- Configurar incrementos personalizados para el selector de peso.
- Backend.
- Base de datos.

## Largo plazo

- Sistema de autenticacion.

## Criterios de priorizacion

- Impacto directo en el uso durante el entrenamiento.
- Riesgo bajo para datos existentes.
- Claridad de experiencia.
- Facilidad de prueba manual.
