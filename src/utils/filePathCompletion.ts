/**
 * 处理文件路径自动补全
 * @param partialPath 部分路径
 * @param currentFolder 当前文件夹路径
 * @returns 补全建议列表
 */
export const handleFilePathComplete = async (partialPath: string, currentFolder: string): Promise<string[]> => {
  try {
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