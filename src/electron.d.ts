interface ElectronAPI {
  getFiles: (dirPath: string) => Promise<{name: string; isDirectory: boolean; path: string}[]>
  getFileContent: (filePath: string) => Promise<string>
  onOpenFolder: (callback: (folderPath: string) => void) => void
  openFolderDialog: () => Promise<string | null>
  onSelectedFolder: (callback: (folderPath: string) => void) => void
  createFile: (filePath: string, content: string) => Promise<void>
  createFolder: (folderPath: string) => Promise<void>
  deleteFile: (filePath: string) => Promise<void>
  deleteFolder: (folderPath: string) => Promise<void>
  showInExplorer: (filePath: string) => Promise<void>
  setNativeTheme: (theme: 'system' | 'light' | 'dark') => Promise<boolean>
  checkForUpdates: () => Promise<{ success: boolean; updateInfo?: any; error?: string }>
  getAppVersion: () => Promise<string>
}

declare interface Window {
  electronAPI: ElectronAPI;
}