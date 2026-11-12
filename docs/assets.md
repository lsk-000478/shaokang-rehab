# 素材与替换位置

## 图片

网站图片为 AI 生成的示意配图，采用墨绿、暖灰白与自然木色。它们用于主题展示，不作为历史档案、真实临床案例或创作者本人照片。

| 位置 | 文件 |
| --- | --- |
| 首屏概念视觉 | `dist/assets/rehab-movement.png` |
| 康复入门 · 日常步行 | `dist/assets/picture-everyday-walk.png` |
| 康复发展 · 学习概念 | `dist/assets/picture-history.png` |
| 中医与现代康复 | `dist/assets/picture-tcm.png` |
| 临床评估示意 | `dist/assets/picture-clinical.png` |
| 中老年运动 | `dist/assets/picture-balance.png` |
| 办公活动 | `dist/assets/picture-workday.png` |
| 重返运动 | `dist/assets/picture-return-kit.png` |
| 康复工具横幅 | `dist/assets/rehab-tools-banner.png` |
| 生活目标与力量训练 | `dist/assets/article-rehab-strength.png` |
| 俯卧撑变化 | `dist/assets/article-pushup-start.png` |
| 鸟狗式 | `dist/assets/article-core-daily.png` |

替换时建议保留文件名，或同时更新 `dist/index.html` 和文章数据里的引用。新配图尽量保留主体周围的裁切空间，避免小屏裁掉人物头脚。

## 真人运动视频

- `body-upper.mp4` / `body-upper-poster.jpg`：[Kampus Production，真人伸展场景](https://www.pexels.com/video/a-woman-guiding-a-man-in-stretching-his-arms-6111066/)。
- `body-lower.mp4` / `body-lower-poster.jpg`：[MART PRODUCTION，弹力带训练场景](https://www.pexels.com/video/man-exercising-using-resistance-band-8836962/)。
素材保存在 `dist/assets/`，按 [Pexels License](https://www.pexels.com/license/) 使用。视频已压缩为本地 H.264 MP4，静音播放、按需暂停。画面属于场景展示，不表示出镜人物认可本站。

## 科普参考资料

文章里的参考资料链接保存在 `dist/assets/knowledge.json`，发布时由 `knowledge.js` 直接加载。继续编辑时保留这些出处，医学表述应与出处相符。
