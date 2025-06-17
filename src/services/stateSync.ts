import { useEditorStore } from '../store/editorStore';
import { usePersistStore } from '../store/persistStore';
import type { FileNode } from '../store/editorStore';

/**
 * 状态同步服务
 * 负责在editorStore和persistStore之间同步状态
 */
class StateSyncService {
  private editorStore: any;
  private persistStore: any;
  private isInitialized = false;

  constructor() {
    // 延迟初始化，确保stores已经创建
    setTimeout(() => {
      this.initialize();
    }, 0);
  }

  private initialize() {
    this.editorStore = useEditorStore.getState();
    this.persistStore = usePersistStore.getState();
    this.isInitialized = true;
    
    // 恢复状态
    this.restoreState();
    
    // 设置状态监听
    this.setupStateListeners();
  }

  /**
   * 从持久化存储恢复状态
   */
  private restoreState() {
    if (!this.isInitialized) return;
    
    const persistedState = this.persistStore;
    const editorState = this.editorStore;
    
    // 恢复面板状态
    if (persistedState.leftPanelCollapsed !== editorState.leftPanelCollapsed) {
      useEditorStore.setState({ leftPanelCollapsed: persistedState.leftPanelCollapsed });
    }
    
    if (persistedState.rightPanelCollapsed !== editorState.rightPanelCollapsed) {
      useEditorStore.setState({ rightPanelCollapsed: persistedState.rightPanelCollapsed });
    }
    
    // 恢复打开的标签页
    if (persistedState.openTabs.length > 0) {
      const restoredTabs: FileNode[] = persistedState.openTabs.map((tab: any) => ({
        id: tab.id,
        name: tab.name,
        type: tab.type,
        path: tab.path,
        content: tab.content,
      }));
      
      useEditorStore.setState({
        openTabs: restoredTabs,
        activeTabIndex: persistedState.activeTabIndex,
        selectedFile: restoredTabs[persistedState.activeTabIndex] || null,
      });
    }
    
    // 恢复文件夹展开状态
    this.restoreExpandedFolders(persistedState.expandedFolders);
  }

  /**
   * 恢复文件夹展开状态
   */
  private restoreExpandedFolders(expandedFolderIds: Set<string>) {
    if (expandedFolderIds.size === 0) return;
    
    const updateExpandedState = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.type === 'folder') {
          const shouldExpand = expandedFolderIds.has(node.id);
          return {
            ...node,
            expanded: shouldExpand,
            children: node.children ? updateExpandedState(node.children) : undefined,
          };
        }
        return node;
      });
    };
    
    const currentFileTree = useEditorStore.getState().fileTree;
    const updatedFileTree = updateExpandedState(currentFileTree);
    useEditorStore.setState({ fileTree: updatedFileTree });
  }

  /**
   * 设置状态监听器
   */
  private setupStateListeners() {
    // 监听editorStore变化并同步到persistStore
    useEditorStore.subscribe((state, prevState) => {
      // 同步面板状态
      if (state.leftPanelCollapsed !== prevState.leftPanelCollapsed ||
          state.rightPanelCollapsed !== prevState.rightPanelCollapsed) {
        this.persistStore.updateLayoutState({
          leftPanelCollapsed: state.leftPanelCollapsed,
          rightPanelCollapsed: state.rightPanelCollapsed,
        });
      }
      
      // 同步标签页状态
      if (state.openTabs !== prevState.openTabs ||
          state.activeTabIndex !== prevState.activeTabIndex) {
        const tabsToSave = state.openTabs.map(tab => ({
          id: tab.id,
          name: tab.name,
          type: tab.type,
          path: tab.path,
          content: tab.content,
        }));
        
        this.persistStore.updateOpenTabs(tabsToSave, state.activeTabIndex);
      }
      
      // 同步文件夹展开状态
      if (state.fileTree !== prevState.fileTree) {
        this.syncExpandedFolders(state.fileTree);
      }
    });
  }

  /**
   * 同步文件夹展开状态
   */
  private syncExpandedFolders(fileTree: FileNode[]) {
    const expandedIds: string[] = [];
    
    const collectExpandedIds = (nodes: FileNode[]) => {
      nodes.forEach(node => {
        if (node.type === 'folder' && node.expanded) {
          expandedIds.push(node.id);
        }
        if (node.children) {
          collectExpandedIds(node.children);
        }
      });
    };
    
    collectExpandedIds(fileTree);
    this.persistStore.setExpandedFolders(expandedIds);
  }

  /**
   * 保存工作区路径
   */
  public saveWorkspacePath(path: string) {
    if (this.isInitialized) {
      this.persistStore.updateWorkspacePath(path);
    }
  }

  /**
   * 获取最后的工作区路径
   */
  public getLastWorkspacePath(): string | null {
    return this.isInitialized ? this.persistStore.lastWorkspacePath : null;
  }

  /**
   * 更新编辑器设置
   */
  public updateEditorSettings(settings: any) {
    if (this.isInitialized) {
      this.persistStore.updateEditorSettings(settings);
    }
  }

  /**
   * 获取编辑器设置
   */
  public getEditorSettings() {
    return this.isInitialized ? this.persistStore.editorSettings : null;
  }

  /**
   * 重置所有状态
   */
  public resetAllState() {
    if (this.isInitialized) {
      this.persistStore.resetState();
      // 也可以选择重置editorStore的状态
    }
  }
}

// 创建单例实例
export const stateSyncService = new StateSyncService();

// 导出便捷的钩子函数
export const useStateSync = () => {
  return {
    saveWorkspacePath: stateSyncService.saveWorkspacePath.bind(stateSyncService),
    getLastWorkspacePath: stateSyncService.getLastWorkspacePath.bind(stateSyncService),
    updateEditorSettings: stateSyncService.updateEditorSettings.bind(stateSyncService),
    getEditorSettings: stateSyncService.getEditorSettings.bind(stateSyncService),
    resetAllState: stateSyncService.resetAllState.bind(stateSyncService),
  };
};