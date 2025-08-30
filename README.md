# 电商保本计算器

一个专业的电商保本计算工具，帮助电商运营者计算保本广告占比、ROI和利润等关键指标。系统采用模块化架构，支持多种价格模式和复杂的税务计算。

## 🚀 项目特点

- **纯函数计算引擎**：核心计算逻辑完全独立，无DOM依赖，可复用
- **双口径计算**：支持有效营收口径和GMV口径，满足不同场景需求
- **多场景推演**：利润率推演、售价反推、成本价反推、税费推演等
- **专业税务处理**：考虑进项税、销项税、服务费税率等复杂税务场景
- **退货率处理**：支持进货可退/不可退两种模式，灵活应对不同业务场景
- **多价格模式**：支持单一价格、多档价格、单一售价+多档进货价等模式
- **批量商品分析**：支持Excel导入、批量计算、筛选排序等企业级功能
- **投放决策支持**：提供CVR-CPC边界分析、ROI安全边际等投放决策工具

## 📁 项目结构

```
breakeven/
├── engine.js              # 纯函数计算引擎（核心）
├── index.html             # 主界面（基础计算和推演）
├── product_analysis.html  # 商品分析页面（批量分析）
├── list_price.html        # 标价计算页面（到手价↔页面标价）
├── product_examples.js    # 示例商品数据和系统参数
└── README.md              # 项目说明文档
```

## 🏗️ 系统架构

### 核心计算引擎 (engine.js)

系统采用分层架构，`engine.js` 作为核心计算引擎，包含所有业务逻辑计算函数：

#### 基础计算函数
- `computeBase(params)` - 基础保本计算，计算保本广告费、ROI等核心指标
- `profitGivenAd(params, opts)` - 给定广告费计算利润和利润率
- `adRateToAmount(p, adRate, basis)` - 广告占比转换为金额
- `adAmountToRates(p, adCost)` - 广告金额转换为两口径占比

#### 反推计算函数
- `solveSellingPrice(p, r, a, basis, m)` - 反推售价（给定目标利润率）
- `solveCostPrice(p, r, a, basis, m)` - 反推进货价（给定目标利润率）
- `taxBurdenGiven(p, a, r, basis)` - 税费推演（不同广告占比下的税负）

#### 数值分析函数
- `valueAnalysis(p, basis, cvr, cpc, aov)` - CPC/CVR/客单价临界值分析
- `profitGivenAdRateAndR(p, adRate, r, basis)` - 利润率推演
- `safetyMarginAnalysis(currentCpc, currentCvr, breakevenAdCost)` - 安全边际分析

#### 投放决策工具
- `breakevenAdCostFromROI(price, returnRate, ROI_BE_effective)` - 从ROI反推保本广告费
- `cpcAtBreakeven(cvr, breakevenAdCost)` - 计算保本CPC临界值
- `cvrAtBreakeven(cpc, breakevenAdCost)` - 计算保本CVR临界值
- `cpcCvrCurve(breakevenAdCost, opts)` - 生成CVR-CPC边界曲线

#### 商品分析功能
- `analyzeProduct(product, systemParams)` - 分析单个商品
- `analyzeProducts(products, systemParams)` - 批量分析商品列表
- `parseProductFromRow(rowData)` - 从表格数据解析商品对象
- `validateProduct(product)` - 验证商品数据完整性
- `exportAnalysisToCSV(analysisResults)` - 导出分析结果到CSV

#### 工具函数
- `parseListPercents(text)` - 解析百分比列表字符串
- `parseListNumbers(text)` - 解析数字列表字符串
- `formatNumber(n, p)` - 数值格式化
- `formatPercent(n, p)` - 百分比格式化
- `getPlatformRate(platform)` - 获取平台佣金率
- `convertMarginPercent(mA_pct, a_pct, b_pct)` - 毛利率换算

### 数据结构定义

#### 输入参数接口 (Params)
```typescript
interface Params {
  sellingPrice: number;        // 售价（含税）
  returnRate: number;          // 退货率（小数 0~1）
  costPrice: number;           // 进货价（不含税）
  inputTaxRate: number;        // 开票成本比例（如 0.06）
  outputTaxRate: number;       // 商品进项税率（如 0.13）
  platformRate: number;        // 平台佣金率（如 0.055）
  shippingCost: number;        // 物流费
  shippingInsurance: number;   // 运费险
  otherCost: number;           // 其他成本
  salesTaxRate: number;        // 销项税率（如 0.13）
  serviceVATRate: number;      // 服务费税率（佣金/广告，通常 0.06）
  goodsMode: 'canReturn' | 'cannotReturn'; // 进货模式
}
```

