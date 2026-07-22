# Foundation

## Propósito

Foundation es el núcleo compartido de toda la plataforma BMMS. Ninguna aplicación implementa de nuevo los servicios comunes; todos consumen Foundation.

## Objetivos

- Compartir infraestructura.
- Mantener una experiencia de usuario consistente.
- Centralizar configuración.
- Reducir duplicación de código.
- Permitir que nuevos módulos se integren sin modificar los existentes.

## Componentes

### Configuración
Persistencia de preferencias globales, rutas, idioma, plataforma de destino y ajustes por módulo.

### Theme Manager
Sistema de colores, tipografías, espaciados, iconografía y modo claro/oscuro.

### Window Manager
Administración de ventanas, overlays, paneles flotantes y estado de la interfaz.

### Overlay Manager
Registro, creación y publicación de overlays independientes mediante URL.

### Event Bus
Canal interno para comunicación entre módulos sin acoplamiento directo.

### Storage
Persistencia local de configuraciones, plantillas y proyectos.

### Logging
Registro unificado de eventos, advertencias y errores.

### Plugin API (Futuro)
Interfaz para ampliar BMMS mediante extensiones.

## Principios de diseño

1. Foundation no contiene lógica específica de un módulo.
2. Todo servicio compartido vive en Foundation.
3. Los módulos dependen de Foundation; Foundation no depende de los módulos.
4. Las APIs deben ser estables y versionadas.

## Dependencias

Foundation será utilizado por:
- BMMS Graphics
- BMMS TB Tool
- Futuras aplicaciones

## Roadmap

v1
- Configuración
- Overlays
- Storage

v2
- Plugins
- Sincronización
- Telemetría opcional
