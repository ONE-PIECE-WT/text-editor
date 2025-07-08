import { useEffect } from 'react';
import { useEditorStore } from '../store/editorStore';
import { useStateSync } from '../services/stateSync';

export const useWorkspace = () => {
  const stateSync = useStateSync();
  const { setFileTree } = useEditorStore();

  // 应用启动时恢复工作区
  useEffect(() => {
    const restoreWorkspace = async () => {
      const lastWorkspacePath = stateSync.getLastWorkspacePath();
      if (lastWorkspacePath) {
        console.log('恢复上次工作区:', lastWorkspacePath);
        try {
          // 获取文件夹内容
          const files = await window.electronAPI.getFiles(lastWorkspacePath);
          
          // 将文件系统内容转换为文件树结构
          const fileTree = [
            {
              id: lastWorkspacePath, // 使用路径作为ID
              name: lastWorkspacePath.split('\\').pop() || '根目录',
              type: 'folder' as const,
              path: lastWorkspacePath,
              expanded: true,
              children: files.map((file) => ({
                id: file.path, // 使用路径作为ID
                name: file.name,
                type: file.isDirectory ? 'folder' as const : 'file' as const,
                path: file.path,
                expanded: false,
              }))
            }
          ];
          
          // 更新文件树状态
          setFileTree(fileTree);
          
          console.log('工作区恢复成功');
        } catch (error) {
          console.error('恢复工作区失败:', error);
        }
      }
    };
    
    // 启动时恢复工作区
    restoreWorkspace();
  }, []); // 移除依赖项，只在组件挂载时执行一次

  // 监听打开文件夹事件
  useEffect(() => {
    // 定义事件处理函数
    const handleOpenFolder = () => {
      console.log('打开文件夹菜单被点击');
      // 调用打开文件夹对话框
      window.electronAPI.openFolderDialog();
    };
    
    const handleSelectedFolder = async (folderPath: string) => {
      console.log('选择的文件夹路径:', folderPath);
      
      try {
        // 检查文件夹路径是否有效
        if (!folderPath) {
          console.error('无效的文件夹路径');
          return;
        }
        
        // 获取文件夹内容
        const files = await window.electronAPI.getFiles(folderPath);
        console.log('文件夹内容:', files);
        
        // 将文件系统内容转换为文件树结构
        const fileTree = [
          {
            id: folderPath,
            name: folderPath.split('\\').pop() || '根目录',
            type: 'folder' as const,
            path: folderPath,
            expanded: true,
            children: files.map((file) => ({
              id: file.path,
              name: file.name,
              type: file.isDirectory ? 'folder' as const : 'file' as const,
              path: file.path,
              expanded: false,
            }))
          }
        ];
        
        // 更新文件树状态
        setFileTree(fileTree);
        
        // 保存工作区路径
        stateSync.saveWorkspacePath(folderPath);
        
        console.log('文件树已更新:', fileTree);
      } catch (error) {
        console.error('处理选择文件夹失败:', error);
      }
    };
    
    // 注册事件监听器
    if (window.electronAPI?.onOpenFolder) {
      window.electronAPI.onOpenFolder(handleOpenFolder);
    }
    
    if (window.electronAPI?.onSelectedFolder) {
      window.electronAPI.onSelectedFolder(handleSelectedFolder);
    }
    
    // 清理函数
    return () => {
      // 如果有移除监听器的方法，在这里调用
      // window.electronAPI?.removeOpenFolderListener?.(handleOpenFolder);
      // window.electronAPI?.removeSelectedFolderListener?.(handleSelectedFolder);
    };
  }, []); // 移除依赖项，只在组件挂载时注册一次事件监听器
};