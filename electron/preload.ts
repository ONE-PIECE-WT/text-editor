// 使用ES模块语法
import { contextBridge, ipcRenderer } from 'electron';

// 暴露安全的API给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 文件系统操作
  getFiles: (dirPath) => ipcRenderer.invoke('get-files', dirPath),
  
  // 打开文件夹对话框
  onOpenFolder: (callback) => {
    // 移除所有现有的监听器，避免重复
    ipcRenderer.removeAllListeners('open-folder');
    // 添加新的监听器
    return ipcRenderer.on('open-folder', () => callback());
  },
  openFolderDialog: () => ipcRenderer.send('open-folder-dialog'),
  onSelectedFolder: (callback) => {
    // 移除所有现有的监听器，避免重复
    ipcRenderer.removeAllListeners('selected-folder');
    // 添加新的监听器
    return ipcRenderer.on('selected-folder', (_event, folderPath) => callback(folderPath));
  },
  
  // 可以在这里添加更多的API
});