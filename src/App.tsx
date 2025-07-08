import { useState, useEffect } from 'react';
import { useEditorStore } from './store/editorStore';
import { useStateSync } from './services/stateSync';
import { useWindowState } from './hooks/useWindowState';
import { useWorkspace } from './hooks/useWorkspace';
import { useFileOperations } from './hooks/useFileOperations';
import { usePanelResize } from './hooks/usePanelResize';
import { handleFilePathComplete } from './utils/filePathCompletion';
import AppLayout from './components/AppLayout';
import './App.css';

function App() {
  // 使用Zustand状态管理
  const { 
    fileTree, 
    selectedFile, 
    openTabs,
    activeTabIndex,
    leftPanelCollapsed, 
    rightPanelCollapsed,
    closeTab,
    setActiveTab,
    toggleLeftPanel,
    toggleRightPanel,
    updateFileContent
  } = useEditorStore();
  
  // 状态同步服务
  const stateSync = useStateSync();
  
  // 窗口状态管理
  useWindowState();
  
  // 工作区管理
  useWorkspace();
  
  // 文件操作
  const {
    contextMenu,
    fileNameDialog,
    deleteConfirmDialog,
    handleNodeClick,
    handleContextMenu,
    closeContextMenu,
    handleNewFile,
    handleNewFolder,
    handleShowInExplorer,
    handleCut,
    handleCopy,
    handleCopyPath,
    handleCopyRelativePath,
    handleRename,
    handleDelete,
    handleFileNameConfirm,
    handleFileNameCancel,
    handleDeleteConfirm,
    handleDeleteCancel
  } = useFileOperations();
  
  // 应用主题到document和原生主题
  useEffect(() => {
    const settings = stateSync.getEditorSettings();
    const theme = settings?.theme || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    
    // 同步设置原生主题
    if (window.electronAPI?.setNativeTheme) {
      window.electronAPI.setNativeTheme(theme);
    }
  }, []);
  
  // 监听主题设置变化
  useEffect(() => {
    // 监听设置变化事件（如果有的话）
    // 这里可以添加事件监听器，或者通过其他方式监听设置变化
    
    return () => {
      // 清理事件监听器
    };
  }, [stateSync]);
  
  // 使用面板调整大小Hook
  const { isLeftResizing, isRightResizing, startLeftResize, startRightResize } = usePanelResize();

  // 设置面板状态
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // 文件路径补全处理函数
  const handleFilePathCompleteWrapper = async (partialPath: string): Promise<string[]> => {
    const currentFolder = fileTree[0]?.path || '';
    return handleFilePathComplete(partialPath, currentFolder);
  };
  
  // 编辑器内容变更处理
  const handleEditorChange = (value: string) => {
    if (selectedFile) {
      updateFileContent(selectedFile.id, value);
    }
  };



  return (
    <AppLayout
      // 状态
      fileTree={fileTree}
      selectedFile={selectedFile}
      openTabs={openTabs}
      activeTabIndex={activeTabIndex}
      leftPanelCollapsed={leftPanelCollapsed}
      rightPanelCollapsed={rightPanelCollapsed}
      isResizing={isLeftResizing || isRightResizing}
      isSettingsOpen={isSettingsOpen}
      contextMenu={contextMenu}
      fileNameDialog={fileNameDialog}
      deleteConfirmDialog={deleteConfirmDialog}
      
      // 事件处理函数
      onToggleLeftPanel={toggleLeftPanel}
      onToggleRightPanel={toggleRightPanel}
      onOpenSettings={() => setIsSettingsOpen(true)}
      onCloseSettings={() => setIsSettingsOpen(false)}
      onTabClick={setActiveTab}
      onTabClose={closeTab}
      onNodeClick={handleNodeClick}
      onContextMenu={handleContextMenu}
      onStartLeftResize={startLeftResize}
      onStartRightResize={startRightResize}
      onEditorChange={handleEditorChange}
      onFilePathComplete={handleFilePathCompleteWrapper}
      
      // 文件操作回调
      onContextMenuClose={closeContextMenu}
      onNewFile={handleNewFile}
      onNewFolder={handleNewFolder}
      onShowInExplorer={handleShowInExplorer}
      onCut={handleCut}
      onCopy={handleCopy}
      onCopyPath={handleCopyPath}
      onCopyRelativePath={handleCopyRelativePath}
      onRename={handleRename}
      onDelete={handleDelete}
      onFileNameConfirm={handleFileNameConfirm}
      onFileNameCancel={handleFileNameCancel}
      onDeleteConfirm={handleDeleteConfirm}
      onDeleteCancel={handleDeleteCancel}
    />
  )
}

export default App
