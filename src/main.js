const {
  app,
  BrowserWindow,
  ipcMain,
  nativeTheme,
  Menu,
  globalShortcut,
  shell,
  Notification,
} = require("electron");
const path = require("path");
const fs = require("fs");
const { updateElectronApp } = require("update-electron-app");

const { menuTemplate } = require("./menuTemplate");

updateElectronApp();

if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  mainWindow.webContents.openDevTools();

  // Shortcuts
  globalShortcut.register("CommandOrControl+g", () =>
    shell.openExternal("https://www.github.com")
  );
};

ipcMain.handle("dark-mode:toggle", () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = "light";
  } else {
    nativeTheme.themeSource = "dark";
  }
  return nativeTheme.themeSource;
});
ipcMain.handle("dark-mode:system", () => {
  nativeTheme.themeSource = "system";
  return nativeTheme.themeSource;
});
ipcMain.handle("employee-data:save", (event, data) => {
  fs.appendFile(
    path.join(app.getPath("desktop"), "data.txt"),
    JSON.stringify(data) + ",\n",
    (err) => {
      if (err) throw err;
    }
  );
  return { message: "Data saved" };
});
ipcMain.handle("increment", (event, data) => {
  if (data === 100) {
    mainWindow.setProgressBar(-1);
  } else {
    mainWindow.setProgressBar(data / 100);
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  if (process.platform === "win32") {
    app.setAppUserModelId("Sample Electron App");
  }
  new Notification({
    title: "New message",
    body: "App started 🔥🔥🔥",
    icon: "./src/assets/app-icon.png",
  }).show();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
