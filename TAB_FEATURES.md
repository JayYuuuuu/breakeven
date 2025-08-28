## 技术实现

### CSS样式
- Tab按钮采用紧凑设计，适合在标题栏中显示
- 使用flexbox布局，支持响应式设计
- Active状态使用主题色高亮显示

### JavaScript功能
- `initTabs()` 函数初始化tab切换
- `updateTabTitle()` 函数动态更新右侧标题
- `updateDecisionDisplay()` 函数更新投放决策显示
- `updateAnalysisDisplay()` 函数更新利润推演显示
- 所有输入框都触发相应的计算和显示更新

### HTML结构
- 左侧参数输入区域完全独立
- 右侧每个tab都有独立的content区域
- 右侧标题使用`<span id="tabTitle">`包装，支持动态更新
- 使用CSS的display属性控制显示/隐藏
