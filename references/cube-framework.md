# 立方体框架契约

本文件记录 `blocks.js` 与 `minecraft-blocks.css` 的稳定约定。修改立方体行为前先对照本文件，避免破坏生成逻辑。

## 目录

- [文件职责](#文件职责)
- [DOM 结构契约](#dom-结构契约)
- [尺寸预设](#尺寸预设)
- [六面 3D 定位](#六面-3d-定位)
- [视角与动画分层](#视角与动画分层)
- [动画注册表](#动画注册表)
- [Q 版圆角层（页面级扩展）](#q-版圆角层页面级扩展)
- [JS API](#js-api)
- [注册表条目格式](#注册表条目格式)
- [新增方块 / 动画](#新增方块--动画)

## 文件职责

| 文件 | 职责 | 改动边界 |
| --- | --- | --- |
| `blocks.js` | `MC_BLOCKS` 注册表、立方体 DOM 生成、动画播放调度，最终挂到 `window` | 数据条目可追加；生成函数与动画分类数组结构稳定 |
| `minecraft-blocks.css` | 3D 透视、六面变换、动画帧、阴影/标签/悬停工具类 | 六面 `translateZ` 规则与分层结构不要拆 |
| 页面 HTML | 主题样式、容器骨架、引导脚本（调用全局 API 生成方块） | 容器 ID/类名是 JS 钩子，不能改名 |

## DOM 结构契约

`createMinecraftCube` 生成的节点顺序与类名固定：

```text
div.mc-stage.mc-size-{sm|md|lg|xl}
├─ div.mc-iso-tilt
│  └─ div.mc-cube[.loop][.anim-*][.hover-lift]
│     ├─ div.face.front
│     ├─ div.face.back
│     ├─ div.face.right
│     ├─ div.face.left
│     ├─ div.face.top
│     └─ div.face.bottom
├─ div.mc-shadow
└─ div.mc-label            // options.label === false 时省略
```

- 生成类名：`.mc-stage`、`.mc-size-*`、`.mc-iso-tilt`、`.mc-cube`、`.face.{front|back|right|left|top|bottom}`、`.mc-shadow`、`.mc-label`。
- 每面的 `background-image` 由 JS 内联写入，指向 `TEX_PATH + 贴图文件名`。
- 引导脚本可向 stage 追加自定义提示节点（如 `.hero-hint`），但不要包裹或重排上面的既有节点。

## 尺寸预设

| 类名 | `--mc-size` |
| --- | --- |
| `.mc-size-sm` | 64px |
| `.mc-size-md` | 96px |
| `.mc-size-lg` | 128px |
| `.mc-size-xl` | 192px |

未指定尺寸时默认 `md`（96px）。方块深度必须与边长同源，不要另写固定的半长变量。

## 六面 3D 定位

六面均为绝对定位、`preserve-3d`、`backface-visibility: hidden`，`background-size: 100% 100%`、`image-rendering: pixelated`。定位规则：

```text
.front   translateZ(calc(var(--mc-size) / 2)) scale(1.004)
.back    rotateY(180deg) translateZ(calc(var(--mc-size) / 2)) scale(1.004)
.right   rotateY(90deg)  translateZ(calc(var(--mc-size) / 2)) scale(1.004)
.left    rotateY(-90deg) translateZ(calc(var(--mc-size) / 2)) scale(1.004)
.top     rotateX(90deg)  translateZ(calc(var(--mc-size) / 2)) scale(1.004)
.bottom  rotateX(-90deg) translateZ(calc(var(--mc-size) / 2)) scale(1.004)
```

- `translateZ` 一律用 `calc(var(--mc-size) / 2)`，写死半长或另取预设默认值会导致深度错位（见 pitfalls）。
- `scale(1.004)` 用于消除面间发丝缝，保留。

## 视角与动画分层

- `.mc-iso-tilt`：唯一承载等轴测视角 `rotateX(-20deg) rotateY(-30deg)`（`.iso-2` 为备选角度），`transform-style: preserve-3d`。
- `.mc-cube`：动画 `transform` 只作用在这一层。动画类、悬停位移、脉冲缩放都写在 cube 上，不能写到 tilt 层——否则动画的 `transform` 会覆盖视角，造成跳变或错位。

## 动画注册表

框架内置动画按挂载层级分四类。新增动画必须先归类。

### 一次性（点击触发，结束自动摘除）

`anim-flip-y`、`anim-flip-x`、`anim-flip-z`、`anim-flip-xyz`、`anim-tumble`、`anim-break`、`anim-place`。

对应 `blocks.js` 的 `ONE_SHOT_ANIMS` 数组。播放时先摘下其他常驻 transform 循环动画，结束后恢复。

### 常驻循环（`.loop` + 动画类）

`anim-spin-y`、`anim-spin-x`、`anim-spin-slow`、`anim-spin-reverse`、`anim-float`、`anim-pulse`、`anim-shake`、`anim-bounce`、`anim-wobble`、`anim-blink`。

选择器形如 `.mc-cube.loop.anim-spin-y`；不加 `.loop` 时该规则不生效。

### 面级动画（挂在 cube 上，选择器打到 `.face`）

`anim-glow`、`anim-breathe`、`anim-water`、`anim-lava`、`anim-portal`、`anim-enchant`。

作用于 `filter` / `background-position`，与 cube 本体的 transform 不冲突。对应 `FACE_LEVEL_ANIMS`，`playAnim` 播放一次性动画时不摘取它们。

### 悬停工具类

`hover-lift`、`hover-rotate`、`hover-zoom`、`hover-tilt`，仅在 `:hover` 时改 cube 变换。

### 破坏进度叠加

`crack-1` … `crack-5` 配合 cube 内 `.crack` 覆盖层控制裂纹透明度（0.2 → 1）。

## Q 版圆角层（页面级扩展）

目标：缩小 + 圆角，但保留六面盒体。框架 CSS/JS 不改，只在页面层加圆角、明暗和 6 块内芯。已验证实现见 `mc-css-effects/q-version-preview.html`（三种半径对照）与 `mc-css-effects/index.html`（全站同步方案 A）。

### 圆角 + 近顶点直角

圆角只作用 `.face` 叶子：

```css
.mc-cube .face {
  border-radius: 10%;                     /* 96px 基准；上限约 24% 仍像方块 */
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.10);
}
/* 近顶点（front / top / right 交汇、正对镜头）保留直角，
   否则三个面同时切角会凹出一个缺口 */
.mc-cube .face.front { border-top-right-radius: 0; }
.mc-cube .face.right { border-top-left-radius: 0; }
.mc-cube .face.top   { border-bottom-right-radius: 0; }
```

映射依赖默认视角 `rotateX(-20deg) rotateY(-30deg)`；换 `.iso-2` 或其他倾角时近顶点改变，必须重算这三个角。

### 朝向明暗

```css
.mc-cube .face.top    { --q-b: 1.16; }
.mc-cube .face.front  { --q-b: 1.02; }
.mc-cube .face.right  { --q-b: 0.86; }
.mc-cube .face.left   { --q-b: 0.95; }
.mc-cube .face.back   { --q-b: 0.94; }
.mc-cube .face.bottom { --q-b: 0.62; }
.mc-cube .face { filter: brightness(var(--q-b, 1)); }
```

- 只写 `--q-b`、不逐面写 filter，保证面级动画（特异度更高）仍能接管 filter。
- 静态明暗与 `anim-glow` / `anim-breathe` 不会叠加：动画运行期间以关键帧 filter 为准。

### 内芯补缝（.q-core）

圆角切掉的是面角，三面交汇处会透出页面背景。给每个 cube 追加 6 块与面同尺寸、沿法线内缩 3px 的内芯面，贴对应面贴图并压暗：

```css
.q-core {
  position: absolute;
  width: 100%; height: 100%;
  background-color: #1b1410;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  pointer-events: none;
  backface-visibility: visible;     /* 角缝里看到的是内芯背面，必须可见 */
  filter: brightness(0.62) saturate(0.9);
}
.q-core.front  { transform: translateZ(calc(var(--mc-size) / 2 - 3px)); }
.q-core.back   { transform: rotateY(180deg) translateZ(calc(var(--mc-size) / 2 - 3px)); }
.q-core.right  { transform: rotateY(90deg)  translateZ(calc(var(--mc-size) / 2 - 3px)); }
.q-core.left   { transform: rotateY(-90deg) translateZ(calc(var(--mc-size) / 2 - 3px)); }
.q-core.top    { transform: rotateX(90deg)  translateZ(calc(var(--mc-size) / 2 - 3px)); }
.q-core.bottom { transform: rotateX(-90deg) translateZ(calc(var(--mc-size) / 2 - 3px)); }
```

- 内芯用**同款贴图**压暗，而不是纯色：纯色在浅色/高对比方块上会像黑洞。
- 内芯方片不要加圆角，方角才能把圆角缺口完全填住。
- 内芯是叶子元素（无 3D 子节点），可以安全使用 filter。

### DOM 与注入

`.q-core` 是 `.mc-cube` 内、六面之后的额外子节点，不改变既有 DOM 契约。页面里在 `blocks.js` 之后包一层生成函数即可覆盖所有区块：

```js
const Q_CORE_FACES = ["front", "back", "right", "left", "top", "bottom"];
const createCubeBase = createMinecraftCube;
createMinecraftCube = function (key, options) {
  const stage = createCubeBase(key, options);
  if (!stage) return stage;
  const cube = stage.querySelector(".mc-cube");
  Q_CORE_FACES.forEach(cls => {
    const core = document.createElement("div");
    core.className = `q-core ${cls}`;
    const face = cube.querySelector(`.face.${cls}`);
    if (face) core.style.backgroundImage = face.style.backgroundImage;
    cube.appendChild(core);
  });
  return stage;
};
```

### 尺寸与观感

- 圆角用百分比，四档尺寸预设自动缩放；96px 用 10% 最稳，24% 已偏「软糖」。
- 需要更萌可整体压扁：`scaleY(0.94~0.96)` 加在 `.mc-iso-tilt` 上，不要加在 `.mc-cube`（会被动画 transform 覆盖）。
- 表情等装饰不要塞进 `.face`；需要时按 `.crack` 模式挂 cube 层。

## JS API

全局暴露（`window`）：

### `createMinecraftCube(blockKey, options)`

返回 stage DOM；找不到键名时 `console.warn` 并返回 `null`。

`options`：

| 字段 | 说明 |
| --- | --- |
| `size` | `sm` / `md` / `lg` / `xl`，默认 `md` |
| `loop` | 是否常驻循环（配合动画类使用） |
| `classes` | 空格分隔的额外类名，追加到 cube |
| `label` | `false` 时不生成 `.mc-label` |

方块若定义 `glow`，JS 会把颜色写入 cube 的 `--mc-glow-color`，供发光/呼吸动画取用。

### `playAnim(cube, animClass)`

播放一次性动画。内部机制：

1. 取播放序号 `_mcRun`，连点时旧回调直接作废，避免误恢复旧类名。
2. 暂存当前非一次性、非面级的循环类到 `_mcSaved`，播放前摘下；清掉旧一次性类与 `.replay`。
3. `void cube.offsetWidth` 强制重排以重启动画，再加目标类。
4. 同时监听 `animationend` 与 `animationcancel`，结束后摘除一次性类并恢复暂存的循环类。

新增一次性动画时必须同步登记 `ONE_SHOT_ANIMS`；新增面级动画登记 `FACE_LEVEL_ANIMS`，否则会被错误摘取或误判。

### `bindClickFlip(stage, animClass = "anim-flip-y")`

在 stage 内的 cube 上挂点击监听，点击调用 `playAnim`。引导脚本也可直接取 `stage.querySelector(".mc-cube")` 自行绑定。

## 注册表条目格式

```js
const MC_BLOCKS = {
  // 六面同图
  dirt: { name: "泥土", faces: "泥土.png" },

  // 分面：top / bottom / side，side 兜底四个侧面
  grass: {
    name: "草方块",
    faces: { top: "草方块-顶面.png", bottom: "泥土.png", side: "草方块-侧面.png" },
    defaultAnim: "flip-y"
  },

  // 指定前后侧面差异：front / back / left / right 可单独覆盖 side
  crafting_table: {
    name: "工作台",
    faces: { top: "工作台-顶面.png", bottom: "橡木木板.png", side: "工作台-侧面.png", front: "工作台-正面.png" }
  },

  // 发光颜色
  diamond_ore: { name: "钻石矿石", faces: "钻石矿石.png", glow: "#4fe9e9" }
};
```

- `TEX_PATH` 在 `blocks.js` 顶部，是贴图目录的相对路径；文件名含中文时 CSS/JS 内联 `url()` 要加引号。
- 缺面时按 `front/back/right/left → side`、`top/bottom → side` 兜底。

## 新增方块 / 动画

**新方块**：贴图入素材目录 → `MC_BLOCKS` 加条目 → 引导脚本里 `createMinecraftCube`；需要发光加 `glow`。

**新动画**：

1. 在 CSS 写 `@keyframes` 与选择器。
2. 判断归属：本体 transform/opacity → 一次性或循环；面级 filter/背景位移 → 面级。
3. 一次性动画把类名补进 `ONE_SHOT_ANIMS`；面级动画补进 `FACE_LEVEL_ANIMS`。
4. 循环动画选择器要带 `.loop` 前缀；不要把 `filter` 加在 cube 或其祖先分组上。
