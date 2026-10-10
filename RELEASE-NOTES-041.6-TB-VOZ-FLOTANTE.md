# BMMS — Incremental 041.6 TB Tool: solo voz y ventana flotante

## Cambios

- **Solo voz:** cada canal puede usar "Solo voz (ignora el ruido)" (predeterminado) o "Nivel de audio". En modo voz, un detector de voz por red neuronal (Silero VAD v5) decide si alguien habla. El ruido, la música o la congregación no encienden la alerta aunque superen el umbral.
- **Sensibilidad** por canal (0–100 %). Súbela si no detecta voces suaves y bájala si la música la enciende.
- Indicador "VOZ" y barra blanca bajo el medidor con la probabilidad de voz en vivo.
- **Ventana flotante:** el botón "Ventana flotante" abre una ventana pequeña que queda encima de todas las aplicaciones. Muestra el nombre y color del canal que habla y las últimas frases transcritas. Se puede mover y cambiar de tamaño. Requiere Chrome o Edge.
- La captura de audio corre en el hilo de audio, así que la alerta sigue funcionando con la pestaña en segundo plano.
- La transcripción solo recibe audio cuando hay voz, así el texto sale más limpio.
- Todo funciona sin internet, excepto la transcripción. El modelo y el motor van en `apps/graphics/public/vendor/vad` y `vendor/ort` (13,5 MB).

## Validación

- Prueba en Chromium con audio estéreo: el canal izquierdo tenía voz mezclada con ruido y acordes fuertes, y el derecho solo ruido y acordes, a unos −20 dB, muy por encima del umbral de −60 dB. El canal con voz se encendió solo durante el habla. El canal de solo ruido no se encendió nunca en 40 segundos.
- La ventana flotante abrió y pasó por "Detenido", "Sin talkback" y "Cámara 1" encendida.
- `npm test`: 159 pasan y 27 fallan. Esas 27 fallas ya existían.

## Instalación (Mac)

```
ditto -x -k ~/Downloads/BMMS-041.6-TB-Voz-Flotante.zip ~/Documents/
```
Después reinicia BMMS y recarga `http://localhost:4173/tb`.
