/* ============================================================
   Minecraft Blocks Registry - 方块贴图注册表
   每个方块定义六面贴图，支持统一贴图或分面贴图
   ============================================================ */

const TEX_PATH = "../mc中文素材/";

/**
 * 方块注册表
 * faces 可以是字符串 (六面相同) 或对象 {top, bottom, side, front, back}
 * side 会被用于 front/back/left/right
 */
const MC_BLOCKS = {

  /* ========== 自然方块 ========== */

  grass: {
    name: "草方块",
    faces: { top: "草方块-顶面.png", bottom: "泥土.png", side: "草方块-侧面.png" },
    defaultAnim: "flip-y"
  },
  dirt: { name: "泥土", faces: "泥土.png" },
  grass_path: {
    name: "土径",
    faces: { top: "土径-顶面.png", bottom: "泥土.png", side: "土径-侧面.png" }
  },
  podzol: {
    name: "灰化土",
    faces: { top: "灰化土-顶面.png", bottom: "泥土.png", side: "灰化土-侧面.png" }
  },
  mycelium: {
    name: "菌丝体",
    faces: { top: "菌丝体-顶面.png", bottom: "泥土.png", side: "菌丝体-侧面.png" }
  },
  coarse_dirt: { name: "砂土", faces: "砂土.png" },
  rooted_dirt: { name: "缠根泥土", faces: "缠根泥土.png" },
  moss_block: { name: "苔藓块", faces: "苔藓块.png" },
  mud: { name: "泥巴", faces: "泥巴.png" },

  stone: { name: "石头", faces: "石头.png" },
  cobblestone: { name: "圆石", faces: "圆石.png" },
  mossy_cobblestone: { name: "苔石", faces: "苔石.png" },
  stone_bricks: { name: "石砖", faces: "石砖.png" },
  mossy_stone_bricks: { name: "苔石砖", faces: "苔石砖.png" },
  cracked_stone_bricks: { name: "裂纹石砖", faces: "裂纹石砖.png" },
  chiseled_stone_bricks: { name: "雕纹石砖", faces: "雕纹石砖.png" },

  granite: { name: "花岗岩", faces: "花岗岩.png" },
  polished_granite: { name: "磨制花岗岩", faces: "磨制花岗岩.png" },
  diorite: { name: "闪长岩", faces: "闪长岩.png" },
  polished_diorite: { name: "磨制闪长岩", faces: "磨制闪长岩.png" },
  andesite: { name: "安山岩", faces: "安山岩.png" },
  polished_andesite: { name: "磨制安山岩", faces: "磨制安山岩.png" },

  deepslate: {
    name: "深板岩",
    faces: { top: "深板岩-顶面.png", bottom: "深板岩.png", side: "深板岩.png" }
  },
  tuff: { name: "凝灰岩", faces: "凝灰岩.png" },
  calcite: { name: "方解石", faces: "方解石.png" },
  dripstone_block: { name: "滴水石块", faces: "滴水石块.png" },

  sand: { name: "沙子", faces: "沙子.png" },
  red_sand: { name: "红沙", faces: "红沙.png" },
  gravel: { name: "沙砾", faces: "沙砾.png" },

  /* ========== 矿石 ========== */

  coal_ore: { name: "煤矿石", faces: "煤矿石.png", glow: "#555" },
  iron_ore: { name: "铁矿石", faces: "铁矿石.png", glow: "#d8af8a" },
  copper_ore: { name: "铜矿石", faces: "铜矿石.png", glow: "#e08a5a" },
  gold_ore: { name: "金矿石", faces: "金矿石.png", glow: "#ffd700" },
  emerald_ore: { name: "绿宝石矿石", faces: "绿宝石矿石.png", glow: "#17dd62" },
  lapis_ore: { name: "青金石矿石", faces: "青金石矿石.png", glow: "#2b6cff" },
  redstone_ore: { name: "红石矿石", faces: "红石矿石.png", glow: "#ff3030" },
  diamond_ore: { name: "钻石矿石", faces: "钻石矿石.png", glow: "#4fe9e9" },

  nether_quartz_ore: { name: "下界石英矿石", faces: "下界石英矿石.png", glow: "#e8e0d0" },
  nether_gold_ore: { name: "下界金矿石", faces: "下界金矿石.png", glow: "#ffd700" },
  ancient_debris: {
    name: "远古残骸",
    faces: { top: "远古残骸-顶面.png", bottom: "远古残骸-顶面.png", side: "远古残骸-侧面.png" },
    glow: "#ff6b35"
  },

  /* ========== 建筑方块 ========== */

  oak_planks: { name: "橡木木板", faces: "橡木木板.png" },
  spruce_planks: { name: "云杉木板", faces: "云杉木板.png" },
  birch_planks: { name: "白桦木板", faces: "白桦木板.png" },
  jungle_planks: { name: "丛林木板", faces: "丛林木板.png" },
  acacia_planks: { name: "金合欢木板", faces: "金合欢木板.png" },
  dark_oak_planks: { name: "深色橡木木板", faces: "深色橡木木板.png" },
  cherry_planks: { name: "樱花木板", faces: "樱花木板.png" },
  bamboo_planks: { name: "竹块", faces: "竹块.png" },
  mangrove_planks: { name: "红树木板", faces: "红树木板.png" },
  crimson_planks: { name: "绯红木板", faces: "绯红木板.png" },
  warped_planks: { name: "诡异木板", faces: "诡异木板.png" },

  bricks: { name: "红砖块", faces: "红砖块.png" },
  nether_bricks: { name: "下界砖块", faces: "下界砖块.png" },
  red_nether_bricks: { name: "红色下界砖块", faces: "红色下界砖块.png" },
  end_stone_bricks: { name: "末地石砖", faces: "末地石砖.png" },
  prismarine: { name: "海晶石", faces: "海晶石.png" },
  prismarine_bricks: { name: "海晶石砖", faces: "海晶石砖.png" },
  dark_prismarine: { name: "暗海晶石", faces: "暗海晶石.png" },

  sandstone: {
    name: "砂岩",
    faces: { top: "砂岩-顶面.png", bottom: "砂岩-底面.png", side: "砂岩.png" }
  },
  red_sandstone: {
    name: "红砂岩",
    faces: { top: "红砂岩-顶面.png", bottom: "红砂岩-底面.png", side: "红砂岩.png" }
  },
  quartz_block: {
    name: "石英块",
    faces: { top: "石英块-顶面.png", bottom: "石英块-底面.png", side: "石英块-侧面.png" }
  },

  purpur_block: { name: "紫珀块", faces: "紫珀块.png" },

  /* ========== 矿物块 ========== */

  iron_block: { name: "铁块", faces: "铁块.png" },
  gold_block: { name: "金块", faces: "金块.png", glow: "#ffd700" },
  diamond_block: { name: "钻石块", faces: "钻石块.png", glow: "#4fe9e9" },
  emerald_block: { name: "绿宝石块", faces: "绿宝石块.png", glow: "#17dd62" },
  netherite_block: { name: "下界合金块", faces: "下界合金块.png", glow: "#6a5a52" },
  copper_block: { name: "铜块", faces: "铜块.png" },
  cut_copper: { name: "切制铜块", faces: "切制铜块.png" },
  exposed_copper: { name: "斑驳的铜块", faces: "斑驳的铜块.png" },
  oxidized_copper: { name: "氧化的铜块", faces: "氧化的铜块.png" },
  lapis_block: { name: "青金石块", faces: "青金石块.png", glow: "#2b6cff" },
  redstone_block: { name: "红石块", faces: "红石块.png", glow: "#ff3030" },
  coal_block: { name: "煤炭块", faces: "煤炭块.png" },
  emerald_block_2: { name: "绿宝石块", faces: "绿宝石块.png" },

  /* ========== 功能方块 ========== */

  crafting_table: {
    name: "工作台",
    faces: { top: "工作台-顶面.png", bottom: "橡木木板.png", side: "工作台-侧面.png", front: "工作台-正面.png" }
  },
  furnace: {
    name: "熔炉",
    faces: { top: "熔炉-顶面.png", bottom: "石头.png", side: "熔炉-侧面.png", front: "熔炉-正面.png" }
  },
  smoker: {
    name: "烟熏炉",
    faces: { top: "烟熏炉-顶面.png", bottom: "烟熏炉-底面.png", side: "烟熏炉-侧面.png", front: "烟熏炉-正面.png" }
  },
  blast_furnace: {
    name: "高炉",
    faces: { top: "高炉-顶面.png", bottom: "高炉-顶面.png", side: "高炉-侧面.png", front: "高炉-正面.png" }
  },
  chest: {
    name: "箱子",
    faces: { top: "普通箱子.png", bottom: "普通箱子.png", side: "普通箱子-右.png", front: "普通箱子-左.png" }
  },
  ender_chest: { name: "末影箱", faces: "末影箱子.png", glow: "#1a7a5a" },
  barrel: {
    name: "木桶",
    faces: { top: "木桶-顶面.png", bottom: "木桶-底面.png", side: "木桶-侧面.png" }
  },
  enchantment_table: {
    name: "附魔台",
    faces: { top: "附魔台-顶面.png", bottom: "附魔台-底面.png", side: "附魔台-侧面.png" }
  },
  anvil: {
    name: "铁砧",
    faces: { top: "铁砧-顶面.png", bottom: "铁砧.png", side: "铁砧.png", front: "铁砧.png" }
  },
  brewing_stand: { name: "酿造台", faces: "酿造台.png" },
  cauldron: {
    name: "炼药锅",
    faces: { top: "炼药锅-顶面.png", bottom: "炼药锅-底面.png", side: "炼药锅-侧面.png" }
  },
  smithing_table: {
    name: "锻造台",
    faces: { top: "锻造台-顶面.png", bottom: "锻造台-底面.png", side: "锻造台-侧面.png" }
  },
  cartography_table: {
    name: "制图台",
    faces: { top: "制图台-顶面.png", bottom: "橡木木板.png", side: "制图台-侧面1.png", front: "制图台-侧面2.png" }
  },
  stonecutter: {
    name: "切石机",
    faces: { top: "切石机-顶面.png", bottom: "切石机-底面.png", side: "切石机-侧面.png", front: "切石机-侧面.png" }
  },
  loom: {
    name: "织布机",
    faces: { top: "织布机-顶面.png", bottom: "织布机-底面.png", side: "织布机-侧面.png" }
  },
  fletching_table: {
    name: "制箭台",
    faces: { top: "制箭台-顶面.png", bottom: "橡木木板.png", side: "制箭台-侧面.png", front: "制箭台-正面.png" }
  },
  lectern: {
    name: "讲台",
    faces: { top: "讲台-顶面.png", bottom: "讲台-底座.png", side: "讲台-侧面.png" }
  },
  bookshelf: {
    name: "书架",
    faces: { top: "橡木木板.png", bottom: "橡木木板.png", side: "书架.png" }
  },

  /* ========== 光源/特殊 ========== */

  glowstone: { name: "荧石", faces: "荧石.png", glow: "#ffe066" },
  sea_lantern: { name: "海晶灯", faces: "海晶灯.png", glow: "#9fe8ff" },
  shroomlight: { name: "菌光体", faces: "菌光体.png", glow: "#ffb347" },
  beacon: { name: "信标", faces: "信标.png", glow: "#89cff0" },
  obsidian: { name: "黑曜石", faces: "黑曜石.png" },
  crying_obsidian: { name: "哭泣的黑曜石", faces: "哭泣的黑曜石.png", glow: "#7a3cb5" },
  bedrock: { name: "基岩", faces: "基岩.png" },
  ice: { name: "冰", faces: "冰.png" },
  packed_ice: { name: "浮冰", faces: "浮冰.png" },
  blue_ice: { name: "蓝冰", faces: "蓝冰.png" },
  snow_block: { name: "雪块", faces: "雪.png" },

  glass: { name: "玻璃", faces: "玻璃.png" },
  tinted_glass: { name: "遮光玻璃", faces: "遮光玻璃.png" },

  slime_block: { name: "黏液块", faces: "黏液块.png", glow: "#5fd15f" },
  honey_block: {
    name: "蜂蜜块",
    faces: { top: "蜂蜜块-顶面.png", bottom: "蜂蜜块-底面.png", side: "蜂蜜块-侧面.png" },
    glow: "#ffaa00"
  },
  magma_block: { name: "岩浆块", faces: "岩浆块.png", glow: "#ff5500" },
  bone_block: {
    name: "骨块",
    faces: { top: "骨块-顶面.png", bottom: "骨块-侧面.png", side: "骨块-侧面.png" }
  },

  pumpkin: {
    name: "南瓜",
    faces: { top: "南瓜-顶面.png", bottom: "南瓜-顶面.png", side: "南瓜-侧面.png" }
  },
  jack_o_lantern: { name: "南瓜灯", faces: "南瓜灯.png", glow: "#ff8800" },
  melon: {
    name: "西瓜",
    faces: { top: "西瓜-顶面.png", bottom: "西瓜-顶面.png", side: "西瓜-侧面.png" }
  },
  cake: {
    name: "蛋糕",
    faces: { top: "蛋糕-顶面.png", bottom: "蛋糕-底面.png", side: "蛋糕-侧面.png" }
  },
  tnt: {
    name: "TNT",
    faces: { top: "TNT-顶面.png", bottom: "TNT-底面.png", side: "TNT-侧面.png" }
  },

  beehive: {
    name: "蜂巢",
    faces: { top: "蜂巢-顶面.png", bottom: "蜂巢-底面.png", side: "蜂巢-侧面.png", front: "蜂巢-正面.png" },
    glow: "#ffaa00"
  },

  /* ========== 下界 ========== */

  netherrack: { name: "下界岩", faces: "下界岩.png" },
  soul_sand: { name: "灵魂沙", faces: "灵魂沙.png" },
  soul_soil: { name: "灵魂土", faces: "灵魂土.png" },
  basalt: {
    name: "玄武岩",
    faces: { top: "玄武岩-顶面.png", bottom: "玄武岩-侧面.png", side: "玄武岩-侧面.png" }
  },
  polished_basalt: { name: "磨制玄武岩", faces: "磨制玄武岩-侧面.png" },
  smooth_basalt: { name: "平滑玄武岩", faces: "平滑玄武岩.png" },
  blackstone: {
    name: "黑石",
    faces: { top: "黑石-顶面.png", bottom: "黑石.png", side: "黑石.png" }
  },
  polished_blackstone: { name: "磨制黑石", faces: "磨制黑石.png" },
  polished_blackstone_bricks: { name: "磨制黑石砖", faces: "磨制黑石砖.png" },
  cracked_polished_blackstone_bricks: { name: "裂纹磨制黑石砖", faces: "裂纹磨制黑石砖.png" },
  chiseled_polished_blackstone: { name: "雕纹磨制黑石", faces: "雕纹磨制黑石.png" },

  /* ========== 末地 ========== */

  end_stone: { name: "末地石", faces: "末地石.png" },
  end_portal_frame: {
    name: "末地传送门框架",
    faces: { top: "末地传送门框架-顶面.png", bottom: "末地石.png", side: "末地传送门框架-侧面.png" }
  },
  dragon_egg: { name: "龙蛋", faces: "龙蛋.png", glow: "#3a2a5a" },

  /* ========== 幽匿系列 ========== */

  sculk: { name: "幽匿块", faces: "幽匿块.png", glow: "#1a3a8a" },
  sculk_vein: { name: "幽匿脉络", faces: "幽匿脉络.png", glow: "#1a3a8a" },
  sculk_catalyst: {
    name: "幽匿催发体",
    faces: { top: "幽匿催发体-顶面.png", bottom: "幽匿催发体-底面.png", side: "幽匿催发体-侧面.png" },
    glow: "#1a3a8a"
  },
  sculk_sensor: {
    name: "幽匿感测体",
    faces: { top: "幽匿感测体-顶面.png", bottom: "幽匿感测体-底面.png", side: "幽匿感测体-侧面.png" },
    glow: "#1a3a8a"
  },
  sculk_shrieker: {
    name: "幽匿尖啸体",
    faces: { top: "幽匿尖啸体-顶面.png", bottom: "幽匿尖啸体-底面.png", side: "幽匿尖啸体-侧面.png" },
    glow: "#1a3a8a"
  },

  /* ========== 紫水晶 ========== */

  amethyst_block: { name: "紫水晶块", faces: "紫水晶块.png", glow: "#9b59b6" },
  budding_amethyst: { name: "紫水晶母岩", faces: "紫水晶母岩.png", glow: "#9b59b6" },

  /* ========== 红树/樱花 ========== */

  mangrove_roots: {
    name: "红树根",
    faces: { top: "红树根-顶面.png", bottom: "红树根-侧面.png", side: "红树根-侧面.png" }
  },
  muddy_mangrove_roots: {
    name: "沾泥的红树根",
    faces: { top: "沾泥的红树根-顶面.png", bottom: "沾泥的红树根-侧面.png", side: "沾泥的红树根-侧面.png" }
  },

  /* ========== 其他 ========== */

  reinforced_deepslate: {
    name: "强化深板岩",
    faces: { top: "强化深板岩-顶面.png", bottom: "强化深板岩-底面.png", side: "强化深板岩-侧面.png" }
  },
  respawn_anchor: {
    name: "重生锚",
    faces: { top: "重生锚-顶面.png", bottom: "重生锚-底面.png", side: "重生锚-侧面0.png" },
    glow: "#ff6b9d"
  },
  lodestone: {
    name: "磁石",
    faces: { top: "磁石-顶面.png", bottom: "磁石-侧面.png", side: "磁石-侧面.png" },
    glow: "#6eb5ff"
  },
  target: {
    name: "标靶",
    faces: { top: "标靶-顶面.png", bottom: "标靶-侧面.png", side: "标靶-侧面.png" }
  },

  /* ========== 原木 (顶面为年轮) ========== */

  oak_log: {
    name: "橡木原木",
    faces: { top: "橡木原木-顶面.png", bottom: "橡木原木-顶面.png", side: "橡木原木.png" }
  },
  spruce_log: {
    name: "云杉原木",
    faces: { top: "云杉原木-顶面.png", bottom: "云杉原木-顶面.png", side: "云杉原木.png" }
  },
  birch_log: {
    name: "白桦原木",
    faces: { top: "白桦原木-顶面.png", bottom: "白桦原木-顶面.png", side: "白桦原木.png" }
  },
  jungle_log: {
    name: "丛林原木",
    faces: { top: "丛林原木-顶面.png", bottom: "丛林原木-顶面.png", side: "丛林原木.png" }
  },
  acacia_log: {
    name: "金合欢原木",
    faces: { top: "金合欢原木-顶面.png", bottom: "金合欢原木-顶面.png", side: "金合欢原木.png" }
  },
  dark_oak_log: {
    name: "深色橡木原木",
    faces: { top: "深色橡木原木-顶面.png", bottom: "深色橡木原木-顶面.png", side: "深色橡木原木.png" }
  },
  cherry_log: {
    name: "樱花原木",
    faces: { top: "樱花原木-顶面.png", bottom: "樱花原木-顶面.png", side: "樱花原木.png" }
  },
  mangrove_log: {
    name: "红树原木",
    faces: { top: "红树原木-顶面.png", bottom: "红树原木-顶面.png", side: "红树原木.png" }
  },
  crimson_stem: {
    name: "绯红菌柄",
    faces: { top: "绯红菌柄-顶面.png", bottom: "绯红菌柄-顶面.png", side: "绯红菌柄.png" }
  },
  warped_stem: {
    name: "诡异菌柄",
    faces: { top: "诡异菌柄-顶面.png", bottom: "诡异菌柄-顶面.png", side: "诡异菌柄.png" }
  },
  bamboo_block: {
    name: "竹块",
    faces: { top: "竹块-顶面.png", bottom: "竹块-顶面.png", side: "竹块.png" }
  }

};

