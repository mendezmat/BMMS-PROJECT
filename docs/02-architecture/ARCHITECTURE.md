# Arquitectura oficial

```text
BMMS
├── BMMS Central
├── BMMS Foundation
├── BMMS Smart Engine
└── BMMS Tools
```

## BMMS Central

Punto de acceso al ecosistema: selección de herramientas, configuración compartida y experiencia consistente.

## BMMS Foundation

- sistema visual
- componentes
- configuración
- almacenamiento
- utilidades
- comunicación
- registro de herramientas
- diagnóstico

## BMMS Tools

Cada herramienta debe mantenerse aislada funcionalmente, reutilizando Foundation y Smart Engine cuando corresponda.

## BMMS Graphics

- Scripture
- Smart Flyer
- Lower Third
- Countdown

Los overlays deben exponerse mediante URLs independientes para software de broadcast.

## Smart Engine

```text
Input
↓
Vision Core
↓
Layout Engine
↓
OCR Provider System
↓
Semantic Engine
↓
Knowledge Engine
↓
Recommendation Engine
↓
Result + Diagnostics
```

Los providers deben implementar una interfaz común. Cada resultado debe poder informar provider, regiones, OCR, clasificación, confianza y advertencias.
