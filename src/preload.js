const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("darkMode", {
  toggleTheme: () => ipcRenderer.invoke("dark-mode:toggle"),
  resetTheme: () => ipcRenderer.invoke("dark-mode:system"),
});

contextBridge.exposeInMainWorld("employee", {
  saveEmployeeData: (employeeData) =>
    ipcRenderer.invoke("employee-data:save", employeeData),
});

contextBridge.exposeInMainWorld("progressCounter", {
  status: (number) => ipcRenderer.invoke("increment", number),
});
