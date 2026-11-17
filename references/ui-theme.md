# Minecraft 像素界面主题

本文件记录页面层（HTML 内联样式 + 引导脚本）的设计约定。立方体框架样式不在此处改动。

## 目录

- [设计令牌](#设计令牌)
- [页面结构与 JS 钩子](#页面结构与-js-钩子)
- [区块配方](#区块配方)
- [像素 GUI 技法](#像素-gui-技法)
- [栅格与响应式](#栅格与响应式)
- [禁忌](#禁忌)

## 设计令牌

| 用途 | 值 |
| --- | --- |
| 面板底色 | `#38302a`，叠石头砖 multiply |
| 卡片底色 | `#2a231c` |
| 描边/暗边 | `#120e0a` / `#0d0b09` |
| 正文 | `#e8e2d4` |
| 次要文字 | `#b3a993` |
| 草绿强调 | `#6ab84a` |
| 金色提示 | `#f5c542` |
| 字体 | `Courier New`, `Microsoft YaHei`, `PingFang SC`, `monospace`；不引外部字体，中文回退雅黑 |

背景砖（16×16，`image-rendering: pixelated`）：

- 页面底：`石头.png`，64px 平铺（`background-attachment: fixed, scroll`），上层压一层 `rgba(12,9,6,.6)` 深色遮罩。
- 画廊/模板页：`界面-光-泥土-背景.png` 平铺 32px + 深色遮罩，`assets/index-template.html` 用这套。
- 面板：`石头.png`，64px 平铺，`background-blend-mode: multiply` 压暗。
- 标题前的草方块标记：`草方块-顶面.png`，14×14，带 2px 黑边。

## 页面结构与 JS 钩子

引导脚本依赖以下容器 ID，页面骨架必须保留：

| ID | 容器类 | 内容 |
| --- | --- | --- |
| `#hero-row` | `.hero-row` | 首屏演示方块；每个 stage 后可追加 `.hero-hint` 提示 |
| `#effect-grid` | `.effect-grid` | 特效栅格；每项 `.effect-item` 内含 stage + `.effect-name` + `.anim-badge` |
| `#glow-gallery` | `.gallery` | 发光方块画廊，stage 直接入栅格 |
| `#full-gallery` | `.gallery` | 完整方块画廊，stage 直接入栅格 |

引导脚本约定的类名：`.hero-row`、`.hero-hint`、`.effect-grid`、`.effect-item`、`.effect-name`、`.anim-badge`、`.gallery`、`.block-card`。这些类名即使页面重排也不要改名，否则生成脚本挂不上节点。

## 区块配方

### 页头

居中：大标题（白字 + 两层黑色分层投影）、副标题（次要色，可嵌统计数字，草绿高亮数量）。标题不用渐变文字。

### 石质面板 `.section`

- `border: 3px solid` 近黑；
- 斜面阴影：`inset 3px 3px 0 rgba(255,255,255,.14)` + `inset -3px -3px 0 rgba(0,0,0,.5)`；
- 内边距 22px 22px 24px，区块间距 26px；面板最大宽度 1180px 居中；
- 标题 `.section-title`：17px、草方块贴图标记 + 白色标题 + 黑色投影；标题旁可跟 `.section-count` 草绿计数徽章；描述 `.section-desc` 次要色 12px、行距 1.9。

### 首屏行 `.hero-row`

`flex` 居中、换行、间距 56px；`.hero-hint` 金色 11px，`steps(2, jump-none)` 闪烁。

### 卡片 `.effect-item` / `.block-card`

- 暗色卡片底 + 2px 黑边 + 内斜面阴影；
- 纵向 flex 居中，`min-width: 0` 防长词撑破；
- 悬停：描边变草绿、`translateY(-4px)`，过渡用 `steps(2, jump-none)`；
- 名称 11px 居中、黑投影；徽章 `.anim-badge` 棕灰底、黑边、9px 文字。

### 页脚

顶部 3px 黑边分隔，次要色 11px 居中。

## 像素 GUI 技法

- 全部元素 `border-radius: 0`；用 2–3px 实线黑边 + inset 亮/暗阴影做 MC 斜面，不用圆角卡片。
- 文字投影：标题 3px 黑偏移，正文 1px 黑偏移，保证深色面板上可读。
- 贴图一律 `image-rendering: pixelated`，保持 16×16 像素锐利。
- 徽章、提示块用纯色像素块，不用胶囊圆角、不用渐变填充。
- 动效克制：只保留悬停上浮、提示闪烁、框架内既有动画；卡片不要各自挂多余入场动画。

## 栅格与响应式

- 特效栅格：`repeat(auto-fill, minmax(172px, 1fr))`，间距 18px。
- 方块画廊：`repeat(auto-fill, minmax(148px, 1fr))`，间距 16px，`justify-items: center`。
- 组件卡：`repeat(auto-fit, minmax(258px, 1fr))`，间距 14px；卡片纵向 flex、`align-items: stretch`，同排卡片等高。
- 贴图色卡：`repeat(auto-fill, minmax(118px, 1fr))`，间距 14px；音效卡：`repeat(auto-fill, minmax(196px, 1fr))`，间距 12px。
- ≤640px：组件卡改为单列，面板内边距收窄到 18px 12px，贴图色卡降到 104px、色块 76px。
- 立方体 `.mc-cube` 保持 `margin: 0 auto`，标签比方块宽时仍水平居中。

## 禁忌

- 不在 cube 或其祖先分组上用 `filter`、`backdrop-filter`、`blur`：会触发 3D 分组扁平化，把六面压成平面（见 pitfalls）。页面面板也不要用毛玻璃模糊。
- 不引入通用 SaaS 圆角卡片、彩色渐变描边、Inter/Roboto 类默认字体；视觉语言对齐 MC 石质/泥土/草绿像素语汇。
- 不把页面布局类写进 `minecraft-blocks.css`；页面层样式放在 HTML 内联 `<style>` 或独立页面样式表。
- viewport 必须 `width=device-width, initial-scale=1`，不要禁缩放。
