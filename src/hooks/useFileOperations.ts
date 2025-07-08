import { useState } from 'react';
import { useEditorStore } from '../store/editorStore';
import type { FileNode } from '../store/editorStore';

export const useFileOperations = () => {
  const { fileTree, openFile, toggleFolder } = useEditorStore();
  
  // 右键菜单状态
  const [contextMenu, setContextMenu] = useState({
    isVisible: false,
    x: 0,
    y: 0,
    targetNode: null as FileNode | null
  });
  
  // 文件名输入弹窗状态
  const [fileNameDialog, setFileNameDialog] = useState({
    isVisible: false,
    fileType: '',
    parentNode: null as FileNode | null
  });
  
  // 删除确认弹窗状态
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState({
    isVisible: false,
    targetNode: null as FileNode | null
  });

  // 处理节点点击
  const handleNodeClick = async (node: FileNode) => {
    if (node.type === 'folder') {
      await toggleFolder(node);
    } else {
      openFile(node);
    }
  };

  // 处理右键菜单
  const handleContextMenu = (e: React.MouseEvent, node: FileNode) => {
    e.preventDefault();
    setContextMenu({
      isVisible: true,
      x: e.clientX,
      y: e.clientY,
      targetNode: node
    });
  };

  // 关闭右键菜单
  const closeContextMenu = () => {
    setContextMenu(prev => ({ ...prev, isVisible: false }));
  };

  // 新建文件
  const handleNewFile = (parentNode?: FileNode, fileType?: string) => {
    setFileNameDialog({
      isVisible: true,
      fileType: fileType || 'file',
      parentNode: parentNode || null
    });
    closeContextMenu();
  };

  // 新建文件夹
  const handleNewFolder = (parentNode?: FileNode) => {
    setFileNameDialog({
      isVisible: true,
      fileType: 'folder',
      parentNode: parentNode || null
    });
    closeContextMenu();
  };

  // 在资源管理器中显示
  const handleShowInExplorer = (node: FileNode) => {
    if (window.electronAPI?.showInExplorer && node.path) {
      window.electronAPI.showInExplorer(node.path);
    }
    closeContextMenu();
  };

  // 剪切
  const handleCut = (node: FileNode) => {
    // TODO: 实现剪切功能
    console.log('剪切:', node.name);
    closeContextMenu();
  };

  // 复制
  const handleCopy = (node: FileNode) => {
    // TODO: 实现复制功能
    console.log('复制:', node.name);
    closeContextMenu();
  };

  // 复制路径
  const handleCopyPath = (node: FileNode) => {
    if (navigator.clipboard && node.path) {
      navigator.clipboard.writeText(node.path);
    }
    closeContextMenu();
  };

  // 复制相对路径
  const handleCopyRelativePath = (node: FileNode) => {
    if (!node.path) return;
    const rootPath = fileTree[0]?.path || '';
    const relativePath = node.path.replace(rootPath, '').replace(/^[\/]/, '');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(relativePath);
    }
    closeContextMenu();
  };

  // 重命名
  const handleRename = (node: FileNode) => {
    // TODO: 实现重命名功能
    console.log('重命名:', node.name);
    closeContextMenu();
  };

  // 删除
  const handleDelete = (node: FileNode) => {
    setDeleteConfirmDialog({
      isVisible: true,
      targetNode: node
    });
    closeContextMenu();
  };

  // 确认文件名
  const handleFileNameConfirm = async (fileName: string) => {
    const { fileType, parentNode } = fileNameDialog;
    if (!parentNode) return;

    try {
      const newPath = `${parentNode.path}\\${fileName}`;
      
      if (fileType === 'file') {
        // 创建新文件
        await window.electronAPI.createFile(newPath, '');
      } else {
        // 创建新文件夹
        await window.electronAPI.createFolder(newPath);
      }
      
      // TODO: 刷新文件树
      console.log(`${fileType === 'file' ? '文件' : '文件夹'}创建成功:`, newPath);
    } catch (error) {
      console.error(`创建${fileType === 'file' ? '文件' : '文件夹'}失败:`, error);
    }
    
    setFileNameDialog(prev => ({ ...prev, isVisible: false }));
  };

  // 取消文件名输入
  const handleFileNameCancel = () => {
    setFileNameDialog(prev => ({ ...prev, isVisible: false }));
  };

  // 确认删除
  const handleDeleteConfirm = async () => {
    const { targetNode } = deleteConfirmDialog;
    if (!targetNode || !targetNode.path) return;

    try {
      if (targetNode.type === 'file') {
        await window.electronAPI.deleteFile(targetNode.path);
      } else {
        await window.electronAPI.deleteFolder(targetNode.path);
      }
      
      // TODO: 刷新文件树
      console.log(`${targetNode.type === 'file' ? '文件' : '文件夹'}删除成功:`, targetNode.path);
    } catch (error) {
      console.error(`删除${targetNode.type === 'file' ? '文件' : '文件夹'}失败:`, error);
    }
    
    setDeleteConfirmDialog(prev => ({ ...prev, isVisible: false }));
  };

  // 取消删除
  const handleDeleteCancel = () => {
    setDeleteConfirmDialog(prev => ({ ...prev, isVisible: false }));
  };

  return {
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
  };
};