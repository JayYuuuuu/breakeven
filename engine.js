/**
 * 电商保本计算器 - 纯函数计算引擎
 * 包含所有核心计算逻辑，无DOM依赖，可复用
 */

// 类型定义（注释形式，便于理解）
/**
 * @typedef {'effective' | 'gmv'} Basis - 计算口径：有效营收或GMV
 * @typedef {'canReturn' | 'cannotReturn'} GoodsMode - 进货模式：可退或不可退
 */

/**
 * 输入参数接口
 * @typedef {Object} Params
 * @property {number} sellingPrice - 售价（含税）
 * @property {number} returnRate - 退货率（小数 0~1）
 * @property {number} costPrice - 进货价（不含税）
 * @property {number} inputTaxRate - 开票成本比例（如 0.06）
 * @property {number} outputTaxRate - 商品进项税率（如 0.13）
 * @property {number} platformRate - 平台佣金率（如 0.055）
 * @property {number} shippingCost - 物流费
 * @property {number} shippingInsurance - 运费险
 * @property {number} otherCost - 其他成本
 * @property {number} salesTaxRate - 销项税率（如 0.13）
 * @property {number} serviceVATRate - 服务费税率（佣金/广告，通常 0.06）
 * @property {string} goodsMode - 进货可退/不可退
 */

/**
 * 基础计算结果
 * @typedef {Object} BaseResult
 * @property {number} r - 有效率 = 1 - returnRate
 * @property {number} Rev - 有效含税营收 = 售价 * r
 * @property {number} goodsCost - 进货成本（按口径×r或×1）
 * @property {number} othersCost - 物流+运险+其他
 * @property {number} commission - 佣金（×r）
 * @property {number} VAT_out - 销项税
 * @property {number} VAT_in_goods - 进货进项
 * @property {number} VAT_in_comm - 佣金进项
 * @property {number} A - A = Rev - (goods+others+commission) - VAT_out + VAT_in_goods + VAT_in_comm
 * @property {number} adCostBreakEven - 保本广告费 X = (1 + s) * A
 * @property {number} adRateBE_effective - 保本占比（有效） = X / Rev
 * @property {number} adRateBE_gmv - 保本占比（GMV） = X / 售价
 * @property {number} ROI_BE_effective - 保本 ROI（有效） = 1 / 占比
 * @property {number} ROI_BE_gmv - 保本 ROI（GMV） = 1 / 占比
 * @property {number} grossMarginRate - 毛利率（有效营收口径） = 毛利润 / 有效营收
 */

/**
 * 利润计算结果
 * @typedef {Object} ProfitResult
 * @property {number} profit - 利润
 * @property {number} margin - 利润率
 * @property {number} adCostFinal - 最终广告费
 * @property {number} VAT_in_ad - 广告进项税
 */

/**
 * 基础计算：不含广告给定，仅产出 A/X/占比/ROI 等核心量
 * @param {Params} p - 输入参数
 * @returns {BaseResult} 基础计算结果
 */
export function computeBase(p) {
  const r = Math.max(0, 1 - p.returnRate);
  const Rev = p.sellingPrice * r;

  // 成本计算（采用"出货基准单"口径）
  const goodsCost = p.costPrice * (1 + p.inputTaxRate) * (p.goodsMode === 'canReturn' ? r : 1);
  const othersCost = p.shippingCost + p.shippingInsurance + p.otherCost;
  const commission = p.sellingPrice * p.platformRate * r;

  // 税额计算
  const VAT_out = Rev / (1 + p.salesTaxRate) * p.salesTaxRate;
  const VAT_in_goods = p.costPrice * p.outputTaxRate * (p.goodsMode === 'canReturn' ? r : 1);
  const VAT_in_comm = commission / (1 + p.serviceVATRate) * p.serviceVATRate;

  // 保本广告费计算
  const A = Rev - (goodsCost + othersCost + commission) - VAT_out + VAT_in_goods + VAT_in_comm;
  const adCostBreakEven = (1 + p.serviceVATRate) * A;

  // 保本占比计算
  const adRateBE_effective = Rev > 0 ? adCostBreakEven / Rev : NaN;
  const adRateBE_gmv = p.sellingPrice > 0 ? adCostBreakEven / p.sellingPrice : NaN;

  // 保本ROI计算
  const ROI_BE_effective = adRateBE_effective > 0 ? 1 / adRateBE_effective : NaN;
  const ROI_BE_gmv = adRateBE_gmv > 0 ? 1 / adRateBE_gmv : NaN;

  // 毛利率计算（有效营收口径下的毛利率）
  // 毛利润 = 有效营收 - 成本 - 佣金 - 净税负（广告费为0时的利润）
  // 这实际上等于 A，因为 A = Rev - (goodsCost + othersCost + commission) - VAT_out + VAT_in_goods + VAT_in_comm
  const grossProfit = A; // 毛利润就是A（保本广告费的基础值）
  const grossMarginRate = Rev > 0 ? grossProfit / Rev : NaN; // 毛利率 = 毛利润 / 有效营收

  return {
    r, Rev, goodsCost, othersCost, commission,
    VAT_out, VAT_in_goods, VAT_in_comm, A,
    adCostBreakEven, adRateBE_effective, adRateBE_gmv,
    ROI_BE_effective, ROI_BE_gmv, grossMarginRate
  };
}

/**
 * 把占比换成金额（按所选口径）
 * @param {Params} p - 输入参数
 * @param {number} adRate - 广告占比（小数）
 * @param {string} basis - 口径：'effective' 或 'gmv'
 * @returns {number} 广告金额
 */
