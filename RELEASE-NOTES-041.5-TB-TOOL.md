# BMMS — Incremental 041.5 TB Tool (alerta de talkback)

## Alcance

Primera versión del TB Tool (SPEC-007). Es una página independiente en `http://localhost:4173/tb`, con enlace "TB Tool" en la barra superior de BMMS. No modifica Scripture, Visual CG ni los overlays.

## Funciones

- Hasta 8 canales. Cada uno tiene nombre, color, entrada de audio y canal físico propios.
- Medidor de nivel por canal con marca de umbral.
- Umbral, ataque y retención ajustables. "Calibrar ruido" mide 3 segundos y propone el umbral.
- Alerta en pantalla: borde del color del canal que habla y su nombre arriba. Grosor, opacidad, pulso y destello se pueden configurar. "Probar alerta" la muestra sin audio.
- Transcripción: lo que se dice por los canales marcados aparece como texto, con hora, nombre y color del canal. Se puede agrandar la letra, exportar a .txt y limpiar. Se guardan las últimas 300 frases en el navegador.
- "Modo alerta": pantalla completa solo con la transcripción grande, para un segundo monitor. Escape para salir.
- La configuración se guarda en `data/tb-tool.json`.

## Requisitos y límites

- Abrir en Chrome o Edge y permitir el micrófono.
- La transcripción usa el reconocimiento de voz del navegador y necesita internet.
- En Chrome reciente se transcriben solo los canales marcados. En versiones anteriores, el navegador puede transcribir la entrada predeterminada de Windows.
- Muchos navegadores entregan solo 2 canales por interfaz de audio. Para más canales, usa varias entradas.
- La alerta se ve en la ventana de BMMS, no por encima de otras aplicaciones. Para eso hará falta la app de escritorio (Fase 7).

## Validación

- Pruebas unitarias del detector (`tests/tb-tool.test.js`).
- Prueba en Chromium con un audio estéreo: el tono del canal izquierdo activó "Cámara 1" en rojo y el canal derecho, en silencio, nunca activó "Director". La transcripción simulada quedó asignada al canal correcto y la configuración se mantuvo al recargar.
- `npm test`: 157 pasan y 27 fallan. Esas 27 fallas ya existían.
