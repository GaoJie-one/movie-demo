# React + Webpack 演示项目

这是一个使用Webpack 5构建的React 18演示项目，包含Babel转译、CSS和图片资源处理、热重载开发服务器等特性。

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

浏览器会自动打开 [http://localhost:3000](http://localhost:3000)

### 3. 打包生产环境代码

```bash
npm run build
```

打包后的文件会输出到 `dist/` 目录。

## 目录结构

```
├── public
│   └── index.html
├── src
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .babelrc
├── package.json
├── webpack.config.js
└── README.md
```

## 主要特性
- React 18 最新版本
- Webpack 5 构建工具
- Babel 转译支持
- 热重载开发服务器
- CSS 样式支持
- 图片资源处理

---

如需自定义或扩展功能，请修改 `webpack.config.js` 或相关源码。 