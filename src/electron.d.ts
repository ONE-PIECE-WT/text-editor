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
}

declare interface Window {
  electronAPI: ElectronAPI;
}