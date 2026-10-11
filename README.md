# 瑞安漂流日记

一座持续生长的个人数字花园。阅读、投资、学习与生活，记录想法的来处与变化。

采用 Astro + Markdown/MDX + GitHub Pages。写作方式参考 Maggie Appleton：日常笔记留在 OneNote，公开文章在 VS Code 中编辑，本地预览后通过脚本发布。

## 开始写作

在 VS Code 打开本项目，在终端运行：

```powershell
npm ci
npm run new -- "文章标题" --category "主题手记" --tags "阅读,个人成长"
npm run dev
```

新文章位于 `src/content/posts/`，默认是草稿。普通文章用 Markdown；需要插入自定义组件时，新建命令加 `--mdx`。

本地开发预览会显示草稿及明确标记的开发示例。正式构建会排除两者，首页、主题、归档、文章页、RSS 和 sitemap 使用相同公开边界。

## 预览与发布

```powershell
npm run publish:check
npm run preview
```

检查通过、正式预览正确后，在 VS Code 源代码管理中审阅并提交所需文件，再运行：

```powershell
npm run publish
```

脚本验证类型、草稿隔离和正式构建，然后推送已提交的 main 分支。GitHub Actions 构建成功才算上线。不会自动提交未审阅的改动。

- 网站：https://rxustrong.github.io/
- 发布状态：https://github.com/rxustrong/rxustrong.github.io/actions
- 前提：本机有仓库的 GitHub SSH 权限，Pages 配置为 GitHub Actions。

## 项目结构

- `src/content.config.ts`：标题、日期、栏目、标签、成长状态、草稿和示例字段。
- `src/content/posts/`：准备公开的 Markdown/MDX；私人素材留在项目之外。
- `src/pages/`：首页、花园、主题、年份归档、关于、文章详情、RSS。
- `src/utils/garden.ts`：统一公开过滤、日期和主题工具。
- `src/styles/global.css`：纸张、植物与长文阅读排版。
- `public/images/`：已决定公开的配图；其中的文件都会随站点发布。
- `scripts/new-post.mjs`：生成稳定文件名的新草稿。
- `scripts/publish.mjs`：发布前验证与推送。
- `tests/`：新文章生成和真实构建下的草稿隔离测试。

原有 `/admin/` 仍保留为可选入口，本次不依赖其登录、上传和发布链路；OAuth 尚未接通实测。

## 完整说明

见 [写作、图片、修订、发布与备份指南](docs/writing-guide.md)。

公开源码仓库中的草稿也可能被读取；`draft: true` 只代表不生成公开网站文章。私密笔记与照片原件继续保留在 OneNote、相册或 OneDrive。
