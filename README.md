# Minecraft Pixel UI

一套已验证的 Minecraft 像素 UI 技能包：纯 CSS 3D 方块、原版贴图注册表、动画配方、Q 版圆角处理、物品图标与 GUI 面板素材，以及踩过的坑和修复结论。

> GitHub 仓库首页只会渲染 `README.md`，技能主体定义在 [SKILL.md](./SKILL.md)，给 Agent 读取执行时以它为准。

## 内容

| 路径 | 说明 |
| --- | --- |
| [SKILL.md](./SKILL.md) | 技能入口：触发条件、目录资源、核心工作流、硬约束 |
| `assets/minecraft-blocks.css` | 立方体与动画框架，可直接复制到页面同目录 |
| `assets/blocks.js` | 贴图注册表 + `createMinecraftCube` / `playAnim` / `bindClickFlip` |
| `assets/index-template.html` | 带 MC 像素主题的页面骨架，含四个画廊区块的引导脚本 |
| `assets/item-icons/` | 82 个 16×16 官方物品图标，用于物品栏、合成表、背包 UI |
| `assets/gui/` | 4 张 256×256 容器背景：背包、工作台、熔炉、54 格通用容器 |
| [references/cube-framework.md](./references/cube-framework.md) | DOM 契约、API、动画写法、Q 版圆角扩展层 |
| [references/ui-theme.md](./references/ui-theme.md) | 页面主题：配色、字体、面板、栅格 |
| [references/asset-catalog.md](./references/asset-catalog.md) | 素材目录与物品图标用法 |
| [references/pitfalls.md](./references/pitfalls.md) | 已定位问题的现象、根因与修法 |

## 能做什么

- 纯 CSS 3D 六面立方体：翻转、旋转、悬浮、发光、呼吸、水流动画
- 原版 16×16 贴图，整数倍像素缩放，六面朝向明暗
- Q 版圆角方块：只磨外轮廓，近顶点保留直角，贴图内芯补角缝
- 物品栏 / 背包 / 合成台 UI，槽位复刻原版样式
- 已排查：面错位、filter 拍平、动画不恢复、圆角凹口、点击翻转生命周期

## 快速开始

1. 复制 `assets/minecraft-blocks.css`、`assets/blocks.js` 到页面同目录。
2. 把素材目录填进 `blocks.js` 顶部的 `TEX_PATH`。
3. 以 `assets/index-template.html` 为骨架，用 `createMinecraftCube(key, opts)` 生成方块。
4. 需要物品栏时，把 `assets/item-icons/` 复制到页面资源目录，按 `.mc-slot` 摆放。

更完整的流程见 [SKILL.md](./SKILL.md) 的「核心工作流」。

## 素材说明

物品图标与 GUI 底图来自 Minecraft 客户端资源包（`client-extra`），仅用于本地演示、原型与学习，请勿随商业产品分发。放大只使用整数倍并配合 `image-rendering: pixelated`。