export function adRateToAmount(p, adRate, basis) {
  const r = Math.max(0, 1 - p.returnRate);
  const base = basis === 'gmv' ? p.sellingPrice : (p.sellingPrice * r);
  return base * adRate;
}

/**
 * 反之：把广告金额换成两口径占比
 * @param {Params} p - 输入参数
 * @param {number} adCost - 广告金额
 * @returns {Object} 两口径占比
 */
export function adAmountToRates(p, adCost) {
  const r = Math.max(0, 1 - p.returnRate);
  const Rev = p.sellingPrice * r;
  return {
    effective: Rev > 0 ? adCost / Rev : NaN,
    gmv: p.sellingPrice > 0 ? adCost / p.sellingPrice : NaN
  };
}

/**
 * 给定广告（按金额、或按占比+口径），返回利润与利润率
 * @param {Params} p - 输入参数
 * @param {Object} opts - 选项：{ adCost?: number; adRate?: number; basis?: string }
 * @returns {ProfitResult} 利润计算结果
 */
export function profitGivenAd(p, opts) {
  let adCostFinal;
  const r = Math.max(0, 1 - p.returnRate);
  const Rev = p.sellingPrice * r;

  if (typeof opts.adCost === 'number') {
    adCostFinal = Math.max(0, opts.adCost);
  } else if (typeof opts.adRate === 'number' && opts.basis) {
    adCostFinal = adRateToAmount(p, opts.adRate, opts.basis);
  } else {
    throw new Error('profitGivenAd: 需要 adCost 或 (adRate + basis)');
  }

  const goodsCost = p.costPrice * (1 + p.inputTaxRate) * (p.goodsMode === 'canReturn' ? r : 1);
  const othersCost = p.shippingCost + p.shippingInsurance + p.otherCost;
  const commission = p.sellingPrice * p.platformRate * r;

  const VAT_out = Rev / (1 + p.salesTaxRate) * p.salesTaxRate;
  const VAT_in_goods = p.costPrice * p.outputTaxRate * (p.goodsMode === 'canReturn' ? r : 1);
  const VAT_in_comm = commission / (1 + p.serviceVATRate) * p.serviceVATRate;
  const VAT_in_ad = adCostFinal / (1 + p.serviceVATRate) * p.serviceVATRate;

  const profit = Rev
    - (goodsCost + othersCost + commission + adCostFinal)
    - (VAT_out - VAT_in_goods - VAT_in_comm - VAT_in_ad);

  const margin = Rev > 0 ? profit / Rev : NaN;

  return { profit, margin, adCostFinal, VAT_in_ad };
}

/**
 * 到手价推演：解在给定 a(占比)、m(利润率)、r 场景下的售价 S
 * @param {Params} p - 输入参数
 * @param {number} r - 有效率
 * @param {number} a - 广告占比
 * @param {string} basis - 口径
 * @param {number} m - 目标利润率
 * @returns {number} 所需售价
 */
export function solveSellingPrice(p, r, a, basis, m) {
  const G = p.costPrice * (1 + p.inputTaxRate) * (p.goodsMode === 'canReturn' ? r : 1);
  const O = p.shippingCost + p.shippingInsurance + p.otherCost;
  const Vg = p.costPrice * p.outputTaxRate * (p.goodsMode === 'canReturn' ? r : 1);
  const t = p.salesTaxRate;
  const s = p.serviceVATRate;
  const pr = p.platformRate;

  const numerator = (Vg - G - O);
  let denom;

  if (basis === 'effective') {
    // S = (Vg - G - O) / [ r * ( m - 1 + t/(1+t) + (a+pr)/(1+s) ) ]
    denom = r * (m - 1 + (t/(1+t)) + ((a + pr) / (1 + s)));
  } else {
    // S = (Vg - G - O) / [ r * ( m - 1 + t/(1+t) + pr/(1+s) ) + a/(1+s) ]
    denom = r * (m - 1 + (t/(1+t)) + (pr / (1 + s))) + (a / (1 + s));
  }
  
  if (!isFinite(numerator) || !isFinite(denom) || Math.abs(denom) < 1e-9) return NaN;
  const S = numerator / denom;
  return S > 0 && isFinite(S) ? S : NaN;
}

/**
 * 成本价推演：解在给定 a(占比)、m(利润率)、r 场景下的 costPrice
 * @param {Params} p - 输入参数
 * @param {number} r - 有效率
 * @param {number} a - 广告占比
 * @param {string} basis - 口径
 * @param {number} m - 目标利润率
 * @returns {number} 所需进货价
 */
export function solveCostPrice(p, r, a, basis, m) {
  const S = p.sellingPrice;
  const Rev = S * r;
  const pr = p.platformRate;
  const s = p.serviceVATRate;
  const t = p.salesTaxRate;

  const commission = S * pr * r;
  const VAT_out = Rev / (1 + t) * t;
  const VAT_in_comm = commission / (1 + s) * s;

  const base = (basis === 'gmv') ? S : Rev;
  const adCost = base * a;
  const VAT_in_ad = adCost / (1 + s) * s;

  const othersCost = p.shippingCost + p.shippingInsurance + p.otherCost;

  // 与 costPrice 相关的两项：goodsCost 与 VAT_in_goods
  const factorR = (p.goodsMode === 'canReturn') ? r : 1;
  const k = (1 + p.inputTaxRate) * factorR; // goodsCost = costPrice * k
  const g = (p.outputTaxRate) * factorR;    // VAT_in_goods = costPrice * g

  // Profit = Rev - others - commission - ad - VAT_out + VAT_in_comm + VAT_in_ad + costPrice*(g - k)
  // 目标：Profit = m * Rev  ⇒ costPrice = (m*Rev - B) / (g - k)
  const B = Rev - othersCost - commission - adCost - VAT_out + VAT_in_comm + VAT_in_ad;
  const denom = (g - k);
  if (Math.abs(denom) < 1e-12) return NaN;
  const cp = (m * Rev - B) / denom;
  return (cp > 0 && isFinite(cp)) ? cp : NaN;
}