#### 基础计算结果 (BaseResult)
```typescript
interface BaseResult {
  r: number;                    // 有效率 = 1 - returnRate
  Rev: number;                  // 有效含税营收 = 售价 * r
  goodsCost: number;            // 进货成本（按口径×r或×1）
  othersCost: number;           // 物流+运险+其他
  commission: number;           // 佣金（×r）
  VAT_out: number;              // 销项税
  VAT_in_goods: number;         // 进货进项
  VAT_in_comm: number;          // 佣金进项
  A: number;                    // 保本广告费计算基础值
  adCostBreakEven: number;      // 保本广告费 X = (1 + s) * A
  adRateBE_effective: number;   // 保本占比（有效营收口径）
  adRateBE_gmv: number;         // 保本占比（GMV口径）
  ROI_BE_effective: number;     // 保本ROI（有效营收口径）
  ROI_BE_gmv: number;          // 保本ROI（GMV口径）
  grossMarginRate: number;      // 毛利率（有效营收口径）
}
```

#### 商品数据结构 (Product)
```typescript
interface Product {
  name: string;                 // 商品名称
  sku: string;                  // 货号
  platform: string;             // 平台
  isMain: boolean;              // 是否主推款
  isNew: boolean;               // 是否新品
  singlePrice: number | null;   // 单一售价（含税）
  tierPrices: number[];         // 多档售价（含税）
  returnRate: number;           // 退货率（小数）
  singleCost: number | null;    // 单一进货价（不含税）
  tierCosts: number[];          // 多档进货价（不含税）
  platformRate?: number;        // 平台佣金率（可选）
}
```

## 🎯 功能模块

### 1. 主界面 (index.html)
- **基础计算**：输入商品参数，计算保本广告费、ROI、利润率等
- **利润率推演**：模拟不同广告占比和退货率下的利润率变化
- **售价反推**：根据目标利润率反推所需售价
- **成本价反推**：根据目标利润率反推可接受的进货价
- **税费推演**：分析不同广告占比下的实际税负占比
- **数值分析**：CPC/CVR/客单价临界值计算和投放建议
- **投放决策**：ROI安全边际分析、投放阈值计算

### 2. 商品分析页面 (product_analysis.html)
- **批量商品管理**：支持添加、编辑、删除商品
- **多价格模式**：单一价格、多档价格、单一售价+多档进货价
- **Excel导入导出**：支持CSV格式数据导入导出
- **智能筛选排序**：按平台、退货率、主推款、新品等条件筛选
- **分析结果展示**：毛利率、保本广告费、保本ROI等指标
- **投放决策条**：基于商品参数的投放决策支持
- **CVR-CPC可视化**：边界曲线图表展示

### 3. 标价计算页面 (list_price.html)
- **到手价反推**：输入目标到手价，计算所需页面标价
- **优惠设置**：支持立减百分比和满减档位设置
- **毛利率换算**：不同折扣方案下的毛利率对比分析
- **本地存储**：自动保存计算参数和结果

## 🔧 使用方法

### 基础计算示例

```javascript
import { computeBase, profitGivenAd } from './engine.js';

// 基础参数
const params = {
  sellingPrice: 79.8,        // 售价（含税）
  returnRate: 0.12,          // 退货率（小数）
  costPrice: 38,             // 进货价（不含税）
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

// 计算基础保本指标
const base = computeBase(params);
console.log('保本广告费:', base.adCostBreakEven);
console.log('保本ROI:', base.ROI_BE_effective);

// 计算给定广告费下的利润
const profitResult = profitGivenAd(params, { adCost: 20 });
console.log('利润:', profitResult.profit);
console.log('利润率:', profitResult.margin);
```

### 商品批量分析示例

```javascript
import { analyzeProducts, parseProductFromRow } from './engine.js';

// 从表格数据解析商品
const products = [
  parseProductFromRow({
    '商品名称': '示例商品',
    '货号': 'SKU001',
    '平台': '淘宝',
    '主推款': '是',
    '含税售价P': '79.8',
    '退货率': '12%',
    '单一进货价': '38'
  })
];

// 系统参数
const systemParams = {
  inputTaxRate: 0.06,
  outputTaxRate: 0.13,
  shippingCost: 2.8,
  shippingInsurance: 1.5,
  otherCost: 2.5,
  salesTaxRate: 0.13,
  serviceVATRate: 0.06,
  goodsMode: 'canReturn'
};

// 批量分析
const results = analyzeProducts(products, systemParams);
console.log('分析结果:', results);
```

### Metro页面数据合并功能

Metro页面现在支持自动合并示例数据和用户本地数据：

#### 数据合并逻辑
1. **优先级**：localStorage中的用户数据优先于示例数据
2. **去重规则**：基于货号(SKU) + 平台(Platform)组合进行去重
3. **支持场景**：同一货号可以在不同平台存在不同数据

