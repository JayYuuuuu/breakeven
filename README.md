# 电商保本计算器

一个专业的电商保本计算工具，帮助电商运营者计算保本广告占比、ROI和利润等关键指标。

## 🚀 项目特点

- **纯函数计算引擎**：核心计算逻辑完全独立，无DOM依赖
- **双口径计算**：支持有效营收口径和GMV口径
- **多场景推演**：利润率推演、售价反推、成本价反推等
- **专业税务处理**：考虑进项税、销项税、服务费税率等
- **退货率处理**：支持进货可退/不可退两种模式

## 📁 项目结构

```
breakeven/
├── engine.js          # 纯函数计算引擎（核心）
├── index.html         # 主界面（UI层）
├── test.html          # 测试页面
├── .gitignore         # Git忽略文件
└── README.md          # 项目说明
```

## 🔧 核心计算引擎 (engine.js)

### 主要函数

- `computeBase(params)` - 基础保本计算
- `profitGivenAd(params, opts)` - 给定广告费计算利润
- `solveSellingPrice(params, r, a, basis, m)` - 反推售价
- `solveCostPrice(params, r, a, basis, m)` - 反推进货价
- `taxBurdenGiven(params, a, r, basis)` - 税费推演
- `valueAnalysis(params, basis, cvr, cpc, aov)` - 数值分析

### 数据结构

```javascript
// 输入参数
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
```

## 🎯 使用方法

### 1. 基础计算

```javascript
import { computeBase } from './engine.js';

const params = { /* 你的参数 */ };
const result = computeBase(params);

console.log('保本广告费:', result.adCostBreakEven);
console.log('保本ROI:', result.ROI_BE_effective);
```

### 2. 利润计算

```javascript
import { profitGivenAd } from './engine.js';

// 按广告金额计算
const profit = profitGivenAd(params, { adCost: 20 });

// 按广告占比计算
const profit2 = profitGivenAd(params, { 
  adRate: 0.25, 
  basis: 'effective' 
});
```

### 3. 售价反推

```javascript
import { solveSellingPrice } from './engine.js';

const requiredPrice = solveSellingPrice(
  params,    // 参数
  0.88,      // 有效率 r
  0.25,      // 广告占比
  'effective', // 口径
  0.15       // 目标利润率
);
```

## 🧪 测试

运行测试页面验证计算引擎：

```bash
# 在浏览器中打开 test.html
open test.html
```

## 🔄 重构说明

本项目已完成重构，将原来的内联计算代码提取到独立的 `engine.js` 纯函数库中：

### 重构前的问题
- 计算逻辑与UI耦合严重
- 函数职责不清，难以维护
- 无法在其他环境中复用
- 难以进行单元测试

### 重构后的优势
- **关注点分离**：计算逻辑与UI完全分离
- **纯函数化**：所有计算函数都是纯函数，无副作用
- **可复用性**：计算引擎可以独立使用
- **可测试性**：便于编写单元测试
- **可维护性**：代码结构清晰，易于理解和修改

## 📊 计算原理

### 利润恒等式
```
Profit = Rev - [goodsCost + othersCost + commission + adCost] 
         - (VAT_out - VAT_in_goods - VAT_in_comm - VAT_in_ad)
```

### 保本广告费求解
当 `Profit = 0` 时：
```
adCostBreakEven = (1 + serviceVATRate) × A
其中 A = Rev - (goodsCost + othersCost + commission) 
           - VAT_out + VAT_in_goods + VAT_in_comm
```

### 两套口径
- **有效营收口径**：分母 = 售价 × (1 - 退货率)
- **GMV口径**：分母 = 售价（含税）

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

本项目仅供学习和参考使用。
