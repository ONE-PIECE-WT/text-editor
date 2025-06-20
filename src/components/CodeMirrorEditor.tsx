import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { autocompletion, CompletionContext } from '@codemirror/autocomplete';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { csg } from './CSGLanguage';

// 自定义补全样式主题
const completionTheme = EditorView.theme({
  '.cm-tooltip-autocomplete ul li': {
    display: 'flex !important',
    justifyContent: 'space-between !important',
    alignItems: 'center !important'
  },
  '.cm-completionLabel': {
    fontSize: '15px !important', // 匹配项字体变大一号
    fontWeight: '500 !important'
  },
  '.cm-completionDetail': {
    fontSize: '13px !important', // 路径字体大小不变
    color: '#888 !important',   // 路径颜色使用更暗的颜色
    marginLeft: 'auto !important',
    opacity: '0.7 !important'
  }
});

interface CodeMirrorEditorProps {
  value: string;
  language?: string;
  onChange?: (value: string) => void;
  onFilePathComplete?: (path: string) => Promise<string[]>;
}

// 防抖请求ID
let requestId = 0;

// 文件路径自动补全函数
const createFilePathCompletion = (onFilePathComplete?: (path: string) => Promise<string[]>) => {
  return autocompletion({
    override: [
      async (context: CompletionContext) => {
        const currentRequest = ++requestId;
        
        if (!onFilePathComplete) return null;
        
        const line = context.state.doc.lineAt(context.pos);
        const lineText = line.text;
        const cursorPos = context.pos - line.from;
        
        // 获取光标前的单词（支持中文字符、路径分隔符等）
        const beforeCursor = lineText.slice(0, cursorPos);
        const wordMatch = beforeCursor.match(/([\p{L}\p{N}_\-\.\/]*)$/u);
        
        if (!wordMatch) return null;
        
        const partialPath = wordMatch[1];
        const from = line.from + wordMatch.index!;
        
        // 如果输入的字符太少，不触发补全
        if (partialPath.length < 1) return null;
        
        try {
          // 获取文件列表
          const files = await onFilePathComplete(partialPath);
          
          // 检查请求是否已被新请求替代
          if (currentRequest !== requestId) return null;
          
          // 清理文件列表，过滤掉无效项
          const sanitizedFiles = files
            .filter(file => typeof file === 'string' && file.trim().length > 0)
            .map(file => file.trim());
          
          // 调试输出
          console.log('编辑器接收到的文件列表:', files);
          console.log('清洗后的文件列表:', sanitizedFiles);
          sanitizedFiles.forEach((f, i) => console.log(`文件${i}:`, f, '长度:', f.length));
          
          return {
            from,
            options: sanitizedFiles.map(file => {
              // 提取文件夹路径作为label显示
              const pathParts = file.split('/');
              const fileName = pathParts[pathParts.length - 1];
              const folderPath = pathParts.length > 1 ? pathParts.slice(0, -1).join('/') : '根目录';
              
              return {
                label: fileName,
                type: 'file',
                detail: folderPath, // 显示文件夹路径
                apply: file,  // 明确指定插入文本
                boost: 99     // 提升权重
              };
            }),
            validFor: (text, from, to, state) => {
              // 获取当前输入的文本
              const currentInput = text.slice(from, to);
              // 只有当输入长度变化时才重新触发补全
              return false; // 强制每次输入都重新获取补全
            },
            filter: false     // 关闭自动过滤，使用我们自己的匹配逻辑
          };
        } catch (error) {
          console.error('获取文件路径补全失败:', error);
          return null;
        }
      }
    ]
  });
};

// 获取语言支持
const getLanguageSupport = (language: string) => {
  switch (language.toLowerCase()) {
    case 'javascript':
    case 'js':
    case 'jsx':
      return javascript({ jsx: true });
    case 'typescript':
    case 'ts':
    case 'tsx':
      return javascript({ jsx: true, typescript: true });
    case 'css':
      return css();
    case 'html':
      return html();
    case 'json':
      return json();
    case 'markdown':
    case 'md':
      return markdown();
    case 'csg':
      return csg(); // 自定义CSG文件类型
    default:
      return javascript(); // 默认使用JavaScript
  }
};

const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({
  value,
  language = 'javascript',
  onChange,
  onFilePathComplete
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    // 创建编辑器状态
    const state = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        oneDark, // 暗色主题
        completionTheme, // 自定义补全样式
        getLanguageSupport(language),
        createFilePathCompletion(onFilePathComplete),
        autocompletion({
          maxRenderedOptions: 100 // 增加最大显示选项数量
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged && onChange) {
            onChange(update.state.doc.toString());
          }
        }),
        EditorView.theme({
          '&': {
            height: '100%',
            fontSize: '14px'
          },
          '.cm-content': {
            padding: '10px',
            minHeight: '100%'
          },
          '.cm-focused': {
            outline: 'none'
          },
          '.cm-editor': {
            height: '100%'
          },
          '.cm-scroller': {
            height: '100%'
          }
        })
      ]
    });

    // 创建编辑器视图
    const view = new EditorView({
      state,
      parent: editorRef.current
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, [language, onFilePathComplete]);

  // 当value从外部改变时更新编辑器内容
  useEffect(() => {
    if (viewRef.current && value !== viewRef.current.state.doc.toString()) {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: value
        }
      });
    }
  }, [value]);

  return <div ref={editorRef} style={{ height: '100%', width: '100%' }} />;
};

export default CodeMirrorEditor;