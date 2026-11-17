# 素材资源目录（client-extra）

本技能除六面方块贴图外，还沉淀了一批官方静态素材。来源：`f:\Assets\client-extra`（Minecraft 客户端资源包）。技能只精选需要的文件，不整体复制。

## 资源总览

| 路径（相对 `assets/minecraft/`） | PNG 数 | 用途 |
| --- | --- | --- |
| `textures/block/` | 928 | 方块六面贴图，16×16 |
| `textures/item/` | 582 | 物品图标，16×16 |
| `textures/gui/` | 86 | GUI 图集：容器背景、按钮、图标、进度条 |
| `textures/entity/` | 481 | 实体/生物贴图，多用于 3D 模型，不适合直接做图标 |
| `textures/particle/` | 194 | 粒子贴图 |
| `textures/mob_effect/` | 33 | 状态效果图标 |
| `textures/painting/` | 31 | 画 |
| `textures/trims/` | 51 | 盔甲纹饰 |
| `models/item/`、`models/block/`、`blockstates/` | — | JSON 模型/状态，`layer0`、`all/side/top` 字段引用贴图，可用于反查某样物品/方块该用哪张图 |

## 已纳入技能的物品图标

位置：`assets/item-icons/`，共 82 个 16×16 PNG，文件名沿用官方英文名，可直接 `Copy-Item` 到页面素材目录。

| 分类 | 文件 |
| --- | --- |
| 材料 | diamond, emerald, gold_ingot, iron_ingot, copper_ingot, netherite_ingot, netherite_scrap, gold_nugget, iron_nugget, coal, charcoal, redstone, lapis_lazuli, quartz, amethyst_shard, stick, string, feather, flint, gunpowder, leather, brick, clay_ball, nether_star, blaze_rod, ender_pearl, slime_ball, honeycomb, glowstone_dust, sugar, paper |
| 书与杂项 | book, enchanted_book, experience_bottle, totem_of_undying, ender_eye, name_tag, saddle, elytra, firework_rocket, end_crystal, map |
| 工具/武器 | wooden_sword, stone_sword, iron_sword, golden_sword, diamond_sword, netherite_sword, iron_pickaxe, diamond_pickaxe, netherite_pickaxe, iron_axe, diamond_axe, bow, arrow, spectral_arrow, fishing_rod, flint_and_steel, shears, trident |
| 食物 | apple, golden_apple, bread, carrot, golden_carrot, potato, baked_potato, beef, cooked_beef, porkchop, cooked_porkchop, cookie, melon_slice, sweet_berries, honey_bottle, cake |
| 桶类 | bucket, water_bucket, lava_bucket, milk_bucket |
| 特殊帧 | compass, clock |

补充说明：

- `compass` / `clock` 原素材是动画帧（`compass_00..31`、`clock_00..63`），技能里取第 1 帧另存为静态图标。
- `shield` 没有独立 16×16 图标（盾牌用实体模型），`enchanted_golden_apple` 没有独立贴图（靠 glint 效果），不要找。
- 官方物品图标全是 16×16，展示时只做整数倍放大。

## 物品图标用法

```css
.mc-item {
  display: inline-block;
  width: 32px; height: 32px;           /* 16 / 32 / 48 / 64 */
  background-image: url("assets/item-icons/diamond.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  image-rendering: pixelated;
}
```

```html
<img class="mc-item" src="assets/item-icons/iron_sword.png" alt="iron sword">
```

物品栏槽位（18px 网格，槽位底可换 `background-image` 为原版槽位贴图）：

```css
.mc-slot {
  position: relative;
  width: 48px; height: 48px;
  display: grid; place-items: center;
  background: #8b8b8b;
  border: 2px solid;
  border-color: #373737 #ffffff #ffffff #373737;  /* 左上是暗边，右下是亮边 */
}
.mc-slot .mc-count {
  position: absolute; right: 3px; bottom: 1px;
  font-size: 11px; color: #fff; text-shadow: 2px 2px 0 #3f3f3f;
}
```

## GUI 图集

`textures/gui/container/` 是整张容器背景（不是单个槽位），适合做物品栏/背包/工作台面板底图，按原版 18×18 槽位网格摆放。技能内已内置 4 张到 `assets/gui/`（均 256×256，内容沿用原版容器布局）：

- `inventory.png` — 背包 + 快捷栏
- `crafting_table.png` — 工作台
- `furnace.png` — 熔炉
- `generic_54.png` — 54 格通用容器（大箱子）

`client-extra` 里还有 `hopper.png`、`shulker_box.png`、`anvil.png`、`enchanting_table.png`、`brewing_stand.png`、`smithing.png` 等，用法相同。

`textures/gui/` 根目录常用精灵图：`icons.png`（状态/生命图标）、`bars.png`（血条/经验条）、`slider.png`、`tab_button.png`、`checkbox.png`、`toasts.png`、`recipe_book.png`。

使用注意：

- 这些是精灵图/整图，需要 `background-position` 裁切或直接当面板底图，不要整张塞进小槽位。
- 与原版槽位对齐需要按 18px 网格算坐标，属于精细活；做示意面板时可以用上面的 `.mc-slot` 复刻槽位，更省事。

## 方块贴图与材质类

位置：`assets/block-textures/`，43 张 16×16 PNG，中文文件名，按类别：

| 分类 | 数量 | 文件 |
| --- | --- | --- |
| 木板 | 11 | 橡木、云杉、白桦、丛林、金合欢、深色橡木、樱花、竹块、红树、绯红、诡异 |
| 原木 | 6 | 橡木侧面/顶面、云杉侧面/顶面、白桦、深色橡木 |
| 石料建筑 | 11 | 石头、圆石、石砖、苔石砖、红砖块、砂岩、砂岩顶面、石英侧面、石英顶面、海晶石、暗海晶石 |
| 自然 | 7 | 草方块顶面、草方块侧面、泥土、沙子、沙砾、泥巴、苔藓块 |
| 矿石 | 8 | 煤、铁、铜、金、绿宝石、青金石、红石、钻石 |