/**
 * 税费推演：在不同广告占比 & 退货率下，实际税负占比（净税/售价）
 * @param {Params} p - 输入参数
 * @param {number} a - 广告占比
 * @param {number} r - 有效率
 * @param {string} basis - 口径
 * @returns {Object} 税负信息
 */
export function taxBurdenGiven(p, a, r, basis) {
  const Rev = p.sellingPrice * r;
  const commission = p.sellingPrice * p.platformRate * r;
  const VAT_out = Rev / (1 + p.salesTaxRate) * p.salesTaxRate;
  const VAT_in_goods = p.costPrice * p.outputTaxRate * (p.goodsMode === 'canReturn' ? r : 1);
  const VAT_in_comm = commission / (1 + p.serviceVATRate) * p.serviceVATRate;
  const base = (basis === 'gmv') ? p.sellingPrice : Rev;
  const adCost = base * a;
  const VAT_in_ad = adCost / (1 + p.serviceVATRate) * p.serviceVATRate;
  const netTax = VAT_out - VAT_in_goods - VAT_in_comm - VAT_in_ad;
  const shareGMV = p.sellingPrice > 0 ? (netTax / p.sellingPrice) : NaN;
  
  return { netTax, shareGMV };
}

/**
 * 根据两项求第三项临界值（CPC ↔ CVR ↔ 客单价）
 * @param {Params} p - 输入参数
 * @param {string} basis - ROI口径
 * @param {number} cvr - 转化率（小数）
 * @param {number} cpc - CPC
 * @param {number} aov - 客单价
 * @returns {Object} 临界值计算结果
 */
export function valueAnalysis(p, basis, cvr, cpc, aov) {
  // 获取保本ROI
  const base = computeBase(p);
  const ROIbe = basis === 'effective' ? base.ROI_BE_effective : base.ROI_BE_gmv;
  
  if (!isFinite(ROIbe) || ROIbe <= 0) {
    return { error: '无法计算保本ROI' };
  }

  const results = {};
  
  // CPC临界
  if (isFinite(cvr) && isFinite(aov)) {
    results.cpcCritical = (cvr * aov) / ROIbe;
    if (isFinite(cpc)) {
      results.cpcGap = cpc - results.cpcCritical;
    }
  }
  
  // CVR临界
  if (isFinite(cpc) && isFinite(aov) && aov > 0) {
    results.cvrCritical = (cpc * ROIbe) / aov;
    if (isFinite(cvr)) {
      results.cvrGap = (results.cvrCritical - cvr) * 100;
    }
  }
  
  // 客单价临界
  if (isFinite(cpc) && isFinite(cvr) && cvr > 0) {
    results.aovCritical = (cpc * ROIbe) / cvr;
    if (isFinite(aov)) {
      results.aovGap = results.aovCritical - aov;
    }
  }
  
  return { ROIbe, ...results };
}

/**
 * 利润率推演：在不同广告占比和退货率下的利润率
 * @param {Params} p - 输入参数
 * @param {number} adRate - 广告占比（小数）
 * @param {number} r - 有效率
 * @param {string} basis - 口径
 * @returns {Object} 利润率结果
 */
export function profitGivenAdRateAndR(p, adRate, r, basis) {
  const Rev = p.sellingPrice * r;
  const goodsCost = p.costPrice * (1 + p.inputTaxRate) * (p.goodsMode === 'canReturn' ? r : 1);
  const othersCost = p.shippingCost + p.shippingInsurance + p.otherCost;
  const commission = p.sellingPrice * p.platformRate * r;

  const VAT_out = Rev / (1 + p.salesTaxRate) * p.salesTaxRate;
  const VAT_in_goods = p.costPrice * p.outputTaxRate * (p.goodsMode === 'canReturn' ? r : 1);
  const VAT_in_comm = commission / (1 + p.serviceVATRate) * p.serviceVATRate;

  // 广告占比口径 → 金额
  const base = (basis === 'gmv') ? p.sellingPrice : Rev;
  const adCostGiven = base * adRate;
  const VAT_in_ad_given = adCostGiven / (1 + p.serviceVATRate) * p.serviceVATRate;

  const profit = Rev - (goodsCost + othersCost + commission + adCostGiven)
    - (VAT_out - VAT_in_goods - VAT_in_comm - VAT_in_ad_given);
  const margin = (Rev > 0) ? (profit / Rev) : NaN;
  
  return { profit, margin, adCostGiven };
}

/**
 * 工具函数：解析百分比列表字符串
 * @param {string} text - 百分比字符串，如 "5,8,10,12"
 * @returns {number[]} 百分比数组（小数形式）
 */
export function parseListPercents(text) {
  return String(text).split(/[,，\s]+/)
    .map(s => parseFloat(s))
    .filter(v => isFinite(v))
    .map(v => Math.max(-999, Math.min(999, v)));
}

/**
 * 工具函数：数值格式化
 * @param {number} n - 数值
 * @param {number} p - 小数位数
 * @returns {string} 格式化后的字符串
 */
