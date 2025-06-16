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

interface CodeMirrorEditorProps {
  value: string;
  language?: string;
  onChange?: (value: string) => void;
  onFilePathComplete?: (path: string) => Promise<string[]>;
}

// 文件路径自动补全函数
const createFilePathCompletion = (onFilePathComplete?: (path: string) => Promise<string[]>) => {
  return autocompletion({
    override: [
      async (context: CompletionContext) => {
        if (!onFilePathComplete) return null;
        
        const line = context.state.doc.lineAt(context.pos);
        const lineText = line.text;
        
        // 检测文件路径模式（简单的启发式检测）
        const pathMatch = lineText.match(/["']([^"']*?)$/); // 匹配引号内的路径
        if (!pathMatch) return null;
        
        const partialPath = pathMatch[1];
        const from = line.from + pathMatch.index! + 1; // 引号后的位置
        
        try {
          // 获取文件列表
          const files = await onFilePathComplete(partialPath);
          
          return {
            from,
            options: files.map(file => ({
              label: file,
              type: 'file',
              info: '文件路径'
            }))
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
        getLanguageSupport(language),
        createFilePathCompletion(onFilePathComplete),
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