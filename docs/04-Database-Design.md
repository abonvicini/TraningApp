# Database Design

## Persistencia actual

La app no usa una base de datos tradicional. Los datos se guardan en `localStorage`.

## Claves

### `training-app-config`

Guarda configuracion general.

```json
{
  "trainingDayCount": 4
}
```

### `training-app-routines`

Guarda rutinas por dia.

```json
{
  "day1": [
    {
      "name": "Sentadilla",
      "sets": 4,
      "reps": 8
    }
  ],
  "day2": []
}
```

Para repeticiones variables:

```json
{
  "name": "Dominadas",
  "sets": 3,
  "repsBySet": [8, 7, 6]
}
```

### `training-app-history`

Guarda sesiones completadas.

```json
[
  {
    "id": "uuid",
    "day": "day1",
    "dayName": "Dia 1",
    "completedAt": "2026-06-28T06:00:00.000Z",
    "totalSets": 4,
    "totalExercises": 1,
    "exercises": [
      {
        "name": "Sentadilla",
        "sets": [
          {
            "reps": 8,
            "weight": 22.5
          }
        ]
      }
    ]
  }
]
```

## Reglas de compatibilidad

- No asumir que todos los registros tienen la forma mas nueva.
- Mantener soporte para historial previo con pesos como string.
- Mantener soporte para claves antiguas de dias si existen.
- Agregar migraciones defensivas cuando cambie el modelo.

## Limites actuales

- Los datos son locales al navegador.
- No hay sincronizacion entre dispositivos.
- Si el usuario borra datos del navegador, se pierde la informacion.
