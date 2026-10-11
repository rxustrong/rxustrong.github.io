# 瑞安漂流日记：从想法到公开文章

推荐流程：OneNote 收集 → VS Code 写 Markdown/MDX → 本地预览 → 审阅与提交 → 发布。

## 1. 日常积累留在 OneNote

截图、资料、零散想法和私人复盘继续保留在那里。只把主动选择公开的内容整理到博客。无需迁移全部笔记，也不需要每篇都交给 AI。

Tana 是 Maggie 收集、连接和结构化想法的笔记工具。它不是博客生成器。OneNote 已经能承担你的素材收集工作。Obsidian 可选：以后若希望以本地 Markdown 和链接管理更多笔记，再考虑；目前不用为了建站换工具。

## 2. 打开项目并新建文章

在 VS Code 打开 `D:\Projects\Coding\个人系统思考\blog`，在终端运行：

```powershell
npm run new -- "文章标题" --category "主题手记" --tags "阅读,个人成长"
npm run dev
```

命令会输出新文件的位置和预览地址。普通文章用 `.md` 足够；要插入自定义组件时，可在新建命令后加 `--mdx`。

编辑器中也可以直接创建文件。文章放在 `src/content/posts/`，示例字段：
也可以使用 VS Code「终端 → 运行任务」，选择「博客：新建草稿」「博客：本地预览（含草稿）」或「博客：发布前检查」，减少手输命令。

```yaml
---
title: "文章标题"
description: "这篇文章讨论什么"
date: 2026-10-12
category: "主题手记"
tags: ["阅读", "个人成长"]
growth: seedling
draft: true
---
```

正文写在字段之后。`category` 为成长记录、主题手记、阶段回顾之一。`growth` 为 `seedling`（幼苗）、`budding`（生长中）或 `evergreen`（常青），与是否公开独立。

标题可以修改；文件名决定稳定文章地址，发布后保留文件名。

## 3. 预览、配图与修订

打开终端打印的本地地址，通常是 `http://localhost:4321/`。`npm run dev` 显示草稿，并带本地预览标识；正式构建排除草稿和开发示例。端口占用时以终端实际地址为准。

准备公开的照片副本放在 `public/images/`，正文引用：

```markdown
![照片的说明](/images/reading-notes.jpg)
```

私人原件仍留在相册或 OneDrive。`public/` 下的文件会发布，即使引用它们的文章是草稿；未打算公开的图片不要先放进去。

修订时可以增加 `updateDate: 2026-10-20`，并在正文留下带日期的修订说明。Git 历史不代替读者能看到的说明。

## 4. 自己发布

检查文字、图片和资料来源后，把要公开的文章改成 `draft: false`。`demo: true` 的开发示例始终不会公开。

```powershell
npm run publish:check
```

它检查类型、验证草稿没有进入公开产物，然后构建正式网站，不会推送。可以再运行 `npm run preview`，查看正式构建结果；此时草稿应消失。

在 VS Code「源代码管理」中审阅并提交需要发布的文件，包括文章、公开配图和经过审阅的网站修改。不要把私人笔记一起提交。然后运行：

```powershell
npm run publish
```

脚本再次验证，并将已提交的 main 分支推送到既有 GitHub 仓库；GitHub Actions 自动部署。发布需本机有该仓库的 GitHub SSH 权限，Pages 已配置为 GitHub Actions。

查看 https://github.com/rxustrong/rxustrong.github.io/actions 。构建失败时站点不会更新；成功后检查 https://rxustrong.github.io/ 的文章、图片和主题。

这与 Maggie 的「文件写作、本地预览、Git 管理、脚本发布」模式一致。托管沿用现有 GitHub Pages；没有引入 Vercel 账号。`npm run publish` 不会自动提交未审阅的文件。

## 5. 手机与备份

主流程在电脑上完成；手机可继续记 OneNote，回电脑整理。现有 `/admin/` 保留为可选入口，但本次未接通 OAuth 和验证真实登录，因此日常流程不依赖它。手机文件上传也不会自动转换 Word/PDF。

公开文章和配图定期复制到 OneDrive 中单独的备份目录；不要把整个含 node_modules 的项目作为内容备份。私人 OneNote 使用其原有同步与备份方式。GitHub 公开仓库中的草稿源码也可能被别人看到，草稿不等于私密。

## 已验证与上线边界

本地构建、草稿隔离、主题路由和新文章生成由项目检查验证。真实文章审核、GitHub 登录权限、Actions 远端部署与目标网络访问体验仍需首次正式发布检验。