export function formatNumber(n, p = 2) {
  return isFinite(n) ? n.toLocaleString('zh-CN', {
    minimumFractionDigits: p, 
    maximumFractionDigits: p
  }) : '—';
}

/**
 * 工具函数：百分比格式化
 * @param {number} n - 数值（小数）
 * @param {number} p - 小数位数
 * @returns {string} 百分比字符串
 */
export function formatPercent(n, p = 2) {
  return isFinite(n) ? (n * 100).toLocaleString('zh-CN', {
    minimumFractionDigits: p, 
    maximumFractionDigits: p
  }) + '%' : '—';
}

/**
 * 商品分析相关函数
 */

/**
 * 商品数据结构
 * @typedef {Object} Product
 * @property {string} name - 商品名称
 * @property {string} sku - 货号
 * @property {string} platform - 平台
 * @property {boolean} isMain - 是否主推款
 * @property {number} singlePrice - 单一售价（含税）
 * @property {number[]} tierPrices - 多档售价（含税）
 * @property {number} returnRate - 退货率（小数）
 * @property {number} singleCost - 单一进货价（不含税）
 * @property {number[]} tierCosts - 多档进货价（不含税）
 */

/**
 * 商品分析结果
 * @typedef {Object} ProductAnalysisResult
 * @property {string} name - 商品名称
 * @property {string} sku - 货号
 * @property {string} platform - 平台
 * @property {boolean} isMain - 是否主推款
 * @property {number} singlePrice - 单一售价
 * @property {number[]} tierPrices - 多档售价
 * @property {number} returnRate - 退货率
 * @property {number} singleCost - 单一进货价
 * @property {number[]} tierCosts - 多档进货价
 * @property {Object} singleAnalysis - 单一价格分析结果
 * @property {Object[]} tierAnalysis - 多档价格分析结果
 */

/**
 * 单档分析结果
 * @typedef {Object} TierAnalysisResult
 * @property {number} price - 售价
 * @property {number} cost - 进货价
 * @property {number} adCostBreakEven - 保本广告费
 * @property {number} adRateBE_effective - 保本广告占比（有效营收口径）
 * @property {number} adRateBE_gmv - 保本广告占比（GMV口径）
 * @property {number} ROI_BE_effective - 保本ROI（有效营收口径）
 * @property {number} ROI_BE_gmv - 保本ROI（GMV口径）
 * @property {number} grossMarginRate - 毛利率（有效营收口径）
 */

/**
 * 分析单个商品
 * @param {Product} product - 商品数据
 * @param {Object} systemParams - 系统参数
 * @returns {ProductAnalysisResult} 分析结果
 */
export function analyzeProduct(product, systemParams) {
  const result = {
    name: product.name,
    sku: product.sku,
    platform: product.platform,
    isMain: product.isMain,
    singlePrice: product.singlePrice,
    tierPrices: product.tierPrices || [],
    returnRate: product.returnRate,
    singleCost: product.singleCost,
    tierCosts: product.tierCosts || [],
    singleAnalysis: null,
    tierAnalysis: []
  };
  
  // 分析单一价格情况
  if (product.singlePrice && product.singleCost) {
    const params = {
      sellingPrice: product.singlePrice,
      returnRate: product.returnRate,
      costPrice: product.singleCost,
      platformRate: product.platformRate !== undefined ? product.platformRate : 0.05, // 修复：正确处理0值
      ...systemParams
    };
    
    const baseResult = computeBase(params);
    result.singleAnalysis = {
      price: product.singlePrice,
      cost: product.singleCost,
      adCostBreakEven: baseResult.adCostBreakEven,
      adRateBE_effective: baseResult.adRateBE_effective,
      adRateBE_gmv: baseResult.adRateBE_gmv,
      ROI_BE_effective: baseResult.ROI_BE_effective,
      ROI_BE_gmv: baseResult.ROI_BE_gmv,
      grossMarginRate: baseResult.grossMarginRate
    };
  }
  
  // 分析单一售价+多档进货价情况（新支持模式）
  if (product.singlePrice && product.tierCosts && product.tierCosts.length > 0) {
    console.log(`商品 ${product.name} (${product.sku}) 使用单一售价+多档进货价模式`);
    console.log(`单一售价: ${product.singlePrice}, 多档进货价: [${product.tierCosts.join(', ')}]`);
    
    // 用单一售价对应每一档进货价分别计算
    for (let i = 0; i < product.tierCosts.length; i++) {
      const params = {
        sellingPrice: product.singlePrice,
        returnRate: product.returnRate,
        costPrice: product.tierCosts[i],
        platformRate: product.platformRate !== undefined ? product.platformRate : 0.05,
        ...systemParams
      };
      
      console.log(`计算第${i + 1}档: 售价${product.singlePrice}元, 进货价${product.tierCosts[i]}元`);
      
      const baseResult = computeBase(params);
      result.tierAnalysis.push({
        price: product.singlePrice, // 使用相同的单一售价
        cost: product.tierCosts[i], // 使用不同的进货价
        adCostBreakEven: baseResult.adCostBreakEven,
        adRateBE_effective: baseResult.adRateBE_effective,
        adRateBE_gmv: baseResult.adRateBE_gmv,
        ROI_BE_effective: baseResult.ROI_BE_effective,
        ROI_BE_gmv: baseResult.ROI_BE_gmv,
        grossMarginRate: baseResult.grossMarginRate
      });
      
      console.log(`第${i + 1}档计算结果: ROI=${baseResult.ROI_BE_effective.toFixed(2)}, 广告占比=${(baseResult.adRateBE_effective * 100).toFixed(2)}%`);
    }
    
    console.log(`单一售价+多档进货价模式计算完成，共${product.tierCosts.length}档`);
  }
  
  // 分析多档价格情况
  if (product.tierPrices && product.tierPrices.length > 0 &&
      product.tierCosts && product.tierCosts.length > 0) {
    
    // 确保档位数量一致
    const minTiers = Math.min(product.tierPrices.length, product.tierCosts.length);
    
    for (let i = 0; i < minTiers; i++) {
      const params = {
        sellingPrice: product.tierPrices[i],
        returnRate: product.returnRate,
        costPrice: product.tierCosts[i],
        platformRate: product.platformRate !== undefined ? product.platformRate : 0.05, // 修复：正确处理0值
        ...systemParams
      };
      
      const baseResult = computeBase(params);
      result.tierAnalysis.push({
        price: product.tierPrices[i],
        cost: product.tierCosts[i],
        adCostBreakEven: baseResult.adCostBreakEven,
        adRateBE_effective: baseResult.adRateBE_effective,
        adRateBE_gmv: baseResult.adRateBE_gmv,
        ROI_BE_effective: baseResult.ROI_BE_effective,
        ROI_BE_gmv: baseResult.ROI_BE_gmv,
        grossMarginRate: baseResult.grossMarginRate
      });
    }
  }
  
  return result;
}

