# 刘少康 · 康复与运动

个人科普主页：先认识创作者，再了解康复入门、身体部位、生活场景、运动康复工具与动作笔记。

- 网站：https://lsk-000478.github.io/shaokang-rehab/
- 仓库：https://github.com/lsk-000478/shaokang-rehab
- 内容：静态 HTML、CSS、JavaScript，本地图片与静音循环视频。

## 继续修改

网页源码和部署文件都在 `dist/`：

- `index.html`：页面结构、文字、图片位置与联系邮箱。
- `styles.css`、`theme.css`、`visual-content.css`：布局、统一配色与图文样式。
- `app.js`：知识弹窗、部位选择和导航。
- `body-video.css`、`body-video.js`：真人运动视频背景。
- `assets/knowledge.json`：科普文章原始数据。
- `assets/knowledge.js`：浏览器加载的文章数据；修改文章时应与 JSON 保持同步。
- `assets/`：图片、视频和视频封面。

直接用浏览器打开 `dist/index.html` 可以预览。修改后提交并推送到 `main`，GitHub Actions 会把 `dist/` 发布到 GitHub Pages。

## 素材

图片用于主题示意，不表示真实就诊案例或人物为本站客户。真人运动视频素材来源与生成图片说明见 [素材说明](docs/assets.md)。

页面内容用于知识分享，不替代个体诊断或治疗建议。
