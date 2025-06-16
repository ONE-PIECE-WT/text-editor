import { create } from 'zustand';

// 文件节点类型定义
export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path?: string;  // 文件或文件夹的完整路径
  children?: FileNode[];
  content?: string;
  expanded?: boolean;
}

// 编辑器状态接口
interface EditorState {
  // 文件树数据
  fileTree: FileNode[];
  // 当前选中的文件
  selectedFile: FileNode | null;
  // 打开的文件标签页列表
  openTabs: FileNode[];
  // 当前活动的标签页索引
  activeTabIndex: number;
  // 面板状态
  leftPanelCollapsed: boolean;
  rightPanelCollapsed: boolean;
  
  // 操作方法
  setFileTree: (fileTree: FileNode[]) => void;
  setSelectedFile: (file: FileNode | null) => void;
  openFile: (file: FileNode) => void;
  closeTab: (index: number) => void;
  setActiveTab: (index: number) => void;
  toggleLeftPanel: () => void;
  toggleRightPanel: () => void;
  toggleFolder: (node: FileNode) => void;
  updateFileContent: (id: string, content: string) => void;
}

// 创建状态管理库
export const useEditorStore = create<EditorState>((set) => ({
  // 初始状态
  fileTree: [
    {
      id: '1',
      name: '项目文件',
      type: 'folder',
      expanded: true,
      children: [
        {
          id: '2',
          name: 'index.html',
          type: 'file',
          content: '<!DOCTYPE html>\n<html>\n<head>\n  <title>文本编辑器</title>\n</head>\n<body>\n  <div id="root"></div>\n</body>\n</html>'
        },
        {
          id: '3',
          name: 'src',
          type: 'folder',
          expanded: false,
          children: [
            {
              id: '4',
              name: 'main.tsx',
              type: 'file',
              content: 'import React from \'react\'\nimport ReactDOM from \'react-dom/client\'\nimport App from \'./App\'\nimport \'./index.css\'\n\nReactDOM.createRoot(document.getElementById(\'root\')!).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n)'
            }
          ]
        }
      ]
    }
  ],
  selectedFile: null,
  openTabs: [],
  activeTabIndex: -1,
  leftPanelCollapsed: false,
  rightPanelCollapsed: false,
  
  // 设置文件树
  setFileTree: (fileTree) => set({ fileTree }),
  
  // 设置选中文件
  setSelectedFile: (selectedFile) => set({ selectedFile }),
  
  // 打开文件（添加到标签页）
  openFile: (file) => set((state) => {
    // 检查文件是否已经在标签页中
    const existingIndex = state.openTabs.findIndex(tab => tab.id === file.id);
    
    if (existingIndex !== -1) {
      // 如果文件已经打开，切换到该标签页
      return {
        activeTabIndex: existingIndex,
        selectedFile: state.openTabs[existingIndex]
      };
    } else {
      // 如果文件未打开，添加新标签页
      const newTabs = [...state.openTabs, file];
      return {
        openTabs: newTabs,
        activeTabIndex: newTabs.length - 1,
        selectedFile: file
      };
    }
  }),
  
  // 关闭标签页
  closeTab: (index) => set((state) => {
    const newTabs = state.openTabs.filter((_, i) => i !== index);
    let newActiveIndex = state.activeTabIndex;
    let newSelectedFile = state.selectedFile;
    
    if (newTabs.length === 0) {
      // 如果没有标签页了
      newActiveIndex = -1;
      newSelectedFile = null;
    } else if (index === state.activeTabIndex) {
      // 如果关闭的是当前活动标签页
      if (index >= newTabs.length) {
        newActiveIndex = newTabs.length - 1;
      }
      newSelectedFile = newTabs[newActiveIndex];
    } else if (index < state.activeTabIndex) {
      // 如果关闭的标签页在当前活动标签页之前
      newActiveIndex = state.activeTabIndex - 1;
    }
    
    return {
      openTabs: newTabs,
      activeTabIndex: newActiveIndex,
      selectedFile: newSelectedFile
    };
  }),
  
  // 设置活动标签页
  setActiveTab: (index) => set((state) => ({
    activeTabIndex: index,
    selectedFile: state.openTabs[index] || null
  })),
  
  // 切换左侧面板
  toggleLeftPanel: () => set((state) => ({ leftPanelCollapsed: !state.leftPanelCollapsed })),
  
  // 切换右侧面板
  toggleRightPanel: () => set((state) => ({ rightPanelCollapsed: !state.rightPanelCollapsed })),
  
  // 切换文件夹展开/折叠状态
  toggleFolder: (targetNode) => set((state) => {
    // 递归函数，用于在文件树中查找并更新目标节点
    const updateNode = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.id === targetNode.id) {
          return { ...node, expanded: !node.expanded };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };
    
    return { fileTree: updateNode(state.fileTree) };
  }),
  
  // 更新文件内容
  updateFileContent: (id, content) => set((state) => {
    // 递归函数，用于在文件树中查找并更新文件内容
    const updateContent = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.id === id) {
          return { ...node, content };
        }
        if (node.children) {
          return { ...node, children: updateContent(node.children) };
        }
        return node;
      });
    };
    
    // 更新文件树和选中的文件
    const updatedFileTree = updateContent(state.fileTree);
    let updatedSelectedFile = state.selectedFile;
    
    // 如果当前选中的文件就是被更新的文件，也需要更新选中文件的内容
    if (state.selectedFile && state.selectedFile.id === id) {
      updatedSelectedFile = { ...state.selectedFile, content };
    }
    
    return { 
      fileTree: updatedFileTree,
      selectedFile: updatedSelectedFile
    };
  }),
}));