/**
 * 分析商品列表
 * @param {Product[]} products - 商品列表
 * @param {Object} systemParams - 系统参数
 * @returns {ProductAnalysisResult[]} 分析结果列表
 */
export function analyzeProducts(products, systemParams) {
  return products.map(product => analyzeProduct(product, systemParams));
}

/**
 * 解析商品数据（从表格数据）
 * @param {Object} rowData - 表格行数据
 * @returns {Product} 商品对象
 */
export function parseProductFromRow(rowData) {
  const product = {
    name: rowData['商品名称'] || '',
    sku: rowData['货号'] || '',
    platform: rowData['平台'] || '',
    isMain: rowData['主推款'] === '是',
    isNew: rowData['新品'] === '是', // 解析新品状态
    singlePrice: null,
    tierPrices: [],
    returnRate: 0,
    singleCost: null,
    tierCosts: []
  };

  // 解析单一售价
  if (rowData['含税售价P'] && !isNaN(parseFloat(rowData['含税售价P']))) {
    product.singlePrice = parseFloat(rowData['含税售价P']);
  }

  // 解析多档售价
  if (rowData['含税售价（多档）']) {
    const prices = parseListNumbers(rowData['含税售价（多档）']);
    if (prices.length > 0) {
      product.tierPrices = prices;
    }
  }

  // 解析退货率（支持百分比格式，如 "15%" 或 "15" 或 "0.15"）
  const returnRateRaw = rowData['退货率'];
  
  if (returnRateRaw !== undefined && returnRateRaw !== null) {
    let returnRateStr = returnRateRaw.toString().trim();
    
    if (returnRateStr === '' || returnRateStr === 'undefined' || returnRateStr === 'null') {
      // 空值或无效值
      product.returnRate = 0;
    } else if (returnRateStr.endsWith('%')) {
      // 百分比格式：去掉%符号，直接除以100
      const percentValue = parseFloat(returnRateStr.replace('%', ''));
      if (isFinite(percentValue)) {
        product.returnRate = percentValue / 100;
      } else {
        product.returnRate = 0;
      }
    } else {
      // 数字格式：判断是百分比数值还是小数
      const numValue = parseFloat(returnRateStr);
      if (isFinite(numValue)) {
        if (numValue > 1) {
          // 大于1认为是百分比数值（如15表示15%）
          product.returnRate = numValue / 100;
        } else {
          // 小于等于1认为是小数（如0.15表示15%）
          product.returnRate = numValue;
        }
      } else {
        product.returnRate = 0;
      }
    }
  } else {
    // 如果退货率字段完全为空或不存在，设置默认值为0
    product.returnRate = 0;
  }

  // 解析单一进货价
  if (rowData['单一进货价'] && !isNaN(parseFloat(rowData['单一进货价']))) {
    product.singleCost = parseFloat(rowData['单一进货价']);
  }

  // 解析多档进货价
  if (rowData['进货价（多档）']) {
    const costs = parseListNumbers(rowData['进货价（多档）']);
    if (costs.length > 0) {
      product.tierCosts = costs;
    }
  }

  return product;
}

/**
 * 解析数字列表字符串
 * @param {string} text - 数字字符串，如 "25,26,27"
 * @returns {number[]} 数字数组
 */
export function parseListNumbers(text) {
  return String(text).split(/[,，\s]+/)
    .map(s => parseFloat(s.trim()))
    .filter(v => isFinite(v) && v > 0);
}

/**
 * 验证商品数据完整性
 * @param {Product} product - 商品数据
 * @returns {Object} 验证结果 {isValid: boolean, errors: string[]}
 */
