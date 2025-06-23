import { Menu as m, BrowserWindow as u, app as c, ipcMain as s, nativeTheme as h, shell as g, dialog as b } from "electron";
import i, { dirname as w } from "path";
import n from "fs";
import { fileURLToPath as y } from "url";
const f = {
  file: "文件",
  new: "新建",
  open: "打开",
  openFolder: "打开文件夹",
  save: "保存",
  exit: "退出",
  edit: "编辑",
  undo: "撤销",
  redo: "重做",
  cut: "剪切",
  copy: "复制",
  paste: "粘贴",
  delete: "删除",
  selectAll: "全选",
  view: "视图",
  reload: "重新加载",
  forceReload: "强制重新加载",
  toggleDevTools: "开发者工具",
  resetZoom: "重置缩放",
  zoomIn: "放大",
  zoomOut: "缩小",
  toggleFullscreen: "全屏",
  help: "帮助",
  about: "关于"
}, r = f, _ = () => [
  {
    label: r.file,
    submenu: [
      {
        label: r.new,
        accelerator: "CmdOrCtrl+N",
        click: () => {
          console.log("新建文件");
        }
      },
      {
        label: r.open,
        accelerator: "CmdOrCtrl+O",
        click: () => {
          console.log("打开文件");
        }
      },
      {
        label: r.openFolder,
        accelerator: "CmdOrCtrl+Shift+O",
        click: () => {
          console.log("打开文件夹");
          const e = u.getFocusedWindow();
          e && e.webContents.send("open-folder");
        }
      },
      { type: "separator" },
      {
        label: r.save,
        accelerator: "CmdOrCtrl+S",
        click: () => {
          console.log("保存文件");
        }
      },
      { type: "separator" },
      {
        label: r.exit,
        accelerator: "CmdOrCtrl+Q",
        click: () => {
          c.quit();
        }
      }
    ]
  },
  {
    label: r.edit,
    submenu: [
      { role: "undo", label: r.undo },
      { role: "redo", label: r.redo },
      { type: "separator" },
      { role: "cut", label: r.cut },
      { role: "copy", label: r.copy },
      { role: "paste", label: r.paste },
      { role: "delete", label: r.delete },
      { type: "separator" },
      { role: "selectAll", label: r.selectAll }
    ]
  },
  {
    label: r.view,
    submenu: [
      { role: "reload", label: r.reload },
      { role: "forceReload", label: r.forceReload },
      { role: "toggleDevTools", label: r.toggleDevTools },
      { type: "separator" },
      { role: "resetZoom", label: r.resetZoom },
      { role: "zoomIn", label: r.zoomIn },
      { role: "zoomOut", label: r.zoomOut },
      { type: "separator" },
      { role: "togglefullscreen", label: r.toggleFullscreen }
    ]
  },
  {
    label: r.help,
    submenu: [
      {
        label: r.about,
        click: () => {
          console.log("关于");
        }
      }
    ]
  }
], v = () => {
  const l = _();
  return m.buildFromTemplate(l);
};
let t = null;
const C = y(import.meta.url), d = w(C);
function p() {
  if (t = new u({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: "大触",
    titleBarStyle: "default",
    backgroundColor: "#1e1e1e",
    // 深色背景
    webPreferences: {
      preload: i.join(d, "preload.js"),
      // 确保使用正确的预加载脚本路径
      nodeIntegration: !1,
      contextIsolation: !0
    },
    // 窗口图标
    icon: i.join(d, "../public/logo.ico")
  }), process.env.VITE_DEV_SERVER_URL)
    t.loadURL(process.env.VITE_DEV_SERVER_URL), t.webContents.openDevTools();
  else {
    const l = i.join(d, "../dist/index.html");
    t.loadFile(l);
  }
  t.on("closed", () => {
    t = null;
  }), t.webContents.on("did-finish-load", () => {
  });
}
s.handle("set-native-theme", async (l, e) => {
  try {
    return h.themeSource = e, { success: !0 };
  } catch (o) {
    return console.error("Error setting native theme:", o), { success: !1, error: o.message };
  }
});
s.handle("get-files", async (l, e) => {
  try {
    return (await n.promises.readdir(e, { withFileTypes: !0 })).map((a) => ({
      name: a.name,
      isDirectory: a.isDirectory(),
      path: i.join(e, a.name)
    }));
  } catch (o) {
    return console.error("Error reading directory:", o), [];
  }
});
s.handle("get-file-content", async (l, e) => {
  try {
    return await n.promises.readFile(e, "utf-8");
  } catch (o) {
    throw console.error("Error reading file:", o), o;
  }
});
s.on("open-folder-dialog", async (l) => {
  if (t)
    try {
      console.log("打开文件夹对话框");
      const e = await b.showOpenDialog(t, {
        properties: ["openDirectory"],
        title: "选择要打开的文件夹",
        buttonLabel: "打开文件夹"
      });
      if (!e.canceled && e.filePaths.length > 0) {
        const o = e.filePaths[0];
        console.log("用户选择的文件夹路径:", o);
        try {
          await n.promises.access(o, n.constants.R_OK), l.reply("selected-folder", o);
        } catch (a) {
          console.error("无法访问选择的文件夹:", a);
        }
      } else
        console.log("用户取消了文件夹选择");
    } catch (e) {
      console.error("打开文件夹对话框时出错:", e);
    }
  else
    console.error("主窗口不存在，无法打开文件夹对话框");
});
s.handle("create-file", async (l, e, o) => {
  try {
    await n.promises.writeFile(e, o, "utf-8"), console.log("文件创建成功:", e);
  } catch (a) {
    throw console.error("创建文件失败:", a), a;
  }
});
s.handle("create-folder", async (l, e) => {
  try {
    await n.promises.mkdir(e, { recursive: !0 }), console.log("文件夹创建成功:", e);
  } catch (o) {
    throw console.error("创建文件夹失败:", o), o;
  }
});
s.handle("delete-file", async (l, e) => {
  try {
    (await n.promises.stat(e)).isDirectory() ? (await n.promises.rmdir(e, { recursive: !0 }), console.log("文件夹删除成功:", e)) : (await n.promises.unlink(e), console.log("文件删除成功:", e));
  } catch (o) {
    throw console.error("删除失败:", o), o;
  }
});
s.handle("show-in-explorer", async (l, e) => {
  try {
    g.showItemInFolder(e), console.log("在资源管理器中显示:", e);
  } catch (o) {
    throw console.error("显示文件失败:", o), o;
  }
});
c.whenReady().then(() => {
  h.themeSource = "dark", p(), m.setApplicationMenu(v()), c.on("activate", () => {
    t === null && p();
  });
});
c.on("window-all-closed", () => {
  process.platform !== "darwin" && c.quit();
});
