import { Menu, BrowserWindow, app, ipcMain, shell, dialog } from "electron";
import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const ZHTextContainer = {
  file: "文件",
  new: "新建",
  open: "打开",
  openFolder: "打开文件夹",
  save: "保存",
  exit: "退出",
  edit: "编辑",
  undo: "撤销",
  redo: "重做",
  cut: "剪切",
  copy: "复制",
  paste: "粘贴",
  delete: "删除",
  selectAll: "全选",
  view: "视图",
  reload: "重新加载",
  forceReload: "强制重新加载",
  toggleDevTools: "开发者工具",
  resetZoom: "重置缩放",
  zoomIn: "放大",
  zoomOut: "缩小",
  toggleFullscreen: "全屏",
  help: "帮助",
  about: "关于"
};
const TextContainer = ZHTextContainer;
const createMenuTemplate = () => {
  const template = [
    {
      label: TextContainer.file,
      submenu: [
        {
          label: TextContainer.new,
          accelerator: "CmdOrCtrl+N",
          click: () => {
            console.log("新建文件");
          }
        },
        {
          label: TextContainer.open,
          accelerator: "CmdOrCtrl+O",
          click: () => {
            console.log("打开文件");
          }
        },
        {
          label: TextContainer.openFolder,
          accelerator: "CmdOrCtrl+Shift+O",
          click: () => {
            console.log("打开文件夹");
            const mainWindow2 = BrowserWindow.getFocusedWindow();
            if (mainWindow2) {
              mainWindow2.webContents.send("open-folder");
            }
          }
        },
        { type: "separator" },
        {
          label: TextContainer.save,
          accelerator: "CmdOrCtrl+S",
          click: () => {
            console.log("保存文件");
          }
        },
        { type: "separator" },
        {
          label: TextContainer.exit,
          accelerator: "CmdOrCtrl+Q",
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: TextContainer.edit,
      submenu: [
        { role: "undo", label: TextContainer.undo },
        { role: "redo", label: TextContainer.redo },
        { type: "separator" },
        { role: "cut", label: TextContainer.cut },
        { role: "copy", label: TextContainer.copy },
        { role: "paste", label: TextContainer.paste },
        { role: "delete", label: TextContainer.delete },
        { type: "separator" },
        { role: "selectAll", label: TextContainer.selectAll }
      ]
    },
    {
      label: TextContainer.view,
      submenu: [
        { role: "reload", label: TextContainer.reload },
        { role: "forceReload", label: TextContainer.forceReload },
        { role: "toggleDevTools", label: TextContainer.toggleDevTools },
        { type: "separator" },
        { role: "resetZoom", label: TextContainer.resetZoom },
        { role: "zoomIn", label: TextContainer.zoomIn },
        { role: "zoomOut", label: TextContainer.zoomOut },
        { type: "separator" },
        { role: "togglefullscreen", label: TextContainer.toggleFullscreen }
      ]
    },
    {
      label: TextContainer.help,
      submenu: [
        {
          label: TextContainer.about,
          click: () => {
            console.log("关于");
          }
        }
      ]
    }
  ];
  return template;
};
const createMenu = () => {
  const menuTemplate = createMenuTemplate();
  return Menu.buildFromTemplate(menuTemplate);
};
let mainWindow = null;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: "大触",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // 确保使用正确的预加载脚本路径
      nodeIntegration: false,
      contextIsolation: true
    },
    // 窗口图标
    icon: path.join(__dirname, "../public/logo.ico")
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
  mainWindow.webContents.on("did-finish-load", () => {
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
ipcMain.handle("get-file-content", async (_, filePath) => {
  try {
    const content = await fs.promises.readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
});
ipcMain.on("open-folder-dialog", async (event) => {
  if (mainWindow) {
    try {
      console.log("打开文件夹对话框");
      const result = await dialog.showOpenDialog(mainWindow, {
        properties: ["openDirectory"],
        title: "选择要打开的文件夹",
        buttonLabel: "打开文件夹"
      });
      if (!result.canceled && result.filePaths.length > 0) {
        const selectedPath = result.filePaths[0];
        console.log("用户选择的文件夹路径:", selectedPath);
        try {
          await fs.promises.access(selectedPath, fs.constants.R_OK);
          event.reply("selected-folder", selectedPath);
        } catch (error) {
          console.error("无法访问选择的文件夹:", error);
        }
      } else {
        console.log("用户取消了文件夹选择");
      }
    } catch (error) {
      console.error("打开文件夹对话框时出错:", error);
    }
  } else {
    console.error("主窗口不存在，无法打开文件夹对话框");
  }
});
ipcMain.handle("create-file", async (_, filePath, content) => {
  try {
    await fs.promises.writeFile(filePath, content, "utf-8");
    console.log("文件创建成功:", filePath);
  } catch (error) {
    console.error("创建文件失败:", error);
    throw error;
  }
});
ipcMain.handle("create-folder", async (_, folderPath) => {
  try {
    await fs.promises.mkdir(folderPath, { recursive: true });
    console.log("文件夹创建成功:", folderPath);
  } catch (error) {
    console.error("创建文件夹失败:", error);
    throw error;
  }
});
ipcMain.handle("delete-file", async (_, filePath) => {
  try {
    const stats = await fs.promises.stat(filePath);
    if (stats.isDirectory()) {
      await fs.promises.rmdir(filePath, { recursive: true });
      console.log("文件夹删除成功:", filePath);
    } else {
      await fs.promises.unlink(filePath);
      console.log("文件删除成功:", filePath);
    }
  } catch (error) {
    console.error("删除失败:", error);
    throw error;
  }
});
ipcMain.handle("show-in-explorer", async (_, filePath) => {
  try {
    shell.showItemInFolder(filePath);
    console.log("在资源管理器中显示:", filePath);
  } catch (error) {
    console.error("显示文件失败:", error);
    throw error;
  }
});
app.whenReady().then(() => {
  createWindow();
  Menu.setApplicationMenu(createMenu());
  app.on("activate", () => {
    if (mainWindow === null) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
