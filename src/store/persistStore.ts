import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FileNode } from './editorStore';

// 持久化状态接口
interface PersistState {
  // 编辑器布局状态
  leftPanelCollapsed: boolean;
  rightPanelCollapsed: boolean;
  leftPanelWidth: number;
  rightPanelWidth: number;
  
  // 打开的文件标签页
  openTabs: {
    id: string;
    name: string;
    path?: string;
    content?: string;
    type: 'file' | 'folder';
    children?: FileNode[];
    expanded?: boolean;
  }[];
  
  // 当前活动标签页索引
  activeTabIndex: number;
  
  // 文件树展开状态（记录展开的文件夹ID）
  expandedFolders: Set<string>;
  
  // 最后打开的工作区路径
  lastWorkspacePath: string | null;
  
  // 编辑器设置
  editorSettings: {
    fontSize: number;
    theme: 'light' | 'dark';
    wordWrap: boolean;
    lineNumbers: boolean;
    minimap: boolean;
    leftPanelWidth?: number;
    rightPanelWidth?: number;
  };
  
  // 窗口状态
  windowState: {
    width: number;
    height: number;
    x?: number;
    y?: number;
    isMaximized: boolean;
  };
  
  // 操作方法
  updateLayoutState: (state: Partial<Pick<PersistState, 'leftPanelCollapsed' | 'rightPanelCollapsed' | 'leftPanelWidth' | 'rightPanelWidth'>>) => void;
  updateOpenTabs: (tabs: PersistState['openTabs'], activeIndex: number) => void;
  updateExpandedFolders: (folderId: string, expanded: boolean) => void;
  setExpandedFolders: (folderIds: string[]) => void;
  updateWorkspacePath: (path: string | null) => void;
  updateEditorSettings: (settings: Partial<PersistState['editorSettings']>) => void;
  updateWindowState: (state: Partial<PersistState['windowState']>) => void;
  resetState: () => void;
}

// 默认状态
const defaultState = {
  leftPanelCollapsed: false,
  rightPanelCollapsed: false,
  leftPanelWidth: 250,
  rightPanelWidth: 300,
  openTabs: [],
  activeTabIndex: -1,
  expandedFolders: new Set<string>(),
  lastWorkspacePath: null,
  editorSettings: {
    fontSize: 14,
    theme: 'light' as const,
    wordWrap: true,
    lineNumbers: true,
    minimap: true,
  },
  windowState: {
    width: 1200,
    height: 800,
    isMaximized: false,
  },
};

// 自定义序列化函数，处理Set类型
const customStorage = {
  getItem: (name: string) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    
    try {
      const parsed = JSON.parse(str);
      // 将expandedFolders数组转换回Set
      if (parsed.state?.expandedFolders && Array.isArray(parsed.state.expandedFolders)) {
        parsed.state.expandedFolders = new Set(parsed.state.expandedFolders);
      }
      return parsed;
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: any) => {
    try {
      // 将Set转换为数组进行序列化
      const toSerialize = {
        ...value,
        state: {
          ...value.state,
          expandedFolders: Array.from(value.state.expandedFolders || []),
        },
      };
      localStorage.setItem(name, JSON.stringify(toSerialize));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

// 创建持久化状态管理
export const usePersistStore = create<PersistState>()(
  persist(
    (set) => ({
      ...defaultState,
      
      // 更新布局状态
      updateLayoutState: (newState) => set((state) => ({
        ...state,
        ...newState,
      })),
      
      // 更新打开的标签页
      updateOpenTabs: (tabs, activeIndex) => set({
        openTabs: tabs,
        activeTabIndex: activeIndex,
      }),
      
      // 更新文件夹展开状态
      updateExpandedFolders: (folderId, expanded) => set((state) => {
        const newExpandedFolders = new Set(state.expandedFolders);
        if (expanded) {
          newExpandedFolders.add(folderId);
        } else {
          newExpandedFolders.delete(folderId);
        }
        return { expandedFolders: newExpandedFolders };
      }),
      
      // 设置展开的文件夹列表
      setExpandedFolders: (folderIds) => set({
        expandedFolders: new Set(folderIds),
      }),
      
      // 更新工作区路径
      updateWorkspacePath: (path) => set({ lastWorkspacePath: path }),
      
      // 更新编辑器设置
      updateEditorSettings: (settings) => set((state) => ({
        editorSettings: { ...state.editorSettings, ...settings },
      })),
      
      // 更新窗口状态
      updateWindowState: (windowState) => set((state) => ({
        windowState: { ...state.windowState, ...windowState },
      })),
      
      // 重置状态
      resetState: () => set(defaultState),
    }),
    {
      name: 'text-editor-state',
      storage: customStorage,
      // 只持久化需要的字段
      partialize: (state) => ({
        leftPanelCollapsed: state.leftPanelCollapsed,
        rightPanelCollapsed: state.rightPanelCollapsed,
        leftPanelWidth: state.leftPanelWidth,
        rightPanelWidth: state.rightPanelWidth,
        openTabs: state.openTabs,
        activeTabIndex: state.activeTabIndex,
        expandedFolders: state.expandedFolders,
        lastWorkspacePath: state.lastWorkspacePath,
        editorSettings: state.editorSettings,
        windowState: state.windowState,
      }),
    }
  )
);

// 导出类型
export type { PersistState };