#### 使用方法
1. **自动合并**：页面加载时自动从localStorage和示例数据合并商品列表
2. **手动刷新**：点击搜索框旁的🔄按钮，手动刷新商品数据
3. **实时同步**：在商品分析页面添加/修改商品后，可在metro页面刷新获取最新数据

#### 数据流程
```
商品分析页面 → 添加/修改商品 → 自动保存到localStorage
                                    ↓
Metro页面 ← 自动合并示例数据 + localStorage数据 ← 手动刷新
```

#### 示例场景
- 示例数据：货号`HYXY8101`在淘宝平台
- 用户在商品分析页面：修改了`HYXY8101`在淘宝平台的数据
- Metro页面：自动使用用户修改后的数据，替换示例数据
- 支持：同一货号`HYXY8101`在天猫平台保持示例数据不变

### 投放决策分析示例

```javascript
import { safetyMarginAnalysis, cpcAtBreakeven } from './engine.js';

// 安全边际分析
const safety = safetyMarginAnalysis(2.5, 0.02, 15.6);
console.log('投放安全性:', safety.isSafe ? '安全' : '危险');
console.log('CPC安全边际:', safety.marginPerClick);

// 计算保本CPC
const breakevenCpc = cpcAtBreakeven(0.02, 15.6);
console.log('保本CPC:', breakevenCpc);
```

## 📊 计算原理

### 利润恒等式
```
Profit = Rev - [goodsCost + othersCost + commission + adCost] 
         - (VAT_out - VAT_in_goods - VAT_in_comm - VAT_in_ad)

其中：
Rev = 售价 × (1 - 退货率)
goodsCost = 进货价 × (1 + 开票成本比例) × {可退: ×r；不可退: ×1}
othersCost = 物流费 + 运费险 + 其他成本（发货即发生）
commission = 售价 × 平台佣金率 × r
VAT_out = Rev ÷ (1 + 销项税率) × 销项税率
VAT_in_goods = 进货价 × 商品进项税率 × {可退: ×r；不可退: ×1}
VAT_in_comm = commission ÷ (1 + 服务费税率) × 服务费税率
VAT_in_ad = adCost ÷ (1 + 服务费税率) × 服务费税率
```

### 保本广告费求解
当 `Profit = 0` 时：
```
adCostBreakEven = (1 + serviceVATRate) × A

其中 A = Rev - (goodsCost + othersCost + commission) 
           - VAT_out + VAT_in_goods + VAT_in_comm
```

### 两套口径说明
- **有效营收口径**：分母 = 售价 × (1 - 退货率)，更贴近实际入账收入
- **GMV口径**：分母 = 售价（含税），与广告平台报表对齐

### 成本与费用的退货处理方式
| 类别 | 处理方式 | 说明 |
|------|----------|------|
| 进货成本 | 可退：×r<br>不可退：×1 | 退货时货值可退回，不需分摊；若不可退则摊到全部出货 |
| 快递/运费险/其他 | ×1（发货即发生） | 退货也不退回，需摊到所有出货 |
| 平台佣金 | ×r | 佣金仅对成交有效，退货可退 |
| 广告费 | ×1（出货即确认） | 退货不退广告，必须摊到所有出货 |

## 🎨 界面特性

### 响应式设计
- 支持桌面端和移动端
- 自适应布局，小屏幕自动隐藏次要列
- 触摸友好的交互设计

### 用户体验优化
- 实时计算，输入即更新结果
- 本地存储，自动保存用户输入
- 智能提示和错误处理
- 一键恢复默认值功能

### 数据可视化
- CVR-CPC边界曲线图表
- 多维度数据筛选和排序
- 高亮显示匹配的筛选结果

## 🔄 系统重构说明

本项目已完成重构，将原来的内联计算代码提取到独立的 `engine.js` 纯函数库中：

### 重构前的问题
- 计算逻辑与UI耦合严重
- 函数职责不清，难以维护
- 无法在其他环境中复用
- 难以进行单元测试
- 多个页面存在重复的计算函数

### 重构后的优势
- **关注点分离**：计算逻辑与UI完全分离
- **纯函数化**：所有计算函数都是纯函数，无副作用
- **可复用性**：计算引擎可以独立使用，多页面共享
- **可测试性**：便于编写单元测试
- **可维护性**：代码结构清晰，易于理解和修改
- **模块化**：支持按需导入，减少打包体积
- **口径统一**：确保所有页面使用相同的计算逻辑

### 最新重构成果（2024年）
新增了大量通用工具函数和高级计算函数到 `engine.js` 中：

