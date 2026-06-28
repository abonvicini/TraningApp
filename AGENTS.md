# Codex project instructions

- Cada mejora implementada debe generar un informe con los cambios.
- El informe debe guardarse en `docs/feature/{mejora}.md`.
- El informe debe resumir el alcance, archivos modificados, validaciones o decisiones relevantes, pruebas realizadas y pasos de prueba manual.
- Al finalizar cualquier implementacion, revisar si corresponde actualizar:
  - `README.md`
  - `docs/02-Functional-Requirements.md`
  - `docs/06-Roadmap.md`
  - `docs/07-Backlog.md`
  - `docs/08-Development-Decisions.md`
  - `CHANGELOG.md`
- Actualizar solo los documentos afectados por la implementacion.
- Si una funcionalidad implementada estaba en el backlog, moverla a `Completadas` o eliminarla de pendientes.
- Si aparecen ideas relacionadas durante el desarrollo, agregarlas al backlog como mejoras futuras sin implementarlas.
- Si se toma una decision tecnica importante, documentarla en `docs/08-Development-Decisions.md` con contexto, decision, motivo y consecuencias.
- Registrar cambios en `CHANGELOG.md` con fecha, version si corresponde, funcionalidad, resumen y referencia al PR si existe.
- Cada mejora incrementa la version beta del proyecto y debe reflejarse en README, Roadmap, Changelog y el informe de la mejora cuando corresponda.
- Toda nueva funcionalidad, refactorizacion importante o cambio de comportamiento debe incluir la documentacion afectada dentro del mismo Pull Request.
- Ningun PR se considera terminado hasta que codigo y documentacion esten sincronizados.
