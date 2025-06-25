import React, { useState, useEffect, useRef } from 'react';
import { FaFile, FaFolder, FaCut, FaCopy, FaEdit, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';
import type { FileNode } from '../store/editorStore';
import './ContextMenu.css';

interface ContextMenuProps {
  isVisible: boolean;
  x: number;
  y: number;
  targetNode: FileNode | null;
  onClose: () => void;
  onNewFile: (parentNode?: FileNode, fileType?: string) => void;
  onNewFolder: (parentNode?: FileNode) => void;
  onShowInExplorer: (node: FileNode) => void;
  onCut: (node: FileNode) => void;
  onCopy: (node: FileNode) => void;
  onCopyPath: (node: FileNode) => void;
  onCopyRelativePath: (node: FileNode) => void;
  onRename: (node: FileNode) => void;
  onDelete: (node: FileNode) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  isVisible,
  x,
  y,
  targetNode,
  onClose,
  onNewFile,
  onNewFolder,
  onShowInExplorer,
  onCut,
  onCopy,
  onCopyPath,
  onCopyRelativePath,
  onRename,
  onDelete
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [adjustedPosition, setAdjustedPosition] = useState({ x, y });
  const [showNewFileSubmenu, setShowNewFileSubmenu] = useState(false);
  const [submenuPosition, setSubmenuPosition] = useState({ x: 0, y: 0 });
  const hideSubmenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 处理菜单位置调整，防止超出屏幕边界
  useEffect(() => {
    if (isVisible && menuRef.current) {
      const menu = menuRef.current;
      const rect = menu.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let adjustedX = x;
      let adjustedY = y;
      
      // 如果菜单超出右边界，向左调整
      if (x + rect.width > viewportWidth) {
        adjustedX = viewportWidth - rect.width - 10;
      }
      
      // 如果菜单超出下边界，向上调整
      if (y + rect.height > viewportHeight) {
        adjustedY = viewportHeight - rect.height - 10;
      }
      
      setAdjustedPosition({ x: adjustedX, y: adjustedY });
    }
  }, [isVisible, x, y]);

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible, onClose]);

  // ESC键关闭菜单
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isVisible, onClose]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (hideSubmenuTimeoutRef.current) {
        clearTimeout(hideSubmenuTimeoutRef.current);
      }
    };
  }, []);

  const handleMenuItemClick = (action: () => void) => {
    action();
    onClose();
  };

  // 清除隐藏子菜单的定时器
  const clearHideSubmenuTimeout = () => {
    if (hideSubmenuTimeoutRef.current) {
      clearTimeout(hideSubmenuTimeoutRef.current);
      hideSubmenuTimeoutRef.current = null;
    }
  };

  // 延迟隐藏子菜单
  const scheduleHideSubmenu = () => {
    clearHideSubmenuTimeout();
    hideSubmenuTimeoutRef.current = setTimeout(() => {
      setShowNewFileSubmenu(false);
    }, 300); // 300ms延迟
  };

  // 处理新建文件菜单项悬停
  const handleNewFileHover = (e: React.MouseEvent) => {
    clearHideSubmenuTimeout();
    const rect = e.currentTarget.getBoundingClientRect();
    setSubmenuPosition({
      x: rect.right + 5,
      y: rect.top
    });
    setShowNewFileSubmenu(true);
  };

  // 处理新建文件菜单项离开
  const handleNewFileLeave = () => {
    scheduleHideSubmenu();
  };

  // 处理子菜单进入
  const handleSubmenuEnter = () => {
    clearHideSubmenuTimeout();
  };

  // 处理子菜单离开
  const handleSubmenuLeave = () => {
    scheduleHideSubmenu();
  };

  // 处理新建文件类型选择
  const handleNewFileTypeSelect = (fileType: string) => {
    onNewFile(targetNode?.type === 'folder' ? targetNode : undefined, fileType);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div
      ref={menuRef}
      className="context-menu"
      style={{
        left: adjustedPosition.x,
        top: adjustedPosition.y,
      }}
    >
      <div className="context-menu-section">
        <div 
          className="context-menu-item context-menu-item-submenu"
          onMouseEnter={handleNewFileHover}
          onMouseLeave={handleNewFileLeave}
        >
          <FaFile className="context-menu-icon" />
          <span>新建文件</span>
          <span className="context-menu-arrow">▶</span>
        </div>
        <div 
          className="context-menu-item"
          onClick={() => handleMenuItemClick(() => onNewFolder(targetNode?.type === 'folder' ? targetNode : undefined))}
        >
          <FaFolder className="context-menu-icon" />
          <span>新建文件夹</span>
        </div>
      </div>
      
      <div className="context-menu-divider"></div>
      
      {targetNode && (
        <>
          <div className="context-menu-section">
            <div 
              className="context-menu-item"
              onClick={() => handleMenuItemClick(() => onShowInExplorer(targetNode))}
            >
              <FaExternalLinkAlt className="context-menu-icon" />
              <span>在文件资源管理器中显示</span>
            </div>
          </div>
          
          <div className="context-menu-divider"></div>
          
          <div className="context-menu-section">
            <div 
              className="context-menu-item"
              onClick={() => handleMenuItemClick(() => onCut(targetNode))}
            >
              <FaCut className="context-menu-icon" />
              <span>剪切</span>
            </div>
            <div 
              className="context-menu-item"
              onClick={() => handleMenuItemClick(() => onCopy(targetNode))}
            >
              <FaCopy className="context-menu-icon" />
              <span>复制</span>
            </div>
          </div>
          
          <div className="context-menu-divider"></div>
          
          <div className="context-menu-section">
            <div 
              className="context-menu-item"
              onClick={() => handleMenuItemClick(() => onCopyPath(targetNode))}
            >
              <FaCopy className="context-menu-icon" />
              <span>复制路径</span>
            </div>
            <div 
              className="context-menu-item"
              onClick={() => handleMenuItemClick(() => onCopyRelativePath(targetNode))}
            >
              <FaCopy className="context-menu-icon" />
              <span>复制相对路径</span>
            </div>
          </div>
          
          <div className="context-menu-divider"></div>
          
          <div className="context-menu-section">
            <div 
              className="context-menu-item"
              onClick={() => handleMenuItemClick(() => onRename(targetNode))}
            >
              <FaEdit className="context-menu-icon" />
              <span>重命名</span>
            </div>
            <div 
              className="context-menu-item context-menu-item-danger"
              onClick={() => handleMenuItemClick(() => onDelete(targetNode))}
            >
              <FaTrash className="context-menu-icon" />
              <span>删除</span>
            </div>
          </div>
        </>
      )}
      
      {/* 新建文件子菜单 */}
      {showNewFileSubmenu && (
        <div
          className="context-submenu"
          style={{
            left: submenuPosition.x,
            top: submenuPosition.y,
          }}
          onMouseEnter={handleSubmenuEnter}
          onMouseLeave={handleSubmenuLeave}
        >
          <div className="context-menu-section">
            <div 
              className="context-menu-item"
              onClick={() => handleNewFileTypeSelect('txt')}
            >
              <FaFile className="context-menu-icon" />
              <span>文本文件 (.txt)</span>
            </div>
            <div 
              className="context-menu-item"
              onClick={() => handleNewFileTypeSelect('csg')}
            >
              <FaFile className="context-menu-icon" />
              <span>CSG文件 (.csg)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextMenu;