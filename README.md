# 文本编辑器 (Text Editor)

一个基于 Electron + React + TypeScript 的现代化文本编辑器，支持多种文件格式和 CSG 文件预览。

## 技术栈

### 前端技术
- **React 18** - 用户界面框架
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 快速构建工具
- **Zustand** - 轻量级状态管理
- **CodeMirror 6** - 代码编辑器核心
- **React Icons** - 图标库

### 桌面应用
- **Electron** - 跨平台桌面应用框架
- **Electron Builder** - 应用打包和分发

### 开发工具
- **ESLint** - 代码质量检查
- **GitHub Actions** - CI/CD 自动化

## 项目结构

```
src/
├── components/          # React 组件
│   ├── CSGRenderer.tsx     # CSG 文件渲染器
│   ├── CodeMirrorEditor.tsx # 代码编辑器
│   ├── FileTree.tsx        # 文件树组件
│   ├── EditorTabs.tsx      # 编辑器标签页
│   └── UIDialogs.tsx       # 各种对话框
├── hooks/               # 自定义 React Hooks
│   ├── useFileOperations.ts # 文件操作逻辑
│   ├── usePanelResize.ts   # 面板调整大小
│   ├── useWindowState.ts   # 窗口状态管理
│   └── useWorkspace.ts     # 工作区管理
├── store/               # 状态管理
│   ├── editorStore.ts      # 主要编辑器状态
│   └── persistStore.ts     # 持久化存储
├── services/            # 服务层
│   └── stateSync.ts        # 状态同步服务
├── utils/               # 工具函数
│   ├── fileLanguage.ts     # 文件语言检测
│   └── filePathCompletion.ts # 文件路径补全
└── App.tsx              # 主应用组件（待重构）
```

## 核心功能

- ✅ 文件树浏览和管理
- ✅ 多标签页编辑
- ✅ 语法高亮支持
- ✅ CSG 文件预览
- ✅ 文件路径自动补全
- ✅ 主题切换（浅色/深色）
- ✅ 面板大小调整
- ✅ 右键菜单操作

## 开发规范

### 代码质量要求
1. **类型安全**：所有组件和函数必须有完整的 TypeScript 类型定义
2. **空值检查**：对所有可能为 `undefined` 的属性进行检查
3. **导入规范**：
   - React 组件使用 `import React from 'react'`
   - 类型导入使用 `import type { ... }`
   - 相对路径导入使用 `./` 或 `../`
4. **组件设计**：
   - 单一职责原则
   - Props 接口明确定义
   - 错误边界处理
   - 性能优化（memo, useMemo, useCallback）

### 常见问题避免
1. **JSX 命名空间**：使用 `React.ReactElement` 而不是 `JSX.Element`
2. **可选属性处理**：使用 `?.` 操作符和默认值
3. **异步操作**：正确处理 Promise 和错误捕获
4. **状态更新**：避免直接修改状态，使用不可变更新

## 重构计划

### App.tsx 组件拆分
当前 App.tsx 文件过大（278行），需要拆分为以下组件：

1. **LeftSidebar** - 左侧工具栏
   - 文件浏览器图标
   - 设置图标
   - 其他工具图标

2. **LeftPanel** - 左侧面板
   - 文件树显示
   - 面板折叠/展开
   - 调整大小功能

3. **CenterPanel** - 中央编辑区域
   - 编辑器标签页
   - 代码编辑器
   - CSG 预览模式切换

4. **RightPanel** - 右侧面板（预留）
   - 属性面板
   - 预览面板

5. **AppLayout** - 布局容器
   - 整体布局管理
   - 面板状态协调

### 错误边界实现
- **ErrorBoundary** 组件
- 全局错误处理
- 用户友好的错误提示

### 测试框架
- Jest + React Testing Library
- 组件单元测试
- 集成测试
- E2E 测试（Playwright）

## 构建和部署

### 开发环境
```bash
npm install
npm run dev
```

### 生产构建
```bash
npm run build
```

### 应用打包
```bash
npm run dist
```

### GitHub Actions
- 自动构建和发布
- 多平台支持（Windows, macOS）
- 超时和重试机制
- 完整权限配置

## 注意事项

1. **重构原则**：确保每次修改后代码能正常运行
2. **类型检查**：修改前后都要通过 TypeScript 编译
3. **功能验证**：重构后验证所有功能正常工作
4. **渐进式重构**：一次只重构一个组件，避免大范围修改
5. **备份重要**：重构前确保代码已提交到版本控制

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License
