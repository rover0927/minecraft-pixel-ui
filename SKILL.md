---
name: minecraft-pixel-ui
description: "构建、扩展与排障 Minecraft 风格的纯 CSS 3D 方块演示页：六面立方体 DOM 框架、原版贴图注册表、翻转/旋转/悬浮/发光/呼吸/水流等动画、像素 GUI 页面主题、Q 版圆角方块（磨圆外轮廓 + 内芯补缝，保留盒体）、物品图标与 GUI 容器素材（来自官方 client-extra 资源），以及立方体深度错位、视角动画冲突、filter 扁平化、圆角凹口、点击翻转生命周期等已知坑的修复结论。当任务涉及 MC 方块展示页、方块贴图画廊、CSS 3D 方块特效、矿石发光/呼吸、点击翻转动画、物品栏/背包/合成台 UI、把方块改成 Q 版/圆角但仍保留方块感，或现有 mc-css-effects 类项目出现面错位、拍平、动画失效时使用。"
---

# Minecraft 像素 UI 技能

## 概述

本技能沉淀一套已验证的「纯 CSS 3D 方块 + 原生 JS + MC 像素界面」项目结构：`blocks.js` 负责贴图注册表与立方体生成/动画调度，`minecraft-blocks.css` 负责 3D 变换与动画帧，`index.html` 负责页面主题与引导脚本调用。复用本技能时先分清三层职责，不要把页面样式写进框架 CSS，也不要改动 JS 依赖的 DOM 钩子。

## 目录资源

- `assets/minecraft-blocks.css` — 立方体与动画框架，可直接复制到页面同目录使用。
- `assets/blocks.js` — 贴图注册表 + `createMinecraftCube` / `playAnim` / `bindClickFlip`，挂到 `window`；顶部 `TEX_PATH` 按素材目录相对路径调整。
- `assets/index-template.html` — 带 MC 像素主题的页面骨架，含四个画廊区块的引导脚本范例。
- `demo/components.html` — 组件样式参考页：42 张卡，覆盖基础、布局、导航、表单、展示、反馈 6 组，纯 HTML/CSS，同时是三页共用的页面主题基准。
- `demo/textures.html` — 材质贴图色卡 + 3D 方块示例页，含 `.mc-tex` 类与平铺检查。
- `demo/sounds.html` — 音效试听页：27 个精选音效，点击播放，带音量、静音、停止与时长预读。
- `demo/palette.html` — 材质搭配预览：6 套侧栏组合，含模拟侧栏 + 内容区 + 贴图清单，另附橡木/深色橡木对照。
- `assets/item-icons/` — 82 个 16×16 官方物品图标（英文文件名），可直接用于物品栏、合成表、背包 UI。
- `assets/gui/` — 4 张 256×256 容器背景（背包、工作台、熔炉、54 格通用容器），可当面板底图。
- `assets/block-textures/` — 43 张 16×16 方块贴图（木板 11、原木 6、石料 11、自然 7、矿石 8），中文文件名，可直接平铺或走 CSS 材质类。
- `assets/sounds/` — 27 个精选原版音效（`.ogg`，6 界面 / 12 方块 / 3 物品 / 5 生物 / 1 环境），按 `ui/`、`block/`、`item/`、`mob/`、`ambient/` 分目录。

## 参考文档（按需读取）

- 改立方体结构、加动画、查 DOM/API/类名约定 → 读 `references/cube-framework.md`
- 用物品图标、物品栏槽位、GUI 容器背景、方块贴图材质类、音效素材，或从 client-extra / mc中文素材 / 音效库 补素材 → 读 `references/asset-catalog.md`
- 改页面外观、布局、配色、字体、栅格 → 读 `references/ui-theme.md`
- 挑侧栏/面板/卡片贴图、用现成的材质搭配方案 → 读 `references/palette-recipes.md`
- 排查面错位、拍平、动画不恢复、贴图灰度等问题 → 读 `references/pitfalls.md`，先核对已验证结论，避免回退。

## 核心工作流

### 新建一个方块演示页

1. 复制 `assets/` 下的 `minecraft-blocks.css`、`blocks.js` 到页面同目录；把素材目录路径填进 `blocks.js` 顶部 `TEX_PATH`。
2. 以 `assets/index-template.html` 为骨架，保留容器 ID 与生成类名（见 `cube-framework.md` 的 DOM 契约）。
3. 在 `MC_BLOCKS` 注册表追加方块条目，引导脚本里用 `createMinecraftCube(key, opts)` 生成。
4. 浏览器打开本地页面复核：方块数量、贴图朝向、发光是否保持 3D、点击翻转是否正常恢复、控制台无报错。

### 追加一个方块

1. 贴图放入素材目录；`faces` 为字符串表示六面同图，对象 `{top, bottom, side, front, back, left, right}` 分面；`side` 兜底四个侧面。
2. 需要发光时加 `glow: "#hex"`，框架会把颜色写进 `--mc-glow-color`。
3. 在目标容器里 `createMinecraftCube` 并按需绑定点击翻转。

### 使用方块贴图（CSS 材质类）