/* ============================================================
   渲染函数
   ============================================================ */

/**
 * 创建立方体 DOM
 * @param {string} blockKey - 方块键名
 * @param {object} options - { size, anim, loop, classes }
 * @returns {HTMLElement}
 */
function createMinecraftCube(blockKey, options = {}) {
  const block = MC_BLOCKS[blockKey];
  if (!block) {
    console.warn("Unknown block:", blockKey);
    return null;
  }

  const size = options.size || "md";
  const faces = resolveFaces(block.faces);

  // 外层 stage
  const stage = document.createElement("div");
  stage.className = `mc-stage mc-size-${size}`;

  // 等轴测倾斜层：与动画层分离，避免动画的 transform 覆盖 3D 视角造成错位
  const tilt = document.createElement("div");
  tilt.className = "mc-iso-tilt";

  // 立方体（动画只作用在这一层）
  const cube = document.createElement("div");
  cube.className = "mc-cube";
  if (options.classes) cube.classList.add(...options.classes.split(" "));
  if (block.glow) {
    cube.style.setProperty("--mc-glow-color", block.glow);
  }

  // 六面
  const faceData = [
    { cls: "front",  tex: faces.front  || faces.side },
    { cls: "back",   tex: faces.back   || faces.side },
    { cls: "right",  tex: faces.right  || faces.side },
    { cls: "left",   tex: faces.left   || faces.side },
    { cls: "top",    tex: faces.top    || faces.side },
    { cls: "bottom", tex: faces.bottom || faces.side }
  ];

  faceData.forEach(f => {
    const el = document.createElement("div");
    el.className = `face ${f.cls}`;
    el.style.backgroundImage = `url("${TEX_PATH}${f.tex}")`;
    cube.appendChild(el);
  });

  tilt.appendChild(cube);
  stage.appendChild(tilt);

  // 阴影
  const shadow = document.createElement("div");
  shadow.className = "mc-shadow";
  stage.appendChild(shadow);

  // 标签
  if (options.label !== false) {
    const label = document.createElement("div");
    label.className = "mc-label";
    label.textContent = block.name;
    stage.appendChild(label);
  }

  return stage;
}