export function validateProduct(product) {
  const errors = [];

  // 必填字段检查
  if (!product.name.trim()) errors.push('商品名称不能为空');
  if (!product.sku.trim()) errors.push('货号不能为空');
  if (!product.platform.trim()) errors.push('平台不能为空');

  // 价格模式检查
  const hasSinglePrice = product.singlePrice && product.singlePrice > 0;
  const hasTierPrices = product.tierPrices && product.tierPrices.length > 0;
  const hasSingleCost = product.singleCost && product.singleCost > 0;
  const hasTierCosts = product.tierCosts && product.tierCosts.length > 0;

  if (!hasSinglePrice && !hasTierPrices) {
    errors.push('必须设置单一售价或多档售价');
  }

  if (hasSinglePrice && hasTierPrices) {
    errors.push('不能同时启用单一售价和多档售价');
  }

  if (hasSinglePrice && !hasSingleCost && !hasTierCosts) {
    errors.push('启用单一售价时必须设置单一进货价或多档进货价');
  }

  if (hasTierPrices && !hasTierCosts) {
    errors.push('启用多档售价时必须设置多档进货价');
  }

  if (hasTierPrices && hasTierCosts) {
    if (product.tierPrices.length !== product.tierCosts.length) {
      errors.push('多档售价和多档进货价的档位数量必须一致');
    }
  }

  // 退货率检查
  if (typeof product.returnRate !== 'number' || product.returnRate < 0 || product.returnRate > 1) {
    errors.push('退货率必须在0-100%之间');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * 生成CSV模板
 * @returns {string} CSV模板内容
 */
export function generateCSVTemplate() {
  const headers = ['商品名称', '货号', '平台', '主推款', '新品', '含税售价P', '含税售价（多档）', '单一进货价', '进货价（多档）', '退货率'];
  const example = ['示例商品', 'SKU001', '淘宝', '是', '是', '79.8', '', '38.5', '25,26,27', '12'];
  
  return [headers.join(','), example.join(',')].join('\n');
}

/**
 * 解析CSV数据
 * @param {string} csvText - CSV文本内容
 * @returns {Object[]} 解析后的数据数组
 */
export function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  // 解析CSV行，正确处理包含逗号的引号字段
  function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  }

  const headers = parseCSVLine(lines[0]);
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length !== headers.length) continue;

    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    data.push(row);
  }

  return data;
}

/**
 * 导出CSV数据
 * @param {ProductAnalysisResult[]} analysisResults - 分析结果
 * @returns {string} CSV内容
 */
export function exportAnalysisToCSV(analysisResults) {
  const headers = [
    '商品名称', '货号', '平台', '主推款', '新品', '售价模式', '售价', '进货价', 
    '退货率', '毛利率', '保本广告费', '保本广告占比(有效)', '保本广告占比(GMV)', 
    '保本ROI(有效)', '保本ROI(GMV)'
  ];

  const rows = [headers];

  analysisResults.forEach(result => {
    // 单一价格行
    if (result.singleAnalysis) {
              rows.push([
          result.name,
          result.sku,
          result.platform,
          result.isMain ? '是' : '否',
          result.isNew ? '是' : '否', // 导出新品状态
          '单一价格',
          result.singlePrice,
          result.singleCost,
          (result.returnRate * 100).toFixed(2) + '%',
          (result.singleAnalysis.grossMarginRate * 100).toFixed(2) + '%',
          result.singleAnalysis.adCostBreakEven.toFixed(2),
          (result.singleAnalysis.adRateBE_effective * 100).toFixed(2) + '%',
          (result.singleAnalysis.adRateBE_gmv * 100).toFixed(2) + '%',
          result.singleAnalysis.ROI_BE_effective.toFixed(2),
          result.singleAnalysis.ROI_BE_gmv.toFixed(2)
        ]);
    }

    // 多档价格行
    result.tierAnalysis.forEach((tier, index) => {
      rows.push([
        result.name,
        result.sku,
        result.platform,
        result.isMain ? '是' : '否',
        result.isNew ? '是' : '否', // 导出新品状态
        `多档价格${index + 1}`,
        tier.price,
        tier.cost,
        (result.returnRate * 100).toFixed(2) + '%',
        (tier.grossMarginRate * 100).toFixed(2) + '%',
        tier.adCostBreakEven.toFixed(2),
        (tier.adRateBE_effective * 100).toFixed(2) + '%',
        (tier.adRateBE_gmv * 100).toFixed(2) + '%',
        tier.ROI_BE_effective.toFixed(2),
        tier.ROI_BE_gmv.toFixed(2)
      ]);
    });
  });

  return rows.map(row => row.join(',')).join('\n');
}

/**
 * 获取平台佣金率
 * @param {string} platform - 平台名称
 * @returns {number} 佣金率（小数，如 0.055 表示 5.5%）
 */
export function getPlatformRate(platform) {
  const platformRates = {
    '淘宝': 0,      // 淘宝佣金0%
    '天猫': 0.055,  // 天猫佣金5.5%
    '抖音': 0.05,   // 抖音佣金5%
    '京东': 0.05,   // 京东佣金5%（默认）
    '拼多多': 0.05, // 拼多多佣金5%（默认）
    '小红书': 0.05  // 小红书佣金5%（默认）
  };
  
  return platformRates[platform] !== undefined ? platformRates[platform] : 0.05;
}

/** ===== CVR–CPC 保本边界分析工具 (基于有效营收口径) =====
 * 术语说明：
 *  - breakevenAdCost: 保本广告费（元/单），当 profit = 0 时允许的最大每单广告支出
 *  - ROI_BE_effective: 保本ROI（有效营收口径），ROI = 有效营收 / 广告费
 *  - price P: 含税售价
 *  - returnRate r: 退货率（0–1），有效营收 = P × (1 - r)
 *  - cvr: 转化率（0–1）
 *  - cpc: 点击单价（元/点击）
 *
 * CPC 计费下的保本恒等式：
 *   每单广告费 = CPC / CVR  ≤  breakevenAdCost
 *   => CPC ≤ breakevenAdCost × CVR
 *   => CVR ≥ CPC / breakevenAdCost
 */

