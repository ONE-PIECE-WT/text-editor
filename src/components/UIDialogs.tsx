import React from 'react';
import SettingsPanel from './SettingsPanel';
import ContextMenu from './ContextMenu';
import FileNameDialog from './FileNameDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import type { FileNode } from '../store/editorStore';

interface UIDialogsProps {
  // 设置面板
  isSettingsOpen: boolean;
  onSettingsClose: () => void;
  
  // 右键菜单
  contextMenu: {
    isVisible: boolean;
    x: number;
    y: number;
    targetNode: FileNode | null;
  };
  onContextMenuClose: () => void;
  onNewFile: (parentNode?: FileNode, fileType?: string) => void;
  onNewFolder: (parentNode?: FileNode) => void;
  onShowInExplorer: (node: FileNode) => void;
  onCut: (node: FileNode) => void;
  onCopy: (node: FileNode) => void;
  onCopyPath: (node: FileNode) => void;
  onCopyRelativePath: (node: FileNode) => void;
  onRename: (node: FileNode) => void;
  onDelete: (node: FileNode) => void;
  
  // 文件名输入弹窗
  fileNameDialog: {
    isVisible: boolean;
    fileType: string;
    parentNode: FileNode | null;
  };
  onFileNameConfirm: (fileName: string) => void;
  onFileNameCancel: () => void;
  
  // 删除确认弹窗
  deleteConfirmDialog: {
    isVisible: boolean;
    targetNode: FileNode | null;
  };
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
}

export const UIDialogs: React.FC<UIDialogsProps> = ({
  isSettingsOpen,
  onSettingsClose,
  contextMenu,
  onContextMenuClose,
  onNewFile,
  onNewFolder,
  onShowInExplorer,
  onCut,
  onCopy,
  onCopyPath,
  onCopyRelativePath,
  onRename,
  onDelete,
  fileNameDialog,
  onFileNameConfirm,
  onFileNameCancel,
  deleteConfirmDialog,
  onDeleteConfirm,
  onDeleteCancel
}) => {
  return (
    <>
      {/* 设置面板 */}
      <SettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={onSettingsClose} 
      />
      
      {/* 右键菜单 */}
      <ContextMenu
        isVisible={contextMenu.isVisible}
        x={contextMenu.x}
        y={contextMenu.y}
        targetNode={contextMenu.targetNode}
        onClose={onContextMenuClose}
        onNewFile={onNewFile}
        onNewFolder={onNewFolder}
        onShowInExplorer={onShowInExplorer}
        onCut={onCut}
        onCopy={onCopy}
        onCopyPath={onCopyPath}
        onCopyRelativePath={onCopyRelativePath}
        onRename={onRename}
        onDelete={onDelete}
      />
      
      {/* 文件名输入弹窗 */}
      <FileNameDialog
        isVisible={fileNameDialog.isVisible}
        fileType={fileNameDialog.fileType}
        onConfirm={onFileNameConfirm}
        onCancel={onFileNameCancel}
      />
      
      {/* 删除确认弹窗 */}
      <DeleteConfirmDialog
        isVisible={deleteConfirmDialog.isVisible}
        targetNode={deleteConfirmDialog.targetNode}
        onConfirm={onDeleteConfirm}
        onCancel={onDeleteCancel}
      />
    </>
  );
};