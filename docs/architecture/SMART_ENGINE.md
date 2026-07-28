# Smart Engine — Foundation 037.0

## Componentes

- `SmartFlyerAnalyzer`: normaliza metadatos y produce un resultado estable.
- `OcrProviderRegistry`: registra y selecciona proveedores OCR sin acoplar el módulo a una implementación.
- `NullOcrProvider`: proveedor seguro por defecto; declara OCR no disponible sin inventar contenido.
- `createCompositionProposals`: genera propuestas broadcast a partir del análisis.

## Contrato inicial

El analizador recibe dimensiones y una paleta opcional. Devuelve:

- orientación;
- dimensiones;
- paleta;
- capacidades activas;
- resultado OCR normalizado;
- propuestas de composición.

## Decisión

037.0 no incorpora un OCR ficticio. La interfaz deja visible qué capacidades están disponibles y cuáles solo están preparadas arquitectónicamente.
