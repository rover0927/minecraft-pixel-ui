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

## 方块贴图与现有素材目录

- 项目现有 `f:\Assets\mc中文素材` 是中文命名的方块贴图（`blocks.js` 的 `TEX_PATH` 指向它），与 `client-extra/textures/block` 的官方英文贴图对应，可互相替换。
- 新增方块时二选一：把英文贴图复制过来改成中文名；或把 `TEX_PATH` 直接指向 `client-extra/assets/minecraft/textures/block/` 并用英文文件名。
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