1. 贴图从 `assets/block-textures/` 取，全部 16×16；展示只做整数倍放大并配 `image-rendering: pixelated`。
2. 基础类 `.mc-tex` 负责像素化铺满，修饰类 `.mc-tex--oak_planks` 只写 `background-image`；类名用官方 block id（下划线命名）。
3. 检查接缝时切到平铺：`background-size: 32px 32px; background-repeat: repeat`，16px 贴图按 2 倍重复最容易看出边界。
4. 原木侧画与顶面是两张图，3D 方块用 `faces` 对象分面；贴图目录通过 `window.MC_TEX_PATH` 覆盖，默认仍为 `../mc中文素材/`。
5. 43 张清单、完整类名与补素材命令见 `references/asset-catalog.md` 的「方块贴图与材质类」，示例页 `demo/textures.html`。

### 追加一个动画

先判断动画归属，再动 CSS：

- 作用在立方体本体的 `transform`/`opacity`：一次性动画登记进 `ONE_SHOT_ANIMS`，常驻循环动画配合 `.loop` 使用。
- 作用在面叶子上的 `filter`/`background-position`（发光、呼吸、水流、岩浆、传送门、附魔）：登记进 `FACE_LEVEL_ANIMS`，选择器打到 `.face`。
- 悬停效果直接用 `hover-lift` 等工具类，或在 cube 上加 `:hover` 规则。

### 使用物品图标 / 物品栏

1. 图标从 `assets/item-icons/` 取（16×16、英文名）；不够时按 `references/asset-catalog.md` 的命令从 `client-extra` 补。
2. 展示只用整数倍尺寸（16/32/48/64）+ `image-rendering: pixelated`，不要平滑放大。
3. 物品栏按 18px 网格排槽位，槽位样式与数量角标见 `asset-catalog.md` 的 `.mc-slot`；合成表就是 3×3 槽位。
4. 需要原版容器底图时用 `textures/gui/container/*.png` 整图，不要整张塞进单个槽位。

### 使用音效素材

1. 音效从 `assets/sounds/` 取，按用途分 `ui/`、`block/`、`item/`、`mob/`、`ambient/` 五个子目录；文件是官方 `.ogg`，直接 `new Audio("../assets/sounds/ui/click.ogg")` 播放，不转码、不重采样。
2. 页面只复用一个 `Audio` 实例：切换音效时先 `pause()`、再改 `src`、再 `play()`，避免多条音轨叠在一起。
3. 音量统一走一个 `0–1` 的 `audio.volume`，演示控件用 `<input type="range">` + 静音按钮；默认音量不超过 0.7。
4. 卡片上标出中文名、游戏事件 id（如 `block.stone.place`）与相对路径，方便对照 `sounds.json` 换素材。
5. 27 个文件的分类清单、事件 id 与补素材命令见 `references/asset-catalog.md` 的「音效素材」，示例页 `demo/sounds.html`。

### 追加 Q 版圆角（可选，页面层）

目标：缩小 + 圆角，但仍保留六面盒体。全部改在页面层，不动框架 CSS/JS 的既有类名：

1. 圆角只加在 `.face` 叶子：`.mc-cube .face { border-radius: 10%; }`。10% 是 96px 基准下「远看是方块、近看有软边」的量；超过 24% 会明显偏向软糖/非方块。
2. 正对镜头的近顶点（front / top / right 三面交汇处）保留直角：`front` 的 `border-top-right-radius`、`right` 的 `border-top-left-radius`、`top` 的 `border-bottom-right-radius` 置 0。三面同时切角会凹出缺口。
3. 给每个 cube 注入 6 块 `.q-core.{front…bottom}`：与面同尺寸、沿法线内缩 3px、复制对应面的贴图并压暗，填住圆角切掉的角缝。
4. 朝向明暗用 `--q-b` + `filter: brightness()` 挂 `.face`；发光方块交给既有面级动画。
5. 复核：四个角无透底、无凹口，翻转/旋转后方块仍是盒体；发光方块不被压平。

细节见 `references/cube-framework.md` 的「Q 版圆角层」，踩坑见 `references/pitfalls.md` 的「圆角凹口」。

### 排障

遇到面错位、立方体被压平、点击后动画不恢复、顶面贴图发灰等问题，直接查 `references/pitfalls.md`：每条都记录了根因、已验证修法和「试过但不通」的方向，不要重复走弯路。

## 硬约束

- 不改写 JS 生成的 DOM 类名与容器 ID；框架 CSS 的六面 `translateZ` 规则保持 `calc(var(--mc-size) / 2)`。
- `filter`、`backdrop-filter` 不挂在 `.mc-cube` 及其祖先分组上，只挂 `.face` 叶子，避免 3D 分组扁平化。
- 视角倾斜只放在 `.mc-iso-tilt` 层，动画 `transform` 只作用 `.mc-cube` 层。
- 圆角是页面层扩展：只加 `.face` 的 `border-radius`、额外挂 `.q-core` 子节点，不改框架 CSS 与生成函数签名；近顶点直角映射依赖 `rotateX(-20deg) rotateY(-30deg)`，换视角需重算。
- 贴图目录只通过 `window.MC_TEX_PATH` 覆盖，不改 `blocks.js` 顶部默认值，避免破坏其他页面。
- 音效保持原始 `.ogg`，不转码不重采样；页面只复用单个 `Audio` 实例，切换前先 `pause()`，默认音量不超过 0.7。
