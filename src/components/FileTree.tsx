import React from 'react';
import { FaFolder, FaFile, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import type { FileNode } from '../store/editorStore';

interface FileTreeProps {
  fileTree: FileNode[];
  selectedFile: FileNode | null;
  onNodeClick: (node: FileNode) => void;
  onContextMenu: (e: React.MouseEvent, node: FileNode) => void;
}

const FileTree: React.FC<FileTreeProps> = ({
  fileTree,
  selectedFile,
  onNodeClick,
  onContextMenu
}) => {
  const renderFileTree = (nodes: FileNode[]): React.ReactElement => {
    return (
      <ul className="file-tree">
        {nodes.map(node => (
          <li key={node.id} className={`file-tree-item ${node.type}`}>
            <div 
              className={`file-tree-item-content ${selectedFile?.id === node.id ? 'selected' : ''}`}
              onClick={() => onNodeClick(node)}
              onContextMenu={(e) => onContextMenu(e, node)}
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
    <div className="panel-content">
      {renderFileTree(fileTree)}
    </div>
  );
};

export default FileTree;