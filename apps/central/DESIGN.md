# BMMS Central — guía de diseño

Referencia: lenguaje visual de Waves Central v14 (ventana "Install and Activate Products"),
estudiado desde capturas públicas. Se imitan la estructura, la paleta y las reglas; **no** se usan
logos, iconos, imágenes ni fuentes de Waves. Nombre y logo son de BMMS.

## Estructura de la ventana

```
┌────┬──────────────────────────────────────────────┬──────────────────┐
│    │ Barra superior (#212121, 48 px): título · búsqueda · pastilla de │
│ S  │ actualizaciones · recargar                    │ Panel derecho    │
│ i  ├──────────────────────────────────────────────┤ (#212121, 300px) │
│ d  │ Pestañas en MAYÚSCULAS: MIS APPS · TODAS      │ "Apps            │
│ e  │ Cabecera de columnas (11 px, gris)            │  seleccionadas"  │
│ b  │ Filas de apps (64 px): ○ · miniatura redonda  │ Resumen          │
│ a  │ · nombre / versión · columnas con ✓ o —       │ Progreso         │
│ r  │                                               │                  │
│    ├──────────────────────────────────────────────┤ [  Instalar  ]   │
│76px│ Pie: "Buscar: Instalar desde carpeta | Datos" │ (pastilla azul)  │
└────┴──────────────────────────────────────────────┴──────────────────┘
```

- **Barra lateral** (76 px, #191919): logo arriba; elementos verticales con icono de 22 px y
  etiqueta de 11 px debajo, centrados. Activo: icono y texto en azul claro (#6ca1ff). Abajo:
  Ajustes.
- **Contenido** (#121212): pestañas en mayúsculas de 11 px con peso 500; la activa en
  #6ca1ff. Tabla sin bordes verticales, separadores de 1 px (#262626).
- **Panel derecho** (#212121): título de 13 px; resumen en caja #191919; botón principal
  abajo, ancho completo, en forma de pastilla.

## Paleta (medida de capturas)

| Uso | Color |
|---|---|
| Fondo de contenido | #121212 |
| Barra lateral | #191919 |
| Barra superior, panel derecho, fila seleccionada | #212121 |
| Campo de búsqueda | #424242 |
| Separadores | #262626 |
| Texto principal | #ffffff |
| Texto secundario | #9e9e9e |
| Texto terciario / cabeceras | #757575 |
| Acento (botón principal) | #3552ff (hover #4a64ff) |
| Acento claro (activo, enlaces) | #6ca1ff |
| Actualización disponible (pastilla) | #f73663 |
| Instalado (marca) | #4caf50 |

## Tipografía

Roboto (licencia OFL, incluida en `hub/fonts`, funciona sin internet).
- Título de barra superior: 14 px / 500.
- Pestañas y cabeceras de columnas: 11 px / 500, MAYÚSCULAS en pestañas.
- Nombre de app: 13 px / 700. Versión y estado: 12 px / 400, gris.
- Botón principal: 13 px / 500, sin mayúsculas.

## Reglas

- Esquinas: 4 px en campos y cajas; pastillas totalmente redondeadas en botones
  principales y en la pastilla de actualizaciones. Miniaturas circulares de 40 px.
- Sin sombras ni degradados en la interfaz (solo en las miniaturas de las apps).
- Estados de fila: hover #1a1a1a; seleccionada #212121 con el círculo de selección relleno
  en #3552ff. Las apps "Próximamente" van con opacidad reducida y no se instalan.
- Columnas de estado: ✓ verde cuando aplica; "—" gris cuando no.
- Progreso: barra de 4 px #3552ff sobre #333 en el panel derecho, con texto de 12 px.
