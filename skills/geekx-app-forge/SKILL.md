---
name: geekx-app-forge
description: 当用户有模糊产品想法、想做 App 或工具，但真实需求、范围、成功标准、技术可行性或商业化边界尚未确认时使用。尤其适合自用起步但可能商业化、需求容易膨胀、Apple 平台体验要求高、静态内容较多或需要在立项前判断是否值得做的产品探索场景。
---

# GeekX App Forge

把“我好像想做个东西”锻造成**值得做、范围清楚、体验克制、可直接开发**的产品交付包。

核心不是更快写 Spec，而是先证明：**为什么要做、真正要解决什么、最小产品是什么、什么绝对不做。**

## 硬门槛

1. **先查再问。** 能从上下文、文件、仓库、官方文档或公开资料确认的事实，不问用户。
2. **先怀疑需求。** “能做”不等于“该做”；AI Coding 降低开发成本，不等于降低维护和产品复杂度。
3. **至少 10 轮有效澄清。** **REQUIRED SUB-SKILL:** 使用 `geekx-grilling`，一次一问。每轮必须改变目标、范围、用户、成功标准、风险或路线；禁止凑数。
4. **推荐不等于确认。** 用户没有明确选择，就不能关闭分支。
5. **先自用，再商业化。** 先验证自己的高频真实痛点，再检查是否存在可复制人群、付费理由和差异化。
6. **先删再加。** 每个功能都问：`这是用户真正要的吗？删掉会不会更好？现在不做会怎样？`
7. **确认前不写 Spec。** 需求、非目标和主要风险未关闭时，不进入设计资产。
8. **交付必须可开发。** 已经调研过的静态数据、文案、分类、图标规范、App identity 不得甩给 Coding Agent 重新研究。

## 阶段门

### Gate 0 — 还原真正动机
先确认：
- 为什么现在产生这个想法；
- 当前真实场景和频率；
- 不做 App 时用户如何解决；
- 用户说要 A，底层是不是其实要 B；
- 这是持续问题、一次性问题，还是“因为现在容易开发所以想做”。

随后进入至少 10 轮 `geekx-grilling`。读取 `references/grilling-and-reality-check.md`。

### Gate 1 — Reality Check
对已经形成的主张做反方审查：
- 伪需求风险；
- 使用频率是否足够；
- 是否已有更轻的替代方案；
- 技术可行性与平台限制；
- 最大复杂度税；
- 最可能失败的假设；
- 最低成本验证；
- 什么证据会让我们停止。

证据不足时只能标记“待验证”，不能装成事实。

### Gate 2 — Evidence Chain
对会改变决策的事实做调研。优先级：
1. 官方/一手资料；
2. 原始仓库、API、平台政策；
3. 真实用户/社区反馈；
4. 竞品与商业信号；
5. 二手分析仅作补充。

读取 `references/evidence-and-commercialization.md`。输出证据、反证、未知项和结论权限。

### Gate 3 — Product Shape
把想法压成：
- 目标用户；
- 核心任务；
- 高频触发场景；
- 一句话价值；
- P0；
- 明确非目标；
- 成功标准；
- 最小验证；
- P0.5/P1 只作为延期项。

如果 P0 仍像一个平台，继续删。

### Gate 4 — Commercialization Lens
先保证自用价值成立，再回答：
- 哪类人和我有同样痛点；
- 为什么他们会持续使用；
- 为什么现有方案不够；
- 什么能力可形成差异；
- 谁可能付钱、为什么；
- 商业化会不会反过来污染 P0。

商业化不是强行加账号、订阅、云服务；只是保留未来路径。

### Gate 5 — Design Freeze
若为 Apple 平台，读取 `references/apple-native-product-design.md`。
默认：Apple HIG、系统组件、SF 字体、semantic colors、内容优先、低认知负担。禁止把“高级感”翻译成渐变、玻璃、阴影、卡片墙。

用户明确确认目标、P0、非目标、体验方向后，才进入正式设计。

### Gate 6 — Spec → Plan
**REQUIRED SUB-SKILL:** 使用 `superpowers:brainstorming` 写 Product + Design Engineering Spec；复用已确认决定，不重新发散需求。

用户批准 Spec 后：
**REQUIRED SUB-SKILL:** 使用 `superpowers:writing-plans` 写 Implementation Plan。

Spec 和 Plan 必须保持同一套名称、范围、数据结构、文案和验收标准；发现冲突先修文档，不让实现 Agent 猜。

### Gate 7 — Static Data & App Identity
在交付前补齐 Coding Agent 不应该重新研究的内容：
- App 名称、英文名、Repo、Bundle ID、平台和最低版本；
- Tab/导航名称；
- 用户可见固定文案；
- 首批 seed；
- 枚举/分类/manifest；
- 已研究的数据集与来源映射；
- 本地通知固定文案；
- 导出格式；
- Icon 概念、禁止项、Light/Dark/Tinted 规则；
- 设计 tokens/系统语义；
- 任何可直接 import 的 JSON/CSV/Markdown。

读取 `references/developer-handoff.md`。

### Gate 8 — Developer Handoff ZIP
最终交付至少包含：

```text
AGENTS.md
README.md
docs/
  product/
  research/
  plans/
  handoff/
Resources/
  Seeds/
```

根据项目实际删掉不需要的目录；**不要为了模板完整制造空文件。**

交付前审查：
- Coding Agent 是否还需要重新做产品研究？
- 是否还有 TBD / TODO / “自行决定”？
- 静态数据能否直接导入？
- App 名称/Icon/文案是否明确？
- P0 与延期项是否分开？
- 是否出现未经确认的新功能？
- 是否有过度设计？
- ZIP 解压后是否能直接开始 Task 1？

## STOP 条件

出现任一情况，停止进入开发计划：
- 真实痛点证据不足；
- 低频一次性需求，轻量替代已足够；
- 核心技术假设未验证；
- 用户仍未确认关键范围；
- P0 主要由“以后可能需要”组成；
- 商业化假设依赖虚构用户；
- 维护成本明显高于可获得价值。

此时输出 `不做 / 先验证 / 缩小 / 转向`，而不是为了产出 ZIP 强行继续。

## 最终原则

> 先证明值得做，再决定做什么；先把产品变简单，再把交付变完整。

如果一个功能不能明显帮助核心任务，删掉。
如果一份文档不能减少实现歧义，删掉。
如果 Coding Agent 还需要重新研究已经研究过的东西，交付还没完成。
