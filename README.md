# 你的博客（GitHub Pages + Jekyll）

零服务器、零费用、零维护。构建由 GitHub 自动完成，你只写 markdown。

## 结构

```
blog/
├── README.md        # 本文件：结构、规则、上线流程
├── _config.yml      # 站点配置（标题、链接格式）
├── .gitignore       # 忽略构建产物
├── index.md         # 首页：文章列表
├── _layouts/
│   ├── default.html # 页面模板 + 内联样式
│   └── post.html    # 文章页模板
├── _posts/          # 已发布文章（文件名必须：年-月-日-标题.md）
│   └── 2026-09-10-这个博客怎么用.md
└── _drafts/         # 草稿区：全网不可见（Jekyll 默认不构建下划线目录）
```

## 写作规则：3 篇存货

1. 新文章一律先写进 `_drafts/`（文件名随意，不用日期）。放在这里 = 无人可见，零压力。
2. 凑够 3 篇，把文件改名为 `年-月-日-标题.md` 搬进 `_posts/` = 发布。
3. 不够 3 篇就不发。空着是正常状态，不是欠债。

## 上线流程（一次性，约 15 分钟）

1. 注册 GitHub 账号（可全程笔名，与实名无关）。
2. New repository，命名 `<笔名>.github.io`（全小写）。
3. 把本文件夹上传，三选一：
   - GitHub Desktop：拖入文件夹 → Commit → Publish（最顺，零命令行）；
   - 网页：仓库页 Add file 逐个新建粘贴（8 个文件，零安装）；
   - 命令行：会 git 才用。
4. Settings → Pages → Source: Deploy from a branch → `main` → Save。
5. 等约 1 分钟，访问 `https://<笔名>.github.io`。

## 日常使用（此后只有这一个动作）

写文章：网页上进 `_drafts/` 新建 `.md` → 写 → Commit changes。
发布：改文件名为 `年-月-日-标题.md`，移动到 `_posts/` → Commit changes。

## 维护承诺

- 样式一次写死在 `_layouts/`，之后不再动。
- 出错（几乎只会是文件名格式错）找我修。
- 想换站名：改 `_config.yml` 的 `title` 一行。
