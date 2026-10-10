# BMMS Central

Hub de aplicaciones de producción BMMS (estilo Waves Central). Se instala una vez; las apps se
instalan y actualizan por archivos: cuando hay una corrección, solo se descarga lo que cambió.

## Cómo funciona

- **Catálogo:** `central/catalog.json` lista todas las apps. `status: "available"` se puede instalar;
  `"coming-soon"` aparece como Próximamente.
- **Canal:** `central/channel/stable.json` + `stable.json.sig` (manifiesto firmado con ed25519).
  Central lo lee de `https://raw.githubusercontent.com/mendezmat/BMMS-PROJECT/main/central/channel/stable.json`.
  Cada archivo trae sha256 y tamaño, y se descarga fijado al commit en que se publicó.
- **Seguridad:** sin la llave privada (`~/.bmms/central-signing-key.pem`, fuera del repo) no se puede publicar
  nada que Central acepte. Haz una copia de seguridad de esa llave.
- **Instalación:** la versión nueva se arma aparte, se verifica completa y se activa al final. La anterior
  queda guardada (botón "Volver a …"). Los datos del usuario (ajustes y sesiones del TB Tool) viven en la
  carpeta de usuario de Central y nunca se tocan al actualizar.
- **Sin internet:** "Instalar desde carpeta…" instala desde una copia de BMMS-PROJECT (por ejemplo, un pendrive),
  incluidos los modelos de transcripción.
- **TB Tool dentro de Central:** corre con un servidor interno que solo escucha en 127.0.0.1. La ventana
  flotante es una ventana real del sistema, siempre encima.

## Publicar una corrección de una app

```
git add -A && git commit -m "fix(tb-tool): ..."      # 1. commit de los cambios
node scripts/central-publish.mjs                      # 2. manifiesto firmado para ese commit
git add central/channel && git commit -m "chore(central): publicar canal" && git push   # 3. publicar
```

Los PC con Central verán "Actualización" en la tarjeta de la app (revisa cada 30 minutos o con
"Buscar actualizaciones").

## Publicar una nueva versión de Central (el programa)

Sube `version` en `apps/central/package.json`, haz commit y crea la etiqueta `central-vX.Y.Z`.
GitHub Actions compila los instaladores de Windows y Mac y los publica en Releases; Central se actualiza solo.

## Desarrollo

```
cd apps/central && npm install && npm start      # abrir Central
npm test                                         # pruebas del motor de actualizaciones
npm run dist:win                                 # instalador de Windows (dist/)
```
