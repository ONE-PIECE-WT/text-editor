import React from 'react';

interface RightPanelProps {
  rightPanelCollapsed: boolean;
  onStartResize: (e: React.MouseEvent) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({
  rightPanelCollapsed,
  onStartResize
}) => {
  return (
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
        <div className="extension-item">
          <h4>代码格式化</h4>
          <p>自动格式化代码</p>
        </div>
        <div className="extension-item">
          <h4>语法检查</h4>
          <p>实时语法错误检测</p>
        </div>
      </div>
      {!rightPanelCollapsed && (
        <div className="panel-resizer" onMouseDown={onStartResize}></div>
      )}
    </div>
  );
};

export default RightPanel;