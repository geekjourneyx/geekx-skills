# Apple-native 产品设计约束

仅在 Apple 平台产品中启用。

## 默认语言

目标不是“像 Apple 的视觉皮肤”，而是**像系统 App 一样自然地工作**。

优先级：
1. 任务清楚；
2. 信息层级；
3. 系统行为一致；
4. 可访问性；
5. 视觉克制；
6. 品牌装饰最后考虑。

## 默认选择

- SwiftUI 原生组件优先；
- `NavigationStack` / `TabView` / `List` / `Section` / `Form` / system sheet / toolbar；
- SF 系统字体；
- semantic colors；
- Dynamic Type；
- Light/Dark；
- VoiceOver；
- 44×44 最小触控区域；
- 系统返回、dismiss、编辑和分享行为。

## 简单美学

- typography > decoration；
- hierarchy > cards；
- spacing > borders；
- content > chrome；
- 一个屏幕一个主要动作；
- 能用列表就不用卡片墙；
- 能删解释就不增加 icon/badge 来补偿。

## 默认禁止

除非有明确功能理由：
- glassmorphism；
- gradient；
- heavy shadow；
- 大量自定义圆角卡片；
- 自定义 Tab Bar；
- 自定义导航手势；
- 大面积品牌背景；
- motivational dashboard；
- streak / XP / score；
- 为“高级感”增加动画。

## 文案

- Tab 尽量 2–4 个汉字；
- 入口标题尽量 2–6 个汉字；
- 按钮尽量 2–6 个汉字；
- 辅助说明一句结束；
- 短词做入口，短句做解释，长文只进详情；
- 用户不需要先懂专业术语才能使用。

如果一个标签需要一段话解释，先重命名，而不是增加 tooltip。
