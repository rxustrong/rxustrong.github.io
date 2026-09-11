# 阿燃的漂流日记

个人博客：**阿燃的漂流日记**（https://rxustrong.github.io）

技术栈：Astro + GitHub Pages（GitHub Actions 自动构建部署）+ Sveltia CMS（站内富文本编辑器）。

## 结构

```
blog/
├── src/
│   ├── content.config.ts   # 文章 schema（标题/日期/标签/摘要）
│   ├── content/posts/      # 文章（markdown），新文章由后台自动生成
│   ├── layouts/            # 页面布局
│   ├── pages/              # 首页 / 文章列表 / 文章详情 / 关于 / RSS
│   ├── components/         # 文章卡片、标签等组件
│   └── styles/             # 全局样式（明暗自适应）
├── public/
│   ├── admin/              # 写作后台（Sveltia CMS）
│   └── favicon.svg
└── .github/workflows/deploy.yml  # push main → 构建 → 部署到 Pages
```

## 日常写作（推荐，网页操作）

1. 打开 **https://rxustrong.github.io/admin**
2. 登录（GitHub 账号授权，或令牌登录）
3. 新建/编辑文章 → 保存（草稿）→ 发布
4. 发布后系统自动构建，约 1 分钟上线

## 本地开发

```bash
npm install
npm run dev      # 本地预览
npm run build    # 构建产物到 dist/
```

## 维护承诺

- 样式在 `src/styles/global.css` 与各页面中，一次写好，改站名在 `src/layouts/Layout.astro`。
- 出错找我修：`npm run build` 能过，线上一般就没事。