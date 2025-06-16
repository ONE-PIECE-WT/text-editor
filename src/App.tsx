import CodeMirrorEditor from './components/CodeMirrorEditor';
import CSGRenderer from './components/CSGRenderer';
import React, { useState, useEffect, useCallback } from 'react';
import { FaFolder, FaFile, FaChevronRight, FaChevronDown, FaCog } from 'react-icons/fa';
import { useEditorStore } from './store/editorStore';
import type { FileNode } from './store/editorStore';
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
    setSelectedFile,
    openFile,
    closeTab,
    setActiveTab,
    toggleLeftPanel,
    toggleRightPanel,
    toggleFolder
  } = useEditorStore();
  
  // 根据文件扩展名获取语言类型
  const getFileLanguage = (fileName: string): string => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      case 'csg':
        return 'csg'; // 自定义文件类型
      default:
        return 'javascript';
    }
  };

  // CSG文件预览模式状态
  const [csgPreviewMode, setCsgPreviewMode] = useState(false);
  

  
  // 处理文件路径自动补全
  const handleFilePathComplete = async (partialPath: string): Promise<string[]> => {
    try {
      // 如果是相对路径，基于当前打开的文件夹
      const currentFolder = fileTree[0]?.path || '';
      const targetPath = partialPath.startsWith('/') || partialPath.includes(':') 
        ? partialPath 
        : `${currentFolder}/${partialPath}`;
      
      // 获取目标路径下的文件列表
      const files = await window.electronAPI.getFiles(targetPath);
      return files.map(file => file.name);
    } catch (error) {
      console.error('获取文件路径补全失败:', error);
      return [];
    }
  };
  
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
            id: 'root',
            name: folderPath.split('\\').pop() || '根目录',
            type: 'folder' as const,
            path: folderPath, // 保存完整路径，便于后续操作
            expanded: true,
            children: files.map((file, index) => ({
              id: `file-${index}`,
              name: file.name,
              type: file.isDirectory ? 'folder' as const : 'file' as const,
              path: file.path,
              expanded: false,
              // 如果是文件夹，可以在点击时加载其子内容
            }))
          }
        ];
        
        // 更新文件树状态
        useEditorStore.getState().setFileTree(fileTree);
        
        // 显示成功消息
        console.log(`成功加载文件夹: ${folderPath}`);
      } catch (error) {
        console.error('加载文件夹内容失败:', error);
      }
    };
    
    // 监听菜单触发的打开文件夹事件
    window.electronAPI.onOpenFolder(handleOpenFolder);
    
    // 监听选择的文件夹路径
    window.electronAPI.onSelectedFolder(handleSelectedFolder);
    
    // 组件卸载时清理事件监听
    return () => {
      // 由于我们使用了ipcRenderer.on，Electron会自动管理这些监听器
      // 但最好的做法是在组件卸载时显式移除它们
      // 这需要在preload.ts中提供相应的移除方法
    };
  }, []);
  
  // 面板拖拽状态
  const [isLeftResizing, setIsLeftResizing] = useState(false);
  const [isRightResizing, setIsRightResizing] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(250);
  const [rightPanelWidth, setRightPanelWidth] = useState(250);
  
  // 使用useRef存储最新状态，避免循环依赖
  const isLeftResizingRef = React.useRef(false);
  const isRightResizingRef = React.useRef(false);
  
  // 拖拽起始状态
  const dragStartRef = React.useRef({ startX: 0, startWidth: 0 });
  
  // 设置CSS变量
  useEffect(() => {
    document.documentElement.style.setProperty('--left-panel-width', `${leftPanelWidth}px`);
    document.documentElement.style.setProperty('--right-panel-width', `${rightPanelWidth}px`);
  }, [leftPanelWidth, rightPanelWidth]);

  // 拖拽左侧面板
  const handleLeftResize = useCallback((e: MouseEvent) => {
    if (isLeftResizingRef.current) {
      const deltaX = e.clientX - dragStartRef.current.startX;
      const windowWidth = window.innerWidth;
      const rightPanelCurrentWidth = rightPanelCollapsed ? 0 : rightPanelWidth;
      const maxAllowedWidth = windowWidth - rightPanelCurrentWidth - 96 - 300; // 保留300px给中间面板
      const newWidth = Math.max(180, Math.min(maxAllowedWidth, dragStartRef.current.startWidth + deltaX));
      setLeftPanelWidth(newWidth);
      e.preventDefault();
    }
  }, [rightPanelWidth, rightPanelCollapsed]);

  // 停止拖拽左侧面板
  const stopLeftResize = useCallback(() => {
    setIsLeftResizing(false);
    isLeftResizingRef.current = false;
    document.removeEventListener('mousemove', handleLeftResize);
    document.removeEventListener('mouseup', stopLeftResize);
  }, [handleLeftResize]);
  
  // 开始拖拽左侧面板
  const startLeftResize = (e: React.MouseEvent) => {
    dragStartRef.current = {
      startX: e.clientX,
      startWidth: leftPanelWidth
    };
    setIsLeftResizing(true);
    isLeftResizingRef.current = true;
    document.addEventListener('mousemove', handleLeftResize);
    document.addEventListener('mouseup', stopLeftResize);
    e.preventDefault();
  };

  // 拖拽右侧面板
  const handleRightResize = useCallback((e: MouseEvent) => {
    if (isRightResizingRef.current) {
      const deltaX = dragStartRef.current.startX - e.clientX; // 右侧面板向左拖拽时deltaX为正
      const windowWidth = window.innerWidth;
      const leftPanelCurrentWidth = leftPanelCollapsed ? 0 : leftPanelWidth;
      const maxAllowedWidth = windowWidth - leftPanelCurrentWidth - 96 - 300; // 保留300px给中间面板
      const newWidth = Math.max(180, Math.min(Math.min(400, maxAllowedWidth), dragStartRef.current.startWidth + deltaX));
      setRightPanelWidth(newWidth);
      e.preventDefault();
    }
  }, [leftPanelWidth, leftPanelCollapsed]);

  // 停止拖拽右侧面板
  const stopRightResize = useCallback(() => {
    setIsRightResizing(false);
    isRightResizingRef.current = false;
    document.removeEventListener('mousemove', handleRightResize);
    document.removeEventListener('mouseup', stopRightResize);
  }, [handleRightResize]);
  
  // 开始拖拽右侧面板
  const startRightResize = (e: React.MouseEvent) => {
    dragStartRef.current = {
      startX: e.clientX,
      startWidth: rightPanelWidth
    };
    setIsRightResizing(true);
    isRightResizingRef.current = true;
    document.addEventListener('mousemove', handleRightResize);
    document.addEventListener('mouseup', stopRightResize);
    e.preventDefault();
  };

  // 处理文件/文件夹点击
  const handleNodeClick = async (node: FileNode) => {
    if (node.type === 'folder') {
      toggleFolder(node);
      
      // 如果是文件夹且有path属性，且没有加载过子内容（没有children或children为空数组）
      if (node.path && (!node.children || node.children.length === 0)) {
        try {
          // 获取文件夹内容
          const files = await window.electronAPI.getFiles(node.path);
          console.log(`加载文件夹 ${node.path} 内容:`, files);
          
          // 将文件系统内容转换为文件树结构
          const children = files.map((file, index) => ({
            id: `${node.id}-child-${index}`,
            name: file.name,
            type: file.isDirectory ? 'folder' as const : 'file' as const,
            path: file.path,
            expanded: false,
          }));
          
          // 更新节点的子内容
          const updateNodeChildren = (nodes: FileNode[]): FileNode[] => {
            return nodes.map(n => {
              if (n.id === node.id) {
                return { ...n, children };
              }
              if (n.children) {
                return { ...n, children: updateNodeChildren(n.children) };
              }
              return n;
            });
          };
          
          // 更新文件树状态
          const currentFileTree = useEditorStore.getState().fileTree;
          useEditorStore.getState().setFileTree(updateNodeChildren(currentFileTree));
        } catch (error) {
          console.error(`加载文件夹 ${node.path} 内容失败:`, error);
        }
      }
    } else {
      // 点击文件时，获取文件内容并打开标签页
      if (window.electronAPI && node.path) {
        try {
          const content = await window.electronAPI.getFileContent(node.path);
          const fileWithContent = { ...node, content };
          openFile(fileWithContent);
        } catch (error) {
          console.error(`读取文件 ${node.path} 内容失败:`, error);
          // 即使读取失败，也打开文件节点，但没有内容
          openFile(node);
        }
      } else {
        openFile(node);
      }
    }
  };

  // 递归渲染文件树
  const renderFileTree = (nodes: FileNode[]) => {
    return (
      <ul className="file-tree">
        {nodes.map(node => (
          <li key={node.id} className={`file-tree-item ${node.type}`}>
            <div 
              className={`file-tree-item-content ${selectedFile?.id === node.id ? 'selected' : ''}`}
              onClick={() => handleNodeClick(node)}
            >
              {node.type === 'folder' ? (
                <>
                  <span className="icon">
                    {node.expanded ? <FaChevronDown /> : <FaChevronRight />}
                  </span>
                  <span className="folder-icon"><FaFolder /></span>
                </>
              ) : (
                <span className="file-icon"><FaFile /></span>
              )}
              <span className="name">{node.name}</span>
            </div>
            {node.type === 'folder' && node.expanded && node.children && renderFileTree(node.children)}
          </li>
        ))}
      </ul>
    );
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
          {renderFileTree(fileTree)}
        </div>
        {!leftPanelCollapsed && <div className="panel-resizer" onMouseDown={startLeftResize}></div>}
      </div>

      {/* 中间面板 - 编辑器 */}
      <div className="center-panel">
        {openTabs.length > 0 ? (
          <>
            <div className="editor-header">
              <div className="tabs-container">
                {openTabs.map((tab, index) => (
                  <div 
                    key={tab.id}
                    className={`tab ${index === activeTabIndex ? 'active' : ''}`}
                    onClick={() => setActiveTab(index)}
                  >
                    <span className="tab-name">{tab.name}</span>
                    <button 
                      className="tab-close"
                      onClick={(e) => {
                        e.stopPropagation();
                        closeTab(index);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="editor-container">
              {getFileLanguage(selectedFile.name) === 'csg' && (
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
              
              {getFileLanguage(selectedFile.name) === 'csg' && csgPreviewMode ? (
                <CSGRenderer 
                  content={selectedFile.content || ''}
                  basePath={fileTree[0]?.path || ''}
                />
              ) : (
                <CodeMirrorEditor
                  value={selectedFile.content || ''}
                  language={getFileLanguage(selectedFile.name)}
                  onChange={(value) => {
                    // 可以在这里添加文件内容变更处理
                    console.log('文件内容已变更:', value);
                  }}
                  onFilePathComplete={handleFilePathComplete}
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
      </div>
    </div>
  )
}

export default App
