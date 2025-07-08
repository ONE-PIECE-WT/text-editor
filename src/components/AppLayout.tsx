import React from 'react';
import LeftSidebar from './LeftSidebar';
import LeftPanel from './LeftPanel';
import CenterPanel from './CenterPanel';
import RightPanel from './RightPanel';
import RightSidebar from './RightSidebar';
import { UIDialogs } from './UIDialogs';
import type { FileNode } from '../store/editorStore';

interface AppLayoutProps {
  // 状态
  fileTree: FileNode[];
  selectedFile: FileNode | null;
  openTabs: FileNode[];
  activeTabIndex: number;
  leftPanelCollapsed: boolean;
  rightPanelCollapsed: boolean;
  isResizing: boolean;
  isSettingsOpen: boolean;
  
  // 文件操作相关
  contextMenu: {
    isVisible: boolean;
    x: number;
    y: number;
    targetNode: FileNode | null;
  };
  fileNameDialog: {
    isVisible: boolean;
    fileType: string;
    parentNode: FileNode | null;
  };
  deleteConfirmDialog: {
    isVisible: boolean;
    targetNode: FileNode | null;
  };
  
  // 事件处理函数
  onToggleLeftPanel: () => void;
  onToggleRightPanel: () => void;
  onOpenSettings: () => void;
  onCloseSettings: () => void;
  onTabClick: (index: number) => void;
  onTabClose: (index: number) => void;
  onNodeClick: (node: FileNode) => void;
  onContextMenu: (e: React.MouseEvent, node: FileNode) => void;
  onStartLeftResize: (e: React.MouseEvent) => void;
  onStartRightResize: (e: React.MouseEvent) => void;
  onEditorChange: (value: string) => void;
  onFilePathComplete: (partialPath: string) => Promise<string[]>;
  
  // 文件操作回调
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
  onFileNameConfirm: (fileName: string) => void;
  onFileNameCancel: () => void;
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  // 状态
  fileTree,
  selectedFile,
  openTabs,
  activeTabIndex,
  leftPanelCollapsed,
  rightPanelCollapsed,
  isResizing,
  isSettingsOpen,
  contextMenu,
  fileNameDialog,
  deleteConfirmDialog,
  
  // 事件处理函数
  onToggleLeftPanel,
  onToggleRightPanel,
  onOpenSettings,
  onCloseSettings,
  onTabClick,
  onTabClose,
  onNodeClick,
  onContextMenu,
  onStartLeftResize,
  onStartRightResize,
  onEditorChange,
  onFilePathComplete,
  
  // 文件操作回调
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
  onFileNameConfirm,
  onFileNameCancel,
  onDeleteConfirm,
  onDeleteCancel
}) => {
  return (
    <div className={`app-container ${isResizing ? 'resizing' : ''}`}>
      {/* 左侧工具栏 */}
      <LeftSidebar
        leftPanelCollapsed={leftPanelCollapsed}
        onToggleLeftPanel={onToggleLeftPanel}
        onOpenSettings={onOpenSettings}
      />

      {/* 左侧面板 - 文件树 */}
      <LeftPanel
        leftPanelCollapsed={leftPanelCollapsed}
        fileTree={fileTree}
        selectedFile={selectedFile}
        onNodeClick={onNodeClick}
        onContextMenu={onContextMenu}
        onStartResize={onStartLeftResize}
      />

      {/* 中间面板 - 编辑器 */}
      <CenterPanel
        openTabs={openTabs}
        activeTabIndex={activeTabIndex}
        selectedFile={selectedFile}
        fileTree={fileTree}
        onTabClick={onTabClick}
        onTabClose={onTabClose}
        onEditorChange={onEditorChange}
        onFilePathComplete={onFilePathComplete}
      />

      {/* 右侧面板 - 扩展功能 */}
      <RightPanel
        rightPanelCollapsed={rightPanelCollapsed}
        onStartResize={onStartRightResize}
      />
      
      {/* 右侧工具栏 */}
      <RightSidebar
        rightPanelCollapsed={rightPanelCollapsed}
        onToggleRightPanel={onToggleRightPanel}
        onOpenSettings={onOpenSettings}
      />

      {/* UI弹窗组件 */}
      <UIDialogs
        isSettingsOpen={isSettingsOpen}
        onSettingsClose={onCloseSettings}
        contextMenu={contextMenu}
        onContextMenuClose={onContextMenuClose}
        onNewFile={onNewFile}
        onNewFolder={onNewFolder}
        onShowInExplorer={onShowInExplorer}
        onCut={onCut}
        onCopy={onCopy}
        onCopyPath={onCopyPath}
        onCopyRelativePath={onCopyRelativePath}
        onRename={onRename}
        onDelete={onDelete}
        fileNameDialog={fileNameDialog}
        onFileNameConfirm={onFileNameConfirm}
        onFileNameCancel={onFileNameCancel}
        deleteConfirmDialog={deleteConfirmDialog}
        onDeleteConfirm={onDeleteConfirm}
        onDeleteCancel={onDeleteCancel}
      />
    </div>
  );
};

export default AppLayout;