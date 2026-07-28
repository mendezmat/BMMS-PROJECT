# BMMS Update 037.7 — Vision Assist / Source-Faithful Title

## Alcance

- Selección asistida de la región del título sobre el flyer original.
- Recorte no destructivo del título como imagen PNG interna.
- Conservación del arte del título en Preview, Program y Browser Output.
- Fallback automático al texto editable cuando no existe una región válida.
- Persistencia del recurso dentro de la escena enviada mediante TAKE.

## Flujo operativo

1. Cargar y analizar el flyer.
2. BMMS intenta proponer una región de título desde Vision Engine.
3. Pulsar **Seleccionar título en el flyer** para corregirla manualmente.
4. Arrastrar una caja sobre el título.
5. Mantener activado **Usar título original del flyer**.
6. Completar manualmente fecha, hora, lugar u otros datos cuando sea necesario.
7. Enviar mediante TAKE.

## Compatibilidad

- Scripture: sin cambios.
- ProPresenter: sin cambios.
- API Smart Flyer: compatible; se añaden campos opcionales.
- Escenas anteriores: continúan renderizando mediante el título textual.
