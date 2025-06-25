import { app, BrowserWindow, ipcMain, Menu, nativeTheme } from 'electron'
import { autoUpdater } from 'electron-updater'
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
    title: '大触',
    titleBarStyle: 'default',
    backgroundColor: '#1e1e1e', // 深色背景
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // 确保使用正确的预加载脚本路径
      nodeIntegration: false,
      contextIsolation: true,
    },
    // 窗口图标
    icon: path.join(__dirname, '../public/logo.ico'),
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
  
  // 窗口加载完成后的处理
  mainWindow.webContents.on('did-finish-load', () => {
    // 不再自动发送默认文件夹路径，让应用使用持久化存储的路径
  })
}

// 处理主题切换
ipcMain.handle('set-native-theme', async (_, theme) => {
  try {
    nativeTheme.themeSource = theme;
    return { success: true };
  } catch (error) {
    console.error('Error setting native theme:', error);
    return { success: false, error: error.message };
  }
});

// 手动检查更新
ipcMain.handle('check-for-updates', async () => {
  try {
    const result = await autoUpdater.checkForUpdates()
    return { success: true, updateInfo: result?.updateInfo }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

// 获取当前版本
ipcMain.handle('get-app-version', () => {
  return app.getVersion()
})

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

// 读取文件内容
ipcMain.handle('get-file-content', async (_, filePath) => {
  try {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
});

// 导入对话框和shell模块
import { dialog, shell } from 'electron';

// 处理打开文件夹的IPC消息
ipcMain.on('open-folder-dialog', async (event) => {
  if (mainWindow) {
    try {
      console.log('打开文件夹对话框');
      const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
        title: '选择要打开的文件夹',
        buttonLabel: '打开文件夹'
      });
      
      if (!result.canceled && result.filePaths.length > 0) {
        const selectedPath = result.filePaths[0];
        console.log('用户选择的文件夹路径:', selectedPath);
        
        // 检查路径是否存在
        try {
          await fs.promises.access(selectedPath, fs.constants.R_OK);
          // 发送选择的文件夹路径给渲染进程
          event.reply('selected-folder', selectedPath);
        } catch (error) {
          console.error('无法访问选择的文件夹:', error);
          // 可以在这里添加错误处理，例如显示错误对话框
        }
      } else {
        console.log('用户取消了文件夹选择');
      }
    } catch (error) {
      console.error('打开文件夹对话框时出错:', error);
    }
  } else {
    console.error('主窗口不存在，无法打开文件夹对话框');
  }
});

// 创建文件
ipcMain.handle('create-file', async (_, filePath, content) => {
  try {
    await fs.promises.writeFile(filePath, content, 'utf-8');
    console.log('文件创建成功:', filePath);
  } catch (error) {
    console.error('创建文件失败:', error);
    throw error;
  }
});

// 创建文件夹
ipcMain.handle('create-folder', async (_, folderPath) => {
  try {
    await fs.promises.mkdir(folderPath, { recursive: true });
    console.log('文件夹创建成功:', folderPath);
  } catch (error) {
    console.error('创建文件夹失败:', error);
    throw error;
  }
});

// 删除文件或文件夹
ipcMain.handle('delete-file', async (_, filePath) => {
  try {
    const stats = await fs.promises.stat(filePath);
    if (stats.isDirectory()) {
      // 删除文件夹及其所有内容
      await fs.promises.rmdir(filePath, { recursive: true });
      console.log('文件夹删除成功:', filePath);
    } else {
      // 删除文件
      await fs.promises.unlink(filePath);
      console.log('文件删除成功:', filePath);
    }
  } catch (error) {
    console.error('删除失败:', error);
    throw error;
  }
});

// 在文件资源管理器中显示文件
ipcMain.handle('show-in-explorer', async (_, filePath) => {
  try {
    shell.showItemInFolder(filePath);
    console.log('在资源管理器中显示:', filePath);
  } catch (error) {
    console.error('显示文件失败:', error);
    throw error;
  }
});

// 菜单已抽离到单独的文件中

// 当Electron完成初始化并准备创建浏览器窗口时调用此方法
app.whenReady().then(() => {
  // 设置原生主题为深色
  nativeTheme.themeSource = 'dark'
  
  // 配置自动更新
  autoUpdater.checkForUpdatesAndNotify()
  
  // 自动更新事件监听
  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...')
  })
  
  autoUpdater.on('update-available', (info) => {
    console.log('Update available.', info)
  })
  
  autoUpdater.on('update-not-available', (info) => {
    console.log('Update not available.', info)
  })
  
  autoUpdater.on('error', (err) => {
    console.log('Error in auto-updater. ' + err)
  })
  
  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')'
    console.log(log_message)
  })
  
  autoUpdater.on('update-downloaded', (info) => {
    console.log('Update downloaded', info)
    autoUpdater.quitAndInstall()
  })
  
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