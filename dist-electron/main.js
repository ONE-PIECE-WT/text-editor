import { ipcMain, app, BrowserWindow } from "electron";
import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
let mainWindow = null;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // 确保使用正确的预加载脚本路径
      nodeIntegration: false,
      contextIsolation: true
    }
    // 窗口图标
    // icon: path.join(__dirname, '../public/icon.png'),
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    const indexHtml = path.join(__dirname, "../dist/index.html");
    mainWindow.loadFile(indexHtml);
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
ipcMain.handle("get-files", async (_, dirPath) => {
  try {
    const files = await fs.promises.readdir(dirPath, { withFileTypes: true });
    return files.map((file) => ({
      name: file.name,
      isDirectory: file.isDirectory(),
      path: path.join(dirPath, file.name)
    }));
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
});
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (mainWindow === null) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
