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
  private isRestoringState = false;

  constructor() {
    // 延迟初始化，确保stores已经创建
    setTimeout(() => {
      this.initialize();
    }, 0);
  }

  private async initialize() {
    this.editorStore = useEditorStore.getState();
    this.persistStore = usePersistStore.getState();
    this.isInitialized = true;
    
    // 恢复状态
    await this.restoreState();
    
    // 设置状态监听
    this.setupStateListeners();
  }

  /**
   * 从持久化存储恢复状态
   */
  public async restoreState() {
    if (!this.isInitialized || this.isRestoringState) return;
    
    this.isRestoringState = true;
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
    await this.restoreExpandedFolders(persistedState.expandedFolders);
    
    this.isRestoringState = false;
  }

  /**
   * 恢复文件夹展开状态
   */
  private async restoreExpandedFolders(expandedFolderIds: Set<string>) {
    console.log('恢复展开状态，展开的文件夹ID:', Array.from(expandedFolderIds));
    if (expandedFolderIds.size === 0) {
      console.log('没有需要恢复的展开状态');
      return;
    }
    
    const updateExpandedState = async (nodes: FileNode[]): Promise<FileNode[]> => {
      const updatedNodes = [];
      
      for (const node of nodes) {
        if (node.type === 'folder') {
          const shouldExpand = expandedFolderIds.has(node.id);
          console.log(`文件夹 ${node.name} (ID: ${node.id}) 应该展开: ${shouldExpand}`);
          
          let updatedNode = {
            ...node,
            expanded: shouldExpand,
          };
          
          // 如果需要展开且没有子内容，则加载子内容
          if (shouldExpand && node.path && (!node.children || node.children.length === 0)) {
            try {
              console.log(`加载文件夹内容: ${node.path}`);
              const files = await window.electronAPI.getFiles(node.path);
              const children = files.map((file) => ({
                id: file.path,
                name: file.name,
                type: file.isDirectory ? 'folder' as const : 'file' as const,
                path: file.path,
                expanded: false,
              }));
              updatedNode.children = await updateExpandedState(children);
            } catch (error) {
              console.error(`加载文件夹 ${node.path} 内容失败:`, error);
              updatedNode.children = node.children ? await updateExpandedState(node.children) : undefined;
            }
          } else {
            updatedNode.children = node.children ? await updateExpandedState(node.children) : undefined;
          }
          
          updatedNodes.push(updatedNode);
        } else {
          updatedNodes.push(node);
        }
      }
      
      return updatedNodes;
    };
    
    const currentFileTree = useEditorStore.getState().fileTree;
    console.log('当前文件树:', currentFileTree);
    const updatedFileTree = await updateExpandedState(currentFileTree);
    console.log('更新后的文件树:', updatedFileTree);
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
    // 如果正在恢复状态，跳过同步以防止循环
    if (this.isRestoringState) {
      console.log('正在恢复状态，跳过展开状态同步');
      return;
    }
    
    const expandedIds: string[] = [];
    
    const collectExpandedIds = (nodes: FileNode[]) => {
      nodes.forEach(node => {
        if (node.type === 'folder' && node.expanded) {
          console.log(`保存展开状态: ${node.name} (ID: ${node.id})`);
          expandedIds.push(node.id);
        }
        if (node.children) {
          collectExpandedIds(node.children);
        }
      });
    };
    
    collectExpandedIds(fileTree);
    console.log('保存的展开文件夹ID列表:', expandedIds);
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
      saveWorkspacePath: (path: string) => stateSyncService.saveWorkspacePath(path),
      getLastWorkspacePath: () => stateSyncService.getLastWorkspacePath(),
      updateEditorSettings: (settings: any) => stateSyncService.updateEditorSettings(settings),
      getEditorSettings: () => stateSyncService.getEditorSettings(),
      resetState: () => stateSyncService.resetAllState(),
      restoreState: () => stateSyncService.restoreState(),
    };
};