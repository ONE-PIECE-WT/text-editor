import { useState, useCallback, useRef, useEffect } from 'react';
import { useEditorStore } from '../store/editorStore';
import { useStateSync } from '../services/stateSync';

export const usePanelResize = () => {
  const { leftPanelCollapsed, rightPanelCollapsed } = useEditorStore();
  const stateSync = useStateSync();
  
  // 面板拖拽状态
  const [isLeftResizing, setIsLeftResizing] = useState(false);
  const [isRightResizing, setIsRightResizing] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(() => {
    // 从持久化存储恢复左侧面板宽度
    const settings = stateSync.getEditorSettings();
    return settings?.leftPanelWidth || 250;
  });
  const [rightPanelWidth, setRightPanelWidth] = useState(() => {
    // 从持久化存储恢复右侧面板宽度
    const settings = stateSync.getEditorSettings();
    return settings?.rightPanelWidth || 250;
  });
  
  // 使用useRef存储最新状态，避免循环依赖
  const isLeftResizingRef = useRef(false);
  const isRightResizingRef = useRef(false);
  
  // 拖拽起始状态
  const dragStartRef = useRef({ startX: 0, startWidth: 0 });

  // 设置CSS变量
  useEffect(() => {
    document.documentElement.style.setProperty('--left-panel-width', `${leftPanelWidth}px`);
    document.documentElement.style.setProperty('--right-panel-width', `${rightPanelWidth}px`);
  }, [leftPanelWidth, rightPanelWidth]);

  // 拖拽左侧面板
  const handleLeftResize = useCallback((e: MouseEvent) => {
    if (isLeftResizingRef.current) {
      const deltaX = e.clientX - dragStartRef.current.startX;
      const windowWidth = window.innerWidth;
      const rightPanelCurrentWidth = rightPanelCollapsed ? 0 : rightPanelWidth;
      const maxAllowedWidth = windowWidth - rightPanelCurrentWidth - 96 - 300; // 保留300px给中间面板
      const newWidth = Math.max(180, Math.min(maxAllowedWidth, dragStartRef.current.startWidth + deltaX));
      setLeftPanelWidth(newWidth);
      e.preventDefault();
    }
  }, [rightPanelWidth, rightPanelCollapsed]);

  // 停止拖拽左侧面板
  const stopLeftResize = useCallback(() => {
    setIsLeftResizing(false);
    isLeftResizingRef.current = false;
    document.removeEventListener('mousemove', handleLeftResize);
    document.removeEventListener('mouseup', stopLeftResize);
    
    // 保存面板宽度到持久化存储
    stateSync.updateEditorSettings({ leftPanelWidth });
  }, [handleLeftResize, leftPanelWidth]);
  
  // 开始拖拽左侧面板
  const startLeftResize = (e: React.MouseEvent) => {
    dragStartRef.current = {
      startX: e.clientX,
      startWidth: leftPanelWidth
    };
    setIsLeftResizing(true);
    isLeftResizingRef.current = true;
    document.addEventListener('mousemove', handleLeftResize);
    document.addEventListener('mouseup', stopLeftResize);
    e.preventDefault();
  };

  // 拖拽右侧面板
  const handleRightResize = useCallback((e: MouseEvent) => {
    if (isRightResizingRef.current) {
      const deltaX = dragStartRef.current.startX - e.clientX; // 右侧面板向左拖拽时deltaX为正
      const windowWidth = window.innerWidth;
      const leftPanelCurrentWidth = leftPanelCollapsed ? 0 : leftPanelWidth;
      const maxAllowedWidth = windowWidth - leftPanelCurrentWidth - 96 - 300; // 保留300px给中间面板
      const newWidth = Math.max(180, Math.min(Math.min(400, maxAllowedWidth), dragStartRef.current.startWidth + deltaX));
      setRightPanelWidth(newWidth);
      e.preventDefault();
    }
  }, [leftPanelWidth, leftPanelCollapsed]);

  // 停止拖拽右侧面板
  const stopRightResize = useCallback(() => {
    setIsRightResizing(false);
    isRightResizingRef.current = false;
    document.removeEventListener('mousemove', handleRightResize);
    document.removeEventListener('mouseup', stopRightResize);
    
    // 保存面板宽度到持久化存储
    stateSync.updateEditorSettings({ rightPanelWidth });
  }, [handleRightResize, rightPanelWidth]);
  
  // 开始拖拽右侧面板
  const startRightResize = (e: React.MouseEvent) => {
    dragStartRef.current = {
      startX: e.clientX,
      startWidth: rightPanelWidth
    };
    setIsRightResizing(true);
    isRightResizingRef.current = true;
    document.addEventListener('mousemove', handleRightResize);
    document.addEventListener('mouseup', stopRightResize);
    e.preventDefault();
  };

  return {
    isLeftResizing,
    isRightResizing,
    leftPanelWidth,
    rightPanelWidth,
    startLeftResize,
    startRightResize
  };
};