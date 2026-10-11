// La ventana de alerta solo recibe el estado; no puede llamar a nada.
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("overlay", {
  onState: callback => ipcRenderer.on("overlay:state", (_, state) => callback(state))
});
