/**
 * 根据文件扩展名获取语言类型
 * @param fileName 文件名
 * @returns 语言类型
 */
export const getFileLanguage = (fileName: string): string => {
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