/** 百分比友好转换：0.12 或 12 输入都转成 0.12 */
export function _toDecimalMaybe(x){
  if (!Number.isFinite(x)) return 0;
  return x > 1 ? x / 100 : x;
}

/** 
 * 已知 ROI_BE(有效) + 售价 + 退货率 => 推出保本广告费（元/单）
 * @param {number} price - 含税售价
 * @param {number} returnRate - 退货率（小数0-1）
 * @param {number} ROI_BE_effective - 保本ROI（有效营收口径）
 * @returns {number} 保本广告费（元/单）
 */
export function breakevenAdCostFromROI(price, returnRate, ROI_BE_effective){
  const P = Number(price) || 0;
  const r = _toDecimalMaybe(Number(returnRate) || 0);
  const roi = Number(ROI_BE_effective) || 0;
  if (P <= 0 || roi <= 0) return 0;
  const effectiveRevenue = P * (1 - r);
  return effectiveRevenue / roi;
}

/** 
 * 给定 CVR 与保本广告费 => 保本 CPC 临界值（元/点击）
 * @param {number} cvr - 转化率（小数0-1）
 * @param {number} breakevenAdCost - 保本广告费（元/单）
 * @returns {number} 保本CPC临界值（元/点击）
 */
export function cpcAtBreakeven(cvr, breakevenAdCost){
  const v = _toDecimalMaybe(Number(cvr) || 0);
  const A = Number(breakevenAdCost) || 0;
  if (v <= 0 || A <= 0) return 0;
  return A * v;
}

/** 
 * 给定 CPC 与保本广告费 => 保本所需最低 CVR（小数 0–1）
 * @param {number} cpc - 点击单价（元/点击）
 * @param {number} breakevenAdCost - 保本广告费（元/单）
 * @returns {number} 保本所需最低CVR（小数0-1）
 */
export function cvrAtBreakeven(cpc, breakevenAdCost){
  const C = Number(cpc) || 0;
  const A = Number(breakevenAdCost) || 0;
  if (C <= 0 || A <= 0) return 0;
  return C / A;
}

/** 
 * 生成绘图数据：CPC = A × CVR 的边界曲线点
 * @param {number} breakevenAdCost - 保本广告费（元/单）
 * @param {Object} opts - 选项 {cvrMin, cvrMax, steps}
 * @returns {Array} 边界曲线点数组 [{cvr, cpc}, ...]
 */
export function cpcCvrCurve(breakevenAdCost, opts = {}){
  const A = Number(breakevenAdCost) || 0;
  const { cvrMin = 0.005, cvrMax = 0.20, steps = 20 } = opts;
  const lo = _toDecimalMaybe(cvrMin);
  const hi = _toDecimalMaybe(cvrMax);
  const n = Math.max(2, Math.floor(steps));
  if (A <= 0 || !(hi > lo)) return [];
  const out = [];
  for (let i = 0; i < n; i++){
    const t = i / (n - 1);
    const cvr = lo + (hi - lo) * t;
    out.push({ cvr, cpc: A * cvr });
  }
  return out;
}

/**
 * CVR-CPC安全边际分析
 * @param {number} currentCpc - 当前CPC（元/点击）
 * @param {number} currentCvr - 当前CVR（小数0-1）
 * @param {number} breakevenAdCost - 保本广告费（元/单）
 * @returns {Object} 安全边际分析结果
 */
export function safetyMarginAnalysis(currentCpc, currentCvr, breakevenAdCost) {
  const cpc = Number(currentCpc) || 0;
  const cvr = _toDecimalMaybe(Number(currentCvr) || 0);
  const A = Number(breakevenAdCost) || 0; // BE-CPA（元/单）
  
  if (cpc <= 0 || cvr <= 0 || A <= 0) {
    return { 
      error: '参数无效',
      isSafe: false,
      // 旧字段（兼容）
      margin: 0,
      marginPercent: 0,
      currentAdCostPerOrder: 0,
      maxAdCostPerOrder: A,
      breakevenCpc: 0,
      breakevenCvr: 0,
      status: 'danger',
      // 新字段（推荐）
      marginPerOrder: 0,  // = BE-CPA - CPA（元/单）
      marginPerClick: 0,  // = MaxCPC - CPC（元/点击）
      cpaDelta: 0,
      cpcDelta: 0
    };
  }
  
  const currentAdCostPerOrder = cpc / cvr;  // 实际CPA（元/单）
  const maxAdCostPerOrder = A;              // BE-CPA（元/单）
  const breakevenCpc = A * cvr;             // MaxCPC（元/点击）
  const breakevenCvr = cpc / A;             // CVR临界（小数）

  // 两种口径的边际
  const marginPerOrder = maxAdCostPerOrder - currentAdCostPerOrder; // 元/单
  const marginPerClick = breakevenCpc - cpc;                         // 元/点击

  // 旧字段保持"元/单"语义，避免破坏现有调用
  const margin = marginPerOrder;
  const marginPercent = maxAdCostPerOrder > 0 ? (marginPerOrder / maxAdCostPerOrder) : 0;
  
  return {
    isSafe: currentAdCostPerOrder <= maxAdCostPerOrder,
    // 旧字段（兼容）
    margin, // 安全边际（元/单）
    marginPercent, // 安全边际百分比
    currentAdCostPerOrder, // 当前每单广告费
    maxAdCostPerOrder, // 最大允许每单广告费
    breakevenCpc, // 保本CPC临界值
    breakevenCvr, // 保本CVR临界值
    status: (currentAdCostPerOrder <= maxAdCostPerOrder) ? 'safe' : 'danger', // 状态：安全或危险
    // 新字段（推荐 UI 使用）
    marginPerOrder,  // 与保本CPA的差（元/单）
    marginPerClick,  // CVR-CPC安全边际（元/点击）
    cpaDelta: marginPerOrder,
    cpcDelta: marginPerClick
  };
}

