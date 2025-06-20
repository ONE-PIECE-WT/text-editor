import CodeMirrorEditor from './components/CodeMirrorEditor';
import CSGRenderer from './components/CSGRenderer';
import React, { useState, useEffect, useCallback } from 'react';
import { FaFolder, FaFile, FaChevronRight, FaChevronDown, FaCog, FaWrench } from 'react-icons/fa';
import { useEditorStore } from './store/editorStore';
import type { FileNode } from './store/editorStore';
import { useStateSync } from './services/stateSync';
import { useWindowState } from './hooks/useWindowState';
import SettingsPanel from './components/SettingsPanel';
import ContextMenu from './components/ContextMenu';
import FileNameDialog from './components/FileNameDialog';
import DeleteConfirmDialog from './components/DeleteConfirmDialog';
import './App.css';

function App() {
  // 使用Zustand状态管理
  const { 
    fileTree, 
    selectedFile, 
    openTabs,
    activeTabIndex,
    leftPanelCollapsed, 
    rightPanelCollapsed,
    setSelectedFile,
    openFile,
    closeTab,
    setActiveTab,
    toggleLeftPanel,
    toggleRightPanel,
    toggleFolder
  } = useEditorStore();
  
  // 状态同步服务
  const stateSync = useStateSync();
  
  // 窗口状态管理
  const { restoreWindowState } = useWindowState();
  
  // 根据文件扩展名获取语言类型
  const getFileLanguage = (fileName: string): string => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      case 'csg':
        return 'csg'; // 自定义文件类型
      default:
        return 'javascript';
    }
  };

  // CSG文件预览模式状态
  const [csgPreviewMode, setCsgPreviewMode] = useState(false);
  
  // 设置面板状态
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // 右键菜单状态
  const [contextMenu, setContextMenu] = useState({
    isVisible: false,
    x: 0,
    y: 0,
    targetNode: null as FileNode | null
  });
  
  // 文件名输入弹窗状态
  const [fileNameDialog, setFileNameDialog] = useState({
    isVisible: false,
    fileType: '',
    parentNode: null as FileNode | null
  });
  
  // 删除确认弹窗状态
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState({
    isVisible: false,
    targetNode: null as FileNode | null
  });
  
  // 处理文件路径自动补全
  const handleFilePathComplete = async (partialPath: string): Promise<string[]> => {
    try {
      const currentFolder = fileTree[0]?.path || '';
      const completions: string[] = [];
      
      // 递归获取设定文件夹下所有文件的函数
      const getAllFilesRecursively = async (dirPath: string, basePath: string = ''): Promise<string[]> => {
        const allFiles: string[] = [];
        try {
          const files = await window.electronAPI.getFiles(dirPath);
          for (const file of files) {
            if (file.isDirectory) {
              // 递归遍历子文件夹，传递相对路径
              const relativePath = basePath ? `${basePath}/${file.name}` : file.name;
              const subFiles = await getAllFilesRecursively(file.path, relativePath);
              allFiles.push(...subFiles);
            } else {
              // 去掉文件后缀名，但保留路径信息
              const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
              const fullPath = basePath ? `${basePath}/${nameWithoutExt}` : nameWithoutExt;
              allFiles.push(fullPath);
            }
          }
        } catch (error) {
          // 文件夹不存在或无法访问，忽略错误
        }
        return allFiles;
      };
      
      // 优先检查"设定"文件夹下的所有文件（包括子文件夹）
      if (currentFolder) {
        const settingsPath = `${currentFolder}\\设定`;
        try {
          const allSettingsFiles = await getAllFilesRecursively(settingsPath, '设定');
          // 智能模糊匹配函数
          const fuzzyMatch = (fileName: string, query: string): { match: boolean; score: number } => {
            const lowerFileName = fileName.toLowerCase();
            const lowerQuery = query.toLowerCase();
            
            // 如果查询为空，匹配所有文件
            if (!query) return { match: true, score: 0 };
            
            // 完全匹配得分最高
            if (lowerFileName === lowerQuery) return { match: true, score: 1000 };
            
            // 开头匹配得分较高
            if (lowerFileName.startsWith(lowerQuery)) return { match: true, score: 900 };
            
            // 包含匹配
            if (lowerFileName.includes(lowerQuery)) return { match: true, score: 800 };
            
            // 模糊匹配：检查查询中的每个字符是否都在文件名中出现
            const queryChars = Array.from(lowerQuery);
            const fileNameChars = Array.from(lowerFileName);
            let matchedChars = 0;
            
            // 为每个查询字符寻找匹配
            for (const queryChar of queryChars) {
              const charIndex = fileNameChars.indexOf(queryChar);
              if (charIndex !== -1) {
                matchedChars++;
                // 移除已匹配的字符，避免重复匹配
                fileNameChars.splice(charIndex, 1);
              }
            }
            
            // 如果所有查询字符都找到了匹配
            if (matchedChars === queryChars.length) {
              // 根据匹配比例调整得分
              const matchRatio = matchedChars / lowerFileName.length;
              const score = matchedChars * 50 + matchRatio * 200 + 100;
              return { match: true, score };
            }
            
            return { match: false, score: 0 };
          };
          
          const matchResults = allSettingsFiles
             .map(name => {
               const result = fuzzyMatch(name, partialPath);
               return { name, score: result.score, match: result.match };
             })
             .filter(item => item.match && item.score > 0)
             .sort((a, b) => b.score - a.score); // 按得分降序排列
          
          const settingsCompletions = matchResults.map(item => item.name);
          
          // 调试输出：显示匹配结果
          console.log('查询:', partialPath);
          console.log('所有文件:', allSettingsFiles);
          console.log('匹配结果:', matchResults);
          console.log('最终补全列表:', settingsCompletions);
          completions.push(...settingsCompletions);
        } catch (error) {
          // 设定文件夹不存在或无法访问，忽略错误
        }
      }
      
      // 如果设定文件夹没有匹配项，则使用原有的文件路径补全逻辑
      if (completions.length === 0) {
        const targetPath = partialPath.startsWith('/') || partialPath.includes(':') 
          ? partialPath 
          : `${currentFolder}/${partialPath}`;
        
        const files = await window.electronAPI.getFiles(targetPath);
        completions.push(...files.map(file => file.name));
      }
      
      return completions;
    } catch (error) {
      console.error('获取文件路径补全失败:', error);
      return [];
    }
  };
  
  // 应用启动时恢复工作区
  useEffect(() => {
    const restoreWorkspace = async () => {
      const lastWorkspacePath = stateSync.getLastWorkspacePath();
      if (lastWorkspacePath) {
        console.log('恢复上次工作区:', lastWorkspacePath);
        try {
          // 获取文件夹内容
          const files = await window.electronAPI.getFiles(lastWorkspacePath);
          
          // 将文件系统内容转换为文件树结构
          const fileTree = [
            {
              id: lastWorkspacePath, // 使用路径作为ID
              name: lastWorkspacePath.split('\\').pop() || '根目录',
              type: 'folder' as const,
              path: lastWorkspacePath,
              expanded: true,
              children: files.map((file) => ({
                id: file.path, // 使用路径作为ID
                name: file.name,
                type: file.isDirectory ? 'folder' as const : 'file' as const,
                path: file.path,
                expanded: false,
              }))
            }
          ];
          
          // 更新文件树状态
          useEditorStore.getState().setFileTree(fileTree);
          
          // 恢复展开状态（延迟执行，确保文件树已更新）
          setTimeout(async () => {
            await stateSync.restoreState();
          }, 100);
          
          console.log('工作区恢复成功');
        } catch (error) {
          console.error('恢复工作区失败:', error);
        }
      }
    };
    
    // 启动时恢复工作区
    restoreWorkspace();
  }, []);
  
  // 监听打开文件夹事件
  useEffect(() => {
    // 定义事件处理函数
    const handleOpenFolder = () => {
      console.log('打开文件夹菜单被点击');
      // 调用打开文件夹对话框
      window.electronAPI.openFolderDialog();
    };
    
    const handleSelectedFolder = async (folderPath: string) => {
      console.log('选择的文件夹路径:', folderPath);
      
      try {
        // 检查文件夹路径是否有效
        if (!folderPath) {
          console.error('无效的文件夹路径');
          return;
        }
        
        // 获取文件夹内容
        const files = await window.electronAPI.getFiles(folderPath);
        console.log('文件夹内容:', files);
        
        // 将文件系统内容转换为文件树结构
        const fileTree = [
          {
            id: folderPath, // 使用路径作为ID
            name: folderPath.split('\\').pop() || '根目录',
            type: 'folder' as const,
            path: folderPath, // 保存完整路径，便于后续操作
            expanded: true,
            children: files.map((file) => ({
              id: file.path, // 使用路径作为ID
              name: file.name,
              type: file.isDirectory ? 'folder' as const : 'file' as const,
              path: file.path,
              expanded: false,
              // 如果是文件夹，可以在点击时加载其子内容
            }))
          }
        ];
        
        // 更新文件树状态
        useEditorStore.getState().setFileTree(fileTree);
        
        // 保存工作区路径到持久化存储
        stateSync.saveWorkspacePath(folderPath);
        
        // 恢复展开状态（延迟执行，确保文件树已更新）
        setTimeout(async () => {
          await stateSync.restoreState();
        }, 100);
        
        // 显示成功消息
        console.log(`成功加载文件夹: ${folderPath}`);
      } catch (error) {
        console.error('加载文件夹内容失败:', error);
      }
    };
    
    // 监听菜单触发的打开文件夹事件
    window.electronAPI.onOpenFolder(handleOpenFolder);
    
    // 监听选择的文件夹路径
    window.electronAPI.onSelectedFolder(handleSelectedFolder);
    
    // 组件卸载时清理事件监听
    return () => {
      // 由于我们使用了ipcRenderer.on，Electron会自动管理这些监听器
      // 但最好的做法是在组件卸载时显式移除它们
      // 这需要在preload.ts中提供相应的移除方法
    };
  }, []);
  
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
  const isLeftResizingRef = React.useRef(false);
  const isRightResizingRef = React.useRef(false);
  
  // 拖拽起始状态
  const dragStartRef = React.useRef({ startX: 0, startWidth: 0 });
  
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
  }, [handleLeftResize, leftPanelWidth, stateSync]);
  
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
  }, [handleRightResize, rightPanelWidth, stateSync]);
  
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

  // 处理文件/文件夹点击
  const handleNodeClick = async (node: FileNode) => {
    if (node.type === 'folder') {
      toggleFolder(node);
      
      // 如果是文件夹且有path属性，且没有加载过子内容（没有children或children为空数组）
      if (node.path && (!node.children || node.children.length === 0)) {
        try {
          // 获取文件夹内容
          const files = await window.electronAPI.getFiles(node.path);
          console.log(`加载文件夹 ${node.path} 内容:`, files);
          
          // 将文件系统内容转换为文件树结构
          const children = files.map((file) => ({
            id: file.path, // 使用路径作为ID
            name: file.name,
            type: file.isDirectory ? 'folder' as const : 'file' as const,
            path: file.path,
            expanded: false,
          }));
          
          // 更新节点的子内容
          const updateNodeChildren = (nodes: FileNode[]): FileNode[] => {
            return nodes.map(n => {
              if (n.id === node.id) {
                return { ...n, children };
              }
              if (n.children) {
                return { ...n, children: updateNodeChildren(n.children) };
              }
              return n;
            });
          };
          
          // 更新文件树状态
          const currentFileTree = useEditorStore.getState().fileTree;
          useEditorStore.getState().setFileTree(updateNodeChildren(currentFileTree));
        } catch (error) {
          console.error(`加载文件夹 ${node.path} 内容失败:`, error);
        }
      }
    } else {
      // 点击文件时，获取文件内容并打开标签页
      if (window.electronAPI && node.path) {
        try {
          const content = await window.electronAPI.getFileContent(node.path);
          const fileWithContent = { ...node, content };
          openFile(fileWithContent);
        } catch (error) {
          console.error(`读取文件 ${node.path} 内容失败:`, error);
          // 即使读取失败，也打开文件节点，但没有内容
          openFile(node);
        }
      } else {
        openFile(node);
      }
    }
  };

  // 处理右键菜单
  const handleContextMenu = (e: React.MouseEvent, node: FileNode) => {
    e.preventDefault();
    setContextMenu({
      isVisible: true,
      x: e.clientX,
      y: e.clientY,
      targetNode: node
    });
  };

  // 关闭右键菜单
  const closeContextMenu = () => {
    setContextMenu({
      isVisible: false,
      x: 0,
      y: 0,
      targetNode: null
    });
  };

  // 右键菜单操作处理函数
  const handleNewFile = (parentNode?: FileNode, fileType?: string) => {
    console.log('新建文件', parentNode, fileType);
    if (fileType) {
      setFileNameDialog({
        isVisible: true,
        fileType,
        parentNode: parentNode || null
      });
    }
  };
  
  // 处理文件名确认
  const handleFileNameConfirm = async (fileName: string) => {
    const { parentNode, fileType } = fileNameDialog;
    
    console.log('新建', fileType === 'folder' ? '文件夹' : '文件', fileName, fileType);
    
    try {
      // 确定创建路径
      let targetPath = '';
      let finalFileName = fileName;
      
      if (fileType === 'folder') {
        // 创建文件夹，不需要扩展名
        if (parentNode && parentNode.type === 'folder' && parentNode.path) {
          targetPath = `${parentNode.path}/${finalFileName}`;
        } else if (fileTree[0]?.path) {
          targetPath = `${fileTree[0].path}/${finalFileName}`;
        } else {
          console.error('无法确定文件夹创建路径');
          return;
        }
      } else {
        // 创建文件，如果文件名不包含扩展名，自动添加
        if (!fileName.includes('.')) {
          finalFileName = `${fileName}.${fileType}`;
        }
        
        if (parentNode && parentNode.type === 'folder' && parentNode.path) {
          targetPath = `${parentNode.path}/${finalFileName}`;
        } else if (fileTree[0]?.path) {
          targetPath = `${fileTree[0].path}/${finalFileName}`;
        } else {
          console.error('无法确定文件创建路径');
          return;
        }
      }
      
      // 调用Electron API创建文件或文件夹
      if (window.electronAPI) {
        if (fileType === 'folder') {
          await window.electronAPI.createFolder(targetPath);
        } else {
          await window.electronAPI.createFile(targetPath, '');
        }
          console.log(fileType === 'folder' ? '文件夹创建成功:' : '文件创建成功:', targetPath);
          
          // 刷新文件树 - 重新加载父文件夹内容
          const parentPath = parentNode ? parentNode.path : fileTree[0]?.path;
          if (parentPath) {
            try {
              const files = await window.electronAPI.getFiles(parentPath);
              
              if (parentNode) {
                // 如果有父节点，更新该节点的子内容
                const children = files.map((file) => ({
                  id: file.path, // 使用路径作为ID
                  name: file.name,
                  type: file.isDirectory ? 'folder' as const : 'file' as const,
                  path: file.path,
                  expanded: false,
                }));
                
                const updateNodeChildren = (nodes: FileNode[]): FileNode[] => {
                  return nodes.map(n => {
                    if (n.id === parentNode.id) {
                      return { ...n, children, expanded: true };
                    }
                    if (n.children) {
                      return { ...n, children: updateNodeChildren(n.children) };
                    }
                    return n;
                  });
                };
                
                const currentFileTree = useEditorStore.getState().fileTree;
                useEditorStore.getState().setFileTree(updateNodeChildren(currentFileTree));
              } else {
                // 如果没有父节点，刷新根目录
                const fileTree = [{
                  id: parentPath, // 使用路径作为ID
                  name: parentPath.split('\\').pop() || '根目录',
                  type: 'folder' as const,
                  path: parentPath,
                  expanded: true,
                  children: files.map((file) => ({
                    id: file.path, // 使用路径作为ID
                    name: file.name,
                    type: file.isDirectory ? 'folder' as const : 'file' as const,
                    path: file.path,
                    expanded: false,
                  }))
                }];
                useEditorStore.getState().setFileTree(fileTree);
              }
              
              // 恢复展开状态
              setTimeout(async () => {
                await stateSync.restoreState();
              }, 100);
              
              console.log('文件树已刷新');
            } catch (error) {
              console.error('刷新文件树失败:', error);
            }
          }
        }
    } catch (error) {
      console.error('创建文件失败:', error);
    } finally {
      setFileNameDialog({
        isVisible: false,
        fileType: '',
        parentNode: null
      });
    }
  };
  
  // 处理文件名取消
  const handleFileNameCancel = () => {
    setFileNameDialog({
      isVisible: false,
      fileType: '',
      parentNode: null
    });
  };

  const handleNewFolder = (parentNode?: FileNode) => {
    console.log('新建文件夹', parentNode);
    setFileNameDialog({
      isVisible: true,
      fileType: 'folder',
      parentNode: parentNode || null
    });
  };

  const handleShowInExplorer = (node: FileNode) => {
    console.log('在文件资源管理器中显示', node);
    if (node.path && window.electronAPI) {
      window.electronAPI.showInExplorer(node.path);
    }
  };

  const handleCut = (node: FileNode) => {
    console.log('剪切', node);
    // TODO: 实现剪切功能
  };

  const handleCopy = (node: FileNode) => {
    console.log('复制', node);
    // TODO: 实现复制功能
  };

  const handleCopyPath = (node: FileNode) => {
    console.log('复制路径', node);
    if (node.path && navigator.clipboard) {
      navigator.clipboard.writeText(node.path);
    }
  };

  const handleCopyRelativePath = (node: FileNode) => {
    console.log('复制相对路径', node);
    if (node.path && navigator.clipboard) {
      // 获取相对于项目根目录的路径
      const rootPath = fileTree[0]?.path || '';
      const relativePath = node.path.replace(rootPath, '').replace(/^[\\/]/, '');
      navigator.clipboard.writeText(relativePath);
    }
  };

  const handleRename = (node: FileNode) => {
    console.log('重命名', node);
    // TODO: 实现重命名功能
  };

  const handleDelete = (node: FileNode) => {
    setDeleteConfirmDialog({
      isVisible: true,
      targetNode: node
    });
  };
  
  // 确认删除
  const handleDeleteConfirm = async () => {
    const { targetNode } = deleteConfirmDialog;
    if (!targetNode || !window.electronAPI) {
      return;
    }
    
    try {
      if (!targetNode.path) {
        console.error('文件路径不存在');
        return;
      }
      await window.electronAPI.deleteFile(targetNode.path);
      console.log('删除成功:', targetNode.path);
      
      // 刷新文件树
      const rootPath = fileTree[0]?.path;
      if (rootPath) {
        try {
          const files = await window.electronAPI.getFiles(rootPath);
          const newFileTree = [{
            id: rootPath, // 使用路径作为ID
            name: rootPath.split('\\').pop() || '根目录',
            type: 'folder' as const,
            path: rootPath,
            expanded: true,
            children: files.map((file) => ({
              id: file.path, // 使用路径作为ID
              name: file.name,
              type: file.isDirectory ? 'folder' as const : 'file' as const,
              path: file.path,
              expanded: false,
            }))
          }];
          useEditorStore.getState().setFileTree(newFileTree);
          
          // 恢复展开状态
          setTimeout(async () => {
            await stateSync.restoreState();
          }, 100);
          
          console.log('文件树已刷新');
        } catch (error) {
          console.error('刷新文件树失败:', error);
        }
      }
      
      // 如果删除的是当前打开的文件，关闭对应的标签页
      if (targetNode.type === 'file') {
        const openTabIndex = openTabs.findIndex(tab => tab.path === targetNode.path);
        if (openTabIndex !== -1) {
          closeTab(openTabIndex);
        }
      }
      
    } catch (error) {
      console.error('删除失败:', error);
      // 这里可以添加错误提示
    } finally {
      setDeleteConfirmDialog({
        isVisible: false,
        targetNode: null
      });
    }
  };
  
  // 取消删除
  const handleDeleteCancel = () => {
    setDeleteConfirmDialog({
      isVisible: false,
      targetNode: null
    });
  };

  // 递归渲染文件树
  const renderFileTree = (nodes: FileNode[]) => {
    return (
      <ul className="file-tree">
        {nodes.map(node => (
          <li key={node.id} className={`file-tree-item ${node.type}`}>
            <div 
              className={`file-tree-item-content ${selectedFile?.id === node.id ? 'selected' : ''}`}
              onClick={() => handleNodeClick(node)}
              onContextMenu={(e) => handleContextMenu(e, node)}
            >
              {node.type === 'folder' ? (
                <>
                  <span className="icon">
                    {node.expanded ? <FaChevronDown /> : <FaChevronRight />}
                  </span>
                  <span className="folder-icon"><FaFolder /></span>
                </>
              ) : (
                <span className="file-icon"><FaFile /></span>
              )}
              <span className="name">{node.name}</span>
            </div>
            {node.type === 'folder' && node.expanded && node.children && renderFileTree(node.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={`app-container ${(isLeftResizing || isRightResizing) ? 'resizing' : ''}`}>
      {/* 左侧工具栏 */}
      <div className="sidebar left-sidebar">
        <div 
          className={`sidebar-icon ${!leftPanelCollapsed ? 'active' : ''}`} 
          onClick={toggleLeftPanel} 
          title="文件浏览器"
        >
          <FaFolder />
        </div>
      </div>

      {/* 左侧面板 - 文件树 */}
      <div className={`left-panel ${leftPanelCollapsed ? 'collapsed' : ''}`}>
        <div className="panel-header">
          <h3>文件浏览器</h3>
        </div>
        <div className="panel-content">
          {renderFileTree(fileTree)}
        </div>
        {!leftPanelCollapsed && <div className="panel-resizer" onMouseDown={startLeftResize}></div>}
      </div>

      {/* 中间面板 - 编辑器 */}
      <div className="center-panel">
        {openTabs.length > 0 ? (
          <>
            <div className="editor-header">
              <div className="tabs-container">
                {openTabs.map((tab, index) => (
                  <div 
                    key={tab.id}
                    className={`tab ${index === activeTabIndex ? 'active' : ''}`}
                    onClick={() => setActiveTab(index)}
                  >
                    <span className="tab-name">{tab.name}</span>
                    <button 
                      className="tab-close"
                      onClick={(e) => {
                        e.stopPropagation();
                        closeTab(index);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="editor-container">
              {selectedFile && getFileLanguage(selectedFile.name) === 'csg' && (
                <div style={{ 
                  padding: '8px 16px', 
                  backgroundColor: '#2d2d2d', 
                  borderBottom: '1px solid #3c3c3c',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ color: '#e0e0e0', fontSize: '14px' }}>CSG文件:</span>
                  <button
                    onClick={() => setCsgPreviewMode(false)}
                    style={{
                      padding: '4px 12px',
                      backgroundColor: !csgPreviewMode ? '#007acc' : '#3c3c3c',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    编辑模式
                  </button>
                  <button
                    onClick={() => setCsgPreviewMode(true)}
                    style={{
                      padding: '4px 12px',
                      backgroundColor: csgPreviewMode ? '#007acc' : '#3c3c3c',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    预览模式
                  </button>
                </div>
              )}
              
              {selectedFile && getFileLanguage(selectedFile.name) === 'csg' && csgPreviewMode ? (
                <CSGRenderer 
                  content={selectedFile?.content || ''}
                  basePath={fileTree[0]?.path || ''}
                />
              ) : (
                <CodeMirrorEditor
                  value={selectedFile?.content || ''}
                  language={selectedFile ? getFileLanguage(selectedFile.name) : 'javascript'}
                  onChange={(value) => {
                    // 可以在这里添加文件内容变更处理
                    // console.log('文件内容已变更:', value);
                  }}
                  onFilePathComplete={handleFilePathComplete}
                />
              )}
            </div>
          </>
        ) : (
          <div className="empty-editor">
            <p>请从左侧文件树中打开一个文件</p>
          </div>
        )}
      </div>

      {/* 右侧面板 - 扩展功能 */}
      <div className={`right-panel ${rightPanelCollapsed ? 'collapsed' : ''}`}>
        <div className="panel-header">
          <h3>扩展面板</h3>
        </div>
        <div className="panel-content">
          <div className="extension-item">
            <h4>智能补全</h4>
            <p>支持中文拼音匹配</p>
          </div>
          <div className="extension-item">
            <h4>文件监听</h4>
            <p>实时监控文件变化</p>
          </div>
        </div>
        {!rightPanelCollapsed && <div className="panel-resizer" onMouseDown={startRightResize}></div>}
      </div>
      
      {/* 右侧工具栏 */}
      <div className="sidebar right-sidebar">
        <div 
          className={`sidebar-icon ${!rightPanelCollapsed ? 'active' : ''}`} 
          onClick={toggleRightPanel} 
          title="扩展面板"
        >
          <FaCog />
        </div>
        <div 
          className="sidebar-icon" 
          onClick={() => setIsSettingsOpen(true)} 
          title="设置"
        >
          <FaWrench />
        </div>
      </div>
      
      {/* 设置面板 */}
      <SettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
      
      {/* 右键菜单 */}
      <ContextMenu
        isVisible={contextMenu.isVisible}
        x={contextMenu.x}
        y={contextMenu.y}
        targetNode={contextMenu.targetNode}
        onClose={closeContextMenu}
        onNewFile={handleNewFile}
        onNewFolder={handleNewFolder}
        onShowInExplorer={handleShowInExplorer}
        onCut={handleCut}
        onCopy={handleCopy}
        onCopyPath={handleCopyPath}
        onCopyRelativePath={handleCopyRelativePath}
        onRename={handleRename}
        onDelete={handleDelete}
      />
      
      {/* 文件名输入弹窗 */}
      <FileNameDialog
        isVisible={fileNameDialog.isVisible}
        fileType={fileNameDialog.fileType}
        onConfirm={handleFileNameConfirm}
        onCancel={handleFileNameCancel}
      />
      
      {/* 删除确认弹窗 */}
      <DeleteConfirmDialog
        isVisible={deleteConfirmDialog.isVisible}
        targetNode={deleteConfirmDialog.targetNode}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  )
}

export default App
