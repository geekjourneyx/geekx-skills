---
name: geekx-commitment-gate
description: 当用户明确调用 geekx-commitment-gate，或只想判断框架、重写、插件系统、工作流引擎、多智能体架构、模块边界等难撤回技术决定现在该不该做时使用。先按 geekx-gate 确认范围是否成立；范围不成立时不进入承诺闸门。
---

# GeekX 承诺闸门入口

`geekx-commitment-gate` 是点名入口。拿不准时优先使用 `geekx-gate`。

## 执行规则

先使用 `geekx-gate` 判断范围是否已经成立。

范围未成立时：

- 不进入承诺闸门。
- 不给 `PROBE`。
- 最终指令要求先补范围证据。

范围成立且存在难撤回技术选择时，执行 `geekx-gate` 的承诺闸门：

- 状态只能是：`STOP / HOLD / PROBE`。
- `PROBE` 只能是一个可回滚实验。
- 不推荐架构。
- 不比较框架。
- 不写长期路线图。
- 最终只给一个下一步动作。

## 输出

按 `geekx-gate` 的输出格式填写：

- 问题类型：承诺问题或混合问题
- 范围闸门：已成立 / 先验证 / 跳过
- 承诺闸门：`STOP / HOLD / PROBE / 跳过`
