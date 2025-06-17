import React, { useState, useEffect, useRef } from 'react';
import './FileNameDialog.css';

interface FileNameDialogProps {
  isVisible: boolean;
  fileType: string;
  onConfirm: (fileName: string) => void;
  onCancel: () => void;
}

const FileNameDialog: React.FC<FileNameDialogProps> = ({
  isVisible,
  fileType,
  onConfirm,
  onCancel
}) => {
  const [fileName, setFileName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // 当对话框显示时，聚焦输入框并清空文件名
  useEffect(() => {
    if (isVisible) {
      setFileName('');
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [isVisible, fileType]);

  // 处理键盘事件
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isVisible) return;
      
      if (event.key === 'Enter') {
        event.preventDefault();
        handleConfirm();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, fileName]);

  // 处理点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dialog = document.querySelector('.file-name-dialog');
      if (dialog && !dialog.contains(event.target as Node)) {
        onCancel();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible, onCancel]);

  const handleConfirm = () => {
    const trimmedName = fileName.trim();
    if (trimmedName) {
      onConfirm(trimmedName);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  if (!isVisible) return null;

  return (
    <div className="file-name-dialog-overlay">
      <div className="file-name-dialog">
        <div className="dialog-header">
          <h3>新建 {fileType.toUpperCase()} 文件</h3>
        </div>
        <div className="dialog-content">
          <label htmlFor="fileName">文件名:</label>
          <input
            ref={inputRef}
            id="fileName"
            type="text"
            value={fileName}
            onChange={handleInputChange}
            className="file-name-input"
            placeholder={`请输入文件名.${fileType}`}
          />
        </div>
        <div className="dialog-footer">
          <div className="dialog-hint">
            按 Enter 确认，按 Esc 取消
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileNameDialog;