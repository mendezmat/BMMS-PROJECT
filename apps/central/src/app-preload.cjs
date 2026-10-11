// Las apps abiertas desde Central saben que corren dentro de Central y pueden avisarle
// el estado de la alerta (para la franja a pantalla completa) y recibir órdenes de la bandeja.
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("bmmsCentral", {
  isCentral: true,
  platform: process.platform,
  overlay: true,
  autoStart: process.argv.includes("--bmms-autostart"),
  alert: state => ipcRenderer.send("tb:alert", state),
  status: state => ipcRenderer.send("tb:status", state),
  onCommand: callback => ipcRenderer.on("tb:command", (_, command) => callback(command)),
  toggleFullscreen: () => ipcRenderer.send("tb:window", "fullscreen"),
  toBackground: () => ipcRenderer.send("tb:window", "background")
});
