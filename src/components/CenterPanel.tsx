import React, { useState } from 'react';
import EditorTabs from './EditorTabs';
import CodeMirrorEditor from './CodeMirrorEditor';
import CSGRenderer from './CSGRenderer';
import type { FileNode } from '../store/editorStore';
import { getFileLanguage } from '../utils/fileLanguage';

interface CenterPanelProps {
  openTabs: FileNode[];
  activeTabIndex: number;
  selectedFile: FileNode | null;
  fileTree: FileNode[];
  onTabClick: (index: number) => void;
  onTabClose: (index: number) => void;
  onEditorChange: (value: string) => void;
  onFilePathComplete: (partialPath: string) => Promise<string[]>;
}

const CenterPanel: React.FC<CenterPanelProps> = ({
  openTabs,
  activeTabIndex,
  selectedFile,
  fileTree,
  onTabClick,
  onTabClose,
  onEditorChange,
  onFilePathComplete
}) => {
  // CSG文件预览模式状态
  const [csgPreviewMode, setCsgPreviewMode] = useState(false);
  
  const isCSGFile = selectedFile && getFileLanguage(selectedFile.name) === 'csg';
  
  return (
    <div className="center-panel">
      {openTabs.length > 0 ? (
        <>
          <EditorTabs
            openTabs={openTabs}
            activeTabIndex={activeTabIndex}
            onTabClick={onTabClick}
            onTabClose={onTabClose}
          />
          <div className="editor-container">
            {isCSGFile && (
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
            
            {isCSGFile && csgPreviewMode ? (
              <CSGRenderer 
                content={selectedFile?.content || ''}
                basePath={fileTree[0]?.path || ''}
              />
            ) : (
              <CodeMirrorEditor
                value={selectedFile?.content || ''}
                language={selectedFile ? getFileLanguage(selectedFile.name) : 'javascript'}
                onChange={onEditorChange}
                onFilePathComplete={onFilePathComplete}
              />
            )}
          </div>
        </>
      ) : (
        <div className="welcome-screen">
          <h2>欢迎使用文本编辑器</h2>
          <p>请从左侧文件树中选择一个文件开始编辑</p>
        </div>
      )}
    </div>
  );
};

export default CenterPanel;