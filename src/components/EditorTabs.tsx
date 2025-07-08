import React from 'react';
import type { FileNode } from '../store/editorStore';

interface EditorTabsProps {
  openTabs: FileNode[];
  activeTabIndex: number;
  onTabClick: (index: number) => void;
  onTabClose: (index: number) => void;
}

const EditorTabs: React.FC<EditorTabsProps> = ({
  openTabs,
  activeTabIndex,
  onTabClick,
  onTabClose
}) => {
  if (openTabs.length === 0) {
    return null;
  }

  return (
    <div className="editor-header">
      <div className="tabs-container">
        {openTabs.map((tab, index) => (
          <div 
            key={tab.id}
            className={`tab ${index === activeTabIndex ? 'active' : ''}`}
            onClick={() => onTabClick(index)}
          >
            <span className="tab-name">{tab.name}</span>
            <button 
              className="tab-close"
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(index);
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorTabs;