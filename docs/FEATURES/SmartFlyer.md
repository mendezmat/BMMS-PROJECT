# Smart Flyer

## Problema que resuelve

Convierte un flyer de actividad en propuestas visuales pensadas para transmisión, reduciendo la reconstrucción manual del diseño.

## Estado en 037.0

Foundation funcional:

- carga local de PNG, JPG y WEBP;
- preview del archivo;
- lectura de dimensiones y orientación;
- extracción local de una paleta dominante aproximada;
- generación de tres propuestas base: Modern, TV y Glass;
- arquitectura OCR desacoplada mediante proveedores intercambiables.

## Qué falta

- OCR real;
- clasificación semántica de título, fecha, hora, lugar y texto adicional;
- detección de QR, logos y rostros;
- edición de propuestas;
- envío a Preview/Program y Browser Output;
- persistencia de proyectos Smart Flyer.

## Qué no hará

- no reemplazará un editor de diseño general;
- no reconstruirá automáticamente cada elemento decorativo del flyer;
- no enviará imágenes ni análisis a Internet por defecto.
