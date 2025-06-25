import { LanguageSupport } from '@codemirror/language';
import { StreamLanguage } from '@codemirror/language';

// 简化的CSG语言定义，基于流式解析
const csgLanguage = StreamLanguage.define({
  name: 'csg',
  startState: () => ({ inImage: false, inBold: false, inItalic: false }),
  token: (stream) => {
    // 处理图片语法 ![alt](path)
    if (stream.match(/!\[([^\]]*)\]\(([^\)]*)\)/)) {
      return 'link';
    }
    
    // 处理标题 # 标题
    if (stream.sol() && stream.match(/^#+\s+/)) {
      stream.skipToEnd();
      return 'heading';
    }
    
    // 处理粗体 **文本**
    if (stream.match(/\*\*([^*]+)\*\*/)) {
      return 'strong';
    }
    
    // 处理斜体 *文本*
    if (stream.match(/\*([^*]+)\*/)) {
      return 'emphasis';
    }
    
    // 默认处理
    stream.next();
    return null;
  }
});

// 简单的语法高亮规则（基于正则表达式）
const csgHighlight = [
  // 图片语法：![alt](path)
  {
    regex: /!\[([^\]]*)\]\(([^\)]*)\)/g,
    style: 'image'
  },
  // 标题：# 标题
  {
    regex: /^#+\s+.*/gm,
    style: 'heading'
  },
  // 粗体：**文本**
  {
    regex: /\*\*([^*]+)\*\*/g,
    style: 'bold'
  },
  // 斜体：*文本*
  {
    regex: /\*([^*]+)\*/g,
    style: 'italic'
  }
];

// 导出CSG语言支持
export const csg = () => new LanguageSupport(csgLanguage);

// 导出语法高亮规则供编辑器使用
export { csgHighlight };

// CSG文件内容解析器
export interface CSGElement {
  type: 'text' | 'image' | 'heading' | 'bold' | 'italic';
  content: string;
  alt?: string; // 图片的alt文本
  path?: string; // 图片路径
  level?: number; // 标题级别
}

// 显式导出CSGElement类型
// 由于已经在接口声明时导出了CSGElement，这里不需要重复导出

// 解析CSG文件内容
export const parseCSGContent = (content: string): CSGElement[] => {
  const elements: CSGElement[] = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    // 检查图片
    const imageMatch = line.match(/!\[([^\]]*)\]\(([^\)]*)\)/);
    if (imageMatch) {
      elements.push({
        type: 'image',
        content: imageMatch[0],
        alt: imageMatch[1],
        path: imageMatch[2]
      });
      continue;
    }
    
    // 检查标题
    const headingMatch = line.match(/^(#+)\s+(.*)/);
    if (headingMatch) {
      elements.push({
        type: 'heading',
        content: headingMatch[2],
        level: headingMatch[1].length
      });
      continue;
    }
    
    // 检查粗体和斜体（简化处理）
    if (line.includes('**')) {
      elements.push({
        type: 'bold',
        content: line
      });
      continue;
    }
    
    if (line.includes('*')) {
      elements.push({
        type: 'italic',
        content: line
      });
      continue;
    }
    
    // 普通文本
    if (line.trim()) {
      elements.push({
        type: 'text',
        content: line
      });
    }
  }
  
  return elements;
};