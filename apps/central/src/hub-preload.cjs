// Puente seguro entre el hub y el proceso principal: solo estas funciones.
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("central", {
  catalog: () => ipcRenderer.invoke("central:catalog"),
  refresh: () => ipcRenderer.invoke("central:refresh"),
  install: appId => ipcRenderer.invoke("central:install", appId),
  open: appId => ipcRenderer.invoke("central:open", appId),
  rollback: appId => ipcRenderer.invoke("central:rollback", appId),
  uninstall: appId => ipcRenderer.invoke("central:uninstall", appId),
  updateAll: () => ipcRenderer.invoke("central:update-all"),
  downloadAssets: appId => ipcRenderer.invoke("central:download-assets", appId),
  importFolder: appId => ipcRenderer.invoke("central:import-folder", appId),
  restartToUpdate: () => ipcRenderer.invoke("central:restart-to-update"),
  openDataFolder: () => ipcRenderer.invoke("central:open-data-folder"),
  onChanged: callback => ipcRenderer.on("central:changed", () => callback()),
  onProgress: callback => ipcRenderer.on("central:progress", (_, info) => callback(info))
});
