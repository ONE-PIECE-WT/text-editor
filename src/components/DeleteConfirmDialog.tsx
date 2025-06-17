import React, { useEffect, useRef } from 'react';
import { FaTrash, FaTimes } from 'react-icons/fa';
import type { FileNode } from '../store/editorStore';
import './DeleteConfirmDialog.css';

interface DeleteConfirmDialogProps {
  isVisible: boolean;
  targetNode: FileNode | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  isVisible,
  targetNode,
  onConfirm,
  onCancel
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // ESC键关闭弹窗
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isVisible, onCancel]);

  // 弹窗显示时自动聚焦
  useEffect(() => {
    if (isVisible && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isVisible]);

  if (!isVisible || !targetNode) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="delete-confirm-overlay">
      <div 
        ref={dialogRef}
        className="delete-confirm-dialog"
        tabIndex={-1}
      >
        <div className="delete-confirm-header">
          <div className="delete-confirm-title">
            <FaTrash className="delete-confirm-icon" />
            <span>确认删除</span>
          </div>
          <button 
            className="delete-confirm-close-btn"
            onClick={handleCancel}
            title="关闭"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="delete-confirm-content">
          <p>
            确定要删除 <strong>{targetNode.type === 'folder' ? '文件夹' : '文件'}</strong> 
            <span className="delete-confirm-filename">"{targetNode.name}"</span> 吗？
          </p>
          {targetNode.type === 'folder' && (
            <p className="delete-confirm-warning">
              ⚠️ 此操作将删除文件夹及其所有内容，且无法撤销。
            </p>
          )}
        </div>
        
        <div className="delete-confirm-actions">
          <button 
            className="delete-confirm-btn delete-confirm-btn-cancel"
            onClick={handleCancel}
          >
            取消
          </button>
          <button 
            className="delete-confirm-btn delete-confirm-btn-confirm"
            onClick={handleConfirm}
          >
            确定删除
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmDialog;