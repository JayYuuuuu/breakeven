/**
 * 商品分析示例数据
 * 包含各种价格模式的示例商品
 */

// 系统参数示例（与主系统保持一致）
export const SYSTEM_PARAMS_EXAMPLE = {
  inputTaxRate: 0.06,        // 开票成本比例
  outputTaxRate: 0.13,       // 商品进项税率
  platformRate: 0.055,       // 平台佣金率
  shippingCost: 2.8,         // 物流费
  shippingInsurance: 1.5,    // 运费险
  otherCost: 2.5,            // 其他成本
  salesTaxRate: 0.13,        // 销项税率
  serviceVATRate: 0.06,      // 服务费税率
  goodsMode: 'canReturn'     // 进货模式
};

// 示例商品数据
export const PRODUCT_EXAMPLES = [
  // 淘宝平台产品
  {
    name: '摇粒绒马甲',
    sku: 'HYXB50001',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 标记为新品
    singlePrice: 58,
    tierPrices: [],
    returnRate: 0.1399,
    singleCost: 22.5,
    tierCosts: []
  },
  {
    name: '色纱空气层单裤',
    sku: 'FWL240331',
    platform: '淘宝',
    isMain: true,
    isNew: false, // 标记为新品
    singlePrice: 0,
    tierPrices: [59.80, 65.80, 69.80],
    returnRate: 0.2315,
    singleCost: 0,
    tierCosts: [27.00, 29.50, 32.00]
  },
  {
    name: '暖阳绒',
    sku: 'HYXY8101',
    platform: '淘宝',
    isMain: true,
    isNew: false, // 非新品
    singlePrice: 79.8,
    tierPrices: [],
    returnRate: 0.1082,
    singleCost: 38,
    tierCosts: []
  },
  {
    name: '绵绵绒上衣',
    sku: 'FWL240441',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 49.8,
    tierPrices: [],
    returnRate: 0.1427,
    singleCost: 0,
    tierCosts: [18.50, 20.50]
  },
  {
    name: '色纱棉毛',
    sku: 'HYXY50001',
    platform: '淘宝',
    isMain: true,
    isNew: false, // 非新品
    singlePrice: 89.1,
    tierPrices: [],
    returnRate: 0.0889,
    singleCost: 44,
    tierCosts: []
  },
  {
    name: '色纱加绒',
    sku: 'HYXY60001',
    platform: '淘宝',
    isMain: true,
    isNew: false, // 非新品
    singlePrice: 129,
    tierPrices: [],
    returnRate: 0.1267,
    singleCost: 62,
    tierCosts: []
  },
  {
    name: '鸿运礼盒',
    sku: 'HYX2889',
    platform: '淘宝',
    isMain: true,
    isNew: false, // 非新品
    singlePrice: 69.8,
    tierPrices: [],
    returnRate: 0.0658,
    singleCost: 33,
    tierCosts: []
  },
  {
    name: '鸿运内裤',
    sku: 'HYXN3061',
    platform: '淘宝',
    isMain: true,
    isNew: false, // 非新品
    singlePrice: 69.8,
    tierPrices: [],
    returnRate: 0.0639,
    singleCost: 0,
    tierCosts: [29.50, 31.00, 33.50]
  },
  {
    name: '纯色棉毛',
    sku: 'HYX19585',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [62.10, 62.10, 71.10],
    returnRate: 0.0940,
    singleCost: 0,
    tierCosts: [33.50, 38.50, 42.00]
  },
  {
    name: '纯棉印花棉毛',
    sku: 'HYX2021',
    platform: '淘宝',
    isMain: true,
    isNew: false, // 非新品
    singlePrice: 69.98,
    tierPrices: [],
    returnRate: 0.0914,
    singleCost: 35,
    tierCosts: []
  },
  {
    name: '纯棉印花棉毛',
    sku: 'HYX2221',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 79.98,
    tierPrices: [],
    returnRate: 0.0692,
    singleCost: 43.5,
    tierCosts: []
  },
  {
    name: '空气层套装',
    sku: 'FWL240131',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [99.00, 108.00, 115.50],
    returnRate: 0.1308,
    singleCost: 0,
    tierCosts: [50.00, 52.50, 56.00]
  },
  {
    name: '德绒背心',
    sku: 'HYX2140',
    platform: '淘宝',
    isMain: true,
    isNew: false, // 非新品
    singlePrice: 79,
    tierPrices: [],
    returnRate: 0.0914,
    singleCost: 0,
    tierCosts: [24.30, 30.30, 33.80]
  },
  {
    name: '德绒套装（不贴片）',
    sku: 'HYX2101',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 129,
    tierPrices: [],
    returnRate: 0.0847,
    singleCost: 64,
    tierCosts: []
  },
  {
    name: '德绒套装（贴片）',
    sku: 'HYX21011-1',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 149,
    tierPrices: [],
    returnRate: 0.0455,
    singleCost: 67,
    tierCosts: []
  },
  {
    name: '德绒运动套装',
    sku: 'HYX2151',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 139,
    tierPrices: [],
    returnRate: 0.1058,
    singleCost: 68.5,
    tierCosts: []
  },
  {
    name: '大红棉毛',
    sku: 'HYX17100',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [71.10, 71.10, 80.10],
    returnRate: 0.0799,
    singleCost: 0,
    tierCosts: [37.50, 40.50, 44.00]
  },
  {
    name: '色纱空气层马甲',
    sku: 'FWL240231',
    platform: '淘宝',
    isMain: true,
    isNew: false, // 非新品
    singlePrice: 59.4,
    tierPrices: [],
    returnRate: 0.1522,
    singleCost: 27,
    tierCosts: []
  },
  {
    name: '蜂巢马甲',
    sku: 'FWL240251',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 99,
    tierPrices: [],
    returnRate: 0.1606,
    singleCost: 47,
    tierCosts: []
  },
  {
    name: '蜂巢裤子',
    sku: 'FWL240351',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 99,
    tierPrices: [],
    returnRate: 0.2687,
    singleCost: 47,
    tierCosts: []
  },
  {
    name: '蜂巢上衣',
    sku: 'FWL240451',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 118.8,
    tierPrices: [],
    returnRate: 0.2111,
    singleCost: 56,
    tierCosts: []
  },
  {
    name: '棉莱卡内衣',
    sku: 'HYXY70001',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 89.1,
    tierPrices: [],
    returnRate: 0.1044,
    singleCost: 46,
    tierCosts: []
  },
  {
    name: '纯棉秋裤',
    sku: 'HYX1813',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [35.10, 39.60, 44.10, 44.10],
    returnRate: 0.0685,
    singleCost: 0,
    tierCosts: [17.00, 18.50, 20.00, 21.50]
  },
  {
    name: '色纱加绒单裤',
    sku: 'FWL240361',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [69.30, 79.20, 89.10],
    returnRate: 0.2885,
    singleCost: 0,
    tierCosts: [31.00, 37.00, 43.00]
  },
  {
    name: '莫代尔内裤',
    sku: 'HYXN3081',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 79.8,
    tierPrices: [],
    returnRate: 0.0726,
    singleCost: 0,
    tierCosts: [30.50, 32.00]
  },
  {
    name: '网眼内裤3条',
    sku: 'HYXN94341',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 69,
    tierPrices: [],
    returnRate: 0.0510,
    singleCost: 0,
    tierCosts: [26.50, 28.00, 29.50]
  },
  {
    name: '网眼内裤4条',
    sku: 'FWL2505541',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 79.8,
    tierPrices: [],
    returnRate: 0.0510,
    singleCost: 0,
    tierCosts: [30.50, 33.00]
  },
  {
    name: '胖童内裤',
    sku: 'HYXN11221',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 59,
    tierPrices: [],
    returnRate: 0.1095,
    singleCost: 25.5,
    tierCosts: []
  },
  {
    name: '纯棉内裤3条',
    sku: 'HYX1801',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [53.10, 53.10, 62.10],
    returnRate: 0.0503,
    singleCost: 0,
    tierCosts: [27.50, 29.00, 30.50]
  },
  {
    name: '纯棉内裤4条常规',
    sku: 'HYX2003',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 69.75,
    tierPrices: [],
    returnRate: 0.0399,
    singleCost: 0,
    tierCosts: [36.50, 39.50]
  },
  {
    name: '纯棉内裤4条小童',
    sku: 'FWL2405141',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 69.75,
    tierPrices: [],
    returnRate: 0.0623,
    singleCost: 0,
    tierCosts: [28.50, 30.00]
  },
  {
    name: '纯棉内裤3条',
    sku: 'FWL2505131',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 59,
    tierPrices: [],
    returnRate: 0.0482,
    singleCost: 0,
    tierCosts: [23.40, 25.00]
  },
  {
    name: '加绒套装',
    sku: 'HYX1881',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 99,
    tierPrices: [],
    returnRate: 0.1287,
    singleCost: 58,
    tierCosts: []
  },
  {
    name: '空气层加绒套装',
    sku: 'FWL240161',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [125.10, 134.10, 143.10],
    returnRate: 0.1487,
    singleCost: 0,
    tierCosts: [59.00, 64.00, 69.00]
  },
  {
    name: '羊毛衫',
    sku: 'JYMBQ2262A',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [229.00, 239.00, 249.00, 289.00, 299.00, 309.00, 319.00, 329.00],
    returnRate: 0.2500,
    singleCost: 0,
    tierCosts: [147.00, 157.00, 157.00, 167.00, 167.00, 177.00, 182.00, 192.00]
  },
  {
    name: '全棉针织衫',
    sku: 'HG03HDCJB',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [109.00, 129.00],
    returnRate: 0.2384,
    singleCost: 0,
    tierCosts: [62.00, 72.00]
  },
  {
    name: '加绒单上衣',
    sku: 'HYXC60001',
    platform: '淘宝',
    isMain: true,
    isNew: false, // 非新品
    singlePrice: 79,
    tierPrices: [],
    returnRate: 0.1604,
    singleCost: 36,
    tierCosts: []
  },
  {
    name: '绵绵绒套装',
    sku: 'FWL240141',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [59.80, 69.80],
    returnRate: 0.0866,
    singleCost: 0,
    tierCosts: [29.00, 30.50]
  },
  {
    name: '空气层马甲（老）',
    sku: 'HYXB8401',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 59.4,
    tierPrices: [],
    returnRate: 0.1558,
    singleCost: 25.5,
    tierCosts: []
  },
  // 天猫平台产品
  {
    name: '色纱空气层单裤',
    sku: 'FWL240331',
    platform: '天猫',
    isMain: true,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [59.80, 65.80, 69.80],
    returnRate: 0.2210,
    singleCost: 0,
    tierCosts: [27.00, 29.50, 32.00]
  },
  {
    name: '暖阳绒',
    sku: 'HYXY8101',
    platform: '天猫',
    isMain: true,
    isNew: false, // 非新品
    singlePrice: 79.8,
    tierPrices: [],
    returnRate: 0.1024,
    singleCost: 38,
    tierCosts: []
  },
  {
    name: '绵绵绒上衣',
    sku: 'FWL240441',
    platform: '天猫',
    isMain: true,
    isNew: false, // 非新品
    singlePrice: 49.8,
    tierPrices: [],
    returnRate: 0.0974,
    singleCost: 0,
    tierCosts: [18.50, 20.50]
  },
  {
    name: '色纱棉毛',
    sku: 'HYXY50001',
    platform: '天猫',
    isMain: true,
    isNew: false, // 非新品
    singlePrice: 89.1,
    tierPrices: [],
    returnRate: 0.1055,
    singleCost: 44,
    tierCosts: []
  },
  {
    name: '色纱加绒',
    sku: 'HYXY60001',
    platform: '天猫',
    isMain: true,
    isNew: false, // 非新品
    singlePrice: 129,
    tierPrices: [],
    returnRate: 0.1117,
    singleCost: 62,
    tierCosts: []
  },
  {
    name: '鸿运礼盒',
    sku: 'HYX2889',
    platform: '天猫',
    isMain: true,
    isNew: false, // 非新品
    singlePrice: 69.8,
    tierPrices: [],
    returnRate: 0.0592,
    singleCost: 33,
    tierCosts: []
  },
  {
    name: '鸿运内裤',
    sku: 'HYXN3061',
    platform: '天猫',
    isMain: true,
    isNew: false, // 非新品
    singlePrice: 69.8,
    tierPrices: [],
    returnRate: 0.0716,
    singleCost: 0,
    tierCosts: [29.50, 31.00, 33.50]
  },
  {
    name: '纯色棉毛',
    sku: 'HYX19585',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [62.10, 62.10, 71.10],
    returnRate: 0.0823,
    singleCost: 0,
    tierCosts: [33.50, 38.50, 42.00]
  },
  {
    name: '纯棉印花棉毛',
    sku: 'HYX2021',
    platform: '天猫',
    isMain: true,
    isNew: false, // 非新品
    singlePrice: 69.98,
    tierPrices: [],
    returnRate: 0.0887,
    singleCost: 35,
    tierCosts: []
  },
  {
    name: '纯棉印花棉毛',
    sku: 'HYX2221',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 79.98,
    tierPrices: [],
    returnRate: 0.0721,
    singleCost: 43.5,
    tierCosts: []
  },
  {
    name: '空气层套装',
    sku: 'FWL240131',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [99.00, 108.00, 115.50],
    returnRate: 0.1329,
    singleCost: 0,
    tierCosts: [50.00, 52.50, 56.00]
  },
  {
    name: '德绒背心',
    sku: 'HYX2140',
    platform: '天猫',
    isMain: true,
    isNew: false, // 非新品
    singlePrice: 79,
    tierPrices: [],
    returnRate: 0.0800,
    singleCost: 0,
    tierCosts: [24.30, 30.30, 33.80]
  },
  {
    name: '德绒套装（不贴片）',
    sku: 'HYX2101',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 129,
    tierPrices: [],
    returnRate: 0.1071,
    singleCost: 64,
    tierCosts: []
  },
  {
    name: '德绒套装（贴片）',
    sku: 'HYX21011-1',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 149,
    tierPrices: [],
    returnRate: 0.0909,
    singleCost: 67,
    tierCosts: []
  },
  {
    name: '德绒运动套装',
    sku: 'HYX2151',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 139,
    tierPrices: [],
    returnRate: 0.1471,
    singleCost: 68.5,
    tierCosts: []
  },
  {
    name: '大红棉毛',
    sku: 'HYX17100',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [71.10, 71.10, 80.10],
    returnRate: 0.0817,
    singleCost: 0,
    tierCosts: [37.50, 40.50, 44.00]
  },
  {
    name: '色纱空气层马甲',
    sku: 'FWL240231',
    platform: '天猫',
    isMain: true,
    isNew: false, // 非新品
    singlePrice: 59.4,
    tierPrices: [],
    returnRate: 0.1714,
    singleCost: 27,
    tierCosts: []
  },
  {
    name: '蜂巢马甲',
    sku: 'FWL240251',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 99,
    tierPrices: [],
    returnRate: 0.2171,
    singleCost: 47,
    tierCosts: []
  },
  {
    name: '蜂巢裤子',
    sku: 'FWL240351',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 99,
    tierPrices: [],
    returnRate: 0.2375,
    singleCost: 47,
    tierCosts: []
  },
  {
    name: '蜂巢上衣',
    sku: 'FWL240451',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 118.8,
    tierPrices: [],
    returnRate: 0.1667,
    singleCost: 56,
    tierCosts: []
  },
  {
    name: '棉莱卡内衣',
    sku: 'HYXY70001',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 89.1,
    tierPrices: [],
    returnRate: 0.0619,
    singleCost: 46,
    tierCosts: []
  },
  {
    name: '纯棉秋裤',
    sku: 'HYX1813',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [35.10, 39.60, 44.10, 44.10],
    returnRate: 0.0683,
    singleCost: 0,
    tierCosts: [17.00, 18.50, 20.00, 21.50]
  },
  {
    name: '色纱加绒单裤',
    sku: 'FWL240361',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [69.30, 79.20, 89.10],
    returnRate: 0.2509,
    singleCost: 0,
    tierCosts: [31.00, 37.00, 43.00]
  },
  {
    name: '莫代尔内裤',
    sku: 'HYXN3081',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 79.8,
    tierPrices: [],
    returnRate: 0.0785,
    singleCost: 0,
    tierCosts: [30.50, 32.00]
  },
  {
    name: '网眼内裤3条',
    sku: 'HYXN94341',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 69,
    tierPrices: [],
    returnRate: 0.0547,
    singleCost: 0,
    tierCosts: [26.50, 28.00, 29.50]
  },
  {
    name: '网眼内裤4条',
    sku: 'FWL2505541',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 79.8,
    tierPrices: [],
    returnRate: 0.0510,
    singleCost: 0,
    tierCosts: [30.50, 33.00]
  },
  {
    name: '胖童内裤',
    sku: 'HYXN11221',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 59,
    tierPrices: [],
    returnRate: 0.0841,
    singleCost: 25.5,
    tierCosts: []
  },
  {
    name: '纯棉内裤3条',
    sku: 'HYX1801',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [53.10, 53.10, 62.10],
    returnRate: 0.0381,
    singleCost: 0,
    tierCosts: [27.50, 29.00, 30.50]
  },
  {
    name: '纯棉内裤4条常规',
    sku: 'HYX2003',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 69.75,
    tierPrices: [],
    returnRate: 0.0322,
    singleCost: 0,
    tierCosts: [36.50, 39.50]
  },
  {
    name: '纯棉内裤4条小童',
    sku: 'FWL2405141',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 69.75,
    tierPrices: [],
    returnRate: 0.0000,
    singleCost: 0,
    tierCosts: [28.50, 30.00]
  },
  {
    name: '纯棉内裤3条',
    sku: 'FWL2505131',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 59,
    tierPrices: [],
    returnRate: 0.0484,
    singleCost: 0,
    tierCosts: [23.40, 25.00]
  },
  {
    name: '加绒单上衣',
    sku: 'HYXC60001',
    platform: '天猫',
    isMain: true,
    isNew: false, // 非新品
    singlePrice: 79,
    tierPrices: [],
    returnRate: 0.1860,
    singleCost: 36,
    tierCosts: []
  },
  {
    name: '绵绵绒套装',
    sku: 'FWL240141',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [59.80, 69.80],
    returnRate: 0.0345,
    singleCost: 0,
    tierCosts: [29.00, 30.50]
  },
  {
    name: '空气层马甲（老）',
    sku: 'HYXB8401',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 59.4,
    tierPrices: [],
    returnRate: 0.1712,
    singleCost: 25.5,
    tierCosts: []
  },
  // 其他产品
  {
    name: '奥粒绒单裤',
    sku: 'HYX240381',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 49.5,
    tierPrices: [],
    returnRate: 0.1949,
    singleCost: 21,
    tierCosts: []
  },
  {
    name: '奥粒绒套装',
    sku: 'HYX240181',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 89.1,
    tierPrices: [],
    returnRate: 0.1579,
    singleCost: 44,
    tierCosts: []
  },
  {
    name: '大红背心',
    sku: 'HYX18103',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 35.9,
    tierPrices: [],
    returnRate: 0.1045,
    singleCost: 15,
    tierCosts: []
  },
  {
    name: '大红背心',
    sku: 'HYX18103',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 35.9,
    tierPrices: [],
    returnRate: 0.0919,
    singleCost: 15,
    tierCosts: []
  },
  {
    name: '摇粒绒马甲拉链款',
    sku: 'HYXM50001',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 78,
    tierPrices: [],
    returnRate: 0.2519,
    singleCost: 35,
    tierCosts: []
  },
  {
    name: '火山石套装',
    sku: 'HYX9101',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 98.1,
    tierPrices: [],
    returnRate: 0.1244,
    singleCost: 45,
    tierCosts: []
  },
  {
    name: '德绒单裤',
    sku: 'HYX21311',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 79.8,
    tierPrices: [],
    returnRate: 0.1346,
    singleCost: 38,
    tierCosts: []
  },
  {
    name: '德绒单裤',
    sku: 'HYX21311',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 79.8,
    tierPrices: [],
    returnRate: 0.2286,
    singleCost: 38,
    tierCosts: []
  },
  {
    name: '全棉短袖家居服',
    sku: 'HYXJ5031',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 71.1,
    tierPrices: [],
    returnRate: 0.0465,
    singleCost: 32,
    tierCosts: []
  },
  {
    name: '长袖家居服',
    sku: 'HYXJ1111',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 134.1,
    tierPrices: [],
    returnRate: 0.1325,
    singleCost: 63.5,
    tierCosts: []
  },
  {
    name: '全棉单上衣',
    sku: 'HYX1811',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [44.40, 53.10, 62.10, 62.10],
    returnRate: 0.1194,
    singleCost: 0,
    tierCosts: [19.00, 20.50, 22.00, 23.50]
  },
  {
    name: '全棉单上衣',
    sku: 'HYX1811',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [44.40, 53.10, 62.10, 62.10],
    returnRate: 0.0517,
    singleCost: 0,
    tierCosts: [19.00, 20.50, 22.00, 23.50]
  },
  {
    name: '加绒单裤',
    sku: 'HYX19527',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 71.1,
    tierPrices: [],
    returnRate: 0.2028,
    singleCost: 0,
    tierCosts: [29.50, 32.00, 34.00, 37.00]
  },
  {
    name: '暖阳绒单上衣',
    sku: 'HYXC811',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 53.1,
    tierPrices: [],
    returnRate: 0.1164,
    singleCost: 23,
    tierCosts: []
  },
  {
    name: '纯棉背心',
    sku: 'HYX2117',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 29,
    tierPrices: [],
    returnRate: 0.0668,
    singleCost: 0,
    tierCosts: [14.20, 16.10, 18.00, 19.90]
  },
  {
    name: '纯棉背心',
    sku: 'HYX2117',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 29,
    tierPrices: [],
    returnRate: 0.0661,
    singleCost: 0,
    tierCosts: [14.20, 16.10, 18.00, 19.90]
  },
  {
    name: '网眼背心',
    sku: 'HYXB7201',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 29.9,
    tierPrices: [],
    returnRate: 0.0811,
    singleCost: 14,
    tierCosts: []
  },
  {
    name: '网眼背心',
    sku: 'HYXB7201',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 29.9,
    tierPrices: [],
    returnRate: 0.0748,
    singleCost: 14,
    tierCosts: []
  },
  {
    name: '空气层加绒单裤',
    sku: 'HYX21811',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [71.10, 76.50, 80.10],
    returnRate: 0.2906,
    singleCost: 0,
    tierCosts: [30.00, 36.00, 41.00]
  },
  {
    name: '空气层加绒单裤',
    sku: 'HYX21811',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [71.10, 76.50, 80.10],
    returnRate: 0.1811,
    singleCost: 0,
    tierCosts: [30.00, 36.00, 41.00]
  },
  {
    name: '空气层单裤',
    sku: 'HYX20313',
    platform: '淘宝',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [53.10, 58.80, 62.10, 62.10],
    returnRate: 0.1612,
    singleCost: 0,
    tierCosts: [24.80, 26.60, 29.00, 31.60]
  },
  {
    name: '空气层单裤',
    sku: 'HYX20313',
    platform: '天猫',
    isMain: false,
    isNew: false, // 非新品
    singlePrice: 0,
    tierPrices: [53.10, 58.80, 62.10, 62.10],
    returnRate: 0.1362,
    singleCost: 0,
    tierCosts: [24.80, 26.60, 29.00, 31.60]
  }
];

