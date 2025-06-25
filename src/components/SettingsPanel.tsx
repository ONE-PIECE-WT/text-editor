import React, { useState, useEffect } from 'react';
import { useStateSync } from '../services/stateSync';
import { FaCog, FaTimes, FaDownload, FaUpload, FaTrash, FaSync } from 'react-icons/fa';
import './SettingsPanel.css';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const stateSync = useStateSync();
  const [settings, setSettings] = useState(() => stateSync.getEditorSettings() || {});
  const [updateStatus, setUpdateStatus] = useState<{
    checking: boolean;
    available: boolean;
    version?: string;
    error?: string;
  }>({ checking: false, available: false });

  // 更新设置
  const updateSetting = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    stateSync.updateEditorSettings({ [key]: value });
    
    // 如果是主题设置，立即应用到document和原生主题
    if (key === 'theme') {
      document.documentElement.setAttribute('data-theme', value);
      // 同步设置原生主题
      if (window.electronAPI?.setNativeTheme) {
        window.electronAPI.setNativeTheme(value);
      }
    }
  };

  // 导出设置
  const exportSettings = () => {
    const allSettings = {
      editorSettings: stateSync.getEditorSettings(),
      lastWorkspacePath: stateSync.getLastWorkspacePath(),
      timestamp: new Date().toISOString(),
    };
    
    const dataStr = JSON.stringify(allSettings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `text-editor-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 导入设置
  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        
        if (importedData.editorSettings) {
          stateSync.updateEditorSettings(importedData.editorSettings);
          setSettings(importedData.editorSettings);
        }
        
        if (importedData.lastWorkspacePath) {
          stateSync.saveWorkspacePath(importedData.lastWorkspacePath);
        }
        
        alert('设置导入成功！');
      } catch (error) {
        alert('导入失败：文件格式不正确');
      }
    };
    reader.readAsText(file);
    
    // 清空input值，允许重复选择同一文件
    event.target.value = '';
  };

  // 重置所有设置
  const resetSettings = () => {
    if (confirm('确定要重置所有设置吗？这将清除所有保存的状态。')) {
      stateSync.resetState();
      setSettings({});
      alert('设置已重置');
    }
  };

  // 检查更新
  const checkForUpdates = async () => {
    if (!window.electronAPI?.checkForUpdates) {
      setUpdateStatus({ checking: false, available: false, error: '更新功能不可用' });
      return;
    }

    setUpdateStatus({ checking: true, available: false });
    
    try {
      const result = await window.electronAPI.checkForUpdates();
      
      if (result.success) {
        if (result.updateInfo) {
          setUpdateStatus({
            checking: false,
            available: true,
            version: result.updateInfo.version
          });
        } else {
          setUpdateStatus({
            checking: false,
            available: false
          });
        }
      } else {
        setUpdateStatus({
          checking: false,
          available: false,
          error: result.error || '检查更新失败'
        });
      }
    } catch (error) {
      setUpdateStatus({
        checking: false,
        available: false,
        error: '检查更新时发生错误'
      });
    }
  };

  // 获取当前版本
  const [currentVersion, setCurrentVersion] = useState<string>('');
  
  useEffect(() => {
    if (window.electronAPI?.getAppVersion) {
      window.electronAPI.getAppVersion().then(setCurrentVersion);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="settings-overlay">
      <div className="settings-panel">
        <div className="settings-header">
          <h2><FaCog /> 编辑器设置</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className="settings-content">
          {/* 编辑器基础设置 */}
          <div className="settings-section">
            <h3>编辑器</h3>
            
            <div className="setting-item">
              <label>字体大小</label>
              <input
                type="number"
                min="10"
                max="24"
                value={settings.fontSize || 14}
                onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
              />
            </div>
            
            <div className="setting-item">
              <label>编辑器主题</label>
              <select
                value={settings.theme || 'light'}
                onChange={(e) => updateSetting('theme', e.target.value)}
              >
                <option value="light">浅色主题</option>
                <option value="dark">深色主题</option>
              </select>
            </div>
            
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.wordWrap !== false}
                  onChange={(e) => updateSetting('wordWrap', e.target.checked)}
                />
                自动换行
              </label>
            </div>
            
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.lineNumbers !== false}
                  onChange={(e) => updateSetting('lineNumbers', e.target.checked)}
                />
                显示行号
              </label>
            </div>
            
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.minimap !== false}
                  onChange={(e) => updateSetting('minimap', e.target.checked)}
                />
                显示小地图
              </label>
            </div>
          </div>
          
          {/* 工作区信息 */}
          <div className="settings-section">
            <h3>工作区</h3>
            <div className="setting-item">
              <label>当前工作区路径</label>
              <div className="workspace-path">
                {stateSync.getLastWorkspacePath() || '未选择工作区'}
              </div>
            </div>
          </div>
          
          {/* 应用更新 */}
          <div className="settings-section">
            <h3>应用更新</h3>
            
            <div className="setting-item">
              <label>当前版本</label>
              <div className="version-info">
                {currentVersion || '获取中...'}
              </div>
            </div>
            
            <div className="setting-actions">
              <button 
                className="action-btn update" 
                onClick={checkForUpdates}
                disabled={updateStatus.checking}
              >
                <FaSync className={updateStatus.checking ? 'spinning' : ''} /> 
                {updateStatus.checking ? '检查中...' : '检查更新'}
              </button>
            </div>
            
            {updateStatus.available && (
              <div className="update-available">
                <p>发现新版本: {updateStatus.version}</p>
                <p>应用将自动下载并安装更新</p>
              </div>
            )}
            
            {updateStatus.error && (
              <div className="update-error">
                <p>错误: {updateStatus.error}</p>
              </div>
            )}
            
            {!updateStatus.checking && !updateStatus.available && !updateStatus.error && updateStatus.version === undefined && (
              <div className="update-info">
                <p>点击检查更新按钮来查看是否有新版本</p>
              </div>
            )}
            
            {!updateStatus.checking && !updateStatus.available && !updateStatus.error && updateStatus.version !== undefined && (
              <div className="update-info">
                <p>当前已是最新版本</p>
              </div>
            )}
          </div>
          
          {/* 数据管理 */}
          <div className="settings-section">
            <h3>数据管理</h3>
            
            <div className="setting-actions">
              <button className="action-btn export" onClick={exportSettings}>
                <FaDownload /> 导出设置
              </button>
              
              <label className="action-btn import">
                <FaUpload /> 导入设置
                <input
                  type="file"
                  accept=".json"
                  onChange={importSettings}
                  style={{ display: 'none' }}
                />
              </label>
              
              <button className="action-btn reset" onClick={resetSettings}>
                <FaTrash /> 重置设置
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;