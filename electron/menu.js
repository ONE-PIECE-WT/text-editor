// 导入 electron 中的 Menu
import { Menu, app } from 'electron';

// 默认使用中文，可以根据需要切换语言
import ZHTextContainer from './constants/zh_constants';

// 使用导入的语言包
const TextContainer = ZHTextContainer;

// 创建菜单模板
const createMenuTemplate = () => {
  const template = [
    {
      label: TextContainer.file,
      submenu: [
        {
          label: TextContainer.new,
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            console.log('新建文件');
            // 这里添加新建文件的逻辑
          }
        },
        {
          label: TextContainer.open,
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            console.log('打开文件');
            // 这里添加打开文件的逻辑
          }
        },
        { type: 'separator' },
        {
          label: TextContainer.save,
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            console.log('保存文件');
            // 这里添加保存文件的逻辑
          }
        },
        { type: 'separator' },
        {
          label: TextContainer.exit,
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: TextContainer.edit,
      submenu: [
        { role: 'undo', label: TextContainer.undo },
        { role: 'redo', label: TextContainer.redo },
        { type: 'separator' },
        { role: 'cut', label: TextContainer.cut },
        { role: 'copy', label: TextContainer.copy },
        { role: 'paste', label: TextContainer.paste },
        { role: 'delete', label: TextContainer.delete },
        { type: 'separator' },
        { role: 'selectAll', label: TextContainer.selectAll }
      ]
    },
    {
      label: TextContainer.view,
      submenu: [
        { role: 'reload', label: TextContainer.reload },
        { role: 'forceReload', label: TextContainer.forceReload },
        { role: 'toggleDevTools', label: TextContainer.toggleDevTools },
        { type: 'separator' },
        { role: 'resetZoom', label: TextContainer.resetZoom },
        { role: 'zoomIn', label: TextContainer.zoomIn },
        { role: 'zoomOut', label: TextContainer.zoomOut },
        { type: 'separator' },
        { role: 'togglefullscreen', label: TextContainer.toggleFullscreen }
      ]
    },
    {
      label: TextContainer.help,
      submenu: [
        {
          label: TextContainer.about,
          click: () => {
            // 这里添加显示关于信息的逻辑
            console.log('关于');
          }
        }
      ]
    }
  ];

  return template;
};

// 创建菜单
const createMenu = () => {
  const menuTemplate = createMenuTemplate();
  return Menu.buildFromTemplate(menuTemplate);
};

export { createMenu };