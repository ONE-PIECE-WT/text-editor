import React from 'react';
import { FaFolder, FaCog } from 'react-icons/fa';

interface LeftSidebarProps {
  leftPanelCollapsed: boolean;
  onToggleLeftPanel: () => void;
  onOpenSettings: () => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  leftPanelCollapsed,
  onToggleLeftPanel,
  onOpenSettings
}) => {
  return (
    <div className="sidebar left-sidebar">
      <div 
        className={`sidebar-icon ${!leftPanelCollapsed ? 'active' : ''}`} 
        onClick={onToggleLeftPanel} 
        title="文件浏览器"
      >
        <FaFolder />
      </div>
      <div 
        className="sidebar-icon" 
        onClick={onOpenSettings} 
        title="设置"
      >
        <FaCog />
      </div>
    </div>
  );
};

export default LeftSidebar;