#### 通用工具函数
- `clamp01(x)` - 数值夹到 [0,1] 区间
- `to01(input)` - 安全转换百分比格式到小数
- `num(input)` - 安全转换字符串到数值
- `cpcFromCpmCtr(cpm, ctr)` - CPM转CPC计算
- `calcEffectiveAOV(aov, bundleRate)` - 有效AOV计算

> ⚠️ **重要提醒**：`to01()` 和 `num()` 函数期望接收实际的输入值，不是DOM元素ID！
> 
> ```javascript
> // ❌ 错误用法：传入元素ID
> const cvr = to01('cvr');        // 会得到0
> const price = num('price');     // 会得到NaN
> 
> // ✅ 正确用法：传入实际值
> const cvrValue = document.getElementById('cvr').value;
> const cvr = to01(cvrValue);     // 输入"15" → 0.15
> 
> // 🎯 推荐：创建包装函数
> function pct(id) {
>   const element = document.getElementById(id);
>   return element ? to01(element.value) : 0;
> }
> const cvr = pct('cvr');         // 正确
> ```
> 
> **转换逻辑说明**：
> - `to01()`：所有输入都当作百分比处理（输入"1" → 0.01，输入"15" → 0.15）
> - `num()`：直接转换为数值（输入"79.8" → 79.8）

#### BE系列衍生函数
- `computeBeCPAFromROAS(beROAS, aovBasisValue)` - 从BE-ROAS计算BE-CPA
- `computeMaxCPC(beCPA, cvr)` - 计算最大可承受CPC
- `computeMaxCPM(maxCPC, ctr)` - 计算最大可承受CPM

#### 即时效果指标
- `roasFromCPA(params)` - 根据CPA计算ROAS
- `profitPerAdYuan(p, cpa)` - 投1元广告带来的净利润

#### 二分搜索类函数
- `allowedReturnRateForTargetMargin(p, opts)` - 计算可达退货率阈值
- `allowedAdRateForTargetMargin(p, opts)` - 计算允许的最大广告占比

#### 敏感度快照函数
- `snapshotAt(p, opts)` - 在给定参数下的指标快照
- `deltaForAdRateDown1pp(p, opts)` - 广告占比降低1pp的敏感度分析

这些函数现在可以在 `metro.html`、`index.html`、`single.html` 等多个页面中复用，确保计算逻辑的一致性和可维护性。

## 🚀 部署和使用

### 本地开发
```bash
# 克隆项目
git clone <repository-url>
cd breakeven

# 启动本地服务器（推荐使用Live Server等工具）
# 或直接在浏览器中打开HTML文件
```

### 生产部署
- 所有文件都是静态文件，可直接部署到任何Web服务器
- 支持CDN加速
- 无需后端服务，纯前端应用

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

### 开发规范
- 所有计算函数必须是纯函数
- 添加详细的中文注释
- 遵循现有的代码风格
- 新功能需要添加相应的测试用例

### 功能建议
- 毛利敏感度分析
- 多SKU对比功能
- 渠道费模拟
- 更多数据可视化图表

## 📄 许可证

本项目仅供学习和参考使用。使用仅作测算参考，实际以贵司财务/税务规则为准。

## ❗ 常见问题与解决方案

### 1. 比率转换错误（最常见问题）

**问题描述**：输入框显示"15%"，但计算结果中CVR显示"0.00%"

**错误原因**：
```javascript
// ❌ 错误：直接传递元素ID
const cvr = to01('cvr');        // 会得到0
```

**正确解决方案**：
```javascript
// ✅ 方案1：先获取值再转换
const cvrValue = document.getElementById('cvr').value;
const cvr = to01(cvrValue);     // 输入"15" → 0.15

// ✅ 方案2：创建包装函数（推荐）
function pct(id) {
  const element = document.getElementById(id);
  return element ? to01(element.value) : 0;
}
const cvr = pct('cvr');         // 正确
```

### 2. 转换逻辑理解错误

**问题**：期望输入"1"转换为1.0，实际转换为0.01

**说明**：这是正确的行为！
- `to01()`函数采用"所有输入都当作百分比"的逻辑
- 输入"1"表示1%，转换为0.01
- 输入"15"表示15%，转换为0.15
- 输入"0.5"表示0.5%，转换为0.005

### 3. 快速检查清单

开发新页面时，请检查：
- [ ] 是否创建了包装函数处理DOM操作？
- [ ] 是否传递的是元素值而不是元素ID？
- [ ] 是否理解了to01()的百分比转换逻辑？
- [ ] 是否测试了边界情况（如输入"1"转换为0.01）？

## 📞 技术支持

如有问题或建议，请通过以下方式联系：
- 提交GitHub Issue
- 查看代码注释和README文档
- 参考示例数据和计算逻辑

---

**注意**：本工具的计算结果仅供参考，实际经营决策请结合具体业务情况和专业财务建议。
