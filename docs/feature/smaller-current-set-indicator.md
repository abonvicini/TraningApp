# Indicador de serie compacto en entrenamiento

## Resumen

Se redujo el tamano visual del indicador de serie en curso dentro del modo entrenamiento.

Version asignada: `v0.8.0-beta`.

## Archivos modificados

### `styles.css`

Se ajusto `.set-focus strong`, que muestra valores como `1 / 4`, `2 / 4` y similares durante el entrenamiento activo.

Tambien se redujo el tamano responsive para pantallas angostas.

### Documentacion sincronizada

Se actualizaron:

- `README.md`
- `docs/01-Product-Vision.md`
- `docs/05-UI-UX.md`
- `docs/06-Roadmap.md`
- `CHANGELOG.md`

## Estructura de datos

No se cambio ningun dato ni modelo persistido.

## Decisiones relevantes

El cambio se aplico al selector especifico `.set-focus strong`, en lugar de modificar estilos globales.

Motivos:

- Evitar cambios visuales en otras vistas.
- Mantener visible la serie actual sin que domine toda la pantalla.
- Mejorar el equilibrio visual con el titulo del ejercicio y los datos de repeticiones.

## Prueba manual recomendada

1. Iniciar un entrenamiento.
2. Confirmar que el indicador de serie en curso, por ejemplo `1 / 4`, se ve mas chico.
3. Confirmar que el indicador sigue siendo claro y legible.
4. Avanzar a otra serie y confirmar que `2 / 4` mantiene el mismo tamano.
5. Revisar en una pantalla angosta que no haya superposiciones.