// 获取示例数据的函数
export function getProductExamples() {
  return [...PRODUCT_EXAMPLES];
}

// 获取系统参数示例
export function getSystemParamsExample() {
  return { ...SYSTEM_PARAMS_EXAMPLE };
}

// 生成示例CSV内容
export function generateExampleCSV() {
  const headers = ['商品名称', '货号', '平台', '主推款', '含税售价P', '含税售价（多档）', '退货率', '进货价（多档）'];
  const examples = [
    ['摇粒绒马甲', 'HYXB50001', '淘宝', '否', '58', '', '13.99%', '22.5'],
    ['色纱空气层单裤', 'FWL240331', '淘宝', '是', '0', '59.80;65.80;69.80', '23.15%', '27.00;29.50;32.00'],
    ['暖阳绒', 'HYXY8101', '淘宝', '是', '79.8', '', '10.82%', '38'],
    ['绵绵绒上衣', 'FWL240441', '淘宝', '否', '49.8', '', '14.27%', '18.50;20.50'],
    ['色纱棉毛', 'HYXY50001', '淘宝', '是', '89.1', '', '8.89%', '44'],
    ['色纱加绒', 'HYXY60001', '淘宝', '是', '129', '', '12.67%', '62'],
    ['鸿运礼盒', 'HYX2889', '淘宝', '是', '69.8', '', '6.58%', '33'],
    ['鸿运内裤', 'HYXN3061', '淘宝', '是', '69.8', '', '6.39%', '29.50;31.00;33.50'],
    ['纯色棉毛', 'HYX19585', '淘宝', '否', '0', '62.10;62.10;71.10', '9.40%', '33.50;38.50;42.00'],
    ['纯棉印花棉毛', 'HYX2021', '淘宝', '是', '69.98', '', '9.14%', '35'],
    ['纯棉印花棉毛', 'HYX2221', '淘宝', '否', '79.98', '', '6.92%', '43.5'],
    ['空气层套装', 'FWL240131', '淘宝', '否', '0', '99.00;108.00;115.50', '13.08%', '50.00;52.50;56.00'],
    ['德绒背心', 'HYX2140', '淘宝', '是', '79', '', '9.14%', '24.30;30.30;33.80'],
    ['德绒套装（不贴片）', 'HYX2101', '淘宝', '否', '129', '', '8.47%', '64'],
    ['德绒套装（贴片）', 'HYX21011-1', '淘宝', '否', '149', '', '4.55%', '67'],
    ['德绒运动套装', 'HYX2151', '淘宝', '否', '139', '', '10.58%', '68.5'],
    ['大红棉毛', 'HYX17100', '淘宝', '否', '0', '71.10;71.10;80.10', '7.99%', '37.50;40.50;44.00'],
    ['色纱空气层马甲', 'FWL240231', '淘宝', '是', '59.4', '', '15.22%', '27'],
    ['蜂巢马甲', 'FWL240251', '淘宝', '否', '99', '', '16.06%', '47'],
    ['蜂巢裤子', 'FWL240351', '淘宝', '否', '99', '', '26.87%', '47'],
    ['蜂巢上衣', 'FWL240451', '淘宝', '否', '118.8', '', '21.11%', '56'],
    ['棉莱卡内衣', 'HYXY70001', '淘宝', '否', '89.1', '', '10.44%', '46'],
    ['纯棉秋裤', 'HYX1813', '淘宝', '否', '0', '35.10;39.60;44.10;44.10', '6.85%', '17.00;18.50;20.00;21.50'],
    ['色纱加绒单裤', 'FWL240361', '淘宝', '否', '0', '69.30;79.20;89.10', '28.85%', '31.00;37.00;43.00'],
    ['莫代尔内裤', 'HYXN3081', '淘宝', '否', '79.8', '', '7.26%', '30.50;32.00'],
    ['网眼内裤3条', 'HYXN94341', '淘宝', '否', '69', '', '5.10%', '26.50;28.00;29.50'],
    ['网眼内裤4条', 'FWL2505541', '淘宝', '否', '79.8', '', '5.10%', '30.50;33.00'],
    ['胖童内裤', 'HYXN11221', '淘宝', '否', '59', '', '10.95%', '25.5'],
    ['纯棉内裤3条', 'HYX1801', '淘宝', '否', '0', '53.10;53.10;62.10', '5.03%', '27.50;29.00;30.50'],
    ['纯棉内裤4条常规', 'HYX2003', '淘宝', '否', '69.75', '', '3.99%', '36.50;39.50'],
    ['纯棉内裤4条小童', 'FWL2405141', '淘宝', '否', '69.75', '', '6.23%', '28.50;30.00'],
    ['纯棉内裤3条', 'FWL2505131', '淘宝', '否', '59', '', '4.82%', '23.40;25.00'],
    ['加绒套装', 'HYX1881', '淘宝', '否', '99', '', '12.87%', '58'],
    ['空气层加绒套装', 'FWL240161', '淘宝', '否', '0', '125.10;134.10;143.10', '14.87%', '59.00;64.00;69.00'],
    ['羊毛衫', 'JYMBQ2262A', '淘宝', '否', '0', '229.00;239.00;249.00;289.00;299.00;309.00;319.00;329.00', '25.00%', '147.00;157.00;157.00;167.00;167.00;177.00;182.00;192.00'],
    ['全棉针织衫', 'HG03HDCJB', '淘宝', '否', '0', '109.00;129.00', '23.84%', '62.00;72.00'],
    ['加绒单上衣', 'HYXC60001', '淘宝', '是', '79', '', '16.04%', '36'],
    ['绵绵绒套装', 'FWL240141', '淘宝', '否', '0', '59.80;69.80', '8.66%', '29.00;30.50'],
    ['空气层马甲（老）', 'HYXB8401', '淘宝', '否', '59.4', '', '15.58%', '25.5'],
    // 天猫平台产品
    ['色纱空气层单裤', 'FWL240331', '天猫', '是', '0', '59.80;65.80;69.80', '22.10%', '27.00;29.50;32.00'],
    ['暖阳绒', 'HYXY8101', '天猫', '是', '79.8', '', '10.24%', '38'],
    ['绵绵绒上衣', 'FWL240441', '天猫', '是', '49.8', '', '9.74%', '18.50;20.50'],
    ['色纱棉毛', 'HYXY50001', '天猫', '是', '89.1', '', '10.55%', '44'],
    ['色纱加绒', 'HYXY60001', '天猫', '是', '129', '', '11.17%', '62'],
    ['鸿运礼盒', 'HYX2889', '天猫', '是', '69.8', '', '5.92%', '33'],
    ['鸿运内裤', 'HYXN3061', '天猫', '是', '69.8', '', '7.16%', '29.50;31.00;33.50'],
    ['纯色棉毛', 'HYX19585', '天猫', '否', '0', '62.10;62.10;71.10', '8.23%', '33.50;38.50;42.00'],
    ['纯棉印花棉毛', 'HYX2021', '天猫', '是', '69.98', '', '8.87%', '35'],
    ['纯棉印花棉毛', 'HYX2221', '天猫', '否', '79.98', '', '7.21%', '43.5'],
    ['空气层套装', 'FWL240131', '天猫', '否', '0', '99.00;108.00;115.50', '13.29%', '50.00;52.50;56.00'],
    ['德绒背心', 'HYX2140', '天猫', '是', '79', '', '8.00%', '24.30;30.30;33.80'],
    ['德绒套装（不贴片）', 'HYX2101', '天猫', '否', '129', '', '10.71%', '64'],
    ['德绒套装（贴片）', 'HYX21011-1', '天猫', '否', '149', '', '9.09%', '67'],
    ['德绒运动套装', 'HYX2151', '天猫', '否', '139', '', '14.71%', '68.5'],
    ['大红棉毛', 'HYX17100', '天猫', '否', '0', '71.10;71.10;80.10', '8.17%', '37.50;40.50;44.00'],
    ['色纱空气层马甲', 'FWL240231', '天猫', '是', '59.4', '', '17.14%', '27'],
    ['蜂巢马甲', 'FWL240251', '天猫', '否', '99', '', '21.71%', '47'],
    ['蜂巢裤子', 'FWL240351', '天猫', '否', '99', '', '23.75%', '47'],
    ['蜂巢上衣', 'FWL240451', '天猫', '否', '118.8', '', '16.67%', '56'],
    ['棉莱卡内衣', 'HYXY70001', '天猫', '否', '89.1', '', '6.19%', '46'],
    ['纯棉秋裤', 'HYX1813', '天猫', '否', '0', '35.10;39.60;44.10;44.10', '6.83%', '17.00;18.50;20.00;21.50'],
    ['色纱加绒单裤', 'FWL240361', '天猫', '否', '0', '69.30;79.20;89.10', '25.09%', '31.00;37.00;43.00'],
    ['莫代尔内裤', 'HYXN3081', '天猫', '否', '79.8', '', '7.85%', '30.50;32.00'],
    ['网眼内裤3条', 'HYXN94341', '天猫', '否', '69', '', '5.47%', '26.50;28.00;29.50'],
    ['网眼内裤4条', 'FWL2505541', '天猫', '否', '79.8', '', '5.10%', '30.50;33.00'],
    ['胖童内裤', 'HYXN11221', '天猫', '否', '59', '', '8.41%', '25.5'],
    ['纯棉内裤3条', 'HYX1801', '天猫', '否', '0', '53.10;53.10;62.10', '3.81%', '27.50;29.00;30.50'],
    ['纯棉内裤4条常规', 'HYX2003', '天猫', '否', '69.75', '', '3.22%', '36.50;39.50'],
    ['纯棉内裤4条小童', 'FWL2405141', '天猫', '否', '69.75', '', '0.00%', '28.50;30.00'],
    ['纯棉内裤3条', 'FWL2505131', '天猫', '否', '59', '', '4.84%', '23.40;25.00'],
    ['加绒单上衣', 'HYXC60001', '天猫', '是', '79', '', '18.60%', '36'],
    ['绵绵绒套装', 'FWL240141', '天猫', '否', '0', '59.80;69.80', '3.45%', '29.00;30.50'],
    ['空气层马甲（老）', 'HYXB8401', '天猫', '否', '59.4', '', '17.12%', '25.5'],
    // 其他产品
    ['奥粒绒单裤', 'HYX240381', '淘宝', '否', '49.5', '', '19.49%', '21'],
    ['奥粒绒套装', 'HYX240181', '淘宝', '否', '89.1', '', '15.79%', '44'],
    ['大红背心', 'HYX18103', '天猫', '否', '35.9', '', '10.45%', '15'],
    ['大红背心', 'HYX18103', '淘宝', '否', '35.9', '', '9.19%', '15'],
    ['摇粒绒马甲拉链款', 'HYXM50001', '淘宝', '否', '78', '', '25.19%', '35'],
    ['火山石套装', 'HYX9101', '淘宝', '否', '98.1', '', '12.44%', '45'],
    ['德绒单裤', 'HYX21311', '天猫', '否', '79.8', '', '13.46%', '38'],
    ['德绒单裤', 'HYX21311', '淘宝', '否', '79.8', '', '22.86%', '38'],
    ['全棉短袖家居服', 'HYXJ5031', '淘宝', '否', '71.1', '', '4.65%', '32'],
    ['长袖家居服', 'HYXJ1111', '淘宝', '否', '134.1', '', '13.25%', '63.5'],
    ['全棉单上衣', 'HYX1811', '淘宝', '否', '0', '44.40;53.10;62.10;62.10', '11.94%', '19.00;20.50;22.00;23.50'],
    ['全棉单上衣', 'HYX1811', '天猫', '否', '0', '44.40;53.10;62.10;62.10', '5.17%', '19.00;20.50;22.00;23.50'],
    ['加绒单裤', 'HYX19527', '淘宝', '否', '71.1', '', '20.28%', '29.50;32.00;34.00;37.00'],
    ['暖阳绒单上衣', 'HYXC811', '淘宝', '否', '53.1', '', '11.64%', '23'],
    ['纯棉背心', 'HYX2117', '淘宝', '否', '29', '', '6.68%', '14.20;16.10;18.00;19.90'],
    ['纯棉背心', 'HYX2117', '天猫', '否', '29', '', '6.61%', '14.20;16.10;18.00;19.90'],
    ['网眼背心', 'HYXB7201', '淘宝', '否', '29.9', '', '8.11%', '14'],
    ['网眼背心', 'HYXB7201', '天猫', '否', '29.9', '', '7.48%', '14'],
    ['空气层加绒单裤', 'HYX21811', '淘宝', '否', '0', '71.10;76.50;80.10', '29.06%', '30.00;36.00;41.00'],
    ['空气层加绒单裤', 'HYX21811', '天猫', '否', '0', '71.10;76.50;80.10', '18.11%', '30.00;36.00;41.00'],
    ['空气层单裤', 'HYX20313', '淘宝', '否', '0', '53.10;58.80;62.10;62.10', '16.12%', '24.80;26.60;29.00;31.60'],
    ['空气层单裤', 'HYX20313', '天猫', '否', '0', '53.10;58.80;62.10;62.10', '13.62%', '24.80;26.60;29.00;31.60']
  ];
  
  return [headers, ...examples].map(row => row.join(',')).join('\n');
}
