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
  // 面板状态
  leftPanelCollapsed: boolean;
  rightPanelCollapsed: boolean;
  
  // 操作方法
  setFileTree: (fileTree: FileNode[]) => void;
  setSelectedFile: (file: FileNode | null) => void;
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
  leftPanelCollapsed: false,
  rightPanelCollapsed: false,
  
  // 设置文件树
  setFileTree: (fileTree) => set({ fileTree }),
  
  // 设置选中文件
  setSelectedFile: (selectedFile) => set({ selectedFile }),
  
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