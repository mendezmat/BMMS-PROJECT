// Las apps abiertas desde Central saben que corren dentro de Central (p. ej. para la ventana flotante).
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("bmmsCentral", { isCentral: true, platform: process.platform });