/**
 * 解析 face 定义为六面对象
 */
function resolveFaces(faces) {
  if (typeof faces === "string") {
    return { front: faces, back: faces, left: faces, right: faces, top: faces, bottom: faces };
  }
  return faces;
}

/**
 * 播放动画
 * 立方体本体上同时只允许一个 animation：transform/opacity 类动画互相覆盖
 * （特异度更高者胜），会导致点击无反应或视角跳变。播放单次动画前先摘下
 * 其他 transform/opacity 循环动画，结束后自动恢复。
 * 发光/呼吸/流动等作用在 .face 叶子上的动画与立方体本体不冲突，无需摘取。
 */
const ONE_SHOT_ANIMS = [
  "anim-flip-y", "anim-flip-x", "anim-flip-z", "anim-flip-xyz",
  "anim-tumble", "anim-break", "anim-place"
];
const FACE_LEVEL_ANIMS = [
  "anim-glow", "anim-breathe", "anim-water",
  "anim-lava", "anim-portal", "anim-enchant"
];

function playAnim(cube, animClass) {
  // 播放序号：连点时旧动画被取消，旧回调不再恢复/清理，避免循环动画类丢失
  const run = (cube._mcRun = (cube._mcRun || 0) + 1);
  const prevSaved = cube._mcSaved || [];
  const current = Array.from(cube.classList).filter(
    c => c.startsWith("anim-") &&
         c !== animClass &&
         !ONE_SHOT_ANIMS.includes(c) &&
         !FACE_LEVEL_ANIMS.includes(c)
  );
  const saved = prevSaved.length ? prevSaved : current;
  cube._mcSaved = saved;
  saved.forEach(c => cube.classList.remove(c));
  ONE_SHOT_ANIMS.forEach(c => cube.classList.remove(c));
  cube.classList.remove("replay");
  // 强制重排以重启动画
  void cube.offsetWidth;
  cube.classList.add(animClass);

  const finish = () => {
    if (cube._mcRun !== run) return; // 已被新一次播放接管
    cube._mcRun = null;
    cube._mcSaved = null;
    cube.classList.remove(animClass);
    saved.forEach(c => cube.classList.add(c));
  };
  cube.addEventListener("animationend", e => {
    if (e.target === cube) finish();
  }, { once: true });
  cube.addEventListener("animationcancel", e => {
    if (e.target === cube) finish();
  }, { once: true });
}

/**
 * 绑定点击动画 (草方块标志特效: 横向翻转一圈)
 */
function bindClickFlip(stage, animClass = "anim-flip-y") {
  const cube = stage.querySelector(".mc-cube");
  cube.addEventListener("click", () => playAnim(cube, animClass));
  return stage;
}

/** 导出到全局 */
window.MC_BLOCKS = MC_BLOCKS;
window.createMinecraftCube = createMinecraftCube;
window.playAnim = playAnim;
window.bindClickFlip = bindClickFlip;