CSS 类分两层：`.mc-tex` 管铺满与像素化，`.mc-tex--<block_id>` 只换贴图。

```css
.mc-tex {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  image-rendering: pixelated;
}
.mc-tex--oak_planks {
  background-image: url("../assets/block-textures/橡木木板.png");
}
/* 平铺检查：16px 贴图按 2 倍重复 */
.mc-tex.is-tiled {
  background-size: 32px 32px;
  background-repeat: repeat;
}
```

```html
<div class="mc-tex mc-tex--oak_planks"></div>
```

使用注意：

- 类名用官方 block id（下划线），与 `MC_BLOCKS` 的 key 对齐，换材质只改修饰类。
- 16×16 贴图只做整数倍放大，禁止平滑缩放。
- 原木侧面与顶面是两张图，3D 方块用 `faces` 对象分面；矿石发光色由页面层给，不在贴图里。
- 3D 方块贴图目录用 `window.MC_TEX_PATH` 覆盖（默认 `../mc中文素材/`）。示例页：`demo/textures.html`。

补充贴图（从中文素材目录）：

```powershell
$src = 'f:\Assets\minecraft\mc中文素材'
$dst = 'f:\Assets\skills\minecraft-pixel-ui\assets\block-textures'
Copy-Item "$src\樱花原木.png" $dst -Force
```

## 音效素材

位置：`assets/sounds/`，27 个 `.ogg`，取自 Minecraft 1.20.1 客户端官方资源，按用途分目录：

| 分类 | 数量 | 文件 |
| --- | --- | --- |
| 界面 `ui/` | 6 | click、toast_in、toast_out、orb、pop、levelup |
| 方块 `block/` | 12 | stone_place、stone_step、stone_break、wood_place、wood_break、glass_break、chest_open、chest_close、amethyst_chime、enchant、note_pling、anvil_land |
| 物品 `item/` | 3 | bucket_fill、trident_throw、bow_shoot |
| 生物 `mob/` | 5 | creeper_fuse、zombie_say、ghast_scream、enderman_portal、hurt |
| 环境 `ambient/` | 1 | cave1 |

事件 id 与文件名的完整对照在 `demo/sounds.html` 的 `GROUPS` 数组里（如 `block.stone.place` → `block/stone_place.ogg`）。

播放：页面只复用一个 `Audio` 实例，切换前先 `pause()`，避免多条音轨叠加。

```js
const audio = new Audio();
function play(file) {
  audio.pause();
  audio.src = "../assets/sounds/" + file;
  audio.currentTime = 0;
  audio.volume = 0.7;        // 0–1，默认不超过 0.7
  audio.play();
}
play("ui/click.ogg");
```

时长预读用独立的 `new Audio()` + `loadedmetadata` 事件，不要为了取时长去解码整段音频。

补充音效（从全量库挑选，注意库内是三层结构 `<分类>/<子目录>/<文件>.ogg`）：

```powershell
$src = 'f:\Assets\minecraft\mc音效素材\sounds'
$dst = 'f:\Assets\skills\minecraft-pixel-ui\assets\sounds'
Copy-Item "$src\ui\toast\in.ogg" "$dst\ui\toast_in.ogg" -Force
Copy-Item "$src\block\note_block\pling.ogg" "$dst\block\note_pling.ogg" -Force
```

全量库 `f:\Assets\minecraft\mc音效素材` 约 520MB、3416 个 ogg，配 `sounds.json` 记录每个游戏事件引用的路径；技能只精选 27 个，不要整库复制。

使用注意：

- 保持原始 `.ogg`，不转码、不重采样、不改名；技能内统一小写英文 + 下划线，页面用相对路径 `ui/click.ogg` 引用。
- 一张卡片对应一个事件 id，换素材时同步改卡片上的 id 与文件名。
- 音效仅在用户点击等交互后播放，不要自动循环播放。

## 中文素材与官方英文贴图

- `f:\Assets\minecraft\mc中文素材` 是中文命名的方块贴图（`blocks.js` 默认 `TEX_PATH` 指向它），与 `client-extra/textures/block` 的官方英文贴图对应，可互相替换。
- 新增方块时二选一：把英文贴图复制过来改成中文名；或把贴图目录指向 `client-extra/assets/minecraft/textures/block/` 并用英文文件名。
- 不要在同一页面混用两套命名体系。

## 补充素材

从 `client-extra` 追加单个或一批物品图标：

```powershell
$src = 'f:\Assets\client-extra\assets\minecraft\textures\item'
$dst = 'f:\Assets\skills\minecraft-pixel-ui\assets\item-icons'
Copy-Item "$src\spyglass.png" $dst -Force

# 批量
'spyglass','brush','goat_horn' | ForEach-Object { Copy-Item "$src\$_.png" $dst -Force }
```

其他类别同理，把 `$src` 换成 `textures\block`、`textures\gui\container` 等即可。

## 约束

- 官方资源仅用于本地演示、原型与学习，不要随商业产品分发。
- 物品图标与方块贴图保持 16×16 原始像素，放大只用整数倍并配 `image-rendering: pixelated`，禁止平滑缩放。
- 动画帧素材（compass、clock、粒子等）需要动画时按帧序列切换，不要只取一帧冒充动画。
- 具体某个物品该用哪张图，可查 `models/item/<name>.json` 的 `layer0` 字段，不要凭猜。
