import React from 'react';
import FileTree from './FileTree';
import type { FileNode } from '../store/editorStore';

interface LeftPanelProps {
  leftPanelCollapsed: boolean;
  fileTree: FileNode[];
  selectedFile: FileNode | null;
  onNodeClick: (node: FileNode) => void;
  onContextMenu: (e: React.MouseEvent, node: FileNode) => void;
  onStartResize: (e: React.MouseEvent) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  leftPanelCollapsed,
  fileTree,
  selectedFile,
  onNodeClick,
  onContextMenu,
  onStartResize
}) => {
  return (
    <div className={`left-panel ${leftPanelCollapsed ? 'collapsed' : ''}`}>
      <div className="panel-header">
        <h3>文件浏览器</h3>
      </div>
      <div className="panel-content">
        {fileTree.length > 0 ? (
          <FileTree
            fileTree={fileTree}
            selectedFile={selectedFile}
            onNodeClick={onNodeClick}
            onContextMenu={onContextMenu}
          />
        ) : (
          <div className="empty-tree">
            <p>请打开一个文件夹</p>
          </div>
        )}
      </div>
      {!leftPanelCollapsed && (
        <div className="panel-resizer" onMouseDown={onStartResize}></div>
      )}
    </div>
  );
};

export default LeftPanel;