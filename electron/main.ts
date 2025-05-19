import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import path from 'path'
import fs from 'fs'
import { createMenu } from './menu'

// 禁用硬件加速以减少某些系统上的问题
// app.disableHardwareAcceleration()

// 保存对主窗口的引用，防止被JavaScript垃圾回收机制回收
let mainWindow: BrowserWindow | null = null

// 为ES模块获取__dirname的等效值
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // 确保使用正确的预加载脚本路径
      nodeIntegration: false,
      contextIsolation: true,
    },
    // 窗口图标
    // icon: path.join(__dirname, '../public/icon.png'),
  })

  // 加载应用的 index.html
  // 本地开发环境使用 http://localhost:5173
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    // 打开开发工具
    mainWindow.webContents.openDevTools()
  } else {
    // 生产环境下加载打包后的index.html
    const indexHtml = path.join(__dirname, '../dist/index.html')
    mainWindow.loadFile(indexHtml)
  }

  // 当窗口关闭时触发
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// 实现文件系统API
ipcMain.handle('get-files', async (_, dirPath) => {
  try {
    const files = await fs.promises.readdir(dirPath, { withFileTypes: true });
    return files.map(file => ({
      name: file.name,
      isDirectory: file.isDirectory(),
      path: path.join(dirPath, file.name)
    }));
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
});

// 菜单已抽离到单独的文件中

// 当Electron完成初始化并准备创建浏览器窗口时调用此方法
app.whenReady().then(() => {
  createWindow()
  
  // 隐藏原生菜单栏并设置自定义菜单
  Menu.setApplicationMenu(createMenu())

  // 在macOS上，当点击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  app.on('activate', () => {
    if (mainWindow === null) createWindow()
  })
})

// 当所有窗口关闭时退出应用，除了在macOS上。
// 在macOS上，应用程序和菜单栏通常会保持活动状态，
// 直到用户使用Cmd + Q明确退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 在这里，你可以包含应用程序特定的主进程代码。
// 也可以将它们放在单独的文件中，然后在这里导入。