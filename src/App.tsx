import Editor from '@monaco-editor/react';
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
    leftPanelCollapsed, 
    rightPanelCollapsed,
    setSelectedFile,
    toggleLeftPanel,
    toggleRightPanel,
    toggleFolder
  } = useEditorStore();
  
  // 面板拖拽状态
  const [isLeftResizing, setIsLeftResizing] = useState(false);
  const [isRightResizing, setIsRightResizing] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(250);
  const [rightPanelWidth, setRightPanelWidth] = useState(250);
  
  // 使用useRef存储最新状态，避免循环依赖
  const isLeftResizingRef = React.useRef(false);
  const isRightResizingRef = React.useRef(false);
  
  // 设置CSS变量
  useEffect(() => {
    document.documentElement.style.setProperty('--left-panel-width', `${leftPanelWidth}px`);
    document.documentElement.style.setProperty('--right-panel-width', `${rightPanelWidth}px`);
  }, [leftPanelWidth, rightPanelWidth]);

  // 拖拽左侧面板
  const handleLeftResize = useCallback((e: MouseEvent) => {
    if (isLeftResizingRef.current) {
      const newWidth = Math.max(180, Math.min(400, e.clientX));
      setLeftPanelWidth(newWidth);
      e.preventDefault();
    }
  }, []);

  // 停止拖拽左侧面板
  const stopLeftResize = useCallback(() => {
    setIsLeftResizing(false);
    isLeftResizingRef.current = false;
    document.removeEventListener('mousemove', handleLeftResize);
    document.removeEventListener('mouseup', stopLeftResize);
  }, []);
  
  // 开始拖拽左侧面板
  const startLeftResize = (e: React.MouseEvent) => {
    setIsLeftResizing(true);
    isLeftResizingRef.current = true;
    document.addEventListener('mousemove', handleLeftResize);
    document.addEventListener('mouseup', stopLeftResize);
    e.preventDefault();
  };

  // 拖拽右侧面板
  const handleRightResize = useCallback((e: MouseEvent) => {
    if (isRightResizingRef.current) {
      const windowWidth = window.innerWidth;
      const newWidth = windowWidth - e.clientX - 48; // 减去右侧工具栏宽度
      const clampedWidth = Math.max(180, Math.min(400, newWidth));
      setRightPanelWidth(clampedWidth);
      e.preventDefault();
    }
  }, []);

  // 停止拖拽右侧面板
  const stopRightResize = useCallback(() => {
    setIsRightResizing(false);
    isRightResizingRef.current = false;
    document.removeEventListener('mousemove', handleRightResize);
    document.removeEventListener('mouseup', stopRightResize);
  }, []);
  
  // 开始拖拽右侧面板
  const startRightResize = (e: React.MouseEvent) => {
    setIsRightResizing(true);
    isRightResizingRef.current = true;
    document.addEventListener('mousemove', handleRightResize);
    document.addEventListener('mouseup', stopRightResize);
    e.preventDefault();
  };

  // 处理文件/文件夹点击
  const handleNodeClick = (node: FileNode) => {
    if (node.type === 'folder') {
      toggleFolder(node);
    } else {
      setSelectedFile(node);
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
    <div className="app-container">
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
        {selectedFile ? (
          <>
            <div className="editor-header">
              <span>{selectedFile.name}</span>
            </div>
            <div className="editor-container">
              <Editor
                height="100%"
                defaultLanguage={selectedFile.name.endsWith('.tsx') || selectedFile.name.endsWith('.ts') ? 'typescript' : 'javascript'}
                defaultValue={selectedFile.content || ''}
                theme="vs-dark"
                options={{
                  minimap: { enabled: true },
                  fontSize: 14,
                  wordWrap: 'on',
                  automaticLayout: true,
                }}
              />
            </div>
          </>
        ) : (
          <div className="empty-editor">
            <p>请从左侧文件树中选择一个文件</p>
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
