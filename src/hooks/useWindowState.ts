import { useEffect } from 'react';
import { useStateSync } from '../services/stateSync';

/**
 * 窗口状态管理钩子
 * 用于保存和恢复窗口的大小、位置等状态
 */
export const useWindowState = () => {
  const stateSync = useStateSync();

  useEffect(() => {
    // 监听窗口大小变化
    const handleResize = () => {
      const windowState = {
        width: window.innerWidth,
        height: window.innerHeight,
        isMaximized: false, // 这个需要从Electron主进程获取
      };
      
      // 防抖保存，避免频繁写入
      clearTimeout((window as any).resizeTimeout);
      (window as any).resizeTimeout = setTimeout(() => {
        stateSync.updateEditorSettings({ windowState });
      }, 500);
    };

    // 监听窗口移动（如果需要保存位置）
    // const handleMove = () => {
    //   // 这个功能需要Electron主进程支持
    //   // 可以通过IPC获取窗口位置
    // };

    // 添加事件监听器
    window.addEventListener('resize', handleResize);
    
    // 组件卸载时清理
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout((window as any).resizeTimeout);
    };
  }, [stateSync]);

  // 恢复窗口状态（这个需要在Electron主进程中实现）
  const restoreWindowState = () => {
    const settings = stateSync.getEditorSettings();
    if (settings?.windowState) {
      // 通过IPC通知主进程恢复窗口状态
      // window.electronAPI.restoreWindowState(settings.windowState);
    }
  };

  return {
    restoreWindowState,
  };
};