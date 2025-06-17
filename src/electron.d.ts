interface ElectronAPI {
  getFiles: (dirPath: string) => Promise<Array<{
    name: string;
    isDirectory: boolean;
    path: string;
  }>>;
  getFileContent: (filePath: string) => Promise<string>;
  onOpenFolder: (callback: () => void) => import('electron').IpcRenderer;
  openFolderDialog: () => void;
  onSelectedFolder: (callback: (folderPath: string) => void) => import('electron').IpcRenderer;
  createFile: (filePath: string, content: string) => Promise<void>;
  deleteFile: (filePath: string) => Promise<void>;
  showInExplorer: (filePath: string) => Promise<void>;
}

declare interface Window {
  electronAPI: ElectronAPI;
}