<div align="center">

# GeekX Skills

**给 Agent 使用的 Skills 合集，把高频判断流程沉淀成可复用能力。**

<img src="assets/banner.webp" alt="GeekX Skills：给 Agent 使用的 Skills 合集" width="100%">

</div>

---

## 这是什么

GeekX Skills 是 [geekjourneyx](https://github.com/geekjourneyx) / 极客杰尼的 Agent Skills 合集。

它不追求把所有想法都变成流程，而是把真实工作里反复出现、容易跑偏、需要稳定判断的环节沉淀成 Skill。当前重点是 `geekx-gate`：在需求、方案和架构设计开始前，先审判这件事到底该不该做。

## 为什么需要它

Agent 很擅长补全方案，也很容易把一个小需求扩写成完整系统。

`geekx-gate` 的作用是反过来：先砍噪音、算复杂度税、确认非目标，再决定是否进入设计。它尤其适合拦住这些早熟决定：

- 现在就重写
- 现在就换框架
- 现在就做插件系统
- 现在就引入工作流引擎
- 现在就把一次性需求平台化

## 你会得到什么

<img src="assets/features.webp" alt="GeekX Skills 核心能力：必要性门禁、噪音检测、复杂度税、承诺闸门" width="100%">

`geekx-gate` 会强制 Agent 输出一个裁决，而不是输出一套越来越大的计划。

它默认给出：

- 裁决：保留、砍掉、延期、先验证、缩小范围
- 承诺闸门：跳过、STOP、HOLD、PROBE
- 真实需求
- 噪音
- 最小必要升级
- 非目标
- 复杂度税
- 最终指令

## 可用 Skills

| Skill | 适合什么时候用 |
|:---|:---|
| `geekx-gate` | 审查需求、工程计划、架构提案、路线图或 Agent 输出是否过度设计；判断重写、框架、插件系统、工作流引擎等难撤回技术决定现在该不该做。 |

## 快速开始

安装全部 Skills：

```bash
npx skills add geekjourneyx/geekx-skills --all
```

查看可用 Skills：

```bash
npx skills add geekjourneyx/geekx-skills --list
```

只安装 `geekx-gate`：

```bash
npx skills add geekjourneyx/geekx-skills --skill geekx-gate
```

## 使用示例

```text
使用 geekx-gate 审查这个方案是否过度设计。
```

```text
使用 geekx-gate 找出这个需求的最小必要升级。
```

```text
使用 geekx-gate 判断现在要不要引入插件系统。
```

```text
使用 geekx-gate 判断这次重写是否有足够证据。
```

```text
开庭。使用 geekx-gate 多线程审判这个路线图，判断哪些该砍掉。
```

## Skill 约束

每个 Skill 都遵守这些仓库级约束：

- 目录名必须以 `geekx-` 开头。
- `SKILL.md` 的 `name` 必须与目录名一致。
- 每个 Skill 必须包含 `evals/evals.json`。
- README 只列用户需要知道的 Skills；维护规则以 `AGENTS.md` 为准。

## 作者

- 主页：[jieni.ai](https://jieni.ai)
- GitHub：[@geekjourneyx](https://github.com/geekjourneyx)
- X：[@seekjourney](https://x.com/seekjourney)
- 公众号：极客杰尼

## 许可证

[MIT](./LICENSE)