/**
 * 毛利率换算
 * 已知：在立减 a% 的成交价下，毛利率为 mA%（以成交价为分母）
 * 求：在立减 b% 的成交价下的毛利率 mB%
 * 公式：mB = ( mA*(1-a) + (a-b) ) / (1-b)
 *
 * @param {number} mA_pct - 基准毛利率百分数（例如 30 表示 30%）
 * @param {number} a_pct  - 基准立减百分数（例如 10 表示 立减10%）
 * @param {number} b_pct  - 目标立减百分数（例如 15 表示 立减15%）
 * @returns {number} - 目标毛利率百分数
 */
export function convertMarginPercent(mA_pct, a_pct, b_pct){
  const clamp01 = (x)=> Math.min(100, Math.max(-100, parseFloat(x)||0));
  const a = Math.min(100, Math.max(0, parseFloat(a_pct)||0)) / 100;
  const b = Math.min(100, Math.max(0, parseFloat(b_pct)||0)) / 100;
  const mA = clamp01(mA_pct) / 100;

  if (b >= 1) return NaN; // 立减100%无意义

  const num = mA * (1 - a) + (a - b);
  const den = (1 - b);

  return (num / den) * 100; // 返回百分数
}

/** ===== 投放决策相关工具函数 ===== */

/**
 * CPM转CPC计算
 * @param {number} cpm - 千次展示成本（元/千次）
 * @param {number} ctr - 点击率（小数0-1）
 * @returns {number} CPC（元/点击）
 */
export function cpmToCpc(cpm, ctr) {
  const cpmVal = Number(cpm) || 0;
  const ctrVal = Number(ctr) || 0;
  return ctrVal > 0 ? cpmVal / (ctrVal * 1000) : 0;
}

/**
 * 计算有效AOV（考虑连带购买率）
 * @param {number} aov - 基础客单价
 * @param {number} bundleRate - 连带购买率（小数0-1）
 * @returns {number} 有效客单价
 */
export function calculateEffectiveAOV(aov, bundleRate) {
  const aovVal = Number(aov) || 0;
  const bundleVal = Number(bundleRate) || 0;
  return aovVal * (1 + bundleVal);
}

/**
 * 计算ROAS（广告投入产出比）
 * @param {number} cvr - 转化率（小数0-1）
 * @param {number} aov - 客单价
 * @param {number} cpc - 点击成本（元/点击）
 * @returns {number} ROAS值
 */
export function calculateROAS(cvr, aov, cpc) {
  const cvrVal = Number(cvr) || 0;
  const aovVal = Number(aov) || 0;
  const cpcVal = Number(cpc) || 0;
  return cpcVal > 0 ? (cvrVal * aovVal) / cpcVal : 0;
}

/**
 * 获取安全性状态
 * @param {number} margin - 安全边际值
 * @returns {string} 安全状态：'安全' 或 '危险'
 */
export function getSafetyStatus(margin) {
  return Number(margin) >= 0 ? '安全' : '危险';
}

/**
 * 计算CPC安全边际
 * @param {number} maxCPC - 最大允许CPC
 * @param {number} currentCPC - 当前CPC
 * @returns {number} 安全边际值（正数表示安全，负数表示超支）
 */
export function calculateCPCSafetyMargin(maxCPC, currentCPC) {
  const max = Number(maxCPC) || 0;
  const current = Number(currentCPC) || 0;
  return max - current;
}

/**
 * 计算CVR临界值（保本所需最低转化率）
 * @param {number} cpc - 当前CPC
 * @param {number} breakevenCPA - 保本每单广告费
 * @returns {number} 保本所需最低CVR（小数0-1）
 */
export function calculateCriticalCVR(cpc, breakevenCPA) {
  const cpcVal = Number(cpc) || 0;
  const beCPA = Number(breakevenCPA) || 0;
  return beCPA > 0 ? cpcVal / beCPA : 0;
}

/**
 * 计算客单价临界值（保本所需最低客单价）
 * @param {number} cpc - 当前CPC
 * @param {number} cvr - 当前转化率（小数0-1）
 * @param {number} breakevenROI - 保本ROI
 * @returns {number} 保本所需最低客单价
 */
export function calculateCriticalAOV(cpc, cvr, breakevenROI) {
  const cpcVal = Number(cpc) || 0;
  const cvrVal = Number(cvr) || 0;
  const beROI = Number(breakevenROI) || 0;
  return cpcVal > 0 && cvrVal > 0 ? (cpcVal * beROI) / cvrVal : 0;
}

/**
 * 生成投放建议
 * @param {number} actualROAS - 实际ROAS
 * @param {number} breakevenROAS - 保本ROAS
 * @returns {string} 投放建议
 */
export function generateInvestmentAdvice(actualROAS, breakevenROAS) {
  const actual = Number(actualROAS) || 0;
  const breakeven = Number(breakevenROAS) || 0;
  
  if (!isFinite(actual) || !isFinite(breakeven)) {
    return '请输入完整参数';
  }
  
  if (actual >= breakeven) {
    return `✅ 安全：实际ROAS(${actual.toFixed(2)}) ≥ 保本ROAS(${breakeven.toFixed(2)})`;
  } else {
    return `⚠️ 风险：实际ROAS(${actual.toFixed(2)}) < 保本ROAS(${breakeven.toFixed(2)})`;
  }
}
