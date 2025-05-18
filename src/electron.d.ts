interface ElectronAPI {
  getFiles: (dirPath: string) => Promise<Array<{
    name: string;
    isDirectory: boolean;
    path: string;
  }>>;
}

declare interface Window {
  electronAPI: ElectronAPI;
}