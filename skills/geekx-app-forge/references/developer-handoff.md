# Developer Handoff Contract

目标：Coding Agent 拿到交付包后主要做工程实现，不重新承担产品经理、研究员、内容编辑和视觉方向制定工作。

## 必备文件

根据项目需要生成，不制造空模板：

```text
AGENTS.md
README.md
docs/
  product/<product>-product-design-spec.md
  research/<topic>-research.md
  plans/<product>-implementation-plan.md
  handoff/
    APP-IDENTITY.md
    STATIC-DATA-CONTRACT.md
Resources/
  Seeds/
```

最终打包 `<product>-developer-handoff-v1.zip`。

## AGENTS.md

只保留实现时必须反复读取的硬规则：
- source of truth 顺序；
- P0 / 非目标；
- 设计锁；
- copy 规则；
- 数据完整性；
- privacy；
- 测试/模拟器/真机门槛；
- 遇到冲突停止并报告。

不要复制完整 Spec。

## APP-IDENTITY.md

App 项目至少冻结：
- 中文名 / 英文名；
- Xcode product name；
- repo name；
- bundle id；
- platform / minimum OS；
- Tab 名；
- accent/font/system design；
- App Icon 概念；
- Icon 禁止项；
- Light/Dark/Tinted 规则；
- 1024×1024 source 要求。

如果名称仍未确定，不能假装已经冻结。

## Static Data

所有已经研究完成、实现时可直接使用的内容都数据化。常见：

```text
app-config.json
product-copy.json
seed-data.json
seed-manifest.json
source-mapping.json
categories.json
flows.json
featured-items.json
```

每个数据集都要回答：
- schema/version；
- stable id/slug；
- 完整性 manifest；
- 去重规则；
- source mapping；
- 后续升级是否覆盖用户编辑。

不要让 Agent 从研究报告再次手工抄 JSON。

## 验收

交付前逐项回答：

1. Coding Agent 是否还要重新搜索核心业务资料？
2. 是否存在 `TBD/TODO/自行决定/酌情`？
3. 静态数据是否直接可 parse/import？
4. Spec 和 Plan 是否使用同一套名称？
5. App 名、Bundle、Icon、文案是否冻结？
6. 是否明确什么不做？
7. 是否把 P0.5/P1 偷塞进 P0？
8. 是否有“为了完整”增加的系统？
9. 核心技术假设有没有真实证据？
10. ZIP 解压后是否可以直接执行 Task 1？

任一关键项回答“否”，交付未完成。
