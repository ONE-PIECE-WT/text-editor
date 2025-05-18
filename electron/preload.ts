// 使用ES模块语法
import { contextBridge, ipcRenderer } from 'electron';

// 暴露安全的API给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 文件系统操作
  getFiles: (dirPath) => ipcRenderer.invoke('get-files', dirPath),
  
  // 可以在这里添加更多的API
});