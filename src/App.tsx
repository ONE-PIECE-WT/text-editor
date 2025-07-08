import { useState, useEffect } from 'react';
import { FaFolder, FaCog, FaWrench } from 'react-icons/fa';
import { useEditorStore } from './store/editorStore';
import { useStateSync } from './services/stateSync';
import { useWindowState } from './hooks/useWindowState';
import { useWorkspace } from './hooks/useWorkspace';
import { useFileOperations } from './hooks/useFileOperations';
import { usePanelResize } from './hooks/usePanelResize';
import { handleFilePathComplete } from './utils/filePathCompletion';
import { getFileLanguage } from './utils/fileLanguage';
import CSGRenderer from './components/CSGRenderer';
import CodeMirrorEditor from './components/CodeMirrorEditor';
import FileTree from './components/FileTree';
import EditorTabs from './components/EditorTabs';
import { UIDialogs } from './components/UIDialogs';
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
    toggleRightPanel
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

  // CSG文件预览模式状态
  const [csgPreviewMode, setCsgPreviewMode] = useState(false);
  
  // 设置面板状态
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // 文件路径补全处理函数
  const handleFilePathCompleteWrapper = async (partialPath: string): Promise<string[]> => {
    const currentFolder = fileTree[0]?.path || '';
    return handleFilePathComplete(partialPath, currentFolder);
  };



  return (
    <div className={`app-container ${(isLeftResizing || isRightResizing) ? 'resizing' : ''}`}>
      {/* 左侧工具栏 */}
      <div className="sidebar left-sidebar">
        <div 
          className={`sidebar-icon ${!leftPanelCollapsed ? 'active' : ''}`} 
          onClick={toggleLeftPanel} 
          title="文件浏览器"
        >
          <FaFolder />
        </div>
      </div>

      {/* 左侧面板 - 文件树 */}
      <div className={`left-panel ${leftPanelCollapsed ? 'collapsed' : ''}`}>
        <div className="panel-header">
          <h3>文件浏览器</h3>
        </div>
        <div className="panel-content">
          {fileTree.length > 0 ? (
            <FileTree
              fileTree={fileTree}
              selectedFile={selectedFile}
              onNodeClick={handleNodeClick}
              onContextMenu={handleContextMenu}
            />
          ) : (
            <div className="empty-tree">
              <p>请打开一个文件夹</p>
            </div>
          )}
        </div>
        {!leftPanelCollapsed && <div className="panel-resizer" onMouseDown={startLeftResize}></div>}
      </div>

      {/* 中间面板 - 编辑器 */}
      <div className="center-panel">
        {openTabs.length > 0 ? (
          <>
            <EditorTabs
              openTabs={openTabs}
              activeTabIndex={activeTabIndex}
              onTabClick={setActiveTab}
              onTabClose={closeTab}
            />
            <div className="editor-container">
              {selectedFile && getFileLanguage(selectedFile.name) === 'csg' && (
                <div style={{ 
                  padding: '8px 16px', 
                  backgroundColor: '#2d2d2d', 
                  borderBottom: '1px solid #3c3c3c',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ color: '#e0e0e0', fontSize: '14px' }}>CSG文件:</span>
                  <button
                    onClick={() => setCsgPreviewMode(false)}
                    style={{
                      padding: '4px 12px',
                      backgroundColor: !csgPreviewMode ? '#007acc' : '#3c3c3c',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    编辑模式
                  </button>
                  <button
                    onClick={() => setCsgPreviewMode(true)}
                    style={{
                      padding: '4px 12px',
                      backgroundColor: csgPreviewMode ? '#007acc' : '#3c3c3c',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    预览模式
                  </button>
                </div>
              )}
              
              {selectedFile && getFileLanguage(selectedFile.name) === 'csg' && csgPreviewMode ? (
                <CSGRenderer 
                  content={selectedFile?.content || ''}
                  basePath={fileTree[0]?.path || ''}
                />
              ) : (
                <CodeMirrorEditor
                  value={selectedFile?.content || ''}
                  language={selectedFile ? getFileLanguage(selectedFile.name) : 'javascript'}
                  onChange={(_value) => {
                    // 可以在这里添加文件内容变更处理
                    // console.log('文件内容已变更:', _value);
                  }}
                  onFilePathComplete={handleFilePathCompleteWrapper}
                />
              )}
            </div>
          </>
        ) : (
          <div className="empty-editor">
            <p>请从左侧文件树中打开一个文件</p>
          </div>
        )}
      </div>

      {/* 右侧面板 - 扩展功能 */}
      <div className={`right-panel ${rightPanelCollapsed ? 'collapsed' : ''}`}>
        <div className="panel-header">
          <h3>扩展面板</h3>
        </div>
        <div className="panel-content">
          <div className="extension-item">
            <h4>智能补全</h4>
            <p>支持中文拼音匹配</p>
          </div>
          <div className="extension-item">
            <h4>文件监听</h4>
            <p>实时监控文件变化</p>
          </div>
        </div>
        {!rightPanelCollapsed && <div className="panel-resizer" onMouseDown={startRightResize}></div>}
      </div>
      
      {/* 右侧工具栏 */}
      <div className="sidebar right-sidebar">
        <div 
          className={`sidebar-icon ${!rightPanelCollapsed ? 'active' : ''}`} 
          onClick={toggleRightPanel} 
          title="扩展面板"
        >
          <FaCog />
        </div>
        <div 
          className="sidebar-icon" 
          onClick={() => setIsSettingsOpen(true)} 
          title="设置"
        >
          <FaWrench />
        </div>
      </div>
      
      {/* UI弹窗组件 */}
      <UIDialogs
        isSettingsOpen={isSettingsOpen}
        onSettingsClose={() => setIsSettingsOpen(false)}
        contextMenu={contextMenu}
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
        fileNameDialog={fileNameDialog}
        onFileNameConfirm={handleFileNameConfirm}
        onFileNameCancel={handleFileNameCancel}
        deleteConfirmDialog={deleteConfirmDialog}
        onDeleteConfirm={handleDeleteConfirm}
        onDeleteCancel={handleDeleteCancel}
      />
    </div>
  )
}

export default App
