# Puppeteer Auto

基于 Puppeteer 的网页自动化工具，支持页面访问、截图和京东签到等功能。

## 🚀 功能特性

- 📄 页面自动化访问
- 📸 网页截图功能
- 🛒 京东自动签到
- 🔧 模块化设计
- 🌍 环境配置支持

## 📦 安装

```bash
# 克隆项目
git clone <repository-url>
cd puppeteer-auto

# 安装依赖
pnpm install
```

## ⚙️ 配置

1. 复制环境变量模板：

```bash
cp .env.example .env
```

2. 编辑 `.env` 文件：

```env
# 调试模式 (true: 显示浏览器界面, false: 无头模式)
DEBUG=false

# 京东签到配置
JD_COOKIE_VALUE=your_jd_cookie_value
```

## 🎯 使用方法

### 基础页面访问

```bash
pnpm start page
```

### 网页截图

```bash
pnpm start screenshot
```

### 京东签到

```bash
pnpm start jd
```

### 开发模式

```bash
pnpm dev
```

## 📁 项目结构

```
puppeteer-auto/
├── action/          # 自动化动作模块
│   ├── goPage.js    # 页面访问
│   ├── screenshot.js # 截图功能
│   └── index.js     # 模块导出
├── constant/        # 常量配置
│   └── index.js
├── utils/           # 工具函数
│   ├── fs.js        # 文件系统工具
│   ├── tool.js      # 通用工具
│   └── index.js
├── config/          # 配置文件
│   └── index.js
├── logs/            # 日志文件
├── screenshots/     # 截图输出
├── index.js         # 主入口
└── package.json
```

## 🔧 开发

### 代码规范

项目使用 ESLint + Prettier 进行代码格式化：

```bash
# 格式化代码
pnpm format

# 检查代码规范
pnpm lint
```

### 测试

```bash
# 运行测试
pnpm test

# 运行测试并生成覆盖率报告
pnpm test:coverage
```

## 📝 日志

项目支持结构化日志记录，日志文件保存在 `logs/` 目录下：

- `app.log` - 应用日志
- `error.log` - 错误日志

## 🤝 贡献

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 ISC 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## ⚠️ 免责声明

本项目仅供学习和研究使用，请遵守相关网站的使用条款和法律法规。使用本工具进行自动化操作时，请确保您有相应的权限。
