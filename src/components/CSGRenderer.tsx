import React from 'react';
import { parseCSGContent } from './CSGLanguage';
import type { CSGElement } from './CSGLanguage';

interface CSGRendererProps {
  content: string;
  basePath?: string; // 用于解析相对路径的基础路径
}

const CSGRenderer: React.FC<CSGRendererProps> = ({ content, basePath = '' }) => {
  const elements = parseCSGContent(content);

  const renderElement = (element: CSGElement, index: number) => {
    switch (element.type) {
      case 'heading':
        const level = Math.min(element.level || 1, 6);
        const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
        return React.createElement(
          HeadingTag,
          {
            key: index,
            style: {
              color: '#e0e0e0',
              marginTop: '20px',
              marginBottom: '10px',
              fontSize: `${2.5 - level * 0.3}em`
            }
          },
          element.content
        );
        
      case 'image':
        const imagePath = element.path?.startsWith('http') || element.path?.includes(':') 
          ? element.path 
          : `${basePath}/${element.path}`;
        return (
          <div key={index} style={{ margin: '15px 0', textAlign: 'center' }}>
            <img 
              src={imagePath}
              alt={element.alt || '图片'}
              style={{ 
                maxWidth: '100%', 
                height: 'auto',
                borderRadius: '4px',
                border: '1px solid #3c3c3c'
              }}
              onError={(e) => {
                // 图片加载失败时显示占位符
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const placeholder = target.nextElementSibling as HTMLElement;
                if (placeholder) {
                  placeholder.style.display = 'block';
                }
              }}
            />
            <div 
              style={{ 
                display: 'none',
                padding: '20px',
                backgroundColor: '#2d2d2d',
                border: '1px solid #3c3c3c',
                borderRadius: '4px',
                color: '#888',
                fontSize: '14px'
              }}
            >
              📷 图片加载失败: {element.alt || element.path}
            </div>
            {element.alt && (
              <div style={{ 
                fontSize: '12px', 
                color: '#888', 
                marginTop: '5px',
                fontStyle: 'italic'
              }}>
                {element.alt}
              </div>
            )}
          </div>
        );
        
      case 'bold':
        // 简单的粗体处理
        const boldContent = element.content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        return (
          <p 
            key={index} 
            style={{ color: '#e0e0e0', margin: '10px 0', lineHeight: '1.6' }}
            dangerouslySetInnerHTML={{ __html: boldContent }}
          />
        );
        
      case 'italic':
        // 简单的斜体处理
        const italicContent = element.content.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        return (
          <p 
            key={index} 
            style={{ color: '#e0e0e0', margin: '10px 0', lineHeight: '1.6' }}
            dangerouslySetInnerHTML={{ __html: italicContent }}
          />
        );
        
      case 'text':
      default:
        return (
          <p 
            key={index} 
            style={{ 
              color: '#e0e0e0', 
              margin: '10px 0', 
              lineHeight: '1.6',
              fontSize: '14px'
            }}
          >
            {element.content}
          </p>
        );
    }
  };

  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: '#1e1e1e',
      height: '100%',
      overflow: 'auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {elements.length > 0 ? (
        elements.map(renderElement)
      ) : (
        <div style={{ 
          color: '#888', 
          textAlign: 'center', 
          marginTop: '50px',
          fontSize: '16px'
        }}>
          📝 CSG文件内容为空
          <div style={{ fontSize: '14px', marginTop: '10px' }}>
            支持的语法：<br/>
            # 标题<br/>
            **粗体文本**<br/>
            *斜体文本*<br/>
            ![图片描述](图片路径)
          </div>
        </div>
      )}
    </div>
  );
};

export default CSGRenderer;