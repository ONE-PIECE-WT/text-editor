import React from 'react';
import { FaCog, FaWrench } from 'react-icons/fa';

interface RightSidebarProps {
  rightPanelCollapsed: boolean;
  onToggleRightPanel: () => void;
  onOpenSettings: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  rightPanelCollapsed,
  onToggleRightPanel,
  onOpenSettings
}) => {
  return (
    <div className="sidebar right-sidebar">
      <div 
        className={`sidebar-icon ${!rightPanelCollapsed ? 'active' : ''}`} 
        onClick={onToggleRightPanel} 
        title="扩展面板"
      >
        <FaCog />
      </div>
      <div 
        className="sidebar-icon" 
        onClick={onOpenSettings} 
        title="设置"
      >
        <FaWrench />
      </div>
    </div>
  );
};

export default RightSidebar;